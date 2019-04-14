import { UserService } from './user.service';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import * as firebase from 'firebase'
import { Events } from '@ionic/angular'

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  firereq: AngularFirestoreCollection
  firefriends
  usersCollection
  users

  userdetails;
  myfriends;
  rquestedUser;
  
  constructor(
    private afs: AngularFirestore,
    public events: Events
    ) { 
    this.firefriends = afs.collection('friends');
  }

  sendrequest(req) {
    var promise = new Promise((resolve, reject) => {
      this.afs.doc(`requests/${req.recipient}`).set({
      sender: req.sender
      }).then(() => {
        console.log("Resolved: ")
        resolve({ success: true });
        }).catch((err) => {
          reject(err);
    })
    })
    return promise;  
  }

  getAllrequests(uid){
    var request = []
    this.afs.doc(`requests/${uid}`).get().subscribe(docs =>{
      request.push(docs.data())
    })

    return request;
  }

  getAllUsers(){
    var allUsers =[];
    this.users = this.afs.collection('users').snapshotChanges().subscribe(snaps =>{
      snaps.forEach(doc =>{
        var doc_object = this.documentToDomainObject(doc)
        allUsers.push(doc_object)
      })
    })
    return allUsers;
  }

  documentToDomainObject = snap => {
    const object = snap.payload.doc.data();
    object.uid = snap.payload.doc.id;
    return object;
  }

  getUser(uid){
    this.afs.doc(`users/${uid}`).get().subscribe(user =>{
      this.rquestedUser = user.data()
      console.log("rquestedUser 1", this.rquestedUser)
    })

    return 
  }

  getmyrequests(){
    this.userdetails = [];
    //get request for this user
    this.afs.doc(`requests/${firebase.auth().currentUser.uid}`).get().subscribe(docs =>{
      if(docs.data()){
        this.afs.doc(`users/${docs.data().sender}`).get().subscribe(user =>[
          this.userdetails.push(user.data())
        ])
        this.events.publish('gotrequests');
        console.log(this.userdetails)
      }
    })
  }
}
