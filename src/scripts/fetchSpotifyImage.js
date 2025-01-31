import fs from 'node:fs';
import path from 'node:path';

export async function fetchSpotifyImage(url, filePath) {
  let assetPath = path.resolve(`./public/${filePath}`);

  // Ensure the directory exists
  let assetDir = path.dirname(assetPath);
  fs.mkdirSync(assetDir, { recursive: true });

  if (fs.existsSync(assetPath)) return;
  else {
    let response = await fetch(url);
    let data = await response.arrayBuffer();
    fs.writeFileSync(assetPath, Buffer.from(data));
  }
}
