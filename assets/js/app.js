(function(){'use strict';
const $=(s,c=document)=>c.querySelector(s),$$=(s,c=document)=>Array.from(c.querySelectorAll(s));
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
const E=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;');
/* header + progress */
const hd=$('#hd'),pb=$('#pb');
function onScroll(){const y=scrollY;hd&&hd.classList.toggle('scd',y>8);if(pb){const h=document.documentElement.scrollHeight-innerHeight;pb.style.width=(h>0?y/h*100:0)+'%'}rails()}
/* drawer */
const bg=$('#bg'),mn=$('#mn');
function tog(o){mn.classList.toggle('o',o);mn.setAttribute('aria-hidden',!o);bg&&bg.setAttribute('aria-expanded',o);document.body.style.overflow=o?'hidden':''}
if(bg&&mn){bg.addEventListener('click',()=>tog(!mn.classList.contains('o')));mn.addEventListener('click',e=>{if(e.target===mn||e.target.closest('a'))tog(false)});addEventListener('keydown',e=>{if(e.key==='Escape')tog(false)})}
/* reveal */
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12,rootMargin:'0px 0px -6% 0px'});
$$('[data-a],[data-io]').forEach(el=>io.observe(el));
/* counters */
function count(el){const n=+el.dataset.count,s=el.dataset.s||'';if(reduce){el.textContent=n.toLocaleString('en-US')+s;return}let t0=null;const f=t=>{t0=t0||t;const p=Math.min(1,(t-t0)/1400);el.textContent=Math.round(n*(1-Math.pow(1-p,3))).toLocaleString('en-US')+s;if(p<1)requestAnimationFrame(f)};requestAnimationFrame(f)}
const cio=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){count(e.target);cio.unobserve(e.target)}}),{threshold:.4});
$$('[data-count]').forEach(el=>cio.observe(el));
/* tabs */
$$('[data-tabs]').forEach(w=>{const bs=$$('[role=tab]',w),ps=$$(':scope .tp',w);bs.forEach((b,i)=>b.addEventListener('click',()=>{bs.forEach((x,j)=>x.setAttribute('aria-selected',j===i));ps.forEach((p,j)=>p.classList.toggle('on',j===i));$$('[data-count]',ps[i]).forEach(count)}))});
/* scroll rails */
const RL=$$('[data-rail],[data-vt]');
function rails(){const vh=innerHeight;RL.forEach(r=>{const b=r.getBoundingClientRect();let p=(vh*.78-b.top)/(b.height+vh*.15);p=Math.max(0,Math.min(1,p));if(reduce)p=1;r.style.setProperty('--p',p.toFixed(3));const st=$$(':scope > .st',r),n=st.length;st.forEach((s,i)=>s.classList.toggle('on',p>=(n>1?i/(n-1)*.96:0)&&p>0.02))})}
addEventListener('scroll',onScroll,{passive:true});addEventListener('resize',rails);onScroll();
/* tilt */
if(matchMedia('(hover:hover) and (pointer:fine)').matches&&!reduce){$$('.sc').forEach(c=>{c.addEventListener('pointermove',e=>{const r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;c.style.transform=`rotateX(${(.5-y)*10}deg) rotateY(${(x-.5)*12}deg) translateY(-4px)`;c.style.setProperty('--mx',x*100+'%');c.style.setProperty('--my',y*100+'%')});c.addEventListener('pointerleave',()=>{c.style.transform=''})})}
/* filters */
$$('[data-filt]').forEach(f=>{const g=f.parentElement.querySelector('[data-grid]');f.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;$$('button',f).forEach(x=>x.classList.toggle('on',x===b));const k=b.dataset.f;$$('.sc',g).forEach((c,i)=>{const show=k==='all'||c.dataset.st===k;c.classList.toggle('hide',!show);c.classList.remove('pop');if(show){void c.offsetWidth;c.style.animationDelay=(i%5)*.05+'s';c.classList.add('pop')}})})});
/* flip on tap */
$$('.flip').forEach(f=>{f.addEventListener('click',()=>f.classList.toggle('on'));f.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();f.classList.toggle('on')}})});
/* chat */
const CH={
ins:{t:'Client Assistant',s:'Insurance check',m:[['u','Is Patient A’s insurance verified for tomorrow’s 9:30 visit?'],['b','Let me check that for you.'],['c','Eligibility · Patient A (sample)',[['Plan','Active · PPO','ok'],['Eligibility','Verified','ok'],['Copay','$30','bl'],['Deductible left','$120','bl']]],['b','Yes, it’s verified ✓ Sending you the PDF now.'],['f','Eligibility_PatientA.pdf','2 pages · PDF'],['u','Perfect, thanks!']]},
urg:{t:'Client Assistant',s:'Urgent request',m:[['u','URGENT: walk-in patient in 10 minutes. Need insurance verified.'],['b','Priority verification started. Our team is on standby too.'],['c','Priority check · sample',[['Request received','Now','ok'],['Payer query','Sent','bl'],['Coverage','Active','ok'],['Copay','$25','bl']]],['b','Done ✓ Coverage is active. PDF attached.'],['f','Urgent_Eligibility.pdf','1 page · PDF'],['u','Great, sending them in.']]},
st:{t:'Client Assistant',s:'Patient status',m:[['u','I sent Patient C’s insurance details yesterday. What’s the status?'],['b','Let me look that up.'],['c','Request status · Patient C (sample)',[['Received','Yesterday 4:12 pm','ok'],['Verification','Completed','ok'],['Claim','Submitted','bl'],['Payer response','Pending','wn']]],['b','Verification is done and the claim is with the payer. I’ll message you when they respond.'],['u','Great, thank you.']]},
ar:{t:'Client Assistant',s:'A/R and payments',m:[['u','How much A/R have we collected this month, and what has been posted?'],['b','Pulling this month’s numbers from your portal.'],['c','Month to date · sample',[['Payments posted','$48,200','ok'],['Collected from A/R','$21,650','ok'],['Open A/R over 60 days','$6,900','wn'],['Claims pending','37','bl']]],['b','Here is the summary. I can send the full PDF or ask your specialist to review the 60+ day items.'],['f','MTD_AR_Payments.pdf','3 pages · PDF'],['u','Send the PDF, thanks.']]},
rep:{t:'Client Assistant',s:'Reports on request',m:[['u','Can you share last week’s claims and A/R report?'],['b','Sure. Pulling it from your dashboard.'],['c','Weekly summary · sample',[['Claims submitted','142','ok'],['Paid','118','ok'],['Denied','9','wn'],['A/R over 60 days','14','wn']]],['b','Here’s the PDF. Want a call with your billing specialist about the 9 denials?'],['f','Weekly_Claims_AR.pdf','4 pages · PDF'],['u','Yes, tomorrow at 11.'],['t','Booked ✓ Your specialist will call you.']]},
pa:{t:'Client Assistant',s:'Authorization status',m:[['u','What’s the status of the MRI authorization for Patient B?'],['b','Checking now.'],['c','PA status · sample',[['Request','Submitted','ok'],['Payer','In review','bl'],['Documents','Complete','ok'],['Next update','When payer responds','bl']]],['b','It’s in review. I’ll message you the moment it’s approved.']]},
mb:{t:'Client Assistant',s:'Medical billing',m:[['u','Which charges are on hold for documentation this week?'],['b','Checking your charge queue.'],['c','Charges on hold · sample',[['Waiting on provider note','3','wn'],['Coding question open','2','bl'],['Ready to submit','41','ok']]],['t','A coder has sent the 3 documentation questions to the providers. We’ll close them with you.']]},
db:{t:'Client Assistant',s:'Dental billing',m:[['u','Any dental claims waiting on radiographs?'],['b','Let me check the claim queue.'],['c','Attachments · sample',[['Claims waiting on radiographs','2','wn'],['Attachments complete','16','ok'],['Submitted today','9','bl']]],['b','Two claims need radiographs. I’ve listed the patients so your office can upload them.']]},
cred:{t:'Client Assistant',s:'Credentialing status',m:[['u','Where is Dr. L’s enrollment with Payer X?'],['b','Looking up the application.'],['c','Enrollment · sample',[['Application','Submitted','ok'],['Payer review','In progress','bl'],['Documents','Complete','ok'],['License expires','In 5 months','bl']]],['b','It’s in payer review. I’ll flag it when the effective date is confirmed.']]},
claim:{t:'Client Assistant',s:'Claim status',m:[['u','What happened to Claim 10484?'],['b','Pulling the claim history.'],['c','Claim 10484 · sample',[['Scrubbed','Radiograph missing','wn'],['Fixed','Attachment added','ok'],['Submitted','Today','ok'],['Payer response','Pending','bl']]],['b','It’s fixed and submitted. I’ll tell you when the payer responds.']]},
den:{t:'Client Assistant',s:'Denials',m:[['u','Which denials need action this week?'],['b','Checking appeal deadlines.'],['c','Denials · sample',[['Appeals due in 7 days','4','wn'],['Top cause','Missing information','bl'],['Appeals in progress','6','ok']]],['t','A specialist owns each appeal. I’ve sent you the list with deadlines.']]},
pay:{t:'Client Assistant',s:'Payments posted',m:[['u','Was Tuesday’s payer deposit posted?'],['b','Checking remittances and deposits.'],['c','Posting · sample',[['Remittance received','Tuesday','ok'],['Posted to claims','12 of 12','ok'],['Short pays flagged','1','wn']]],['b','Posted. One short pay is flagged for a specialist to review.']]},
an:{t:'Client Assistant',s:'Reports',m:[['u','Send me this month’s denial report.'],['b','Generating it from your portal.'],['c','Denials by cause · sample',[['Missing information','12 claims','wn'],['Eligibility','9 claims','bl'],['Coding or documents','7 claims','bl']]],['f','Denials_Report.pdf','3 pages · PDF'],['b','Sent. Want a call to go through the patterns?']]}
};
const BOT='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="8" width="16" height="11" rx="3.5"/><path d="M12 8V4.5M9 13.5v.01M15 13.5v.01M9.5 16.5h5"/></svg>';
function chat(root){let id=root.dataset.chat,cycle=root.dataset.cycle,tok=0,vis=false,started=false;const LIST=['ins','urg','st','ar','rep','pa'];
 root.innerHTML=`<div class="cx-m"><div class="cx-h"><span class="av">${BOT}</span><div><b class="n1"></b><small class="n2"></small></div><span class="lv"><i></i>Online 24/7</span></div><div class="cx-b"></div></div>`;
 const body=$('.cx-b',root);const ctl=root.id?$(`[data-ctl="${root.id}"]`):null;
 function head(){$('.n1',root).textContent=CH[id].t;$('.n2',root).textContent=CH[id].s+' · sample data';if(ctl)$$('button',ctl).forEach(b=>b.classList.toggle('on',b.dataset.k===id))}
 async function play(){const my=++tok;body.innerHTML='';head();for(const x of CH[id].m){if(my!==tok)return;
   if(x[0]!=='u'){const t=document.createElement('div');t.className='m b typ';t.innerHTML='<i></i><i></i><i></i>';body.appendChild(t);await sleep(reduce?0:700);if(my!==tok)return;t.remove()}else await sleep(reduce?0:500);
   if(my!==tok)return;const d=document.createElement('div');
   if(x[0]==='c'){d.className='m b card';d.innerHTML=`<h6>${E(x[1])}</h6>`+x[2].map(r=>`<div><span>${E(r[0])}</span><span class="sb ${r[2]}">${E(r[1])}</span></div>`).join('')}
   else if(x[0]==='f'){d.className='pdf';d.style.animation='min .4s both';d.innerHTML=`<i>PDF</i><div><b>${E(x[1])}</b><small>${E(x[2])}</small></div>`}
   else{d.className='m '+x[0];d.innerHTML=(x[0]==='t'?'<small>Specialist</small>':'')+E(x[1])}
   body.appendChild(d);body.scrollTop=body.scrollHeight;await sleep(reduce?0:900)}
  await sleep(4500);if(my!==tok)return;if(vis){if(cycle){id=LIST[(LIST.indexOf(id)+1)%LIST.length]}play()}}
 if(ctl)ctl.addEventListener('click',e=>{const b=e.target.closest('button');if(b){id=b.dataset.k;play()}});
 new IntersectionObserver(es=>es.forEach(e=>{vis=e.isIntersecting;if(vis&&!started){started=true;play()}else if(!vis){tok++}else if(vis&&started){play()}}),{threshold:.25}).observe(root);head()}
