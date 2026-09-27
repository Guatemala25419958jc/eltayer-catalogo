const $=s=>document.querySelector(s);
const generalMessage='Hola, me gustaría solicitar información sobre sus muebles y recibir una cotización.';
const quoteMessage=name=>`Hola, me interesa solicitar una cotización para el producto ${name}. Me gustaría recibir más información.`;
const whatsappUrl=message=>`https://wa.me/${ELTAYER.whatsapp}?text=${encodeURIComponent(message)}`;
const photo=(collection,index,name,extra='')=>`<div class="sheet-photo ${extra}" role="img" aria-label="${name}" style="background-image:url('assets/${collection}.png');background-position:${index%2===0?0:100}% ${Math.floor(index/2)*25}%"></div>`;
let lastCollection=null;
$('#collection-grid').innerHTML=ELTAYER.collections.map(c=>`<button class="collection-card" data-collection="${c.id}" aria-controls="productos" aria-expanded="false">${photo(c.id,0,c.name,'collection-image')}<h3>${c.name}</h3><p>${c.caption}</p><span class="text-link">Ver colección <span aria-hidden="true">⟶</span></span></button>`).join('');
$('.collection-tabs').innerHTML=ELTAYER.collections.map(c=>`<button type="button" data-collection="${c.id}" aria-pressed="false">${c.name}</button>`).join('');
function showCollection(id,scroll=true){
 const collection=ELTAYER.collections.find(c=>c.id===id);if(!collection)return;
 lastCollection=id;$('#productos').hidden=false;$('#product-title').textContent=collection.name.charAt(0)+collection.name.slice(1).toLowerCase();$('#product-count').textContent='10 PIEZAS / UNA MISMA ESENCIA';
 $('#product-grid').innerHTML=collection.products.map(([name,description,materials],i)=>`<article class="product-card">${photo(id,i,name,'product-image')}<h3>${name}</h3><p>${description}</p><p class="materials">${materials}</p><a class="text-link" href="${whatsappUrl(quoteMessage(name))}" target="_blank" rel="noopener noreferrer" aria-label="Solicitar cotización de ${name}">Solicitar cotización <span aria-hidden="true">↗</span></a></article>`).join('');
 document.querySelectorAll('.collection-tabs button').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.collection===id)));
 document.querySelectorAll('.collection-card').forEach(b=>b.setAttribute('aria-expanded',String(b.dataset.collection===id)));
 if(scroll){$('#product-title').focus({preventScroll:true});$('#productos').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});}
}
document.querySelectorAll('[data-collection]').forEach(b=>b.addEventListener('click',()=>{history.replaceState(null,'',`#coleccion-${b.dataset.collection}`);showCollection(b.dataset.collection);}));
document.querySelectorAll('.back').forEach(b=>b.addEventListener('click',()=>{$('#productos').hidden=true;document.querySelectorAll('.collection-card').forEach(x=>x.setAttribute('aria-expanded','false'));history.replaceState(null,'','#colecciones');document.querySelector(`.collection-card[data-collection="${lastCollection}"]`)?.focus({preventScroll:true});$('#colecciones').scrollIntoView();}));
document.querySelectorAll('.whatsapp-general').forEach(a=>a.href=whatsappUrl(generalMessage));
const menu=$('.menu-toggle');menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Cerrar menú':'Abrir menú');$('#nav').classList.toggle('open',open);});
document.querySelectorAll('#nav a').forEach(a=>a.addEventListener('click',()=>{$('#nav').classList.remove('open');menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Abrir menú');document.querySelectorAll('#nav a').forEach(n=>n.classList.toggle('active',n===a));}));
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&$('#nav').classList.contains('open')){menu.click();menu.focus();}});
$('#year').textContent=new Date().getFullYear();
function restoreHash(){const id=location.hash.replace('#coleccion-','');if(ELTAYER.collections.some(c=>c.id===id))showCollection(id);}
window.addEventListener('hashchange',restoreHash);restoreHash();

/* Animaciones: entrada del hero + aparición del bloque de leads al hacer scroll */
requestAnimationFrame(()=>setTimeout(()=>document.querySelectorAll('.hero-copy .reveal').forEach(el=>el.classList.add('in')),80));
const revealObserver=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('in');revealObserver.unobserve(entry.target);}});},{threshold:.2});
document.querySelectorAll('.leads.reveal').forEach(el=>revealObserver.observe(el));

/* Formulario captador de leads: arma el mensaje y lo envía por WhatsApp, sin guardar datos */
const leadForm=$('#leadForm');
if(leadForm){
 leadForm.addEventListener('submit',e=>{
  e.preventDefault();
  const data=new FormData(leadForm);
  const nombre=(data.get('nombre')||'').trim();
  const telefono=(data.get('telefono')||'').trim();
  const interes=data.get('interes');
  const mensaje=(data.get('mensaje')||'').trim();
  const note=$('#leadNote');
  if(!nombre||!telefono){note.textContent='Por favor completa tu nombre y teléfono.';note.classList.remove('sent');return;}
  const texto=`Hola ELTAYER, soy ${nombre}.\nMe interesa: ${interes}.\nMi teléfono: ${telefono}.${mensaje?`\nDetalle: ${mensaje}`:''}`;
  window.open(whatsappUrl(texto),'_blank','noopener,noreferrer');
  note.textContent='Listo, abrimos WhatsApp con tu mensaje ya redactado.';
  note.classList.add('sent');
  leadForm.reset();
 });
}
