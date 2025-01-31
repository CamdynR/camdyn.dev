import fs from 'node:fs';
import path from 'node:path';

export async function fetchSpotifyPreview(trackId, filePath) {
  let assetPath = path.resolve(`./public/${filePath}`);
  if (fs.existsSync(assetPath)) return;
  else {
    let url = `https://open.spotify.com/embed/track/${trackId}`;
    let response = await fetch(url);
    let data = await response.text();

    const regex =
      /<script[^>]*\sid=["']__NEXT_DATA__["'][^>]*>([\s\S]*?)<\/script>/;
    const match = data.match(regex);

    if (match && match[1]) {
      const jsonData = JSON.parse(match[1].trim());
      let previewURL =
        jsonData.props.pageProps.state.data.entity.audioPreview.url;
      let response = await fetch(previewURL);
      let data = await response.arrayBuffer();
      fs.writeFileSync(assetPath, Buffer.from(data));
    }
  }
}
