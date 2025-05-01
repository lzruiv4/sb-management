export interface IPokemon {
  id: string;
  name: string;
  image: string;
  biggerImage: string;
}

export interface IPokemonAPIList {
  name: string;
  url: string;
}

export interface IPokemonRecord {
  pokemonRecordId?: string;
  pokemonId: string;
  captureTime?: string;
  userId: string;
  isRelease?: boolean;
}

export interface IPokemonRecordDTO {
  id?: string;
  pokemonId: string;
  captureTime?: string;
  userId: string;
  isRelease?: boolean;
}
