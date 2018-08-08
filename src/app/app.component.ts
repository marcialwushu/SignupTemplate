import { AuthServiceProvider } from './../providers/auth-service/auth-service';
import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from '../pages/login/login';
import { DevedoresPage } from '../pages/devedores/devedores';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage:any = LoginPage;

  pages: Array<{ title: string, component: any, icon?: string }>;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private _auth: AuthServiceProvider,
    //private _usuServ: UsuarioServiceProvider
  ) {

    this.initializeApp();


  }

  goToperfil() {
    //TO DO
    alert("Fazer pagina");
  }

  goToSair(){
    this._auth.sair();
    this.rootPage = LoginPage;
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this._auth.get().then((valor: any) => {
        if (valor == undefined) {
          this.rootPage = LoginPage;
        } else {
          this._auth.setarUsuario(JSON.parse(valor));
          this.rootPage = DevedoresPage;
        }
      });

      this.statusBar.styleDefault();
      this.splashScreen.hide();

    });
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }
}

