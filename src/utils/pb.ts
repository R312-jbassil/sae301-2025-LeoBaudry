import PocketBase from 'pocketbase';
import type { TypedPocketBase } from "./pocketbase-types";
var path='';
if(import.meta.env.MODE === 'development')
    path = 'http://localhost:8090'    
else path = 'http://127.0.0.1:6767'    
const pb = new PocketBase(path) as TypedPocketBase;
export default pb;