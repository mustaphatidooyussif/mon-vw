import { Component, OnInit, NgZone } from '@angular/core';
import { UserService } from '../../services/user.service'
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import {AlertController} from '@ionic/angular';
import { Http } from '@angular/http';
import { ImagehandlerService } from './../../services/imagehandler.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  avatar: string;
  displayName: string;
  email: string;
  imageURL;

  constructor(
    public user: UserService, 
     private router: Router,
     public zone: NgZone,
     public alertCtrl:AlertController,
     public http: Http,
     public imghandler: ImagehandlerService
     ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.loaduserdetails();
  }

  loaduserdetails() {
    this.user.getuserdetails().then((res: any) => {
      this.displayName = res.displayName;
      this.zone.run(() => {
        this.avatar = res.photoURL;
      })
    })
  }

  // Logout
  logout() {
    firebase.auth().signOut().then(() => {
     this.router.navigate(["login"])
    })
  }

  async presentAlert(header, message) {
    const alert = await this.alertCtrl.create({
      header: header,
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  async editUserName() {
    const alert = await this.alertCtrl.create({
      header: 'Edit Nickname!',
      inputs: [{
        name: 'nickname',
        placeholder: 'Nickname'
      }],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Edit',
          handler: data => {
            // console.log('Confirm Ok');
            if (data.nickname) {
                this.user.updatedisplayname(data.nickname).then((res: any) => {
                if (res.success) {
                  //update1
                  this.presentAlert("Updated", "Your  name has been changed successfully!!")
                  this.zone.run(() => {
                    this.displayName = data.nickname;
                  })
                }
                else {
                  ///update 2
                  this.presentAlert("Failed", "Your profile name was not changed!!")
                }
                               
              })
            }
          }
        }
      ]
    });

    await alert.present();
  }

  editname() {
    this.editUserName();
  }

  editimage() {
    this.imghandler.uploadimage().then((url: any) => {
      this.user.updateimage(url).then((res: any) => {
        if (res.success) {
          this.presentAlert("Updated", "Your profile picture has been changed successfully!!");
          this.zone.run(() => {
          this.avatar = url;
        })  
        }  
      }).catch((err) => {
        this.presentAlert("Failed", "Your picture was not changed!!");
      })
      })
  }

  fileChanged(event) {
		const files = event.target.files
		const data = new FormData()
		data.append('file', files[0])
		data.append('UPLOADCARE_STORE', '1')
		data.append('UPLOADCARE_PUB_KEY', '1677e8774a65035de08e')
		
		this.http.post('https://upload.uploadcare.com/base/', data)
		.subscribe(event => {
			console.log(event)
      this.avatar = event.json().file
      //update profile image
      this.user.updatedPhotoURL(this.avatar)
		})
	}

}
