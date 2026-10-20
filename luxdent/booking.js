(function(){
const form=document.getElementById('bookForm');if(!form)return;
const slots=document.getElementById('slots');
if(slots)slots.addEventListener('click',e=>{const b=e.target.closest('.slot');if(!b)return;slots.querySelectorAll('.slot').forEach(s=>s.classList.remove('on'));b.classList.add('on')});
const q=new URLSearchParams(location.search);
const doc=q.get('doctor'),srv=q.get('service');
const dsel=form.querySelector('[name=doctor]'),ssel=form.querySelector('[name=service]');
const pick=(sel,v)=>{if(!sel||!v)return;[...sel.options].forEach(o=>{if(o.value===v||o.textContent.trim()===v)sel.value=o.value})};
pick(dsel,doc);pick(ssel,srv);
const pre=document.getElementById('preNote');
if(pre&&(doc||srv)){pre.textContent=doc?'Zapis do specjalisty: '+doc:'Zakres: '+srv;pre.classList.add('show')}
form.addEventListener('submit',e=>{
 e.preventDefault();
 let bad=false;
 [form.name,form.phone].forEach(i=>{
  const w=i.closest('.field'),ok=i.value.trim().length>(i===form.phone?9:1);
  w.classList.toggle('err',!ok);
  const h=w.querySelector('.hint');if(h&&h.dataset.err)h.textContent=ok?h.dataset.ok:h.dataset.err;
  if(!ok)bad=true;
 });
 if(bad)return;
 document.getElementById('okMsg').classList.add('show');
 form.querySelector('button[type=submit]').disabled=true;
});
})();
