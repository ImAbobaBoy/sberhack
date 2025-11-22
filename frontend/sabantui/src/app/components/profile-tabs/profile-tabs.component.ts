import { Component, Input } from '@angular/core';

export interface Book {
  id: number;
  title: string;
  author: string;
  startDate: Date;
  endDate: Date;
  coverUrl?: string;
}

export interface Event {
  id: number;
  title: string;
  date: Date;
  time: string;
  location?: string;
}

@Component({
  selector: 'app-profile-tabs',
  templateUrl: './profile-tabs.component.html',
  styleUrls: ['./profile-tabs.component.css']
})
export class ProfileTabsComponent {
  activeTab: 'books' | 'events' = 'books';
  @Input() books: Book[] = []
  @Input() events: Event[] = []

  dateNow = new Date()

  switchTab(tab: 'books' | 'events'): void {
    this.activeTab = tab;
  }

  formatDateRange(start: Date, end: Date): string {
    return `${this.formatDate(start)} - ${this.formatDate(end)}`;
  }

  formatDate(date: Date): string {
    return date.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'short'
    });
  }

  formatEventDate(date: Date): string {
    return date.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      weekday: 'long'
    });
  }

  isEventToday(eventDate: Date): boolean {
    const today = new Date();
    return eventDate.toDateString() === today.toDateString();
  }

  isEventUpcoming(eventDate: Date): boolean {
    return eventDate > new Date();
  }
}