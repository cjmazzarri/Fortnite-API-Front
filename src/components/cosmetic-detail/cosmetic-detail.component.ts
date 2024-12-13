import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { YouTubePlayerModule } from "@angular/youtube-player";
import { BrItem } from '../../model/cosmetics/cosmetic.model';
import { CosmeticsService } from '../../services/cosmetics.service';
import { BreakpointService } from '../../services/breakpoint.service';
import { NgStyle } from '@angular/common';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-cosmetic-detail',
  standalone: true,
  imports: [
    YouTubePlayerModule,
    NgStyle,
    NgClass
  ],
  templateUrl: './cosmetic-detail.component.html',
  styleUrl: './cosmetic-detail.component.scss'
})
export class CosmeticDetailComponent implements OnInit {
  itemId: string | null = "";
  cosmetic: BrItem = new BrItem();
  videoUrl: string = "https://youtu.be/";
  set: BrItem[] = []; //The item's associated set, if any
  usingSidenav: boolean = true;
  
  constructor (
    private route: ActivatedRoute,
    private cosmeticsService: CosmeticsService,
    private breakpointService: BreakpointService
  ) {
      breakpointService.useSidenav$.subscribe((useSidenav) => {
        this.usingSidenav = useSidenav;
      })
    }

  ngOnInit(): void {
    this.itemId = this.route.snapshot.paramMap.get('id');
    this.getCosmeticDetail(this.itemId);
    this.initVideoPlayer();
  }

  initVideoPlayer() {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.body.appendChild(tag);
  }

  getCosmeticDetail(id: string | null) {
    this.cosmeticsService.getBrCosmeticDetail(id).subscribe(response => {
      if (response.status == 200) {
        this.cosmetic = response.data;
        if (this.cosmetic.showcaseVideo) {
          this.videoUrl += this.cosmetic.showcaseVideo;
        }
        this.getCosmeticSet();
      }
    })
  }

  getCosmeticSet() {
    if (this.cosmetic.set != undefined) {
      this.cosmeticsService.searchBrItemsBySet(this.cosmetic.set?.value).subscribe((response) => {
        if (response.status == 200) {
          this.set = response.data;
        }
      })
    }    
  }
}
