const cards=[
{id:'bedroom',title:'Bedroom',cat:'Place',desc:'Private calm place for a soft start.',icon:'BED',tags:['home','private']},
{id:'living-room',title:'Living Room',cat:'Place',desc:'Casual home setting with a relaxed mood.',icon:'SOFA',tags:['home','casual']},
{id:'kitchen',title:'Kitchen',cat:'Place',desc:'Playful home setting with food, drinks and humor.',icon:'WINE',tags:['home','playful']},
{id:'balcony',title:'Balcony',cat:'Place',desc:'Open air, soft light and close conversation.',icon:'MOON',tags:['home','night']},
{id:'hotel',title:'Hotel Room',cat:'Place',desc:'A break from routine with a premium vacation feeling.',icon:'HOTEL',tags:['travel','premium']},
{id:'spa',title:'Couples Spa',cat:'Place',desc:'Robes, quiet music, warm light and calm energy.',icon:'SPA',tags:['relax','date']},
{id:'beach',title:'Beach Sunset',cat:'Place',desc:'Sunset, blanket, wind and a romantic mood.',icon:'SUN',tags:['outdoor','romantic']},
{id:'romantic',title:'Romantic',cat:'Mood',desc:'Soft words, calm music and warm eye contact.',icon:'HEART',tags:['soft','couple']},
{id:'luxury',title:'Luxury',cat:'Mood',desc:'Elegant outfit, warm light and premium feeling.',icon:'GOLD',tags:['premium','elegant']},
{id:'mystery',title:'Mystery',cat:'Mood',desc:'Low light, hints and a private secret feeling.',icon:'CANDLE',tags:['night','secret']},
{id:'playful',title:'Playful',cat:'Mood',desc:'Less pressure, more humor, flow and lightness.',icon:'SMILE',tags:['fun','easy']},
{id:'cards',title:'Couples Cards',cat:'Tool',desc:'Questions and small missions for opening a conversation.',icon:'CARD',tags:['game','talk']},
{id:'dice',title:'Choice Dice',cat:'Tool',desc:'Random choice of place, mood or role.',icon:'DICE',tags:['random','game']},
{id:'candles',title:'Candles',cat:'Tool',desc:'Warm light and softer atmosphere.',icon:'FIRE',tags:['light','warm']},
{id:'music',title:'Playlist',cat:'Tool',desc:'Music that supports the selected mood.',icon:'MUSIC',tags:['sound','mood']},
{id:'compliments',title:'Compliments',cat:'Talk',desc:'Say what feels good and attractive without guessing.',icon:'TALK',tags:['soft','clear']},
{id:'direct',title:'Clear Talk',cat:'Talk',desc:'Say what you want and what you do not want clearly.',icon:'AIM',tags:['boundaries','clear']}
];
let index=0;
let answers=JSON.parse(localStorage.getItem('secretMatchAnswers')||'{}');
const screens={home:document.getElementById('screen-home'),game:document.getElementById('screen-game'),results:document.getElementById('screen-results')};
function show(name){Object.values(screens).forEach(s=>s.classList.remove('active'));screens[name].classList.add('active');document.querySelectorAll('.nav').forEach(b=>b.classList.toggle('active',b.dataset.screen===name));if(name==='game')renderCard();if(name==='results')renderResults();}
function renderCard(){const stage=document.getElementById('cardStage');if(index>=cards.length){show('results');return;}const c=cards[index];document.getElementById('progressText').textContent=(index+1)+' / '+cards.length;document.getElementById('progressFill').style.width=Math.round((index/cards.length)*100)+'%';stage.innerHTML='<article class="play-card"><div><div class="ill">'+c.icon+'</div><div class="meta">'+c.cat+'</div><h2 class="card-title">'+c.title+'</h2><p class="desc">'+c.desc+'</p><div class="tags">'+c.tags.map(t=>'<span class="tag">'+t+'</span>').join('')+'</div></div><div class="choices"><button class="choice choose-yes" onclick="answer(\''+c.id+'\',\'yes\')">Yes</button><button class="choice choose-maybe" onclick="answer(\''+c.id+'\',\'maybe\')">Maybe</button><button class="choice choose-stop" onclick="answer(\''+c.id+'\',\'skip\')">No</button></div></article>';}
function answer(id,val){answers[id]=val;localStorage.setItem('secretMatchAnswers',JSON.stringify(answers));index++;renderCard();}
function score(val){if(val==='yes')return 100;if(val==='maybe')return 50;return 0;}
function renderResults(){const list=document.getElementById('resultsList');const rows=cards.map(c=>({...c,score:score(answers[c.id])})).filter(c=>c.score>0).sort((a,b)=>b.score-a.score);document.getElementById('matchSummary').textContent=rows.length+' matches';list.innerHTML=rows.length?rows.map(x=>'<div class="result-item"><div><strong>'+x.icon+' '+x.title+'</strong><br><span class="meta">'+x.cat+'</span></div><div class="score">'+x.score+'%</div></div>').join(''):'<div class="empty">No matches yet.</div>';}
document.getElementById('startBtn').onclick=function(){index=0;show('game')};
document.getElementById('resetBtn').onclick=function(){answers={};localStorage.removeItem('secretMatchAnswers');index=0;show('home')};
document.getElementById('backBtn').onclick=function(){show('home')};
document.getElementById('againBtn').onclick=function(){index=0;show('game')};
document.querySelectorAll('.nav').forEach(b=>b.onclick=function(){show(b.dataset.screen)});
