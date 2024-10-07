import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MaterialModule } from '../../app/material-module/material.module';
import { MenuOptionComponent } from './menu-option/menu-option.component';
import { Suboption } from '../../model/menu/suboption.model';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { BehaviorSubject, Observable } from 'rxjs';
import { BreakpointService } from '../../services/breakpoint.service';

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
  
  constructor(private breakpointService: BreakpointService) {
    this.breakpointService.useSidenav$.subscribe((value) => {      
      this.useSidenav = value;
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
