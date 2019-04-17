import { Component, OnInit, ViewChild, NgZone} from '@angular/core';
import { ChatService } from '../../services/chat.service'
import * as firebase from 'firebase'
import { Events, IonContent  } from '@ionic/angular';
import { UserService } from '../../services/user.service'


@Component({
  selector: 'app-buddychat',
  templateUrl: './buddychat.page.html',
  styleUrls: ['./buddychat.page.scss'],
})
export class BuddychatPage implements OnInit {

  @ViewChild('content') content: IonContent 

  newmessage;
  allmessages = [];
  photoURL;
  imgornot;

  buddy: any;

  constructor(
    public chatservice: ChatService,
    public events: Events,
    public user: UserService,
    public zone: NgZone

  ) { 
    this.buddy = this.chatservice.buddy;
    this.photoURL = firebase.auth().currentUser.photoURL;
    this.scrollto();
    this.events.subscribe('newmessage', () => {
      this.allmessages = [];
      this.zone.run(() => {
        this.allmessages = this.chatservice.buddymessages;
      })
    })
  }

  ionViewDidEnter() {
    this.chatservice.getbuddymessages();
  }
  
  scrollto() {
    setTimeout(() => {
      this.content.scrollToBottom();
    }, 1000);
  }

  ngOnInit() {
  }

  addmessage() {
    if(this.newmessage != ''){
       this.chatservice.addnewmessage(this.newmessage).then(() => {
        this.scrollChatToBottom()
        this.newmessage = '';
      })
    }
  }

  scrollChatToBottom(){
    this.content.scrollToBottom(); //this.content.scrollToBottom(200);
  }
}
