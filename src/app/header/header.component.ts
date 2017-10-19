import { Component, OnInit, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, DoCheck {
  authenticated: boolean;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.authenticated = this.authService.isAuthenticated();
    console.log(this.authenticated);
  }

  ngDoCheck() {
    this.authenticated = this.authService.isAuthenticated();
  }

  onManage() {
    this.router.navigate(['/admin']);
  }

  onLogout() {
    this.authService.logoutUser();
  }

}
