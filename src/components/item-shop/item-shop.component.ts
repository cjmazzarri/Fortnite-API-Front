import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { interval, map, Subscription, takeWhile } from 'rxjs';
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
  timeLeft: string = '';

  constructor(
    private shopService: ShopService
  ) { }
  ngOnInit(): void {    
    this.getItems();
    interval(1000)
      .pipe(
        map(() => this.calculateReset()),
      )
      .subscribe(time => {
        this.timeLeft = `${time.hours}h ${time.minutes}m ${time.seconds}s`;
      });
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
    const now = new Date();
    const utcNow = new Date(now.toUTCString());    
    const nextReset = new Date(utcNow);
    nextReset.setUTCDate(nextReset.getUTCDate() + 1);
    nextReset.setUTCHours(0, 0, 0, 0);
    const difference = nextReset.getTime() - utcNow.getTime(); //diff in milliseconds
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    return { total: difference, hours, minutes, seconds };
  }
}
