import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { RoyalApiProvider } from '../../providers/royal-api/royal-api';
import { EstateHomePage } from '../pages';
import * as _ from 'lodash';

/**
 * Generated class for the EstatesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-estates',
  templateUrl: 'estates.html',
})
export class EstatesPage {
  estates = [];
  private allEstates: any;
  private allEstateRegions: any;
  public queryText: string;
  locat: string;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public royalApi: RoyalApiProvider,
    public loadingController: LoadingController) {
      this.locat = this.navParams.get('name');
  }
  

  ionViewDidLoad() {
    let selectedLocation = this.navParams.data;
 
    let loader = this.loadingController.create({
      content: 'Getting data...'
    });
    loader.present().then(() => {
      this.royalApi.getLocationData(selectedLocation.id).subscribe(data => {
        this.allEstates = data.estates;
        // subdivide the estates into regions
        this.allEstateRegions =
          _.chain(data.estates)
          .groupBy('region')
          .toPairs()
          .map(item => _.zipObject(['regionName', 'regionEstates'], item))
          .value();
          this.estates = this.allEstateRegions;    
          loader.dismiss();  
      });
    });
  }

  itemTapped($event, estate) {
    this.navCtrl.push(EstateHomePage, {estate: estate});
  }

  updateEstates(){
    let queryTextLower = this.queryText.toLowerCase();
    let filteredEstates = [];
    _.forEach(this.allEstateRegions, er => {
      let estates = _.filter(er.regionEstates, e => (<any>e).refNumber.toLowerCase().includes(queryTextLower));
      if (estates.length) {
        filteredEstates.push({ regionName: er.regionName, regionEstates: estates });
      }
    });

    this.estates = filteredEstates;
  }

}
