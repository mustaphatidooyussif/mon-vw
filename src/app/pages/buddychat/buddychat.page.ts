import { Component, OnInit, ViewChild, NgZone} from '@angular/core';
import { ChatService } from '../../services/chat.service'
import * as firebase from 'firebase'
import { Events, IonContent  } from '@ionic/angular';
import { UserService } from '../../services/user.service'
import {Http}  from     '@angular/http';
import { PreferenceService } from './../../services/preference.service';
import { Storage } from '@ionic/storage';
import { TanslationService } from './../../services/tanslation.service';

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
  enableTranslation;

  constructor(
    public chatservice: ChatService,
    public events: Events,
    public user: UserService,
    public zone: NgZone,
    private http: Http,
    private  preferencesService: PreferenceService,
    public storage: Storage,
    public translator: TanslationService

  ) { 
    // if buddy not set, retrieve from database
    if(this.chatservice.buddy){
      this.buddy = this.chatservice.buddy;
    }else{
      this.preferencesService.getCurrentBuddy().then(buddy =>{
        this.buddy  = buddy;
      })
    }
    this.photoURL = firebase.auth().currentUser.photoURL;
    this.scrollto();
    this.events.subscribe('newmessage', () => {
      this.allmessages = [];
      this.zone.run(() => {
        this.allmessages = this.chatservice.buddymessages;
      })
    });

    this.targetLanguageCode = this.preferencesService.getTranslationLanguage();
    this.preferencesService.getEnableTranslationStatus().then(status =>{
      console.log(status);
      this.zone.run(()=>{
        this.enableTranslation  = status;
      })
    });
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

  /**
   * 1. Get the target language code
   * 2. then translate the message to the target langugae
   * 3. add message to firebase (database).
   * 4. scroll chat down
   * 5. reset new message to empty string. 
   */
  addmessage() {
    if(this.newmessage != ''){
      this.preferencesService.getTranslationLanguage().then(code =>{
        this.translator.translate(code, this.newmessage, "en").then(text =>{
          this.chatservice.addnewmessage(this.newmessage,text).then(()=>{
            this.scrollChatToBottom();
            this.newmessage = '';
          });
        });
      })
    }
  }

  // Scroll the chat down 
  scrollChatToBottom(){
    this.content.scrollToBottom(); //this.content.scrollToBottom(200);
  }
}
