import { AllOrdersResponseDTO } from './../responses/all-orders-response-dto';
import { AddOrderRequestDTO } from './../responses/add-order-request-dto';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpClient: HttpClient) { }

  addNewOrder(requestBody: AddOrderRequestDTO) {
    return this.httpClient.post<any>(`${environment.apiUrl}/Orders`, requestBody);
  }


  getAllOrders(): Observable<AllOrdersResponseDTO[]> {
    return this.httpClient.get<AllOrdersResponseDTO[]>(`${environment.apiUrl}/Orders`);
  }

  deleteOrder(OederId: number) {
    return this.httpClient.delete<any>(`${environment.apiUrl}/Orders/${OederId}`);
  }
}
