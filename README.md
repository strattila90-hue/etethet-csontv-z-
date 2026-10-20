# Etethető Csontváz — Anatomy Lab

Magyar nyelvű, mobilbarát oktatási webapp prototípus, új GitHub-repóhoz és Vercelhez előkészítve.

## Futtatás
A projekt statikus weboldal, nincs szükség build parancsra vagy csomagtelepítésre. Nyisd meg az `index.html` fájlt, vagy futtass helyi statikus webszervert. A Service Worker csak HTTP(S) környezetben regisztrál.

## Vercel
- Framework Preset: **Other**
- Build Command: üres
- Output Directory: `.`
- Install Command: üres

## Fájlok
- `index.html` — képernyőszerkezet
- `styles.css` — reszponzív sötétkék felület
- `app.js` — etetés, szakaszok, szervismertetők, érdekességek
- `data.json` — adatvezérelt tartalom kiindulópontja
- `manifest.webmanifest` — PWA-metaadatok
- `sw.js` — statikus erőforrások gyorsítótárazása

## Állapot és fontos korlátok
Ez **0.1.0 prototípus**, nem végleges kiadás. A csontváz és szervek most CSS-alapú szemléltető illusztrációk, nem anatómiai pontosságú 3D modell. A navigáció, kvíz és további szervrendszerek egy része jelenleg jelzés/placeholder. A következő fázisban ezeket a célzott látványtervhez kell finomítani, és a böngészőkben tesztelni.

## Következő fejlesztési ellenőrzőlista
- [ ] Részletes, rétegezett anatómiai SVG vagy megfelelő licencű illusztráció
- [ ] Kvíz tényleges kérdésbankkal, pontozással és újrapróbálással
- [ ] Minden menüpont valós funkcióval
- [ ] A teljes emésztési animáció mobilon és asztali böngészőben tesztelve
- [ ] Offline indulás és frissítési stratégia ellenőrzése
- [ ] Akadálymentesség: billentyűzet, fókusz, kontraszt, ARIA
- [ ] Biológiai tartalom szakmai ellenőrzése
- [ ] GitHub és Vercel telepítés tényleges ellenőrzése
