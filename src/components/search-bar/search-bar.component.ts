import { NgStyle } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router } from '@angular/router';
import { BrItem } from '../../model/cosmetics/cosmetic.model';
import { BreakpointService } from '../../services/breakpoint.service';
import { CosmeticsService } from '../../services/cosmetics.service';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    NgStyle,
    ReactiveFormsModule,
    MatButtonModule,
    MatTooltipModule,
    ReactiveFormsModule
  ],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss'
})

export class SearchBarComponent {
  usingSidenav: boolean = true;
  searchForm = new FormGroup({
    searchTerm: new FormControl('', [Validators.required, Validators.minLength(3)])
  });
  foundItems: Array<BrItem> = [];

  constructor(
    breakpointService: BreakpointService,
    private cosmeticsService: CosmeticsService,
    private router: Router
  ) {
    breakpointService.useSidenav$.subscribe((useSidenav) => {
      this.usingSidenav = useSidenav;
    });
  }

  searchBrItems(): void {
    let search = this.searchForm.controls["searchTerm"].value!;
    this.cosmeticsService.searchBrItems(search).subscribe(response => {
      if (response.status == 200) {
        this.cosmeticsService.searchResultsSubj.next(response.data);
        this.router.navigate(["cosmetics/search"]);
      }
    }, (error) => {
      if (error.status == 404) {
        this.cosmeticsService.searchResultsSubj.next([]);
        this.router.navigate(["cosmetics/search"]);
      }
    })
  }
}
