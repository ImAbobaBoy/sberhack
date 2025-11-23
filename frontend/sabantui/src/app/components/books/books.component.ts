import { ChangeDetectionStrategy, Component } from '@angular/core';
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
import {Router, RouterModule} from '@angular/router';
import { MobileHeaderComponent } from '../mobile-header/mobile-header.component';
import { CommonModule, NgOptimizedImage } from '@angular/common';

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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BooksComponent {
  carouselItems = [
    { image: 'assets/book1.jpg' },
    { image: 'assets/book1.jpg' },
    { image: 'assets/book1.jpg' }
  ];

  constructor(private router: Router) {}

  goToBookPage(bookId: number): void {
    this.router.navigate(['/book', bookId]).then(() => {
      window.scrollTo(0, 0);  // Прокручиваем страницу на верх
    });
  }

  currentIndex = 0;

  categories = ['Фантастика', 'Романы', 'Хоррор'];
  testValue = new FormControl();

  // Обновленный массив books с мока книг
  books = [
    {
      id: 1,
      title: 'Мастер и Маргарита',
      author: 'Михаил Булгаков',
      pages_count: 480,
      publisher: 'АСТ',
      genre: 'Роман',
      year_published: 1967,
      location_published: 'Москва',
      image: 'assets/master_i_margarita.jpg',
      category: 'Романы'
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
      image: 'assets/prestup_i_nakaz.jpg',
      category: 'Романы'
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
      image: 'assets/1984.jpg',
      category: 'Антиутопия'
    }
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
