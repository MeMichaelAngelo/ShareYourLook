import { CommonModule } from '@angular/common';
import {
  Component,
  Output,
  EventEmitter,
  OnInit,
  ChangeDetectorRef,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LogInService } from '../services/logIn.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'register-user',
  templateUrl: 'register-user.component.html',
  styleUrl: './register-user.component.scss',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, HttpClientModule],
  providers: [LogInService],
})
export class RegisterUserComponent implements OnInit {
  @Output()
  loginPage: boolean = false;

  registerUserForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private logInService: LogInService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.prepareRegisterForm();
  }

  prepareRegisterForm(): void {
    this.registerUserForm = this.fb.group({
      login: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  registerUser() {
    if (!this.registerUserForm.valid) {
      return;
    }

    this.logInService
      .registerNewUser({
        ...this.registerUserForm?.value,
      })
      .subscribe(() => {});
  }
}
