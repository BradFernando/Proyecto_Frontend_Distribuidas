import {Component} from '@angular/core';
import {trigger, state, style, animate, transition} from '@angular/animations';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from "@angular/forms";
import {ErrorStateMatcher} from "@angular/material/core";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

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
	
	formLogin: FormGroup = new FormGroup({
		username: new FormControl('', [Validators.required]),
		password: new FormControl('', [Validators.required]),
	});
	
	formRegister: FormGroup = new FormGroup({
		name: new FormControl('', [Validators.required]),
		lastname: new FormControl('', [Validators.required]),
		username: new FormControl('', [Validators.required]),
		password: new FormControl('', [Validators.required]),
		email: new FormControl('', [Validators.required, Validators.email]),
	});
	
	constructor(private Http: HttpClient, private router: Router) {
	}
	
	
	login(Event: Event) {
		//jwt login
		Event.preventDefault();
		console.log("aaaa")
		if (this.formLogin.valid) {
			const value = this.formLogin.value;
			console.log(value);
			this.Http.post('http://localhost:8080/authenticate', value, {responseType: 'text'}).subscribe({
				next: response => {
					console.log(response);
					this.formLogin.reset();
					
					localStorage.setItem('token', response.toString()); //LINEA PARA GUARDAR EL TOKEN EN EL LOCAL STORAGE
					
					const token = localStorage.getItem('token');
					
					console.log(token);
					
					this.router.navigate(['/dashboard-Principal']).then(r => console.log(r));
				},
				error: error => {
					console.error(error);
					const errorResponse = JSON.parse(error.error) as ErrorResponse;
					alert(errorResponse.message);
				},
				complete: () => {
					console.log('complete')
				}
			});
		} else {
			this.formLogin.markAllAsTouched();
		}
	}
	
	register(Event: Event) {
		Event.preventDefault();
		if (this.formRegister.valid) {
			const value = this.formRegister.value;
			console.log(value);
			this.Http.post('http://localhost:8080/register', value, {responseType: 'text'}).subscribe({
				next: response => {
					console.log(response);
					this.formRegister.reset();
					this.signUp = false;
					alert('Usuario registrado con exito');
				},
				error: error => {
					console.error(error)
					const jsonError = JSON.parse(error.error);
					console.log(jsonError);
					
					if (isErrorsResponse(jsonError)) {
						console.log(1)
						const errors = jsonError as ErrorResponse[];
						
						const errorsGrouped: ErrorsGrouped[] = [];
						errors.forEach(e => {
							const found = errorsGrouped.find(eg => eg.target === e.target);
							if (found) {
								found.errors.push(e.message);
							} else {
								errorsGrouped.push({target: e.target, errors: [e.message]});
							}
						});
						
						errorsGrouped.forEach(eg => {
							const control = this.formRegister.get(eg.target);
							if (control) {
								control.setErrors({server: eg.errors.join(', ')});
							}
						});
						return;
					}
					
					if (isErrorResponse(jsonError)) {
						console.log(2)
						alert(jsonError.message);
						return;
					}
				},
				complete: () => {
				}
			});
		} else {
			this.formLogin.markAllAsTouched();
		}
	}
	
	//Validaciones Personalizadas
}

export interface ErrorResponse {
	status: number;
	message: string;
	target: string; //target is equal to the name of the field
}

export interface ErrorsGrouped {
	target: string;
	errors: string[];
}

function isErrorResponse(arg: any): arg is ErrorResponse {
	return arg && arg.status && arg.message;
}

function isErrorsResponse(arg: any): arg is ErrorResponse[] {
	return Array.isArray(arg) && arg.every(isErrorResponse);
}