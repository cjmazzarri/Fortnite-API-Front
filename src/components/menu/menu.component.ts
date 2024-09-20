import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MaterialModule } from '../../app/material-module/material.module';
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
  styleUrl: './menu.component.css'
})
export class MenuComponent {  }
