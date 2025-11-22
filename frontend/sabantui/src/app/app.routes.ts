import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { EmailRegStepComponent } from './components/email-reg-step/email-reg-step.component';
import { CodeVerifyStepComponent } from './components/code-verify-step/code-verify-step.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    // { path: 'books', component: BooksComponent },
    // { path: 'events', component: EventsComponent },
    // { path: 'coworking', component: CoworkingComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'email-step', component: EmailRegStepComponent },
    { path: 'code-verify', component: CodeVerifyStepComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' }
];
