import { NgStyle } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { BreakpointService } from '../../services/breakpoint.service';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    NgStyle,
    ReactiveFormsModule
  ],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss'
})

export class SearchBarComponent implements OnInit {
  usingSidenav: boolean = true;
  searchTerm: FormControl = new FormControl('');
  @Output() searchValueChange = new EventEmitter<string>();  

  constructor(breakpointService: BreakpointService) {
    breakpointService.useSidenav$.subscribe((useSidenav) => {
      this.usingSidenav = useSidenav;
    });    
  }

  ngOnInit(): void {
    this.searchTerm.valueChanges.subscribe((value) => {
      this.sendChange(value);
    })
  }

  public sendChange(value: string) {
    this.searchValueChange.emit(value);
  }
}
