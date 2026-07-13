(function(){
  var root=document.documentElement, bar=document.querySelector('.rk-bar');
  if(!bar) return;
  var group=bar.querySelector('.rk-group'), frame=document.getElementById('rk-frame'), panel=document.getElementById('sd-panel');
  var cfg; try{ cfg=JSON.parse(document.getElementById('rk-config').textContent); }catch(e){ cfg={views:[]}; }
  var ver=document.getElementById('rk-ver'); if(ver) ver.textContent=cfg.version||'';
  // 依 config 的 views 動態建立按鈕（＋規格鈕，若有任何 .sd-spec）
  var html='';
  (cfg.views||[]).forEach(function(v){ html+='<button class="rk-seg" data-view="'+v.id+'">'+v.label+'</button>'; });
  if(document.querySelector('.sd-spec')) html+='<button class="rk-seg" data-spec>規格</button>';
  html+='<button class="rk-collapse" data-rk-close aria-label="收起">×</button>';
  group.innerHTML=html;
  // 收合／展開
  bar.querySelector('[data-rk-open]').addEventListener('click',function(){bar.classList.add('rk-open');});
  var cb=group.querySelector('[data-rk-close]'); if(cb) cb.addEventListener('click',function(){bar.classList.remove('rk-open');});
  // 切換檢視（換 iframe src ＋ 同步規格）
  function viewById(id){ return (cfg.views||[]).filter(function(v){return v.id===id;})[0]; }
  function setView(id){
    var v=viewById(id); if(!v) return;
    if(frame){ if(v.srcdoc!=null){frame.srcdoc=v.srcdoc;} else if(v.src){frame.setAttribute('src',v.src);} }
    group.querySelectorAll('.rk-seg[data-view]').forEach(function(b){b.classList.toggle('active',b.getAttribute('data-view')===id);});
    var spec=document.getElementById('spec-'+id), title=document.getElementById('sd-title');
    document.querySelectorAll('.sd-spec').forEach(function(s){s.classList.toggle('active',s===spec);});
    if(title) title.textContent = spec ? ('規格 — '+spec.getAttribute('data-name')) : '此檢視尚無規格';
  }
  group.querySelectorAll('.rk-seg[data-view]').forEach(function(b){b.addEventListener('click',function(){setView(b.getAttribute('data-view'));});});
  // 規格抽屜
  function open(){ if(!panel)return; root.classList.add('sd-open');panel.setAttribute('aria-hidden','false');var s=group.querySelector('[data-spec]');if(s)s.classList.add('active'); }
  function close(){ if(!panel)return; root.classList.remove('sd-open');panel.setAttribute('aria-hidden','true');var s=group.querySelector('[data-spec]');if(s)s.classList.remove('active'); }
  var sb=group.querySelector('[data-spec]'); if(sb) sb.addEventListener('click',open);
  document.querySelectorAll('[data-sd-close]').forEach(function(el){el.addEventListener('click',close);});
  document.addEventListener('keydown',function(e){if(e.key==='Escape')close();});
  // 下載當前檢視規格為 .md
  function cell(c){return c.textContent.replace(/\s+/g,' ').trim().replace(/\|/g,'\\|');}
  function inl(el){return el.textContent.replace(/\s+/g,' ').trim();}
  function toMd(spec){
    var out=['# '+spec.getAttribute('data-name')+' — 頁面規格',''];
    Array.prototype.forEach.call(spec.children,function(n){
      if(n.tagName==='H2')out.push('## '+inl(n),'');
      else if(n.tagName==='P')out.push(inl(n),'');
      else if(n.tagName==='UL'){Array.prototype.forEach.call(n.children,function(li){out.push('- '+inl(li));});out.push('');}
      else if(n.classList&&n.classList.contains('fieldspec')){
        var t=n.querySelector('table'); if(!t) return;
        Array.prototype.forEach.call(t.querySelectorAll('tr'),function(tr,i){
          var cs=tr.querySelectorAll('th,td');
          out.push('| '+Array.prototype.map.call(cs,cell).join(' | ')+' |');
          if(i===0)out.push('| '+Array.prototype.map.call(cs,function(){return '---';}).join(' | ')+' |');
        });out.push('');
      }
    });
    return out.join('\n');
  }
  var dl=document.querySelector('[data-sd-dl]');
  if(dl) dl.addEventListener('click',function(){
    var spec=document.querySelector('.sd-spec.active')||document.querySelector('.sd-spec');
    if(!spec) return;
    var md=toMd(spec), name=spec.getAttribute('data-name')+'-規格.md';
    var blob=new Blob([md],{type:'text/markdown;charset=utf-8'});
    var a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=name;
    document.body.appendChild(a);a.click();setTimeout(function(){URL.revokeObjectURL(a.href);a.remove();},0);
  });
  // 預設檢視
  var def=cfg.defaultView || ((cfg.views&&cfg.views[0])?cfg.views[0].id:null);
  if(def) setView(def);
})();
