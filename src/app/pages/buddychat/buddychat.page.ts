import { Component, OnInit, ViewChild, NgZone} from '@angular/core';
import { ChatService } from '../../services/chat.service'
import * as firebase from 'firebase'
import { Events, IonContent  } from '@ionic/angular';
import { UserService } from '../../services/user.service'
import { TanslationService } from './../../services/tanslation.service';
import {Http}  from     '@angular/http';
// import { Storage } from '@ionic/storage'


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
  targetLanguageCode;
  targetLanguageName = "English";
  translatedText;

  constructor(
    public chatservice: ChatService,
    public events: Events,
    private transService: TanslationService,
    public user: UserService,
    public zone: NgZone,
    private http: Http

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

  ionViewDidLoad(){
    this.events.subscribe("languageChanged", data =>{
      this.targetLanguageCode = data.languageCode;
      console.log("data",data);
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

  translateAndSend(message, sourceLangeCode,targetLangCode){
    this.http.get("https://translate.googleapis.com/translate_a/single?client=gtx&sl=" 
    + sourceLangeCode + "&tl=" + targetLangCode + "&dt=t&q=" + encodeURI(message)).subscribe(data =>{
      var translatedText = data.json()[0][0][0]
      this.chatservice.addnewmessage(message, translatedText).then(() => {
       this.scrollChatToBottom()
       this.newmessage = '';
     })
    })

  }

  addmessage() {
    if(this.newmessage != ''){
      console.log("code: ", this.targetLanguageCode);
      if(typeof(this.targetLanguageCode) != "undefined"){
        console.log("code1: ", this.targetLanguageCode);
        this.translateAndSend(this.newmessage, "en", this.targetLanguageCode)
      }else{
        console.log("code2: ", this.targetLanguageCode);
        this.translateAndSend(this.newmessage, "en", "fr")
      }
    }
  }

  scrollChatToBottom(){
    this.content.scrollToBottom(); //this.content.scrollToBottom(200);
  }
}
