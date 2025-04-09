// types/pokemon.ts
export interface PokemonBasic {
  name: string;
  url: string;
}

export interface PokemonDetailResponse {
  id: number;
  sprites: {
    front_default: string | null;
    other: {
      dream_world: {
        front_default: string | null;
      };
    };
  };
}

export interface Pokemon {
  id: number;
  name: string;
  image: string;
  biggerImage: string;
}
