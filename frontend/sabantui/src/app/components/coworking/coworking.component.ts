import { Component } from '@angular/core';
import { MobileHeaderComponent } from '../mobile-header/mobile-header.component';
import { NgOptimizedImage } from "@angular/common";
import { MobileFooterComponent } from '../mobile-footer/mobile-footer.component';

@Component({
  selector: 'app-coworking',
  imports: [MobileHeaderComponent, NgOptimizedImage],
  standalone: true,
  templateUrl: './coworking.component.html',
  styleUrl: './coworking.component.css'
})
export class CoworkingComponent {
  coworkingImg = 'assets/coworking.jpeg'

}
