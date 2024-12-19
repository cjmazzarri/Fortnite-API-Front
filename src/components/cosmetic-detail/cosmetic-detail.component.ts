import { NgClass, NgStyle } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { YouTubePlayerModule } from "@angular/youtube-player";
import { BrItem, Cosmetic } from '../../model/cosmetics/cosmetic.model';
import { BreakpointService } from '../../services/breakpoint.service';
import { CosmeticsService } from '../../services/cosmetics.service';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Utils } from '../../util/utils';

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
  seriesBackground: string = "";
  colorGradient: string[] = [];
  formattedGradient: string = "";
  
  constructor (
    private route: ActivatedRoute,
    private cosmeticsService: CosmeticsService,
    private breakpointService: BreakpointService,
    private title: Title,
    private router: Router
  ) {
      breakpointService.useSidenav$.subscribe((useSidenav) => {
        this.usingSidenav = useSidenav;
      });      
    }

  ngOnInit(): void {
    this.itemId = this.route.snapshot.paramMap.get('id');
    this.getCosmeticDetail(this.itemId);
    this.initVideoPlayer();
  }

  setTitle() {
    this.title.setTitle(this.cosmetic.name + ' - Fortnite API Front');
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
        this.setTitle();
        this.seriesBackground = Utils.formatItemSeriesBackground(this.cosmetic);
        this.colorGradient = Utils.getItemColorGradient(this.cosmetic);
        this.formattedGradient = Utils.formatGradientColors(this.colorGradient);
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

  getGradientColors(cosmetic: Cosmetic): Array<string> {
    return Utils.getItemColorGradient(cosmetic);
  }

  formatGradientColors(gradient: string[]): string {
    return Utils.formatGradientColors(gradient);
  }

  formatSeriesBackground(item: Cosmetic): string {
    return Utils.formatItemSeriesBackground(item);
  }

  //TODO: revisar
  goToDetail(id: string) {
    console.log('go')
    this.router.navigate(['/cosmetics/' + id], {onSameUrlNavigation: 'reload' });
  }
}
