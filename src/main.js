import { app } from './bootstrap/server.js';
import { https } from 'firebase-functions';

function startServer() {
   
    
}

if (process.env.NODE_ENV !== 'production') {
    startServer();
}

export const api = https.onRequest(app);
