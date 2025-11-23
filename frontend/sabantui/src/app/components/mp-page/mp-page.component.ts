import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface Event {
  id: number;
  name: string;
  description: string;
  start_time: Date;
  end_time: Date | null;
  location: string;
  image?: string;
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
  selector: 'app-event-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './mp-page.component.html',
  styleUrls: ['./mp-page.component.css']
})
export class MpPageComponent implements OnInit {
  event!: Event;
  isRegistered = false;
  isAuthorized = true; // Новый флаг авторизации
  showNotification = false;
  notificationMessage = '';
  showRegistrationForm = false; // Флаг для показа формы регистрации
  
  // Данные для формы регистрации
  registrationEmail: string = '';
  registrationFirstName: string = '';
  registrationLastName: string = '';
  
  // Мок текущего пользователя
  currentUser: User = {
    id: 1,
    firstName: 'Иван',
    lastName: 'Петров',
    email: 'ivan.petrov@library.ru',
    isEmployee: false
  };

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

  // Режим редактирования
  isEditing = false;
  
  // Переменные для формы редактирования
  editedName: string = '';
  editedDescription: string = '';
  editedLocation: string = '';
  editedStartTime: string = '';
  editedEndTime: string = '';

  constructor(
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit() {
    const eventId = Number(this.route.snapshot.paramMap.get('id'));
    this.event = this.events.find(e => e.id === eventId) || this.events[0];
    this.initializeEditForm();
    
    // Изначально проверяем авторизацию
    // Если пользователь не авторизован, показываем только кнопку "Записаться"
    // Если авторизован - проверяем статус записи
    if (this.isAuthorized) {
      // Здесь должна быть логика проверки, записан ли пользователь на мероприятие
      // Пока используем мок
      this.isRegistered = false; // или true в зависимости от реальных данных
    }
  }

  goBack(): void {
    this.location.back();
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

  // Переписал метод для неавторизованных пользователей
  toggleRegistration() {
    if (!this.isAuthorized) {
      // Для неавторизованных - показываем форму регистрации
      this.showRegistrationForm = true;
      return;
    }
    
    // Для авторизованных - стандартное поведение
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

  // Обновил метод отправки формы регистрации
  submitRegistration() {
    if (this.registrationEmail && this.registrationFirstName && this.registrationLastName) {
      // После успешной регистрации:
      // 1. Скрываем форму
      this.showRegistrationForm = false;
      // 2. Показываем сообщение об успехе
      this.notificationMessage = 'Вы успешно зарегистрировались и записаны на мероприятие';
      this.showNotification = true;
      this.hideNotificationAfterDelay();
      
      // 3. Сбрасываем форму
      this.registrationEmail = '';
      this.registrationFirstName = '';
      this.registrationLastName = '';
      
      // Важно: не меняем isAuthorized и isRegistered, так как 
      // после регистрации мы не знаем кому отменять запись
      // Пользователь снова видит только кнопку "Записаться"
    }
  }

  // Добавил метод для отмены формы регистрации
  cancelRegistration() {
    this.showRegistrationForm = false;
    this.registrationEmail = '';
    this.registrationFirstName = '';
    this.registrationLastName = '';
  }

  // Для сотрудников - редактирование мероприятия
  toggleEdit() {
    this.isEditing = !this.isEditing;
    if (this.isEditing) {
      this.initializeEditForm();
    }
  }

  // Инициализация формы редактирования
  private initializeEditForm() {
    this.editedName = this.event.name;
    this.editedDescription = this.event.description;
    this.editedLocation = this.event.location;
    this.editedStartTime = this.event.start_time.toISOString().slice(0, 16);
    this.editedEndTime = this.event.end_time ? this.event.end_time.toISOString().slice(0, 16) : '';
  }

  saveChanges() {
    // Сохраняем изменения
    this.event.name = this.editedName;
    this.event.description = this.editedDescription;
    this.event.location = this.editedLocation;
    this.event.start_time = new Date(this.editedStartTime);
    this.event.end_time = this.editedEndTime ? new Date(this.editedEndTime) : null;
    
    this.isEditing = false;
    this.notificationMessage = 'Изменения сохранены';
    this.showNotification = true;
    this.hideNotificationAfterDelay();
  }

  cancelEdit() {
    this.isEditing = false;
    this.initializeEditForm();
  }

  private hideNotificationAfterDelay() {
    setTimeout(() => {
      this.showNotification = false;
    }, 3000);
  }
}