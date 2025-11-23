import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

export interface Book {
  id: number;
  title: string;
  author: string;
  pages_count: number;
  publisher: string;
  genre: string;
  year_published: number;
  location_published: string | null;
  isUnderRepair?: boolean; // Добавляем поле для статуса ремонта
}

// Мок пользователя
interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  isEmployee: boolean;
}

@Component({
  selector: 'app-book-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './book-page.component.html',
  styleUrls: ['./book-page.component.css']
})
export class BookPageComponent implements OnInit {
  book!: Book;
  showNotification = false;
  notificationMessage = '';
  showButtons = true;

  // Мок текущего пользователя
  currentUser: User = {
    id: 1,
    firstName: 'Иван',
    lastName: 'Петров',
    email: 'ivan.petrov@library.ru',
    isEmployee: true // Меняй на false чтобы увидеть разницу
  };

  // Моки книг
  private books: Book[] = [
    {
      id: 1,
      title: 'Мастер и Маргарита',
      author: 'Михаил Булгаков',
      pages_count: 480,
      publisher: 'АСТ',
      genre: 'Роман',
      year_published: 1967,
      location_published: 'Москва',
      isUnderRepair: false
    },
    {
      id: 2,
      title: 'Преступление и наказание',
      author: 'Федор Достоевский',
      pages_count: 672,
      publisher: 'Эксмо',
      genre: 'Психологический роман',
      year_published: 1866,
      location_published: 'Санкт-Петербург',
      isUnderRepair: true
    },
    {
      id: 3,
      title: '1984',
      author: 'Джордж Оруэлл',
      pages_count: 328,
      publisher: 'Penguin Books',
      genre: 'Антиутопия',
      year_published: 1949,
      location_published: 'Лондон',
      isUnderRepair: false
    }
  ];

  constructor(
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit() {
    const bookId = Number(this.route.snapshot.paramMap.get('id'));
    this.book = this.books.find(b => b.id === bookId) || this.books[0];
  }

  goBack(): void {
    this.location.back();
  }

  // Для обычных пользователей
  takeBook() {
    this.notificationMessage = 'Заберите книгу в течении дня';
    this.showNotification = true;
    this.showButtons = false;
    this.hideNotificationAfterDelay();
  }

  reserveBook() {
    this.notificationMessage = 'Заберите книгу в течении двух недель';
    this.showNotification = true;
    this.showButtons = false;
    this.hideNotificationAfterDelay();
  }

  // Для сотрудников - управление ремонтом
  sendToRepair() {
    this.book.isUnderRepair = true;
    this.notificationMessage = 'Книга отправлена на ремонт';
    this.showNotification = true;
    this.hideNotificationAfterDelay();
  }

  returnFromRepair() {
    this.book.isUnderRepair = false;
    this.notificationMessage = 'Книга возвращена с ремонта';
    this.showNotification = true;
    this.hideNotificationAfterDelay();
  }

  private hideNotificationAfterDelay() {
    setTimeout(() => {
      this.showNotification = false;
    }, 3000);
  }
}