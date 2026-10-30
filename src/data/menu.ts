import { photos, type Photo } from './images';

// Presentation model only. No inventory, checkout, table, or payment state.
export interface MenuItem {
  id: string;
  name: string;
  description: string;
  category: 'Coffee' | 'Bakery' | 'Kitchen';
  image: Photo;
  illustrative: true;
  price?: { amount: number; currency: 'EUR' };
}
export const menu: MenuItem[] = [
  { id: 'coffee-moment', name: 'The coffee ritual', description: 'A beautiful cup. A little time to yourself. An everyday ritual, thoughtfully framed.', category: 'Coffee', image: photos.pour, illustrative: true },
  { id: 'bakery-moment', name: 'Something freshly baked', description: 'Golden crusts and simple pleasures. A little inspiration for the bakery counter.', category: 'Bakery', image: photos.pastry, illustrative: true },
  { id: 'kitchen-moment', name: 'A slower kind of breakfast', description: 'An unhurried start, with something comforting on the table and good company close by.', category: 'Kitchen', image: photos.breakfast, illustrative: true },
];
