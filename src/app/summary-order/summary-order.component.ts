import { Section } from './../model/Section';
import { Order } from './../model/Order';
import { Client } from './../model/Client';
import { Product } from './../model/Product';
import { SalesInvoice } from './../model/SalesInvoice';
import { ProductsApiService } from './../service/products-api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-summary-order',
  templateUrl: './summary-order.component.html',
  styleUrls: ['./summary-order.component.css']
})
export class SummaryOrderComponent implements OnInit {

  public salesInvoices: SalesInvoice[] = [];
  public clients: Client[] = [];
  public orders: Order[] = [];
  public sections: Section[] = [];
  public products: Product[] = [];

  constructor(private service: ProductsApiService) { }

  ngOnInit(): void {
    this.service.getSalesInvoice().subscribe(data => this.filterDataInvoice(data));
    this.service.getClients().subscribe(data => this.filterDataClient(data));
    this.service.getOrders().subscribe(data => this.filterDataOrder(data));
    this.service.getSections().subscribe(data => this.filterDataSection(data));
    this.service.getProducts().subscribe(data => this.filterDataProduct(data));
  }

  filterDataInvoice(data: SalesInvoice[]){
    var invoiceId = sessionStorage.getItem('invoiceId');
    this.salesInvoices = data.filter(
      invoice => invoice.id == invoiceId as unknown as number
    );
  }

  filterDataClient(data: Client[]){
    var clientId = sessionStorage.getItem('clientId');
    this.clients = data.filter(
      invoice => invoice.id == clientId as unknown as number
    );
  }

  filterDataOrder(data: Order[]){
    var orderId = sessionStorage.getItem('orderId');
    this.orders = data.filter(
      invoice => invoice.id == orderId as unknown as number
    );
  }

  filterDataSection(data: Section[]){
    var sectionId = sessionStorage.getItem('sectionId');
    this.sections = data.filter(
      invoice => invoice.id == sectionId as unknown as number
    );
  }

  filterDataProduct(data: Product[]){
    var productId = sessionStorage.getItem('productId');
    this.products = data.filter(
      invoice => invoice.id == productId as unknown as number
    );
  }
}
