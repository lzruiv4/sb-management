export interface IPokemonWithNameAndUrl {
  name: string
  url: string
}

export interface IPokemonWithNameAndFotos {
  id: string
  name: string
  image: string
  biggerImage: string
}

export interface IPokemonRecordDTO {
  id?: string
  pokemonId: string
  captureTime?: Date
  userId: string
  isRelease?: boolean
}

export interface IPokemonRecord {
  pokemonRecordId?: string
  image?: string
  pokemonId: string
  userId: string
  captureTime: Date
  isRelease?: boolean
}

// export interface IPokemonRecord {
//   pokemonRecordId?: string
//   pokemonId: string
//   captureTime?: Date
//   image?: string
//   isRelease?: boolean
// }

// export function mapDtoToModelInPokemonRecord(pokemonRecordDto: IPokemonRecordDTO) {
//   return {
//     pokemonRecordId: pokemonRecordDto.id,
//     pokemonId: pokemonRecordDto.pokemonId,
//     captureTime:pokemonRecordDto.captureTime,
//     image:pokemonRecordDto.
//   }
// }

export interface IPokemonRecordInList {
  date: string
  pokemonRecordsInTheSameDay: IPokemonRecord[]
}
