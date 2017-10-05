/*Some source Code was taken from this tutorial https://devdactic.com/ionic-2-images/ */
import { Component } from '@angular/core';
import {IonicPage,NavParams, NavController, ActionSheetController,
  ToastController, Platform, LoadingController, Loading, AlertController} from 'ionic-angular';

import { File } from '@ionic-native/file';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera, CameraOptions } from '@ionic-native/camera';


@IonicPage()
@Component({
  selector: 'page-report-two',
  templateUrl: 'report-two.html',
})
export class ReportTwoPage {

  public photos : any;
  public base64Image : string;
  imageURL;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private camera: Camera, private transfer: Transfer,
              private file: File, private filePath: FilePath,
              public actionSheetCtrl: ActionSheetController,
              public toastCtrl: ToastController, public platform: Platform,
              public loadingCtrl: LoadingController, private alertCtrl : AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReportTwoPage');
    console.log(this.navParams.get('poslat'));
    console.log(this.navParams.get('poslong'));
    console.log(this.navParams.get('slidelat'));
    console.log(this.navParams.get('slidelong'));
  }

  ngAfterViewInit() {
    alert(this.navParams.get('poslat') + ", " + this.navParams.get('poslong') + ", " + this.navParams.get('slidelat') +
      ", " + this.navParams.get('slidelong'));
  }

  ngOnInit() {
    this.photos = [];
  }

  deletePhoto(index) {
    let confirm = this.alertCtrl.create({
        title: 'Sure to DELETE this picture?',
        message: '',
        buttons: [
          {
            text: 'No',
            handler: () => {
              console.log('Disagree clicked');
            }
          }, {
            text: 'Yes',
            handler: () => {
              console.log('Agree clicked');
              this.photos.splice(index, 1);
              //return true;
            }
          }
        ]
      });
    confirm.present();
  }

  takePhoto() {
    console.log('takePhoto()');
    const options : CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then((imageData) => {
        this.base64Image = imageData;
        //alert(this.base64Image);
        this.photos.push(this.base64Image);
        this.photos.reverse();
      }, (err) => {
        console.log(err);
      });
  }

  takePic(){
    this.camera.getPicture().then((imageData) => {
      this.imageURL = imageData;
      alert(imageData);
    }, (err) => {
      console.log(err);
    });
  }

  doUpload(){

  }

}
