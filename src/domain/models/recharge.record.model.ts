import type { IRechargeRecordDTO } from "../dtos/recharge.record.dto"

export interface IRechargeRecord {
  rechargeRecordId?: string
  userId: string
  amountRecharge: number
  currentPokemonCoin: number
  rechargeAt?: Date
}

export function mapDtoToModel(rechargeRecordDto: IRechargeRecordDTO): IRechargeRecord {
  return {
    rechargeRecordId: rechargeRecordDto.id,
    userId: rechargeRecordDto.userId,
    amountRecharge: rechargeRecordDto.amountRecharge,
    currentPokemonCoin: rechargeRecordDto.currentPokemonCoin,
    rechargeAt: rechargeRecordDto.rechargeAt,
  }
}
