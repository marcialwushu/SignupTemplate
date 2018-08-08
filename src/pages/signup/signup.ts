import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';



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
