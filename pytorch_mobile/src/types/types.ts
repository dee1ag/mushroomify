export type TEdibility = 'edible' | 'poisonous' | 'conditionally_edible' | 'deadly';

export type TModelClass = {
  mushroom_species_name: string;
  edibility: TEdibility;
};

export type ScanningResult = { id: number; probability: number };
export type SavedResult = { id: number; count: number };
