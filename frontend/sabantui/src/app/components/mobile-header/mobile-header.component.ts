import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-mobile-header',
  templateUrl: './mobile-header.component.html',
  imports: [CommonModule],
  standalone: true,
  styleUrls: ['./mobile-header.component.css']
})
export class MobileHeaderComponent {
  menuOpen = false;

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  openNotifications() {
    console.log('Открыть уведомления');
  }
}
