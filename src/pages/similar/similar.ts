import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RoyalApiProvider } from '../../providers/royal-api/royal-api';
import * as _ from 'lodash';

/**
 * Generated class for the SimilarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-similar',
  templateUrl: 'similar.html',
})
export class SimilarPage {
  regionFilter: 'all';
  similar: any[];
  estate: any = {};
  allSimilar: any[];
  location: any = {};
  games: any[];
  dateFilter: string;
  allGames: any[];
  useDateFilter = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public royalApi: RoyalApiProvider) {
  }

  ionViewDidLoad() {
    this.estate = this.navParams.get('estate');
    let locationData = this.royalApi.getCurrentLocation();
    this.location = locationData.location.name;
    this.similar = locationData.estates;
    this.allSimilar = locationData.estates;
    this.filterRegion();
  }

  filterRegion() {
    if (this.regionFilter === 'all') {
      this.similar = this.allSimilar;
    } else {
      this.similar = _.filter(this.allSimilar, s => s.region === this.estate.region);
    }
  }

  getHeader(record, recordIndex, records) {
    if (recordIndex === 0 || record.region !== records[recordIndex - 1].region) {
      return record.region;
    }
    return null;
  }


  typeChanged() {
    if (this.useDateFilter) {
      // this.games = _.filter(this.allGames, g => moment(g.time).isSame(this.dateFilter, 'day'));
    } else {
      this.games = this.allGames;
    }
  }

}
