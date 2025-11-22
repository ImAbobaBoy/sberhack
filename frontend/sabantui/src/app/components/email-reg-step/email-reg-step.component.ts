import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './email-reg-step.component.html',
  styleUrls: ['./email-reg-step.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class EmailRegStepComponent {
  loginForm: FormGroup;
  isLoading: boolean = false;
  private router = inject(Router);

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  // Геттер для проверки валидности email
  get emailInvalid(): boolean {
    const emailControl = this.loginForm.get('email');
    return !!(
      emailControl && 
      emailControl.invalid && 
      (emailControl.dirty || emailControl.touched)
    );
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      
      // Эмуляция запроса на сервер
      setTimeout(() => {
        this.isLoading = false;
        
        // Здесь обычно будет редирект или переход к вводу кода
        this.router.navigate(['/code-verify'])
      }, 2000);
    } else {
      // Помечаем все поля как touched для показа ошибок
      this.loginForm.markAllAsTouched();
    }
  }
}