export interface CategoryModel {
  title: string;
  userPreferences: string;
  environmentDescriptors: string[];
  relatedSubcategories: string[];
  costPreference: string;
  confidence: number;
}
