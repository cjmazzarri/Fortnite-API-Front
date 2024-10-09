import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Bean, BrItem, Car, Cosmetic, Instrument, JamTrack, LegoSkin } from '../../model/cosmetics/cosmetic.model';
import { CosmeticsService } from '../../services/cosmetics.service';
import { CosmeticItemComponent } from '../cosmetic-item/cosmetic-item.component';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { NgStyle } from '@angular/common';
import { BreakpointService } from '../../services/breakpoint.service';

@Component({
  selector: 'app-cosmetics',
  standalone: true,
  imports: [
    CosmeticItemComponent,
    SearchBarComponent,
    NgStyle
  ],
  templateUrl: './cosmetics.component.html',
  styleUrl: './cosmetics.component.scss',
})
export class CosmeticsComponent implements OnInit, OnDestroy {
  constructor(
    private cosmeticsService: CosmeticsService,
    private breakpointService: BreakpointService) {
  }

  brItems: Array<BrItem> = [];
  cars: Array<Car> = [];
  instruments: Array<Instrument> = [];
  jamTracks: Array<JamTrack> = [];
  beans: Array<Bean> = [];
  legoSkins: Array<LegoSkin> = [];
  timeSub: Subscription = new Subscription; //Used to cycle images
  allCosmetics: Array<BrItem | Car | JamTrack | Instrument> = [];
  allAux: Array<BrItem | Car | JamTrack | Instrument> = [];
  search: string | null = "";
  showSearchbar: boolean = true;

  ngOnInit(): void {
    this.getNewItems();    
  }

  ngOnDestroy(): void {
    this.timeSub.unsubscribe();    
  }

  getNewItems() {
    this.cosmeticsService.getNewItems().subscribe(response => {
      if (response.status == 200) {
        this.brItems = response.data.items.br;
        this.cars = response.data.items.cars;
        this.instruments = response.data.items.instruments;
        this.jamTracks = response.data.items.tracks;
        this.legoSkins = response.data.items.lego;
        this.beans = response.data.items.beans;
        this.sortCosmetics();
      } else {
        //TODO: Dialog?
        console.log('Ocurrió un error');
      }
    })
  }

  getBrItemImages(item: BrItem | Cosmetic) {
    let imgArray: Array<string | undefined> = [];
    item.type.value == 'emoji' ? imgArray.push(item.images.smallIcon) : imgArray.push(item.images.icon);
    let legoStyle = this.legoSkins.find(skin => skin.cosmeticId == item.id);
    if (legoStyle) {
      imgArray.push(legoStyle.images.large);
    }
    let bean = this.beans.find(skin => skin.cosmeticId == item.id);
    if (bean) {
      imgArray.push(bean.images.large);
    }
    return imgArray;
  }

  //Check if the item is a 'BR item' bc we need to provide their
  //alternate images (lego or bean), or styles if present
  //other types of items don't have them
  isBrItem(item: BrItem | Car | Instrument | JamTrack) {
    if (item.type && item.type.value) {
      return item.type.value === 'outfit' || item.type.value === 'backpack' || item.type.value === 'pickaxe'
    } else return false;
  }

  getBrItemVariants(item: BrItem | Cosmetic) {
    let variants: Array<string | undefined> = [];
    if (item.variants) {
      for (let channel of item.variants) {
        for (let option of channel.options) {
          variants.push(option.image);
        }
      }
      return variants;
    } else {
      return [];
    }
  }

  //Different types of objects have different structures, so image
  //names or locations (the image can be within another object) can
  //vary. By checking the type we can know how to provide the image
  //with its proper field name
  checkImageType(item: Cosmetic) {
    let imgPath: string | undefined = '';
    if (item.type) {
      switch (item.type.value) {
        case 'backpack':
        case 'emote':
        case 'loadingscreen':
        case 'pickaxe':
        case 'spray':
        case 'wrap':
        case 'outfit':
          if (item.name == 'null') {
            imgPath = item.images.smallIcon;
          } else {
            imgPath = item.images.icon;
          }
          break;

        case 'emoji':
          imgPath = item.images.smallIcon;
          break;

        //Car related cosmetics
        case 'drifttrail':
        case 'booster':
        case 'skin':
        case 'body':
        case 'wheel':
          imgPath = item.images.large;
          break;

        //Festival cosmetics
        case 'mic':
        case 'bass':
        case 'guitar':
        case 'drum':
          imgPath = item.images.large;
          break;
      }
    } else {
      return item.albumArt;
    }
    return imgPath;
  }

  //Items from certain series might have a set of colors for a background gradient
  getItemColorGradient(item: Cosmetic): Array<string> {
    if (item.series) {
      return item.series.colors;
    } else {
      return [];
    }
  }

  //Items from certain series might have a background image
  getItemSeriesBackground(item: Cosmetic): string {
    if (item.series && item.series.image) {
      return 'url(' + item.series.image + ')';
    } else {
      return '';
    }
  }

  sortCosmetics(): void {
    this.allCosmetics = this.allCosmetics.concat(this.brItems, this.cars, this.jamTracks, this.instruments);
    this.allCosmetics.sort((a, b) => {
      if (a.added < b.added) {
        return 1;
      } else if (a.added > b.added) {
        return -1
      }
      return 0;
    });
    this.allAux = this.allCosmetics;
  }

  getSearchChange(search: string) {
    if (!search || search == "") {
      this.allCosmetics = this.allAux;
    } else {      
      let s = search.toLowerCase();
      let filtered = this.allCosmetics.filter((item) =>      
        (item.name? item.name.toLowerCase().match(s) : item.title?.toLowerCase().match(s))  
          || (item.rarity? item.rarity.value.match(s) : '')
      );
      
      this.allCosmetics = filtered;
    }
  }
}
