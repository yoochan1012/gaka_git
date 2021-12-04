import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-cardboard',
  templateUrl: './cardboard.component.html',
  styleUrls: ['./cardboard.component.scss']
})
export class CardboardComponent implements OnInit {
  username: string; name: string; board: string;

  constructor(private flashMessage: FlashMessagesService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    const userNoPW: any = localStorage.getItem('userNoPW');
    this.username = JSON.parse(userNoPW).username;

    let cardex: any = localStorage.getItem('card');

    if (cardex !== null) {
      const card = JSON.parse('cardex');

      this.name = card.name;
      this.board = card.board;
    }
  }

  onCardBoardSubmit() {
    const card: any = {
      username: this.username,
      name: this.name,
      board: this.board,
    };
    // console.log(card);

    this.authService.regCard(card).subscribe((data) => {
      if (data.success) {
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
        this.router.navigate(['/']);
      }
    });
  }
}
