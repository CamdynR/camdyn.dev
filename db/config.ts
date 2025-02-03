// config.ts

import { defineDb, defineTable, column } from 'astro:db';

const PhotosTable = defineTable({
  columns: {
    id: column.number({ primaryKey: true, unique: true }),
    album: column.text(),
    alt: column.text(),
    location: column.text(),
    date: column.date(),
    camera: column.text(),
    lens: column.text(),
    film: column.text()
  }
});

export default defineDb({
  tables: { PhotosTable }
});
