import { NgStyle } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MAT_MENU_PANEL, MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { interval, Subscription } from 'rxjs';
import { BreakpointService } from '../../services/breakpoint.service';
import {MatTooltipModule} from '@angular/material/tooltip';
import { Type } from '../../model/cosmetics/cosmetic.model';

@Component({
  selector: 'app-cosmetic-item',
  standalone: true,
  imports: [
    MatIconModule,
    MatMenuModule,
    NgStyle,
    MatProgressSpinnerModule,
    MatTooltipModule
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

export class CosmeticItemComponent implements OnInit, OnDestroy {
  @Input() price: number = 0;
  @Input() itemName: string | undefined = "";
  @Input() image: string | undefined = "";
  @Input() rarity?: string = "";
  @Input() variantImgs?: Array<string | undefined> = [];
  @Input() colorGradient: Array<string> = [];
  @Input() seriesBackground: string = "";
  @Input() usingSidenav: boolean = false;
  @Input() images: Array<string | undefined> = [];
  @Input() type: Type = new Type();
  /* @Input() type: string | undefined = "";
  @Input() typeValue: string | undefined = ""; */

  loadingImg: boolean = true;
  errorLoadingImg: boolean = false;
  timeSub: Subscription = new Subscription();
  index: number = 0;

  constructor(breakpointService: BreakpointService) {
    breakpointService.useSidenav$.subscribe((useSidenav) => {
      this.usingSidenav = useSidenav;
    })
  }

  ngOnInit(): void {
    this.showcaseImages();
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

  getTypeImg() {
    let imgPath = 'assets/item-types/';
    if (this.type.value == 'body') {      
      return imgPath.concat('car.PNG');
    }
      
    else
    return imgPath.concat(this.type.value + '.PNG');
  }

  validateTooltip() {
    return this.type.displayValue && this.type.displayValue != 'null' ? this.type.displayValue : '';
  }
}
