import { Section } from './../model/Section';
import { ProductsApiService } from './../service/products-api.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  public sections: Section[] = [];
  searchingName?: string;

  constructor(private service: ProductsApiService, private router: Router) { }

  ngOnInit(): void {
    this.service.getSections().subscribe(data => this.sections = data);
  }

  search(){
    if (this.searchingName == ""){
      this.ngOnInit();
    }
    else {
      this.sections = this.sections.filter(res => {
        return res.name.toString().match(this.searchingName as unknown as string);
      })
    }
  }

  toShoppingCard(productId: number, sectionName: string, sectionID: number){

    var newSection = this.sections.filter(
      section => section.name === sectionName
    );

    newSection.forEach(section => {
      var product = section.products?.filter(
        product => product.id === productId
      )

      if (product![0].amount! > 0){
        product![0].amount! -= 1;
      }
    }
    );

    sessionStorage.setItem('productId', productId as unknown as string);
    sessionStorage.setItem('sectionId', sectionID as unknown as string);
    this.router.navigate(['order']);
  }
}
