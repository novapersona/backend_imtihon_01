const { spawn } = require('child_process');
const path = require('path');

console.log('\x1b[36m%s\x1b[0m', '==================================================');
console.log('\x1b[36m%s\x1b[0m', '   Ilm Chashmasi — Backend & Frontend ishga tushirilmoqda');
console.log('\x1b[36m%s\x1b[0m', '   Backend:  http://localhost:3333');
console.log('\x1b[36m%s\x1b[0m', '   Frontend: http://localhost:5173');
console.log('\x1b[36m%s\x1b[0m', '==================================================\n');

const isWin = process.platform === 'win32';
const npmCmd = isWin ? 'npm.cmd' : 'npm';

// 1. Start Backend
const backend = spawn(npmCmd, ['run', 'dev'], {
  cwd: path.join(__dirname, 'backend'),
  stdio: 'pipe',
  shell: true,
});

backend.stdout.on('data', (data) => {
  process.stdout.write(`\x1b[34m[BACKEND]\x1b[0m ${data}`);
});

backend.stderr.on('data', (data) => {
  process.stderr.write(`\x1b[31m[BACKEND ERR]\x1b[0m ${data}`);
});

// 2. Start Frontend
const frontend = spawn(npmCmd, ['run', 'dev'], {
  cwd: path.join(__dirname, 'frontend'),
  stdio: 'pipe',
  shell: true,
});

frontend.stdout.on('data', (data) => {
  process.stdout.write(`\x1b[32m[FRONTEND]\x1b[0m ${data}`);
});

frontend.stderr.on('data', (data) => {
  process.stderr.write(`\x1b[33m[FRONTEND ERR]\x1b[0m ${data}`);
});

// Handle termination
function cleanup() {
  console.log('\n\x1b[36m%s\x1b[0m', 'Jarayonlar to\'xtatilmoqda...');
  try { backend.kill(); } catch (e) {}
  try { frontend.kill(); } catch (e) {}
  process.exit(0);
}

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);

backend.on('close', (code) => {
  console.log(`\x1b[34m[BACKEND]\x1b[0m to'xtadi (kod: ${code})`);
});

frontend.on('close', (code) => {
  console.log(`\x1b[32m[FRONTEND]\x1b[0m to'xtadi (kod: ${code})`);
});
