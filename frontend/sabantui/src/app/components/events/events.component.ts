import { Component, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';  // Для ngModel
import {
  TuiRootModule,
  TuiDialogModule,
  TuiAlertModule,
  TuiButtonModule,
  TuiTextfieldControllerModule
} from '@taiga-ui/core';
import {
  TuiCarouselModule,
  TuiDataListWrapperModule,
  TuiInputModule, TuiIslandModule,
  TuiPaginationModule,
  TuiSelectModule
} from '@taiga-ui/kit';
import { Router, RouterModule } from '@angular/router';
import { MobileHeaderComponent } from '../mobile-header/mobile-header.component';
import { CommonModule, NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-events',
  imports: [
    TuiRootModule,
    TuiDialogModule,
    TuiAlertModule,
    TuiButtonModule,
    TuiInputModule,
    TuiCarouselModule,  // Импортируем модуль для слайдера
    FormsModule,         // Импортируем для ngModel
    RouterModule,
    MobileHeaderComponent,
    TuiTextfieldControllerModule,
    ReactiveFormsModule,
    TuiDataListWrapperModule,
    TuiPaginationModule,
    TuiIslandModule,
    NgOptimizedImage,
    CommonModule
  ],
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css'],
})
export class EventsComponent {
  carouselItems = [
    { image: 'assets/event1.jpg' },
    { image: 'assets/event2.jpg' },
    { image: 'assets/event3.jpg' }
  ];

  isEmployee = true;
  currentIndex = 0;

  // Моки для событий
  events = [
    {
      id: 1,
      name: 'Литературный вечер',
      description: 'Еженедельная встреча книголюбов для обсуждения классической литературы.',
      start_time: new Date('2024-02-01T18:00:00'),
      end_time: new Date('2024-02-01T20:00:00'),
      location: 'Читальный зал',
      image: 'assets/lit_vecher.jpg'
    },
    {
      id: 2,
      name: 'Встреча с автором',
      description: 'Знакомство с писателем и обсуждение его нового бестселлера.',
      start_time: new Date('2024-02-05T19:30:00'),
      end_time: new Date('2024-02-05T21:30:00'),
      location: 'Конференц-зал',
      image: 'assets/author_meet.jpg'
    }
  ];

  searchQuery = '';

  get filteredEvents() {
    return this.events.filter(event => {
      return (
        (this.searchQuery ? event.name.toLowerCase().includes(this.searchQuery.toLowerCase()) : true)
      );
    });
  }

  goToCreateEventPage() {
    this.router.navigate(['/create-event']);
  }

  constructor(private router: Router) {}

  // Функция для перехода на страницу отдельного мероприятия
  goToEventPage(eventId: number): void {
    this.router.navigate([`/event/${eventId}`]).then(() => {
      window.scrollTo(0, 0);  // Прокручиваем страницу на верх
    });
  }
}