$$('[data-chat]').forEach(chat);
/* contact form */
const f=$('#cf');
if(f){const g=id=>$('#'+id).value.trim();f.addEventListener('submit',e=>{e.preventDefault();let ok=true;$$('input[required],select[required]',f).forEach(x=>{const bad=!x.value.trim()||(x.type==='email'&&!/^\S+@\S+\.\S+$/.test(x.value));x.parentElement.classList.toggle('bad',bad);if(bad)ok=false});
 const fs=$('#fs');if(!ok){fs.textContent='Please complete the required fields.';return}fs.textContent='';
 const txt=`Organization: ${g('org')}\nName: ${g('nm')}\nEmail: ${g('em')}\nPhone: ${g('ph')||'-'}\nType: ${g('ty')}\nInterested in: ${g('sv')}\n\n${g('ms')||'(no message)'}`;
 const to=(window.VEROVYN_CONFIG&&window.VEROVYN_CONFIG.contactEmail)||'info@verovyn.com';
 $('#dt').textContent=txt;$('#mt').href='mailto:'+to+'?subject='+encodeURIComponent('Discovery enquiry · '+g('org'))+'&body='+encodeURIComponent(txt);$('#dr').hidden=false;$('#dr').scrollIntoView({behavior:'smooth',block:'center'})});
 $('#cp')&&$('#cp').addEventListener('click',()=>{navigator.clipboard&&navigator.clipboard.writeText($('#dt').textContent);$('#cp').textContent='Copied ✓'})}
})();
