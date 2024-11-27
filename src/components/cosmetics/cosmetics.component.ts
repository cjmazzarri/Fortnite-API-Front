import { Component, OnInit } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { ActivatedRoute } from '@angular/router';
import { Bean, BrItem, Car, Gamemode, Instrument, JamTrack, LegoSkin } from '../../model/cosmetics/cosmetic.model';
import { BreakpointService } from '../../services/breakpoint.service';
import { CosmeticsService } from '../../services/cosmetics.service';
import { CosmeticListComponent } from '../cosmetic-list/cosmetic-list.component';

@Component({
  selector: 'app-cosmetics',
  standalone: true,
  imports: [    
    MatButtonToggleModule,
    CosmeticListComponent,
  ],
  templateUrl: './cosmetics.component.html',
  styleUrl: './cosmetics.component.scss',
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
          break;

        case "all":
          this.title = "All cosmetics";
          this.description = "This page shows every item in the API.";
          break;

        case "search":
          this.title = "Search results";
          this.description = "Any items found within your search are shown here.";
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
        this.brItems.forEach(item => item.gamemode = Gamemode.BattleRoyale);
        this.cars = response.data.items.cars;
        this.cars.forEach(item => item.gamemode = Gamemode.RocketRacing);
        this.instruments = response.data.items.instruments;
        this.instruments.forEach(item => item.gamemode = Gamemode.Festival);
        this.jamTracks = response.data.items.tracks;
        this.jamTracks.forEach(item => item.gamemode = Gamemode.Festival);
        this.legoSkins = response.data.items.lego;
        this.beans = response.data.items.beans;
        this.allCosmetics = this.allCosmetics.concat(this.brItems, this.cars, this.jamTracks, this.instruments);
        this.allCosmetics = this.allCosmetics.filter((item) => item !== undefined); //remove undefined values from the array
        this.allAux = this.allCosmetics;
        this.sortCosmetics();
      } else {
        //TODO: Dialog?
        console.log('Ocurrió un error');
      }
    })
  }

  getSearchItems() {
    this.cosmeticsService.searchResults$.subscribe((items) => {
      this.allCosmetics = items;
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
        this.sortCosmetics();
      } else {
        //TODO: Dialog?
        console.log('Ocurrió un error');
      }
    })
  }

  sortCosmetics(): void {
    this.allCosmetics.sort((a, b) => {
      if (a.added < b.added) {
        return 1;
      } else if (a.added > b.added) {
        return -1
      }
      return 0;
    });
  }

}
