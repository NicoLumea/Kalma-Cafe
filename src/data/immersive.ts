import { photos, type Photo } from './images';
import { minimalPhotos } from './minimal';
import type { MenuItem } from './menu';
export const immersivePhoto: Photo = { path: 'coffee/espresso', alt: 'A white cup of espresso on dark stone, seen from above — illustrative stock photograph', width: 1920, height: 1280 };
export const immersiveNavigation = [
  { label: 'Home', href: '#home' }, { label: 'Our Story', href: '#story' },
  { label: 'Coffee & Kitchen', href: '#menu' }, { label: 'Gallery', href: '#gallery' }, { label: 'Visit Us', href: '#visit' },
];
export const scenes = [
  { id: 'origin', label: 'The roots', title: 'A connection to Guatemala.', copy: 'Guatemalan coffee is at the heart of Kalma’s identity. An origin that gives this Berlin story its starting point.', image: photos.beans, caption: 'Roasted beans: a stock study of texture, not a named farm or Kalma supplier.' },
  { id: 'ritual', label: 'The ritual', title: 'Time, given to the cup.', copy: 'Water, coffee, a little attention. This imagined ritual reflects Kalma’s invitation to slow down and enjoy the moment.', image: minimalPhotos.brewing, caption: 'Illustrative coffee preparation. No brewing method or equipment is confirmed for Kalma.' },
  { id: 'connection', label: 'The connection', title: 'A Berlin chapter.', copy: 'Kalma is preparing its first Berlin home. A place imagined around simple food, coffee and unhurried moments.', image: photos.atmosphere, caption: 'Stock café photograph. This is not Café Kalma’s actual premises.' },
];
export interface ImmersiveMenuItem extends MenuItem {
  // Display metadata only; future inventory must come from a validated backend.
  availability: 'unconfirmed' | 'available' | 'unavailable';
}
export const immersiveMenu: ImmersiveMenuItem[] = [
  { id: 'immersive-coffee', name: 'A pause, in a cup.', category: 'Coffee', description: 'An espresso-inspired moment. Rich colour, a warm cup, and room to savour it.', image: immersivePhoto, illustrative: true, availability: 'unconfirmed' },
  { id: 'immersive-bakery', name: 'The simple pleasures.', category: 'Bakery', description: 'Bread with a golden crust. An idea for something comforting at the table.', image: photos.pastry, illustrative: true, availability: 'unconfirmed' },
  { id: 'immersive-kitchen', name: 'Let the morning linger.', category: 'Kitchen', description: 'Toast, eggs and a slower start. A visual suggestion for a future kitchen menu.', image: photos.breakfast, illustrative: true, availability: 'unconfirmed' },
];
