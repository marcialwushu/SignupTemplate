import { HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IonicstorageProvider } from '../ionicstorage/ionicstorage';


@Injectable()
export class UsuarioServiceProvider {

  private chave_token: string = "token";

  constructor(public http: HttpClientModule, private _storage: IonicstorageProvider) {

  }

  setToken(valor: string) {
    this._storage.set(this.chave_token, valor);
  }

  estaLogado() {
    return this._storage.get("token").then(val => {
      if (val) {
        return val;
      } else {
        return false;
      }
    }).catch((error) => {
      return false;
    });
  }

}
