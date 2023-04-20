import { CartResponse } from './../responses/cart-response';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private httpClient: HttpClient) { }

  getCart(): Observable<CartResponse> {
    return this.httpClient.get<CartResponse>(`${environment.apiUrl}/Cart`);
  }

  deleteProductFromCart(id: number) {
    return this.httpClient.post(`${environment.apiUrl}/Cart/Delete`, id);
  }

}
