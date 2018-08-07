import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_API } from '../../app/app.api';
import { Usuario } from '../../model/usuario.model';
import { IonicstorageProvider } from '../ionicstorage/ionicstorage';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class AuthServiceProvider {

  usuario: Usuario;
  url: string = URL_API + 'conta/';
  logado = false;

  constructor(public http: HttpClient, private _storage: IonicstorageProvider) {
  }

  //Função da Página de Login
  criarUsuario(valor: any) {
    this.usuario = { nome: valor.result.user.userName, token: valor.result.access_token, email: valor.result.user.userName }
    console.log('TOKEN RECEBIDO');
    console.log(valor.result.access_token);
    this._storage.clearAll();
    this._storage.set('usuario', JSON.stringify(this.usuario));
  }

  //Instaciar usuario na tela de Login
  setarUsuario(valor: Usuario) {
    this.usuario = { nome: valor.nome, token: valor.token, email: valor.email }
    this._storage.set('usuario', JSON.stringify(valor));
  }

  get(){
    return this._storage.get('usuario');
  }

  registro(data): Observable<any> {
    return this.http.post<any>(this.url + 'registro', JSON.stringify(data), { headers: { 'Content-Type': 'application/json' } });
  }

  login(data): Observable<any> {
    return this.http.post<any>(this.url + 'login', JSON.stringify(data), { headers: { 'Content-Type': 'application/json' } });
  }

  estaLogado(): boolean {
    return this.usuario != undefined;
  }

  sair() {
    this._storage.clearAll();
    this.usuario = undefined;
  }

}
