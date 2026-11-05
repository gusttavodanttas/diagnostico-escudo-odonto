/* Escudo Odonto: contagem de visitas e etapas, sem cookies e sem identificar a pessoa. */
(function(){
  var URL='https://script.google.com/macros/s/AKfycbyEiMwLhcyG8GpRB-VxDB6UY_j0QZFcWEgDnlTYdjctbshL_1bgNR2iUku1iJ82jA/exec';
  try{var q=new URLSearchParams(location.search),i=q.get('interno');
    if(i==='1')localStorage.setItem('eo-interno','1');if(i==='0')localStorage.removeItem('eo-interno');}catch(e){}
  function interno(){try{return localStorage.getItem('eo-interno')==='1'}catch(e){return false}}
  function origem(){
    var o='';try{o=localStorage.getItem('eo-origem')||''}catch(e){}
    if(!o){try{var q=new URLSearchParams(location.search);o=(q.get('r')||q.get('origem')||q.get('utm_source')||'').toLowerCase().replace(/[^a-z0-9_-]/g,'').slice(0,40)}catch(e){}}
    if(!o){try{var r=document.referrer;if(r&&r.indexOf('escudoodonto.com.br')<0)o=new URL(r).hostname.replace(/^www\./,'').slice(0,40)}catch(e){}}
    return o||'direto';
  }
  var p=location.pathname;
  var pag=p.indexOf('/diagnostico')===0?'Diagnóstico':p.indexOf('/ebook')===0?'E-book':p.indexOf('/proposta')===0?'Proposta':p.indexOf('/guia')===0?'Guia pago':'Página inicial';
  function envia(ev,extra){
    if(interno())return;
    var k='eo-ev-'+pag+'-'+ev;
    try{if(sessionStorage.getItem(k))return;sessionStorage.setItem(k,'1')}catch(e){}
    var d={tipo:'evento',evento:ev,pagina:pag,origem:origem(),disp:(window.matchMedia&&matchMedia('(max-width: 820px)').matches)?'Celular':'Computador',hp:''};
    if(extra)for(var x in extra)d[x]=extra[x];
    try{fetch(URL,{method:'POST',mode:'no-cors',headers:{'Content-Type':'text/plain;charset=utf-8'},body:JSON.stringify(d),keepalive:true}).catch(function(){})}catch(e){}
  }
  window.eoEvento=envia;
  if(pag!=='Proposta'){
    if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',function(){envia('Visita')});else envia('Visita');
  }
})();
