export interface KV {
  [key: string]: 'primary' | 'error' | 'warning';
}

export const CHARACTER_STATUS: KV = {
  Alive: 'primary',
  Dead: 'error',
  unknown: 'warning',
};

export type Character = {
  name: string;
  id: string;
  image: string;
  origin: { name: string };
  location: { name: string };
  species: string;
  status: string;
};

export type CharactersResponse = {
  characters: {
    results: Character[];
    info: {
      count: number;
      pages: number;
      next: string;
      prev: string;
    };
  };
};
