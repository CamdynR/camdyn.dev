import fs from 'node:fs';
import path from 'node:path';

export async function fetchSpotifyImage(url, filePath) {
  let assetPath = path.resolve(`./public/${filePath}`);
  if (fs.existsSync(assetPath)) return;
  else {
    let response = await fetch(url);
    let data = await response.arrayBuffer();
    fs.writeFileSync(assetPath, Buffer.from(data));
  }
}
