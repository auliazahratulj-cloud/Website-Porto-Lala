import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LockKeyhole, ArrowLeft, Eye, EyeOff } from 'lucide-react';
import api from '../lib/api';
export default function Login(){
 const [email,setEmail]=useState(''); const [password,setPassword]=useState(''); const [show,setShow]=useState(false); const [error,setError]=useState(''); const [busy,setBusy]=useState(false); const nav=useNavigate();
 async function submit(e){e.preventDefault();setError('');setBusy(true);try{await api.post('/auth/login',{email,password});nav('/admin/dashboard');}catch(err){setError(err.response?.data?.message||'Login gagal. Periksa koneksi server.');}finally{setBusy(false);}}
 return <div className="login-page"><Link to="/" className="login-back"><ArrowLeft size={16}/> Back to portfolio</Link><div className="login-card"><div className="login-icon"><LockKeyhole/></div><span className="eyebrow">PRIVATE ACCESS</span><h1>Admin login</h1><p>Sign in to manage your portfolio content.</p><form onSubmit={submit}><label>Email address<input type="email" required autoComplete="username" value={email} onChange={e=>setEmail(e.target.value)} placeholder="admin@example.com"/></label><label>Password<div className="password-wrap"><input type={show?'text':'password'} required autoComplete="current-password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Enter your password"/><button type="button" onClick={()=>setShow(!show)}>{show?<EyeOff size={17}/>:<Eye size={17}/>}</button></div></label>{error&&<div className="form-error">{error}</div>}<button className="btn-primary full" disabled={busy}>{busy?'Signing in...':'Sign in to dashboard'}</button></form><small>Admin access only. Public registration is disabled.</small></div></div>;
}
