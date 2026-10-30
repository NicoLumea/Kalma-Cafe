import type { Photo } from './images';
import type { MenuItem } from './menu';

export const minimalPhotos = {
  brewing: { path: 'coffee/brewing', alt: 'Water poured from a gooseneck kettle into a glass coffee brewer — illustrative stock photograph', width: 1280, height: 854 },
  roasting: { path: 'coffee/roasting', alt: 'Coffee beans released from a roasting drum — stock photograph, not a Kalma supplier or facility', width: 1280, height: 854 },
} satisfies Record<string, Photo>;

export const minimalNavigation = [
  { label: 'Home', href: '#home' },
  { label: 'Our Story', href: '#story' },
  { label: 'Coffee & Kitchen', href: '#menu' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Visit Us', href: '#visit' },
] as const;

// The shared display model retains stable IDs and optional price/image fields.
// Future ordering must be implemented separately; no order or customer state exists.
export type MinimalMenuItem = Omit<MenuItem, 'image'> & { image?: Photo };
export const minimalMenu: MinimalMenuItem[] = [
  { id: 'minimal-filter', category: 'Coffee', name: 'The filter ritual', description: 'A slowly prepared cup. A simple way to make room for the moment.', illustrative: true },
  { id: 'minimal-bread', category: 'Bakery', name: 'Bread, simply', description: 'A golden crust, a soft centre. An idea for something comforting alongside your coffee.', illustrative: true },
  { id: 'minimal-breakfast', category: 'Kitchen', name: 'A considered start', description: 'Toast, eggs and an unhurried morning. A little inspiration for the breakfast table.', illustrative: true },
];

export const minimal = {
  introduction: 'Guatemalan coffee. Simple food. Unhurried moments. Kalma is preparing its first home in Berlin.',
  philosophy: 'Kalma’s vision brings Guatemalan coffee, simple food and unhurried moments together. This concept gives that idea a quieter expression: space for the cup, the conversation and the time between.',
  origin: 'Guatemala is at the heart of Kalma’s coffee identity. Berlin is the setting for its next chapter. Two places connected by an everyday ritual.',
  originNotice: 'Stock photography of coffee roasting. It does not show a Kalma facility or supplier, or establish any farm, certification or sourcing claim.',
  menuNotice: 'Demonstration menu only — not Café Kalma’s official offerings. No availability or prices are asserted. No orders or payments are accepted.',
  galleryNotice: 'Atmosphere study using licensed stock photographs. These are not images of Café Kalma’s actual premises or confirmed products.',
  newsletterNotice: 'Newsletter demonstration only. The input and button are disabled. No email addresses are collected, transmitted or stored.',
} as const;
