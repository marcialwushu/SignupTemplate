import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { HomePage } from '../home/home';



@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  signupForm: FormGroup
  load: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuildr: FormBuilder,
    private _authServ: AuthServiceProvider,
    private _loadingCtrl: LoadingController,
    private _alertCtrl: AlertController

  ) {

    this.signupForm = this.formBuildr.group({
      nome: ['', [Validators.required, Validators.minLength(2)]],
      email: ['',[Validators.compose([Validators.required, Validators.email])]],
      senha: ['', [Validators.required, Validators.minLength(3)]],
    });
  }


  onSubmit(): void{
    this.openLoad('Aguarde...');
    this._authServ.registro(this.signupForm.value).subscribe((resultado: any) => {
      this._authServ.criarUsuario(resultado);
      this.navCtrl.setRoot(HomePage);
    },
      (erro: HttpErrorResponse) => {
        console.log(erro.status);

        console.log(erro.statusText);

        console.log(erro.error);

        console.log(erro.headers);
        this.closeLoad();
        let alert = this._alertCtrl.create({ message: `${erro.error.erro[0]}`, title: 'Falha', buttons: [{ text: 'Voltar!' }] });
        alert.present();
      }, () => {
        this.closeLoad();
      }
    )
  }

  ///////Alert Modal//////////
  openLoad(msg: string) {
    this.load = this._loadingCtrl.create({ content: msg });
    this.load.present();
  }

  closeLoad() {
    this.load.dismiss();
  }

}
