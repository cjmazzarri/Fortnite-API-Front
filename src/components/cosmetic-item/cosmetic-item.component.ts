import { afterNextRender, AfterRenderPhase, Component, Input, NgZone, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-cosmetic-item',
  standalone: true,
  imports: [],
  templateUrl: './cosmetic-item.component.html',
  styleUrl: './cosmetic-item.component.css'
})

export class CosmeticItemComponent implements OnInit, OnDestroy {
  @Input() price: number = 0;
  @Input() itemName: string | undefined = "";
  @Input() image: string | undefined = "";
  @Input() rarity?: string = "";
  @Input() isJamTrack?: boolean = false;

  @Input() images: Array<string | undefined> = [];
  timeSub: Subscription = new Subscription();
  index: number = 0;

  constructor(ngZone: NgZone) { 
    //allows the page to actually load bc of issue between SSR and intervals
    afterNextRender(() => {
      ngZone.run(() => {
        this.showcaseImages();
      });
    }, { phase: AfterRenderPhase.Write } )
  }

  ngOnInit(): void {
    
  }

  ngOnDestroy(): void {
    this.timeSub.unsubscribe();
  }

  showcaseImages() {
    if (this.images.length > 1) {
      this.timeSub = interval(5000).subscribe(() => {
        if (this.index < this.images.length - 1) {
          this.index++;
        } else {
          this.index = 0;
        }
        this.image = this.images[this.index];
      })
    }
  }
}
