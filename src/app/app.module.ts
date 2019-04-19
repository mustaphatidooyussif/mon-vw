import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpModule } from '@angular/http'

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { config } from './firebaseAuth';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuth } from '@angular/fire/auth'
import { AngularFireAuthModule } from '@angular/fire/auth'
import { AngularFirestore } from '@angular/fire/firestore'

import { UserService } from './services/user.service'
import { AuthService } from './services/auth.service'
import { TanslationService } from './services/tanslation.service'
import { ImagehandlerService } from './services/imagehandler.service'
import { IonicSelectableModule } from 'ionic-selectable';
import { IonicStorageModule } from '@ionic/storage';


//File upload
// import { File } from '@ionic-native/file';
// import { FileChooser } from '@ionic-native/file-chooser';
// import { FilePath } from '@ionic-native/file-path';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    AngularFireAuthModule,
    IonicSelectableModule,
    HttpModule,
    // IonicStorageModule,
    AngularFireModule.initializeApp(config)],
  providers: [
    StatusBar,
    SplashScreen,
    AuthService,
    AngularFireAuth,
    UserService,
    AngularFirestore,
    ImagehandlerService,
    TanslationService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
