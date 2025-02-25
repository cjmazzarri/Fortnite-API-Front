import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink } from '@angular/router';
import { Suboption } from '../../../model/menu/suboption.model';

@Component({
    selector: 'app-menu-option',
    imports: [
        MatIconModule,
        MatMenuModule,
        RouterLink,
    ],
    templateUrl: './menu-option.component.html',
    styleUrl: './menu-option.component.scss'
})

export class MenuOptionComponent {
  @Input() suboptions: Suboption[] = [];
  @Input() text: string = '';
  @Input() icon: string = '';
  @Input() route: string = '';
  @Input() useSidenav: boolean = false;
  @Output() clicked = new EventEmitter;

  hasSuboptions(): boolean {
    return this.suboptions.length > 0;
  }

  clickedOption() {
    this.clicked.emit();
  }
}
