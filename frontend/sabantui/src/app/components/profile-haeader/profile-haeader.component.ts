import { Component, Input } from '@angular/core';

export interface ProfileBadge {
  books: number;
  events: number;
}

@Component({
  selector: 'app-profile-header',
  templateUrl: './profile-haeader.component.html',
  styleUrls: ['./profile-haeader.component.css']
})
export class ProfileHeaderComponent {
  @Input() lastName: string = '';
  @Input() firstName: string = '';
  @Input() libraryCardNumber: string = '';
  @Input() badge: ProfileBadge = { books: 0, events: 0 };
}