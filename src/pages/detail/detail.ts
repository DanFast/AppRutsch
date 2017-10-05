import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {

  private slide: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.slide = navParams.get('slide');// || landslides.defaultLandslide;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailPage');
  }

}
