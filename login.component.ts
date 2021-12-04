import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from 'src/app/services/auth.service';
import { Login, userNoPW } from '../../models/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit(): void {
  }

  onLoginSubmit() {
    const login: Login = {
    username: this.username,
    password: this.password,
  };
  this.authService.authenticateUser(login).subscribe((data) => {
    if (data.success) {
      this.authService.storeUserData(data.token, data.userNoPW);
      this.flashMessage.show('You can enter', {
        cssClass: 'alert-success',
        timeout: 3000,
      });
      this.router.navigate(['/dashboard']);
    } else {
      this.flashMessage.show(data.msg, {
        cssClass: 'alert-danger',
        timeout: 3000,
      });
      this.router.navigate(['/login']);
    }
  });

  }

  
    
}
