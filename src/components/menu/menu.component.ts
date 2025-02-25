import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MaterialModule } from '../../app/material-module/material.module';
import { Suboption } from '../../model/menu/suboption.model';
import { BreakpointService } from '../../services/breakpoint.service';
import { MenuOptionComponent } from './menu-option/menu-option.component';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-menu',
    imports: [
        MaterialModule,
        RouterOutlet,
        MenuOptionComponent,
        RouterLink
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
  }

  ngOnInit(): void {
    this.addSuboptions();
  }

  addSuboptions() {
    this.cosmeticSuboptions.push(
      new Suboption('fiber_new', 'Latest', '/cosmetics/latest'),
      new Suboption('density_small', 'All', '/cosmetics/all'),
    )
  }
}
