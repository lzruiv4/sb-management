// Springboot as backen
// export const SPRINGBOOT_BACKEND_BASE = 'http://localhost:9090/api';
export const SPRINGBOOT_BACKEND_BASE = 'http://192.168.0.160:9090/api'

export const USER_API = SPRINGBOOT_BACKEND_BASE + '/users'
export const RECHARGE_RECORD_API = SPRINGBOOT_BACKEND_BASE + '/rechargeRecords'
export const POKEMON_RECORDS_API = SPRINGBOOT_BACKEND_BASE + '/pokemonRecords'
export const LOGIN_URL = SPRINGBOOT_BACKEND_BASE + '/auth/login'
export const REGISTER_URL = SPRINGBOOT_BACKEND_BASE + '/auth/register'

// API from pokeapi
export const POKEMON_AMOUNT = 500
export const POKEMON_API = 'https://pokeapi.co/api/v2/pokemon?limit=' + POKEMON_AMOUNT
