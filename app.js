const cards=[
{id:'bedroom',title:'חדר שינה',cat:'מקום',desc:'מקום פרטי, רגוע ונוח להתחלה.',icon:'חדר',tags:['בית','פרטיות']},
{id:'living',title:'סלון',cat:'מקום',desc:'אווירה ביתית, קלילה וספונטנית.',icon:'סלון',tags:['בית','קליל']},
{id:'kitchen',title:'מטבח',cat:'מקום',desc:'מקום ביתי עם משחקיות, אוכל ויין.',icon:'מטבח',tags:['בית','משחק']},
{id:'balcony',title:'מרפסת',cat:'מקום',desc:'אוויר פתוח, תאורה רכה ושיחה קרובה.',icon:'מרפסת',tags:['ערב','שקט']},
{id:'hotel',title:'מלון',cat:'מקום',desc:'יציאה מהשגרה ואווירה של חופשה.',icon:'מלון',tags:['חופשה','יוקרתי']},
{id:'spa',title:'ספא זוגי',cat:'מקום',desc:'חלוקים, מוזיקה שקטה, אור חם ורוגע.',icon:'ספא',tags:['פינוק','רגוע']},
{id:'beach',title:'חוף ים',cat:'מקום',desc:'שקיעה, שמיכה, רוח ואווירה רומנטית.',icon:'חוף',tags:['חוץ','רומנטי']},
{id:'romantic',title:'רומנטית',cat:'אווירה',desc:'שקט, מבטים, מחמאות ומוזיקה נעימה.',icon:'לב',tags:['עדין','זוגי']},
{id:'luxury',title:'יוקרתית',cat:'אווירה',desc:'לבוש אלגנטי, תאורה חמה ותחושה פרימיום.',icon:'זהב',tags:['יוקרתי','אלגנטי']},
{id:'mystery',title:'מסתורית',cat:'אווירה',desc:'מעט אור, רמזים ותחושת סוד פרטי.',icon:'נר',tags:['ערב','סוד']},
{id:'playful',title:'קלילה',cat:'אווירה',desc:'פחות לחץ, יותר צחוק, משחק וזרימה.',icon:'חיוך',tags:['כיף','קליל']},
{id:'cards',title:'קלפי זוגיות',cat:'אביזר',desc:'שאלות ומשימות קטנות לפתיחת שיחה.',icon:'קלפים',tags:['שיחה','משחק']},
{id:'dice',title:'קוביות בחירה',cat:'אביזר',desc:'בחירה אקראית של מקום, אווירה או תפקיד.',icon:'קוביות',tags:['אקראי','משחק']},
{id:'candles',title:'נרות',cat:'אביזר',desc:'תאורה חמה ואווירה רכה.',icon:'נרות',tags:['תאורה','רומנטי']},
{id:'music',title:'פלייליסט',cat:'אביזר',desc:'מוזיקה שמתאימה לאווירה שבחרתם.',icon:'מוזיקה',tags:['קצב','אווירה']},
{id:'compliments',title:'מחמאות',cat:'תקשורת',desc:'להגיד מה נעים, יפה ומושך בלי מבוכה.',icon:'דיבור',tags:['עדין','ברור']},
{id:'direct',title:'דיבור ברור',cat:'תקשורת',desc:'להגיד מה רוצים ומה לא, בלי לנחש.',icon:'ברור',tags:['גבולות','כנות']}
];
let index=0;
let answers=JSON.parse(localStorage.getItem('secretMatchAnswers')||'{}');
const screens={home:document.getElementById('screen-home'),game:document.getElementById('screen-game'),results:document.getElementById('screen-results')};
function show(name){Object.values(screens).forEach(s=>s.classList.remove('active'));screens[name].classList.add('active');document.querySelectorAll('.nav').forEach(b=>b.classList.toggle('active',b.dataset.screen===name));if(name==='game')renderCard();if(name==='results')renderResults();}
function renderCard(){const stage=document.getElementById('cardStage');if(index>=cards.length){show('results');return;}const c=cards[index];document.getElementById('progressText').textContent=(index+1)+' / '+cards.length;document.getElementById('progressFill').style.width=Math.round((index/cards.length)*100)+'%';stage.innerHTML='<article class="play-card"><div><div class="ill">'+c.icon+'</div><div class="meta">'+c.cat+'</div><h2 class="card-title">'+c.title+'</h2><p class="desc">'+c.desc+'</p><div class="tags">'+c.tags.map(t=>'<span class="tag">'+t+'</span>').join('')+'</div></div><div class="choices"><button class="choice choose-yes" onclick="answer(\''+c.id+'\',\'yes\')">רוצה</button><button class="choice choose-maybe" onclick="answer(\''+c.id+'\',\'maybe\')">אולי</button><button class="choice choose-stop" onclick="answer(\''+c.id+'\',\'skip\')">לא</button></div></article>';}
function answer(id,val){answers[id]=val;localStorage.setItem('secretMatchAnswers',JSON.stringify(answers));index++;renderCard();}
function score(val){if(val==='yes')return 100;if(val==='maybe')return 50;return 0;}
function renderResults(){const list=document.getElementById('resultsList');const rows=cards.map(c=>({...c,score:score(answers[c.id])})).filter(c=>c.score>0).sort((a,b)=>b.score-a.score);document.getElementById('matchSummary').textContent=rows.length+' התאמות';list.innerHTML=rows.length?rows.map(x=>'<div class="result-item"><div><strong>'+x.icon+' '+x.title+'</strong><br><span class="meta">'+x.cat+'</span></div><div class="score">'+x.score+'%</div></div>').join(''):'<div class="empty">אין עדיין התאמות. חזור למשחק וסמן כרטיסים.</div>';}
document.getElementById('startBtn').onclick=function(){index=0;show('game')};
document.getElementById('resetBtn').onclick=function(){answers={};localStorage.removeItem('secretMatchAnswers');index=0;show('home')};
document.getElementById('backBtn').onclick=function(){show('home')};
document.getElementById('againBtn').onclick=function(){index=0;show('game')};
document.querySelectorAll('.nav').forEach(b=>b.onclick=function(){show(b.dataset.screen)});
