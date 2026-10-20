const CACHE_NAME="etethető-csontvaz-v0.4.0";
const CORE=["./","./index.html","./styles.css","./pwa.css","./app.js","./pwa.js","./data.json","./manifest.webmanifest","./icons/icon-192.svg","./icons/icon-512.svg"];
self.addEventListener("install",e=>e.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting())));
self.addEventListener("activate",e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener("fetch",e=>{if(e.request.method!=="GET"||new URL(e.request.url).origin!==self.location.origin)return;e.respondWith(caches.match(e.request).then(c=>c||fetch(e.request).then(r=>{if(r&&r.ok)caches.open(CACHE_NAME).then(cache=>cache.put(e.request,r.clone()));return r;}).catch(()=>caches.match("./index.html"))));});
