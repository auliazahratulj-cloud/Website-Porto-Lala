import { Link } from 'react-router-dom';
import { ArrowUpRight, Menu, X, LogOut, LayoutDashboard, Plus, Pencil, Trash2, Eye, Search, Image as ImageIcon } from 'lucide-react';
import { useState } from 'react';
export function Navbar() {
  const [open,setOpen] = useState(false);
  const links = [['Home','/'],['About','/#about'],['Journey','/#journey'],['Achievements','/#achievements'],['Experiences','/#experiences'],['Projects','/#projects'],['Contact','/#contact']];
  return <header className="nav-wrap"><nav className="container nav">
    <Link to="/" className="brand">AZJ<span>.</span></Link>
    <div className="nav-links">{links.map(([n,h])=><a key={n} href={h}>{n}</a>)}</div>
    <a className="nav-admin" href="/admin/login">Admin <ArrowUpRight size={15}/></a>
    <button className="mobile-menu" onClick={()=>setOpen(!open)} aria-label="Toggle menu">{open?<X/>:<Menu/>}</button>
    {open&&<div className="mobile-links">{links.map(([n,h])=><a key={n} href={h} onClick={()=>setOpen(false)}>{n}</a>)}<a href="/admin/login">Admin Login</a></div>}
  </nav></header>;
}
export function Footer({profile}) {
  return <footer className="footer"><div className="container footer-inner"><div><div className="brand">AZJ<span>.</span></div><p>Building knowledge, creating meaningful work.</p></div><div className="footer-right"><span>© {new Date().getFullYear()} {profile?.full_name || 'Aulia Zahratul Jannah'}</span><a href="#top">Back to top ↑</a></div></div></footer>;
}
export function SectionTitle({eyebrow,title,description}) {
  return <div className="section-title"><span className="eyebrow">{eyebrow}</span><h2>{title}</h2>{description&&<p>{description}</p>}</div>;
}
export function AdminShell({children,active,onLogout}) {
  const items=[['Overview','/admin/dashboard'],['Profile','/admin/profile'],['Education','/admin/education'],['Journey','/admin/journeys'],['Achievements','/admin/achievements'],['Experiences','/admin/experiences'],['Projects','/admin/projects']];
  return <div className="admin-layout"><aside className="admin-sidebar"><a className="brand" href="/">AZJ<span>.</span></a><div className="side-label">WORKSPACE</div>{items.map(([n,p])=><Link key={n} className={`side-link ${active===n?'active':''}`} to={p}><LayoutDashboard size={17}/>{n}</Link>)}<button className="side-link logout" onClick={onLogout}><LogOut size={17}/>Logout</button><a className="back-site" href="/">← View website</a></aside><main className="admin-main">{children}</main></div>;
}
export { Plus, Pencil, Trash2, Eye, Search, ImageIcon };
