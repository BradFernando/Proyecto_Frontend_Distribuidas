import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
	
	protected user?: User;
	
	constructor(private http: HttpClient, private router: Router) {
	
	}
	
	ngOnInit(): void {
		this.http
		.get<User>('http://localhost:8080/whoami', {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}})
		.subscribe({
			next: user => this.user = user,
			error: () => {
				localStorage.removeItem('token');
				this.router.navigate(['/login']).then(r => console.log(r));
			}
		});
	}
	
	logout() {
		localStorage.removeItem('token');
		this.router.navigate(['/login']).then(r => console.log(r));
	}
}

export interface User {
	id: number;
	role: string;
	name: string;
	lastname: string;
	username: string;
	password: string;
	email: string;
	enabled: boolean;
}