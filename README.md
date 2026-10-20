# Etethető Csontváz — Anatomy Lab

**Verzió:** 0.2.0 · **Nyelv:** magyar · **Típus:** statikus webalkalmazás / PWA-alap

## Mit tartalmaz?
- Reszponzív, sötétkék kezelőfelület a megadott látványterv alapján
- Ételválasztó és időzített, öt szakaszból álló emésztési szemléltetés
- Szervcímkékre kattintva megnyíló ismertetők
- Érdekességek, szakaszonkénti magyarázatok és folyamatjelzők
- 8 kérdéses emésztőrendszer-kvíz pontozással és visszajelzéssel
- Szervrendszer-választó alapismertetőkkel
- PWA manifest és Service Worker gyorsítótárazással

## Helyi futtatás
Nincs build vagy npm-függőség. A PWA/offline funkció teszteléséhez HTTP(S) szerver szükséges. Például: `python -m http.server 8080`, majd `http://localhost:8080`.

## GitHub
1. Hozz létre egy üres, `etethető-csontvaz-anatomy-lab` nevű repositoryt.
2. Csomagold ki a ZIP-et, töltsd fel a benne lévő fájlokat a repó gyökerébe.
3. Commitold a fájlokat a `main` ágra.

## Vercel
Importáld a GitHub-repót a Vercelbe. Framework Preset: **Other**; Build Command és Install Command: üres; Output Directory: `.`. A deploy után ellenőrizd a webcímet mobilon is.

## Őszinte állapotjelentés
Ez egy működő kezdeti prototípus, nem teljesen azonos a referencia-képpel. A test és a szervek CSS-alapú szemléltető illusztrációk, nem anatómiai pontosságú 3D modell. A további szervrendszerekhez ismertető tartozik, de még nincs külön részletes ábrájuk. A PWA/offline működést valódi böngészőben tesztelni kell. GitHubra feltöltés és Vercel-deploy még nem történt, mert ebben a munkamenetben nincs csatlakoztatott GitHub/Vercel műveleti hozzáférés.

## Következő lépés
Részletes rétegezett anatómiai SVG/illusztráció, minden menüpont véglegesítése, mobilos és akadálymentességi tesztelés, szakmai biológiai ellenőrzés.
