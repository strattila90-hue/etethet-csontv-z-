# Etethető Csontváz — Anatomy Lab v0.4.1

## Javítások
- PWA manifest szabványos PNG ikonokkal (192×192 és 512×512), hogy a Chrome felismerhesse telepíthető alkalmazásként.
- Service Worker cache-verzió frissítve; opcionális fájl hiánya nem szakítja meg a telepítést.
- Telepítés gomb és Android/iOS útmutató.
- QR-kódos megosztás a főmenüben, a játékban és a felső sávban.

## Fontos: Vercel-frissítés
A böngészős képernyőkép alapján a Chrome azt írja, hogy „Ez az alkalmazás nem telepíthető”, ezért az előző build nem teljesítette a telepíthetőség feltételeit. Ez a csomag javítja a PWA manifestet, PNG ikonokat és a Service Workert, de a valódi sikerhez friss deploy szükséges.

1. Cseréld le a GitHub repóban a projekt fájljait ezekre, a mappaszerkezet megtartásával.
2. Commit/push után várd meg a sikeres Vercel Deploy-t.
3. A Chrome-ban nyisd meg a Vercel URL-t. Frissítsd az oldalt; ha továbbra is régi verzió látszik, zárd be a fület, nyisd meg újra, és próbáld meg a Chrome ⋮ menüben.
4. A telepítés feltételei: HTTPS, érvényes manifest, megfelelő ikonok és működő Service Worker. A Chrome telepítési felülete eszköz- és böngészőverzió-függő.
5. A QR-kód a publikus Vercel URL-t kódolja. A QR-kép külső szolgáltatással készül, ezért internetkapcsolat szükséges hozzá.

A forráscsomag elkészült, de az élő Vercel-oldal deployját és eszközön történő telepítését innen nem tudom helyetted végrehajtani.
