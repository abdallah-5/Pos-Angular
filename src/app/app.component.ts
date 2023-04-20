
import { FormBuilder, FormGroup } from '@angular/forms';
import { CartResponse } from './components/responses/cart-response';
import { AfterViewInit,Component,OnInit, ViewChild  } from '@angular/core';
import * as feather from 'feather-icons';
import { CartService } from './components/services/cart.service';
import { OrderService } from './components/services/order.service';
import { AddOrderRequestDTO } from './components/responses/add-order-request-dto';
import { OrdersComponent } from './components/orders/orders.component';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit, AfterViewInit {

  Cart! : CartResponse | null;
  AddOrderForm!: FormGroup;
  
  // @ViewChild(OrdersComponent)
  // private ordersComponent!: OrdersComponent;

  constructor(private fb: FormBuilder,private cartService: CartService,private orderService: OrderService) { }

  ngOnInit(): void {
    this.getCart();
    this.formCreation();
  }

  formCreation() {
    this.AddOrderForm = this.fb.group({
      userName: this.fb.control(null),
      phone: this.fb.control(null),
    });
  }

  getCart() {
    this.cartService.getCart().subscribe(data => {
      this.Cart = data.responseModel?.length > 0 ? data : null;
    });
  }


  addNewOrder(requestBody: any) {

    if (!this.Cart) return;
   
    let order: AddOrderRequestDTO = {
      totalPrice: this.Cart.orderTotal,
      userName : requestBody.userName,
      phone : requestBody.phone
    }
    

    this.orderService.addNewOrder(order).subscribe({
      complete: () => {
        this.getCart();
        this.AddOrderForm.reset(this.formCreation());
        this.Cart = null;
      },
      error: err => {
        console.log(err);
      }
    });
    
  }

  deleteProductFromCart(id:number)
  {
    this.cartService.deleteProductFromCart(id).subscribe({
      error: err => {
        console.log(err);
      },
      complete: () => {
        this.getCart();
        console.log(this.Cart);
        
      }
    });
  }

  
  
  

  ngAfterViewInit() {
    feather.replace();
  }

  title = 'posAngular';

  
}
