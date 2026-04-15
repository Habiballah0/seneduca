import React from "react";
import { useState, useRef, useEffect } from "react";

const C = {
  navy:'#0D1F6E', blue:'#1B2B8C', sky:'#4AADE8', lightSky:'#7DCBF5',
  gold:'#C8A84B', goldLight:'#F0D080', white:'#FFFFFF', offWhite:'#F4F8FF',
  gray:'#6B7B99', dark:'#0A0F2E', green:'#00C473', red:'#E84A6A'
};

const s = {
  btn:(bg,color,extra={})=>({background:bg,color,border:'none',borderRadius:50,padding:'0.75rem 1.8rem',fontFamily:'inherit',fontWeight:800,fontSize:'0.95rem',cursor:'pointer',transition:'all 0.2s',...extra}),
  card:(extra={})=>({background:C.white,borderRadius:20,padding:'1.5rem',border:`1px solid rgba(74,173,232,0.12)`,boxShadow:'0 2px 12px rgba(13,31,110,0.06)',...extra}),
  tag:()=>({display:'inline-block',background:'rgba(74,173,232,0.1)',color:C.blue,padding:'0.3rem 1rem',borderRadius:50,fontSize:'0.78rem',fontWeight:800,letterSpacing:1,textTransform:'uppercase',marginBottom:'0.8rem'}),
  sectionTitle:(extra={})=>({fontFamily:'Playfair Display, serif',fontSize:'clamp(1.8rem,3vw,2.4rem)',fontWeight:900,color:C.navy,lineHeight:1.2,...extra}),
};

