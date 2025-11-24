'use client'

import { useMemo, useState, useEffect } from 'react'
import {
  useAccount,
  useConnect,
  useDisconnect,
  useReadContract,
  useReadContracts,
  useWriteContract,
  useWatchContractEvent,
} from 'wagmi'
import { injected } from 'wagmi/connectors'

import { allowance20Abi } from '../abi/Allowance20'
import { cacMarketAbi } from '../abi/CacMarketplace'
import { cacRegistryAbi } from '../abi/CacRegistry'   // ⬅️ KYC olvasáshoz

const CAC = process.env.NEXT_PUBLIC_ALLOWANCE20_ADDRESS
const MKT = process.env.NEXT_PUBLIC_MARKET_ADDRESS
const REG = process.env.NEXT_PUBLIC_REGISTRY_ADDRESS   // ⬅️ Registry cím
const ZERO32 = '0x' + '00'.repeat(32)

export default function Dashboard() {
  // — Mount guard (SSR-hydration safe)
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  // — Wallet
  const { address, isConnected, status: accountStatus } = useAccount()
  const { connect, connectors, status: connectStatus, error: connectError } = useConnect()
  const { disconnect } = useDisconnect()

  const busy = !mounted || connectStatus !== 'idle' || accountStatus === 'reconnecting'

  function doConnect() {
    if (busy || isConnected) return
    const inj =
      connectors.find(c => c.id === 'injected' || c.type === 'injected') || injected()
    if (!inj) {
      alert('Nem találok böngészős pénztárcát (MetaMask / Rabby).')
      return
    }
    connect({ connector: inj })
  }

  // — CAC balance
  const { data: balance, refetch: refetchBal } = useReadContract({
    abi: allowance20Abi,
    address: CAC,
    functionName: 'balanceOf',
    args: mounted && address ? [address] : undefined,
    query: { enabled: mounted && !!address },
  })

  // — KYC státusz (REG.profiles -> [4] = kycApproved)
  const { data: myProfile } = useReadContract({
    abi: cacRegistryAbi,
    address: REG,
    functionName: 'profiles',
    args: mounted && address ? [address] : undefined,
    query: { enabled: mounted && !!address },
  })
  const isApproved = myProfile ? Boolean(myProfile[4]) : false

  // — Surrender
  const { writeContract, isPending: isTxPending, error: txError, data: txHash } = useWriteContract()
  const [sAmount, setSAmount] = useState('10')
  const periodId = new Date().getFullYear()
  const evidenceURI = 'data:application/json;utf8,%7B%7D'
  const vcHash = ZERO32

  function doSurrender() {
    if (!sAmount || !isConnected) return
    const amt = BigInt(sAmount)
    if (amt <= 0n) return
    writeContract({
      abi: allowance20Abi,
      address: CAC,
      functionName: 'surrender',
      args: [amt, periodId, evidenceURI, vcHash],
    })
  }

  // — Transfer
  const [tTo, setTTo] = useState('')
  const [tAmount, setTAmount] = useState('5')

  function doTransfer() {
    if (!tTo || !tAmount || !isConnected) return
    const amt = BigInt(tAmount)
    if (amt <= 0n) return
    writeContract({
      abi: allowance20Abi,
      address: CAC,
      functionName: 'transfer',
      args: [tTo, amt],
    })
  }

  // tx után balance frissítés
  useEffect(() => { if (txHash) refetchBal() }, [txHash, refetchBal])

  // surrender eventre is frissítsünk (ha máshol történt)
  useWatchContractEvent({
    abi: allowance20Abi,
    address: CAC,
    eventName: 'Surrendered',
    onLogs: () => refetchBal(),
  })

  // — Active listings counter
  const { data: nextId, refetch: refetchNextId } = useReadContract({
    abi: cacMarketAbi,
    address: MKT,
    functionName: 'nextId',
  })

  const ids = useMemo(() => {
    if (!nextId) return []
    const n = Number(nextId)
    return Number.isFinite(n) && n > 0 ? Array.from({ length: n }, (_, i) => i) : []
  }, [nextId])

  const contracts = useMemo(
    () => ids.map((id) => ({
      abi: cacMarketAbi,
      address: MKT,
      functionName: 'listings',
      args: [BigInt(id)],
    })),
    [ids]
  )

  const { data: listingsData, refetch: refetchListings } = useReadContracts({
    contracts,
    query: { enabled: ids.length > 0 },
  })

  const activeCount = useMemo(() => {
    if (!listingsData) return 0
    return listingsData.reduce((acc, res) => acc + (res?.result?.[3] ? 1 : 0), 0)
  }, [listingsData])

  useWatchContractEvent({
    abi: cacMarketAbi,
    address: MKT,
    eventName: 'Listed',
    onLogs: () => { refetchNextId(); refetchListings() },
  })
  useWatchContractEvent({
    abi: cacMarketAbi,
    address: MKT,
    eventName: 'Cancelled',
    onLogs: () => { refetchListings() },
  })
  useWatchContractEvent({
    abi: cacMarketAbi,
    address: MKT,
    eventName: 'Purchased',
    onLogs: () => { refetchListings() },
  })

  // — UI
  return (
    <>
      <h1 className="page-title">Dashboard</h1>

      <div className="cards">
        {/* Left: Wallet + balance + connect/disconnect */}
        <section className="card col-4">
          <div className="kpi">
            {isConnected && balance !== undefined ? balance.toString() : '…'}
            <small>CAC balance</small>
          </div>
          <div className="subtle" style={{ marginTop: 6 }}>
            {!mounted ? '…'
              : isConnected ? <>Connected: {short(address)}</>
              : 'Wallet not connected'}
          </div>

          <div style={{ display: 'flex', gap: 10, marginTop: 12 }}>
            {!isConnected ? (
              <button className="btn" onClick={doConnect} disabled={busy}>
                {busy ? 'Please wait…' : 'Connect Wallet'}
              </button>
            ) : (
              <button className="btn" onClick={() => disconnect()}>Disconnect</button>
            )}
          </div>

          {/* KYC badge */}
          {isConnected && (
            <div className="subtle" style={{ marginTop: 8 }}>
              KYC:{' '}
              <span className={`badge ${isApproved ? 'ok' : 'warn'}`}>
                {isApproved ? 'APPROVED' : 'PENDING/REJECTED'}
              </span>
            </div>
          )}

          {connectError && (
            <div style={{ color: 'crimson', fontSize: 12, marginTop: 8 }}>
              {connectError.message}
            </div>
          )}
        </section>

        {/* Middle: Surrender */}
        <section className="card col-4">
          <h3 style={{ marginTop: 0 }}>Surrender credits</h3>
          <p className="subtle">Add meg a mennyiséget (egész CAC). A többit a rendszer tölti (demo).</p>

          <div className="cards" style={{ marginTop: 8 }}>
            <div className="col-12">
              <label>Amount (whole CAC)
                <input
                  className="input"
                  value={sAmount}
                  onChange={(e) => setSAmount(e.target.value)}
                  inputMode="numeric"
                />
              </label>
            </div>
          </div>

          <div className="subtle" style={{ marginTop: 8 }}>
            Period: {periodId} • VC Hash: 0x00…00 • Evidence: (auto)
          </div>

          <div style={{ display: 'flex', gap: 12, marginTop: 12 }}>
            <button
              className="btn"
              onClick={doSurrender}
              disabled={!isConnected || isTxPending || !sAmount || !isApproved}  // ⬅️ KYC guard
              title={!isApproved ? 'KYC pending/rejected – surrender tiltva' : ''}
            >
              {isTxPending ? 'Submitting…' : 'Surrender now'}
            </button>
            {txError && <span style={{ color: 'crimson', fontSize: 12 }}>{txError.message}</span>}
          </div>
        </section>

        {/* Right: Transfer */}
        <section className="card col-4">
          <h3 style={{ marginTop: 0 }}>Transfer credits</h3>
          <p className="subtle">Kreditek átküldése másik walletre (ERC-20 transfer).</p>

          <div className="cards" style={{ marginTop: 8 }}>
            <div className="col-9">
              <label>Recipient address
                <input
                  className="input"
                  placeholder="0xrecipient…"
                  value={tTo}
                  onChange={(e) => setTTo(e.target.value)}
                />
              </label>
            </div>
            <div className="col-3">
              <label>Amount
                <input
                  className="input"
                  value={tAmount}
                  onChange={(e) => setTAmount(e.target.value)}
                  inputMode="numeric"
                />
              </label>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 12, marginTop: 12 }}>
            <button
              className="btn"
              onClick={doTransfer}
              disabled={!isConnected || isTxPending || !tTo || !tAmount}
            >
              {isTxPending ? 'Submitting…' : 'Transfer'}
            </button>
          </div>
        </section>

        {/* Bottom: Active listings count */}
        <section className="card col-12">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ margin: 0 }}>Active listings</h3>
            <div className="subtle">
              nextId: {nextId !== undefined ? nextId.toString() : '…'} • visible: {activeCount}
              &nbsp;
              <button
                className="btn"
                onClick={() => { refetchNextId(); refetchListings() }}
                style={{ padding: '6px 10px', marginLeft: 8 }}
              >
                Refresh
              </button>
            </div>
          </div>

          <div style={{ marginTop: 10, fontSize: 28, fontWeight: 800 }}>
            {activeCount}
            <span className="subtle" style={{ marginLeft: 8, fontSize: 14, fontWeight: 600 }}>active listing(s)</span>
          </div>
        </section>
      </div>
    </>
  )
}

function short(addr) {
  return addr ? addr.slice(0, 6) + '…' + addr.slice(-4) : ''
}
