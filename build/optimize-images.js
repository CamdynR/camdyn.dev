import { readdir, access } from 'fs/promises';
import { join, extname, basename, resolve } from 'path';
import sharp from 'sharp';

const SIZES = {
  L: 2000,
  M: 1000,
  S: 500,
  XS: 250
};

async function processDirectory(directory) {
  try {
    const absDirectory = resolve(directory);
    const files = await readdir(absDirectory);

    // Only process original JPGs (skip already resized versions)
    const jpgFiles = files.filter(
      (file) =>
        file.toLowerCase().endsWith('.jpg') && !file.match(/_(L|M|S|XS)\.jpg$/) // Skip resized images
    );

    if (jpgFiles.length === 0) {
      console.log('No new JPG files found to process.');
      return;
    }

    for (const file of jpgFiles) {
      const filePath = join(absDirectory, file);
      await processImage(filePath, absDirectory);
    }

    console.log('Processing complete.');
  } catch (error) {
    console.error('Error processing directory:', error);
  }
}

async function processImage(filePath, outputDir) {
  const ext = extname(filePath);
  const baseName = basename(filePath, ext);
  const originalImage = sharp(filePath);
  const metadata = await originalImage.metadata();

  if (!metadata.width || !metadata.height) {
    console.warn(`Skipping ${filePath}, unable to retrieve dimensions.`);
    return;
  }

  const longestSide = Math.max(metadata.width, metadata.height);
  const resizedFiles = [];

  for (const [sizeLabel, maxSize] of Object.entries(SIZES)) {
    if (longestSide <= maxSize) continue; // Skip resizing if already smaller

    const outputFilename = `${baseName}_${sizeLabel}.jpg`;
    const outputFilePath = join(outputDir, outputFilename);

    try {
      await access(outputFilePath);
      console.log(`Skipping existing file: ${outputFilename}`);
    } catch {
      console.log(`Creating ${outputFilename}...`);
      await originalImage
        .resize({
          width: metadata.width > metadata.height ? maxSize : null,
          height: metadata.height > metadata.width ? maxSize : null,
          fit: 'inside'
        })
        .toFile(outputFilePath);
    }

    resizedFiles.push(outputFilePath);
  }

  // Convert the original and resized images to WebP
  const jpgFilesToConvert = [filePath, ...resizedFiles];

  for (const jpgPath of jpgFilesToConvert) {
    const webpPath = jpgPath.replace(/\.jpg$/, '.webp');

    try {
      await access(webpPath);
      console.log(`Skipping existing WebP: ${webpPath}`);
    } catch {
      console.log(`Converting ${jpgPath} to WebP...`);
      await sharp(jpgPath).webp({ quality: 80 }).toFile(webpPath);
    }
  }
}

// Run script with directory argument
const directory = process.argv[2];
if (!directory) {
  console.error('Usage: node resize-and-convert.mjs <directory>');
  process.exit(1);
}

processDirectory(directory);
