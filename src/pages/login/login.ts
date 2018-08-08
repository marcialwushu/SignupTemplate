import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { AlertController, NavController, NavParams, LoadingController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthServiceProvider } from './../../providers/auth-service/auth-service';
import { HttpErrorResponse } from '@angular/common/http';
import { SignupPage } from '../signup/signup';


//@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  loginForm: FormGroup
  load: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    //private _app: App,
    public formBuildr: FormBuilder,
    private _authServ: AuthServiceProvider,
    private _loadingCtrl: LoadingController,
    private _alertCtrl: AlertController

  ) {

    this.loginForm = this.formBuildr.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      senha: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad LoginPage');
  }

  onSubmit(): void {
    this.openLoad('Aguarde...');

    this._authServ.login(this.loginForm.value).subscribe((resultado: any) => {
      console.log(resultado);
      this._authServ.criarUsuario(resultado);

      this.navCtrl.setRoot(HomePage)
    }, (erro: HttpErrorResponse | any) => {
      debugger;
      if (erro instanceof HttpErrorResponse) {
        this.closeLoad();
        if (erro.error.erro != null) {
          this.alerta(erro.error.erro[0]);
        }else{
          this.alerta('Erro de conexão');
        }
      } else {
        this.alerta('Erro de conexão');
      }
    }, () => {
      this.closeLoad();
    }
  );
  }

  alerta(msg: string): void {
    let alert = this._alertCtrl.create({ message: `${msg}`, title: 'Falha', buttons: [{ text: 'Voltar!' }] });
    alert.present();
  }

  goToInscricao(): void {
    this.navCtrl.push(SignupPage);
  }


  ///////////////////Alert Modal////////////////////////////////////////

  openLoad(msg: string) {
    this.load = this._loadingCtrl.create({ content: msg });
    this.load.present();
  }

  closeLoad() {
    this.load.dismiss();
  }

}
