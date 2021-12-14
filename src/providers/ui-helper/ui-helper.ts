import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';

@Injectable()
export class UiHelperProvider {
  constructor(public http: HttpClient, private alertCtrl: AlertController) {}

  async confirm(
    title: string,
    message: string,
    callback: (v: boolean) => void,
    cancelText: string = 'No',
    confirmText: string = 'Yes'
  ) {
    let confirmed = false;

    const alert = this.alertCtrl.create({
      title: title,
      message: message,
      buttons: [
        {
          text: cancelText,
          handler: () => {
            callback(false);
            confirmed = false;
          }
        },
        {
          text: confirmText,
          handler: () => {
            callback(true);
            confirmed = true;
          }
        }
      ]
    });
    await alert.present();
    await alert.onWillDismiss((data) => {
      //console.log(data);
    });

    return confirmed;
  }
}
