import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  userEmail: string;
  isLoggedIn$: Observable<boolean>;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.userEmail = JSON.parse(localStorage.getItem('user')).email

    this.isLoggedIn$ = this.authService.isLoggedIn()
  }

  onLogOut() {
    this.authService.logOut();
  }

}
