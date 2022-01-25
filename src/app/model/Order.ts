import { Product } from './Product';

export interface Order {
  id?: any,
  name: string,
  products?: Product[]
}
