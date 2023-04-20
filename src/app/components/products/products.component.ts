import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../responses/product';
import { ProductResponsetDTO } from '../responses/product-response-dto';
import { CartService } from '../services/cart.service';
import { CartResponse } from '../responses/cart-response';
import { AppComponent } from 'src/app/app.component';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {


  AllProductsResponse: ProductResponsetDTO[] = [];
  Cart! : CartResponse;

  constructor(private productService: ProductService, private elementRef: ElementRef, private renderer: Renderer2,
    private cartService: CartService, private appComponent: AppComponent) { 

  }

  ngOnInit(): void {
    this.getAllProductsList();
  }
  

  getAllProductsList() {
    this.productService.getAllProducts().subscribe(data => {      
      this.AllProductsResponse = data;
    });
  }
    
  getCart() { this.cartService.getCart().subscribe(data => { this.Cart = data; }); }

  addToCart(ProductId: any,SizeId: any) {
    let confirmAddToCart = confirm("Add product to cart");
    if (confirmAddToCart)
    {
      let product = {
        productId: ProductId,
        sizeId: SizeId 
      }
      this.productService.addToCart(product).subscribe({
        complete: () => {
          console.log("Complate");
          
          this.appComponent.getCart();

          // document.getElementsByClassName('aa').nativeElement.

          // const div = this.elementRef.nativeElement.querySelector('.dropdown-menu');
          // this.renderer.addClass(div, 'show');
        },
        error: err => {
          console.log("Error");
          console.log(err);
          
        }
      });
    }
    
  }


}
