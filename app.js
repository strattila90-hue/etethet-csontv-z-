const stages = [
  {name:"Szájüreg", short:"A fogak aprítják az ételt, a nyál pedig nedvesíti, és megkezdi a keményítő bontását.", detail:"A rágás kisebb darabokra aprítja az ételt. A nyál segíti a falat formálását; a nyál amiláz enzime megkezdi a keményítő emésztését.", emoji:"👄", color:"#229cff", organ:"mouth"},
  {name:"Nyelőcső", short:"A falat izommozgásokkal halad a gyomor felé.", detail:"A nyelőcső perisztaltikus izommozgásokkal továbbítja a falatot. Nem egyszerűen a gravitáció húzza lefelé az ételt.", emoji:"〰️", color:"#ff4d61", organ:"esophagus"},
  {name:"Gyomor", short:"A gyomornedv és az izmok összekeverik, tovább bontják az ételt.", detail:"A gyomor savas közege és emésztőenzimei — köztük a pepszin — segítik főként a fehérjék bontását. Az étel pépes keverékké alakul.", emoji:"🫃", color:"#ff7d2d", organ:"stomach"},
  {name:"Vékonybél", short:"A tápanyagok nagy része itt szívódik fel a szervezetbe.", detail:"Az emésztőenzimek tovább bontják a tápanyagokat. A vékonybél bolyhai és mikrobolyhai nagy felszívófelületet biztosítanak.", emoji:"🌀", color:"#10c96b", organ:"smallIntestine"},
  {name:"Vastagbél", short:"Víz és sók szívódnak vissza, a béltartalom formálódik.", detail:"A vastagbélben víz és elektrolitok szívódnak vissza. A bélmikrobák is szerepet játszanak egyes anyagok feldolgozásában, a maradékból pedig széklet képződik.", emoji:"🧬", color:"#9b59ff", organ:"largeIntestine"}
];
const foods = [
  {id:"apple",name:"Alma",emoji:"🍎",note:"Rostot és természetes cukrokat tartalmaz."},
  {id:"banana",name:"Banán",emoji:"🍌",note:"Szénhidrátot és rostot is tartalmaz."},
  {id:"bread",name:"Kenyér",emoji:"🍞",note:"Keményítőben gazdag élelmiszer."},
  {id:"carrot",name:"Répa",emoji:"🥕",note:"Rostot és béta-karotint tartalmaz."},
  {id:"meat",name:"Hús",emoji:"🥩",note:"Fehérjét és zsírt tartalmazhat."},
  {id:"water",name:"Víz",emoji:"🥛",note:"Nem kell megemészteni; felszívódik."},
  {id:"cookie",name:"Keksz",emoji:"🍪",note:"Szénhidrátot és a recepttől függően zsírt tartalmaz."},
  {id:"pizza",name:"Pizza",emoji:"🍕",note:"Többféle tápanyag keveréke."}
];
const organs = {
  mouth:{title:"Szájüreg",text:stages[0].detail,extra:"Kulcsszavak: rágás · nyál · falatképzés"},
  esophagus:{title:"Nyelőcső",text:stages[1].detail,extra:"Kulcsszó: perisztaltika — hullámszerű izommozgás."},
  stomach:{title:"Gyomor",text:stages[2].detail,extra:"A gyomor nyálkahártyáját védő nyákréteg óvja a savas közegtől."},
  smallIntestine:{title:"Vékonybél",text:stages[3].detail,extra:"A tápanyagok a bélfalon keresztül jutnak a vérbe vagy a nyirokrendszerbe."},
  largeIntestine:{title:"Vastagbél",text:stages[4].detail,extra:"Fontos feladata a víz és elektrolitok visszaszívása."}
};
const facts = [
 "A gyomor falát nyálkaréteg védi a savas gyomornedvtől.",
 "A vékonybél belső felszínén található bélbolyhok jelentősen növelik a felszívófelületet.",
 "A nyelőcső izommozgása akkor is továbbíthatja a falatot, ha nem álló helyzetben vagy.",
 "A máj epét termel, amely segíti a zsírok emésztését.",
 "A víz nem igényel emésztést: a szervezet közvetlenül képes felszívni.",
 "Az emésztés nem csak a gyomorban történik; több szerv összehangolt munkája."
];
let selectedFood = foods[0], currentStage = -1, factIndex = 0, running = false, labelsVisible = true, feedTimer = null;
const $ = s => document.querySelector(s);
const foodGrid=$("#foodGrid"), stageList=$("#stageList"), particle=$("#foodParticle");
function renderFoods(){foodGrid.innerHTML="";foods.forEach(food=>{const b=document.createElement("button");b.className="food-btn"+(food.id===selectedFood.id?" selected":"");b.innerHTML=`<span class="food-emoji">${food.emoji}</span><span>${food.name}</span>`;b.setAttribute("aria-pressed",food.id===selectedFood.id?"true":"false");b.addEventListener("click",()=>{if(running)return;selectedFood=food;renderFoods();$("#statusTitle").textContent=`Kiválasztva: ${food.name}`;$("#statusText").textContent=food.note;particle.textContent=food.emoji;});foodGrid.appendChild(b);});}
function renderStages(){stageList.innerHTML="";stages.forEach((s,i)=>{const b=document.createElement("button");b.className="stage-item"+(i===currentStage?" active":"");b.innerHTML=`<span class="stage-number" style="--stage-color:${s.color}">${i+1}</span><span><strong>${s.name}</strong><small>${s.short}</small></span>`;b.addEventListener("click",()=>showStage(i,false));stageList.appendChild(b);});}
function showStage(i,animate=true){currentStage=i;const s=stages[i];$("#statusTitle").textContent=s.name;$("#statusText").textContent=s.detail;$("#stageCounter").textContent=`${i+1} / 5. szakasz`;$("#currentStageTitle").textContent=s.name;$("#currentStageText").textContent=s.detail;$("#stageIllustration").textContent=s.emoji;$("#progressBar").style.width=`${(i+1)*20}%`;$("#rightProgress").style.width=`${(i+1)*20}%`;$("#rightCounter").textContent=`${i+1} / 5`;renderStages();document.querySelectorAll(".organ").forEach(el=>el.classList.toggle("organ-active",el.dataset.organ===s.organ));if(animate){const positions=[13,24,38,53,65];particle.hidden=false;particle.style.top=positions[i]+"%";particle.style.left=(i===0?48:i===1?49:i===2?48:i===3?46:48)+"%";}}
function startFeed(){if(running)return;running=true;$("#startFeed").disabled=true;$("#startFeed").textContent="⏳ Folyamatban…";particle.textContent=selectedFood.emoji;particle.hidden=false;let i=0;showStage(0);feedTimer=setInterval(()=>{i++;if(i>=stages.length){clearInterval(feedTimer);feedTimer=null;running=false;$("#startFeed").disabled=false;$("#startFeed").textContent="▶ Etetés indítása";$("#statusTitle").textContent="Szimuláció befejezve";$("#statusText").textContent=`A szemléltető út végére értünk. A valós emésztési folyamat időtartama ételtől és egyéntől függően változik. ${selectedFood.name}: ${selectedFood.note}`;return;}showStage(i);},2600);}
function resetFeed(){if(feedTimer)clearInterval(feedTimer);feedTimer=null;running=false;currentStage=-1;particle.hidden=true;$("#startFeed").disabled=false;$("#startFeed").textContent="▶ Etetés indítása";$("#statusTitle").textContent="Készen állunk";$("#statusText").textContent="Válassz egy ételt a kezdéshez!";$("#stageCounter").textContent="0 / 5. szakasz";$("#progressBar").style.width="0";$("#rightProgress").style.width="0";$("#rightCounter").textContent="0 / 5";$("#currentStageTitle").textContent="Kezdjük az elején!";$("#currentStageText").textContent="Az emésztés a szájüregben kezdődik.";$("#stageIllustration").textContent="🍽️";renderStages();}
function showOrgan(key){const o=organs[key];if(!o)return;$("#dialogTitle").textContent=o.title;$("#dialogText").textContent=o.text;$("#dialogExtra").textContent=o.extra;$("#infoDialog").showModal();}
function toast(message){const t=document.createElement("div");t.className="toast";t.textContent=message;document.body.appendChild(t);setTimeout(()=>t.remove(),2200);}
document.querySelectorAll("[data-organ]").forEach(el=>el.addEventListener("click",()=>showOrgan(el.dataset.organ)));
$("#startFeed").addEventListener("click",startFeed);$("#resetFeed").addEventListener("click",resetFeed);
$("#nextFact").addEventListener("click",()=>{factIndex=(factIndex+1)%facts.length;$("#factText").textContent=facts[factIndex];});
$("#labelsToggle").addEventListener("click",()=>{labelsVisible=!labelsVisible;$("#bodyModel").classList.toggle("hidden-labels",!labelsVisible);$("#labelsToggle").textContent=labelsVisible?"Feliratok elrejtése":"Feliratok megjelenítése";});
$("#closeDialog").addEventListener("click",()=>$("#infoDialog").close());$("#closeSettings").addEventListener("click",()=>$("#settingsDialog").close());$("#settingsBtn").addEventListener("click",()=>$("#settingsDialog").showModal());
document.querySelectorAll(".nav-btn").forEach(b=>b.addEventListener("click",()=>{document.querySelectorAll(".nav-btn").forEach(x=>x.classList.remove("active"));b.classList.add("active");const view=b.dataset.view;if(view==="feed")$("#feedPanel").scrollIntoView({behavior:"smooth",block:"center"});else if(view==="explore")$("#bodyModel").scrollIntoView({behavior:"smooth",block:"center"});else if(view==="quiz")toast("A kvíz a következő fejlesztési körben készül el.");else if(view==="facts"){$("#factText").textContent=facts[factIndex];$(".fact-card").scrollIntoView({behavior:"smooth",block:"center"});}else window.scrollTo({top:0,behavior:"smooth"});}));
document.querySelectorAll(".system-btn").forEach(b=>b.addEventListener("click",()=>{document.querySelectorAll(".system-btn").forEach(x=>x.classList.remove("selected"));b.classList.add("selected");const system=b.dataset.system;if(system!=="digestive")toast("Ez a szervrendszer a következő fejlesztési fázisban kap részletes modellt.");else toast("Emésztőrendszer kiválasztva.");}));
renderFoods();renderStages();
if("serviceWorker" in navigator && location.protocol.startsWith("http"))window.addEventListener("load",()=>navigator.serviceWorker.register("./sw.js").catch(()=>{}));
