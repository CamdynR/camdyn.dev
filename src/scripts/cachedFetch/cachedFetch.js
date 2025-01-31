import fs from 'node:fs';
import path from 'node:path';

// Define the path to fetchCache.json
const cachePath = path.resolve('./src/scripts/cachedFetch/fetchCache.json');

// Ensure fetchCache.json exists
if (!fs.existsSync(cachePath)) {
  fs.writeFileSync(cachePath, JSON.stringify({}), 'utf8');
}

// Import fetchCache dynamically
const fetchCache = JSON.parse(fs.readFileSync(cachePath, 'utf8'));

export async function cachedFetch(url, options) {
  if (fetchCache[url]) return fetchCache[url];
  else {
    let response = await fetch(url, options);
    let data = await response.json();
    fetchCache[url] = data;
    let cachePath = path.resolve('./src/scripts/cachedFetch/fetchCache.json');
    fs.writeFileSync(cachePath, JSON.stringify(fetchCache));
    return '';
  }
}
