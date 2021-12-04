import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private authService: AuthService,
    private flashMessage: FlashMessagesService,
    private router: Router) { }

  ngOnInit(): void {
  }

  onLogoutClick(): void {
    this.authService.logout();
    this.flashMessage.show("Sign Out", {
      cssClass: 'alert-warning',
      timeout: 5000,
    });
    this.router.navigate(['/']);
  }

  checkLoggedIn(): boolean {
    return this.authService.loggedIn();
  }
}
