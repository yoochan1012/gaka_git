import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Post } from '../models/post';
import { Observable } from 'rxjs';
import { User } from '../models/User';

const httpOptions0 = {
  headers: new HttpHeaders({
    ContentType: "application/json",
  }),
};

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  prefEndpoint(ep){
    return "http://localhost:5000/" + ep;
    // return ep;
  }

  constructor(private http: HttpClient) { }

  // deleteBoard(){
  //   return this.http.delete<User>('user/boardlist').subscribe();
  // }
}

// 프로젝트 페이지와 분리예정