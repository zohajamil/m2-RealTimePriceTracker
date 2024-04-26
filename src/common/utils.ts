import { coinData } from "./CoinData";

export function getCoinNameFromCode(coinCode: string): string {
    return coinData.find(c => c.code === coinCode?.toUpperCase())?.name || '';
}

export function isCoinCodeValid(coinCode: string): boolean {
    return coinData.find(c => c.code === coinCode?.toUpperCase()) !== undefined
}