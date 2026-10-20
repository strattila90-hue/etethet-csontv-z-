(() => {
 const installBtn=document.getElementById("installAppBtn");
 let deferredPrompt=null;
 const installed=()=>window.matchMedia("(display-mode: standalone)").matches||window.navigator.standalone===true;
 function update(){if(!installBtn)return;if(installed()){installBtn.querySelector?.("b")?.replaceChildren(document.createTextNode("Már telepítve"));installBtn.title="Az alkalmazás már telepítve van."}}
 window.addEventListener("beforeinstallprompt",e=>{e.preventDefault();deferredPrompt=e;});
 window.addEventListener("appinstalled",()=>{deferredPrompt=null;update();});
 async function install(){
  if(installed()){alert("Az alkalmazás már telepítve van ezen az eszközön.");return;}
  if(deferredPrompt){deferredPrompt.prompt();await deferredPrompt.userChoice;deferredPrompt=null;return;}
  const ios=/iphone|ipad|ipod/i.test(navigator.userAgent);
  alert(ios?"iPhone/iPad: Safariban nyisd meg a Megosztás menüt, majd válaszd a Hozzáadás a Főképernyőhöz lehetőséget.":"Androidon Chrome-ban nyisd meg a ⋮ menüt, majd válaszd az Alkalmazás telepítése vagy Hozzáadás a kezdőképernyőhöz lehetőséget. Ehhez HTTPS-webcím szükséges.");
 }
 document.addEventListener("show-install-help",install);
 if("serviceWorker" in navigator&&/^https?:$/.test(location.protocol))window.addEventListener("load",()=>navigator.serviceWorker.register("./sw.js").catch(e=>console.warn("Service Worker hiba",e)));
 update();
})();
