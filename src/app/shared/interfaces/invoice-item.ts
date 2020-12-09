import {Product} from './product';

export interface InvoiceItem {
  date: string;
  id: number;
  invoiceProductsDto: {
    productDTO: Product;
    quantity: number;
  }[];
  invoiceStatusDTO: {
    status: string;
  };
  sum: number;
}
