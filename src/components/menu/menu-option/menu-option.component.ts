import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-menu-option',
  standalone: true,
  imports: [
    MatIconModule,
    MatMenuModule
  ],
  templateUrl: './menu-option.component.html',
  styleUrl: './menu-option.component.css'
})

export class MenuOptionComponent {
  @Input() suboptions: MenuOptionComponent[] = [];
  @Input() text: string = '';
  @Input() icon: string = '';
  @Input() route: string = '';

  hasSuboptions(): boolean {
    return this.suboptions.length > 0;
  }

}
