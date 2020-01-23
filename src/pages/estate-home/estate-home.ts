import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OverviewPage, MapPage } from '../pages';
import { SimilarPage } from '../similar/similar';

/**
 * Generated class for the EstateHomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-estate-home',
  templateUrl: 'estate-home.html',
})
export class EstateHomePage {
  overviewTab: any;
  mapTab: any;
  SimilarTab: any;
  estate: any = {};
  location: any = {};

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.overviewTab = OverviewPage;
    this.mapTab = MapPage;
    this.SimilarTab = SimilarPage;
    this.estate = this.navParams.get('estate');
    this.location = this.navParams.get('locat');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EstateHomePage', location);
    console.log('ionViewDidLoad EstateHomePage', this.estate.refNumber);
  }

  goHome() {
    this.navCtrl.popToRoot();
  }

}
