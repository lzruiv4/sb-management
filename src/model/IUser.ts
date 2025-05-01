export interface IUser {
  userId?: string;
  username: string;
  createdAt?: Date;
  firstname: string;
  lastname: string;
  pokemonCoin: number;
}

export interface IUserDTO {
  id?: string;
  username: string;
  createdAt?: Date;
  firstname: string;
  lastname: string;
  pokemonCoin: number;
}
