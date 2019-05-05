import { Component, OnInit, ViewChild } from '@angular/core';
import { IonTabs, Platform} from '@ionic/angular';
import { PreferenceService } from './../../services/preference.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  /**
   * This page is tabs page with chats, profile and settings tabs
   * @param preferences user preferences.
   * @param platform platform or device object
   */
  constructor(
    private  preferences: PreferenceService,
    private platform: Platform
    ) { 
      this.initialiazeApp();
    }

  @ViewChild('tabs') tabs: IonTabs

  ngOnInit() {
    this.tabs.select('chats')
  }

  // call user preference when this app is ready
  initialiazeApp(){
    this.platform.ready().then(()=>{
      this.preferences.initializePreferences();
    });
  }
}
