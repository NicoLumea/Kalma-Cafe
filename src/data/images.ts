export interface Photo {
  path: string;
  alt: string;
  width: number;
  height: number;
}
export const photos = {
  ritual: { path: 'coffee/ritual', alt: 'Three cups of coffee beside green foliage on a wooden table — illustrative stock photograph', width: 1280, height: 1920 },
  beans: { path: 'coffee/beans', alt: 'Roasted coffee beans in warm light — illustrative stock photograph', width: 1280, height: 976 },
  pour: { path: 'coffee/pour', alt: 'Coffee prepared for a quiet break — illustrative stock photograph', width: 1280, height: 853 },
  atmosphere: { path: 'cafe/atmosphere', alt: 'Sunlit café interior with greenery — stock inspiration, not Café Kalma’s premises', width: 1280, height: 877 },
  pastry: { path: 'food/pastry', alt: 'A selection of artisan bread — illustrative stock photograph', width: 1280, height: 852 },
  breakfast: { path: 'food/breakfast', alt: 'Toast and eggs served for breakfast — illustrative stock photograph', width: 1280, height: 1280 },
} satisfies Record<string, Photo>;
