import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Bean, BrItem, Car, Cosmetic, Instrument, JamTrack, LegoSkin } from '../../model/cosmetics/cosmetic.model';
import { CosmeticsService } from '../../services/cosmetics.service';
import { CosmeticItemComponent } from '../cosmetic-item/cosmetic-item.component';


@Component({
  selector: 'app-cosmetics',
  standalone: true,
  imports: [CosmeticItemComponent],
  templateUrl: './cosmetics.component.html',
  styleUrl: './cosmetics.component.css'
})
export class CosmeticsComponent implements OnInit, OnDestroy {
  constructor(private cosmeticsService: CosmeticsService) {
  }

  brItems: Array<BrItem> = [];
  cars: Array<Car> = [];
  instruments: Array<Instrument> = [];
  jamTracks: Array<JamTrack> = [];
  beans: Array<Bean> = [];
  legoSkins: Array<LegoSkin> = [];
  timeSub: Subscription = new Subscription;

  ngOnInit(): void {
    this.getNewItems();
  }

  ngOnDestroy(): void {
    this.timeSub.unsubscribe();
  }

  getNewItems() {
    this.cosmeticsService.getNewItems().subscribe(response => {
      if (response.status == 200) {
        this.brItems = response.data.items.br;
        this.cars = response.data.items.cars;
        this.instruments = response.data.items.instruments;
        this.jamTracks = response.data.items.tracks;
        this.legoSkins = response.data.items.lego;
        this.beans = response.data.items.beans;
        console.log(response)
      } else {
        console.log('Ocurrió un error')
      }
    })
  }

  getBrItemImages(item: BrItem) {
    let imgArray: Array<string | undefined> = [];
    item.type.value == 'emoji' ? imgArray.push(item.images.smallIcon) : imgArray.push(item.images.icon);
    let legoStyle = this.legoSkins.find(skin => skin.cosmeticId == item.id);
    if (legoStyle) {
      imgArray.push(legoStyle.images.large);
    }
    let bean = this.beans.find(skin => skin.cosmeticId == item.id);
    if (bean) {
      imgArray.push(bean.images.large);
    }
    return imgArray;
  }

  getBrItemVariants(item: BrItem) {
    let variants: Array<string | undefined> = [];
    if (item.variants) {
      for (let channel of item.variants) {
        for (let option of channel.options) {
          variants.push(option.image);
        }
      }
      return variants;      
    } else {
      return [];
    }
  }

  checkImageType(item: Cosmetic) {
    let imgPath: string | undefined = '';
    if (item.type) {
      switch (item.type.value) {
        case 'backpack':
        case 'emote':
        case 'loadingscreen':
        case 'pickaxe':
        case 'spray':
        case 'wrap':
        case 'outfit':
          imgPath = item.images.icon;
          break;

        case 'emoji':
          imgPath = item.images.smallIcon;
          break;

        //Car related cosmetics
        case 'drifttrail':
        case 'booster':
        case 'skin':
        case 'body':
          imgPath = item.images.large;
          break;

        //Festival cosmetics
        case 'mic':
        case 'bass':
        case 'guitar':
        case 'drum':
          imgPath = item.images.large;
          break;
      }
    } else {
      return item.albumArt;
    }
    return imgPath;
  }
}
