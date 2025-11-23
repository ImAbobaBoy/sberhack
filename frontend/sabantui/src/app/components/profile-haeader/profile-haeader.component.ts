import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

export interface ProfileBadge {
  books: number;
  events: number;
}

@Component({
  selector: 'app-profile-header',
  templateUrl: './profile-haeader.component.html',
  styleUrls: ['./profile-haeader.component.css'],
  imports: [CommonModule],
})
export class ProfileHeaderComponent {
  @Input() lastName: string = '';
  @Input() firstName: string = '';
  @Input() libraryCardNumber: string = '';
  @Input() email: string = ''; // Добавляем email
  @Input() badge: ProfileBadge = { books: 0, events: 0 };

  showQrModal = false;
  qrCodeUrl = '';

  // Генерация QR-кода с email
  generateQrCode() {
    // В реальном приложении здесь будет логика генерации QR-кода
    // Например, с помощью библиотеки qrcode
    const qrData = `http://localhost:4200/reader-card?email=${encodeURIComponent(this.email)}`;
    
    // Для демонстрации создаем фиктивный QR-код
    // В реальном приложении замените на настоящую генерацию QR
    this.qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(qrData)}`;
    this.showQrModal = true;
  }

  closeQrModal() {
    this.showQrModal = false;
  }
}