import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service'
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore'
import { Router } from '@angular/router';
import * as firebase from 'firebase';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  avatar: string;
  displayName: string;
  email: string;

  mainuser: AngularFirestoreDocument
	sub
  
  constructor(public user: UserService, private afs: AngularFirestore, private router: Router) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.loaduserdetails();
  }

  // Loagin user details
  async loaduserdetails(){
		this.mainuser = this.afs.doc(`users/${this.user.getUID()}`)
		this.sub = this.mainuser.valueChanges().subscribe(event => {
			this.displayName = event.displayName
      this.avatar = event.photoURL,
      this.email = event.email
		})
  }

  ngOnDestroy() {
		this.sub.unsubscribe()
  }
  
  // Logout
  logout() {
    firebase.auth().signOut().then(() => {
     this.router.navigate(["login"])
    })
  }

}
