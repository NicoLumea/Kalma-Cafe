import { photos } from './images';
import type { MenuItem } from './menu';

export const organicNavigation = [
  { label: 'Home', href: '#home' },
  { label: 'Our Story', href: '#story' },
  { label: 'Coffee & Kitchen', href: '#menu' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Visit Us', href: '#visit' },
] as const;

// Illustrative content only. The shared menu model keeps future integrations
// separate from this concept's presentation; there is no ordering state.
export const organicMenu: MenuItem[] = [
  { id: 'organic-coffee', name: 'A cup, shared', category: 'Coffee', description: 'Coffee and a conversation. A small invitation to make a little more time.', image: photos.pour, illustrative: true },
  { id: 'organic-bakery', name: 'Bread & little pleasures', category: 'Bakery', description: 'Golden crusts, soft centres. The comforting simplicity of something baked.', image: photos.pastry, illustrative: true },
  { id: 'organic-kitchen', name: 'An unhurried breakfast', category: 'Kitchen', description: 'Toast, eggs and a slower start. An idea for mornings with nowhere to rush.', image: photos.breakfast, illustrative: true },
];

export const organic = {
  introduction: 'Guatemalan coffee, simple food and unhurried moments. Kalma is preparing its first home in Berlin.',
  story: 'A good cup can change the pace of a day. This is our interpretation of Kalma’s invitation: simple food, thoughtful coffee and a little more time for the things that matter.',
  origin: 'Guatemalan coffee is at the heart of Kalma’s identity. Here, that connection becomes a meeting of origin and everyday ritual — a story carried from Guatemala to a new home in Berlin.',
  menuNotice: 'Illustrative menu ideas, not Café Kalma’s official menu. Images are stock photography; availability and prices are not represented.',
  galleryNotice: 'An atmosphere study using licensed stock photographs. These images do not show Café Kalma’s premises or confirmed products.',
  newsletterNotice: 'Newsletter demonstration only. This input and button are disabled; no email addresses are collected, transmitted or stored.',
} as const;
