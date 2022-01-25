import { Commodity } from './Commodity';

export interface ShopOrder {
  id?: any,
  name: string,
  price?: number,
  commodities?: Commodity[]
}
