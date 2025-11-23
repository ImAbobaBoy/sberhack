import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { EmailRegStepComponent } from './components/email-reg-step/email-reg-step.component';
import { CodeVerifyStepComponent } from './components/code-verify-step/code-verify-step.component';
import {BooksComponent} from './components/books/books.component';
import {EventsComponent} from './components/events/events.component';
import {TtrComponent} from './components/ttr/ttr.component';
import {MpPageComponent} from './components/mp-page/mp-page.component';
import {BookPageComponent} from './components/book-page/book-page.component';
import {CreateEventComponent} from './components/create-event/create-event.component';
import { CoworkingComponent } from './components/coworking/coworking.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'books', component: BooksComponent },
    { path: 'book', component: ProfileComponent },
    { path: 'book/:id', component: BookPageComponent },
    { path: 'ttr', component: TtrComponent },


    { path: 'events', component: EventsComponent },
    { path: 'event/:id', component: MpPageComponent },
    { path: 'create-event', component: CreateEventComponent },
    { path: 'coworking', component: CoworkingComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'email-step', component: EmailRegStepComponent },
    { path: 'code-verify', component: CodeVerifyStepComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' }
];
