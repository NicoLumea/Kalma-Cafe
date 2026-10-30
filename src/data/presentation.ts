export interface WebsiteConcept {
  id: string;
  number: string;
  name: string;
  description: string;
  href: string;
  available: boolean;
}

// Build-time presentation setting, not access control. Set enabled to false
// (or build with PRESENTATION_MODE=off) to omit all switcher markup and assets.
export const presentationConfig = {
  enabled: import.meta.env.PRESENTATION_MODE !== 'off',
  allConceptsHref: '/',
};
