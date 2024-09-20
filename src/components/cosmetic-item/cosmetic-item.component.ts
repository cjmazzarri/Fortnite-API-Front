import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-cosmetic-item',
  standalone: true,
  imports: [],
  templateUrl: './cosmetic-item.component.html',
  styleUrl: './cosmetic-item.component.css'
})

export class CosmeticItemComponent {
  @Input() price: number = 0;
  @Input() itemName: string | undefined = "";
  @Input() image: string | undefined = "";
  @Input() rarity?: string = "";
  @Input() isJamTrack?: boolean = false;

}
