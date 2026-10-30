import type { WebsiteConcept } from './presentation';
export const concepts = [
  { number: '01', slug: 'heritage', name: 'Kalma Heritage', description: 'Rooted in origin. Rich in feeling. An editorial expression of Guatemalan coffee and Berlin life.', available: true, mood: 'Warm · Editorial · Timeless' },
  { number: '02', slug: 'organic', name: 'Kalma Organic', description: 'A little less rush. A little more connection. Natural forms and a softer rhythm for everyday coffee moments.', available: true, mood: 'Natural · Intimate · Unhurried' },
  { number: '03', slug: 'minimal', name: 'Kalma Minimal', description: 'Less decoration. More intention. An architectural study in coffee, typography and the beauty of the essential.', available: true, mood: 'Quiet · Precise · Essential' },
  { number: '04', slug: 'immersive', name: 'Kalma Immersive', description: 'A moment worth experiencing. Cinematic coffee stories, deep forest green and a slower rhythm of discovery.', available: true, mood: 'Atmospheric · Expressive · Cinematic' },
] as const;

export const switcherConcepts: WebsiteConcept[] = concepts.map(concept => ({
  id: concept.slug, number: concept.number, name: concept.name,
  description: concept.mood, href: `/${concept.slug}/`, available: concept.available,
}));
