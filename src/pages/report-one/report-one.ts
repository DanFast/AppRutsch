import { IonicPage, NavController, NavParams,Platform, LoadingController} from 'ionic-angular';
import { Component, ViewChild, OnInit, AfterViewInit, ElementRef } from '@angular/core';

declare var google: any;

import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  LatLng,
  CameraPosition,
  MarkerOptions,
  Marker,

} from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation';
import 'rxjs/add/operator/map';
import { Http } from '@angular/http';
import {ReportTwoPage} from "../report-two/report-two";
@IonicPage()
@Component({
  selector: 'page-report-one',
  templateUrl: 'report-one.html',
})
export class ReportOnePage implements OnInit, AfterViewInit {

  map: GoogleMap;
  mapElement: HTMLElement;
  private poslong: number;
  private poslat: number;
  private landslideMarker : Marker;
  private positionMarker : Marker;
  private posMarkerIsSet: boolean = false;
  private slideMarkerIsSet: boolean = false;

  pushPage: any;
  params: Object;

  constructor(private navCtrl: NavController, private navParams: NavParams,
              private googleMaps: GoogleMaps, private nav: NavController ,
              public http: Http, public plt: Platform, private geolocation: Geolocation,
              public loadingCtrl: LoadingController) {

    this.pushPage = ReportTwoPage;
    this.params = { id: 42 };
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReportOnePage');
  }
  ngOnInit(){
    console.log('On Init');
  }

  ngAfterViewInit() {
    this.plt.ready().then(() => {
      this.presentLoading();
      this.geolocation.getCurrentPosition({
       timeout: 27000,
       enableHighAccuracy: true
     }).then((location) => {
       console.log('ngAfterViewInit()');
       console.log(location.coords.longitude);
       console.log(location.coords.latitude);
       this.poslong = location.coords.longitude;
       this.poslat = location.coords.latitude;
       console.log('this.lng: '+this.poslong);
       console.log('this.lat: '+this.poslat);

       this.initMap();

     }).catch((error) => {
       console.log('Error getting location', error);
     });
    });
  }

  initMap(){
    console.log('initMap()');

    if (this.plt.is('cordova') === true) {

      this.mapElement = document.getElementById('reportmap');

      let mapOptions: GoogleMapOptions = {
        camera: {
          target: {
            lat: this.poslat,
            lng: this.poslong
          },
          zoom: 14,
          tilt: 30,

        },
        controls: {
          compass: true,
          //myLocationButton: true,
          //indoorPicker: true,
          mapToolbar: true
        },
        mapType: "MAP_TYPE_TERRAIN",
      };

      this.map = this.googleMaps.create(this.mapElement, mapOptions);
      this.initNativeMaps();
    } else {
      this.initJSMaps();
    }
  }
  initNativeMaps(){

    // Wait the MAP_READY before using any methods.
    this.map.one(GoogleMapsEvent.MAP_READY)
      .then(() => {
        console.log('Map is ready!');

        /*/ Now you can use all methods safely.
        this.map.addMarker({
          title: 'Ionic',
          icon: 'blue',
          animation: 'DROP',
          position: {
            lat: 43.0741904,
            lng: -89.3809802
          }
        })
          .then(marker => {
            marker.on(GoogleMapsEvent.MARKER_CLICK)
              .subscribe(() => {
                alert('clicked');
              });
          });*/
      });

  }
  initJSMaps(){
    console.log('initJSMaps...');
  }

  findMe(){
    console.log('findMe() called!');
    if(this.posMarkerIsSet == true){
      this.positionMarker.remove();
      this.posMarkerIsSet = false;
    }
    this.posMarkerIsSet = true;

    let cameraCoordinates: LatLng = new LatLng(this.poslat, this.poslong);

    let cameraPosition = {
      target: cameraCoordinates,
      zoom: 16
    };

    this.map.animateCamera(cameraPosition);

    this.map.addMarker({
      title: 'Your Position',
      icon: 'http://google.com/mapfiles/arrow.png',
      animation: 'DROP',
      position: {
        lat: this.poslat,
        lng: this.poslong
      }
    })
      .then(posmarker => {
        this.positionMarker = posmarker;
        posmarker.on(GoogleMapsEvent.MARKER_CLICK)
          .subscribe(() => {
            //alert('Your Position');
          });
      });
  }

  addMarker(){
    console.log('addMarker() called!');
    if(this.slideMarkerIsSet == true){
      this.landslideMarker.remove();
      this.slideMarkerIsSet = false;
    }
    this.slideMarkerIsSet = true;

    let cameraCoordinates: LatLng = new LatLng(this.poslat, this.poslong);

    let cameraPosition = {
      target: cameraCoordinates,
      zoom: 18
    };

    this.map.animateCamera(cameraPosition);


    let markerOptions: MarkerOptions ={
      title: 'Drag Marker to Lanslide',
      icon: 'blue',
      animation: 'DROP',
      draggable: true,
      position: {
        lat: this.poslat,
        lng: this.poslong
      }
    };

    this.map.addMarker(markerOptions)
      .then(res => {
        this.landslideMarker = res;
        res.on(GoogleMapsEvent.MARKER_CLICK)
          .subscribe(() => {
            //alert(this.landslideMarker.getPosition());
          });
      });
  }

  nextPage(){

    if(this.posMarkerIsSet == true && this.slideMarkerIsSet == true){
      this.params= {
          poslat: this.positionMarker.getPosition().lat,
          poslong: this.positionMarker.getPosition().lng,
          slidelat: this.landslideMarker.getPosition().lat,
          slidelong: this.landslideMarker.getPosition().lng
      }

      this.navCtrl.push(ReportTwoPage, this.params);
    }

    if(this.posMarkerIsSet == true && this.slideMarkerIsSet == false){
      this.params= {
        poslat: this.positionMarker.getPosition().lat,
        poslong: this.positionMarker.getPosition().lng,
        slidelat: this.positionMarker.getPosition().lat,
        slidelong: this.positionMarker.getPosition().lng
      }

      this.navCtrl.push(ReportTwoPage, this.params);
    }

    if(this.posMarkerIsSet == false && this.slideMarkerIsSet == false){
      this.params= {
        poslat: this.poslat,
        poslong: this.poslong,
        slidelat: this.poslat,
        slidelong: this.poslong
      }

      this.navCtrl.push(ReportTwoPage, this.params);
    }
    if(this.posMarkerIsSet == false && this.slideMarkerIsSet == true){
      this.params= {
        poslat: this.poslat,
        poslong: this.poslong,
        slidelat: this.landslideMarker.getPosition().lat,
        slidelong: this.landslideMarker.getPosition().lng
      }

      this.navCtrl.push(ReportTwoPage, this.params);
    }
  }

  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 3000
    });
    loader.present();
  }

}
