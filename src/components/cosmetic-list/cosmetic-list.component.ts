
import { Component, Input, OnChanges } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleChange, MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIcon } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Bean, BrItem, Car, Cosmetic, Gamemode, Instrument, JamTrack, LegoSkin, Type } from '../../model/cosmetics/cosmetic.model';
import { ShopEntry } from '../../model/cosmetics/shop.model';
import { BreakpointService } from '../../services/breakpoint.service';
import { CosmeticsService } from '../../services/cosmetics.service';
import { Utils } from '../../util/utils';
import { CosmeticItemComponent } from '../cosmetic-item/cosmetic-item.component';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { ShopEntryComponent } from '../shop-entry/shop-entry.component';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
    selector: 'app-cosmetic-list',
    imports: [
        SearchBarComponent,
        MatButtonToggleModule,
        SearchBarComponent,
        CosmeticItemComponent,
        MatButtonModule,
        MatIcon,
        ShopEntryComponent,
        MatExpansionModule
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
  @Input() shopEntries?: Array<ShopEntry> = [];
  standaloneTracks: Array<ShopEntry> = [];
  search: string | null = "";
  typeFilters: Gamemode[] = [Gamemode.BattleRoyale, Gamemode.Festival, Gamemode.RocketRacing];
  gamemode = Gamemode;
  usingSidenav: boolean = true;
  currentRoute: string = "";
  endIndex: number = 20;
  currentCosmetics: Array<BrItem | Car | JamTrack | Instrument> = []; //cosmetics shown on screen (not all)
  showLoadMoreButton: boolean = true;
  loaded: boolean = false;
  layouts!: Partial<Record<string, ShopEntry[]>>;
  layoutsToDisplay: Array<ShopEntry[] | undefined> = [];

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
    
    if (this.shopEntries) {
      this.groupByLayout();
      
      /* for (let entry of this.shopEntries) {
        console.log(entry.tracks);        
        if (entry.tracks && !entry.brItems && !entry.cars && !entry.instruments) {          
          console.log('moved ', entry.devName)
          this.standaloneTracks.push(entry);
          let index = this.shopEntries.indexOf(entry);
          this.shopEntries.splice(index, 1);
        }
      } */
    }
  }

  ngOnDestroy(): void {
    this.timeSub.unsubscribe();
  }

  //Returns true if the shop entry contains only a Jam Track
  validateShopJamTrack(layout: ShopEntry[] | undefined) {
    return layout![0].layoutId.toLowerCase().includes('jamtrack');
  }

  getBrItemImages(item: BrItem | Cosmetic, legoSkins: Array<LegoSkin>, beans: Array<Bean>) {
    return Utils.getBrItemImages(item, legoSkins, beans);
  }

  //Check if the item is a 'BR item' bc we need to provide their
  //alternate images (lego or bean), or styles if present
  //other types of items don't have them
  isBrItem(item: BrItem | Car | Instrument | JamTrack) {
    return Utils.isBrItem(item);
  }

  getBrItemVariants(item: BrItem | Cosmetic) {
    return Utils.getBrItemVariants(item);
  }

  //Different types of objects have different structures, so image
  //names or locations (the image can be within another object) can
  //vary. By checking the type we can know how to provide the image
  //with its proper field name
  checkImageType(item: Cosmetic) {
    return Utils.checkImageType(item);
  }

  getCosmeticType(item: Cosmetic): Type {
    return Utils.getCosmeticType(item);
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

  groupByLayout() {
    this.layouts = Object.groupBy(this.shopEntries!, ({ layoutId }) => layoutId);
    console.log('unsorted layouts: ', this.layouts);
    this.sortLayoutsByRank();
    console.log('sorted: ', this.layoutsToDisplay);
    this.sortLayoutSubitems();
  }

  sortLayoutsByRank() {
    const layouts = Object.values(this.layouts);
    this.layoutsToDisplay = layouts.toSorted((a, b) => {
      if (a![0].layout.rank > b![0].layout.rank) {
        return -1;
      } else if (a![0].layout.rank < b![0].layout.rank) {
        return 1;
      }
      return 0;
    });
  }

  sortLayoutSubitems() {
    this.layoutsToDisplay.forEach((layout) => {
      layout?.sort((a, b) => {
        if (a.sortPriority > b.sortPriority) {
          return -1;
        } else if (a.sortPriority < b.sortPriority) {
          return 1;
        }
        return 0;
      })
    })
  }

}
