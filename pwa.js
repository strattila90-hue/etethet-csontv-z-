(() => {
  let deferredPrompt = null;
  const isInstalled = () => window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true;
  window.addEventListener("beforeinstallprompt", event => {
    event.preventDefault();
    deferredPrompt = event;
    document.documentElement.classList.add("install-prompt-available");
  });
  window.addEventListener("appinstalled", () => {
    deferredPrompt = null;
    alert("Az Etethető Csontváz telepítése sikerült!");
  });
  async function installHelp() {
    if (isInstalled()) {
      alert("Az alkalmazás már telepítve van ezen az eszközön.");
      return;
    }
    if (deferredPrompt) {
      deferredPrompt.prompt();
      await deferredPrompt.userChoice;
      deferredPrompt = null;
      return;
    }
    const ios = /iphone|ipad|ipod/i.test(navigator.userAgent);
    alert(ios
      ? "iPhone/iPad: nyisd meg Safariban, koppints a Megosztás gombra, majd válaszd a Hozzáadás a Főképernyőhöz lehetőséget."
      : "A Chrome most nem ajánlotta fel a közvetlen telepítést. Ellenőrizd, hogy a webcím HTTPS-es, a manifest és az ikonok betöltődnek, majd frissítsd az oldalt. Ezután Chrome ⋮ menü → Alkalmazás telepítése vagy Hozzáadás a kezdőképernyőhöz. Ha csak parancsikon létrehozását kínálja fel, a böngésző jelenleg nem tekinti telepíthető PWA-nak az oldalt.");
  }
  document.addEventListener("show-install-help", installHelp);
  document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("installAppBtn");
    if (btn) btn.addEventListener("click", installHelp);
  });
  if ("serviceWorker" in navigator && /^https?:$/.test(location.protocol)) {
    window.addEventListener("load", async () => {
      try {
        const reg = await navigator.serviceWorker.register("./sw.js", {updateViaCache:"none"});
        reg.update().catch(() => {});
      } catch (error) { console.warn("Service Worker regisztráció sikertelen:", error); }
    });
  }
})();
