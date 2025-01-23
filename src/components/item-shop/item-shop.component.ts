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

export class ItemShopComponent implements OnInit {
  entries: Array<ShopEntry> = [];
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
  shopReset: string = "";

  constructor(
    private shopService: ShopService
  ) {
    this.resetTime.setUTCDate(this.resetTime.getDate() + 1)
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
          if (entry.tracks) {
            entry.tracks = entry.tracks.filter((item) => item !== undefined);
          }
        }
      } else {
        console.error(response.error);
      }
    })
  }

  calculateReset() {
    this.clock = interval(1000).subscribe(() => {
      let now = new Date();
      /* this.timeUntilReset = this.resetTime.getTime() - now.getTime(); */
      let today = new Date();
      let resta = 0;
      resta = this.resetTime.getTime() - today.getTime();
      let difHrs = Math.floor(resta / (1000 * 60 * 60))
      let difMins = Math.floor(resta / (1000 * 60))
      let difSecs = Math.floor(resta / 1000);
      let displayMins = 0;
      displayMins = Math.floor(((difMins / 60) - difHrs) * 60)
      let displaySecs = 0;
      displaySecs = Math.floor(((difSecs / 60) - difMins) * 60)
      this.shopReset = difHrs + ':' + displayMins + ':' + displaySecs;
    });
  }
}
