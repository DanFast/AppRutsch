
import { IonicPage, NavController, NavParams,Platform } from 'ionic-angular';
import { Component, ViewChild, OnInit, AfterViewInit, ElementRef } from '@angular/core';

declare var google: any;

import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  LatLng,
  CameraPosition,
  MarkerOptions,
  Marker,
} from '@ionic-native/google-maps';
import 'rxjs/add/operator/map';
import { Http } from '@angular/http';
import {DetailPage} from "../detail/detail";

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage implements OnInit, AfterViewInit {

  //@ViewChild('map') element;
  @ViewChild('map') element: ElementRef;
  map: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              private googleMaps: GoogleMaps, public nav: NavController ,
              public http: Http, public plt: Platform){}


  ngOnInit(){
    console.log('On Init');
  }

  ngAfterViewInit() {
    this.plt.ready().then(() => {
      this.http.get('assets/geoData/data.json')
        .map(res => res.json())
        .subscribe(slides => this.initMap(slides));
    });
  }

  initMap (slides) {

    console.log('initMap()');
    if (this.plt.is('cordova') === true) {
      let map: GoogleMap = this.googleMaps.create(this.element.nativeElement);
      this.initNativeMaps(map, slides);
    } else {
      this.initJSMaps(slides);
    }
  }

  initNativeMaps(map, slides){
    map.one(GoogleMapsEvent.MAP_READY).then((data: any) => {

      //Camera to center of Austria
      let cameraCoordinates: LatLng = new LatLng(47.456742, 14.204689);

      let cameraPosition = {
        target: cameraCoordinates,
        zoom: 6
      };

      //map.animateCamera(cameraPosition);
      map.moveCamera(cameraPosition);

      slides.forEach((slide) => {

        let coordinates: LatLng = new LatLng(slide.position.lat, slide.position.lgn);

        let markerOptions: MarkerOptions = {
          position: coordinates,
          title: slide.title + ':\nLat: ' + slide.position.lat + ", Long: " + slide.position.lgn + '\n\n<<Click for detail Information!>>\n'
        };

        map.addMarker(markerOptions)
          .then((marker: Marker) => {
            marker.addEventListener(GoogleMapsEvent.INFO_CLICK).subscribe(
              (data) => {
                this.nav.push(DetailPage, {'slide':slide});
              }
            );
          });
      });
    });
  }

  initJSMaps(slides) {

    //Camera to center of Austria
    let cameraCoordinates: LatLng = new LatLng(47.456742, 14.204689);

    this.map = new google.maps.Map(this.element.nativeElement, {
      zoom: 7,
      center: cameraCoordinates
    });

    slides.forEach((slide) => {

      let coordinates: LatLng = new LatLng(slide.position.lat, slide.position.lgn);

      let marker = new google.maps.Marker({
        position: coordinates,
        map: this.map,
        title: 'Hello World!'
      });

      var infowindow = new google.maps.InfoWindow({
        content: "<h3 id='click'>Clickable Element</b>"
      });

      marker.addListener('click', function () {
        infowindow.open(this.map, marker);
      });


      /*google.maps.event.addListener(infowindow, 'domready', function () {
        document.getElementById("click").addEventListener("click", function (e) {
          console.log("hello world");
        });
      });*/
    });
  }

}
