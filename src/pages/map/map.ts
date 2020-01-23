import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RoyalApiProvider } from '../../providers/royal-api/royal-api';

/**
 * Generated class for the MapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare var window: any;

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {
  map: any = {};
  estate: any = {};

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public royalApi: RoyalApiProvider) {
      this.estate = this.navParams.get('estate');
  }

  ionViewDidLoad() {
 
    this.map = {
      lat: this.estate.latitude,
      lng: this.estate.longitude,
      zoom: 12,
      markerLabel: this.estate.address
    };
    console.log(this.estate.latitude);
    console.log(this.estate.longitude);
    console.log(this.estate.address);
  }

  getDirections() {
    window.location = `geo:${this.map.lat},${this.map.lng};u=35`;
  }
/*
  ionViewDidLoad() {
    let estate = this.navParams.data;
    let locationData = this.royalApi.getCurrentLocation();
    let location = locationData.estates[estate.estate.id];
    console.log(estate.estate.id);
    console.log(locationData.estates);
   // console.log(locationData.estates.id[2]);
    this.map = {
      lat: location.latitude,
      lng: location.longitude,
      zoom: 12,
      markerLabel: location.address
    };
    console.log(location.latitude);
    console.log(location.longitude);
  //  console.log(this.estate.address);
  }

  getDirections() {
    window.location = `geo:${this.map.lat},${this.map.lng};u=35`;
  }*/

}