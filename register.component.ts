import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from 'src/app/services/auth.service';
import { ValidateService } from 'src/app/services/validate.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  name: string;
  username: string;
  email: string;
  password1: string;
  password2: string;

  constructor(private validateService: ValidateService, private flashMessage: FlashMessagesService,
    private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onRegisterSubmit(): any{
    if (this.password1 !== this.password2) {
      this.flashMessage.show('비밀번호가 맞지 않습니다. 다시 입력하세요.', {
        cssClass: 'alert-danger',
        timeout: 3000,
      });
      return false;
    }
  
    if (!this.validateService.validateEmail(this.email)) {
      this.flashMessage.show('유효한 이메일주소를 입력하세요.', {
        cssClass: 'alert-danger',
        timeout: 3000,
      });
      return false;
    }
      
    const user = {
      name: this.name,
      email: this.email,
      username: this.username,
      password: this.password1,
    };

    if (!this.validateService.validateRegister(user)) {
      this.flashMessage.show('빈칸 빠짐없이 입력하세요.', {
        cssClass: 'alert-danger',
        timeout: 3000,
      });
      return false;
    }

    this.authService.registerUser(user).subscribe((data) => {
      if (data.success) {
        this.flashMessage.show('You are now registered and can log in', {
          cssClass: 'alert-success',
          timeout: 3000,
        });
        this.router.navigate(['/login']);
      } else {
        this.flashMessage.show('Something went wrong', {
          cssClass: 'alert-danger',
          timeout: 3000,
        });
        this.router.navigate(['/register']);
      }
    });
  }
}
