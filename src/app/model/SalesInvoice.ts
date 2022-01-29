import { Client } from './Client';
import { Product } from './Product';
import { Section } from './Section';
import { Order } from './Order';

export interface SalesInvoice {
  id?: any,
  name: string,
  order?: Order,
  section?: Section,
  client?: Client,
  products?: Product[]
}
