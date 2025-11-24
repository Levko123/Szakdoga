import { NextResponse } from 'next/server'
import { ethers } from 'ethers'
import { allowance20Abi } from 'lib/abi'

const RPC_URL = process.env.RPC_URL as string
const CAC_ADDRESS = process.env.CAC_ADDRESS as `0x${string}`
const FACTOR = Number(process.env.FACTOR_PER_M2 || '0.01')
const SERVER_PK = process.env.SERVER_PK as string

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { user, areaM2 }:{user:string, areaM2:number} = body || {}
    if (!user || !areaM2 || areaM2 <= 0) {
      return NextResponse.json({ error: 'user és areaM2 kell' }, { status: 400 })
    }

    const toMint = Math.floor(areaM2 * FACTOR) // egész CAC
    if (toMint <= 0) {
      return NextResponse.json({ error: 'kerekítés után 0 lett' }, { status: 400 })
    }

    const provider = new ethers.JsonRpcProvider(RPC_URL)
    const wallet = new ethers.Wallet(SERVER_PK, provider)
    const cac = new ethers.Contract(CAC_ADDRESS, allowance20Abi, wallet)

    const tx = await cac.setQuota(user, toMint) // QUOTA_ROLE szükséges!
    const rc = await tx.wait()

    return NextResponse.json({ ok: true, toMint, txHash: rc?.hash })
  } catch (e:any) {
    return NextResponse.json({ error: e?.message || String(e) }, { status: 500 })
  }
}
