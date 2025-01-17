import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseDto } from '../model/api/responseDto.model';
import { Shop } from '../model/cosmetics/shop.model';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  constructor(private http: HttpClient) { }
  url: string = "https://fortnite-api.com/v2/shop";

  getShopItems(): Observable<ResponseDto<Shop>> {
    return this.http.get<ResponseDto<Shop>>(this.url);
  }
}
