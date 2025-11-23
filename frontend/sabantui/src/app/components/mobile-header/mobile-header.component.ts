import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {TuiSvgModule} from '@taiga-ui/core';

@Component({
  selector: 'app-mobile-header',
  templateUrl: './mobile-header.component.html',
  imports: [CommonModule, TuiSvgModule],
  standalone: true,
  styleUrls: ['./mobile-header.component.css']
})
export class MobileHeaderComponent {
  menuOpen = false;
  logoPath: string = 'assets/Vector.svg';

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  openNotifications() {
    console.log('Открыть уведомления');
  }
}
