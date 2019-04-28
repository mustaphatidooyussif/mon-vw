import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import * as firebase from 'firebase'
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore'
import { Router } from '@angular/router'
import { RequestService } from '../../services/request.service'
import { AlertController  } from '@ionic/angular'
import { UserService } from '../../services/user.service'
import { Events } from '@ionic/angular'

@Component({
  selector: 'app-buddies',
  templateUrl: './buddies.page.html',
  styleUrls: ['./buddies.page.scss'],
})
export class BuddiesPage implements OnInit {
  filteredusers = [];
  temparr = [];
  myfriends;
  
  newrequest  = {
    sender: "",
    recipient: ""
  }

  constructor(
    public router: Router,
    private afs: AngularFirestore,
    public alertController: AlertController,
    public requestservice: RequestService,
    public events: Events,
    public user: UserService
    ) { 
      this.user.getallusers().then((res: any) => {
        this.filteredusers = res;
        this.temparr = res;
     })
  }

  ngOnInit() {
  }

	//Custom alert function
  async presentAlert(title: string, content: string) {
		const alert = await this.alertController.create({
			header: title,
			message: content,
			buttons: ['OK']
		})

		await alert.present()
  }

  searchuser(searchbar) {
    this.filteredusers = this.temparr;
    var q = searchbar.target.value;
    if (q.trim() == '') {
      return;
    }

    this.filteredusers = this.filteredusers.filter((v) => {
      if (v.displayName.toLowerCase().indexOf(q.toLowerCase()) > -1) {
        return true;
      }
      return false;
    })
  }

  ngOnDestroy() {
		
  }

  sendreq(recipient) {
    this.newrequest.sender = firebase.auth().currentUser.uid;
    this.newrequest.recipient = recipient.uid;
    if (this.newrequest.sender === this.newrequest.recipient)
      alert('You are your friend always');
    else {
        this.requestservice.sendrequest(this.newrequest).then((res: any) => {
        console.log("Results: ", res)
        if (res.success) {
          this.presentAlert("Request sent", 'Your request was sent to ' + recipient.displayName)
          let sentuser = this.filteredusers.indexOf(recipient);
          this.filteredusers.splice(sentuser, 1);
        }
      }).catch((err) => {
        console.log(err);
      })
    }
  }

}
