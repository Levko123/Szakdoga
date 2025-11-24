'use client'

import { useMemo, useState, useEffect } from 'react'
import {
  useAccount,
  useReadContract,
  useReadContracts,
  useWriteContract,
  useWatchContractEvent,
} from 'wagmi'
import { parseEther, formatEther } from 'viem'
import { allowance20Abi } from '../../abi/Allowance20'
import { cacRegistryAbi } from '../../abi/CacRegistry'
import { cacMarketAbi } from '../../abi/CacMarketplace'
import ReportsChartLite from '../../components/ReportsChartLite'

const CAC = process.env.NEXT_PUBLIC_ALLOWANCE20_ADDRESS
const REG = process.env.NEXT_PUBLIC_REGISTRY_ADDRESS
const MKT = process.env.NEXT_PUBLIC_MARKET_ADDRESS

export default function MarketplacePage() {
  const { address, isConnected } = useAccount()
  const {
    writeContract,
    isPending,
    error: txError,
    data: txHash,
  } = useWriteContract()

  // 1) regisztrált-e a wallet?
  const { data: isReg } = useReadContract({
    abi: cacRegistryAbi,
    address: REG,
    functionName: 'isRegistered',
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  })

  // 2) form state
  const [amount, setAmount] = useState('10')
  const [priceEth, setPriceEth] = useState('0.1')

  // 3) allowance (CAC -> Marketplace)
  const {
    data: allowance,
    refetch: refetchAllowance,
  } = useReadContract({
    abi: allowance20Abi,
    address: CAC,
    functionName: 'allowance',
    args: address ? [address, MKT] : undefined,
    query: { enabled: !!address },
  })

  const hasEnoughAllowance =
    allowance !== undefined && amount
      ? BigInt(allowance) >= BigInt(amount)
      : false

  function approveForList() {
    if (!amount) return
    writeContract({
      abi: allowance20Abi,
      address: CAC,
      functionName: 'approve',
      args: [MKT, BigInt(amount)],
    })
  }

  function list() {
    if (!amount || !priceEth || !hasEnoughAllowance || !isReg) return
    writeContract({
      abi: cacMarketAbi,
      address: MKT,
      functionName: 'list',
      args: [BigInt(amount), parseEther(priceEth)],
    })
  }

  // 4) nextId + aktív listingek
  const {
    data: nextId,
    refetch: refetchNextId,
  } = useReadContract({
    abi: cacMarketAbi,
    address: MKT,
    functionName: 'nextId',
  })

  const ids = useMemo(() => {
    if (!nextId) return []
    const n = Number(nextId)
    if (!Number.isFinite(n) || n <= 0) return []
    return Array.from({ length: n }, (_, i) => i) // 0..n-1
  }, [nextId])

  const listingContracts = useMemo(
    () =>
      ids.map((id) => ({
        abi: cacMarketAbi,
        address: MKT,
        functionName: 'listings',
        args: [BigInt(id)],
      })),
    [ids]
  )

  const {
    data: listingsData,
    refetch: refetchListings,
    isFetching: isLoadingListings,
  } = useReadContracts({
    contracts: listingContracts,
    query: { enabled: ids.length > 0 },
  })

  const rows = useMemo(() => {
    if (!listingsData) return []
    return listingsData
      .map((res, i) => {
        if (!res || !res.result) return null
        const [seller, amount, priceWei, active] = res.result
        return { id: ids[i], seller, amount, priceWei, active }
      })
      .filter(Boolean)
      .filter((r) => r.active)
  }, [listingsData, ids])

  // 5) Events -> auto refresh (lista + allowance)
  useWatchContractEvent({
    abi: cacMarketAbi,
    address: MKT,
    eventName: 'Listed',
    onLogs: () => {
      refetchNextId()
      refetchListings()
      refetchAllowance()
    },
  })
  useWatchContractEvent({
    abi: cacMarketAbi,
    address: MKT,
    eventName: 'Cancelled',
    onLogs: () => {
      refetchListings()
      refetchAllowance()
    },
  })
  useWatchContractEvent({
    abi: cacMarketAbi,
    address: MKT,
    eventName: 'Purchased',
    onLogs: () => {
      refetchListings()
      refetchAllowance()
    },
  })

  // 6) Ha bármilyen tx lefutott -> manuális refetch
  useEffect(() => {
    if (!txHash) return
    refetchAllowance()
    refetchNextId()
    refetchListings()
  }, [txHash, refetchAllowance, refetchNextId, refetchListings])

  // 7) Buy / Cancel
  function buy(id, priceWei) {
    writeContract({
      abi: cacMarketAbi,
      address: MKT,
      functionName: 'buy',
      args: [BigInt(id)],
      value: priceWei,
    })
  }

  function cancel(id) {
    writeContract({
      abi: cacMarketAbi,
      address: MKT,
      functionName: 'cancel',
      args: [BigInt(id)],
    })
  }

  if (!isConnected) {
    return <div className="card">Please connect your wallet.</div>
  }

  // 8) Lokális refresh gomb
  function handleRefreshAll() {
    refetchAllowance()
    refetchNextId()
    refetchListings()
  }

  return (
    <>
      <h1 className="page-title">Marketplace</h1>

      <div className="cards">
        {/* BAL: Listázás + listingek */}
        <div className="col-8">
          <div className="card">
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <h2>List CAC for sale</h2>
              <button
                className="btn"
                style={{ padding: '4px 10px', fontSize: 12 }}
                onClick={handleRefreshAll}
              >
                Refresh
              </button>
            </div>

            {!isReg && (
              <div style={{ color: 'crimson', marginBottom: 8 }}>
                You are not registered.{' '}
                <a href="/profile">Complete company profile</a> first.
              </div>
            )}

            <div className="grid grid-2">
              <label>
                Amount (whole CAC)
                <input
                  className="input"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </label>
              <label>
                Total price (ETH)
                <input
                  className="input"
                  value={priceEth}
                  onChange={(e) => setPriceEth(e.target.value)}
                />
              </label>
            </div>

            <div
              style={{
                display: 'flex',
                gap: 12,
                marginTop: 12,
                alignItems: 'center',
              }}
            >
              <button
                className="btn"
                onClick={approveForList}
                disabled={isPending || !amount}
              >
                Approve
              </button>
              <button
                className="btn"
                onClick={list}
                disabled={
                  isPending ||
                  !isReg ||
                  !amount ||
                  !priceEth ||
                  !hasEnoughAllowance
                }
                title={!hasEnoughAllowance ? 'Approve the amount first' : ''}
              >
                Create listing
              </button>
              <span style={{ color: '#6b7280', fontSize: 12 }}>
                Allowance:{' '}
                {allowance !== undefined ? allowance.toString() : '…'}
              </span>
            </div>

            {txError && (
              <div style={{ color: 'crimson', marginTop: 8 }}>
                {txError.message}
              </div>
            )}
          </div>

          <div className="card">
            <h2>Active listings</h2>
            <div
              style={{
                color: '#6b7280',
                fontSize: 12,
                marginBottom: 8,
              }}
            >
              nextId:{' '}
              {nextId !== undefined ? nextId.toString() : '…'} • loaded:{' '}
              {rows.length} active
              {isLoadingListings ? ' • loading…' : ''}
            </div>

            {!rows.length ? (
              <div>No active listings.</div>
            ) : (
              <div className="grid">
                {rows.map((r) => (
                  <div
                    key={r.id}
                    className="card"
                    style={{ padding: 12 }}
                  >
                    <div>
                      <b>ID:</b> {r.id}
                    </div>
                    <div>
                      <b>Seller:</b> {r.seller}
                    </div>
                    <div>
                      <b>Amount:</b> {r.amount.toString()} CAC
                    </div>
                    <div>
                      <b>Price:</b> {formatEther(r.priceWei)} ETH
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        gap: 12,
                        marginTop: 8,
                      }}
                    >
                      <button
                        className="btn"
                        onClick={() => buy(r.id, r.priceWei)}
                        disabled={isPending}
                      >
                        Buy
                      </button>
                      {address?.toLowerCase() ===
                        r.seller.toLowerCase() && (
                        <button
                          className="btn"
                          onClick={() => cancel(r.id)}
                          disabled={isPending}
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* JOBB: mini price chart */}
        <div className="col-4">
          <ReportsChartLite marketAddress={MKT} />
        </div>
      </div>
    </>
  )
}
