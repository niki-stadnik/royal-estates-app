import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, LoadingController } from 'ionic-angular';
import { UserSettingsProvider } from '../../providers/user-settings/user-settings';
//import * as _ from 'lodash';
import { RoyalApiProvider } from '../../providers/royal-api/royal-api';

/**
 * Generated class for the OverviewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-overview',
  templateUrl: 'overview.html',
})
export class OverviewPage {
  isFollowing = false;
  estate: any = {};
  location: any = {};
  estates: any[];
  allEstates: any[];
 // private locationData: any;
  randomTest: any = {};

  public queryText: string;
  locat: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public royalApi: RoyalApiProvider,
    public alertController: AlertController,
    public toastController: ToastController,
    public userSettings: UserSettingsProvider,
    public loadingController: LoadingController) {
    this.estate = this.navParams.get('estate');
  }



  ionViewDidLoad() {
    this.userSettings.isFavoriteEstate(this.estate.id).then(value => this.isFollowing = value);
    
    this.location = this.royalApi.getCurrentLocation();
    console.log('Hello RoyalApiProvider Provider', this.location.location.name);

    /*  this.locationData = this.royalApi.getCurrentLocation();
      this.estates = _.chain(this.locationData.estates)
        .filter(g => g.team1Id === this.estate.id)
        .map(g => {
          let isTeam1 = (g.team1Id === this.estate.id);
          let opponentName = isTeam1 ? g.team2 : g.team1;
          //let scoreDisplay = this.getScoreDisplay(isTeam1, g.team1Score, g.team2Score);
          return {
            gameId: g.id,
            opponent: opponentName,
            time: Date.parse(g.time),
            location: g.location,
            locationUrl: g.locationUrl,
            //scoreDisplay: scoreDisplay,
            homeAway: (isTeam1 ? "vs." : "at")
          };
        })
        .value();
      this.allEstates = this.estates;
      this.randomTest = _.find(this.locationData.standings, { 'teamId': this.estate.id });
      this.userSettings.isFavoriteEstate(this.estate.id).then(value => this.isFollowing = value);*/
  }


  toggleFollow() {
    if (this.isFollowing) {
      let confirm = this.alertController.create({
        title: "Unfollow?",
        message: "Are you sure you want to save?",
        buttons: [
          {
            text: "Yes",
            handler: () => {
              this.isFollowing = false;
              this.userSettings.unfavoriteEstate(this.estate);
              let toast = this.toastController.create({
                message: "You have unfollowed this estate!",
                duration: 2000,
                position: "bottom"
              });
              toast.present();
            }
          },
          {
            text: "No"
          }
        ]
      });
      confirm.present();
    } else {
      this.isFollowing = true;
      this.userSettings.favoriteEstate(this.estate, this.location.location.id, this.location.location.name);
    }
  }

}





/*
toggleFollow() {
  if (this.isFollowing) {
    let confirm = this.alertController.create({
      title: "Unfollow?",
      message: "Are you sure you want to save?",
      buttons: [
        {
          text: "Yes",
          handler: () => {
            this.isFollowing = false;
            this.userSettings.unfavoriteEstate(this.estate);
            let toast = this.toastController.create({
              message: "You have unfollowed this estate!",
              duration: 2000,
              position: "bottom"
            });
            toast.present();
          }
        },
        {
          text: "No"
        }
      ]
    });
    confirm.present();
  } else {
    this.isFollowing = true;
    this.userSettings.favoriteEstate(
      this.estate,
      this.locationData.location.id,
      this.locationData.location.name
    );


  }
}*/