import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { RoyalApiProvider } from '../../providers/royal-api/royal-api';
import { UserSettingsProvider } from '../../providers/user-settings/user-settings';
import { LocationsPage, EstateHomePage } from '../pages';

/**
 * Generated class for the MyEstatesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

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
    public userSettings: UserSettingsProvider) {
  }

  ionViewDidLoad() {
    this.userSettings.getAllFavorites().then(favs => this.favorites = favs);
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

}