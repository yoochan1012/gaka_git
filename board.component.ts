import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Post } from 'src/app/models/post';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  users: any;


  // posts: Post[] = [
  // {'no':0, 'title': 'GAKA', 'username': 'GAKA', 'cDate': new Date(), 'rDate': new Date()}
  // ];
  // headerColumns: string[] = ['no', 'title', 'username', 'cDate', 'rDate'];
  constructor(private authService: AuthService) { }

  ngOnInit() {
     this.authService.getList().subscribe((users) => {
       this.users = users;
     });
  }

  deleteBoard(id: string) {
    if(confirm(
      '삭제할까요?') == true){
          alert('삭제되었습니다!');
          //this.boardService.deleteBoard(postID).then(response => {window.location.reload();});
      }
    
  }

}
