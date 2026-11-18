import { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import api from './lib/api';
import PublicHome from './pages/PublicHome';
import Login from './pages/Login';
import AdminPage from './pages/Admin';

function Protected({children}) {
  const [state,setState]=useState('checking');
  useEffect(()=>{api.get('/auth/me').then(()=>setState('yes')).catch(()=>setState('no'));},[]);
  if(state==='checking')return <div className="loading-screen">Checking admin session…</div>;
  return state==='yes'?children:<Navigate to="/admin/login" replace/>;
}
function AdminRoute({kind}) {
 const nav=useNavigate();
 async function logout(){try{await api.post('/auth/logout');}finally{nav('/admin/login');}}
 return <Protected><AdminPage kind={kind} onLogout={logout}/></Protected>;
}
export default function App(){
 return <Routes>
  <Route path="/" element={<PublicHome/>}/>
  <Route path="/admin/login" element={<Login/>}/>
  <Route path="/admin/dashboard" element={<AdminRoute kind="dashboard"/>}/>
  <Route path="/admin/profile" element={<AdminRoute kind="profile"/>}/>
  {['education','journeys','achievements','experiences','projects'].map(k=><Route key={k} path={`/admin/${k}`} element={<AdminRoute kind={k}/>}/>)}
  <Route path="*" element={<Navigate to="/" replace/>}/>
 </Routes>;
}
