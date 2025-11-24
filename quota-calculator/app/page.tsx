'use client'
import { useEffect, useMemo, useState } from 'react'

export default function Page() {
  const [user, setUser] = useState('')
  const [area, setArea] = useState('1000') // m²
  const [factor, setFactor] = useState<number | null>(null)
  const [txHash, setTxHash] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState<string | null>(null)
  const [currentQuota, setCurrentQuota] = useState<number | null>(null)

  // faktor lekérése a szerverről (envből jön)
  useEffect(() => {
    (async () => {
      try {
        const r = await fetch('/api/get-quota?meta=factor')
        const j = await r.json()
        setFactor(Number(j.factor || 0.01))
      } catch { setFactor(0.01) }
    })()
  }, [])

  const quota = useMemo(() => {
    const a = Math.max(0, Math.floor(Number(area || '0')))
    const f = factor ?? 0.01
    return Math.floor(a * f)
  }, [area, factor])

  async function fetchUserQuota(u: string) {
    if (!u) return
    const r = await fetch(`/api/get-quota?user=${encodeURIComponent(u)}`)
    const j = await r.json()
    setCurrentQuota(Number(j.remaining || 0))
  }

  async function setQuotaOnChain() {
    setBusy(true); setErr(null); setTxHash(null)
    try {
      const r = await fetch('/api/set-quota', {
        method: 'POST',
        headers: { 'content-type':'application/json' },
        body: JSON.stringify({ user, quota })
      })
      const j = await r.json()
      if (!r.ok) throw new Error(j.error || 'Failed to set quota')
      setTxHash(j.txHash)
      await fetchUserQuota(user)
    } catch (e:any) {
      setErr(e.message || String(e))
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="container">
      <div className="h1">Factory → Mint Quota Calculator</div>
      <div className="card">
        <div className="grid">
          <div>
            <label>Factory wallet address</label>
            <input className="input" placeholder="0x..." value={user} onChange={e=>setUser(e.target.value)} />
          </div>
          <div>
            <label>Factory area (m²)</label>
            <input className="input" inputMode="numeric" value={area} onChange={e=>setArea(e.target.value)} />
          </div>
        </div>

        <div className="row" style={{marginTop:14}}>
          <div className="kpi">{quota}<span className="small"> &nbsp;CAC quota (calc)</span></div>
          <span className="badge">factor: {factor ?? '…'} CAC / m²</span>
        </div>

        <div className="row" style={{marginTop:14}}>
          <button className="btn" onClick={()=>fetchUserQuota(user)} disabled={!user}>Check current on-chain quota</button>
          <div className="small">current: {currentQuota ?? '—'}</div>
        </div>

        <div className="row" style={{marginTop:14}}>
          <button className="btn primary" onClick={setQuotaOnChain} disabled={!user || quota<=0 || busy}>
            {busy ? 'Setting quota…' : 'Set quota on-chain'}
          </button>
          {txHash && <div className="small">tx: {txHash}</div>}
        </div>

        {err && <div style={{color:'var(--err)', marginTop:10}}>{err}</div>}

        <div className="small" style={{marginTop:12}}>
          Tipp: ezt az oldalt futtasd **külön porton** (pl. 4000). A dApp-ban ezután a felhasználó a <code>Mint (quota)</code> menüpont alatt a
          <b> remainingQuota</b>-t már a blokkláncról olvassa, és a <code>mintFromQuota</code> nem enged többet, mint a kvóta.
        </div>
      </div>
    </div>
  )
}
