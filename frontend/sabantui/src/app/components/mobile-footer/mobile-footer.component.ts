import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-mobile-footer',
  templateUrl: './mobile-footer.component.html',
  standalone: true,
  styleUrls: ['./mobile-footer.component.css']
})
export class MobileFooterComponent {
  activeTab: string = 'home';

  constructor(private router: Router) {
    // Слушаем смену маршрута, чтобы подсвечивать активный таб
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const currentRoute = event.urlAfterRedirects.split('/')[1];
        this.activeTab = currentRoute || 'home';
      }
    });
  }

  navigate(tab: string) {
    this.activeTab = tab;
    this.router.navigate([tab]);
  }
}
