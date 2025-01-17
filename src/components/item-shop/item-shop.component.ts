import { Component } from '@angular/core';
import { CosmeticListComponent } from '../cosmetic-list/cosmetic-list.component';
import { BrItem, Car, Instrument, JamTrack, Bean, LegoSkin } from '../../model/cosmetics/cosmetic.model';
import { ShopService } from '../../services/shop.service';
import { OnInit } from '@angular/core';
import { ShopEntry } from '../../model/cosmetics/shop.model';

@Component({
  selector: 'app-item-shop',
  standalone: true,
  imports: [
    CosmeticListComponent
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

  constructor(
    private shopService: ShopService
  ) {

  }
  ngOnInit(): void {
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
}
