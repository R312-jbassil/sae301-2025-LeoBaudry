import PocketBase from 'pocketbase';
import type { TypedPocketBase } from "./pocketbase-types";

var path='';
if(import.meta.env.MODE === 'development') {
    // DEV local - tout le monde utilise le dev server
    path = 'http://localhost:8090'
} else if(import.meta.env.SSR) {
    // PROD - serveur backend SSR
    path = 'http://127.0.0.1:6767'
} else {
    // PROD - client navigateur dans le navigateur
    path = 'https://sae-301.leo-baudry.fr'
}

const pb = new PocketBase(path) as TypedPocketBase;
export default pb;
