import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

interface User {
  email: string;
  firstName: string;
  lastName: string;
  libraryCardNumber?: string;
}

@Component({
  selector: 'app-reader-card-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reader-card-page.component.html',
  styleUrls: ['./reader-card-page.component.css']
})
export class ReaderCardPageComponent implements OnInit {
  // Данные формы
  email: string = '';
  firstName: string = '';
  lastName: string = '';
  
  // Статусы
  isRegistered = false;
  showNotification = false;
  notificationMessage = '';

  // Мок базы данных пользователей
  private users: User[] = [
    {
      email: 'ivan.ivanov@example.com',
      firstName: 'Иван',
      lastName: 'Иванов',
      libraryCardNumber: '123456789'
    },
    {
      email: 'petr.petrov@example.com',
      firstName: 'Петр',
      lastName: 'Петров',
      libraryCardNumber: '987654321'
    },
    {
      email: 'sidor.sidorov@example.com',
      firstName: 'Сидор',
      lastName: 'Сидоров'
      // Нет номера билета - не зарегистрирован
    }
  ];

  constructor(
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit() {
    // Получаем email из параметров URL
    this.route.queryParams.subscribe(params => {
      const emailFromQr = params['email'];
      if (emailFromQr) {
        this.email = emailFromQr;
        this.loadUserData();
      }
    });
  }

  // Загрузка данных пользователя по email
  private loadUserData() {
    const user = this.users.find(u => u.email === this.email);
    if (user) {
      this.firstName = user.firstName;
      this.lastName = user.lastName;
      this.isRegistered = !!user.libraryCardNumber;
      
      if (this.isRegistered) {
        this.notificationMessage = `Билет уже зарегистрирован. Номер: ${user.libraryCardNumber}`;
        this.showNotification = true;
        this.hideNotificationAfterDelay();
      }
    }
  }

  // Регистрация билета
  registerCard() {
    // Проверяем заполненность полей
    if (!this.email || !this.firstName || !this.lastName) {
      this.notificationMessage = 'Заполните все поля';
      this.showNotification = true;
      this.hideNotificationAfterDelay();
      return;
    }

    // Генерируем случайный номер билета
    const cardNumber = this.generateCardNumber();
    
    // В реальном приложении здесь был бы запрос к API
    this.isRegistered = true;
    this.notificationMessage = `Билет успешно зарегистрирован! Номер: ${cardNumber}`;
    this.showNotification = true;
    this.hideNotificationAfterDelay();

    // Обновляем мок данных
    this.updateUserInMock(cardNumber);
  }

  // Генерация номера билета
  private generateCardNumber(): string {
    return Math.floor(100000000 + Math.random() * 900000000).toString();
  }

  // Обновление пользователя в мок-данных
  private updateUserInMock(cardNumber: string) {
    const userIndex = this.users.findIndex(u => u.email === this.email);
    if (userIndex !== -1) {
      this.users[userIndex].libraryCardNumber = cardNumber;
    } else {
      // Если пользователя нет в моках - добавляем
      this.users.push({
        email: this.email,
        firstName: this.firstName,
        lastName: this.lastName,
        libraryCardNumber: cardNumber
      });
    }
  }

  goBack(): void {
    this.location.back();
  }

  private hideNotificationAfterDelay() {
    setTimeout(() => {
      this.showNotification = false;
    }, 5000);
  }
}