import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item } from '../responses/item';
import { AllItemsResponse } from '../responses/all-items-response';
import { ItemAddRequestDTO } from '../responses/item-add-request-dto';
import { ItemResponse } from '../responses/item-response';
import { ItemUpdateRequestDTO } from '../responses/item-update-request-dto';


import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private httpClient: HttpClient) { }


  getAllItems(): Observable<AllItemsResponse[]> {
    return this.httpClient.get<AllItemsResponse[]>(`${environment.apiUrl}/Items`);
  }

  addNewItem(requestBody: ItemAddRequestDTO) {
    return this.httpClient.post(`${environment.apiUrl}/Items`, requestBody);
  }

  getItemById(id: number) {
    return this.httpClient.get<ItemResponse>(`${environment.apiUrl}/Items/${id}`);
  }

  updateItem(requestBody: ItemUpdateRequestDTO, itemId: number) {
    return this.httpClient.put(`${environment.apiUrl}/Items/${itemId}`, requestBody);
  }
}
