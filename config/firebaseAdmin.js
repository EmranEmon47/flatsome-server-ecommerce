import 'dotenv/config'; // Load .env variables in local dev
import admin from 'firebase-admin';

if (!process.env.FIREBASE_SERVICE_ACCOUNT) {
    throw new Error('FIREBASE_SERVICE_ACCOUNT environment variable is not defined');
}

let serviceAccount;

try {
    // Parse the JSON string from the env variable
    serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

    // Check if private_key exists and sanitize it
    if (!serviceAccount.private_key) {
        throw new Error('Missing private_key in FIREBASE_SERVICE_ACCOUNT');
    }

    serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, '\n');
} catch (error) {
    console.error('❌ Failed to parse FIREBASE_SERVICE_ACCOUNT or sanitize private_key:', error.message);
    throw error;
}

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });
}

export default admin;
