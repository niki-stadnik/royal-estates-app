import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events, LoadingController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { MyEstatesPage, LocationsPage, EstateHomePage } from '../pages/pages';
import { RoyalApiProvider } from '../providers/royal-api/royal-api';
import { UserSettingsProvider } from '../providers/user-settings/user-settings';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = MyEstatesPage;
  favoriteEstates: any[];

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public userSettings: UserSettingsProvider,
    public loadingController: LoadingController,
    public royalApi: RoyalApiProvider,
    public events: Events) {
    this.initializeApp();



  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.userSettings.getAllFavorites().then(favs => this.favoriteEstates = favs);
      this.events.subscribe('favorites:changed', () => this.refreshFavorites());
    });
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }

  goToLocations() {
    this.nav.push(LocationsPage);
  }

  refreshFavorites() {
    this.userSettings.getAllFavorites().then(favs => this.favoriteEstates = favs);

  }

  goToEstate(favorite) {
    let loader = this.loadingController.create({
      content: 'Getting data...'
    });
    loader.present();
    this.royalApi.getLocationData(favorite.locationId)
      .subscribe(e => {
        loader.dismiss();
        this.nav.push(EstateHomePage, { estate: favorite.estate });
      });
  }
}
