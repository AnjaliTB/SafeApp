import {AfterViewInit, Component, ViewChild} from '@angular/core';
import { NavController, Platform } from '@ionic/angular';

import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Subscription } from 'rxjs';

import { filter } from 'rxjs/operators';
import { Storage } from '@ionic/storage';

import { HttpClientModule, HttpClient } from '@angular/common/http';

import { MapType } from '@angular/compiler';


declare var google;
@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements AfterViewInit {
  @ViewChild('map') googleMap;
    mapElement: any;
    map: any;
    mapOptions: any;
    //mapCenter = {lat:null , lng:null};

    searchQuery: any;
    service: any;
    mapCenter = {lat:10.554645599999999 , lng:76.2175682};
    //mapCenter = {lat:10.8505159 , lng:76.2710833};
    markerOptions: any = {position: null, map: null, title: null};
    marker: any;

  constructor(private geolocation: Geolocation, private platform: Platform) {
      
    this.geolocation.getCurrentPosition().then((resp) => {
      this.mapCenter.lat = resp.coords.latitude;
      this.mapCenter.lng = resp.coords.longitude;
      console.log(this.mapCenter.lat);
      console.log(this.mapCenter.lng);
    }).catch((error) => {
        console.log('Error getting location', error);
    });
   }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
      
    
      this.mapElement = this.googleMap.nativeElement;
      this.mapOptions = {
          center: this.mapCenter,
          //center: (this.lat, this.lng),
          zoom: 15
      };
      //this.map = new google.maps.Map(this.mapElement, this.mapOptions);

      setTimeout(() => {
        this.map = new google.maps.Map(this.mapElement, this.mapOptions);
        console.log(this.mapCenter.lat);
        console.log(this.mapCenter.lng);
        this.markerOptions.position = new google.maps.LatLng(this.mapCenter.lat, this.mapCenter.lng);
        this.markerOptions.map = this.map;
        this.markerOptions.title = 'My Location';
        this.marker = new google.maps.Marker(this.markerOptions);
        //console.log(this.marker)

    }, 100);

  }

 myLocation(){
      this.getLocation();
      //this.map = new google.maps.Map(this.mapElement, this.mapOptions);
      
          //console.log(this.marker)
      /*setTimeout(() =>{
        this.myLocation();
      },20000);*/
  }  


  async getLocation(){
    this.geolocation.getCurrentPosition().then((resp) => {
      this.mapCenter.lat = resp.coords.latitude;
      this.mapCenter.lng = resp.coords.longitude;
      console.log("After view init");

      console.log(this.mapCenter.lat);
      console.log(this.mapCenter.lng);
      this.markerOptions.position = new google.maps.LatLng(this.mapCenter.lat, this.mapCenter.lng);
      this.markerOptions.map = this.map;
      this.markerOptions.title = 'My Location';
      this.marker = new google.maps.Marker(this.markerOptions);

    }).catch((error) => {
        console.log('Error getting location', error);
    });
  }
}
