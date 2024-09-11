import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from "@angular/material/menu";
import { MatIconModule } from "@angular/material/icon";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatButtonModule } from "@angular/material/button";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatMenuModule,
    MatIconModule,
    MatSidenavModule,
    MatButtonModule,    
  ],
  exports: [
    MatMenuModule,
    MatIconModule,
    MatSidenavModule,
    MatButtonModule,
    CommonModule
  ]
})
export class MaterialModule { }
