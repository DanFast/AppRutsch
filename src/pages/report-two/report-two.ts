// Some parts of the code where taken fom this tutorial: https://devdactic.com/ionic-2-images/
import { Component } from '@angular/core';
import {IonicPage,NavParams, NavController, ActionSheetController,
  ToastController, Platform, LoadingController, Loading, AlertController} from 'ionic-angular';

import { File } from '@ionic-native/file';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera, CameraOptions } from '@ionic-native/camera';
import {HomePage} from "../home/home";

declare var cordova: any;
@IonicPage()
@Component({
  selector: 'page-report-two',
  templateUrl: 'report-two.html',
})
export class ReportTwoPage {

  public photos : any;
  public base64Image : string;
  lastImage: string = null;
  loading: Loading;

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
    alert("Your Location" + this.navParams.get('poslat') + ", " + this.navParams.get('poslong') + ", Landslide Location:" + this.navParams.get('slidelat') +
      ", " + this.navParams.get('slidelong'));
  }

  ngOnInit() {
    this.photos = [];
  }

  public presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Image Source',
      buttons: [
        {
          text: 'Use Camera',
          icon: 'camera',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Load from Library',
          icon: 'images',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  public takePicture(sourceType) {
    // Create options for the Camera Dialog
    var options = {
      quality: 50,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };

    // Get the data of an image
    this.camera.getPicture(options).then((imagePath) => {
      //alert("0, " + imagePath);
      // Special handling for Android library
      if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
        this.filePath.resolveNativePath(imagePath)
          .then(filePath => {
            let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
            let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
            this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
          });
      } else {
        var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
        var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
        this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
      }
    }, (err) => {
      this.presentToast('Error while selecting image.');
    });
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
  doUpload(){
    this.loading = this.loadingCtrl.create({
      content: 'Uploading...',
      duration: 3000
    });
    this.loading.present();
    this.showAlert();
    this.navCtrl.goToRoot(HomePage);
  }

  // Create a new name for the image
  private createFileName() {
    //Return the number of milliseconds since 1970/01/01
    var d = new Date(),
      n = d.getTime(),
      newFileName =  n + ".jpg";
    return newFileName;
  }

// Copy the image to a local folder
  private copyFileToLocalDir(namePath, currentName, newFileName) {
    //alert("1, " + namePath + ", " + currentName + ", " + newFileName);
    this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
      this.lastImage = newFileName;
      this.base64Image = cordova.file.dataDirectory + newFileName;
      //alert("2, " + this.base64Image)
      this.photos.push(this.base64Image);
      this.photos.reverse();
    }, error => {
      this.presentToast('Error while storing file.');
    });
  }

  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

// Always get the accurate path to your apps folder
  public pathForImage(img) {
    if (img === null) {
      return '';
    } else {
      return cordova.file.dataDirectory + img;
      //return cordova.file.externalDataDirectory + img;
    }
  }
  showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Landslide successful reported!',
      subTitle: 'Your friend, Obi wan Kenobi, just accepted your friend request!',
      buttons: ['OK']
    });
    alert.present();
  }

}
