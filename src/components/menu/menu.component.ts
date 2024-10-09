import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MaterialModule } from '../../app/material-module/material.module';
import { Suboption } from '../../model/menu/suboption.model';
import { BreakpointService } from '../../services/breakpoint.service';
import { MenuOptionComponent } from './menu-option/menu-option.component';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    MaterialModule,
    RouterOutlet,
    MenuOptionComponent
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnInit {
  cosmeticSuboptions: Suboption[] = [];
  useSidenav: boolean = false;
  showSearchbar: boolean = true;  
  
  constructor(private breakpointService: BreakpointService) {
    this.breakpointService.useSidenav$.subscribe((value) => {      
      this.useSidenav = value;
    });
    this.breakpointService.searchbarShow$.subscribe((show) => {
      this.showSearchbar = show;
    })
  }

  ngOnInit(): void {
    this.addSuboptions();
  }

  addSuboptions() {
    this.cosmeticSuboptions.push(
      new Suboption('fiber_new', 'Latest', '/'),
      new Suboption('density_small', 'All', '/all-cosmetics'),
    )
  }

  toggleSearch(value: boolean) {
    this.breakpointService.toggleSearchbar(value);
  }

}
