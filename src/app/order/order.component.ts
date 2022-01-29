import { Router } from '@angular/router';
import { Product } from './../model/Product';
import { ProductsApiService } from './../service/products-api.service';
import { Component, OnInit } from '@angular/core';
import {v4 as uuidv4} from 'uuid';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  public products: Product[] = [];
  public productId?: number;
  public sectionId?: number;

  first_name?: string;
  last_name?: string;
  password?: string;
  email?: string;
  cardNumber?: number;

  constructor(private service: ProductsApiService, private router: Router) { }

  ngOnInit(): void {
    var productId = sessionStorage.getItem('productId');
    var sectionId = sessionStorage.getItem('sectionId');
    this.productId = productId as unknown as number;
    this.sectionId = sectionId as unknown as number;

    this.service.getProducts().subscribe(data => this.filteringData(data));
  }

  filteringData(data: Product[]){
    this.products = data.filter(
      product => product.id == this.productId
    )
  }

  sendData(){
    var generateOrderName = uuidv4()+this.productId;
    this.service.postOrder({name: generateOrderName}).subscribe(data => this.sendClientData(data.id));
  }

  sendClientData(orderId: any){
    this.service.postClient({first_name: this.first_name as string, last_name: this.last_name as string, cardNumber: this.cardNumber as number, email: "", password: ""}, orderId).subscribe(data => this.postSalesInvoice(data.id, orderId));
    this.products[0].amount! -= 1;
    this.service.putProduct(this.products[0], this.sectionId, orderId).subscribe();

    sessionStorage.setItem('orderId', orderId);

    this.first_name = "";
    this.last_name = "";
    this.cardNumber = undefined;

    window.alert("Dziękujęmy za zakup w naszym sklepie! Twoje zlecenie o numerze: "+orderId+" jest realizowane.");
  }

  postSalesInvoice(clientId: number, orderId: any){
    this.service.postSalesInovice({name: uuidv4()}, this.sectionId, orderId, clientId).subscribe(data => {
      sessionStorage.setItem('clientId', clientId as unknown as string);
      sessionStorage.setItem('invoiceId', data.id);
      this.router.navigate(['summary']);
    });
  }
}
