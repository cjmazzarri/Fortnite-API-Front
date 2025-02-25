import { Component, Input, OnChanges } from '@angular/core';
import { ShopEntry } from '../../model/cosmetics/shop.model';
import { CosmeticItemComponent } from '../cosmetic-item/cosmetic-item.component';
import { BrItem, Car, JamTrack, Instrument, LegoSkin, Bean, Cosmetic, Type } from '../../model/cosmetics/cosmetic.model';
import { Utils } from '../../util/utils';
import { NgClass } from '@angular/common';

@Component({
    selector: 'app-shop-entry',
    imports: [
        NgClass,
        CosmeticItemComponent,
    ],
    templateUrl: './shop-entry.component.html',
    styleUrl: './shop-entry.component.scss'
})

//Waits until allItems has received the values via @Input
//concats all arrays into a single array to make it easier to iterate on HTML
export class ShopEntryComponent implements OnChanges {
  @Input() entry: ShopEntry = new ShopEntry();
  @Input() legoSkins: Array<LegoSkin> = [];
  @Input() beans: Array<Bean> = [];
  allItems: Array<BrItem | Car | JamTrack | Instrument | undefined> = [];
  showBundleItems: boolean = false; //for toggling between the bundle image and every item

  ngOnChanges(): void {
    this.allItems = this.allItems.concat(
      this.entry.brItems,
      this.entry.cars,
      this.entry.instruments,
      this.entry.tracks,
    );
    this.allItems = this.allItems.filter((item) => item !== undefined); //remove undefined values from the array
  }

  checkImageType(item: Cosmetic): string | undefined {
    return Utils.checkImageType(item);
  }

  isBrItem(item: BrItem | Car | Instrument | JamTrack): boolean {
    return Utils.isBrItem(item)
  }

  getBrItemImages(item: BrItem | Cosmetic): Array<string | undefined> {
    return Utils.getBrItemImages(item, this.legoSkins, this.beans)
  }

  getBrItemVariants(item: BrItem | Cosmetic): Array<string | undefined> {
    return Utils.getBrItemVariants(item);
  }

  formatItemSeriesBackground(item: Cosmetic): string {
    return Utils.formatItemSeriesBackground(item);
  }

  getItemColorGradient(item: Cosmetic): Array<string> {
    return Utils.getItemColorGradient(item);
  }

  getCosmeticType(item: Cosmetic): Type {
    return Utils.getCosmeticType(item);
  }
}
