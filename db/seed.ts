// seed.ts
import { db, PhotosTable } from 'astro:db';
import seedData from '../src/content/photos/hunting-for-sea-slugs/seed.json';

export default async function () {
  await db.insert(PhotosTable).values(seedData);
}
