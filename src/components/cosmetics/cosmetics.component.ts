import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Bean, BrItem, Car, Cosmetic, Gamemode, Instrument, JamTrack, LegoSkin, Type } from '../../model/cosmetics/cosmetic.model';
import { CosmeticsService } from '../../services/cosmetics.service';
import { CosmeticItemComponent } from '../cosmetic-item/cosmetic-item.component';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { NgStyle } from '@angular/common';
import { BreakpointService } from '../../services/breakpoint.service';
import { MatButtonToggle, MatButtonToggleChange, MatButtonToggleModule } from '@angular/material/button-toggle';
import { NgClass } from '@angular/common';
import { CosmeticListComponent } from '../cosmetic-list/cosmetic-list.component';

@Component({
  selector: 'app-cosmetics',
  standalone: true,
  imports: [
    CosmeticItemComponent,
    SearchBarComponent,
    NgStyle,
    MatButtonToggleModule,
    NgClass,
    CosmeticListComponent
  ],
  templateUrl: './cosmetics.component.html',
  styleUrl: './cosmetics.component.scss',
})
export class CosmeticsComponent implements OnInit, OnDestroy {
  constructor(
    private cosmeticsService: CosmeticsService,
    private breakpointService: BreakpointService) {
      breakpointService.useSidenav$.subscribe((useSidenav) => {
        this.usingSidenav = useSidenav;
      })
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
  typeFilters: Gamemode[] = [];
  gamemode = Gamemode;
  usingSidenav: boolean = true;

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
        this.brItems.map(item => item.gamemode = Gamemode.BattleRoyale);
        this.cars = response.data.items.cars;
        this.cars.map(item => item.gamemode = Gamemode.RocketRacing);
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
