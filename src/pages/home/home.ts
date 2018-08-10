import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import { RestProvider } from '../../providers/rest/rest';
import { DevedoresPage } from '../devedores/devedores';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public pages = new Array<any>();
  page;
  pushPage: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public restProvider: RestProvider,
    public http: HttpClientModule

  ) {
    this.restProvider.getCategory().subscribe( data => {
      console.log(data);
      this.page = data;
    })
    this.getPages();

    this.pushPage = DevedoresPage;

  }

  onSignup(): void{
    this.navCtrl.push(SignupPage)
  }

  getPages(){
    this.restProvider.getPage().subscribe
    (data => {
      console.log(data);
      const response = (data as any);
      this.pages = this.pages.concat(response.results);
    })
  }



}
