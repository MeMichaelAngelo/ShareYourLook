import {
  ComponentFixture,
  fakeAsync,
  inject,
  TestBed,
  tick,
} from '@angular/core/testing';
import { LoginRegisterComponent } from './login-register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { provideRouter, Router } from '@angular/router';
import { LogInService } from '../services/logIn.service';
import {
  HttpClientTestingModule,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideHttpClient } from '@angular/common/http';

describe('LoginRegisterComponent', () => {
  let component: LoginRegisterComponent;
  let fixture: ComponentFixture<LoginRegisterComponent>;

  let service: LogInService;
  let router;
  Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        LoginRegisterComponent,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          {
            path: '',
            component: LoginRegisterComponent,
          },
        ]),
      ],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        {
          provide: LogInService,
          useValue: {
            logInUser: () => {
              console.log('provide');
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginRegisterComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(LogInService);

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should create the form with default values', () => {
    expect(component.loginForm).toBeDefined();
    expect(component.loginForm.get('email')?.value).toBe('');
    expect(component.loginForm.get('password')?.value).toBe('');
  });

  it('should mark controls as invalid when fields are empty', () => {
    const emailField = component.loginForm.get('email');
    const passwordField = component.loginForm.get('password');

    emailField?.setValue(null);
    passwordField?.setValue(null);
    fixture.detectChanges();

    expect(emailField?.invalid).toBeTruthy();
    expect(passwordField?.invalid).toBeTruthy();
  });

  it('should mark controls as valid when fields are filled', () => {
    const emailField = component.loginForm.get('email');
    const passwordField = component.loginForm.get('password');

    emailField?.setValue('testEmail@com');
    passwordField?.setValue('testPassword');
    fixture.detectChanges();

    expect(emailField?.valid).toBeTruthy();
    expect(passwordField?.valid).toBeTruthy();
  });

  it('should not allow user to log in', () => {
    let serviceSpy = spyOn(service, 'logInUser').and.returnValues(of('123'));
    const formData = {
      email: 'qwerty123',
      password: 'huehue123',
    };
    component.loginForm.setValue(formData);
    component.loginUser();

    expect(component.loginForm?.invalid).toEqual(true);
    expect(serviceSpy).toHaveBeenCalledTimes(0);
  });

  it('should call logInUser and navigate when form is valid', inject(
    [Router],
    (routerSpy: Router) => {
      let serviceSpy = spyOn(service, 'logInUser').and.returnValues(of('123'));
      spyOn(routerSpy, 'navigate').and.stub();
      fixture.detectChanges();

      const mockData = {
        email: 'fakeEmail@gmail.com',
        password: 'fakePass123',
      };

      component.loginForm.setValue(mockData);
      component.loginUser();

      expect(component.loginForm?.valid).toEqual(true);
      expect(serviceSpy).toHaveBeenCalledTimes(1);
      expect(serviceSpy).toHaveBeenCalledWith(mockData as any);
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/']);
    }
  ));
});
