// import type { IUserDTO } from '../dtos/user.dto'
// import type { Component } from 'vue'
import type { IUserDTO } from '../dtos/user.dto'
import type { RoleType } from '../enums/role.enum'

export interface IUser {
  userId?: string
  username: string
  firstname: string
  lastname: string
  pokemonCoin: number
  createdAt?: Date
  roles?: RoleType[]
  // edit?: Component
  // status?: 'Active' | 'Delete'
}

export function mapDtoToModel(userDto: IUserDTO): IUser {
  return {
    userId: userDto.id,
    username: userDto.username,
    firstname: userDto.firstname,
    lastname: userDto.lastname,
    pokemonCoin: userDto.pokemonCoin,
    createdAt: userDto.createdAt,
    roles: userDto.roles,
  };
}
