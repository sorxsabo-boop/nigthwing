'use strict';
const K='nightLedger1',$=s=>document.querySelector(s);
let S;try{S=JSON.parse(localStorage.getItem(K))}catch(e){}
if(!S||typeof S!=='object')S={};
S.set=Object.assign({cal:2350,pro:120,water:2500,cre:5,steps:10000,min:8000,age:22,h:170,act:1.55,mt:2500},S.set||{});
['d','w'].forEach(k=>{if(!S[k]||typeof S[k]!=='object')S[k]={}});
if(!Array.isArray(S.f))S.f=[];
if(!S.tab)S.tab='home';
const save=()=>{try{localStorage.setItem(K,JSON.stringify(S))}catch(e){}};
const pad=n=>String(n).padStart(2,'0');
const dk=(d=new Date())=>d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate());
const day=k=>S.d[k]||(S.d[k]={warm:{},sets:{},wl:[]});
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const N=(v,d=0)=>{v=parseFloat(v);return isFinite(v)?v:d};
const sum=a=>a.reduce((x,y)=>x+y,0);
const pct=(a,b)=>Math.min(100,b?Math.round(a/b*100):0);
const bar=(a,b)=>`<div class="bar"><i style="width:${pct(a,b)}%"></i></div>`;
const wd=new Date().getDay();
const mk=a=>a.map(s=>{const x=s.split('|');return{n:x[0],t:x[1],s:+x[2],r:x[3]}});
const BK='Light treadmill or cycling: 3–5 min|Arm circles: 10 forward, 10 backward|Light face pulls: 2 × 15|Scapular pulldowns: 1 × 12–15|Lat pulldown: 1–2 progressively heavier light sets'.split('|');
const P={
1:{n:'Back + Biceps + Forearms',w:BK,e:mk(['Lat Pulldown|Lats|3|8–12','Seated Cable Row|Middle back, rhomboids|3|8–12','Chest-Supported Row|Upper & middle back|3|8–12','Straight-Arm Pulldown|Lats|2|12–15','Dumbbell Shrugs|Upper traps|2|10–15','Dumbbell Curl|Biceps|3|8–12','Preacher Curl Machine|Biceps|3|10–12','Hammer Curl|Brachialis, brachioradialis|2|10–15','Wrist Curl|Forearms|2|15–20','Reverse Wrist Curl|Forearms|2|15–20'])},
2:{n:'Chest + Triceps',w:['Light treadmill or cycling: 3–5 min','Arm circles: 10 forward, 10 backward','Very light band/cable external rotations: 1 × 12–15 per side','Scapular push-ups: 1 × 10–15','Chest press machine: 1–2 progressively heavier warm-up sets'],e:mk(['Incline Dumbbell Press|Upper chest|3|8–12','Chest Press Machine|Chest|3|8–12','Pec Deck|Chest|3|10–15','Push-ups|Chest, triceps|2|Stop near technical failure','Cable Pushdown|Triceps|3|10–15','Dumbbell Overhead Extension|Triceps long head|3|10–15'])},
3:{n:'Legs + Abs + Neck',w:['Light treadmill or cycling: 3–5 min','Bodyweight squats: 2 × 10','Reverse lunges: 1 × 8 per leg','Leg swings: 10 per leg','Ankle circles: 10 each direction','Leg press: 1–2 progressively heavier warm-up sets'],e:mk(['Leg Press|Quadriceps, glutes|3|8–12','Leg Extension|Quadriceps|2|10–15','Seated or Lying Leg Curl|Hamstrings|3|10–15','Hip Thrust Machine or Glute Bridge|Glutes|2|8–12','Calf Raise|Calves|3|12–20','Hanging Knee Raise|Abdominals|3|10–15','Cable Crunch|Rectus abdominis|2|10–15','Plank|Core stability|2|30–60 sec','Chin Tucks|Neck (very light)|2|10–15','Light Neck Flexion|Neck (very light)|2|15–20','Side Neck Flexion|Neck (very light)|2|12–15 per side'])},
4:{n:'Shoulders + Triceps',w:['Light treadmill or cycling: 3–5 min','Arm circles: 10 forward, 10 backward','Very light lateral raises: 1 × 15','Very light face pulls: 1 × 15','Light dumbbell shoulder press: 1–2 warm-up sets'],e:mk(['Dumbbell Shoulder Press|Front & side delts|3|8–12','Dumbbell Lateral Raise|Side delts|4|12–20','Rear-Delt Machine or Dumbbell Fly|Rear delts|3|12–15','Face Pull|Rear delts, upper back|2|12–15','Dumbbell Shrugs|Upper traps|2|10–15','Cable Pushdown|Triceps|3|10–15','Dumbbell Overhead Extension|Triceps|3|10–15'])},
5:{n:'Back + Biceps + Forearms',w:BK,e:mk(['Lat Pulldown|Lats|3|8–12','Seated Cable or Machine Row|Mid back|3|8–12','One-Arm Dumbbell Row|Lats, mid back|3|8–12','Straight-Arm Pulldown|Lats|2|12–15','Incline Dumbbell Curl|Biceps|3|8–12','Preacher Curl Machine|Biceps|3|10–12','Hammer Curl|Brachialis|2|10–15','Reverse Wrist Curl|Forearms|2|15–20','Wrist Curl|Forearms|2|15–20'])},
6:{n:'Chest + Shoulders + Neck',w:['Light treadmill or cycling: 3–5 min','Arm circles: 10 forward, 10 backward','Scapular push-ups: 1 × 10–15','Very light lateral raises: 1 × 15','Light face pulls: 1 × 15','Incline dumbbell press: 1–2 progressively heavier warm-up sets'],e:mk(['Incline Dumbbell Press|Upper chest|3|8–12','Chest Press Machine|Chest|3|8–12','Pec Deck or Cable Fly|Chest|2|12–15','Dumbbell Lateral Raise|Side delts|4|12–20','Rear-Delt Machine or Dumbbell Fly|Rear delts|3|12–15','Chin Tucks|Neck (very light)|2|10–15','Hand-Resisted Neck Isometrics|Neck (light)|2|10–15 sec per direction'])},
0:{n:'REST / RECOVERY DAY',w:[],e:[]}};
const FD=[['Egg','1 large',78,6,.6,5],['Banana','1 medium',105,1.3,27,.4],['Milk','250 ml',150,8,12,8],['Cooked rice','1 cup',205,4.3,45,.4],['Roti','1 medium',100,3,18,2.5],['Dal','1 bowl',180,9,27,4],['Curd','1 bowl (200 g)',120,7,9,6],['Cooked chicken','100 g',165,31,0,3.6],['Cooked mutton','100 g',250,25,0,17],['Roasted chana','50 g',185,10,30,3],['Peanuts','30 g',170,7.5,5,14],['Sabji (vegetables)','1 bowl',100,3,12,4.5]];
const MEALS=['Breakfast','Lunch','Evening snack','Dinner','Other'];
const TPL=[['Breakfast A (3 eggs, banana, milk)','Breakfast',[[0,3],[1,1],[2,1]]],['Breakfast B (3 eggs, banana, curd)','Breakfast',[[0,3],[1,1],[6,1]]],['Lunch (roti, dal, rice, sabji, curd)','Lunch',[[4,3],[5,1],[3,1],[11,1],[6,1]]],['Evening A (chana, banana)','Evening snack',[[9,1],[1,1]]],['Evening B (milk, peanuts)','Evening snack',[[2,1],[10,1]]],['Evening C (2 eggs)','Evening snack',[[0,2]]],['Dinner non-veg (chicken 150 g, roti, sabji, dal)','Dinner',[[7,1.5],[4,3],[11,1],[5,1]]],['Dinner veg (roti, dal, curd, sabji)','Dinner',[[4,3],[5,1],[6,1],[11,1]]]];
const todayK=()=>dk();
const foods=k=>S.f.filter(f=>f.date===k);
const tot=k=>{const a=foods(k);return{cal:sum(a.map(f=>f.cal)),p:sum(a.map(f=>f.p)),c:sum(a.map(f=>f.c)),f:sum(a.map(f=>f.f))}};
const water=k=>sum(((S.d[k]||{}).wl||[]));
const vol=k=>{const d=S.d[k];if(!d)return 0;return sum(Object.values(d.sets||{}).map(a=>sum(a.filter(s=>s.done).map(s=>N(s.w)*N(s.r)))))};
const done=k=>!!(S.d[k]&&S.d[k].fin);
function streak(){let n=0,d=new Date();for(let i=0;i<400;i++){const k=dk(d),g=d.getDay();if(g!==0){if(done(k))n++;else if(i>0)break}d.setDate(d.getDate()-1)}return n}
function stepStatus(s){if(s===undefined)return'Not recorded';return s>=S.set.steps?'Daily target achieved':s>=S.set.min?'Minimum goal reached':'Keep going'}
let cur=dk();
function home(){const k=todayK(),d=day(k),t=tot(k),w=water(k),p=P[wd],st=S.set,wk=Object.keys(S.w).sort(),lw=wk.length?S.w[wk[wk.length-1]]:null,wu=p.w.filter((_,i)=>d.warm[i]).length;
return`<h1>${new Date().toDateString()}</h1>
<div class="card"><div class="m">Today's workout</div><div class="big">${esc(p.n)}</div><div class="m">Warm-up ${wu}/${p.w.length} · ${wd===0?'Rest day does not break your streak':done(k)?'Workout complete':'Workout not finished'} · Streak ${streak()}</div><button data-a="tab" data-v="workout">${wd===0?'View rest day':'Start Workout'}</button></div>
<div class="grid">
<div class="card"><div class="m">Calories</div><div class="big">${Math.round(t.cal)} / ${st.cal} kcal</div>${bar(t.cal,st.cal)}<button data-a="tab" data-v="nutrition">Log Food</button></div>
<div class="card"><div class="m">Protein</div><div class="big">${Math.round(t.p)} / ${st.pro} g</div>${bar(t.p,st.pro)}</div>
<div class="card"><div class="m">Water</div><div class="big">${w} / ${st.water} ml</div>${bar(w,st.water)}${[250,500,750,1000].map(x=>`<button data-a="w" data-v="${x}">+${x}</button>`).join('')}<button data-a="wu">Undo</button><button data-a="wc">Add custom</button></div>
<div class="card"><div class="m">Steps</div><div class="big">${d.steps===undefined?'—':d.steps.toLocaleString()} / ${st.steps.toLocaleString()}</div>${bar(d.steps||0,st.steps)}<div class="${d.steps>=st.min?'ok':''}">${stepStatus(d.steps)} (min ${st.min.toLocaleString()})</div>${[1000,2000,5000].map(x=>`<button data-a="s+" data-v="${x}">+${x}</button>`).join('')}<button data-a="s">Log Steps</button></div>
<div class="card"><div class="m">Creatine</div><div class="big">${d.cre?'Recorded: '+d.cre+' g':'Not recorded today'}</div><button data-a="cre">Take ${st.cre} g</button>${d.cre?'<button data-a="cre0">Undo</button>':''}<div class="m">Total recorded days: ${Object.values(S.d).filter(x=>x.cre).length}. Tracking only; it does not prove it was taken.</div></div>
<div class="card"><div class="m">Body weight</div><div class="big">${lw?lw+' kg':'—'}</div><button data-a="bw">Record Weight</button></div></div>`}
function workout(){const k=cur,d=day(k),dt=new Date(k+'T12:00:00'),p=P[dt.getDay()];
let h=`<div class="row"><input type="date" value="${k}" data-c="date"><button data-a="tab" data-v="workout" onclick="cur=dk()">Today</button></div><h2>${esc(p.n)}</h2>`;
if(!p.e.length)return h+'<div class="card"><div class="big">REST / RECOVERY DAY</div><p>Optional: walking, gentle mobility, normal daily activity. No gym workout required; your streak is not affected. Steps still count today.</p></div>';
const wu=p.w.filter((_,i)=>d.warm[i]).length;
h+=`<div class="card"><b>WARM-UP: ${wu}/${p.w.length} COMPLETED (${pct(wu,p.w.length)}%)</b>${bar(wu,p.w.length)}<div class="m">Light sets only, never to failure. Not counted in volume or PRs.</div>`+p.w.map((x,i)=>`<label class="row"><input type="checkbox" style="max-width:30px" ${d.warm[i]?'checked':''} data-c="wu" data-i="${i}"> ${esc(x)}</label>`).join('')+'</div>';
let cs=0,ce=0,ts=0;
p.e.forEach(e=>{const a=d.sets[e.n]||[];const dn=a.filter(s=>s.done);cs+=dn.length;ts+=e.s;if(dn.length>=e.s)ce++;
const top=N((e.r.match(/\d+/g)||[0]).slice(-1)[0]);
const up=/\d/.test(e.r)&&dn.length>=e.s&&dn.every(s=>N(s.r)>=top&&s.rir!==''&&N(s.rir)>=1&&N(s.rir)<=3&&!s.pain);
h+=`<div class="card"><b>${esc(e.n)}</b> <span class="m">${esc(e.t)} · ${e.s} × ${esc(e.r)}</span>`+a.map((s,i)=>`<div class="row"><span>${i+1}</span><input type="number" step="0.5" placeholder="kg" value="${s.w}" data-c="set" data-e="${esc(e.n)}" data-i="${i}" data-f="w"><input type="number" placeholder="reps" value="${s.r}" data-c="set" data-e="${esc(e.n)}" data-i="${i}" data-f="r"><input type="number" placeholder="RIR" value="${s.rir}" data-c="set" data-e="${esc(e.n)}" data-i="${i}" data-f="rir"><button class="${s.done?'on':''}" data-a="sd" data-e="${esc(e.n)}" data-v="${i}">✓</button><button data-a="sx" data-e="${esc(e.n)}" data-v="${i}">✕</button></div>`).join('')+`<button data-a="sa" data-e="${esc(e.n)}">+ Set</button>`+(up?'<div class="pr">Ready for a small weight increase next session.</div>':'')+`<input class="w" style="max-width:none" placeholder="Notes" value="${esc((d.notes||{})[e.n]||'')}" data-c="note" data-e="${esc(e.n)}"></div>`});
h+=`<div class="card"><div class="big">${pct(cs,ts)}% complete</div><div class="m">Sets ${cs}/${ts} · Exercises ${ce}/${p.e.length} · Working volume ${vol(k)} kg (warm-ups excluded)</div><button data-a="fin">${d.fin?'Marked finished (tap to undo)':'Finish workout'}</button></div>`;return h}
function nutrition(){const k=cur,t=tot(k),st=S.set;
let h=`<div class="row"><input type="date" value="${k}" data-c="date"></div><div class="card"><div class="big">${Math.round(t.cal)} / ${st.cal} kcal</div>${bar(t.cal,st.cal)}<div>Remaining ${Math.max(0,Math.round(st.cal-t.cal))} kcal</div><div>Protein ${Math.round(t.p)} / ${st.pro} g (remaining ${Math.max(0,Math.round(st.pro-t.p))})</div>${bar(t.p,st.pro)}<div class="m">Carbs ${Math.round(t.c)} g · Fat ${Math.round(t.f)} g. All values are estimates.</div></div>
<div class="card"><h3>Add food</h3><select id="fs" data-c="fs"><option value="">Custom / starter food…</option>${FD.map((f,i)=>`<option value="${i}">${f[0]} (${f[1]})</option>`).join('')}${(S.fav||[]).map((f,i)=>`<option value="f${i}">★ ${esc(f[0])} (${esc(f[1])})</option>`).join('')}</select>
<div class="row"><input class="w" style="max-width:150px" id="fn" placeholder="Food"><input id="fv" placeholder="Serving"><input id="fc" type="number" placeholder="kcal"><input id="fp" type="number" placeholder="Protein g"><input id="fcb" type="number" placeholder="Carbs g"><input id="ff" type="number" placeholder="Fat g"><select id="fm">${MEALS.map(m=>`<option>${m}</option>`).join('')}</select></div><button data-a="fa">Add to log</button><button data-a="ffav">Save as favorite</button></div>`;
MEALS.forEach(m=>{const a=foods(k).filter(f=>f.meal===m);if(a.length)h+=`<div class="card"><b>${m}</b>`+a.map(f=>`<div class="row"><span style="flex:1">${esc(f.name)} (${esc(f.serv)}) · ${Math.round(f.cal)} kcal · P${Math.round(f.p)} C${Math.round(f.c)} F${Math.round(f.f)}</span><button data-a="fe" data-v="${f.id}">Edit</button><button data-a="fd" data-v="${f.id}">Copy</button><button data-a="fx" data-v="${f.id}">✕</button></div>`).join('')+'</div>'});
const top=FD.map(f=>f).sort((a,b)=>b[3]/b[2]-a[3]/a[2]).slice(0,4).map(f=>f[0]+' '+f[3]+' g').join(', ');
h+=`<div class="card"><h3>Suggested meals (not logged until you add them)</h3>`+TPL.map((x,i)=>`<div class="row"><span style="flex:1">${x[0]}</span><button data-a="tpl" data-v="${i}">Add meal to today's log</button></div>`).join('')+`<div class="m">Protein-dense per kcal in the starter list: ${top}. Totals come only from what you log.</div></div>`;return h}
function chart(t,pts,u){pts=pts.filter(p=>isFinite(p[1]));if(pts.length<2)return`<div class="card"><b>${t}</b><div class="m">Need at least 2 recorded points.</div></div>`;const ys=pts.map(p=>p[1]),lo=Math.min(...ys),hi=Math.max(...ys),r=hi-lo||1;
const xy=pts.map((p,i)=>(10+i/(pts.length-1)*280).toFixed(1)+','+(105-(p[1]-lo)/r*90).toFixed(1)).join(' ');
return`<div class="card"><b>${t}</b><svg viewBox="0 0 300 120"><polyline points="${xy}" fill="none" stroke="#27d3ff" stroke-width="2"/></svg><div class="m">${pts[0][0]} → ${pts[pts.length-1][0]} · min ${+lo.toFixed(1)} · max ${+hi.toFixed(1)} ${u}</div></div>`}
function progress(){const ds=Object.keys(S.d).sort(),st=S.set;const sk=ds.filter(k=>S.d[k].steps!==undefined);const sv=sk.map(k=>S.d[k].steps);
const avg=n=>{const a=sk.slice(-n).map(k=>S.d[k].steps);return a.length?Math.round(sum(a)/a.length):'—'};
const fk=[...new Set(S.f.map(f=>f.date))].sort();
const wk=Object.keys(S.w).sort();const l=wk.length?S.w[wk[wk.length-1]]:null,pr=wk.length>1?S.w[wk[wk.length-2]]:null;
return`<h2>Progress</h2><div class="card"><div class="big">${l?l+' kg':'No weight yet'}</div><div class="m">${pr?`Previous ${pr} kg · change ${(l-pr).toFixed(1)} kg. A single weigh-in is noise, not proof of fat or muscle change.`:'Record more weigh-ins to see change.'}</div><button data-a="bw">Record Weight</button><button data-a="wst">Record Waist (cm)</button></div>
<div class="card"><b>Steps</b><div class="m">Last 7 recorded: avg ${avg(7)} · last 30: avg ${avg(30)} · days ≥${st.min}: ${sv.filter(x=>x>=st.min).length} · days ≥${st.steps}: ${sv.filter(x=>x>=st.steps).length} (unrecorded days are excluded, not counted as zero)</div></div>`
+chart('Body weight (kg)',wk.map(k=>[k,S.w[k]]),'kg')+chart('Waist (cm)',Object.keys(S.ws||{}).sort().map(k=>[k,S.ws[k]]),'cm')+chart('Calories',fk.map(k=>[k,tot(k).cal]),'kcal')+chart('Protein',fk.map(k=>[k,tot(k).p]),'g')+chart('Workout volume',ds.filter(k=>vol(k)>0).map(k=>[k,vol(k)]),'kg')+chart('Steps',sk.map(k=>[k,S.d[k].steps]),'steps')}
function profile(){const s=S.set;const f=(l,k)=>`<label class="row" style="justify-content:space-between">${l}<input type="number" value="${s[k]}" data-c="set0" data-f="${k}"></label>`;
const wk=Object.keys(S.w).sort(),w=wk.length?S.w[wk[wk.length-1]]:68;const bmr=10*w+6.25*s.h-5*s.age+5;
return`<h2>Profile and settings</h2><div class="card">${f('Age','age')}${f('Height (cm)','h')}${f('Calorie target','cal')}${f('Protein target (g)','pro')}${f('Water target (ml)','water')}${f('Creatine (g)','cre')}${f('Step target','steps')}${f('Minimum steps','min')}${f('Maintenance (kcal)','mt')}</div>
<div class="card"><h3>Calorie calculator (male, Mifflin–St Jeor)</h3><label class="row">Activity<select data-c="set0" data-f="act">${[[1.2,'Sedentary'],[1.375,'Light'],[1.55,'Moderate'],[1.725,'Very active']].map(a=>`<option value="${a[0]}" ${s.act==a[0]?'selected':''}>${a[1]}</option>`).join('')}</select></label>
<div class="big">BMR ${Math.round(bmr)} kcal · TDEE ${Math.round(bmr*s.act)} kcal</div><div class="m">Based on ${w} kg. Only an estimate. Review several weeks of weight trend before changing targets; never adjust from one day.</div><button data-a="usetdee" data-v="${Math.round(bmr*s.act)}">Use as maintenance</button></div>
<div class="card"><button data-a="exp">Export data (JSON)</button></div>`}
const V={home,workout,nutrition,progress,profile};
function render(){document.querySelectorAll('#nav button').forEach(b=>b.classList.toggle('on',b.dataset.v===S.tab));$('#v').innerHTML=V[S.tab]()}
function ff(id,v){const e=S.f.find(x=>x.id==id);return e}
function addFood(o){S.f.push(Object.assign({id:Date.now()+Math.random(),date:cur},o))}
let tEnd=0,tLeft=0,tRun=false,tI=null;
function tick(){let l=tRun?Math.max(0,Math.ceil((tEnd-Date.now())/1000)):tLeft;if(tRun&&l===0){tRun=false;tLeft=0;try{navigator.vibrate&&navigator.vibrate(300)}catch(e){}}$('#tm').textContent=Math.floor(l/60)+':'+pad(l%60)}
function tStart(s){tLeft=s;tEnd=Date.now()+s*1000;tRun=true;clearInterval(tI);tI=setInterval(tick,250);tick()}
document.addEventListener('click',ev=>{const b=ev.target.closest('button');if(!b)return;const a=b.dataset.a,v=b.dataset.v,e=b.dataset.e,k=todayK(),d=day(k);let r=true;
if(a==='tab'){S.tab=v;cur=S.tab==='home'?dk():cur}
else if(a==='w'){d.wl.push(+v)}else if(a==='wu'){d.wl.pop()}
else if(a==='wc'){const x=N(prompt('Water (ml)'));if(x>0)d.wl.push(x)}
else if(a==='s'){const x=prompt('Steps today (corrects current value)',d.steps===undefined?'':d.steps);if(x!==null&&x!==''&&N(x,-1)>=0)d.steps=Math.round(N(x))}
else if(a==='s+'){d.steps=(d.steps||0)+ +v}
else if(a==='cre'){if(d.cre){if(confirm('Already recorded today. Correct the dose?')){const x=N(prompt('Dose (g)',d.cre));if(x>0)d.cre=x}}else d.cre=S.set.cre}
else if(a==='cre0'){delete d.cre}
else if(a==='bw'){const x=N(prompt('Weight (kg)'),0);if(x>0)S.w[k]=x}
else if(a==='wst'){const x=N(prompt('Waist (cm)'),0);if(x>0){S.ws=S.ws||{};S.ws[k]=x}}
else if(a==='sa'){const dd=day(cur);const s=dd.sets[e]||(dd.sets[e]=[]);const l=s[s.length-1]||{};s.push({w:l.w||'',r:'',rir:'',done:false})}
else if(a==='sd'){const s=day(cur).sets[e][+v];s.done=!s.done}
else if(a==='sx'){day(cur).sets[e].splice(+v,1)}
else if(a==='fin'){const dd=day(cur);dd.fin=!dd.fin;if(dd.fin&&!dd.st)dd.st=Date.now()}
else if(a==='fa'){const n=$('#fn').value.trim();if(!n){alert('Enter a food name');return}addFood({name:n,serv:$('#fv').value||'1 serving',cal:N($('#fc').value),p:N($('#fp').value),c:N($('#fcb').value),f:N($('#ff').value),meal:$('#fm').value})}
else if(a==='ffav'){const n=$('#fn').value.trim();if(n){S.fav=S.fav||[];S.fav.push([n,$('#fv').value||'1 serving',N($('#fc').value),N($('#fp').value),N($('#fcb').value),N($('#ff').value)])}}
else if(a==='fx'){S.f=S.f.filter(x=>x.id!=v)}
else if(a==='fd'){const x=ff(v);if(x)addFood(Object.assign({},x,{id:undefined,date:x.date}))}
else if(a==='fe'){const x=ff(v);if(x){const c=N(prompt('Calories',x.cal),x.cal),p=N(prompt('Protein g',x.p),x.p);x.cal=c;x.p=p}}
else if(a==='tpl'){const t=TPL[+v];t[2].forEach(([i,q])=>{const f=FD[i];addFood({name:f[0],serv:q+' × '+f[1],cal:f[2]*q,p:f[3]*q,c:f[4]*q,f:f[5]*q,meal:t[1]})})}
else if(a==='usetdee'){S.set.mt=+v}
else if(a==='exp'){const u=URL.createObjectURL(new Blob([JSON.stringify(S)],{type:'application/json'})),l=document.createElement('a');l.href=u;l.download='fitness-data.json';l.click();r=false}
else if(a==='t'){tStart(+v);r=false}
else if(a==='tp'){if(tRun){tLeft=Math.max(0,Math.ceil((tEnd-Date.now())/1000));tRun=false;b.textContent='Resume'}else if(tLeft>0){tStart(tLeft);b.textContent='Pause'}r=false}
else if(a==='t30'){if(tRun)tEnd+=30000;else tLeft+=30;tick();r=false}
else if(a==='tr'){tRun=false;tLeft=0;tick();r=false}
else if(a==='tc'){const x=N(prompt('Seconds'));if(x>0)tStart(x);r=false}
else r=false;
if(r){save();render()}});
document.addEventListener('change',ev=>{const t=ev.target,c=t.dataset.c;if(!c)return;let r=true;
if(c==='date'){if(t.value)cur=t.value}
else if(c==='wu'){day(cur).warm[t.dataset.i]=t.checked}
else if(c==='set'){const s=day(cur).sets[t.dataset.e][+t.dataset.i];s[t.dataset.f]=t.value;if(!s.done&&s.w!==''&&s.r!=='')s.done=false}
else if(c==='note'){const d=day(cur);(d.notes=d.notes||{})[t.dataset.e]=t.value;r=false}
else if(c==='set0'){const x=N(t.value,NaN);if(isFinite(x))S.set[t.dataset.f]=x}
else if(c==='fs'){const v=t.value;let f=v===''?null:v[0]==='f'?S.fav[+v.slice(1)]:FD[+v];if(f){$('#fn').value=f[0];$('#fv').value=f[1];$('#fc').value=f[2];$('#fp').value=f[3];$('#fcb').value=f[4];$('#ff').value=f[5]}r=false}
else r=false;
save();if(r)render()});
render();tick();
