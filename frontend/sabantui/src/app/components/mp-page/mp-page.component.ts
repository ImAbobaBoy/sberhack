import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Location } from '@angular/common'; // Добавляем Location

export interface Event {
  id: number;
  name: string;
  description: string;
  start_time: Date;
  end_time: Date | null;
  location: string;
  image?: string;
}

@Component({
  selector: 'app-event-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './mp-page.component.html',
  styleUrls: ['./mp-page.component.css']
})
export class MpPageComponent implements OnInit {
  event!: Event;
  isRegistered = false;
  showNotification = false;
  notificationMessage = '';
  showButton = true;

  // Моки мероприятий
  private events: Event[] = [
    {
      id: 1,
      name: 'Литературный вечер',
      description: 'Еженедельная встреча книголюбов для обсуждения классической литературы. Приносите свои любимые книги и делитесь впечатлениями.',
      start_time: new Date('2024-02-01T18:00:00'),
      end_time: new Date('2024-02-01T20:00:00'),
      location: 'Читальный зал'
    },
    {
      id: 2,
      name: 'Встреча с автором',
      description: 'Знакомство с известным писателем и обсуждение его нового бестселлера. Автограф-сессия и ответы на вопросы читателей.',
      start_time: new Date('2024-02-05T19:30:00'),
      end_time: new Date('2024-02-05T21:30:00'),
      location: 'Конференц-зал'
    }
  ];

  constructor(
    private route: ActivatedRoute,
    private location: Location // Добавляем Location в конструктор
  ) {}

  ngOnInit() {
    const eventId = Number(this.route.snapshot.paramMap.get('id'));
    this.event = this.events.find(e => e.id === eventId) || this.events[0];
  }

  // Метод для кнопки назад
  goBack(): void {
    this.location.back(); // Возврат на предыдущую страницу
  }

  formatDate(date: Date): string {
    return new Intl.DateTimeFormat('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(date);
  }

  formatTime(date: Date): string {
    return new Intl.DateTimeFormat('ru-RU', {
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  }

  toggleRegistration() {
    if (!this.isRegistered) {
      this.isRegistered = true;
      this.notificationMessage = 'Вы записаны на данное мероприятие';
    } else {
      this.isRegistered = false;
      this.notificationMessage = 'Запись на мероприятие отменена';
    }
    
    this.showNotification = true;
    this.hideNotificationAfterDelay();
  }

  private hideNotificationAfterDelay() {
    setTimeout(() => {
      this.showNotification = false;
    }, 3000);
  }
}