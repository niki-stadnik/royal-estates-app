import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, LoadingController } from 'ionic-angular';
import { RoyalApiProvider } from '../../providers/royal-api/royal-api';
import { UserSettingsProvider } from '../../providers/user-settings/user-settings';
import { LocationsPage, EstateHomePage } from '../pages';


@IonicPage()
@Component({
  selector: 'page-my-estates',
  templateUrl: 'my-estates.html',
})
export class MyEstatesPage {
  favorites = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingController: LoadingController,
    public royalApi: RoyalApiProvider,
    public userSettings: UserSettingsProvider,
    public events: Events) {
  }

  ionViewDidLoad() {
    this.userSettings.getAllFavorites().then(favs => this.favorites = favs);
    this.events.subscribe('favorites:changed', () => this.refreshFavorites());
  }

  goToLocations() {
    this.navCtrl.push(LocationsPage);
  }


  favoriteTapped($event, favorite) {
    let loader = this.loadingController.create({
      content: 'Getting data...'
    });
    loader.present();
    this.royalApi.getLocationData(favorite.locationId)
      .subscribe(e => {
        loader.dismiss();
        this.navCtrl.push(EstateHomePage, { estate: favorite.estate });
      });
  }

  refreshFavorites() {
    this.userSettings.getAllFavorites().then(favs => this.favorites = favs);
    
  }

}
