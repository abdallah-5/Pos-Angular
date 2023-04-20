import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AddToCartRequestDTO } from '../responses/add-to-cart-request-dto';
import { ProductResponsetDTO } from '../responses/product-response-dto';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {


  constructor(private httpClient: HttpClient, ) { }

  getAllProducts(): Observable<ProductResponsetDTO[]> {
    return this.httpClient.get<ProductResponsetDTO[]>(`${environment.apiUrl}/Products`);
  }

  
  
  addToCart(Product : AddToCartRequestDTO) {
   
    return this.httpClient.post<AddToCartRequestDTO>(`${environment.apiUrl}/Cart`,Product);
  }
}
