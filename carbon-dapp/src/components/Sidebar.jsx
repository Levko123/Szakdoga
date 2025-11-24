'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const items = [
  { href:'/',            label:'Dashboard',       icon:'🏠' },
  { href:'/profile',     label:'Company Profile', icon:'🏷️' },
  { href:'/marketplace', label:'Marketplace',     icon:'🛒' },
  { href:'/reports',     label:'Reports',         icon:'📊' },
  { href:'/mint',        label:'Mint',            icon:'🪙' },   // ⬅️ új
  { href:'/settings',    label:'Settings',        icon:'⚙️' },
]

export default function Sidebar(){
  const path = usePathname()
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="fox" />
        <div>CAC Registry & Marketplace</div>
      </div>
      <nav className="nav">
        {items.map(it => {
          const active = path === it.href
          return (
            <Link key={it.href} href={it.href} className={active ? 'active' : ''}>
              <span style={{fontSize:18}}>{it.icon}</span>
              <span>{it.label}</span>
            </Link>
          )
        })}
      </nav>
      <div style={{marginTop:'auto', padding:'12px', color:'var(--muted)', fontSize:12}}>
        v0.1 • Local 31337
      </div>
    </aside>
  )
}
