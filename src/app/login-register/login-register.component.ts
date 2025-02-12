import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LogInService } from '../services/logIn.service';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'login-register',
  templateUrl: 'login-register.component.html',
  styleUrl: 'login-register.component.scss',
  standalone: true,
  encapsulation: ViewEncapsulation.Emulated,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  providers: [LogInService],
})
export class LoginRegisterComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private logInService: LogInService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  loginUser(): void {
    if (!this.loginForm?.valid) return;
    console.log('start');
    this.logInService
      .logInUser({
        ...this.loginForm.value,
      })
      .subscribe(() => {
        console.log('hehe');
        this.router.navigate(['/']);
      });
  }

  registration(): void {
    this.router.navigate(['/register']);
  }
}
