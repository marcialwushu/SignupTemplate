import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()
export class RestProvider {

  private apiUrl = 'http://www.fgf.edu.br/wp-json/wp/v2';

  constructor(public http: HttpClient) {
    console.log('Hello RestProvider Provider');
  }

  getPost(){
    return this.http.get(this.apiUrl + '/posts');
  }

  getPage(){
    return this.http.get(this.apiUrl + '/pages');
  }

  getCategory(){
    return this.http.get(this.apiUrl + '/posts?categories=218');
  }

}
