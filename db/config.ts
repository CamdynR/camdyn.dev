// config.ts

import { defineDb, defineTable, column } from 'astro:db';

const PhotosTable = defineTable({
  columns: {
    albumIndex: column.number(),
    album: column.text(),
    location: column.text(),
    date: column.date(),
    camera: column.text(),
    lens: column.text(),
    film: column.text(),
    people: column.json(),
    subject: column.text(),
    alt: column.text()
  }
});

export default defineDb({
  tables: { PhotosTable }
});
