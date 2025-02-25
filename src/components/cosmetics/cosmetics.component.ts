import { Component, OnInit } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { ActivatedRoute } from '@angular/router';
import { Bean, BrItem, Car, Cosmetic, Gamemode, Instrument, JamTrack, LegoSkin } from '../../model/cosmetics/cosmetic.model';
import { BreakpointService } from '../../services/breakpoint.service';
import { CosmeticsService } from '../../services/cosmetics.service';
import { CosmeticListComponent } from '../cosmetic-list/cosmetic-list.component';

function filterNullNameItems(item: Cosmetic) {
    if (item.gamemode == Gamemode.Festival) {
      if (item.devname != 'null') {
        return true;
      } else {
        return false;
      }
    } else if (item.name != 'null') {
      return true;
    } else {
      return false;
    }
}

@Component({
    selector: 'app-cosmetics',
    imports: [
        MatButtonToggleModule,
        CosmeticListComponent,
    ],
    templateUrl: './cosmetics.component.html',
    styleUrl: './cosmetics.component.scss'
})

export class CosmeticsComponent implements OnInit {
  constructor(
    private cosmeticsService: CosmeticsService,
    private breakpointService: BreakpointService,
    public route: ActivatedRoute) {
    breakpointService.useSidenav$.subscribe((useSidenav) => {
      this.usingSidenav = useSidenav;
    });
    this.route.url.subscribe(params => {
      this.currentRoute = params[0].path;
      switch (this.currentRoute) {
        case "latest":
          this.title = "Latest cosmetics";
          this.description = "This page shows the latest items added to the API. This means they might or might not be in the game yet.";
          this.orderText = "by newest first"
          break;

        case "all":
          this.title = "All cosmetics";
          this.description = "This page shows every item in the API.";
          this.orderText = "alphabetically"
          break;

        case "search":
          this.title = "Search results";
          this.description = "Any items found within your search are shown here.";
          this.orderText = "by newest first"
      }     
    })
  }

  title: string = "";
  description: string = "";
  currentRoute: string = "";
  brItems: Array<BrItem> = [];
  cars: Array<Car> = [];
  instruments: Array<Instrument> = [];
  jamTracks: Array<JamTrack> = [];
  beans: Array<Bean> = [];
  legoSkins: Array<LegoSkin> = [];  
  allCosmetics: Array<BrItem | Car | JamTrack | Instrument> = [];
  allAux: Array<BrItem | Car | JamTrack | Instrument> = [];
  search: string | null = "";
  typeFilters: Gamemode[] = [];
  gamemode = Gamemode;
  usingSidenav: boolean = true;
  orderText: string = "";

  ngOnInit(): void {
    switch (this.currentRoute) {
      case 'latest':
        this.getNewItems();
        break;

      case 'all':
        this.getAllItems();
        break;

      case 'search':
        this.getSearchItems();
        break;
    }
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
        this.assignGamemodes();
        this.allCosmetics = this.allCosmetics.concat(this.brItems, this.cars, this.jamTracks, this.instruments);
        this.allCosmetics = this.allCosmetics.filter((item) => item !== undefined); //remove undefined values from the array
        this.allAux = this.allCosmetics;
        this.sortCosmeticsByDate();
      } else {
        //TODO: Dialog?
        console.log('Ocurrió un error');
      }
    })
  }

  assignGamemodes() {
    this.brItems != undefined ? this.brItems.forEach(item => item.gamemode = Gamemode.BattleRoyale) : '';
    this.cars != undefined ? this.cars.forEach(item => item.gamemode = Gamemode.RocketRacing) : '';
    this.instruments != undefined ? this.instruments.forEach(item => item.gamemode = Gamemode.Festival) : '';
    this.jamTracks != undefined ? this.jamTracks.forEach(item => item.gamemode = Gamemode.Festival) : '';
  }

  getSearchItems() {
    this.cosmeticsService.searchResults$.subscribe(response => {
      if (response.status == 200) {
        this.allCosmetics = response.data;        
        this.allCosmetics = this.allCosmetics.concat(this.brItems, this.cars, this.jamTracks, this.instruments);
        this.allCosmetics = this.allCosmetics.filter((item) => item !== undefined); //remove undefined values from the array
      }
    })
  }

  getAllItems() {
    this.cosmeticsService.getAllItems().subscribe(response => {
      if (response.status == 200) {
        this.brItems = response.data.br;
        this.brItems.forEach(item => item.gamemode = Gamemode.BattleRoyale);
        this.cars = response.data.cars;
        this.cars.forEach(item => item.gamemode = Gamemode.RocketRacing);
        this.instruments = response.data.instruments;
        this.instruments.forEach(item => item.gamemode = Gamemode.Festival);
        this.jamTracks = response.data.tracks;
        this.jamTracks.forEach(item => item.gamemode = Gamemode.Festival);
        this.legoSkins = response.data.lego;
        this.beans = response.data.beans;
        this.allCosmetics = this.allCosmetics.concat(this.brItems, this.cars, this.jamTracks, this.instruments);
        this.allCosmetics = this.allCosmetics.filter((item) => item !== undefined); //remove undefined values from the array
        this.allAux = this.allCosmetics;
        this.sortCosmeticsAlphabetically();
      } else {
        //TODO: Dialog?
        console.log('Ocurrió un error');
      }
    })
  }

  //Most recent first
  sortCosmeticsByDate(): void {
    this.allCosmetics.sort((a, b) => {
      if (a.added < b.added) {
        return 1;
      } else if (a.added > b.added) {
        return -1
      }
      return 0;
    });
  }

  sortCosmeticsAlphabetically(): void {
    this.allCosmetics.sort((a, b) => {
      if (a.name! < b.name!) {
        return -1;
      } else if (a.name! > b.name!) {
        return 1
      }
      return 0;
    });
    this.allCosmetics = this.allCosmetics.filter(filterNullNameItems);
  }

}
