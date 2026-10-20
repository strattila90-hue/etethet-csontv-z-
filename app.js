const stages = [
 {name:"Szájüreg",short:"A fogak aprítják az ételt, a nyál pedig nedvesíti és megkezdi a keményítő bontását.",detail:"A rágás kisebb darabokra aprítja az ételt. A nyál segíti a falat formálását; a nyál amiláz enzime megkezdi a keményítő emésztését.",emoji:"👄",color:"#229cff",organ:"mouth"},
 {name:"Nyelőcső",short:"A falat izommozgásokkal halad a gyomor felé.",detail:"A nyelőcső perisztaltikus izommozgásokkal továbbítja a falatot. Nem egyszerűen a gravitáció húzza lefelé az ételt.",emoji:"〰️",color:"#ff4d61",organ:"esophagus"},
 {name:"Gyomor",short:"A gyomornedv és az izmok összekeverik, tovább bontják az ételt.",detail:"A gyomor savas közege és emésztőenzimei — köztük a pepszin — segítik főként a fehérjék bontását. Az étel pépes keverékké alakul.",emoji:"🫃",color:"#ff7d2d",organ:"stomach"},
 {name:"Vékonybél",short:"A tápanyagok nagy része itt szívódik fel a szervezetbe.",detail:"Az emésztőenzimek tovább bontják a tápanyagokat. A vékonybél bolyhai és mikrobolyhai nagy felszívófelületet biztosítanak.",emoji:"🌀",color:"#10c96b",organ:"smallIntestine"},
 {name:"Vastagbél",short:"Víz és sók szívódnak vissza, a béltartalom formálódik.",detail:"A vastagbélben víz és elektrolitok szívódnak vissza. A bélmikrobák is szerepet játszanak egyes anyagok feldolgozásában.",emoji:"🧬",color:"#9b59ff",organ:"largeIntestine"}
];
const foods=[
 {id:"apple",name:"Alma",emoji:"🍎",note:"Rostot és természetes cukrokat tartalmaz."},
 {id:"banana",name:"Banán",emoji:"🍌",note:"Szénhidrátot és rostot is tartalmaz."},
 {id:"bread",name:"Kenyér",emoji:"🍞",note:"Keményítőben gazdag élelmiszer."},
 {id:"carrot",name:"Répa",emoji:"🥕",note:"Rostot és béta-karotint tartalmaz."},
 {id:"meat",name:"Hús",emoji:"🥩",note:"Fehérjét és zsírt tartalmazhat."},
 {id:"water",name:"Víz",emoji:"🥛",note:"Nem kell megemészteni; a szervezet felszívja."},
 {id:"cookie",name:"Keksz",emoji:"🍪",note:"Szénhidrátot és a recepttől függően zsírt tartalmaz."},
 {id:"pizza",name:"Pizza",emoji:"🍕",note:"Többféle tápanyag keveréke."}
];
const organs={
 mouth:{title:"Szájüreg",text:stages[0].detail,extra:"Kulcsszavak: rágás · nyál · falatképzés"},
 esophagus:{title:"Nyelőcső",text:stages[1].detail,extra:"Kulcsszó: perisztaltika — hullámszerű izommozgás."},
 stomach:{title:"Gyomor",text:stages[2].detail,extra:"A gyomor nyálkahártyáját védő nyákréteg óvja a savas közegtől."},
 smallIntestine:{title:"Vékonybél",text:stages[3].detail,extra:"A tápanyagok a bélfalon keresztül jutnak a vérbe vagy a nyirokrendszerbe."},
 largeIntestine:{title:"Vastagbél",text:stages[4].detail,extra:"Fontos feladata a víz és elektrolitok visszaszívása."}
};
const facts=[
"A gyomor falát nyálkaréteg védi a savas gyomornedvtől.",
"A vékonybél bélbolyhai jelentősen növelik a felszívófelületet.",
"A nyelőcső izommozgása akkor is továbbíthatja a falatot, ha nem álló helyzetben vagy.",
"A máj epét termel, amely segíti a zsírok emésztését.",
"A víz nem igényel emésztést: a szervezet közvetlenül képes felszívni.",
"Az emésztés több szerv összehangolt munkájával történik."
];
const quiz=[
 {q:"Hol kezdődik az emésztés?",a:["A gyomorban","A szájüregben","A vastagbélben"],correct:1,why:"A rágás és a nyál már a szájüregben elindítja az emésztést."},
 {q:"Hol szívódik fel a tápanyagok nagy része?",a:["Vékonybélben","Nyelőcsőben","Szájüregben"],correct:0,why:"A vékonybél nagy felszívófelületével a tápanyagok nagy részét felveszi."},
 {q:"Mi továbbítja a falatot a nyelőcsőben?",a:["Csak a gravitáció","Perisztaltikus izommozgás","A tüdő"],correct:1,why:"A nyelőcső hullámszerű izommozgásai továbbítják a falatot."},
 {q:"Mi a vastagbél egyik fontos feladata?",a:["Oxigén előállítása","Víz visszaszívása","Vér pumpálása"],correct:1,why:"A vastagbél vizet és elektrolitokat szív vissza."},
 {q:"Mi védi a gyomor falát a savas közegtől?",a:["Védő nyákréteg","A fogzománc","A bordák"],correct:0,why:"A gyomornyálkahártya védőrétege segít megóvni a szöveteket."}
];
const $=s=>document.querySelector(s);
let selectedFood=foods[0],currentStage=-1,factIndex=0,running=false,labelsVisible=true,feedTimer=null,quizIndex=0,quizScore=0,quizAnswered=false;
const foodGrid=$("#foodGrid"),stageList=$("#stageList"),particle=$("#foodParticle");
function renderFoods(){foodGrid.innerHTML="";foods.forEach(food=>{const b=document.createElement("button");b.className="food-btn"+(food.id===selectedFood.id?" selected":"");b.innerHTML=`<span class="food-emoji">${food.emoji}</span><span>${food.name}</span>`;b.setAttribute("aria-pressed",food.id===selectedFood.id?"true":"false");b.addEventListener("click",()=>{if(running)return;selectedFood=food;renderFoods();$("#statusTitle").textContent=`Kiválasztva: ${food.name}`;$("#statusText").textContent=food.note;particle.textContent=food.emoji;});foodGrid.appendChild(b);});}
function renderStages(){stageList.innerHTML="";stages.forEach((s,i)=>{const b=document.createElement("button");b.className="stage-item"+(i===currentStage?" active":"");b.innerHTML=`<span class="stage-number" style="--stage-color:${s.color}">${i+1}</span><span><strong>${s.name}</strong><small>${s.short}</small></span>`;b.addEventListener("click",()=>showStage(i,true));stageList.appendChild(b);});}
function showStage(i,animate=true){currentStage=i;const s=stages[i];$("#statusTitle").textContent=s.name;$("#statusText").textContent=s.detail;$("#stageCounter").textContent=`${i+1} / 5. szakasz`;$("#currentStageTitle").textContent=s.name;$("#currentStageText").textContent=s.detail;$("#stageIllustration").textContent=s.emoji;$("#progressBar").style.width=`${(i+1)*20}%`;$("#rightProgress").style.width=`${(i+1)*20}%`;$("#rightCounter").textContent=`${i+1} / 5`;renderStages();document.querySelectorAll(".organ").forEach(el=>el.classList.toggle("organ-active",el.dataset.organ===s.organ));if(animate){const positions=[13,24,38,53,65];particle.hidden=false;particle.style.top=positions[i]+"%";particle.style.left="48%";}}
function startFeed(){if(running)return;running=true;$("#startFeed").disabled=true;$("#startFeed").textContent="⏳ Folyamatban…";particle.textContent=selectedFood.emoji;particle.hidden=false;let i=0;showStage(0);feedTimer=setInterval(()=>{i++;if(i>=stages.length){clearInterval(feedTimer);feedTimer=null;running=false;$("#startFeed").disabled=false;$("#startFeed").textContent="▶ Etetés indítása";$("#statusTitle").textContent="Szimuláció befejezve";$("#statusText").textContent=`A szemléltető út végére értünk. A valós emésztés időtartama változó. ${selectedFood.name}: ${selectedFood.note}`;return;}showStage(i);},2500);}
function resetFeed(){if(feedTimer)clearInterval(feedTimer);feedTimer=null;running=false;currentStage=-1;particle.hidden=true;$("#startFeed").disabled=false;$("#startFeed").textContent="▶ Etetés indítása";$("#statusTitle").textContent="Készen állunk";$("#statusText").textContent="Válassz egy ételt a kezdéshez!";$("#stageCounter").textContent="0 / 5. szakasz";$("#progressBar").style.width="0";$("#rightProgress").style.width="0";$("#rightCounter").textContent="0 / 5";$("#currentStageTitle").textContent="Kezdjük az elején!";$("#currentStageText").textContent="Az emésztés a szájüregben kezdődik.";$("#stageIllustration").textContent="🍽️";renderStages();}
function showOrgan(key){const o=organs[key];if(!o)return;const d=document.createElement("dialog");d.className="share-dialog";d.innerHTML=`<button class="share-close" aria-label="Bezárás">×</button><p class="eyebrow">SZERVISMERTETŐ</p><h2>${o.title}</h2><p>${o.text}</p><p><b>${o.extra}</b></p>`;document.body.appendChild(d);d.querySelector("button").addEventListener("click",()=>{d.close();d.remove();});d.addEventListener("click",e=>{if(e.target===d){d.close();d.remove();}});d.showModal();}
function toast(message){const t=document.createElement("div");t.className="toast";t.textContent=message;document.body.appendChild(t);setTimeout(()=>t.remove(),2600);}
function showHome(){if(feedTimer)clearInterval(feedTimer);running=false;$("#gameScreen").hidden=true;$("#homeScreen").hidden=false;window.scrollTo({top:0,behavior:"smooth"});}
function showGame(){$("#homeScreen").hidden=true;$("#gameScreen").hidden=false;window.scrollTo({top:0,behavior:"smooth"});}
function openShare(){const url=window.location.href.split("#")[0];const input=$("#shareUrl"),qr=$("#shareQr"),fallback=$("#qrFallback");input.value=url;qr.hidden=false;fallback.hidden=true;qr.src="https://api.qrserver.com/v1/create-qr-code/?size=240x240&margin=12&data="+encodeURIComponent(url);qr.onerror=()=>{qr.hidden=true;fallback.hidden=false;};$("#shareDialog").showModal();}
function openQuiz(){quizIndex=0;quizScore=0;quizAnswered=false;renderQuiz();$("#quizDialog").showModal();}
function renderQuiz(){const q=quiz[quizIndex];$("#quizTitle").textContent=`Mini kvíz · ${quizIndex+1}/${quiz.length}`;$("#quizQuestion").textContent=q.q;$("#quizFeedback").textContent="";$("#nextQuestion").hidden=true;$("#quizAnswers").innerHTML="";q.a.forEach((answer,i)=>{const b=document.createElement("button");b.className="quiz-answer";b.textContent=answer;b.addEventListener("click",()=>{if(quizAnswered)return;quizAnswered=true;const correct=i===q.correct;b.classList.add(correct?"correct":"wrong");if(correct)quizScore++;[...$("#quizAnswers").children].forEach((x,j)=>{if(j===q.correct)x.classList.add("correct");x.disabled=true;});$("#quizFeedback").textContent=(correct?"Helyes! ":"Most nem ez a jó válasz. ")+q.why;$("#nextQuestion").hidden=false;$("#nextQuestion").textContent=quizIndex===quiz.length-1?"Eredmény megtekintése":"Következő kérdés →";});$("#quizAnswers").appendChild(b);});}
document.querySelectorAll("[data-organ]").forEach(el=>el.addEventListener("click",()=>showOrgan(el.dataset.organ)));
$("#startFeed").addEventListener("click",startFeed);$("#resetFeed").addEventListener("click",resetFeed);
$("#nextFact").addEventListener("click",()=>{factIndex=(factIndex+1)%facts.length;$("#factText").textContent=facts[factIndex];});
$("#labelsToggle").addEventListener("click",()=>{labelsVisible=!labelsVisible;$("#bodyModel").classList.toggle("hidden-labels",!labelsVisible);$("#labelsToggle").textContent=labelsVisible?"Feliratok elrejtése":"Feliratok megjelenítése";});
document.querySelectorAll(".system-btn").forEach(b=>b.addEventListener("click",()=>{document.querySelectorAll(".system-btn").forEach(x=>x.classList.remove("selected"));b.classList.add("selected");if(b.dataset.system!=="digestive")toast("A további szervrendszerek részletes modellje a következő fejlesztési fázisban bővül.");else toast("Emésztőrendszer kiválasztva.");}));
$("#playGameBtn").addEventListener("click",showGame);$("#backHomeBtn").addEventListener("click",showHome);$("#brandHome").addEventListener("click",e=>{e.preventDefault();showHome();});
document.querySelectorAll("[data-open]").forEach(b=>b.addEventListener("click",()=>{const view=b.dataset.open;if(view==="game"||view==="explore"){showGame();if(view==="explore")setTimeout(()=>$("#bodyModel").scrollIntoView({behavior:"smooth",block:"center"}),100);}else if(view==="quiz")openQuiz();else if(view==="facts"){factIndex=(factIndex+1)%facts.length;$("#aboutDialog").showModal();$("#aboutDialog").querySelector("h2").textContent="Tudtad?";$("#aboutDialog").querySelectorAll("p")[1].textContent=facts[factIndex];}}));
["shareAppBtn","homeShareBtn","gameShareBtn","settingsShareBtn"].forEach(id=>$("#"+id)?.addEventListener("click",()=>{if($("#settingsDialog").open)$("#settingsDialog").close();openShare();}));
$("#closeShareDialog").addEventListener("click",()=>$("#shareDialog").close());
$("#copyShareUrl").addEventListener("click",async()=>{try{await navigator.clipboard.writeText($("#shareUrl").value);toast("A hivatkozás a vágólapra került.");}catch{$("#shareUrl").focus();$("#shareUrl").select();toast("Jelöld ki és másold ki a hivatkozást.");}});
$("#nativeShareUrl").addEventListener("click",async()=>{const url=$("#shareUrl").value;if(navigator.share){try{await navigator.share({title:"Etethető Csontváz — Anatomy Lab",text:"Próbáld ki ezt az interaktív anatómiai játékot!",url});}catch(e){if(e.name!=="AbortError")toast("A megosztás nem sikerült.");}}else $("#copyShareUrl").click();});
$("#settingsBtn").addEventListener("click",()=>$("#settingsDialog").showModal());$("#closeSettings").addEventListener("click",()=>$("#settingsDialog").close());
$("#installAppBtn").addEventListener("click",()=>document.dispatchEvent(new CustomEvent("show-install-help")));$("#settingsInstallBtn").addEventListener("click",()=>document.dispatchEvent(new CustomEvent("show-install-help")));
$("#aboutBtn").addEventListener("click",()=>$("#aboutDialog").showModal());$("#closeAbout").addEventListener("click",()=>$("#aboutDialog").close());
$("#closeQuiz").addEventListener("click",()=>$("#quizDialog").close());$("#nextQuestion").addEventListener("click",()=>{if(quizIndex<quiz.length-1){quizIndex++;quizAnswered=false;renderQuiz();}else{$("#quizTitle").textContent="Kvíz eredménye";$("#quizQuestion").textContent=`${quiz.length} kérdésből ${quizScore} helyes válasz. ${quizScore===quiz.length?"Tökéletes eredmény!":"Próbáld újra, és gyűjts több pontot!"}`;$("#quizAnswers").innerHTML="";$("#quizFeedback").textContent="";$("#nextQuestion").textContent="Újrapróbálom";$("#nextQuestion").onclick=()=>{ $("#quizDialog").close();openQuiz();};}});
renderFoods();renderStages();
