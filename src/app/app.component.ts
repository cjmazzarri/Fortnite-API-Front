import { Component } from '@angular/core';
import { MenuComponent } from '../components/menu/menu.component';

@Component({
    selector: 'app-root',
    imports: [MenuComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Fortnite-API-Front';
}
