import { Component } from '@angular/core';
import { ProfileHeaderComponent } from '../profile-haeader/profile-haeader.component';
import { Book, Event, ProfileTabsComponent } from '../profile-tabs/profile-tabs.component';
import { MobileHeaderComponent } from '../mobile-header/mobile-header.component';

@Component({
  selector: 'app-profile',
  imports: [ProfileHeaderComponent, ProfileTabsComponent, MobileHeaderComponent],
  standalone: true,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  // Пример данных книг
  books: Book[] = [
    {
      id: 1,
      title: 'Мастер и Маргарита',
      author: 'Михаил Булгаков',
      startDate: new Date('2024-01-15'),
      endDate: new Date('2026-02-15'),
    },
    {
      id: 2,
      title: 'Преступление и наказание',
      author: 'Федор Достоевский',
      startDate: new Date('2024-01-20'),
      endDate: new Date('2024-02-20')
    },
    {
      id: 3,
      title: '1984',
      author: 'Джордж Оруэлл',
      startDate: new Date('2024-01-10'),
      endDate: new Date('2026-02-10')
    }
  ];

  // Пример данных мероприятий
  events: Event[] = [
    {
      id: 1,
      title: 'Литературный вечер',
      date: new Date('2024-02-01'),
      time: '18:00',
      location: 'Читальный зал'
    },
    {
      id: 2,
      title: 'Встреча с автором',
      date: new Date('2024-02-05'),
      time: '19:30',
      location: 'Конференц-зал'
    },
    {
      id: 3,
      title: 'Книжный клуб',
      date: new Date('2024-02-10'),
      time: '17:00'
    }
  ];
}
