import PocketBase from 'pocketbase';
import type { TypedPocketBase } from "./pocketbase-types";

var path = '';
if(import.meta.env.MODE === 'development') {
    // DEV local - tout le monde utilise le dev server
    path = 'http://localhost:8090'
} else if(import.meta.env.SSR) {
    // ✅ CORRECTION : SSR doit aussi utiliser l'URL publique
    // ou une URL interne qui pointe vers la MÊME instance
    path = 'https://sae-301.leo-baudry.fr'  // Ou 'http://localhost:6767' si c'est un proxy local
} else {
    // PROD - client navigateur
    path = 'https://sae-301.leo-baudry.fr'
}

const pb = new PocketBase(path) as TypedPocketBase;
export default pb;
