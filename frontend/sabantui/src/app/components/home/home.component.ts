import { Component, OnInit, OnDestroy } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { TuiButtonModule, TuiSvgModule } from "@taiga-ui/core";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [CommonModule, TuiSvgModule, TuiButtonModule],
  animations: [
    trigger('wordAnimation', [
      transition(':increment', [
        style({ transform: 'translateY(100%)', opacity: 0 }),
        animate('500ms ease-out', style({ transform: 'translateY(0%)', opacity: 1 }))
      ]),
      transition(':decrement', [
        style({ transform: 'translateY(-100%)', opacity: 0 }),
        animate('500ms ease-out', style({ transform: 'translateY(0%)', opacity: 1 }))
      ])
    ])
  ]
})
export class HomeComponent implements OnInit, OnDestroy {
  words: string[] = ['мероприятиям', 'книгам', 'коворкингу', 'культуре'];
  currentWordIndex: number = 0;
  logoPath: string = 'assets/Vector.svg';
  private intervalId: any;

  ngOnInit() {
    this.startAnimation();
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  startAnimation() {
    this.intervalId = setInterval(() => {
      this.currentWordIndex = (this.currentWordIndex + 1) % this.words.length;
    }, 3000);
  }

  get currentWord(): string {
    return this.words[this.currentWordIndex];
  }
}