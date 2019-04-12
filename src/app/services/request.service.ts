import { UserService } from './user.service';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import * as firebase from 'firebase'

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

  constructor(
    private afs: AngularFirestore
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

  getmyrequests(){
    var  allmyrequests = this.getAllrequests(firebase.auth().currentUser.uid) 
    var  myrequests = [];   
    var users = this.getAllUsers()
    console.log("allmyrequests", allmyrequests)
    for(var i in allmyrequests){
      console.log(i)
    }
    console.log(myrequests)
  }
}
