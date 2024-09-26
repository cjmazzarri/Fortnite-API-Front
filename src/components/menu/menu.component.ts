import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MaterialModule } from '../../app/material-module/material.module';
import { MenuOptionComponent } from './menu-option/menu-option.component';
import { Suboption } from '../../model/menu/suboption.model';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    MaterialModule,
    RouterOutlet,
    MenuOptionComponent
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit {
  cosmeticSuboptions: Suboption[] = [];
  useSidenav: boolean = false;
  constructor(private breakpointObs: BreakpointObserver) {
    breakpointObs.observe([
      Breakpoints.TabletLandscape,
      Breakpoints.HandsetLandscape,
      Breakpoints.HandsetPortrait,
      Breakpoints.TabletPortrait
    ]).subscribe((result) => {
      if (result.breakpoints[Breakpoints.HandsetPortrait] ||
        result.breakpoints[Breakpoints.HandsetLandscape] ||
        result.breakpoints[Breakpoints.TabletPortrait]) {
        this.useSidenav = true;
      } else {
        this.useSidenav = false;
      }
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

}
