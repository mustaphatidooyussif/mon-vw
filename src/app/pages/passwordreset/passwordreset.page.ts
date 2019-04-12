import { element } from 'protractor';
import { auth } from 'firebase/app';
import { AlertController } from '@ionic/angular'
import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'

import { AuthService } from '../../services/auth.service'

@Component({
  selector: 'app-passwordreset',
  templateUrl: './passwordreset.page.html',
  styleUrls: ['./passwordreset.page.scss'],
})
export class PasswordresetPage implements OnInit {
  email: string = ""
  constructor(
    public authService: AuthService,
    public router: Router, 
    public alertController: AlertController) { }

  ngOnInit() {
  }

  	//Custom alert function
    async presentAlert(title: string, content: string) {
      const alert = await this.alertController.create({
        header: title,
        message: content,
        buttons: ['OK']
      })
  
      await alert.present()
    }
 
  //Send email recovery message
  changeMyPassword() {
    const { email } = this
    this.authService.resetPassword(email).then((res: any) => {
      if (res.success) {
        this.presentAlert("Email Sent", "Please follow the instructions in the email sent to you to reset your password")
      }
    }).catch((err) => {
      this.presentAlert("Failed", err)
    })
  }

  backToLogin(){
    this.router.navigate(["login"])
  }
}
