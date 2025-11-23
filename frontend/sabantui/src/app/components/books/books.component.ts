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
    },
    {
    id: 4,
    title: 'Три товарища',
    author: 'Эрих Мария Ремарк',
    pages_count: 480,
    publisher: 'Ullstein Verlag',
    genre: 'Роман',
    year_published: 1936,
    location_published: 'Берлин',
    image: 'assets/tri_tovar.jpg',
    category: 'Романы'
  },
  {
    id: 5,
    title: 'Над пропастью во ржи',
    author: 'Джером Д. Сэлинджер',
    pages_count: 288,
    publisher: 'Little, Brown and Company',
    genre: 'Роман воспитания',
    year_published: 1951,
    location_published: 'Нью-Йорк',
    image: 'assets/nad_prop.jpg',
    category: 'Романы'
  },
  {
    id: 6,
    title: 'Цветы для Элджернона',
    author: 'Дэниел Киз',
    pages_count: 304,
    publisher: 'Harcourt',
    genre: 'Фантастика',
    year_published: 1966,
    location_published: 'Нью-Йорк',
    image: 'assets/tsvety.jpg',
    category: 'Фантастика'
  },
  {
    id: 7,
    title: 'Собачье сердце',
    author: 'Михаил Булгаков',
    pages_count: 128,
    publisher: 'Государственное издательство',
    genre: 'Сатира',
    year_published: 1925,
    location_published: 'Москва',
    image: 'assets/sobach_serd.jpg',
    category: 'Классика'
  },
  {
    id: 8,
    title: 'О дивный новый мир',
    author: 'Олдос Хаксли',
    pages_count: 288,
    publisher: 'Chatto & Windus',
    genre: 'Антиутопия',
    year_published: 1932,
    location_published: 'Лондон',
    image: 'assets/novyi_mir.jpg',
    category: 'Антиутопия'
  },
  {
    id: 9,
    title: 'Пикник на обочине',
    author: 'Аркадий и Борис Стругацкие',
    pages_count: 224,
    publisher: 'АСТ',
    genre: 'Научная фантастика',
    year_published: 1972,
    location_published: 'Москва',
    image: 'assets/picnic_oboch.jpg',
    category: 'Фантастика'
  },
  {
    id: 10,
    title: 'Старик и море',
    author: 'Эрнест Хемингуэй',
    pages_count: 128,
    publisher: 'Charles Scribner’s Sons',
    genre: 'Повесть',
    year_published: 1952,
    location_published: 'Нью-Йорк',
    image: 'assets/starik_i_more.jpg',
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
