import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import {ReportOnePage} from "../report-one/report-one";
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  activeMenu: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, menu: MenuController) {

    menu.enable(true);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }
  doReport(){

    console.log('Pushed to ReportOne Page');
    this.navCtrl.push(ReportOnePage);
  }

}
