import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DevedoresPage } from './devedores';

@NgModule({
  declarations: [
    DevedoresPage,
  ],
  imports: [
    IonicPageModule.forChild(DevedoresPage),
  ],
})
export class DevedoresPageModule {}
