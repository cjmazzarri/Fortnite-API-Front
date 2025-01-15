import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ResponseDto } from '../model/api/responseDto.model';
import { BrItem, Cosmetic, CosmeticList, Items } from '../model/cosmetics/cosmetic.model';

@Injectable({
  providedIn: 'root'
})
export class CosmeticsService {
  constructor(private http: HttpClient) { }
  baseUrl: string = "https://fortnite-api.com/v2/cosmetics/";
  searchResultsSubj = new BehaviorSubject<ResponseDto<Array<BrItem>>>(new ResponseDto());
  searchResults$ = this.searchResultsSubj.asObservable();

  getNewItems(): Observable<ResponseDto<CosmeticList>> {
    return this.http.get<ResponseDto<CosmeticList>>(this.baseUrl + "new");
  }

  getAllItems(): Observable<ResponseDto<Items>> {
    return this.http.get<ResponseDto<Items>>(this.baseUrl);
  }

  searchBrItemsByName(searchTerm: string): Observable<ResponseDto<Array<BrItem>>> {
    return this.http.get<ResponseDto<Array<Cosmetic>>>(this.baseUrl + "br/search/all", 
      {
        params: {name: searchTerm, matchMethod: 'contains'}
      });
  }

  searchBrItemsBySet(setName: string): Observable<ResponseDto<Array<BrItem>>> {
    return this.http.get<ResponseDto<Array<Cosmetic>>>(this.baseUrl + "br/search/all", 
      {
        params: {set: setName, matchMethod: 'full'}
      });
  }

  getBrCosmeticDetail(id: string | null): Observable<ResponseDto<BrItem>> {
    return this.http.get<ResponseDto<BrItem>>(this.baseUrl + "br/" + id);
  }
}
