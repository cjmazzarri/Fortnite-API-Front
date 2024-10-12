import { NgStyle } from '@angular/common';
import { Component, Input, OnDestroy } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MAT_MENU_PANEL, MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { interval, Subscription } from 'rxjs';
import { BreakpointService } from '../../services/breakpoint.service';

@Component({
  selector: 'app-cosmetic-item',
  standalone: true,
  imports: [
    MatIconModule,
    MatMenuModule,
    NgStyle,
    MatProgressSpinnerModule
  ],
  providers: [
    {
      provide: MAT_MENU_PANEL,
      useValue: {
        overlayPanelClass: 'variant-menu'
      }
    }
  ],
  templateUrl: './cosmetic-item.component.html',
  styleUrl: './cosmetic-item.component.scss'
})

export class CosmeticItemComponent implements OnDestroy {
  @Input() price: number = 0;
  @Input() itemName: string | undefined = "";
  @Input() image: string | undefined = "";
  @Input() rarity?: string = "";
  @Input() variantImgs?: Array<string | undefined> = [];
  @Input() colorGradient: Array<string> = [];
  @Input() seriesBackground: string = "";
  @Input() usingSidenav: boolean = false;
  @Input() images: Array<string | undefined> = [];
  @Input() type: string | undefined = "";

  loadingImg: boolean = true;
  errorLoadingImg: boolean = false;
  timeSub: Subscription = new Subscription();
  index: number = 0;

  constructor(breakpointService: BreakpointService) {
    breakpointService.useSidenav$.subscribe((useSidenav) => {
      this.usingSidenav = useSidenav;
    })
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

  getGradientColors() {
    if (this.colorGradient.length > 0) {
      let addedHashtag = this.colorGradient.map(color => '#' + color);
      let gradientString = addedHashtag.join(',');
      return gradientString;
    } else return '';
  }

  onLoadImg() {
    this.loadingImg = false;
  }

  onLoadImgError() {
    this.errorLoadingImg = true;
    this.image = 'assets/error_img.png'
  }

  getTypeIcon() {
    let useIcon = true;
    switch (this.type) {
      case 'backpack':
        return 'backpack'      
      case 'loadingscreen':
        return 'image';
      case 'pickaxe':
        return 'swords';
      case 'spray':
        //TODO:
        return '';
      case 'wrap':
        //TODO:
        return '';
      case 'outfit':
        return 'apparel';
      case 'jamtrack':
        return 'music_note';
    }
    return '';
  }
}
