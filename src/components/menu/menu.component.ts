import { Component } from '@angular/core';
import { MaterialModule } from '../../app/material-module/material.module';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {

}
