import { NextResponse } from 'next/server'
import { ethers } from 'ethers'
import { allowance20Abi } from 'lib/abi'

const RPC_URL = process.env.RPC_URL as string
const CAC_ADDRESS = process.env.CAC_ADDRESS as `0x${string}`
const FACTOR = Number(process.env.FACTOR_PER_M2 || '0.01')

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const meta = searchParams.get('meta')
    const user = searchParams.get('user')

    if (meta === 'factor') {
      return NextResponse.json({ factor: FACTOR })
    }

    if (!user) {
      return NextResponse.json({ error: 'user param kell' }, { status: 400 })
    }

    const provider = new ethers.JsonRpcProvider(RPC_URL)
    const c = new ethers.Contract(CAC_ADDRESS, allowance20Abi, provider)

    const remaining: bigint = await c.quota(user) // mapping(address=>uint256) public quota
    return NextResponse.json({ remaining: Number(remaining) })
  } catch (e:any) {
    return NextResponse.json({ error: e?.message || String(e) }, { status: 500 })
  }
}
