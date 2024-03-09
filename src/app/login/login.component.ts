import { Component } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from "@angular/forms";
import {ErrorStateMatcher} from "@angular/material/core";
import {HttpClient} from "@angular/common/http";

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    trigger('slideInOut', [
      state('signIn', style({
        transform: 'translate3d(0, 0, 0)'
      })),
      state('signUp', style({
        transform: 'translate3d(-100%, 0, 0)'
      })),
      transition('signIn => signUp', animate('1200ms ease-in-out')),
      transition('signUp => signIn', animate('1200ms ease-in-out'))
    ])
  ]
})
export class LoginComponent {
  signUp = false;

  //Imported from Angular Material Error
  matcher = new MyErrorStateMatcher()

  //Modulo para cambiar de Sign In a Sign Up de acuerdo al boton
  toggleSignUp() {
    this.signUp = !this.signUp;
  }

  form: FormGroup;

  constructor(private formBuilder: FormBuilder, private Http: HttpClient) {
    this.form = new FormGroup({});
    this.buildForm();
  }

  private buildForm() {
    this.form = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      codEmpleado: new FormControl('', [Validators.required]),
      nombres: new FormControl('', [Validators.required]),
      apellidos: new FormControl('', [Validators.required]),
      cedula: new FormControl('', [Validators.required]),
      contacto: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }
  ngOnInit() {

  }


  save(Event: Event) {
  Event.preventDefault();
  if (this.form.valid) {
    const value = this.form.value;
    this.Http.post('http://localhost:8080/user_system/add', value).subscribe(response => {
      console.log(response);
      this.form.reset();
    }, error => {
      console.error(error);
    });
  } else {
    this.form.markAllAsTouched();
  }
}

register(Event: Event) {
  Event.preventDefault();
  if (this.form.valid) {
    const value = this.form.value;
    this.Http.post('http://localhost:8080/register_user/add', value).subscribe(response => {
      console.log(response);
      this.form.reset();
    }, error => {
      console.error(error);
    });
  } else {
    this.form.markAllAsTouched();
  }
}


  //Validaciones Personalizadas


}
