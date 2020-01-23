import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RoyalApiProvider } from '../../providers/royal-api/royal-api';
import * as _ from 'lodash';
import { EstateHomePage } from '../pages';


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
  useTypeFilter = false;
  type: any = {};
  flag = false;
  save: any[];
  flagTF = false;
  saveTF = false;

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


  getHeader(record, recordIndex, records) {
    if (recordIndex === 0 || record.region !== records[recordIndex - 1].region) {
      return record.region;
    }
    return null;
  }



  filterRegion() {
    if (this.regionFilter === 'all') {
      this.similar = this.allSimilar;
      this.typeChanged();
    } else {
      this.similar = _.filter(this.allSimilar, s => s.region === this.estate.region);
      this.typeChanged();
    }
  }
  typeChanged() {
    if (this.useTypeFilter) {
      console.log('drop menu', this.type);
      this.similar = _.filter(this.similar, g => g.type === this.type);
    } else {
      this.similar = this.similar;
    }
    if(this.type === this.save && this.saveTF === this.useTypeFilter){
      this.flag = false;
    }
    else{
      this.flag = true;
    }
    this.save = this.type;
    this.saveTF = this.useTypeFilter;
    if(this.flag){
      this.flag = false;
      console.log('triger');
      this.ionViewDidLoad();
    }
    
  }



  itemTapped($event, estate) {
    this.navCtrl.push(EstateHomePage, { estate: estate });
    console.log('sent', estate);
  }

  refreshAll(refresher) {
    this.royalApi.refreshCurrentLocation().subscribe(() => {
      refresher.complete();
      this.ionViewDidLoad();
    });
  }

}
