import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { Bean, BrItem, Car, Instrument, JamTrack, LegoSkin } from '../../model/cosmetics/cosmetic.model';
import { ShopEntry } from '../../model/cosmetics/shop.model';
import { ShopService } from '../../services/shop.service';
import { CosmeticListComponent } from '../cosmetic-list/cosmetic-list.component';

@Component({
  selector: 'app-item-shop',
  standalone: true,
  imports: [
    CosmeticListComponent,
    DatePipe
  ],
  templateUrl: './item-shop.component.html',
  styleUrl: './item-shop.component.scss'
})

export class ItemShopComponent implements OnInit  {
  entries: Array <ShopEntry> = [];
  brItems: Array<BrItem> = [];
  cars: Array<Car> = [];
  instruments: Array<Instrument> = [];
  jamTracks: Array<JamTrack> = [];
  beans: Array<Bean> = [];
  legoSkins: Array<LegoSkin> = [];  
  allCosmetics: Array<BrItem | Car | JamTrack | Instrument> = [];
  resetTime: Date = new Date();
  clock: Subscription = new Subscription();
  timeUntilReset: number = 0;

  constructor(
    private shopService: ShopService
  ) {    
    this.resetTime.setUTCHours(0, 0, 0, 0);    
  }
  ngOnInit(): void {
    this.calculateReset(); 
    this.getItems();
  }

  getItems() {
    this.shopService.getShopItems().subscribe(response => {
      if (response.status == 200) {
        this.entries = response.data.entries;        
        for (let entry of this.entries) {
          if (entry.brItems) {
            this.brItems = this.brItems.concat(entry.brItems);
          }
          
          if (entry.tracks) {
            this.jamTracks = this.jamTracks.concat(entry.tracks);
          }

          if (entry.instruments) {
            this.instruments = this.instruments.concat(entry.instruments);
          }

          if (entry.cars) {
            this.cars = this.cars.concat(entry.cars);
          }
        }
        this.allCosmetics = this.allCosmetics.concat(this.brItems, this.cars, this.jamTracks, this.instruments);
        this.allCosmetics = this.allCosmetics.filter((item) => item !== undefined); //remove undefined values from the array
      } else {
        console.error(response.error);
      }
    })
  }

  calculateReset() {
    this.clock = interval(1000).subscribe(() => {
      this.timeUntilReset = this.resetTime.getTime() - Date.now()
    });
  }

  /* prioritySort() {
    this.entries.sort((a, b) => {
      if (a.sortPriority > b.sortPriority) {
        return 1;
      } else if (a.sortPriority < b.sortPriority) { 
        return -1;
      }
      return 0;
    })
  } */
}
