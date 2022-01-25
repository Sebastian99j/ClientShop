import { Product } from './../model/Product';
import { Order } from './../model/Order';
import { Client } from './../model/Client';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Section } from './../model/Section';

@Injectable({
  providedIn: 'root'
})
export class ProductsApiService {

  private url = 'http://localhost:8080/api/sections';
  private url2 = 'http://localhost:8080/api/clients';
  private url3 = 'http://localhost:8080/api/orders';
  private url4 = 'http://localhost:8080/api/products';

  constructor(private http: HttpClient) { }

  getSections(): Observable<Section[]>{
    return this.http.get<Section[]>(this.url)
      .pipe(tap(console.log));
  }

  getClients(): Observable<Client[]>{
    return this.http.get<Client[]>(this.url2)
      .pipe(tap(console.log));
  }

  postClient(client: Client, id?: number){
    return this.http.post(this.url2+'/save/'+id, client)
      .pipe(tap(console.log));
  }

  getOrders(): Observable<Order[]>{
    return this.http.get<Order[]>(this.url3)
      .pipe(tap(console.log));
  }

  postOrder(order: Order): Observable<Order>{
    return this.http.post(this.url3, order)
      .pipe(tap(console.log));
  }

  postProduct(product: Product, id1?: number, id2?: number){
    return this.http.post(this.url4+'/save/'+id1+"/"+id2, product)
      .pipe(tap(console.log));
  }

  getProducts(): Observable<Product[]>{
    return this.http.get<Product[]>(this.url4)
      .pipe(tap(console.log));
  }

  putProduct(product: Product, id1: number | undefined, id2: number | undefined): Observable<{}>{
    return this.http.put<{}>(this.url4+'/put/'+id1+"/"+id2, product)
      .pipe(tap(console.log));
  }
}
