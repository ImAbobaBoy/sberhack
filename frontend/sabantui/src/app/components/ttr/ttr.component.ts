import { Component, OnInit, signal, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterModule } from '@angular/router';
import { 
  TuiButtonModule,
  TuiLoaderModule
} from '@taiga-ui/core';
import { TuiBadgeModule } from '@taiga-ui/kit';

interface Book {
  id: number;
  title: string;
  author: string;
  description: string;
  year: number;
  image?: string;
}

@Component({
  selector: 'app-ttr',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    TuiButtonModule,
    TuiLoaderModule,
    TuiBadgeModule,
    NgOptimizedImage
],
  templateUrl: './ttr.component.html',
  styleUrls: ['./ttr.component.css']
})
export class TtrComponent implements OnInit, AfterViewInit {
  @ViewChild('container') container!: ElementRef;

  private readonly mockBooks: Book[] = [
    {
      id: 1,
      title: 'Мастер и Маргарита',
      author: 'Михаил Булгаков',
      description: 'Роман о любви, искусстве и борьбе с цензурой в советской Москве. Мистическая история, переплетающая реальность и вымысел.',
      year: 1966,
      image: '/assets/master_i_margarita.jpg'
    },
    {
      id: 2,
      title: 'Преступление и наказание',
      author: 'Фёдор Достоевский',
      description: 'Психологический роман о бывшем студенте Родионе Раскольникове, совершившем убийство и пытающемся оправдать свой поступок.',
      year: 1866,
      image: '/assets/prestup_i_nakaz.jpg'
    },
    {
      id: 3,
      title: '1984',
      author: 'Джордж Оруэлл',
      description: 'Антиутопический роман о тоталитарном обществе под постоянным контролем Большого Брата.',
      year: 1949,
      image: '/assets/1984.jpg'
    },
    {
    id: 4,
    title: 'Три товарища',
    author: 'Эрих Мария Ремарк',
    description: 'История дружбы, любви и выживания в тяжёлые времена между двумя мировыми войнами.',
    year: 1936,
    image: '/assets/tri_tovar.jpg'
  },
  {
    id: 5,
    title: 'Над пропастью во ржи',
    author: 'Джером Д. Сэлинджер',
    description: 'Исповедь подростка, пытающегося разобраться в себе и мире, который кажется фальшивым.',
    year: 1951,
    image: '/assets/nad_prop.jpg'
  },
  {
    id: 6,
    title: 'Цветы для Элджернона',
    author: 'Дэниел Киз',
    description: 'Трогательная история мужчины с низким IQ, прошедшего эксперимент по увеличению интеллекта.',
    year: 1966,
    image: '/assets/tsvety.jpg'
  },
  {
    id: 7,
    title: 'Собачье сердце',
    author: 'Михаил Булгаков',
    description: 'Сатирический роман о превращении бездомной собаки в человека и абсурдности социальных экспериментов.',
    year: 1925,
    image: '/assets/sobach_serd.jpg'
  },
  {
    id: 8,
    title: 'О дивный новый мир',
    author: 'Олдос Хаксли',
    description: 'Антиутопия о мире, где людей выращивают и программируют для стабильности общества.',
    year: 1932,
    image: '/assets/novyi_mir.jpg'
  },
  {
    id: 9,
    title: 'Пикник на обочине',
    author: 'Аркадий и Борис Стругацкие',
    description: 'Фантастическая история о Зоне — месте, полном артефактов, опасностей и загадок.',
    year: 1972,
    image: '/assets/picnic_oboch.jpg'
  },
  {
    id: 10,
    title: 'Старик и море',
    author: 'Эрнест Хемингуэй',
    description: 'Притча о борьбе старого рыбака с гигантской рыбой и собственной судьбой.',
    year: 1952,
    image: '/assets/starik_i_more.jpg'
  }
  ];

  books = signal<Book[]>([]);
  currentIndex = signal(0);
  
  // Переменные для плавного свайпа
  private startY = 0;
  private currentY = 0;
  private isDragging = false;
  private dragOffset = 0;
  private readonly SWIPE_THRESHOLD = 100;

  ngOnInit() {
    this.loadBooks();
  }

  ngAfterViewInit() {
    this.setupSwipeEvents();
  }

