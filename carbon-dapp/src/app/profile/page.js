'use client'

import { useState } from 'react'
import {
  useAccount,
  useReadContract,
  useWriteContract,
  useWatchContractEvent,
} from 'wagmi'
import { keccak256, stringToHex } from 'viem'
import { cacRegistryAbi } from '../../abi/CacRegistry'
import { pinJsonToIPFS, pinFileToIPFS } from '../../lib/pinata'

const REG = process.env.NEXT_PUBLIC_REGISTRY_ADDRESS

export default function ProfilePage() {
  const { address, isConnected } = useAccount()

  const { data: isReg } = useReadContract({
    abi: cacRegistryAbi,
    address: REG,
    functionName: 'isRegistered',
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  })

  // a teljes profilból számoljuk a KYC státuszt
  const {
    data: myProfile,
    refetch: refetchProfile,
  } = useReadContract({
    abi: cacRegistryAbi,
    address: REG,
    functionName: 'profiles',
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  })
  const kyc = myProfile ? Boolean(myProfile[4]) : false  // index 4 = kycApproved

  // kyc note (elutasítás indoka)
  const {
    data: kycNote,
    refetch: refetchNote,
  } = useReadContract({
    abi: cacRegistryAbi,
    address: REG,
    functionName: 'kycNote',
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  })

  const { writeContract, isPending, error: txError } = useWriteContract()

  const [displayName, setDisplayName]   = useState('Teszt Kft.')
  const [taxId, setTaxId]               = useState('HU-12345678')
  const [contactEmail, setContactEmail] = useState('info@tesztkft.hu')
  const [addressCity, setAddressCity]   = useState('Budapest')
  const [addressStreet, setAddressStreet] = useState('Fő u. 1.')
  const [ownershipFile, setOwnershipFile] = useState(null)
  const [uiWarn, setUiWarn] = useState('')

  async function buildMetadataURI() {
    const json = {
      version: '1.0.0',
      displayName,
      contact: { email: contactEmail },
      address: { city: addressCity, street: addressStreet },
    }
    try {
      return await pinJsonToIPFS(json) // ipfs://...
    } catch {
      const raw = JSON.stringify(json)
      return `data:application/json;utf8,${encodeURIComponent(raw)}`
    }
  }

  async function buildDocsIPFSorEmpty() {
    if (!ownershipFile) return ''
    try {
      const uri = await pinFileToIPFS(ownershipFile) // ipfs://...
      setUiWarn('')
      return uri
    } catch {
      setUiWarn('No IPFS keys configured. The document will not be uploaded. You can update it later via "Update docs".')
      return ''
    }
  }

  async function doRegister() {
    if (!address) return
    const taxIdHash   = keccak256(stringToHex(taxId))
    const metadataURI = await buildMetadataURI()
    const docsURI     = await buildDocsIPFSorEmpty() // lehet '' is

    await writeContract({
      abi: cacRegistryAbi,
      address: REG,
      functionName: 'register',
      args: [taxIdHash, metadataURI, displayName], // 3 param, helyes sorrend
    })

    if (docsURI) {
      await writeContract({
        abi: cacRegistryAbi,
        address: REG,
        functionName: 'updateDocs',
        args: [docsURI],
      })
    }

    // frissítsünk
    refetchProfile()
    refetchNote()
  }

  async function doUpdateDocs() {
    const docsURI = await buildDocsIPFSorEmpty()
    if (!docsURI) return
    await writeContract({
      abi: cacRegistryAbi,
      address: REG,
      functionName: 'updateDocs',
      args: [docsURI],
    })
  }

  async function doUpdateMetaOnly() {
    const metadataURI = await buildMetadataURI()
    await writeContract({
      abi: cacRegistryAbi,
      address: REG,
      functionName: 'updateMetadata',
      args: [metadataURI],
    })
  }

  // Admin döntésekre azonnal frissítsünk
  useWatchContractEvent({
    abi: cacRegistryAbi,
    address: REG,
    eventName: 'KycApproved',
    onLogs: (logs) => {
      if (!address) return
      const me = address.toLowerCase()
      const hit = logs.some(l => String(l.args?.user || '').toLowerCase() === me)
      if (hit) { refetchProfile(); refetchNote(); }
    },
  })
  useWatchContractEvent({
    abi: cacRegistryAbi,
    address: REG,
    eventName: 'KycDecision',
    onLogs: (logs) => {
      if (!address) return
      const me = address.toLowerCase()
      const hit = logs.some(l => String(l.args?.user || '').toLowerCase() === me)
      if (hit) { refetchProfile(); refetchNote(); }
    },
  })

  if (!isConnected) return <div className="card">Please connect your wallet.</div>

  return (
    <main className="page">
      <h1 className="page-title">Company profile</h1>

      <section className="card col-12">
        <div className="grid grid-2">
          <label>Display name
            <input className="input" value={displayName} onChange={e=>setDisplayName(e.target.value)} />
          </label>
          <label>Tax ID
            <input className="input" value={taxId} onChange={e=>setTaxId(e.target.value)} />
          </label>
          <label>Contact email
            <input className="input" value={contactEmail} onChange={e=>setContactEmail(e.target.value)} />
          </label>
          <label>City
            <input className="input" value={addressCity} onChange={e=>setAddressCity(e.target.value)} />
          </label>
          <label>Street
            <input className="input" value={addressStreet} onChange={e=>setAddressStreet(e.target.value)} />
          </label>
          <label>Ownership deed (PDF/JPG)
            <input className="input" type="file" accept=".pdf,image/*"
                   onChange={e=>setOwnershipFile(e.target.files?.[0] ?? null)} />
          </label>
        </div>

        {uiWarn && <div style={{color:'#eab308', marginTop:8}}>{uiWarn}</div>}

        <div style={{display:'flex', gap:12, marginTop:12, alignItems:'center'}}>
          <button className="btn" onClick={doRegister} disabled={isPending}>
            {isPending ? 'Submitting…' : (isReg ? 'Re-register / Update' : 'Register')}
          </button>
          <button className="btn" onClick={doUpdateMetaOnly} disabled={isPending}>Update metadata</button>
          <button className="btn" onClick={doUpdateDocs} disabled={isPending}>Update docs (file)</button>

          <span className="subtle">
            KYC:{' '}
            <span className={`badge ${kyc ? 'ok' : 'warn'}`}>
              {kyc ? 'APPROVED' : 'PENDING/REJECTED'}
            </span>
          </span>
        </div>

        {!kyc && kycNote && kycNote.length > 0 && (
          <div style={{ marginTop: 8, color: '#b45309' }}>
            <b>Elutasítás indoka:</b> {kycNote}
          </div>
        )}

        {txError && <div style={{ color:'crimson', marginTop:8 }}>{txError.message}</div>}
      </section>

      <section className="card col-12">
        <p className="subtle">
          A <code>metadataURI</code> mehet IPFS-re vagy Data-URI-ra; a <code>docsURI</code> <b>csak</b> <code>ipfs://CID</code>.
          Ha nincs IPFS kulcsod, hagyd üresen, és később töltsd fel az „Update docs” gombbal.
        </p>
      </section>
    </main>
  )
}
