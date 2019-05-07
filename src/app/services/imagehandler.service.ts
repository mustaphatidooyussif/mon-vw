import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { File } from '@ionic-native/file';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { FilePath } from '@ionic-native/file-path';
import { Platform} from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ImagehandlerService {
  nativepath: any;
  firestore = firebase.storage();

  constructor(
    public filechooser: FileChooser, 
    public platform: Platform) { }

  
  uploadimage() {
    var promise = new Promise((resolve, reject) => {
      if(this.platform.is('cordova')){
        this.filechooser.open().then((url) => {
          alert(url);
          (<any>window).FilePath.resolveNativePath(url, (result) => {
            this.nativepath = result;
            (<any>window).resolveLocalFileSystemURL(this.nativepath, (res) => {
              res.file((resFile) => {
                var reader = new FileReader();
                reader.readAsArrayBuffer(resFile);
                reader.onloadend = (evt: any) => {
                  var imgBlob = new Blob([evt.target.result], { type: 'image/jpeg' });
                  var imageStore = this.firestore.ref('/profileimages').child(firebase.auth().currentUser.uid);
                  imageStore.put(imgBlob).then((res) => {
                    this.firestore.ref('/profileimages').child(firebase.auth().currentUser.uid).getDownloadURL().then((url) => {
                      resolve(url);
                    }).catch((err) => {
                        reject(err);
                    })
                  }).catch((err) => {
                    reject(err);
                  })
                }
              })
            })
          })
      })
      }else{
        console.log("Using native plugins.");
      }
      
    })    
     return promise;   
  }

  
  guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
  }
  
}
