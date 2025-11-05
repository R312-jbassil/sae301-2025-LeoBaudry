import PocketBase from 'pocketbase';
import type { TypedPocketBase } from "./pocketbase-types";

var path='';
if(import.meta.env.MODE === 'development') {
    path = 'http://localhost:8090'
} else if(import.meta.env.SSR) {
    path = 'http://127.0.0.1:6767'  // ← SSR (VPS backend)
} else {
    path = '/api'  // ← CLIENT (navigateur) utilise le proxy
}

const pb = new PocketBase(path) as TypedPocketBase;
export default pb;
