import admin from 'firebase-admin';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Emulate __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load service account JSON manually (no import warning)
const serviceAccount = JSON.parse(
    fs.readFileSync(
        path.join(__dirname, 'flatsome-ecommerce-firebase-adminsdk-fbsvc-adb3c0c35e.json'),
        'utf-8'
    )
);

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });
}

export default admin;
