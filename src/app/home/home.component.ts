import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { ProductService } from '../_services/product.service';
declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  content: string;
  productList: any;
  rawResponse: any;

  constructor(private userService: UserService, private productService: ProductService) { }

  ngOnInit(): void {
    // this.userService.getPublicContent().subscribe(
    //   data => {
    //     this.content = data;
    //   },
    //   err => {
    //     this.content = JSON.parse(err.error).message;
    //   }
    // );

    this.productService.getProducts().subscribe(
      data => {
        this.rawResponse = data;
        this.productList = this.rawResponse.results;
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );
  }

}
