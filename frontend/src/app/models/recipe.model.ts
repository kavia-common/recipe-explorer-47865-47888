export interface Recipe {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  rating?: number;
  ingredients: string[];
  steps: string[];
  tags?: string[];
}
