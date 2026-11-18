import { useEffect, useState } from 'react';
import { ArrowDown, ArrowUpRight, Award, BriefcaseBusiness, FolderKanban, GraduationCap, Linkedin, Mail, Instagram, ExternalLink, CalendarDays } from 'lucide-react';
import api,{uploadUrl} from '../lib/api';
import {Navbar,Footer,SectionTitle} from '../components/UI';

function usePortfolio() {
  const [data,setData]=useState({profile:null,education:[],journeys:[],achievements:[],experiences:[],projects:[]});
  const [loading,setLoading]=useState(true);
  useEffect(()=>{ Promise.all(['profile','education','journeys','achievements','experiences','projects'].map(k=>api.get('/'+k).then(r=>[k,r.data]).catch(()=>[k,k==='profile'?null:[]])))
    .then(entries=>setData(Object.fromEntries(entries))).finally(()=>setLoading(false)); },[]);
  return {data,loading};
}
function Card({item,type}) {
  const title=item.title||item.organization_name||item.institution;
  const image=item.image||item.certificate_image;
  return <article className="content-card">
    {image?<img className="card-image" src={uploadUrl(image)} alt={title}/>:<div className="card-image placeholder"><span>AZJ<span className="dot">.</span></span></div>}
    <div className="card-body"><div className="card-meta"><span>{item.category||type}</span><span>{item.year||item.period||item.start_date||''}</span></div>
      <h3>{title}</h3><p>{item.description||item.contribution||item.award||''}</p>
      {item.award&&<strong className="award-line">{item.award}</strong>}
      {item.organizer&&<small>{item.organizer}</small>}
      {item.repository_url&&<a className="text-link" href={item.repository_url} target="_blank" rel="noreferrer">View project <ExternalLink size={14}/></a>}
    </div>
  </article>;
}
export default function PublicHome() {
  const {data,loading}=usePortfolio(); const p=data.profile||{};
  const stats=[['Achievements',data.achievements.length,Award],['Experiences',data.experiences.length,BriefcaseBusiness],['Projects',data.projects.length,FolderKanban],['Education',data.education.length,GraduationCap]];
  return <><Navbar/><main id="top">
    <section className="hero container"><div className="hero-copy"><div className="status-pill"><span/> PERSONAL PORTFOLIO · 2026</div><p className="hero-kicker">HELLO, I'M</p><h1>{p.full_name||'Aulia Zahratul Jannah'}<span>.</span></h1><h2>{p.headline||'Electrical Engineering Student'}</h2><p className="hero-description">{p.biography||'Documenting my journey through learning, leadership, research, and technology.'}</p><div className="hero-actions"><a className="btn-primary" href="#journey">Explore my journey <ArrowUpRight size={17}/></a>{p.cv_file&&<a className="btn-secondary" href={uploadUrl(p.cv_file)} target="_blank" rel="noreferrer">Download CV</a>}</div><div className="hero-note"><ArrowDown size={16}/> SCROLL TO EXPLORE</div></div><div className="hero-visual"><div className="visual-grid"></div><div className="portrait-frame">{p.profile_image?<img src={uploadUrl(p.profile_image)} alt={p.full_name}/>:<div className="portrait-placeholder">AZJ<span>.</span></div>}<div className="portrait-caption"><span>01 / ABOUT</span><strong>Curiosity into contribution.</strong></div></div><div className="orbit orbit-one"></div><div className="orbit orbit-two"></div><span className="visual-coordinate">BANDUNG · INDONESIA</span></div></section>
    <section className="stats-strip"><div className="container stats-grid">{stats.map(([label,value,Icon])=><div className="stat" key={label}><Icon size={20}/><strong>{loading?'—':value}</strong><span>{label}</span></div>)}</div></section>
    <section id="about" className="section container"><SectionTitle eyebrow="01 / ABOUT ME" title="A little about my journey" description="A curious learner interested in engineering, research, and meaningful collaboration."/><div className="about-grid"><div className="about-mark">AZJ<span>.</span></div><div><p className="about-text">{p.biography||'I am an Electrical Engineering student at Telkom University. This space brings together the experiences, achievements, and projects that have shaped my learning journey.'}</p><div className="about-facts"><span><b>EDUCATION</b> {data.education[0]?.institution||'Telkom University'}</span><span><b>FIELD</b> Electrical Engineering</span><span><b>BASED IN</b> Bandung, Indonesia</span></div></div></div></section>
    <section id="journey" className="section section-soft"><div className="container"><SectionTitle eyebrow="02 / MY JOURNEY" title="Learning through every chapter" description="A timeline of experiences and milestones from high school to university."/><div className="timeline">{data.journeys.map((item,i)=><div className="timeline-item" key={item.id}><div className="timeline-marker">{String(i+1).padStart(2,'0')}</div><div className="timeline-content"><span>{item.period||item.year} · {item.category}</span><h3>{item.title}</h3><p>{item.description}</p></div></div>)}{!loading&&!data.journeys.length&&<p className="empty-note">Journey entries will appear here once published.</p>}</div></div></section>
    <section id="achievements" className="section container"><SectionTitle eyebrow="03 / ACHIEVEMENTS" title="Milestones worth remembering" description="A selection of competitions, awards, and academic recognitions."/><div className="cards-grid">{data.achievements.map(x=><Card key={x.id} item={x} type="Achievement"/>)}</div>{!loading&&!data.achievements.length&&<p className="empty-note">Published achievements will appear here.</p>}</section>
    <section id="experiences" className="section section-soft"><div className="container"><SectionTitle eyebrow="04 / EXPERIENCES" title="People, roles & contribution" description="Organizational experiences, committees, and opportunities to contribute."/><div className="cards-grid">{data.experiences.map(x=><Card key={x.id} item={x} type="Experience"/>)}</div>{!loading&&!data.experiences.length&&<p className="empty-note">Published experiences will appear here.</p>}</div></section>
    <section id="projects" className="section container"><SectionTitle eyebrow="05 / SELECTED PROJECTS" title="Ideas turned into work" description="Research, scientific writing, and technology projects."/><div className="cards-grid">{data.projects.map(x=><Card key={x.id} item={x} type="Project"/>)}</div>{!loading&&!data.projects.length&&<p className="empty-note">Published projects will appear here.</p>}</section>
    <section id="contact" className="contact-section"><div className="container contact-inner"><div><span className="eyebrow">06 / CONTACT</span><h2>Let's connect and<br/>create something meaningful.</h2><p>For collaboration, academic opportunities, or a conversation.</p></div><div className="contact-links">{p.email&&<a href={`mailto:${p.email}`}><Mail/>Email <ArrowUpRight/></a>}{p.linkedin_url&&<a href={p.linkedin_url} target="_blank" rel="noreferrer"><Linkedin/>LinkedIn <ArrowUpRight/></a>}{p.instagram_url&&<a href={p.instagram_url} target="_blank" rel="noreferrer"><Instagram/>Instagram <ArrowUpRight/></a>}{!p.email&&!p.linkedin_url&&!p.instagram_url&&<span className="muted">Contact links can be added from the admin dashboard.</span>}</div></div></section>
  </main><Footer profile={p}/></>;
}
