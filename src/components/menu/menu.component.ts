import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MaterialModule } from '../../app/material-module/material.module';
import { MenuOptionComponent } from './menu-option/menu-option.component';
import { Suboption } from '../../model/menu/suboption.model';

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
