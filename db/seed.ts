// seed.ts
import { db, PhotosTable } from 'astro:db';

export default async function () {
  await db.insert(PhotosTable).values([
    {
      id: 1,
      album: 'hunting-for-sea-slugs',
      location: 'La Jolla Tide Pools',
      date: '2024-dec-29',
      camera: 'Pentax LX',
      lens: 'SMC Pentax-M 50mm F1.4',
      film: 'CineStill 50D',
      alt: 'Kate Sessions park overlooking Mission Bay'
    },
    {
      id: 2,
      album: 'hunting-for-sea-slugs',
      location: 'La Jolla Tide Pools',
      date: '2024-dec-29',
      camera: 'Pentax LX',
      lens: 'SMC Pentax-M 50mm F1.4',
      film: 'CineStill 50D',
      alt: 'A cold, gloomy, and wet overview of the la jolla tide pools'
    },
    {
      id: 3,
      album: 'hunting-for-sea-slugs',
      location: 'La Jolla Tide Pools',
      date: '2024-dec-29',
      camera: 'Pentax LX',
      lens: 'SMC Pentax-M 50mm F1.4',
      film: 'CineStill 50D',
      alt: 'Portrait of Lucius unamused with a giggling Abby in the background'
    },
    {
      id: 4,
      album: 'hunting-for-sea-slugs',
      location: 'La Jolla Tide Pools',
      date: '2024-dec-29',
      camera: 'Pentax LX',
      lens: 'SMC Pentax-M 50mm F1.4',
      film: 'CineStill 50D',
      alt: 'Candid of Abby mid speech, did not turn out well'
    },
    {
      id: 5,
      album: 'hunting-for-sea-slugs',
      location: 'La Jolla Tide Pools',
      date: '2024-dec-29',
      camera: 'Pentax LX',
      lens: 'SMC Pentax-M 50mm F1.4',
      film: 'CineStill 50D',
      alt: 'Abby crouched over inspecting a small puddle'
    },
    {
      id: 6,
      album: 'hunting-for-sea-slugs',
      location: 'La Jolla Tide Pools',
      date: '2024-dec-29',
      camera: 'Pentax LX',
      lens: 'SMC Pentax-M 50mm F1.4',
      film: 'CineStill 50D',
      alt: 'Abby and Lucius crouched down in the La Jolla Tide Pools looking for sea creatures'
    },
    {
      id: 7,
      album: 'hunting-for-sea-slugs',
      location: 'La Jolla Tide Pools',
      date: '2024-dec-29',
      camera: 'Pentax LX',
      lens: 'SMC Pentax-M 50mm F1.4',
      film: 'CineStill 50D',
      alt: 'A view towards the ocean with other beach goers in the distance'
    },
    {
      id: 8,
      album: 'hunting-for-sea-slugs',
      location: 'La Jolla Tide Pools',
      date: '2024-dec-29',
      camera: 'Pentax LX',
      lens: 'SMC Pentax-M 50mm F1.4',
      film: 'CineStill 50D',
      alt: 'The backside of Lucius as they peer down in a small pool'
    },
    {
      id: 9,
      album: 'hunting-for-sea-slugs',
      location: 'La Jolla Tide Pools',
      date: '2024-dec-29',
      camera: 'Pentax LX',
      lens: 'SMC Pentax-M 50mm F1.4',
      film: 'CineStill 50D',
      alt: 'Another shot of Lucius from behind from further away as they peer down'
    },
    {
      id: 10,
      album: 'hunting-for-sea-slugs',
      location: 'La Jolla Tide Pools',
      date: '2024-dec-29',
      camera: 'Pentax LX',
      lens: 'SMC Pentax-M 50mm F1.4',
      film: 'CineStill 50D',
      alt: 'Abby carefully perched low on the edge of a rock as she scans for life'
    },
    {
      id: 11,
      album: 'hunting-for-sea-slugs',
      location: 'La Jolla Tide Pools',
      date: '2024-dec-29',
      camera: 'Pentax LX',
      lens: 'SMC Pentax-M 50mm F1.4',
      film: 'CineStill 50D',
      alt: 'Similar to the previous photo, Abby carefully perches low on the edge of a rock as she scans for life'
    },
    {
      id: 12,
      album: 'hunting-for-sea-slugs',
      location: 'La Jolla Tide Pools',
      date: '2024-dec-29',
      camera: 'Pentax LX',
      lens: 'SMC Pentax-M 50mm F1.4',
      film: 'CineStill 50D',
      alt: 'Other tide pool-ers in the distance bracing against the wind as they carefully climb over rocks'
    },
    {
      id: 13,
      album: 'hunting-for-sea-slugs',
      location: 'La Jolla Tide Pools',
      date: '2024-dec-29',
      camera: 'Pentax LX',
      lens: 'SMC Pentax-M 50mm F1.4',
      film: 'CineStill 50D',
      alt: "A slightly out of focus shot of Lucius in the distance, closer to the ocean's edge"
    },
    {
      id: 14,
      album: 'hunting-for-sea-slugs',
      location: 'La Jolla Tide Pools',
      date: '2024-dec-29',
      camera: 'Pentax LX',
      lens: 'SMC Pentax-M 50mm F1.4',
      film: 'CineStill 50D',
      alt: 'Yards and yards of hair-like seaweed strands cover wet rocks and pools, in the center a white bird with a small craned neck'
    },
    {
      id: 15,
      album: 'hunting-for-sea-slugs',
      location: 'La Jolla Tide Pools',
      date: '2024-dec-29',
      camera: 'Pentax LX',
      lens: 'SMC Pentax-M 50mm F1.4',
      film: 'CineStill 50D',
      alt: 'A seagull scans the tidepools and seaweed for a midday lunch'
    },
    {
      id: 16,
      album: 'hunting-for-sea-slugs',
      location: 'La Jolla Tide Pools',
      date: '2024-dec-29',
      camera: 'Pentax LX',
      lens: 'SMC Pentax-M 50mm F1.4',
      film: 'CineStill 50D',
      alt: 'Abby carefully navigating some slippery rocks'
    },
    {
      id: 17,
      album: 'hunting-for-sea-slugs',
      location: 'La Jolla Tide Pools',
      date: '2024-dec-29',
      camera: 'Pentax LX',
      lens: 'SMC Pentax-M 50mm F1.4',
      film: 'CineStill 50D',
      alt: 'Lucius, a little bored, staring off in the distance'
    },
    {
      id: 18,
      album: 'hunting-for-sea-slugs',
      location: 'La Jolla Tide Pools',
      date: '2024-dec-29',
      camera: 'Pentax LX',
      lens: 'SMC Pentax-M 50mm F1.4',
      film: 'CineStill 50D',
      alt: 'A marine bioligist we met that day picking up a sea slug to place in a bucket'
    },
    {
      id: 19,
      album: 'hunting-for-sea-slugs',
      location: 'La Jolla Tide Pools',
      date: '2024-dec-29',
      camera: 'Pentax LX',
      lens: 'SMC Pentax-M 50mm F1.4',
      film: 'CineStill 50D',
      alt: 'A glock of birds in the distance on the edge of the tide pools close to the ocean'
    },
    {
      id: 20,
      album: 'hunting-for-sea-slugs',
      location: 'La Jolla Tide Pools',
      date: '2024-dec-29',
      camera: 'Pentax LX',
      lens: 'SMC Pentax-M 50mm F1.4',
      film: 'CineStill 50D',
      alt: 'Lucius gives an upset glare at the camera, unamused at having their picture taken'
    },
    {
      id: 21,
      album: 'hunting-for-sea-slugs',
      location: 'La Jolla Tide Pools',
      date: '2024-dec-29',
      camera: 'Pentax LX',
      lens: 'SMC Pentax-M 50mm F1.4',
      film: 'CineStill 50D',
      alt: 'Lucius and Abby poke and prod the small tide pools with sticks they found'
    },
    {
      id: 22,
      album: 'hunting-for-sea-slugs',
      location: 'La Jolla Tide Pools',
      date: '2024-dec-29',
      camera: 'Pentax LX',
      lens: 'SMC Pentax-M 50mm F1.4',
      film: 'CineStill 50D',
      alt: "Lucius glances back to see what I'm up to but finds themselves with a facefull of wind"
    },
    {
      id: 23,
      album: 'hunting-for-sea-slugs',
      location: 'La Jolla Tide Pools',
      date: '2024-dec-29',
      camera: 'Pentax LX',
      lens: 'SMC Pentax-M 50mm F1.4',
      film: 'CineStill 50D',
      alt: 'Lucius stares into the wind much like a sailor, with wind blowing their hair back'
    },
    {
      id: 24,
      album: 'hunting-for-sea-slugs',
      location: 'La Jolla Tide Pools',
      date: '2024-dec-29',
      camera: 'Pentax LX',
      lens: 'SMC Pentax-M 50mm F1.4',
      film: 'CineStill 50D',
      alt: 'Lucius stands for a portrait, brushing their hair out of their face with their hand'
    },
    {
      id: 25,
      album: 'hunting-for-sea-slugs',
      location: 'La Jolla Tide Pools',
      date: '2024-dec-29',
      camera: 'Pentax LX',
      lens: 'SMC Pentax-M 50mm F1.4',
      film: 'CineStill 50D',
      alt: 'Lucius and Abby peer down together to look  at a sea slug they found'
    },
    {
      id: 26,
      album: 'hunting-for-sea-slugs',
      location: 'La Jolla Tide Pools',
      date: '2024-dec-29',
      camera: 'Pentax LX',
      lens: 'SMC Pentax-M 50mm F1.4',
      film: 'CineStill 50D',
      alt: 'Million dollar La Jollan mansions on the edge of small bluffs off in the distance, in between are craggy wet rocks'
    },
    {
      id: 27,
      album: 'hunting-for-sea-slugs',
      location: 'La Jolla Tide Pools',
      date: '2024-dec-29',
      camera: 'Pentax LX',
      lens: 'SMC Pentax-M 50mm F1.4',
      film: 'CineStill 50D',
      alt: "More houses I'll never be able to afford"
    },
    {
      id: 28,
      album: 'hunting-for-sea-slugs',
      location: 'La Jolla Tide Pools',
      date: '2024-dec-29',
      camera: 'Pentax LX',
      lens: 'SMC Pentax-M 50mm F1.4',
      film: 'CineStill 50D',
      alt: 'A cold, gray, wet ocean scene with small 2 foot waves lapping the shore'
    },
    {
      id: 29,
      album: 'hunting-for-sea-slugs',
      location: 'La Jolla Tide Pools',
      date: '2024-dec-29',
      camera: 'Pentax LX',
      lens: 'SMC Pentax-M 50mm F1.4',
      film: 'CineStill 50D',
      alt: 'Lucius, giddy with themselves, doing a funny strut back towards me'
    },
    {
      id: 30,
      album: 'hunting-for-sea-slugs',
      location: 'La Jolla Tide Pools',
      date: '2024-dec-29',
      camera: 'Pentax LX',
      lens: 'SMC Pentax-M 50mm F1.4',
      film: 'CineStill 50D',
      alt: 'Abby and Lucius perched on a tall rock peering into a deep crevice'
    },
    {
      id: 31,
      album: 'hunting-for-sea-slugs',
      location: 'La Jolla Tide Pools',
      date: '2024-dec-29',
      camera: 'Pentax LX',
      lens: 'SMC Pentax-M 50mm F1.4',
      film: 'CineStill 50D',
      alt: 'Abby with an intense eye and smile holds a stick she found as she looks for more slugs'
    },
    {
      id: 32,
      album: 'hunting-for-sea-slugs',
      location: 'La Jolla Tide Pools',
      date: '2024-dec-29',
      camera: 'Pentax LX',
      lens: 'SMC Pentax-M 50mm F1.4',
      film: 'CineStill 50D',
      alt: 'Lucius squatting on a rock unamused'
    },
    {
      id: 33,
      album: 'hunting-for-sea-slugs',
      location: 'La Jolla Tide Pools',
      date: '2024-dec-29',
      camera: 'Pentax LX',
      lens: 'SMC Pentax-M 50mm F1.4',
      film: 'CineStill 50D',
      alt: 'Lucius and Abby peer down together to look  for more creatures'
    },
    {
      id: 34,
      album: 'hunting-for-sea-slugs',
      location: 'La Jolla Tide Pools',
      date: '2024-dec-29',
      camera: 'Pentax LX',
      lens: 'SMC Pentax-M 50mm F1.4',
      film: 'CineStill 50D',
      alt: 'Lucius and Abby continuing the search for life'
    },
    {
      id: 35,
      album: 'hunting-for-sea-slugs',
      location: 'La Jolla Tide Pools',
      date: '2024-dec-29',
      camera: 'Pentax LX',
      lens: 'SMC Pentax-M 50mm F1.4',
      film: 'CineStill 50D',
      alt: 'An assortment of marine hobbyists, explorative children, and tired parents dot the scene off in the distance'
    },
    {
      id: 36,
      album: 'hunting-for-sea-slugs',
      location: 'La Jolla Tide Pools',
      date: '2024-dec-29',
      camera: 'Pentax LX',
      lens: 'SMC Pentax-M 50mm F1.4',
      film: 'CineStill 50D',
      alt: 'A tall rock jutts from the ground'
    },
    {
      id: 37,
      album: 'hunting-for-sea-slugs',
      location: 'La Jolla Tide Pools',
      date: '2024-dec-29',
      camera: 'Pentax LX',
      lens: 'SMC Pentax-M 50mm F1.4',
      film: 'CineStill 50D',
      alt: 'Abby getting into a deep pose to see if anything is under a rock'
    }
  ]);
}
