
import { Component, Input, OnChanges } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleChange, MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIcon } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Bean, BrItem, Car, Cosmetic, Gamemode, Instrument, JamTrack, LegoSkin, Type } from '../../model/cosmetics/cosmetic.model';
import { BreakpointService } from '../../services/breakpoint.service';
import { CosmeticsService } from '../../services/cosmetics.service';
import { CosmeticItemComponent } from '../cosmetic-item/cosmetic-item.component';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { Utils } from '../../util/utils';

@Component({
  selector: 'app-cosmetic-list',
  standalone: true,
  imports: [
    SearchBarComponent,
    MatButtonToggleModule,
    SearchBarComponent,
    CosmeticItemComponent,
    MatButtonModule,
    MatIcon
  ],
  templateUrl: './cosmetic-list.component.html',
  styleUrl: './cosmetic-list.component.scss'
})
export class CosmeticListComponent implements OnChanges {
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
  typeFilters: Gamemode[] = [Gamemode.BattleRoyale, Gamemode.Festival, Gamemode.RocketRacing];
  gamemode = Gamemode;
  usingSidenav: boolean = true;
  currentRoute: string = "";
  endIndex: number = 20;
  currentCosmetics: Array<BrItem | Car | JamTrack | Instrument> = []; //cosmetics shown on screen (not all)
  showLoadMoreButton: boolean = true;
  loaded: boolean = false;

  constructor(
    private cosmeticsService: CosmeticsService,
    private breakpointService: BreakpointService,
    public route: ActivatedRoute
  ) {
    breakpointService.useSidenav$.subscribe((useSidenav) => {
      this.usingSidenav = useSidenav;
    });
    this.route.url.subscribe(params => {
      this.currentRoute = params[0].path;
    });    
  }

  //Waits until allCosmetics has received the values via @Input
  ngOnChanges(): void {
    this.currentCosmetics = this.allCosmetics.slice(0, this.endIndex);
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
      return item.type.value === 'outfit' || 
        item.type.value === 'backpack' || 
        item.type.value === 'pickaxe' || 
        item.type.value === 'wrap' || 
        item.type.value === 'emote' || 
        item.type.value === 'glider' || 
        item.type.value === 'contrail' || 
        item.type.value === 'emoji' || 
        item.type.value === 'loadingscreen' || 
        item.type.value === 'spray' ||
        item.type.value === 'shoe' || 
        item.type.value === 'petcarrier'
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
        case 'aura':
        case 'shoe':
        case 'petcarrier':
        case 'pet':
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
          if (item.images) {
            if (item.images.large) {
              imgPath = item.images.large;
            } else {
              imgPath = item.images.small;
            }
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
    return Utils.getItemColorGradient(item);
  }

  //Items from certain series might have a background image
  getItemSeriesBackground(item: Cosmetic): string {
    return Utils.formatItemSeriesBackground(item);
  }

  //Previously used to filter through the current array
  /* getSearchChange(search: string): void {
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
  } */  

  filterCosmetics(selectedFiltersChange: MatButtonToggleChange): void {
    this.typeFilters = selectedFiltersChange.value;
    if (this.currentRoute == 'latest') {
      //this.allCosmetics = this.allAux;
      this.allCosmetics = this.allCosmetics.filter((item) => this.typeFilters.indexOf(item.gamemode) > -1);
    }
    if (this.currentRoute == 'all' || this.currentRoute == 'search') {
      this.currentCosmetics = this.allCosmetics.slice(0, this.endIndex);
      this.currentCosmetics = this.currentCosmetics.filter((item) => this.typeFilters.indexOf(item.gamemode) > -1);
    }
  }

  loadMore() {
    this.endIndex += 20;
    if (!this.atSearch()) {
      this.currentCosmetics = this.allCosmetics.filter((item) => this.typeFilters.indexOf(item.gamemode) > -1);
    }    
    this.currentCosmetics = this.allCosmetics.slice(0, this.endIndex);    
  }

  atSearch(): boolean {
    return this.currentRoute == "search";
  }
}
