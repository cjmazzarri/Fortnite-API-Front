import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseDto } from '../model/api/responseDto.model';
import { CosmeticList } from '../model/cosmetics/cosmetic.model';

@Injectable({
  providedIn: 'root'
})
export class CosmeticsService {
  constructor(private http: HttpClient) { }

  getNewItems(): Observable<ResponseDto<CosmeticList>> {
    return this.http.get<ResponseDto<CosmeticList>>("https://fortnite-api.com/v2/cosmetics/new");
  }
}
