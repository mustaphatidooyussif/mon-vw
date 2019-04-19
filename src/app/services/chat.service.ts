import { Events } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router'
import * as firebase from 'firebase'

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  buddy: any
  firebuddychats = firebase.database().ref('/buddychats');
  buddymessages = [];
  constructor(
    public router: Router,
    public events: Events
  ) { }

  
  initializebuddy(buddy) {
    this.buddy = buddy;
  }

  addnewmessage(msg, trans) {
    if (this.buddy) {
      var promise = new Promise((resolve, reject) => {
        this.firebuddychats.child(firebase.auth().currentUser.uid).child(this.buddy.uid).push({
          sentby: firebase.auth().currentUser.uid,
          message: msg,
          translation: trans,
          timestamp: firebase.database.ServerValue.TIMESTAMP
        }).then(() => {
          this.firebuddychats.child(this.buddy.uid).child(firebase.auth().currentUser.uid).push({
            sentby: firebase.auth().currentUser.uid,
            message: msg,
            translation: trans,
            timestamp: firebase.database.ServerValue.TIMESTAMP
          }).then(() => {
            resolve(true);
            }).catch((err) => {
              reject(err);
          })
        })
      })
      return promise;
    }
  }

  getbuddymessages() {
    
    let temp;
    this.firebuddychats.child(firebase.auth().currentUser.uid).child(this.buddy.uid).on('value', (snapshot) => {
      this.buddymessages = [];
      temp = snapshot.val();
      for (var tempkey in temp) {
        this.buddymessages.push(temp[tempkey]);
      }
      this.events.publish('newmessage');
    })
  }

}
