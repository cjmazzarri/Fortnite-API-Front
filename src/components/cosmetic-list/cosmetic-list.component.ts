import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BrItem, Car, Instrument, JamTrack, Bean, LegoSkin, Gamemode, Cosmetic, Type } from '../../model/cosmetics/cosmetic.model';
import { MatButtonToggleChange, MatButtonToggleModule } from '@angular/material/button-toggle';
import { CosmeticsService } from '../../services/cosmetics.service';
import { BreakpointService } from '../../services/breakpoint.service';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { NgClass, NgStyle } from '@angular/common';
import { CosmeticItemComponent } from '../cosmetic-item/cosmetic-item.component';

@Component({
  selector: 'app-cosmetic-list',
  standalone: true,
  imports: [
    NgStyle,
    NgClass,
    SearchBarComponent,
    MatButtonToggleModule,
    SearchBarComponent,
    CosmeticItemComponent
  ],
  templateUrl: './cosmetic-list.component.html',
  styleUrl: './cosmetic-list.component.scss'
})
export class CosmeticListComponent implements OnInit, OnDestroy {
  @Input() brItems: Array<BrItem> = [];
  @Input() cars: Array<Car> = [];
  @Input() instruments: Array<Instrument> = [];
  @Input() jamTracks: Array<JamTrack> = [];
  @Input() beans: Array<Bean> = [];
  @Input() legoSkins: Array<LegoSkin> = [];
  timeSub: Subscription = new Subscription; //Used to cycle images
  @Input() allCosmetics: Array<BrItem | Car | JamTrack | Instrument> = [];
  @Input() allAux: Array<BrItem | Car | JamTrack | Instrument> = [];
  search: string | null = "";
  typeFilters: Gamemode[] = [];
  gamemode = Gamemode;
  usingSidenav: boolean = true;

  constructor(
    private cosmeticsService: CosmeticsService,
    private breakpointService: BreakpointService
  ) {
    breakpointService.useSidenav$.subscribe((useSidenav) => {
      this.usingSidenav = useSidenav;
    })
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.timeSub.unsubscribe();
  }

  getBrItemImages(item: BrItem | Cosmetic) {
    let imgArray: Array<string | undefined> = [];
    item.type.value == 'emoji' ? imgArray.push(item.images.smallIcon) : imgArray.push(item.images.icon);
    let legoStyle = this.legoSkins.find(skin => skin.cosmeticId == item.id);
    if (legoStyle) {
      if (legoStyle.images && legoStyle.images.large) {
        imgArray.push(legoStyle.images.large);
      }
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
      return item.type.value === 'outfit' || item.type.value === 'backpack' || item.type.value === 'pickaxe' || item.type.value === 'wrap'
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
        case 'contrail':
        case 'glider':
        case 'music':
        case 'banner':
          if (item.images.icon) {
            imgPath = item.images.icon
          } else {
            imgPath = item.images.smallIcon;
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
          if (item.images.large) {
            imgPath = item.images.large;
          } else {
            imgPath = item.images.small;
          }
          break;

        //Festival cosmetics
        case 'mic':
        case 'bass':
        case 'guitar':
        case 'keyboard':
        case 'drum':
          imgPath = item.images.large;
          break;
      }
    } else {
      return item.albumArt;
    }
    return imgPath;
  }

  getCosmeticType(item: Cosmetic): Type {
    //jam tracks don't have the type property
    if (!item.type) {
      let type = new Type();
      type.value = 'jamtrack';
      type.displayValue = 'Jam Track';
      return type;
    }
    else return item.type;
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


  getSearchChange(search: string): void {
    if (!search || search == "") {
      this.allCosmetics = this.allAux;
    } else {
      let s = search.toLowerCase();
      let filtered = this.allCosmetics.filter((item) =>
        (item.name ? item.name.toLowerCase().match(s) : item.title?.toLowerCase().match(s))
        || (item.rarity ? item.rarity.value.match(s) : '')
      );
      this.allCosmetics = filtered;
    }
  }

  filterCosmetics(selectedFiltersChange: MatButtonToggleChange): void {
    this.typeFilters = selectedFiltersChange.value;    
    this.allCosmetics = this.allAux;
    this.allCosmetics = this.allCosmetics.filter((item) => this.typeFilters.indexOf(item.gamemode) > -1);
  }
}
