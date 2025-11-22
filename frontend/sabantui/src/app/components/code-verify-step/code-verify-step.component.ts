import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-code-verification',
  templateUrl: './code-verify-step.component.html',
  styleUrls: ['./code-verify-step.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class CodeVerifyStepComponent implements OnInit, OnDestroy {
  codeForm: FormGroup;
  isLoading: boolean = false;
  isResending: boolean = false;
  timeLeft: number = 60;
  private timer: any;

  // В реальном приложении email будет передаваться через сервис или route params

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.codeForm = this.fb.group({
      code: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(6),
        Validators.pattern(/^[0-9]+$/)
      ]]
    });
  }

  ngOnInit(): void {
    this.startTimer();
  }

  ngOnDestroy(): void {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  // Геттер для проверки валидности кода
  get codeInvalid(): boolean {
    const codeControl = this.codeForm.get('code');
    return !!(
      codeControl && 
      codeControl.invalid && 
      (codeControl.dirty || codeControl.touched)
    );
  }

  startTimer(): void {
    this.timeLeft = 60;
    this.timer = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        clearInterval(this.timer);
      }
    }, 1000);
  }

  onSubmit(): void {
    if (this.codeForm.valid) {
      this.isLoading = true;
      
      // Эмуляция проверки кода на сервере
      setTimeout(() => {
        this.isLoading = false;
        
        // В реальном приложении здесь будет логика успешного входа
        if (this.codeForm.value.code === '123456') { // Тестовый код
          this.router.navigate(['/profile']);
        } else {
          this.codeForm.reset();
        }
      }, 2000);
    } else {
      this.codeForm.markAllAsTouched();
    }
  }

  resendCode(): void {
    this.isResending = true;
    
    // Эмуляция повторной отправки кода
    setTimeout(() => {
      this.isResending = false;
      this.startTimer();
    }, 1500);
  }

  changeEmail(): void {
    // Возврат на страницу ввода email
    this.router.navigate(['/email-step']);
  }
}