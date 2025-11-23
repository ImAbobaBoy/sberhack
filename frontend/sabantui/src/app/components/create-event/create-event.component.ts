import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';  // Импортируем FormsModule
import { CommonModule } from '@angular/common';
import {Router} from '@angular/router'; // Импортируем CommonModule

@Component({
  selector: 'app-create-event',
  standalone: true,  // Указываем, что компонент standalone
  imports: [CommonModule, FormsModule],  // Добавляем FormsModule в imports
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css'],
})
export class CreateEventComponent {
  event: any = {
    name: '',
    description: '',
    start_time: new Date(),
    end_time: new Date(),
    location: '',
    image: '',
  };

  isEmployee = true; // Флаг для проверки, если пользователь - сотрудник

  // Обработчик изменения изображения
  onImageChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.event.image = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  constructor(private router: Router) {}

  goBack(): void {
    this.router.navigate(['/events']);
  }

  // Отправка формы
  onSubmit(): void {
    // Логика для сохранения события
    console.log('Событие создано', this.event);
  }
}
