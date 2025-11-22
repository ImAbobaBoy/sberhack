import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    // { path: 'books', component: BooksComponent },
    // { path: 'events', component: EventsComponent },
    // { path: 'coworking', component: CoworkingComponent },
    { path: 'profile', component: ProfileComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' }
];
