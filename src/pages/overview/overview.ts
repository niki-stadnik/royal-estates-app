import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, LoadingController } from 'ionic-angular';
import { UserSettingsProvider } from '../../providers/user-settings/user-settings';
import { RoyalApiProvider } from '../../providers/royal-api/royal-api';


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
  
  refreshAll(refresher) {
    this.royalApi.refreshCurrentLocation().subscribe(() => {
      refresher.complete();
      this.ionViewDidLoad();
    });
  }

}