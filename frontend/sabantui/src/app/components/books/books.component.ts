import { Component } from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';  // Для ngModel
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
import { RouterModule } from '@angular/router';
import { MobileHeaderComponent } from '../mobile-header/mobile-header.component';
import {CommonModule, NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-books',
  imports: [
    TuiRootModule,
    TuiDialogModule,
    TuiAlertModule,
    TuiButtonModule,
    TuiInputModule,
    TuiSelectModule,
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
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
})
export class BooksComponent {
  carouselItems = [
    { image: 'assets/book1.jpg' },
    { image: 'assets/book1.jpg' },
    { image: 'assets/book1.jpg' }
  ];

  currentIndex = 0;

  categories = ['Фантастика', 'Романы', 'Хоррор'];
  testValue = new FormControl();

  books = [
    { title: 'Book 1', author: 'Author 1', dates: '01.01.2024 - 01.01.2025', image: 'assets/book1.jpg', category: 'Fiction' },
    { title: 'Book 2', author: 'Author 2', dates: '01.01.2024 - 01.01.2025', image: 'assets/book2.jpg', category: 'Non-Fiction' },
    { title: 'Book 3', author: 'Author 3', dates: '01.01.2024 - 01.01.2025', image: 'assets/book3.jpg', category: 'Sci-Fi' }
  ];

  searchQuery = '';
  selectedCategory = '';

  get filteredBooks() {
    return this.books.filter(book => {
      return (
        (this.selectedCategory ? book.category === this.selectedCategory : true) &&
        (this.searchQuery ? book.title.toLowerCase().includes(this.searchQuery.toLowerCase()) : true)
      );
    });
  }
}
