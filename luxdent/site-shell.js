(function(){
const P=location.pathname.split('/').pop()||'index.html';
const dirs=[["page-implants.html","Implantologia"],["page-veneers.html","Odbudowa estetyczna i licówki"],["page-aligners.html","Nakładki (alignery)"],["page-hygiene.html","Profilaktyka i higiena"]];
const nav=[["home.html","Klinika"],["page-doctors.html","Lekarze"],["page-cases.html","Przypadki"],["page-contacts.html","Kontakt"]];
const on=h=>P===h?' class="on"':'';
const ROOT=document.querySelector('doc-page')||document.body;
const CTA='page-contacts.html#book';
const HREF=P==='page-contacts.html'?'#book':CTA;
ROOT.insertAdjacentHTML('afterbegin',`<header class="s-top" id="top">
<div class="s-wrap in">
<a href="home.html" style="border:0"><span class="lg" style="--s:15px"><img class="m" src="assets/luxdent-mark.png" alt="LUXDENT"><img class="w" src="assets/luxdent-wordmark.png" alt=""></span></a>
<nav class="s-menu">
<div class="drop"><span class="dt${dirs.some(d=>d[0]===P)?' on':''}">Leczenie <em>▾</em></span><div class="dm">${dirs.map(d=>`<a href="${d[0]}"${on(d[0])}>${d[1]}</a>`).join('')}</div></div>
${nav.map(n=>`<a href="${n[0]}"${on(n[0])}>${n[1]}</a>`).join('')}
</nav>
<div class="act"><a class="tel mono" href="tel:+48221204040" style="border:0;font-size:12px">+48 22 120 40 40</a><a class="btn btn-pri btn-sm" href="${HREF}">Diagnostyka cyfrowa</a><button class="burger" id="burger" aria-expanded="false" aria-controls="mPanel" aria-label="Menu"><i></i></button></div>
</div>
<div class="m-panel" id="mPanel"><div class="s-wrap">
<b>Leczenie</b>${dirs.map(d=>`<a href="${d[0]}"${on(d[0])}>${d[1]}</a>`).join('')}
<b>Klinika</b>${nav.map(n=>`<a href="${n[0]}"${on(n[0])}>${n[1]}</a>`).join('')}
<div class="tel-row"><a class="mono" href="tel:+48221204040" style="border:0;font-size:12px;padding:0">+48 22 120 40 40</a><a class="btn btn-acc" href="${HREF}">Zapisz się na diagnostykę cyfrową</a></div>
</div></div></header>`);
ROOT.insertAdjacentHTML('beforeend',`<footer class="s-foot">
<div class="s-wrap">
<div class="cols">
<div><span class="lg on-dark" style="--s:16px"><img class="m" src="assets/luxdent-mark.png" alt="LUXDENT"><img class="w" src="assets/luxdent-wordmark.png" alt=""></span>
<p style="margin:20px 0 22px;max-width:32ch;line-height:1.6">Klinika stomatologii cyfrowej. Diagnostyka, plan i stała cena — w trakcie jednej wizyty.</p>
<a class="btn btn-acc btn-sm" href="${CTA}">Zapisz się na diagnostykę cyfrową</a></div>
<div><b>Leczenie</b><ul>${dirs.map(d=>`<li><a href="${d[0]}">${d[1]}</a></li>`).join('')}</ul></div>
<div><b>Klinika</b><ul>${nav.map(n=>`<li><a href="${n[0]}">${n[1]}</a></li>`).join('')}</ul></div>
<div><b>Kontakt</b><ul><li><a href="tel:+48221204040">+48 22 120 40 40</a></li><li><a href="mailto:kontakt@luxdent.pl">kontakt@luxdent.pl</a></li><li>ul. Wilcza 21, Warszawa</li><li>Pn—Sb 09:00—21:00</li></ul></div>
</div>
<div class="legal"><span>© 2026 LUXDENT. Numer księgi rejestrowej 000000241893</span><span>Istnieją przeciwwskazania — konieczna konsultacja ze specjalistą</span><span><a href="#">Polityka prywatności</a></span></div>
</div></footer>`);
const t=document.querySelector('.s-top');
const bg=document.getElementById('burger'),mp=document.getElementById('mPanel');
bg.addEventListener('click',()=>{const o=mp.classList.toggle('open');bg.setAttribute('aria-expanded',o)});
mp.addEventListener('click',e=>{if(e.target.closest('a')){mp.classList.remove('open');bg.setAttribute('aria-expanded','false')}});
addEventListener('scroll',()=>t.classList.toggle('small',scrollY>40),{passive:true});
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{rootMargin:'0px 0px -8% 0px'});
document.querySelectorAll('.reveal').forEach((el,i)=>{el.style.transitionDelay=(i%3*60)+'ms';io.observe(el)});
document.querySelectorAll('[data-ba]').forEach(ba=>{
 const set=e=>{const r=ba.getBoundingClientRect();const cx=e.clientX??(e.touches&&e.touches[0].clientX);if(cx==null)return;ba.style.setProperty('--x',Math.min(100,Math.max(0,(cx-r.left)/r.width*100))+'%')};
 let dn=false;
 ba.addEventListener('pointerdown',e=>{dn=true;ba.setPointerCapture(e.pointerId);set(e)});
 ba.addEventListener('pointermove',e=>{if(dn)set(e)});
 ba.addEventListener('pointerup',()=>dn=false);ba.addEventListener('pointercancel',()=>dn=false);
});
})();

(function(){var b=document.createElement('div');b.setAttribute('role','note');
b.style.cssText='position:relative;z-index:60;background:#9c7432;color:#fff;font:600 13px/1.4 Inter,system-ui,sans-serif;text-align:center;padding:9px 16px';
b.textContent='Projekt koncepcyjny · fikcyjna klinika · strona demonstracyjna z portfolio Nataliia Zhyhalova. Dane, lekarze i opinie są przykładowe.';
document.body.insertBefore(b,document.body.firstChild);})();
