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

export function mapDtoToModelInPokemonRecord(pokemonRecordDto: IPokemonRecordDTO) {
  return {
    pokemonRecordId: pokemonRecordDto.id,
    image: '',
    pokemonId: pokemonRecordDto.pokemonId,
    userId: pokemonRecordDto.userId,
    captureTime: pokemonRecordDto.captureTime,
    isRelease: pokemonRecordDto.isRelease,
  } as IPokemonRecord
}

export function mapModelToDtoInPokemonRecord(pokemonRecord: IPokemonRecord) {
  return {
    id: pokemonRecord.pokemonRecordId,
    pokemonId: pokemonRecord.pokemonId,
    captureTime: pokemonRecord.captureTime,
    userId: pokemonRecord.userId,
    isRelease: pokemonRecord.isRelease,
  }
}

export interface IPokemonRecordInList {
  date: string
  pokemonRecordsInTheSameDay: IPokemonRecord[]
}
