import { HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';


@Injectable()
export class IonicstorageProvider {

  constructor(public http: HttpClientModule, private _storage: Storage) {

  }
  set(chave: string, valor: string){
    this._storage.set(chave,valor);
  }

  remover(chave: string) {
    this._storage.remove(chave);
  }

  get(chave: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this._storage.get(chave).then((val) => {
        resolve(val);
      }).catch(() => {
        reject(reject)
      });
    });
  }

  clearAll(){
    this._storage.clear();
  }

}
