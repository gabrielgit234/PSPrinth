import fs from 'fs';
const file = fs.readFileSync('constants.ts', 'utf-8');
const updated = file.replace(/downloads: \d+/g, 'downloads: 0').replace(/follows: \d+/g, 'follows: 0');
fs.writeFileSync('constants.ts', updated);
console.log('Updated constants.ts');
