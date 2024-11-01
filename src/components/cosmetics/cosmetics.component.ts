import { NgClass, NgStyle } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Bean, BrItem, Car, Gamemode, Instrument, JamTrack, LegoSkin } from '../../model/cosmetics/cosmetic.model';
import { BreakpointService } from '../../services/breakpoint.service';
import { CosmeticsService } from '../../services/cosmetics.service';
import { CosmeticItemComponent } from '../cosmetic-item/cosmetic-item.component';
import { CosmeticListComponent } from '../cosmetic-list/cosmetic-list.component';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import {ScrollingModule} from '@angular/cdk/scrolling';

@Component({
  selector: 'app-cosmetics',
  standalone: true,
  imports: [
    CosmeticItemComponent,
    SearchBarComponent,
    NgStyle,
    MatButtonToggleModule,
    NgClass,
    CosmeticListComponent,    
  ],
  templateUrl: './cosmetics.component.html',
  styleUrl: './cosmetics.component.scss',
})

export class CosmeticsComponent implements OnInit, OnDestroy {
  constructor(
    private cosmeticsService: CosmeticsService,
    private breakpointService: BreakpointService,
    public route: ActivatedRoute) {
      breakpointService.useSidenav$.subscribe((useSidenav) => {
        this.usingSidenav = useSidenav;
      });
      this.route.url.subscribe(params => {
        this.currentRoute = params[0].path;
        if (this.currentRoute == "latest") {
          this.title = "Latest cosmetics"
          this.description = "This page shows the latest items added to the API. This means they might or might not be in the game yet."
        }
        if (this.currentRoute == "all") {
          this.title = "All cosmetics"
          this.description = "This page shows every item in the API."
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
  timeSub: Subscription = new Subscription; //Used to cycle images
  allCosmetics: Array<BrItem | Car | JamTrack | Instrument> = [];
  allAux: Array<BrItem | Car | JamTrack | Instrument> = [];
  search: string | null = "";
  typeFilters: Gamemode[] = [];
  gamemode = Gamemode;
  usingSidenav: boolean = true;

  ngOnInit(): void {
    switch(this.currentRoute) {
      case 'latest':
        this.getNewItems();
        break;
      
      case 'all':
        this.getAllItems();
        break;
    }
  }

  //TODO: inicializar arreglos?

  ngOnDestroy(): void {
    this.timeSub.unsubscribe();
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
