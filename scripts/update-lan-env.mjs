import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDir, '..');

const frontendEnvPath = path.join(repoRoot, 'frontend', '.env.local');
const backendEnvPath = path.join(repoRoot, 'backend', '.env.local');

const preferredIp = Object.values(os.networkInterfaces())
  .flat()
  .find((iface) => iface
    && iface.family === 'IPv4'
    && !iface.internal
    && /^10\.|^192\.168\.|^172\.(1[6-9]|2\d|3[0-1])\./.test(iface.address))?.address || '127.0.0.1';

const frontendContent = `VITE_API_BASE_URL=http://${preferredIp}:5000/api\n`;

const backendContent = [
  'PORT=5000',
  'HOST=0.0.0.0',
  'MONGODB_URI=mongodb://127.0.0.1:27017/sevasetu',
  'JWT_SECRET=replace_with_strong_secret',
  `FRONTEND_URL=http://localhost:5173,http://127.0.0.1:5173,http://${preferredIp}:5173`,
  'FIREBASE_SERVICE_ACCOUNT_JSON={"type":"service_account","project_id":"your_project_id","private_key_id":"your_private_key_id","private_key":"-----BEGIN PRIVATE KEY-----\\nYOUR_PRIVATE_KEY\\n-----END PRIVATE KEY-----\\n","client_email":"firebase-adminsdk@example.iam.gserviceaccount.com","client_id":"your_client_id","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://oauth2.googleapis.com/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_x509_cert_url":"https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk@example.iam.gserviceaccount.com"}',
  '',
].join('\n');

fs.writeFileSync(frontendEnvPath, frontendContent, 'utf8');
fs.writeFileSync(backendEnvPath, backendContent, 'utf8');

console.log(`Updated LAN env files for ${preferredIp}`);