  private setupSwipeEvents() {
    const element = this.container.nativeElement;
    
    // Touch события
    element.addEventListener('touchstart', this.handleTouchStart.bind(this), { passive: false });
    element.addEventListener('touchmove', this.handleTouchMove.bind(this), { passive: false });
    element.addEventListener('touchend', this.handleTouchEnd.bind(this), { passive: true });
    
    // Mouse события для десктопа
    element.addEventListener('mousedown', this.handleMouseDown.bind(this));
    element.addEventListener('mousemove', this.handleMouseMove.bind(this));
    element.addEventListener('mouseup', this.handleMouseUp.bind(this));
    element.addEventListener('mouseleave', this.handleMouseUp.bind(this));
  }

  private handleTouchStart(e: TouchEvent) {
    e.preventDefault();
    this.startSwipe(e.touches[0].clientY);
  }

  private handleTouchMove(e: TouchEvent) {
    if (!this.isDragging) return;
    e.preventDefault();
    this.updateSwipe(e.touches[0].clientY);
  }

  private handleTouchEnd() {
    this.endSwipe();
  }

  private handleMouseDown(e: MouseEvent) {
    e.preventDefault();
    this.startSwipe(e.clientY);
  }

  private handleMouseMove(e: MouseEvent) {
    if (!this.isDragging) return;
    e.preventDefault();
    this.updateSwipe(e.clientY);
  }

  private handleMouseUp() {
    this.endSwipe();
  }

  private startSwipe(clientY: number) {
    this.isDragging = true;
    this.startY = clientY;
    this.currentY = clientY;
    this.dragOffset = 0;
  }

  private updateSwipe(clientY: number) {
    if (!this.isDragging) return;
    
    this.currentY = clientY;
    this.dragOffset = this.currentY - this.startY;
    
    // Ограничиваем максимальное смещение для лучшего UX
    const maxOffset = 200;
    if (Math.abs(this.dragOffset) > maxOffset) {
      this.dragOffset = this.dragOffset > 0 ? maxOffset : -maxOffset;
    }
  }

  private endSwipe() {
    if (!this.isDragging) return;
    
    const absOffset = Math.abs(this.dragOffset);
    const isSwipeUp = this.dragOffset < 0;
    
    if (absOffset >= this.SWIPE_THRESHOLD) {
      // Успешный свайп - переходим к следующей/предыдущей книге
      if (isSwipeUp && this.currentIndex() < this.books().length) {
        this.currentIndex.update(i => i + 1);
      } else if (!isSwipeUp && this.currentIndex() > 0) {
        this.currentIndex.update(i => i - 1);
      }
    }
    
    // Сбрасываем состояние
    this.isDragging = false;
    this.dragOffset = 0;
  }

  getCardTransform(): string {
    if (!this.isDragging || this.dragOffset === 0) {
      return 'translateY(0)';
    }
    return `translateY(${this.dragOffset}px)`;
  }

  getCardOpacity(): number {
    if (!this.isDragging) return 1;
    
    const absOffset = Math.abs(this.dragOffset);
    const fadeStart = 50;
    const fadeEnd = 150;
    
    if (absOffset <= fadeStart) return 1;
    if (absOffset >= fadeEnd) return 0.7;
    
    // Плавное уменьшение opacity от 1 до 0.7
    return 1 - ((absOffset - fadeStart) / (fadeEnd - fadeStart)) * 0.3;
  }

  // Остальные методы остаются без изменений
  nextBook(): void {
    if (this.currentIndex() >= this.books().length) return;
    this.currentIndex.update(i => i + 1);
  }

  prevBook(): void {
    if (this.currentIndex() <= 0) return;
    this.currentIndex.update(i => i - 1);
  }

  private loadBooks(): void {
    setTimeout(() => {
      this.books.set(this.mockBooks);
    }, 1000);
  }

  get currentBook(): Book | null {
    return this.books()[this.currentIndex()] || null;
  }

  likeBook(): void {
    console.log('Liked book:', this.currentBook?.id);
  }

  navigateToBook(): void {
    console.log('Navigate to book:', this.currentBook?.id);
  }

  restart(): void {
    this.currentIndex.set(0);
  }
}