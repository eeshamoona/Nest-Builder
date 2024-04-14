export interface CategoryModel {
  title: string;
  userPreferences: string;
  environmentDescriptors: string[];
  relatedSubcategories: string[];
  confidence: number;
}
