import { Component } from '@angular/core';
import { CosmeticItemComponent } from '../cosmetic-item/cosmetic-item.component';

@Component({
  selector: 'app-cosmetics',
  standalone: true,
  imports: [CosmeticItemComponent],
  templateUrl: './cosmetics.component.html',
  styleUrl: './cosmetics.component.css'
})
export class CosmeticsComponent {

}
