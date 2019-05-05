import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuController, ToastController, AlertController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service'
import { AuthService } from './../../services/auth.service';
import * as firebase from 'firebase'

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public onLoginForm: FormGroup;

  constructor(
    public menuCtrl: MenuController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
		private formBuilder: FormBuilder,
		public router: Router,
		public loadingCtrl: LoadingController,
		public user: UserService,
		public toastController: ToastController,
		public authService: AuthService,
  ) { }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  ngOnInit() {
    this.onLoginForm = this.formBuilder.group({
      'email': [null, Validators.compose([
        Validators.required
      ])],
      'password': [null, Validators.compose([
        Validators.required
      ])]
    });
	}
	
		//Custom loader
	async presentLoading(message: string) {
    const loading = await this.loadingCtrl.create({
      message: message,
			duration: 1500,
			spinner: "bubbles"
    });
    await loading.present();
	}

	//Custom toast
	async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      showCloseButton: true,
      position: 'bottom',
			closeButtonText: 'Close',
			color: color,
			duration: 1000
    });
    await toast.present();
	}

		//Custom alert function
		async presentAlert(title: string, content: string) {
			const alert = await this.alertCtrl.create({
				header: title,
				message: content,
				buttons: [
					{
					text:'OK',
					role: "cancel",
					cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel: blah');
          }
				}
				]
			})
	
			await alert.present()
		}
		

  forgotPass() {
		this.router.navigate(["passwordreset"])
  }

  // // //To sign up page
  goToRegister() {
    this.router.navigate(['signup'])
  }

	// Login and go to home page
  async goToHome() {
		const loader = await this.loadingCtrl.create({
			message: "Please wait ...",
      duration: 2000
    });

		console.log(this.onLoginForm.value);
		loader.present();
		this.authService.login(this.onLoginForm.value).then((res: any) => {
			loader.dismiss();
      if (!res.code){
				this.user.setUser({
					email: this.onLoginForm.value.email,
					uid: firebase.auth().currentUser.uid
				})

				this.router.navigate(['/tabs'])
			}
      else{
				alert(res);
				console.dir(res);
			}
	  }).catch((err) =>{
			loader.dismiss();
			console.dir(err);
			if(err.code === "auth/invalid-email"){
				this.presentAlert("Failed!", "Please check your email");

			}else if(err.code ===  "auth/user-not-found" || err.code === "auth/wrong-password"){
				this.presentAlert("Invalid credentials!", "Invalid email or password");
				
			}else if(err.code === "auth/network-request-failed"){
				this.presentAlert("A network error!", "Please check your internet connection")
			}
		})
	
  }

}

