import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_API } from '../../app/app.api';
import { Usuario } from '../../model/usuario.model';
import { IonicstorageProvider } from '../ionicstorage/ionicstorage';


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

}