// ── NAV ──────────────────────────────────────────────────────────────
function Nav({page, setPage}){
  const [menuOpen,setMenuOpen]=useState(false);
  const links = [
    {id:'accueil',label:'Accueil'},
    {id:'apropos',label:'À propos'},
    {id:'repetiteurs',label:'Répétiteurs'},
    {id:'tarifs',label:'Tarifs'},
    {id:'chat',label:'🤖 SénIA'},
    {id:'dashboard',label:'Mon espace'},
  ];
  const go=(id)=>{setPage(id);setMenuOpen(false);};
  return (
    <>
    <nav style={{position:'sticky',top:0,zIndex:1000,background:'rgba(255,255,255,0.97)',backdropFilter:'blur(12px)',borderBottom:`2px solid rgba(74,173,232,0.15)`,padding:'0 4%',display:'flex',alignItems:'center',justifyContent:'space-between',height:64,boxShadow:'0 2px 16px rgba(13,31,110,0.07)'}}>
      {/* LOGO */}
      <div onClick={()=>go('accueil')} style={{cursor:'pointer',display:'flex',alignItems:'center',gap:'0.5rem',flexShrink:0}}>
        <div style={{width:40,height:40,background:`linear-gradient(135deg,${C.sky},${C.blue})`,borderRadius:10,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1.2rem'}}>📚</div>
        <div>
          <div style={{fontWeight:900,fontSize:'1rem',color:C.blue,lineHeight:1}}>SénEduca</div>
          <div style={{fontSize:'0.58rem',fontWeight:700,color:C.gold}}>La référence Sénégalaise</div>
        </div>
      </div>
      {/* DESKTOP LINKS */}
      <div style={{display:'flex',gap:'0.2rem',alignItems:'center',['@media(max-width:768px)']:{display:'none'}}}>
        <style>{`@media(max-width:768px){.nav-desktop{display:none!important;}}`}</style>
        <div className="nav-desktop" style={{display:'flex',gap:'0.2rem',alignItems:'center'}}>
          {links.map(l=>(
            <button key={l.id} onClick={()=>go(l.id)} style={{background:page===l.id?C.blue:'transparent',color:page===l.id?C.white:C.blue,border:'none',borderRadius:50,padding:'0.4rem 0.9rem',fontFamily:'inherit',fontWeight:800,fontSize:'0.8rem',cursor:'pointer',transition:'all 0.2s'}}>
              {l.label}
            </button>
          ))}
          <button onClick={()=>go('contact')} style={{...s.btn(C.gold,C.navy),padding:'0.4rem 1.1rem',fontSize:'0.8rem',marginLeft:'0.4rem'}}>S'inscrire</button>
        </div>
        {/* BURGER */}
        <button className="nav-burger" onClick={()=>setMenuOpen(!menuOpen)} style={{display:'none',background:'none',border:'none',cursor:'pointer',fontSize:'1.5rem',color:C.blue,padding:'0.3rem'}}>
          {menuOpen?'✕':'☰'}
        </button>
      </div>
      {/* BURGER visible only mobile */}
      <button onClick={()=>setMenuOpen(!menuOpen)} style={{display:'none',background:'none',border:'none',cursor:'pointer',fontSize:'1.5rem',color:C.blue,padding:'0.3rem'}} className="nav-burger-only">
        {menuOpen?'✕':'☰'}
      </button>
    </nav>
    {/* MOBILE MENU */}
    {menuOpen&&(
      <div style={{position:'fixed',top:64,left:0,right:0,zIndex:999,background:C.white,borderBottom:`2px solid rgba(74,173,232,0.15)`,boxShadow:'0 8px 24px rgba(13,31,110,0.12)',padding:'1rem 5%',display:'flex',flexDirection:'column',gap:'0.3rem'}}>
        {links.map(l=>(
          <button key={l.id} onClick={()=>go(l.id)} style={{background:page===l.id?C.blue:'transparent',color:page===l.id?C.white:C.blue,border:'none',borderRadius:12,padding:'0.8rem 1rem',fontFamily:'inherit',fontWeight:800,fontSize:'0.95rem',cursor:'pointer',textAlign:'left',transition:'all 0.2s'}}>
            {l.label}
          </button>
        ))}
        <button onClick={()=>go('contact')} style={{...s.btn(C.gold,C.navy),borderRadius:12,marginTop:'0.3rem'}}>S'inscrire</button>
      </div>
    )}
    <style>{`
      @media(max-width:768px){
        .nav-desktop{display:none!important;}
        .nav-burger-only{display:block!important;}
      }
      @media(min-width:769px){
        .nav-burger-only{display:none!important;}
        .nav-desktop{display:flex!important;}
      }
    `}</style>
    </>
  );
}

// ── ACCUEIL ──────────────────────────────────────────────────────────
function Accueil({setPage}){
  const services = [
    {icon:'🏠',title:'Cours à domicile',desc:'Répétiteurs certifiés qui se déplacent chez vous pour un suivi personnalisé.',tag:'Dakar & régions'},
    {icon:'💻',title:'Cours en ligne',desc:"Accédez à des cours en direct ou en différé depuis n'importe quel appareil.",tag:'Tout le Sénégal'},
    {icon:'📝',title:'Préparation examens',desc:'Fiches, exercices types et entraînements pour le CFEE, BFEM et BAC.',tag:'CFEE · BFEM · BAC'},
    {icon:'🤖',title:'Assistant IA 24h/24',desc:'SénIA répond à toutes vos questions pédagogiques en français à toute heure.',tag:'Disponible maintenant'},
    {icon:'📊',title:'Suivi de progression',desc:'Tableaux de bord clairs pour les parents avec rapports réguliers.',tag:'Pour les parents'},
    {icon:'✅',title:'Répétiteurs certifiés',desc:'Diplômes vérifiés, expérience validée, pédagogie testée.',tag:'Profils vérifiés'},
  ];
  const niveaux = [
    {emoji:'🌱',nom:'Primaire',classes:'CI · CP · CE1 · CE2 · CM1 · CM2',chips:['Français','Maths','Lecture','CFEE'],bg:'linear-gradient(135deg,#E8F5FF,#D0ECFF)'},
    {emoji:'📚',nom:'Collège',classes:'6ème · 5ème · 4ème · 3ème',chips:['Maths','Physique','SVT','BFEM'],bg:'linear-gradient(135deg,#EEF2FF,#DDE5FF)'},
    {emoji:'🎯',nom:'Lycée',classes:'2nde · 1ère · Terminale',chips:['BAC S','BAC L','BAC G','BAC T'],bg:'linear-gradient(135deg,#FFF8E8,#FFEFC0)'},
    {emoji:'🏆',nom:'Examens',classes:'Préparation intensive',chips:['CFEE','BFEM','BAC','Concours'],bg:'linear-gradient(135deg,#EAFFF5,#C8FFE8)'},
  ];
  const temoignages = [
    {text:'Mon fils est passé de 8/20 à 16/20 en maths en deux mois. Le répétiteur est exceptionnel, patient et très pédagogue.',nom:'Astou Fall',role:'Mère d\'élève · Terminale S',init:'AF'},
    {text:'Service très réactif. En moins de 24h, on nous a proposé un répétiteur qualifié qui correspond parfaitement à notre besoin.',nom:'Moussa Ba',role:'Père d\'élève · 3ème',init:'MB'},
    {text:'Grâce à SénEduca, ma fille a obtenu son BFEM avec mention. Le suivi personnalisé a fait toute la différence.',nom:'Fatou Diop',role:'Mère d\'élève · BFEM',init:'FD'},
  ];
  return (
    <div style={{fontFamily:'Nunito, sans-serif'}}>

      {/* HERO */}
      <div style={{background:`linear-gradient(135deg,${C.navy},${C.blue},#1a4a9e)`,padding:'5rem 8% 4rem',position:'relative',overflow:'hidden'}}>
        <div style={{position:'absolute',width:500,height:500,borderRadius:'50%',background:'rgba(74,173,232,0.07)',top:-200,right:-100}}/>
        <div style={{position:'absolute',width:250,height:250,borderRadius:'50%',background:'rgba(200,168,75,0.07)',bottom:-100,left:-50}}/>
        <div style={{position:'relative',zIndex:1,display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:'2.5rem',alignItems:'center',maxWidth:1100,margin:'0 auto'}}>
          <div>
            <div style={{display:'inline-flex',alignItems:'center',gap:'0.5rem',background:'rgba(200,168,75,0.15)',border:'1px solid rgba(200,168,75,0.4)',color:C.goldLight,padding:'0.4rem 1rem',borderRadius:50,fontSize:'0.8rem',fontWeight:700,marginBottom:'1.5rem'}}>
              ⭐ Depuis 2020 — Sen.Répétiteur évolue en SénEduca
            </div>
            <h1 style={{fontFamily:'Playfair Display, serif',fontSize:'clamp(2.2rem,4vw,3.2rem)',fontWeight:900,color:C.white,lineHeight:1.15,marginBottom:'1.2rem'}}>
              L'excellence scolaire,<br/>accessible à chaque<br/><span style={{color:C.gold}}>famille sénégalaise.</span>
            </h1>
            <p style={{color:'rgba(255,255,255,0.8)',fontSize:'1.05rem',lineHeight:1.7,marginBottom:'2rem'}}>
              Connectez vos enfants à des répétiteurs certifiés, des ressources pédagogiques adaptées au programme officiel sénégalais, et un suivi personnalisé.
            </p>
            <div style={{display:'flex',gap:'1rem',flexWrap:'wrap',marginBottom:'2.5rem'}}>
              <button onClick={()=>setPage('contact')} style={{...s.btn(C.gold,C.navy),boxShadow:'0 4px 20px rgba(200,168,75,0.4)'}}>📚 Trouver un répétiteur</button>
              <button onClick={()=>setPage('repetiteurs')} style={{...s.btn('transparent',C.white),border:'2px solid rgba(255,255,255,0.4)'}}>Voir les répétiteurs</button>
            </div>
            <div style={{display:'flex',gap:'1.5rem',flexWrap:'wrap'}}>
              {[['500+','Élèves accompagnés'],['50+','Répétiteurs certifiés'],['4 ans','D\'expérience']].map(([n,l])=>(
                <div key={l} style={{textAlign:'center'}}>
                  <div style={{fontFamily:'Playfair Display,serif',fontSize:'1.8rem',fontWeight:900,color:C.gold}}>{n}</div>
                  <div style={{fontSize:'0.75rem',color:'rgba(255,255,255,0.6)',fontWeight:600}}>{l}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{background:'rgba(255,255,255,0.1)',backdropFilter:'blur(20px)',border:'1px solid rgba(255,255,255,0.2)',borderRadius:24,padding:'2rem',boxShadow:'0 20px 60px rgba(0,0,0,0.3)'}}>
            <div style={{color:C.white,fontWeight:800,marginBottom:'1rem'}}>🎓 Niveaux couverts</div>
            <div style={{marginBottom:'1rem'}}>
              {['Primaire','Collège','Lycée','Terminale','BAC','BFEM','CFEE'].map(n=>(
                <span key={n} style={{display:'inline-block',padding:'0.3rem 0.8rem',borderRadius:50,fontSize:'0.78rem',fontWeight:700,margin:'0.25rem',background:'rgba(74,173,232,0.2)',color:C.lightSky,border:'1px solid rgba(74,173,232,0.3)'}}>{n}</span>
              ))}
            </div>
            <div style={{height:1,background:'rgba(255,255,255,0.1)',margin:'1rem 0'}}/>
            {[['🏠','Cours à domicile (Dakar & régions)'],['💻','Cours en ligne disponibles'],['🤖','Assistant IA pédagogique 24h/24'],['📊','Suivi de progression en temps réel'],['✅','Répétiteurs rigoureusement sélectionnés']].map(([icon,txt])=>(
              <div key={txt} style={{display:'flex',alignItems:'center',gap:'0.8rem',padding:'0.5rem 0',color:'rgba(255,255,255,0.85)',fontSize:'0.88rem',fontWeight:600}}>
                <span style={{fontSize:'1.1rem',width:28,textAlign:'center'}}>{icon}</span>{txt}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* STRIP STATS */}
      <div style={{background:C.blue,padding:'2rem 5%',display:'flex',justifyContent:'center',gap:'2rem',flexWrap:'wrap'}}>
        {[['500+','Élèves accompagnés'],['50+','Répétiteurs certifiés'],['5','Villes desservies'],['98%','Satisfaction'],['4 ans','D\'expérience']].map(([n,l])=>(
          <div key={l} style={{textAlign:'center'}}>
            <div style={{fontFamily:'Playfair Display,serif',fontSize:'2.2rem',fontWeight:900,color:C.gold}}>{n}</div>
            <div style={{color:'rgba(255,255,255,0.7)',fontSize:'0.85rem',fontWeight:600}}>{l}</div>
          </div>
        ))}
      </div>

      {/* SERVICES */}
      <div style={{background:C.offWhite,padding:'4rem 5%'}}>
        <div style={{maxWidth:1100,margin:'0 auto'}}>
          <span style={s.tag()}>Nos Services</span>
          <h2 style={s.sectionTitle()}>Tout ce dont votre enfant <span style={{color:C.sky}}>a besoin</span></h2>
          <p style={{color:C.gray,fontSize:'1rem',marginTop:'0.6rem',marginBottom:'2.5rem'}}>Solutions éducatives adaptées au programme officiel sénégalais.</p>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))',gap:'1.2rem'}}>
            {services.map(sv=>(
              <div key={sv.title} style={{...s.card(),position:'relative',overflow:'hidden',transition:'transform 0.2s',cursor:'default'}}
                onMouseEnter={e=>e.currentTarget.style.transform='translateY(-5px)'}
                onMouseLeave={e=>e.currentTarget.style.transform='translateY(0)'}>
                <div style={{position:'absolute',top:0,left:0,right:0,height:4,background:`linear-gradient(90deg,${C.sky},${C.blue})`}}/>
                <div style={{width:50,height:50,borderRadius:14,background:`linear-gradient(135deg,${C.sky},${C.blue})`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1.3rem',marginBottom:'1rem',boxShadow:'0 6px 16px rgba(74,173,232,0.3)'}}>{sv.icon}</div>
                <div style={{fontWeight:800,fontSize:'1rem',color:C.navy,marginBottom:'0.4rem'}}>{sv.title}</div>
                <p style={{color:C.gray,fontSize:'0.88rem',lineHeight:1.6,marginBottom:'0.8rem'}}>{sv.desc}</p>
                <span style={{background:'rgba(74,173,232,0.1)',color:C.blue,padding:'0.2rem 0.7rem',borderRadius:50,fontSize:'0.72rem',fontWeight:800}}>{sv.tag}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* COMMENT ÇA MARCHE */}
      <div style={{background:C.white,padding:'4rem 5%'}}>
        <div style={{maxWidth:1000,margin:'0 auto',textAlign:'center'}}>
          <span style={s.tag()}>Comment ça marche</span>
          <h2 style={s.sectionTitle({marginBottom:'2.5rem'})}>Simple, rapide, <span style={{color:C.sky}}>efficace</span></h2>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))',gap:'1.5rem',position:'relative'}}>
            <div style={{position:'absolute',top:36,left:'12%',right:'12%',height:2,background:`linear-gradient(90deg,${C.sky},${C.gold})`,zIndex:0}}/>
            {[['1','Inscrivez votre enfant','Remplissez le formulaire avec le niveau et les matières.'],['2','On vous propose un répétiteur','Sélection du meilleur profil selon vos besoins.'],['3','Les cours commencent','À domicile ou en ligne, selon votre planning.'],['4','Suivez les progrès','Rapports réguliers et ajustements du programme.']].map(([n,t,d])=>(
              <div key={n} style={{textAlign:'center',position:'relative',zIndex:1}}>
                <div style={{width:72,height:72,borderRadius:'50%',background:`linear-gradient(135deg,${C.sky},${C.blue})`,color:C.white,fontFamily:'Playfair Display,serif',fontSize:'1.6rem',fontWeight:900,display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 1rem',boxShadow:'0 8px 24px rgba(74,173,232,0.4)'}}>{n}</div>
                <div style={{fontWeight:800,color:C.navy,marginBottom:'0.4rem'}}>{t}</div>
                <div style={{color:C.gray,fontSize:'0.85rem',lineHeight:1.6}}>{d}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* NIVEAUX */}
      <div style={{background:C.offWhite,padding:'4rem 5%'}}>
        <div style={{maxWidth:1000,margin:'0 auto'}}>
          <span style={s.tag()}>Niveaux Scolaires</span>
          <h2 style={s.sectionTitle({marginBottom:'2rem'})}>Du primaire à la <span style={{color:C.sky}}>Terminale</span></h2>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(210px,1fr))',gap:'1.2rem'}}>
            {niveaux.map(n=>(
              <div key={n.nom} style={{borderRadius:18,padding:'1.6rem',background:n.bg,border:'2px solid rgba(74,173,232,0.15)',textAlign:'center',transition:'transform 0.2s'}}
                onMouseEnter={e=>e.currentTarget.style.transform='translateY(-4px)'}
                onMouseLeave={e=>e.currentTarget.style.transform='translateY(0)'}>
                <div style={{fontSize:'2.2rem',marginBottom:'0.6rem'}}>{n.emoji}</div>
                <div style={{fontWeight:900,color:C.navy}}>{n.nom}</div>
                <div style={{fontSize:'0.8rem',color:C.gray,margin:'0.3rem 0 0.8rem'}}>{n.classes}</div>
                <div style={{display:'flex',flexWrap:'wrap',justifyContent:'center',gap:'0.3rem'}}>
                  {n.chips.map(c=><span key={c} style={{background:'rgba(255,255,255,0.75)',padding:'0.2rem 0.6rem',borderRadius:20,fontSize:'0.72rem',fontWeight:700,color:C.blue}}>{c}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* TEMOIGNAGES */}
      <div style={{background:C.white,padding:'4rem 5%'}}>
        <div style={{maxWidth:1100,margin:'0 auto',textAlign:'center'}}>
          <span style={s.tag()}>Témoignages</span>
          <h2 style={s.sectionTitle({marginBottom:'2.5rem'})}>Ce que disent les <span style={{color:C.sky}}>familles</span></h2>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:'1.5rem'}}>
            {temoignages.map(t=>(
              <div key={t.nom} style={{...s.card(),textAlign:'left',position:'relative'}}>
                <div style={{position:'absolute',top:-14,left:20,width:36,height:36,borderRadius:'50%',background:`linear-gradient(135deg,${C.gold},#8B6914)`,display:'flex',alignItems:'center',justifyContent:'center',color:C.white,fontWeight:900,boxShadow:'0 4px 12px rgba(200,168,75,0.4)'}}>❝</div>
                <p style={{color:C.gray,fontSize:'0.9rem',lineHeight:1.7,fontStyle:'italic',marginTop:'0.5rem'}}>{t.text}</p>
                <div style={{display:'flex',alignItems:'center',gap:'0.8rem',marginTop:'1.2rem'}}>
                  <div style={{width:42,height:42,borderRadius:'50%',background:`linear-gradient(135deg,${C.sky},${C.blue})`,display:'flex',alignItems:'center',justifyContent:'center',color:C.white,fontWeight:700}}>{t.init}</div>
                  <div>
                    <div style={{fontWeight:800,fontSize:'0.9rem',color:C.navy}}>{t.nom}</div>
                    <div style={{fontSize:'0.75rem',color:C.gray}}>{t.role}</div>
                    <div style={{color:C.gold,fontSize:'0.8rem'}}>★★★★★</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA SECTION */}
      <div style={{background:`linear-gradient(135deg,${C.navy},${C.blue})`,padding:'4rem 5%',textAlign:'center',position:'relative',overflow:'hidden'}}>
        <div style={{position:'absolute',width:400,height:400,borderRadius:'50%',background:'rgba(74,173,232,0.07)',top:-150,right:-100}}/>
        <div style={{position:'relative',zIndex:1,maxWidth:600,margin:'0 auto'}}>
          <h2 style={{fontFamily:'Playfair Display,serif',fontSize:'clamp(1.8rem,3vw,2.4rem)',fontWeight:900,color:C.white,marginBottom:'1rem'}}>
            Premier cours <span style={{color:C.gold}}>offert !</span>
          </h2>
          <p style={{color:'rgba(255,255,255,0.75)',marginBottom:'2rem',lineHeight:1.6}}>Essayez SénEduca sans risque — inscrivez votre enfant aujourd'hui.</p>
          <div style={{display:'flex',gap:'1rem',justifyContent:'center',flexWrap:'wrap'}}>
            <a href="https://wa.me/221709380086" target="_blank" rel="noreferrer" style={{...s.btn('#25D366',C.white),textDecoration:'none',display:'inline-flex',alignItems:'center',gap:'0.5rem',boxShadow:'0 4px 20px rgba(37,211,102,0.4)'}}>💬 WhatsApp</a>
            <button onClick={()=>setPage('contact')} style={{...s.btn(C.gold,C.navy),boxShadow:'0 4px 20px rgba(200,168,75,0.4)'}}>📩 S'inscrire</button>
          </div>
        </div>
      </div>

      {/* CONTACT */}
      <Contact/>
    </div>
  );
}

// ── CONTACT (réutilisable) ────────────────────────────────────────────
function Contact(){
  const [form,setForm]=useState({nom:'',tel:'',niveau:'',type:'',msg:''});
  const [sent,setSent]=useState(false);
  return (
    <div id="contact" style={{background:C.offWhite,padding:'4rem 5%'}}>
      <div style={{maxWidth:900,margin:'0 auto'}}>
        <span style={s.tag()}>Contact</span>
        <h2 style={s.sectionTitle({marginBottom:'2rem'})}>Parlons de votre <span style={{color:C.sky}}>projet éducatif</span></h2>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:'2rem'}}>
          <div>
            {[['📞','Téléphone','À venir — en cours de mise à jour'],['✉️','Email','contact@seneduca.sn'],['📍','Zones','Dakar · Thiès · Saint-Louis · Ziguinchor · Kaolack'],['🕐','Disponibilité','Toujours disponible · Réponse sous 2h']].map(([icon,label,val])=>(
              <div key={label} style={{display:'flex',gap:'1rem',padding:'1rem',background:C.white,borderRadius:14,border:`1px solid rgba(74,173,232,0.15)`,marginBottom:'0.8rem'}}>
                <div style={{width:42,height:42,borderRadius:12,background:`linear-gradient(135deg,${C.sky},${C.blue})`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1.1rem',flexShrink:0}}>{icon}</div>
                <div><div style={{fontWeight:800,color:C.navy,fontSize:'0.88rem'}}>{label}</div><div style={{color:C.gray,fontSize:'0.85rem'}}>{val}</div></div>
              </div>
            ))}
          </div>
          <div style={{...s.card()}}>
            <div style={{fontWeight:800,fontSize:'1.05rem',color:C.navy,marginBottom:'1.2rem'}}>Demande d'inscription</div>
            {sent ? (
              <div style={{textAlign:'center',padding:'2rem'}}>
                <div style={{fontSize:'3rem',marginBottom:'1rem'}}>✅</div>
                <div style={{fontWeight:800,color:C.navy,fontSize:'1.1rem'}}>Demande envoyée !</div>
                <div style={{color:C.gray,marginTop:'0.5rem'}}>Nous vous contacterons sous 2h.</div>
              </div>
            ) : (
              <div>
                {[['Nom & Prénom','nom','text','Ex: Fatou Diallo'],['Téléphone','tel','tel','7X XXX XX XX']].map(([label,key,type,ph])=>(
                  <div key={key} style={{marginBottom:'0.8rem'}}>
                    <label style={{display:'block',fontSize:'0.82rem',fontWeight:700,color:C.navy,marginBottom:'0.3rem'}}>{label}</label>
                    <input type={type} placeholder={ph} value={form[key]} onChange={e=>setForm({...form,[key]:e.target.value})}
                      style={{width:'100%',padding:'0.7rem 1rem',border:`1.5px solid rgba(74,173,232,0.25)`,borderRadius:10,fontFamily:'inherit',fontSize:'0.9rem',outline:'none',background:C.offWhite,boxSizing:'border-box'}}/>
                  </div>
                ))}
                <div style={{marginBottom:'0.8rem'}}>
                  <label style={{display:'block',fontSize:'0.82rem',fontWeight:700,color:C.navy,marginBottom:'0.3rem'}}>Niveau de l'élève</label>
                  <select value={form.niveau} onChange={e=>setForm({...form,niveau:e.target.value})} style={{width:'100%',padding:'0.7rem 1rem',border:`1.5px solid rgba(74,173,232,0.25)`,borderRadius:10,fontFamily:'inherit',fontSize:'0.9rem',outline:'none',background:C.offWhite}}>
                    <option value=''>— Sélectionner —</option>
                    <option>Primaire (CI – CM2)</option><option>Collège (6ème – 3ème)</option><option>Lycée (2nde – Terminale)</option><option>Préparation CFEE / BFEM / BAC</option>
                  </select>
                </div>
                <div style={{marginBottom:'1rem'}}>
                  <label style={{display:'block',fontSize:'0.82rem',fontWeight:700,color:C.navy,marginBottom:'0.3rem'}}>Message (optionnel)</label>
                  <textarea value={form.msg} onChange={e=>setForm({...form,msg:e.target.value})} placeholder="Matières, disponibilités, quartier..." rows={3}
                    style={{width:'100%',padding:'0.7rem 1rem',border:`1.5px solid rgba(74,173,232,0.25)`,borderRadius:10,fontFamily:'inherit',fontSize:'0.9rem',outline:'none',resize:'vertical',background:C.offWhite,boxSizing:'border-box'}}/>
                </div>
                <button onClick={()=>setSent(true)} style={{...s.btn(C.blue,C.white),width:'100%',borderRadius:10}}>📩 Envoyer la demande</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── FORMULAIRE CANDIDATURE ENSEIGNANT ────────────────────────────────
function CandidatureForm(){
  const [form,setForm]=useState({nom:'',tel:'',email:'',niveau:'',matieres:'',experience:''});
  const [sent,setSent]=useState(false);
  const field=(label,key,type='text',ph='')=>(
    <div style={{marginBottom:'0.8rem'}}>
      <label style={{display:'block',fontSize:'0.78rem',fontWeight:800,color:'rgba(255,255,255,0.8)',marginBottom:'0.3rem'}}>{label}</label>
      <input type={type} placeholder={ph} value={form[key]} onChange={e=>setForm({...form,[key]:e.target.value})}
        style={{width:'100%',padding:'0.65rem 1rem',border:'1.5px solid rgba(255,255,255,0.2)',borderRadius:10,fontFamily:'inherit',fontSize:'0.88rem',outline:'none',background:'rgba(255,255,255,0.1)',color:C.white,boxSizing:'border-box'}}/>
    </div>
  );
  if(sent) return (
    <div style={{background:'rgba(255,255,255,0.1)',backdropFilter:'blur(12px)',borderRadius:20,padding:'2rem',textAlign:'center',border:'1px solid rgba(255,255,255,0.2)'}}>
      <div style={{fontSize:'3rem',marginBottom:'1rem'}}>🎉</div>
      <div style={{fontFamily:'Playfair Display,serif',fontSize:'1.3rem',fontWeight:900,color:C.white}}>Candidature envoyée !</div>
      <div style={{color:'rgba(255,255,255,0.7)',marginTop:'0.5rem',fontSize:'0.9rem'}}>Nous vous contacterons sous 48h pour un entretien.</div>
    </div>
  );
  return (
    <div style={{background:'rgba(255,255,255,0.1)',backdropFilter:'blur(12px)',borderRadius:20,padding:'1.8rem',border:'1px solid rgba(255,255,255,0.2)'}}>
      <div style={{fontFamily:'Playfair Display,serif',fontWeight:900,fontSize:'1.1rem',color:C.white,marginBottom:'1.2rem'}}>📝 Postuler maintenant</div>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'0 0.8rem'}}>
        {field('Nom & Prénom','nom','text','Ex: Moussa Diallo')}
        {field('Téléphone','tel','tel','+221 7X XXX XX XX')}
      </div>
      {field('Email','email','email','votre@email.com')}
      <div style={{marginBottom:'0.8rem'}}>
        <label style={{display:'block',fontSize:'0.78rem',fontWeight:800,color:'rgba(255,255,255,0.8)',marginBottom:'0.3rem'}}>Niveau enseigné</label>
        <select value={form.niveau} onChange={e=>setForm({...form,niveau:e.target.value})}
          style={{width:'100%',padding:'0.65rem 1rem',border:'1.5px solid rgba(255,255,255,0.2)',borderRadius:10,fontFamily:'inherit',fontSize:'0.88rem',outline:'none',background:'rgba(255,255,255,0.1)',color:form.niveau?C.white:'rgba(255,255,255,0.5)'}}>
          <option value=''>— Sélectionner —</option>
          <option>Primaire</option><option>Collège</option><option>Seconde</option>
          <option>Première</option><option>Terminale</option><option>Licence (1,2,3)</option>
        </select>
      </div>
      {field('Matières enseignées','matieres','text','Ex: Maths, Physique, SVT...')}
      {field("Années d'expérience",'experience','text','Ex: 3 ans')}
      <button onClick={()=>form.nom&&form.tel&&setSent(true)}
        style={{width:'100%',background:C.gold,color:C.navy,border:'none',borderRadius:12,padding:'0.85rem',fontFamily:'inherit',fontWeight:800,fontSize:'0.95rem',cursor:'pointer',marginTop:'0.3rem',transition:'all 0.2s'}}>
        Envoyer ma candidature →
      </button>
      <div style={{textAlign:'center',marginTop:'1rem'}}>
        <a href="https://wa.me/221709380086" target="_blank" rel="noreferrer" style={{color:'rgba(255,255,255,0.7)',fontSize:'0.8rem',fontWeight:700,textDecoration:'none'}}>
          💬 Ou postulez directement via WhatsApp
        </a>
      </div>
    </div>
  );
}

// ── RÉPÉTITEURS ───────────────────────────────────────────────────────
function Repetiteurs(){
  const reps = [
    {name:'M. Ibrahima Diallo',title:'Professeur certifié',spec:'Mathématiques · Physique',stars:5,niveaux:['lycee','college'],matieres:['maths','sciences'],zone:'Dakar Plateau, Médina',diplome:'Licence Maths — UCAD',exp:'5 ans',emoji:'👨‍🏫',bg:`linear-gradient(135deg,${C.sky},${C.blue})`,about:'Professeur de Maths et Physique-Chimie avec 5 ans d\'expérience. Spécialisé BAC Série S.'},
    {name:'Mme Aminata Ndiaye',title:'Enseignante Collège & Lycée',spec:'Français · Littérature',stars:5,niveaux:['college','lycee'],matieres:['francais'],zone:'Grand Dakar, Fass',diplome:'Maîtrise Lettres — UCAD',exp:'8 ans',emoji:'👩‍🏫',bg:`linear-gradient(135deg,${C.gold},#8B6914)`,about:'Passionnée par la langue française. A accompagné plus de 100 élèves vers la réussite.'},
    {name:'M. Ousmane Sow',title:'Professeur SVT',spec:'SVT · Biologie',stars:4,niveaux:['college','lycee'],matieres:['sciences'],zone:'Pikine, Guédiawaye',diplome:'Licence SVT — UCAD',exp:'6 ans',emoji:'👨‍🏫',bg:`linear-gradient(135deg,#00C473,#006B3C)`,about:'Spécialiste SVT, rend les sciences accessibles et passionnantes pour tous les élèves.'},
    {name:'Mme Fatou Fall',title:'Professeure de Langues',spec:'Anglais · Espagnol',stars:5,niveaux:['primaire','college','lycee'],matieres:['anglais'],zone:'Parcelles Assainies',diplome:'Maîtrise Anglais — UCAD',exp:'10 ans',emoji:'👩‍🏫',bg:`linear-gradient(135deg,#E84A6A,#8C1B35)`,about:'10 ans d\'expérience dans l\'enseignement des langues à tous les niveaux.'},
    {name:'M. Mamadou Ba',title:'Instituteur Primaire',spec:'Maths · Français · Lecture',stars:5,niveaux:['primaire','college'],matieres:['maths','francais'],zone:'Thiès, Mbour',diplome:'CRFPE — Diplômé',exp:'12 ans',emoji:'👨‍🏫',bg:`linear-gradient(135deg,#9B59B6,#5B2C7C)`,about:'Instituteur diplômé, spécialisé primaire et préparation CFEE/BFEM depuis 12 ans.'},
    {name:'Mme Rokhaya Diop',title:'Ingénieure — Maths avancés',spec:'Maths · Physique · Info',stars:5,niveaux:['lycee'],matieres:['maths','sciences'],zone:'Almadies, Mermoz',diplome:'Ingénieure — ESP Dakar',exp:'4 ans',emoji:'👩‍🏫',bg:`linear-gradient(135deg,#E67E22,#A04000)`,about:'Ingénieure de l\'ESP, approche rigoureuse pour les Terminales visant une mention BAC S.'},
  ];
  const [filtre,setFiltre]=useState('tous');
  const [search,setSearch]=useState('');
  const [modal,setModal]=useState(null);
  const filtres = [{id:'tous',label:'Tous'},{id:'primaire',label:'Primaire'},{id:'college',label:'Collège'},{id:'lycee',label:'Lycée'},{id:'maths',label:'Maths'},{id:'sciences',label:'Sciences'},{id:'francais',label:'Français'},{id:'anglais',label:'Anglais'}];
  const filtered = reps.filter(r=>{
    const matchF = filtre==='tous'||r.niveaux.includes(filtre)||r.matieres.includes(filtre);
    const matchS = !search||r.name.toLowerCase().includes(search.toLowerCase())||r.spec.toLowerCase().includes(search.toLowerCase());
    return matchF&&matchS;
  });
  return (
    <div style={{fontFamily:'Nunito,sans-serif',background:C.offWhite,minHeight:'100vh'}}>
      {/* Hero */}
      <div style={{background:`linear-gradient(135deg,${C.navy},${C.blue})`,padding:'3rem 5% 2.5rem',textAlign:'center',position:'relative',overflow:'hidden'}}>
        <div style={{position:'absolute',width:400,height:400,borderRadius:'50%',background:'rgba(74,173,232,0.07)',top:-150,right:-100}}/>
        <div style={{position:'relative',zIndex:1}}>
          <div style={{display:'inline-block',background:'rgba(200,168,75,0.15)',border:'1px solid rgba(200,168,75,0.4)',color:C.goldLight,padding:'0.4rem 1.2rem',borderRadius:50,fontSize:'0.82rem',fontWeight:700,marginBottom:'1rem'}}>👨‍🏫 Notre équipe pédagogique</div>
          <h1 style={{fontFamily:'Playfair Display,serif',fontSize:'clamp(2rem,4vw,2.8rem)',fontWeight:900,color:C.white,marginBottom:'0.8rem'}}>Des répétiteurs <span style={{color:C.gold}}>certifiés</span></h1>
          <p style={{color:'rgba(255,255,255,0.75)',fontSize:'1rem',maxWidth:500,margin:'0 auto'}}>Diplômes vérifiés, expérience validée, pédagogie testée.</p>
          <div style={{display:'flex',justifyContent:'center',gap:'3rem',marginTop:'2rem',flexWrap:'wrap'}}>
            {[['50+','Répétiteurs actifs'],['98%','Satisfaction'],['15+','Matières'],['5','Villes']].map(([n,l])=>(
              <div key={l} style={{textAlign:'center'}}><div style={{fontFamily:'Playfair Display,serif',fontSize:'2rem',fontWeight:900,color:C.gold}}>{n}</div><div style={{color:'rgba(255,255,255,0.6)',fontSize:'0.78rem',fontWeight:600}}>{l}</div></div>
            ))}
          </div>
        </div>
      </div>

      {/* Filtres */}
      <div style={{background:C.white,padding:'1.2rem 5%',borderBottom:`1px solid rgba(74,173,232,0.1)`,display:'flex',gap:'0.5rem',flexWrap:'wrap',alignItems:'center'}}>
        <span style={{fontWeight:800,color:C.navy,fontSize:'0.88rem',marginRight:'0.3rem'}}>Filtrer :</span>
        {filtres.map(f=>(
          <button key={f.id} onClick={()=>setFiltre(f.id)} style={{background:filtre===f.id?C.blue:C.white,color:filtre===f.id?C.white:C.blue,border:`2px solid ${filtre===f.id?C.blue:'rgba(74,173,232,0.3)'}`,borderRadius:50,padding:'0.4rem 1rem',fontFamily:'inherit',fontWeight:700,fontSize:'0.8rem',cursor:'pointer'}}>{f.label}</button>
        ))}
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="🔍 Rechercher..." style={{marginLeft:'auto',padding:'0.4rem 1rem',border:`2px solid rgba(74,173,232,0.25)`,borderRadius:50,fontFamily:'inherit',fontSize:'0.85rem',outline:'none',width:200}}/>
      </div>

      {/* Grille */}
      <div style={{padding:'2rem 5%',maxWidth:1200,margin:'0 auto'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'1.5rem'}}>
          <h2 style={{fontWeight:800,color:C.navy,fontSize:'1.2rem'}}>Répétiteurs <span style={{color:C.sky}}>disponibles</span></h2>
          <span style={{background:'rgba(74,173,232,0.1)',color:C.blue,padding:'0.3rem 0.9rem',borderRadius:50,fontSize:'0.82rem',fontWeight:800}}>{filtered.length} répétiteur{filtered.length>1?'s':''}</span>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))',gap:'1.2rem'}}>
          {filtered.map(r=>(
            <div key={r.name} style={{...s.card({padding:0}),overflow:'hidden',transition:'transform 0.2s,box-shadow 0.2s'}}
              onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-5px)';e.currentTarget.style.boxShadow='0 16px 40px rgba(13,31,110,0.12)';}}
              onMouseLeave={e=>{e.currentTarget.style.transform='translateY(0)';e.currentTarget.style.boxShadow='0 2px 12px rgba(13,31,110,0.06)';}}>
              <div style={{padding:'1.2rem',display:'flex',gap:'1rem',borderBottom:`1px solid rgba(74,173,232,0.08)`}}>
                <div style={{width:68,height:68,borderRadius:'50%',background:r.bg,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1.8rem',flexShrink:0}}>{r.emoji}</div>
                <div style={{flex:1}}>
                  <div style={{fontWeight:900,fontSize:'0.95rem',color:C.navy}}>{r.name}</div>
                  <div style={{color:C.gray,fontSize:'0.78rem',marginTop:'0.1rem'}}>{r.title}</div>
                  <div style={{color:C.sky,fontWeight:700,fontSize:'0.8rem',marginTop:'0.2rem'}}>{r.spec}</div>
                  <div style={{color:C.gold,fontSize:'0.85rem',marginTop:'0.3rem'}}>{'★'.repeat(r.stars)+'☆'.repeat(5-r.stars)}</div>
                </div>
              </div>
              <div style={{padding:'1rem 1.2rem'}}>
                <div style={{display:'flex',gap:'1rem',fontSize:'0.8rem',color:C.gray,marginBottom:'0.8rem'}}>
                  <span>📍 {r.zone}</span><span>🎓 {r.exp}</span>
                </div>
                <div style={{display:'flex',gap:'0.8rem',alignItems:'center',background:C.offWhite,padding:'0.8rem',borderRadius:12}}>
                  <span style={{color:C.green,fontSize:'0.75rem',fontWeight:800,display:'flex',alignItems:'center',gap:'0.3rem'}}><span style={{width:7,height:7,borderRadius:'50%',background:C.green,display:'inline-block'}}/>Disponible</span>
                  <button onClick={()=>setModal(r)} style={{...s.btn(C.blue,C.white,{padding:'0.4rem 1rem',fontSize:'0.8rem',borderRadius:10,marginLeft:'auto'})}} >Voir le profil</button>
                  <a href="https://wa.me/221709380086" target="_blank" rel="noreferrer" style={{width:34,height:34,borderRadius:10,background:'#25D366',display:'flex',alignItems:'center',justifyContent:'center',textDecoration:'none',fontSize:'1rem'}}>💬</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION DEVENIR RÉPÉTITEUR */}
      <div style={{background:`linear-gradient(135deg,${C.navy},${C.blue})`,padding:'4rem 5%',position:'relative',overflow:'hidden'}}>
        <div style={{position:'absolute',width:400,height:400,borderRadius:'50%',background:'rgba(74,173,232,0.07)',top:-150,right:-100}}/>
        <div style={{position:'relative',zIndex:1,maxWidth:900,margin:'0 auto',display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:'3rem',alignItems:'center'}}>
          <div>
            <div style={{display:'inline-block',background:'rgba(200,168,75,0.15)',border:'1px solid rgba(200,168,75,0.4)',color:C.goldLight,padding:'0.4rem 1.2rem',borderRadius:50,fontSize:'0.82rem',fontWeight:700,marginBottom:'1rem'}}>👩‍🏫 Rejoindre l'équipe</div>
            <h2 style={{fontFamily:'Playfair Display,serif',fontSize:'clamp(1.8rem,3vw,2.4rem)',fontWeight:900,color:C.white,marginBottom:'1rem',lineHeight:1.2}}>Vous êtes enseignant ?<br/>Rejoignez <span style={{color:C.gold}}>SénEduca</span> !</h2>
            <p style={{color:'rgba(255,255,255,0.75)',lineHeight:1.7,marginBottom:'1.5rem'}}>Partagez votre savoir, aidez les élèves sénégalais à réussir et développez votre activité avec une équipe professionnelle et bienveillante.</p>
            <div style={{display:'flex',flexDirection:'column',gap:'0.7rem'}}>
              {[['✅','Rémunération attractive payée chaque mois'],['✅','Élèves fournis — vous enseignez, on gère le reste'],['✅','Flexible : domicile ou en ligne selon vos disponibilités'],['✅','Cadre professionnel avec contrat officiel'],['✅','Rejoignez une communauté d\'enseignants engagés']].map(([icon,txt])=>(
                <div key={txt} style={{display:'flex',alignItems:'flex-start',gap:'0.6rem',color:'rgba(255,255,255,0.85)',fontSize:'0.9rem',fontWeight:600}}>
                  <span style={{color:C.green,flexShrink:0}}>{icon}</span>{txt}
                </div>
              ))}
            </div>
          </div>
          <CandidatureForm/>
        </div>
      </div>

      {/* Modal */}
      {modal&&(
        <div onClick={e=>{if(e.target===e.currentTarget)setModal(null)}} style={{position:'fixed',inset:0,background:'rgba(10,15,46,0.7)',zIndex:2000,display:'flex',alignItems:'center',justifyContent:'center',padding:'1rem',backdropFilter:'blur(4px)'}}>
          <div style={{background:C.white,borderRadius:24,maxWidth:580,width:'100%',maxHeight:'90vh',overflowY:'auto'}}>
            <div style={{background:`linear-gradient(135deg,${C.navy},${C.blue})`,padding:'2rem',borderRadius:'24px 24px 0 0',display:'flex',gap:'1.2rem',alignItems:'center',position:'relative'}}>
              <button onClick={()=>setModal(null)} style={{position:'absolute',top:'1rem',right:'1rem',background:'rgba(255,255,255,0.15)',border:'none',color:C.white,width:32,height:32,borderRadius:'50%',cursor:'pointer',fontSize:'1rem'}}>✕</button>
              <div style={{width:70,height:70,borderRadius:'50%',background:modal.bg,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'2rem',border:'3px solid rgba(255,255,255,0.3)'}}>{modal.emoji}</div>
              <div>
                <div style={{fontFamily:'Playfair Display,serif',fontSize:'1.4rem',fontWeight:900,color:C.white}}>{modal.name}</div>
                <div style={{color:'rgba(255,255,255,0.7)',fontSize:'0.85rem'}}>{modal.title}</div>
                <div style={{color:C.gold,marginTop:'0.3rem'}}>{'★'.repeat(modal.stars)}</div>
              </div>
            </div>
            <div style={{padding:'1.8rem'}}>
              {[['À propos',<p style={{color:C.gray,fontSize:'0.9rem',lineHeight:1.7}}>{modal.about}</p>],
                ['Matières',<div style={{display:'flex',flexWrap:'wrap',gap:'0.4rem'}}>{modal.spec.split('·').map(m=><span key={m} style={{background:C.offWhite,padding:'0.3rem 0.8rem',borderRadius:20,fontSize:'0.82rem',fontWeight:700,color:C.blue,border:`1px solid rgba(74,173,232,0.2)`}}>{m.trim()}</span>)}</div>],
                ['Infos pratiques',<div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'0.8rem'}}>
                  {[['Diplôme',modal.diplome],['Expérience',modal.exp],['Zone',modal.zone],['Langue','Français, Wolof']].map(([k,v])=>(
                    <div key={k} style={{background:C.offWhite,padding:'0.8rem',borderRadius:12}}><div style={{fontSize:'0.7rem',fontWeight:800,color:C.gray,textTransform:'uppercase'}}>{k}</div><div style={{fontWeight:700,color:C.navy,marginTop:'0.2rem',fontSize:'0.88rem'}}>{v}</div></div>
                  ))}
                </div>]
              ].map(([title,content])=>(
                <div key={title} style={{marginBottom:'1.5rem'}}>
                  <div style={{fontSize:'0.78rem',fontWeight:800,color:C.navy,textTransform:'uppercase',letterSpacing:1,paddingBottom:'0.5rem',borderBottom:`2px solid ${C.offWhite}`,marginBottom:'0.8rem'}}>{title}</div>
                  {content}
                </div>
              ))}
            </div>
            <div style={{padding:'1.2rem 1.8rem',borderTop:`1px solid ${C.offWhite}`,display:'flex',gap:'1rem'}}>
              <a href="https://wa.me/221709380086" target="_blank" rel="noreferrer" style={{...s.btn('#25D366',C.white,{flex:1,textAlign:'center',textDecoration:'none',borderRadius:12})}} >💬 WhatsApp</a>
              <button onClick={()=>setModal(null)} style={{...s.btn(C.blue,C.white,{flex:1,borderRadius:12})}}>📩 S'inscrire</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── TARIFS ────────────────────────────────────────────────────────────
function Tarifs(){
  const [option,setOption]=useState('option1');
  const [openFaq,setOpenFaq]=useState(null);
  const niveaux=[
    {nom:'Primaire',emoji:'🌱',heure:'2 500',o1:'40 000',o2:'55 000',color:'#4AADE8'},
    {nom:'Collège',emoji:'📚',heure:'3 000',o1:'48 000',o2:'60 000',color:'#1B2B8C'},
    {nom:'Seconde',emoji:'📖',heure:'3 500',o1:'56 000',o2:'70 000',color:'#C8A84B'},
    {nom:'Première',emoji:'🎯',heure:'4 000',o1:'64 000',o2:'74 000',color:'#00C473'},
    {nom:'Terminale',emoji:'🏆',heure:'5 000',o1:'80 000',o2:'98 000',color:'#E84A6A'},
    {nom:'Licence (1,2,3)',emoji:'🎓',heure:'10 000',o1:'160 000',o2:'180 000',color:'#9B59B6'},
  ];
  const faqs=[
    ["Quelle est la différence Option 1 et Option 2 ?","Option 1 : 2 séances de 2h par semaine (16h/mois). Option 2 : 3 séances de 2h par semaine (24h/mois) avec réduction. L'Option 2 offre plus d'heures à un tarif horaire plus avantageux."],
    ["Quand doit-on payer ?","Le paiement doit être effectué avant le 5 de chaque mois, par Mobile Money (Wave, Orange Money), virement bancaire ou espèces."],
    ["Y a-t-il un remboursement si on arrête ?","Aucun remboursement ne sera effectué pour les cours déjà dispensés. Un préavis de 15 jours est requis pour mettre fin au contrat."],
    ["Les cours sont à domicile ou en ligne ?","Les cours peuvent être dispensés en présentiel à votre domicile ou en ligne selon vos préférences."],
    ["Comment s'inscrire ?","Contactez-nous via WhatsApp au +221 70 938 00 86 ou remplissez le formulaire. Nous vous proposons un enseignant sous 24h."],
    ["SénEduca propose des cours pour la Licence ?","Oui, nous couvrons les étudiants en Licence 1, 2 et 3 avec des enseignants spécialisés."],
  ];
  return (
    <div style={{fontFamily:'Nunito,sans-serif',background:C.offWhite,minHeight:'100vh'}}>
      <div style={{background:`linear-gradient(135deg,${C.navy},${C.blue})`,padding:'3rem 5% 2.5rem',textAlign:'center',position:'relative',overflow:'hidden'}}>
        <div style={{position:'absolute',width:400,height:400,borderRadius:'50%',background:'rgba(74,173,232,0.07)',top:-150,right:-100}}/>
        <div style={{position:'relative',zIndex:1,maxWidth:680,margin:'0 auto'}}>
          <div style={{display:'inline-block',background:'rgba(200,168,75,0.15)',border:'1px solid rgba(200,168,75,0.4)',color:C.goldLight,padding:'0.4rem 1.2rem',borderRadius:50,fontSize:'0.82rem',fontWeight:700,marginBottom:'1rem'}}>💰 Tarifs officiels SénEduca</div>
          <h1 style={{fontFamily:'Playfair Display,serif',fontSize:'clamp(2rem,4vw,2.8rem)',fontWeight:900,color:C.white,marginBottom:'0.8rem'}}>Des tarifs <span style={{color:C.gold}}>transparents</span> pour chaque niveau</h1>
          <p style={{color:'rgba(255,255,255,0.75)',fontSize:'1rem',maxWidth:500,margin:'0 auto'}}>Du primaire à la Licence, deux options adaptées à chaque famille.</p>
        </div>
      </div>
      <div style={{background:C.white,padding:'1.5rem',textAlign:'center',borderBottom:`1px solid rgba(74,173,232,0.1)`}}>
        <div style={{display:'inline-flex',background:C.offWhite,borderRadius:50,padding:4,border:`1px solid rgba(74,173,232,0.15)`,marginBottom:'0.8rem'}}>
          <button onClick={()=>setOption('option1')} style={{padding:'0.55rem 1.5rem',borderRadius:50,border:'none',fontFamily:'inherit',fontWeight:800,fontSize:'0.88rem',cursor:'pointer',background:option==='option1'?C.blue:'transparent',color:option==='option1'?C.white:C.gray,transition:'all 0.2s'}}>Option 1 — 16h/mois</button>
          <button onClick={()=>setOption('option2')} style={{padding:'0.55rem 1.5rem',borderRadius:50,border:'none',fontFamily:'inherit',fontWeight:800,fontSize:'0.88rem',cursor:'pointer',background:option==='option2'?C.blue:'transparent',color:option==='option2'?C.white:C.gray,transition:'all 0.2s'}}>Option 2 — 24h/mois ✨</button>
        </div>
        <div style={{display:'flex',justifyContent:'center',gap:'2rem',flexWrap:'wrap',fontSize:'0.83rem',color:C.gray}}>
          <span>📅 <strong style={{color:C.navy}}>Option 1</strong> : 2 séances × 2h/semaine</span>
          <span>📅 <strong style={{color:C.navy}}>Option 2</strong> : 3 séances × 2h/semaine <span style={{color:C.green,fontWeight:800}}>(avec réduction)</span></span>
        </div>
      </div>
      <div style={{padding:'2.5rem 5%',maxWidth:1000,margin:'0 auto'}}>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(270px,1fr))',gap:'1rem'}}>
          {niveaux.map(n=>(
            <div key={n.nom} style={{background:C.white,borderRadius:18,overflow:'hidden',border:`1px solid rgba(74,173,232,0.12)`,transition:'transform 0.2s,box-shadow 0.2s'}}
              onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-4px)';e.currentTarget.style.boxShadow='0 12px 32px rgba(13,31,110,0.1)';}}
              onMouseLeave={e=>{e.currentTarget.style.transform='none';e.currentTarget.style.boxShadow='none';}}>
              <div style={{background:`${n.color}18`,borderBottom:`3px solid ${n.color}`,padding:'1.2rem 1.5rem',display:'flex',alignItems:'center',gap:'0.8rem'}}>
                <span style={{fontSize:'1.8rem'}}>{n.emoji}</span>
                <div>
                  <div style={{fontFamily:'Playfair Display,serif',fontWeight:900,fontSize:'1.05rem',color:C.navy}}>{n.nom}</div>
                  <div style={{fontSize:'0.72rem',color:C.gray,fontWeight:600}}>{n.heure} FCFA/heure</div>
                </div>
              </div>
              <div style={{padding:'1.5rem'}}>
                <div style={{textAlign:'center',background:C.offWhite,borderRadius:14,padding:'1.2rem',marginBottom:'1rem'}}>
                  <div style={{fontSize:'0.7rem',fontWeight:800,color:C.gray,textTransform:'uppercase',letterSpacing:1,marginBottom:'0.4rem'}}>{option==='option1'?'Option 1 — 16h/mois':'Option 2 — 24h/mois'}</div>
                  <div style={{fontFamily:'Playfair Display,serif',fontSize:'1.9rem',fontWeight:900,color:n.color,whiteSpace:'nowrap'}}>
                    {option==='option1'?n.o1:n.o2} <span style={{fontSize:'0.82rem',fontWeight:600,color:C.gray}}>FCFA</span>
                  </div>
                  <div style={{fontSize:'0.75rem',color:C.gray,marginTop:'0.2rem'}}>{option==='option1'?'2 séances × 2h/semaine':'3 séances × 2h/semaine'}</div>
                  {option==='option2'&&<div style={{display:'inline-block',marginTop:'0.4rem',background:'rgba(0,196,115,0.12)',color:'#006B3C',padding:'0.2rem 0.7rem',borderRadius:50,fontSize:'0.68rem',fontWeight:800}}>✨ Réduction incluse</div>}
                </div>
                <a href="https://wa.me/221709380086" target="_blank" rel="noreferrer"
                  style={{display:'block',textAlign:'center',padding:'0.75rem',borderRadius:12,background:C.blue,color:C.white,fontFamily:'inherit',fontWeight:800,fontSize:'0.88rem',textDecoration:'none'}}>
                  S'inscrire en {n.nom} →
                </a>
              </div>
            </div>
          ))}
        </div>
        <div style={{marginTop:'1.5rem',background:C.white,borderRadius:16,padding:'1.2rem 1.5rem',border:`2px solid rgba(200,168,75,0.3)`,display:'flex',alignItems:'center',gap:'1rem',flexWrap:'wrap'}}>
          <span style={{fontSize:'1.6rem'}}>📋</span>
          <div style={{flex:1}}>
            <div style={{fontWeight:800,color:C.navy,marginBottom:'0.2rem'}}>Conditions de paiement</div>
            <div style={{color:C.gray,fontSize:'0.83rem'}}>Paiement <strong style={{color:C.navy}}>avant le 5 de chaque mois</strong> · Wave · Orange Money · Virement · Espèces</div>
          </div>
          <a href="https://wa.me/221709380086" target="_blank" rel="noreferrer" style={{...s.btn('#25D366',C.white,{fontSize:'0.83rem',textDecoration:'none',display:'inline-block'})}}>💬 WhatsApp</a>
        </div>
      </div>
      <div style={{background:C.white,padding:'2.5rem 5%'}}>
        <div style={{maxWidth:800,margin:'0 auto',textAlign:'center'}}>
          <span style={s.tag()}>Moyens de paiement</span>
          <h2 style={s.sectionTitle({marginBottom:'1.5rem'})}>Payez comme <span style={{color:C.sky}}>vous voulez</span></h2>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(140px,1fr))',gap:'1rem'}}>
            {[['📱','Wave','Instantané'],['🟠','Orange Money','Via Orange'],['💵','Espèces','En main propre'],['💬','WhatsApp','Arrangement direct']].map(([icon,nom,desc])=>(
              <div key={nom} style={{...s.card(),textAlign:'center'}}
                onMouseEnter={e=>e.currentTarget.style.transform='translateY(-3px)'}
                onMouseLeave={e=>e.currentTarget.style.transform='translateY(0)'}>
                <div style={{fontSize:'2rem',marginBottom:'0.5rem'}}>{icon}</div>
                <div style={{fontWeight:800,color:C.navy,fontSize:'0.9rem'}}>{nom}</div>
                <div style={{color:C.gray,fontSize:'0.75rem',marginTop:'0.2rem'}}>{desc}</div>
                <span style={{display:'inline-block',marginTop:'0.5rem',background:'rgba(0,196,115,0.1)',color:'#006B3C',padding:'0.2rem 0.6rem',borderRadius:50,fontSize:'0.68rem',fontWeight:800}}>✓ Disponible</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={{background:C.offWhite,padding:'3rem 5%'}}>
        <div style={{maxWidth:760,margin:'0 auto'}}>
          <div style={{textAlign:'center',marginBottom:'2rem'}}>
            <span style={s.tag()}>FAQ</span>
            <h2 style={s.sectionTitle()}>Questions <span style={{color:C.sky}}>fréquentes</span></h2>
          </div>
          {faqs.map(([q,a],i)=>(
            <div key={i} style={{background:C.white,borderRadius:14,border:`1px solid rgba(74,173,232,0.12)`,marginBottom:'0.8rem',overflow:'hidden'}}>
              <div onClick={()=>setOpenFaq(openFaq===i?null:i)} style={{padding:'1rem 1.4rem',display:'flex',justifyContent:'space-between',alignItems:'center',cursor:'pointer'}}>
                <span style={{fontWeight:800,fontSize:'0.9rem',color:C.navy}}>{q}</span>
                <span style={{color:C.sky,fontSize:'1.2rem',transform:openFaq===i?'rotate(45deg)':'none',transition:'transform 0.2s',flexShrink:0,marginLeft:'0.5rem'}}>+</span>
              </div>
              {openFaq===i&&<div style={{padding:'0 1.4rem 1.2rem',color:C.gray,fontSize:'0.86rem',lineHeight:1.7}}>{a}</div>}
            </div>
          ))}
        </div>
      </div>
      <div style={{background:`linear-gradient(135deg,${C.navy},${C.blue})`,padding:'4rem 5%',textAlign:'center',position:'relative',overflow:'hidden'}}>
        <div style={{position:'absolute',width:400,height:400,borderRadius:'50%',background:'rgba(74,173,232,0.07)',top:-150,right:-100}}/>
        <div style={{position:'relative',zIndex:1,maxWidth:600,margin:'0 auto'}}>
          <h2 style={{fontFamily:'Playfair Display,serif',fontSize:'clamp(1.8rem,3vw,2.4rem)',fontWeight:900,color:C.white,marginBottom:'1rem'}}>Premier cours <span style={{color:C.gold}}>offert !</span></h2>
          <p style={{color:'rgba(255,255,255,0.75)',marginBottom:'2rem',lineHeight:1.6}}>Inscrivez votre enfant aujourd'hui et bénéficiez d'un premier cours d'essai gratuit.</p>
          <div style={{display:'flex',gap:'1rem',justifyContent:'center',flexWrap:'wrap'}}>
            <a href="https://wa.me/221709380086" target="_blank" rel="noreferrer" style={{...s.btn('#25D366',C.white,{textDecoration:'none',display:'inline-flex',alignItems:'center',gap:'0.5rem'})}}>💬 WhatsApp</a>
            <a href="mailto:contact@seneduca.sn" style={{...s.btn(C.gold,C.navy,{textDecoration:'none',display:'inline-block'})}}>📩 contact@seneduca.sn</a>
          </div>
        </div>
      </div>
    </div>
  );
}


// ── CHAT IA ───────────────────────────────────────────────────────────
function Chat(){
  const [msgs,setMsgs]=useState([]);
  const [input,setInput]=useState('');
  const [loading,setLoading]=useState(false);
  const [history,setHistory]=useState([]);
  const [started,setStarted]=useState(false);
  const [showSidebar,setShowSidebar]=useState(false);
  const [isMobile,setIsMobile]=useState(window.innerWidth<=768);
  const endRef=useRef(null);

  useEffect(()=>{
    const check=()=>setIsMobile(window.innerWidth<=768);
    window.addEventListener('resize',check);
    return ()=>window.removeEventListener('resize',check);
  },[]);

  useEffect(()=>{endRef.current?.scrollIntoView({behavior:'smooth'});},[msgs,loading]);

  const SYSTEM="Tu es SénIA, l'assistant pédagogique intelligent de SénEduca — agence sénégalaise pour l'assistance éducative à domicile. Tu aides les élèves sénégalais du primaire à la terminale à comprendre leurs cours et préparer leurs examens (CFEE, BFEM, BAC). Réponds en français, de façon pédagogique, claire et encourageante. Tu connais le programme officiel sénégalais.";

  const suggestions=[
    {emoji:'📐',title:'Calculer une dérivée',sub:'Maths · Terminale',msg:'Explique-moi comment calculer une dérivée en Terminale S'},
    {emoji:'📖',title:'Dissertation Français',sub:'Français · BAC',msg:'Comment rédiger une bonne dissertation pour le BAC ?'},
    {emoji:'⚗️',title:'Lois de Newton',sub:'Physique · Lycée',msg:'Explique-moi les lois de Newton avec des exemples simples'},
    {emoji:'🌿',title:'Mitose & Méiose',sub:'SVT · Terminale',msg:"Qu'est-ce que la mitose et la méiose en SVT ?"},
  ];
  const subjects=[['📐 Maths','Explique-moi un exercice de Maths'],['⚗️ Physique','Question de Physique'],['🌿 SVT','Question de SVT'],['📖 Français','Aide-moi en Français'],['🌍 Anglais','Help me with English'],['🏛️ Histoire','Question Histoire']];
  const quickTools=[['📝 Exercice','Crée-moi un exercice de Mathématiques niveau Terminale'],['📋 Résumé','Fais-moi un résumé du cours sur '],['🎯 Méthode','Explique-moi la méthode pour résoudre '],['🏆 BAC','Conseils pour réussir le BAC en ']];

  async function send(text){
    const msg=text||input.trim();
    if(!msg||loading)return;
    setInput('');setStarted(true);setShowSidebar(false);
    const userMsg={role:'user',content:msg};
    const newHistory=[...history,userMsg];
    setHistory(newHistory);
    setMsgs(m=>[...m,{role:'user',text:msg}]);
    setLoading(true);
    try{
      const res=await fetch('https://api.anthropic.com/v1/messages',{
        method:'POST',headers:{'Content-Type':'application/json'},
        body:JSON.stringify({model:'claude-sonnet-4-20250514',max_tokens:1000,system:SYSTEM,messages:newHistory})
      });
      const data=await res.json();
      const reply=data.content?.[0]?.text||'Désolé, une erreur est survenue.';
      setHistory(h=>[...h,{role:'assistant',content:reply}]);
      setMsgs(m=>[...m,{role:'assistant',text:reply}]);
    }catch(e){
      setMsgs(m=>[...m,{role:'assistant',text:'⚠️ Erreur de connexion. Réessaie.'}]);
    }
    setLoading(false);
  }
  const reset=()=>{setMsgs([]);setHistory([]);setStarted(false);setShowSidebar(false);};

  // Sidebar content (shared desktop + mobile drawer)
  const SidebarContent=()=>(
    <div style={{display:'flex',flexDirection:'column',height:'100%'}}>
      <div style={{padding:'1rem',borderBottom:'1px solid rgba(74,173,232,0.08)'}}>
        <button onClick={()=>{reset();}} style={{background:C.blue,color:'#fff',border:'none',borderRadius:10,padding:'0.65rem',width:'100%',fontFamily:'inherit',fontWeight:800,fontSize:'0.85rem',cursor:'pointer'}}>
          ✏️ Nouvelle conversation
        </button>
      </div>
      <div style={{padding:'0.6rem 1rem 0.3rem',fontSize:'0.65rem',fontWeight:800,color:C.gray,textTransform:'uppercase',letterSpacing:'0.8px'}}>Matières</div>
      <div style={{padding:'0 1rem',display:'flex',flexWrap:'wrap',gap:'0.3rem'}}>
        {subjects.map(([label,msg])=>(
          <button key={label} onClick={()=>{send(msg);}} style={{padding:'0.3rem 0.7rem',borderRadius:50,fontSize:'0.72rem',fontWeight:800,cursor:'pointer',border:'1px solid rgba(74,173,232,0.25)',background:'rgba(74,173,232,0.08)',color:C.blue,fontFamily:'inherit',marginBottom:'0.2rem'}}>{label}</button>
        ))}
      </div>
      <div style={{padding:'0.8rem 1rem 0.3rem',fontSize:'0.65rem',fontWeight:800,color:C.gray,textTransform:'uppercase',letterSpacing:'0.8px',marginTop:'0.5rem'}}>Outils rapides</div>
      <div style={{padding:'0 0.5rem',flex:1}}>
        {quickTools.map(([label,msg])=>(
          <div key={label} onClick={()=>{setInput(msg);setShowSidebar(false);}} style={{padding:'0.65rem 0.8rem',borderRadius:10,cursor:'pointer',fontSize:'0.83rem',fontWeight:700,color:C.navy,transition:'background 0.15s',marginBottom:'2px'}}
            onMouseEnter={e=>e.currentTarget.style.background=C.offWhite}
            onMouseLeave={e=>e.currentTarget.style.background='transparent'}>{label}</div>
        ))}
      </div>
    </div>
  );

  return (
    <div style={{display:'flex',height:'calc(100vh - 64px)',fontFamily:'Nunito,sans-serif',overflow:'hidden',position:'relative'}}>
      <style>{`@keyframes bounce2{0%,60%,100%{transform:translateY(0)}30%{transform:translateY(-8px)}}`}</style>

      {/* SIDEBAR — desktop only */}
      {!isMobile&&(
        <div style={{width:255,flexShrink:0,background:'#fff',borderRight:'1px solid rgba(74,173,232,0.12)',overflow:'hidden'}}>
          <SidebarContent/>
        </div>
      )}

      {/* MOBILE DRAWER overlay */}
      {isMobile&&showSidebar&&(
        <div onClick={()=>setShowSidebar(false)} style={{position:'absolute',inset:0,background:'rgba(0,0,0,0.4)',zIndex:50}}>
          <div onClick={e=>e.stopPropagation()} style={{width:'80%',maxWidth:300,height:'100%',background:'#fff',overflowY:'auto'}}>
            <SidebarContent/>
          </div>
        </div>
      )}

      {/* CHAT MAIN */}
      <div style={{flex:1,display:'flex',flexDirection:'column',overflow:'hidden',minWidth:0,background:C.offWhite}}>

        {/* Header */}
        <div style={{background:'#fff',padding:'0.8rem 1rem',borderBottom:'1px solid rgba(74,173,232,0.1)',display:'flex',alignItems:'center',gap:'0.8rem',flexShrink:0}}>
          {isMobile&&(
            <button onClick={()=>setShowSidebar(true)} style={{background:C.offWhite,border:'none',borderRadius:8,width:36,height:36,cursor:'pointer',fontSize:'1.1rem',flexShrink:0}}>☰</button>
          )}
          <div style={{width:36,height:36,borderRadius:'50%',background:`linear-gradient(135deg,${C.sky},${C.blue})`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1rem',flexShrink:0}}>🤖</div>
          <div style={{flex:1,minWidth:0}}>
            <div style={{fontWeight:800,color:C.navy,fontSize:'0.9rem'}}>SénIA — Assistant pédagogique</div>
            <div style={{fontSize:'0.68rem',color:C.green,fontWeight:700,display:'flex',alignItems:'center',gap:'0.3rem'}}>
              <span style={{width:5,height:5,background:C.green,borderRadius:'50%',display:'inline-block'}}/>En ligne 24h/24
            </div>
          </div>
          <button onClick={reset} style={{background:C.offWhite,border:'none',borderRadius:8,padding:'0.3rem 0.6rem',fontFamily:'inherit',fontWeight:700,fontSize:'0.72rem',color:C.gray,cursor:'pointer',flexShrink:0,whiteSpace:'nowrap'}}>✏️ Nouveau</button>
        </div>

        {/* Messages */}
        <div style={{flex:1,overflowY:'auto',padding:'1rem',display:'flex',flexDirection:'column',gap:'0.8rem'}}>
          {!started&&(
            <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',flex:1,padding:'1rem',textAlign:'center'}}>
              <div style={{width:66,height:66,borderRadius:'50%',background:`linear-gradient(135deg,${C.sky},${C.blue})`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1.8rem',margin:'0 auto 1rem'}}>🤖</div>
              <h2 style={{fontFamily:'Playfair Display,serif',fontSize:'clamp(1.2rem,4vw,1.5rem)',fontWeight:900,color:C.navy,marginBottom:'0.4rem'}}>Bonjour ! Je suis <span style={{color:C.sky}}>SénIA</span></h2>
              <p style={{color:C.gray,maxWidth:360,lineHeight:1.6,marginBottom:'1.2rem',fontSize:'0.85rem'}}>Assistant pédagogique 24h/24. Posez votre question sur n'importe quel cours.</p>
              <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(140px,1fr))',gap:'0.6rem',maxWidth:420,width:'100%'}}>
                {suggestions.map(sg=>(
                  <div key={sg.title} onClick={()=>send(sg.msg)} style={{background:'#fff',border:'1.5px solid rgba(74,173,232,0.15)',borderRadius:12,padding:'0.8rem',textAlign:'left',cursor:'pointer',transition:'all 0.15s'}}
                    onMouseEnter={e=>{e.currentTarget.style.borderColor=C.sky;e.currentTarget.style.transform='translateY(-2px)';}}
                    onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(74,173,232,0.15)';e.currentTarget.style.transform='none';}}>
                    <div style={{fontSize:'1.1rem',marginBottom:'0.3rem'}}>{sg.emoji}</div>
                    <div style={{fontWeight:800,fontSize:'0.8rem',color:C.navy}}>{sg.title}</div>
                    <div style={{fontSize:'0.68rem',color:C.gray}}>{sg.sub}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {msgs.map((m,i)=>(
            <div key={i} style={{display:'flex',gap:'0.5rem',alignItems:'flex-end',flexDirection:m.role==='user'?'row-reverse':'row'}}>
              <div style={{width:28,height:28,borderRadius:'50%',background:m.role==='user'?`linear-gradient(135deg,${C.gold},#8B6914)`:`linear-gradient(135deg,${C.sky},${C.blue})`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'0.8rem',flexShrink:0}}>{m.role==='user'?'👦':'🤖'}</div>
              <div style={{maxWidth:'80%'}}>
                <div style={{padding:'0.75rem 0.9rem',borderRadius:14,fontSize:'0.88rem',lineHeight:1.65,
                  background:m.role==='user'?`linear-gradient(135deg,${C.blue},#1a4a9e)`:'#fff',
                  color:m.role==='user'?'#fff':C.dark,
                  border:m.role==='user'?'none':'1px solid rgba(74,173,232,0.12)',
                  borderBottomRightRadius:m.role==='user'?3:14,
                  borderBottomLeftRadius:m.role==='assistant'?3:14,
                  whiteSpace:'pre-wrap',wordBreak:'break-word'
                }}>{m.text}</div>
              </div>
            </div>
          ))}
          {loading&&(
            <div style={{display:'flex',gap:'0.5rem',alignItems:'flex-end'}}>
              <div style={{width:28,height:28,borderRadius:'50%',background:`linear-gradient(135deg,${C.sky},${C.blue})`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'0.8rem'}}>🤖</div>
              <div style={{background:'#fff',border:'1px solid rgba(74,173,232,0.12)',borderRadius:'14px 14px 14px 3px',padding:'0.6rem 0.9rem',display:'flex',gap:4}}>
                {[0,1,2].map(i=><div key={i} style={{width:7,height:7,background:C.sky,borderRadius:'50%',animation:`bounce2 1.2s infinite ${i*0.2}s`}}/>)}
              </div>
            </div>
          )}
          <div ref={endRef}/>
        </div>

        {/* Input */}
        <div style={{background:'#fff',borderTop:'1px solid rgba(74,173,232,0.1)',padding:'0.8rem 1rem',flexShrink:0}}>
          <div style={{display:'flex',gap:'0.6rem',alignItems:'flex-end'}}>
            <textarea value={input} onChange={e=>setInput(e.target.value)}
              onKeyDown={e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();send();}}}
              placeholder="Pose ta question ici..." rows={1}
              style={{flex:1,border:'1.5px solid rgba(74,173,232,0.25)',borderRadius:12,padding:'0.65rem 0.9rem',fontFamily:'inherit',fontSize:'0.9rem',outline:'none',resize:'none',background:C.offWhite,minHeight:42,maxHeight:110,wordBreak:'break-word'}}/>
            <button onClick={()=>send()} disabled={!input.trim()||loading}
              style={{width:42,height:42,borderRadius:11,background:input.trim()&&!loading?C.blue:C.gray,border:'none',cursor:input.trim()&&!loading?'pointer':'not-allowed',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1rem',color:'#fff',flexShrink:0,transition:'background 0.2s'}}>➤</button>
          </div>
          <div style={{fontSize:'0.65rem',color:C.gray,textAlign:'center',marginTop:'0.3rem'}}>SénIA · Programme officiel sénégalais · 24h/24</div>
        </div>
      </div>
    </div>
  );
}

  
// ── DASHBOARD ─────────────────────────────────────────────────────────
function Dashboard({setPage}){
  const [activePage,setActivePage]=useState('overview');
  const matieres=[{name:'Mathématiques',emoji:'📐',note:16,max:20,color:'#4AADE8'},{name:'Physique-Chimie',emoji:'⚗️',note:13,max:20,color:'#C8A84B'},{name:'SVT',emoji:'🌿',note:15,max:20,color:'#00C473'},{name:'Français',emoji:'📖',note:12,max:20,color:'#E84A6A'},{name:'Anglais',emoji:'🌍',note:14,max:20,color:'#9B59B6'}];
  const sessions=[{jour:'Auj.',heure:'15h00',mat:'📐 Maths',rep:'M. Ibrahima Diallo',type:'🏠 Domicile',status:'Confirmer'},{jour:'Auj.',heure:'17h00',mat:'⚗️ Physique',rep:'M. Ibrahima Diallo',type:'💻 En ligne',status:'Rejoindre'},{jour:'Jeu.',heure:'14h00',mat:'📖 Français',rep:'Mme A. Ndiaye',type:'🏠 Domicile',status:'Confirmer'}];
  const notes=[{mat:'📐 Maths',devoir:'Devoir n°4',note:17,statut:'Excellent'},{mat:'⚗️ Physique',devoir:'Contrôle',note:13,statut:'Bien'},{mat:'📖 Français',devoir:'Rédaction',note:10,statut:'À travailler'},{mat:'🌿 SVT',devoir:'TP Bio',note:16,statut:'Très bien'}];
  const objectifs=[{txt:'Réviser Cinématique'},{txt:'Exercices Maths série 3'},{txt:'Dissertation Français'},{txt:'Révisions SVT Génétique'},{txt:'Simulation BAC Blanc'}];
  const [objDone,setObjDone]=useState([true,true,false,false,false]);
  const navItems=[['🏠','Accueil','overview'],['📊','Notes','notes'],['📅','Cours','cours'],['🎯','Objectifs','objectifs'],['🤖','SénIA','ia']];
  const [isMobile,setIsMobile]=useState(window.innerWidth<=768);
  useEffect(()=>{const check=()=>setIsMobile(window.innerWidth<=768);window.addEventListener('resize',check);return()=>window.removeEventListener('resize',check);},[]);
  const go=(id)=>{if(id==='ia')setPage('chat');else setActivePage(id);};
  return (
    <div style={{fontFamily:'Nunito,sans-serif',background:'#F4F8FF',minHeight:'calc(100vh - 64px)',position:'relative'}}>
      {/* SIDEBAR desktop */}
      {!isMobile&&(
        <div style={{position:'fixed',left:0,top:64,width:230,height:'calc(100vh - 64px)',background:'linear-gradient(180deg,#0D1F6E,#1B2B8C)',display:'flex',flexDirection:'column',zIndex:100,overflowY:'auto'}}>
          <div style={{padding:'1.2rem',borderBottom:'1px solid rgba(255,255,255,0.08)'}}>
            <div style={{width:46,height:46,borderRadius:'50%',background:'linear-gradient(135deg,#4AADE8,#C8A84B)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1.3rem',marginBottom:'0.5rem'}}>👦</div>
            <div style={{fontWeight:800,color:'#fff',fontSize:'0.9rem'}}>Abdou Diallo</div>
            <div style={{fontSize:'0.7rem',color:'rgba(255,255,255,0.55)'}}>Terminale S — Lycée Blaise Diagne</div>
            <span style={{display:'inline-block',marginTop:'0.4rem',background:'rgba(200,168,75,0.2)',color:'#F0D080',padding:'0.15rem 0.6rem',borderRadius:50,fontSize:'0.65rem',fontWeight:700}}>⭐ Élève Premium</span>
          </div>
          <div style={{flex:1,padding:'0.8rem 0'}}>
            {navItems.map(([icon,label,id])=>(
              <div key={id} onClick={()=>go(id)} style={{display:'flex',alignItems:'center',gap:'0.8rem',padding:'0.75rem 1.2rem',cursor:'pointer',borderLeft:`3px solid ${activePage===id?'#4AADE8':'transparent'}`,background:activePage===id?'rgba(74,173,232,0.15)':'transparent',transition:'all 0.15s'}}>
                <span style={{fontSize:'1rem'}}>{icon}</span>
                <span style={{fontSize:'0.85rem',fontWeight:700,color:activePage===id?'#fff':'rgba(255,255,255,0.75)'}}>{label}</span>
              </div>
            ))}
          </div>
          <div style={{padding:'1rem',borderTop:'1px solid rgba(255,255,255,0.08)'}}>
            <a href="https://wa.me/221709380086" target="_blank" rel="noreferrer" style={{display:'flex',alignItems:'center',gap:'0.5rem',padding:'0.6rem 1rem',borderRadius:10,background:'rgba(255,255,255,0.08)',color:'rgba(255,255,255,0.7)',textDecoration:'none',fontSize:'0.82rem',fontWeight:700}}>💬 Contacter répétiteur</a>
          </div>
        </div>
      )}
      {/* MAIN */}
      <div style={{marginLeft:isMobile?0:230,padding:'1rem',paddingBottom:isMobile?90:16,overflowY:'auto'}}>
        {/* Mobile profile */}
        {isMobile&&(
          <div style={{display:'flex',alignItems:'center',gap:'0.8rem',marginBottom:'1rem',padding:'0.8rem 1rem',background:'#fff',borderRadius:14,border:'1px solid rgba(74,173,232,0.1)'}}>
            <div style={{width:40,height:40,borderRadius:'50%',background:'linear-gradient(135deg,#4AADE8,#C8A84B)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1.1rem'}}>👦</div>
            <div><div style={{fontWeight:800,color:'#0D1F6E',fontSize:'0.9rem'}}>Abdou Diallo</div><div style={{fontSize:'0.72rem',color:'#6B7B99'}}>Terminale S · ⭐ Premium</div></div>
            <a href="https://wa.me/221709380086" target="_blank" rel="noreferrer" style={{marginLeft:'auto',width:36,height:36,borderRadius:10,background:'#25D366',display:'flex',alignItems:'center',justifyContent:'center',textDecoration:'none',fontSize:'1rem'}}>💬</a>
          </div>
        )}
        {/* Welcome */}
        <div style={{background:'linear-gradient(135deg,#0D1F6E,#1B2B8C)',borderRadius:18,padding:'1.2rem 1.5rem',marginBottom:'1rem',display:'flex',justifyContent:'space-between',alignItems:'center',overflow:'hidden',position:'relative'}}>
          <div style={{position:'absolute',width:200,height:200,borderRadius:'50%',background:'rgba(74,173,232,0.08)',top:-80,right:-30}}/>
          <div style={{position:'relative',zIndex:1}}>
            <div style={{fontSize:'0.75rem',color:'rgba(255,255,255,0.6)'}}>Bon retour 👋</div>
            <div style={{fontFamily:'Playfair Display,serif',fontSize:'1.3rem',fontWeight:900,color:'#fff'}}>Abdou Diallo</div>
            <div style={{fontSize:'0.8rem',color:'rgba(255,255,255,0.7)'}}>2 cours prévus aujourd'hui !</div>
          </div>
          <div style={{background:'rgba(200,168,75,0.2)',border:'1px solid rgba(200,168,75,0.4)',borderRadius:12,padding:'0.6rem 1rem',textAlign:'center',position:'relative',zIndex:1,flexShrink:0}}>
            <div style={{fontFamily:'Playfair Display,serif',fontSize:'1.4rem',fontWeight:900,color:'#C8A84B'}}>🔥 12</div>
            <div style={{fontSize:'0.62rem',color:'rgba(255,255,255,0.6)',fontWeight:700}}>jours consécutifs</div>
          </div>
        </div>
        {/* Stats */}
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(120px,1fr))',gap:'0.8rem',marginBottom:'1rem'}}>
          {[['📚','18','Cours'],['⭐','14.5','Moyenne'],['✅','92%','Présence'],['⏱️','24h','Révisions']].map(([icon,val,label])=>(
            <div key={label} style={{background:'#fff',borderRadius:16,padding:'0.9rem',border:'1px solid rgba(74,173,232,0.12)'}}>
              <div style={{fontSize:'1.3rem',marginBottom:'0.4rem'}}>{icon}</div>
              <div style={{fontFamily:'Playfair Display,serif',fontSize:'1.5rem',fontWeight:900,color:'#0D1F6E'}}>{val}</div>
              <div style={{fontSize:'0.72rem',color:'#6B7B99',fontWeight:600}}>{label}</div>
            </div>
          ))}
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:'1rem',marginBottom:'1rem'}}>
          <div style={{background:'#fff',borderRadius:18,padding:'1.3rem',border:'1px solid rgba(74,173,232,0.12)'}}>
            <div style={{fontWeight:800,color:'#0D1F6E',marginBottom:'1rem'}}>📈 Progression</div>
            {matieres.map(m=>(
              <div key={m.name} style={{marginBottom:'0.8rem'}}>
                <div style={{display:'flex',justifyContent:'space-between',marginBottom:'0.3rem'}}>
                  <span style={{fontSize:'0.83rem',fontWeight:800,color:'#0D1F6E'}}>{m.emoji} {m.name}</span>
                  <span style={{fontSize:'0.8rem',fontWeight:800,color:'#1B2B8C'}}>{m.note}/20</span>
                </div>
                <div style={{height:7,background:'#F4F8FF',borderRadius:50,overflow:'hidden'}}>
                  <div style={{height:'100%',width:`${(m.note/m.max)*100}%`,background:`linear-gradient(90deg,${m.color},${m.color}99)`,borderRadius:50}}/>
                </div>
              </div>
            ))}
          </div>
          <div style={{background:'#fff',borderRadius:18,padding:'1.3rem',border:'1px solid rgba(74,173,232,0.12)'}}>
            <div style={{fontWeight:800,color:'#0D1F6E',marginBottom:'1rem'}}>📅 Prochains cours</div>
            {sessions.map((s2,i)=>(
              <div key={i} style={{display:'flex',gap:'0.7rem',background:'#F4F8FF',borderRadius:12,padding:'0.7rem',marginBottom:'0.5rem',alignItems:'center'}}>
                <div style={{textAlign:'center',minWidth:38,flexShrink:0}}>
                  <div style={{fontSize:'0.58rem',fontWeight:800,color:'#6B7B99'}}>{s2.jour}</div>
                  <div style={{fontSize:'0.88rem',fontWeight:900,color:'#0D1F6E'}}>{s2.heure}</div>
                </div>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontWeight:800,fontSize:'0.83rem',color:'#0D1F6E',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{s2.mat}</div>
                  <div style={{fontSize:'0.7rem',color:'#6B7B99'}}>{s2.rep}</div>
                </div>
                <button style={{background:'#1B2B8C',color:'#fff',border:'none',borderRadius:8,padding:'0.3rem 0.6rem',fontSize:'0.68rem',fontWeight:800,cursor:'pointer',fontFamily:'inherit',flexShrink:0}}>{s2.status}</button>
              </div>
            ))}
          </div>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:'1rem'}}>
          <div style={{background:'#fff',borderRadius:18,padding:'1.3rem',border:'1px solid rgba(74,173,232,0.12)'}}>
            <div style={{fontWeight:800,color:'#0D1F6E',marginBottom:'1rem'}}>📝 Dernières notes</div>
            {notes.map((n,i)=>(
              <div key={i} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'0.55rem 0',borderBottom:'1px solid #F4F8FF'}}>
                <div><div style={{fontWeight:700,fontSize:'0.83rem',color:'#0D1F6E'}}>{n.mat}</div><div style={{fontSize:'0.72rem',color:'#6B7B99'}}>{n.devoir}</div></div>
                <div style={{display:'flex',alignItems:'center',gap:'0.4rem'}}>
                  <span style={{fontWeight:900,color:n.note>=15?'#00C473':n.note>=12?'#C8A84B':'#E84A6A',fontSize:'0.9rem'}}>{n.note}/20</span>
                  <span style={{background:n.note>=15?'rgba(0,196,115,0.12)':n.note>=12?'rgba(200,168,75,0.12)':'rgba(232,74,106,0.12)',color:n.note>=15?'#006B3C':n.note>=12?'#8B6914':'#8C1B35',padding:'0.15rem 0.5rem',borderRadius:50,fontSize:'0.65rem',fontWeight:800}}>{n.statut}</span>
                </div>
              </div>
            ))}
          </div>
          <div style={{background:'#fff',borderRadius:18,padding:'1.3rem',border:'1px solid rgba(74,173,232,0.12)'}}>
            <div style={{fontWeight:800,color:'#0D1F6E',marginBottom:'1rem'}}>🎯 Mes objectifs</div>
            {objectifs.map((obj,i)=>(
              <div key={i} onClick={()=>{const d=[...objDone];d[i]=!d[i];setObjDone(d);}} style={{display:'flex',alignItems:'center',gap:'0.8rem',padding:'0.6rem 0',borderBottom:'1px solid #F4F8FF',cursor:'pointer'}}>
                <div style={{width:20,height:20,borderRadius:6,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'0.75rem',flexShrink:0,background:objDone[i]?'rgba(0,196,115,0.15)':'#F4F8FF',border:objDone[i]?'none':'2px solid rgba(74,173,232,0.2)',color:objDone[i]?'#00C473':'transparent'}}>{objDone[i]?'✓':''}</div>
                <span style={{fontSize:'0.83rem',fontWeight:700,color:objDone[i]?'#6B7B99':'#0D1F6E',textDecoration:objDone[i]?'line-through':'none',flex:1}}>{obj.txt}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* BOTTOM NAV mobile */}
      {isMobile&&(
        <div style={{position:'fixed',bottom:0,left:0,right:0,background:'#fff',borderTop:'1px solid rgba(74,173,232,0.15)',display:'flex',zIndex:200,boxShadow:'0 -4px 16px rgba(13,31,110,0.08)'}}>
          {navItems.map(([icon,label,id])=>(
            <button key={id} onClick={()=>go(id)} style={{flex:1,background:'none',border:'none',cursor:'pointer',padding:'0.5rem 0.2rem',display:'flex',flexDirection:'column',alignItems:'center',gap:'0.1rem',fontFamily:'inherit'}}>
              <span style={{fontSize:'1.2rem'}}>{icon}</span>
              <span style={{fontSize:'0.58rem',fontWeight:800,color:activePage===id?'#1B2B8C':'#6B7B99'}}>{label}</span>
              {activePage===id&&<span style={{width:14,height:3,background:'#1B2B8C',borderRadius:2,display:'block'}}/>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}


// ── À PROPOS ──────────────────────────────────────────────────────────
function APropos(){
  const timeline=[
    {year:'2020',icon:'🌱',title:'Naissance de Sen.Répétiteur',desc:'Lancement de l\'activité à Dakar avec une idée simple : connecter les élèves sénégalais à des répétiteurs de qualité, directement à domicile.'},
    {year:'2021',icon:'📈',title:'Premiers résultats',desc:'Plus de 50 élèves accompagnés, des résultats concrets au BFEM et au BAC. La confiance des familles dakaroises grandit progressivement.'},
    {year:'2022',icon:'🏙️',title:'Expansion à Dakar',desc:'Extension des services dans toutes les communes de Dakar et banlieue. Recrutement des premiers répétiteurs certifiés dans plusieurs matières.'},
    {year:'2023',icon:'💻',title:'Passage au numérique',desc:'Lancement des cours en ligne pour toucher les élèves partout au Sénégal. Développement des premières ressources pédagogiques digitales.'},
    {year:'2024',icon:'🚀',title:'SénEduca est né',desc:'Sen.Répétiteur devient SénEduca — une plateforme complète avec dashboard élève, assistant IA pédagogique et couverture nationale.'},
    {year:'2025',icon:'🌍',title:'Vision Sénégal',desc:'Objectif : devenir la référence de l\'éducation à domicile au Sénégal, avec des milliers d\'élèves accompagnés de Dakar à Ziguinchor.'},
  ];
  const valeurs=[
    {icon:'🎯',titre:'Excellence',desc:'Nous sélectionnons uniquement les meilleurs enseignants. Chaque répétiteur est évalué sur ses diplômes, son expérience et sa pédagogie.'},
    {icon:'🤝',titre:'Confiance',desc:'Un contrat officiel, des tarifs transparents, un suivi régulier. Les familles méritent un service sérieux et professionnel.'},
    {icon:'❤️',titre:'Bienveillance',desc:'Chaque élève est unique. Nous adaptons notre approche à chaque enfant pour qu\'il progresse à son rythme avec confiance.'},
    {icon:'🌍',titre:'Accessibilité',desc:'L\'excellence scolaire ne doit pas être réservée à quelques-uns. Nos tarifs sont pensés pour chaque famille sénégalaise.'},
    {icon:'📱',titre:'Innovation',desc:'Nous intégrons les meilleurs outils numériques — IA pédagogique, dashboard, cours en ligne — pour une éducation moderne.'},
    {icon:'🇸🇳',titre:'Sénégalité',desc:'Ancrés dans la culture et les valeurs sénégalaises, nous construisons une éducation adaptée à notre réalité locale.'},
  ];
  const chiffres=[
    {n:'500+',l:'Élèves accompagnés'},
    {n:'50+',l:'Répétiteurs certifiés'},
    {n:'5',l:'Villes desservies'},
    {n:'4 ans',l:'D\'expérience'},
    {n:'98%',l:'Taux de satisfaction'},
    {n:'15+',l:'Matières couvertes'},
  ];

  return (
    <div style={{fontFamily:'Nunito,sans-serif',background:C.white}}>

      {/* HERO */}
      <div style={{background:`linear-gradient(135deg,${C.navy},${C.blue})`,padding:'4rem 5% 3rem',position:'relative',overflow:'hidden'}}>
        <div style={{position:'absolute',width:500,height:500,borderRadius:'50%',background:'rgba(74,173,232,0.07)',top:-200,right:-150}}/>
        <div style={{position:'absolute',width:300,height:300,borderRadius:'50%',background:'rgba(200,168,75,0.06)',bottom:-100,left:-50}}/>
        <div style={{position:'relative',zIndex:1,maxWidth:800,margin:'0 auto',textAlign:'center'}}>
          <div style={{display:'inline-block',background:'rgba(200,168,75,0.15)',border:'1px solid rgba(200,168,75,0.4)',color:C.goldLight,padding:'0.4rem 1.2rem',borderRadius:50,fontSize:'0.82rem',fontWeight:700,marginBottom:'1.5rem'}}>
            ⭐ Depuis 2020
          </div>
          <h1 style={{fontFamily:'Playfair Display,serif',fontSize:'clamp(2.2rem,4vw,3.2rem)',fontWeight:900,color:C.white,lineHeight:1.2,marginBottom:'1.2rem'}}>
            L'histoire de <span style={{color:C.gold}}>SénEduca</span>
          </h1>
          <p style={{color:'rgba(255,255,255,0.8)',fontSize:'1.05rem',lineHeight:1.8,maxWidth:620,margin:'0 auto'}}>
            Née d'une conviction simple — <em>"chaque enfant sénégalais mérite d'être accompagné vers la réussite"</em> — SénEduca est aujourd'hui la référence de l'assistance éducative à domicile au Sénégal.
          </p>
        </div>
      </div>

      {/* CHIFFRES */}
      <div style={{background:C.blue,padding:'2.5rem 5%',display:'flex',justifyContent:'center',gap:'2rem',flexWrap:'wrap'}}>
        {chiffres.map(c=>(
          <div key={c.l} style={{textAlign:'center'}}>
            <div style={{fontFamily:'Playfair Display,serif',fontSize:'2.2rem',fontWeight:900,color:C.gold}}>{c.n}</div>
            <div style={{color:'rgba(255,255,255,0.7)',fontSize:'0.82rem',fontWeight:600}}>{c.l}</div>
          </div>
        ))}
      </div>

      {/* NOTRE HISTOIRE */}
      <div style={{padding:'5rem 5%',background:C.offWhite}}>
        <div style={{maxWidth:900,margin:'0 auto'}}>
          <div style={{textAlign:'center',marginBottom:'3rem'}}>
            <span style={s.tag()}>Notre Histoire</span>
            <h2 style={s.sectionTitle()}>De Sen.Répétiteur à <span style={{color:C.sky}}>SénEduca</span></h2>
          </div>
          <div style={{position:'relative'}}>
            {/* Ligne verticale */}
            <div style={{position:'absolute',left:'calc(50% - 1px)',top:0,bottom:0,width:2,background:`linear-gradient(180deg,${C.sky},${C.gold})`,opacity:0.3}}/>
            {timeline.map((t,i)=>(
              <div key={t.year} style={{display:'flex',gap:'2rem',marginBottom:'2.5rem',flexDirection:i%2===0?'row':'row-reverse',alignItems:'flex-start'}}>
                <div style={{flex:1,textAlign:i%2===0?'right':'left'}}>
                  <div style={{display:'inline-block',background:C.blue,color:C.white,padding:'0.3rem 0.9rem',borderRadius:50,fontSize:'0.78rem',fontWeight:800,marginBottom:'0.5rem'}}>{t.year}</div>
                  <div style={{...s.card({padding:'1.2rem 1.5rem'})}}>
                    <div style={{fontWeight:800,fontSize:'1rem',color:C.navy,marginBottom:'0.4rem'}}>{t.icon} {t.title}</div>
                    <p style={{color:C.gray,fontSize:'0.88rem',lineHeight:1.6}}>{t.desc}</p>
                  </div>
                </div>
                <div style={{width:44,height:44,borderRadius:'50%',background:`linear-gradient(135deg,${C.sky},${C.blue})`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1.2rem',flexShrink:0,zIndex:1,boxShadow:`0 4px 14px rgba(74,173,232,0.4)`}}>
                  {t.icon}
                </div>
                <div style={{flex:1}}/>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MISSION & VISION */}
      <div style={{padding:'5rem 5%',background:C.white}}>
        <div style={{maxWidth:1000,margin:'0 auto'}}>
          <div style={{textAlign:'center',marginBottom:'3rem'}}>
            <span style={s.tag()}>Mission & Vision</span>
            <h2 style={s.sectionTitle()}>Ce qui nous <span style={{color:C.sky}}>guide</span></h2>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:'1.5rem'}}>
            <div style={{...s.card({background:`linear-gradient(135deg,${C.navy},${C.blue})`,border:'none',color:C.white})}}>
              <div style={{fontSize:'2.5rem',marginBottom:'1rem'}}>🎯</div>
              <div style={{fontFamily:'Playfair Display,serif',fontSize:'1.3rem',fontWeight:900,color:C.white,marginBottom:'0.8rem'}}>Notre Mission</div>
              <p style={{color:'rgba(255,255,255,0.8)',lineHeight:1.7,fontSize:'0.92rem'}}>
                Connecter chaque élève sénégalais à un répétiteur qualifié, des ressources pédagogiques adaptées au programme officiel, et un suivi personnalisé — à domicile ou en ligne, partout au Sénégal.
              </p>
            </div>
            <div style={{...s.card({background:`linear-gradient(135deg,${C.gold}22,${C.gold}11)`,border:`2px solid ${C.gold}44`})}}>
              <div style={{fontSize:'2.5rem',marginBottom:'1rem'}}>🌟</div>
              <div style={{fontFamily:'Playfair Display,serif',fontSize:'1.3rem',fontWeight:900,color:C.navy,marginBottom:'0.8rem'}}>Notre Vision</div>
              <p style={{color:C.gray,lineHeight:1.7,fontSize:'0.92rem'}}>
                Devenir la plateforme éducative de référence au Sénégal — celle qui transforme l'éducation en rendant l'excellence scolaire accessible à chaque famille, peu importe son quartier ou sa ville.
              </p>
            </div>
            <div style={{...s.card({background:`linear-gradient(135deg,rgba(0,196,115,0.1),rgba(0,196,115,0.05))`,border:'2px solid rgba(0,196,115,0.2)'})}}>
              <div style={{fontSize:'2.5rem',marginBottom:'1rem'}}>💡</div>
              <div style={{fontFamily:'Playfair Display,serif',fontSize:'1.3rem',fontWeight:900,color:C.navy,marginBottom:'0.8rem'}}>Notre Promesse</div>
              <p style={{color:C.gray,lineHeight:1.7,fontSize:'0.92rem'}}>
                Un premier cours d'essai offert, des tarifs transparents, un contrat officiel et un suivi rigoureux. Chez SénEduca, la confiance des familles est notre priorité absolue.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* NOS VALEURS */}
      <div style={{padding:'5rem 5%',background:C.offWhite}}>
        <div style={{maxWidth:1100,margin:'0 auto'}}>
          <div style={{textAlign:'center',marginBottom:'3rem'}}>
            <span style={s.tag()}>Nos Valeurs</span>
            <h2 style={s.sectionTitle()}>Ce en quoi <span style={{color:C.sky}}>nous croyons</span></h2>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))',gap:'1.2rem'}}>
            {valeurs.map(v=>(
              <div key={v.titre} style={{...s.card(),transition:'transform 0.2s'}}
                onMouseEnter={e=>e.currentTarget.style.transform='translateY(-4px)'}
                onMouseLeave={e=>e.currentTarget.style.transform='none'}>
                <div style={{fontSize:'2rem',marginBottom:'0.8rem'}}>{v.icon}</div>
                <div style={{fontWeight:900,fontSize:'1rem',color:C.navy,marginBottom:'0.4rem'}}>{v.titre}</div>
                <p style={{color:C.gray,fontSize:'0.88rem',lineHeight:1.6}}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ZONES */}
      <div style={{padding:'4rem 5%',background:C.white}}>
        <div style={{maxWidth:900,margin:'0 auto',textAlign:'center'}}>
          <span style={s.tag()}>Nos zones</span>
          <h2 style={s.sectionTitle({marginBottom:'0.8rem'})}>Présents dans tout <span style={{color:C.sky}}>le Sénégal</span></h2>
          <p style={{color:C.gray,marginBottom:'2.5rem'}}>Cours à domicile dans les grandes villes · Cours en ligne partout au Sénégal et en diaspora</p>
          <div style={{display:'flex',flexWrap:'wrap',justifyContent:'center',gap:'1rem'}}>
            {[['🏙️','Dakar','Capitale · Banlieue'],['🌆','Thiès','& environs'],['🌊','Saint-Louis','Nord'],['🌿','Ziguinchor','Casamance'],['🌾','Kaolack','Centre'],['🌍','En ligne','Tout le Sénégal']].map(([icon,ville,zone])=>(
              <div key={ville} style={{background:C.offWhite,borderRadius:16,padding:'1.2rem 1.5rem',textAlign:'center',border:`1px solid rgba(74,173,232,0.15)`,minWidth:130,transition:'transform 0.2s,box-shadow 0.2s'}}
                onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-3px)';e.currentTarget.style.boxShadow='0 8px 24px rgba(13,31,110,0.1)';}}
                onMouseLeave={e=>{e.currentTarget.style.transform='none';e.currentTarget.style.boxShadow='none';}}>
                <div style={{fontSize:'1.8rem',marginBottom:'0.4rem'}}>{icon}</div>
                <div style={{fontWeight:900,color:C.navy}}>{ville}</div>
                <div style={{fontSize:'0.72rem',color:C.gray,marginTop:'0.1rem'}}>{zone}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA FINAL */}
      <div style={{background:`linear-gradient(135deg,${C.navy},${C.blue})`,padding:'5rem 5%',textAlign:'center',position:'relative',overflow:'hidden'}}>
        <div style={{position:'absolute',width:400,height:400,borderRadius:'50%',background:'rgba(74,173,232,0.07)',top:-150,right:-100}}/>
        <div style={{position:'relative',zIndex:1,maxWidth:600,margin:'0 auto'}}>
          <h2 style={{fontFamily:'Playfair Display,serif',fontSize:'clamp(1.8rem,3vw,2.4rem)',fontWeight:900,color:C.white,marginBottom:'1rem'}}>
            Rejoignez la famille <span style={{color:C.gold}}>SénEduca</span>
          </h2>
          <p style={{color:'rgba(255,255,255,0.75)',marginBottom:'2rem',lineHeight:1.6}}>Parents, inscrivez vos enfants aujourd'hui. Enseignants, rejoignez notre équipe.</p>
          <div style={{display:'flex',gap:'1rem',justifyContent:'center',flexWrap:'wrap'}}>
            <a href="https://wa.me/221709380086" target="_blank" rel="noreferrer"
              style={{...s.btn('#25D366',C.white,{textDecoration:'none',display:'inline-flex',alignItems:'center',gap:'0.5rem',boxShadow:'0 4px 20px rgba(37,211,102,0.4)'})}}>💬 +221 70 938 00 86</a>
            <a href="mailto:contact@seneduca.sn"
              style={{...s.btn(C.gold,C.navy,{textDecoration:'none',display:'inline-block',boxShadow:'0 4px 20px rgba(200,168,75,0.4)'})}}>📩 contact@seneduca.sn</a>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── FOOTER ────────────────────────────────────────────────────────────
function Footer({setPage}){
  return (
    <footer style={{background:C.dark,color:'rgba(255,255,255,0.6)',padding:'2.5rem 5% 1.5rem',fontFamily:'Nunito,sans-serif'}}>
      <div style={{maxWidth:1200,margin:'0 auto'}}>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(160px,1fr))',gap:'2rem',paddingBottom:'2rem',borderBottom:'1px solid rgba(255,255,255,0.08)'}}>
          <div>
            <div style={{fontWeight:900,fontSize:'1.4rem',color:C.white,marginBottom:'0.6rem'}}>Sén<span style={{color:C.gold}}>Educa</span></div>
            <p style={{fontSize:'0.83rem',lineHeight:1.6,color:'rgba(255,255,255,0.4)'}}>Agence sénégalaise pour l'assistance éducative à domicile. Anciennement Sen.Répétiteur depuis 2020.</p>
            <span style={{display:'inline-block',marginTop:'0.8rem',background:'rgba(200,168,75,0.15)',color:C.goldLight,padding:'0.2rem 0.7rem',borderRadius:50,fontSize:'0.72rem',fontWeight:700}}>⭐ Depuis 2020</span>
          </div>
          {[['Services',['Cours à domicile','Cours en ligne','Prépa examens','Assistant IA']],['Niveaux',['Primaire','Collège','Lycée','BAC · BFEM · CFEE']],['Villes',['Dakar','Thiès','Saint-Louis','Kaolack','Ziguinchor']]].map(([title,links])=>(
            <div key={title}>
              <div style={{color:C.white,fontWeight:800,fontSize:'0.88rem',marginBottom:'1rem'}}>{title}</div>
              {links.map(l=><div key={l} style={{color:'rgba(255,255,255,0.45)',fontSize:'0.83rem',marginBottom:'0.4rem',cursor:'pointer'}} onMouseEnter={e=>e.target.style.color=C.sky} onMouseLeave={e=>e.target.style.color='rgba(255,255,255,0.45)'}>{l}</div>)}
            </div>
          ))}
        </div>
        <div style={{display:'flex',justifyContent:'space-between',paddingTop:'1.5rem',flexWrap:'wrap',gap:'0.5rem'}}>
          <span style={{fontSize:'0.78rem',color:'rgba(255,255,255,0.3)'}}>© 2024 SénEduca — Anciennement Sen.Répétiteur. Tous droits réservés.</span>
          <span style={{fontSize:'0.78rem',color:'rgba(255,255,255,0.3)'}}>Fait avec ❤️ pour l'éducation sénégalaise</span>
        </div>
      </div>
    </footer>
  );
}

// ── APP PRINCIPALE ────────────────────────────────────────────────────
export default function SenEduca(){
  const [page,setPage]=useState('accueil');
  const noFooter=['chat','dashboard'];
  return (
    <div style={{fontFamily:"'Nunito', sans-serif",minHeight:'100vh',display:'flex',flexDirection:'column'}}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Playfair+Display:wght@700;900&display=swap'); *{box-sizing:border-box;}`}</style>
      <Nav page={page} setPage={setPage}/>
      <div style={{flex:1}}>
        {page==='accueil'&&<Accueil setPage={setPage}/>}
        {page==='apropos'&&<APropos/>}
        {page==='repetiteurs'&&<Repetiteurs/>}
        {page==='tarifs'&&<Tarifs/>}
        {page==='chat'&&<Chat/>}
        {page==='dashboard'&&<Dashboard setPage={setPage}/>}
        {page==='contact'&&<div style={{background:C.offWhite,minHeight:'60vh'}}><Contact/></div>}
      </div>
      {!noFooter.includes(page)&&<Footer setPage={setPage}/>}
    </div>
  );
}
