import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  AllOrders!: any[];

  

  constructor(private orderService : OrderService) {
    this.getAllOrders();
   }

  ngOnInit(): void {
    this.getAllOrders();
  }

  public getAllOrders() { this.orderService.getAllOrders().subscribe(data => { this.AllOrders = data; }); }

  deleteOrder(rowId:any)
  {
    this.orderService.deleteOrder(rowId).subscribe({
      next: data => {
        this.orderService.getAllOrders().subscribe({
          next: data => {
            this.getAllOrders();
          },
          error: err => {
            console.log(err);
          }
        });
      },
      error: err => {
        console.log(err);
      }
    });
  }
  

}


