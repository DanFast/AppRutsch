import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {DetailPage} from '../detail/detail';

@IonicPage()
@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
})
export class ListPage {

  public slides: any;

  landslide: string = "mine";


  constructor(public navCtrl: NavController, public navParams: NavParams) {


    this.slides = [
      {
        "id": 1,
        "name": "Burt Bear",
        "position":{"lat":47.660967,"lgn":14.767841},
        "title":"Gesäuse",
        "date":"03.08.2017",
        "pic":"../assets/img/landslide-sign.png"
      },
      {
        "id": 2,
        "name": "Danzel Washington",
        "position":{"lat":47.595617,"lgn":14.684998},
        "title":"Gams",
        "date":"28.07.2017",
        "pic":"../assets/img/landslide-sign.png"
      },
      {
        "id": 3,
        "name": "Donald Duck",
        "position":{"lat":47.707215,"lgn":14.958275},
        "title":"Hochkar",
        "date":"21.09.2017",
        "pic": "../assets/img/landslide-sign.png"
      },
      {
        "id": 4,
        "name": "Anders Frisk",
        "position":{"lat":47.719934,"lgn":14.161917},
        "title":"Höss",
        "date":"01.09.2017",
        "pic": "N/A"
      }
    ];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabListPage');
  }

  public showDetails(slide: any){
    this.navCtrl.push(DetailPage, {'slide': slide});
  }

}
