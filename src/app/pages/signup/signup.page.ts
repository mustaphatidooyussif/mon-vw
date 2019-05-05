// import { Component, OnInit } from '@angular/core'
// import { AlertController, LoadingController , ToastController } from '@ionic/angular'
// import { auth } from 'firebase/app'
// import { AngularFirestore } from '@angular/fire/firestore'
// import { Router } from '@angular/router'
// import { AngularFireAuth } from '@angular/fire/auth'
// import { UserService } from '../../services/user.service'

// @Component({
//   selector: 'app-signup',
//   templateUrl: './signup.page.html',
//   styleUrls: ['./signup.page.scss'],
// })
// export class SignupPage implements OnInit {
//   username: string = ""
//   email: string = ""
// 	password: string = ""
//   cpassword: string = ""
  
//   constructor(
// 		public afAuth: AngularFireAuth, 
//     public alertController: AlertController,
//     public loadingCtrl: LoadingController,
// 		public router: Router,
// 		public user: UserService,
// 		public toastController: ToastController,
// 		public afstore: AngularFirestore
//     ) { }

//   ngOnInit() {
//   }

// 		//Function to capitalize names
// 		capitalize = (s) => {
// 			if (typeof s !== 'string') return ''
// 			return s.charAt(0).toUpperCase() + s.slice(1)
// 		}

// 	//Direct user to loing from register page
// 	toLogin(){
// 		this.router.navigate(['login'])
// 	}

// 	//Custom alert function
//   async presentAlert(title: string, content: string) {
// 		const alert = await this.alertController.create({
// 			header: title,
// 			message: content,
// 			buttons: ['OK']
// 		})

// 		await alert.present()
//   }
	
// 	async presentLoading(message: string) {
//     const loading = await this.loadingCtrl.create({
//       message: message,
// 			duration: 1500,
// 			spinner: "bubbles"
//     });
//     return await loading.present();
// 	}

// 		//Custom toast
// 		async presentToast(message: string, color: string) {
// 			const toast = await this.toastController.create({
// 				message: message,
// 				showCloseButton: true,
// 				position: 'bottom',
// 				closeButtonText: 'Close',
// 				color: color,
// 				duration: 1000
// 			});
// 			toast.present();
// 		}
		
	
// 		register() {
// 			var   newuser = {
// 				email: this.email,
// 				password: this.password,
// 				displayName: this.capitalize(this.username)
// 			}
// 			const { username, email, password, cpassword } = this
// 			if (username == '' || email == '' || password == '') {
// 				console.log("All fields are required...")
// 				this.presentToast("All fields are required", "danger")
// 			}
// 			else if (password.length < 7) {
// 				this.presentToast('Password is not strong. Try giving more than six characters', "danger")
// 			}
// 			else {
// 					//Loading
// 					this.presentLoading("Please wait ...")
// 					this.user.adduser(newuser).then((res: any) => {
// 					if (res.success){
// 						this.router.navigate(['/tabs'])
// 					}
// 					else{
// 						alert('Error' + res);
// 					}
// 				})
// 			}
// 		}  
// }

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, MenuController, LoadingController, AlertController, ToastController} from '@ionic/angular';
import { Router } from '@angular/router'
import { AngularFireAuth } from '@angular/fire/auth'
import { UserService } from '../../services/user.service'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  public onRegisterForm: FormGroup;

  constructor(
		public afAuth: AngularFireAuth, 
    public navCtrl: NavController,
		public menuCtrl: MenuController,
		public router: Router,
    public loadingCtrl: LoadingController,
		private formBuilder: FormBuilder,
		public alertController: AlertController,
		public toastController: ToastController,
		public user: UserService
  ) { }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  ngOnInit() {
    this.onRegisterForm = this.formBuilder.group({
      'fullName': [null, Validators.compose([
        Validators.required
      ])],
      'email': [null, Validators.compose([
        Validators.required
      ])],
      'password': [null, Validators.compose([
        Validators.required
      ])]
    });
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
	
	async presentLoading(message: string) {
    const loading = await this.loadingCtrl.create({
      message: message,
			duration: 1500,
			spinner: "bubbles"
    });
    return await loading.present();
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
			toast.present();
		}
		
	
		//Function to capitalize names
		capitalize = (s) => {
			if (typeof s !== 'string') return ''
			return s.charAt(0).toUpperCase() + s.slice(1)
		}

		async signUp() {
			var  newuser = {
					email: this.onRegisterForm.value.email,
					password: this.onRegisterForm.value.password,
					displayName: this.capitalize(this.onRegisterForm.value.fullName)
			}

			const loader = await this.loadingCtrl.create({
				message: "Please wait ...",
				duration: 2000
			});
			
			if(newuser.password.length > 6){
				loader.present();
				this.user.adduser(newuser).then((res: any) => {
					loader.dismiss();
					if (res.success){
						this.router.navigate(['/tabs'])
					}
					else{
						alert('Error' + res);
					}
			}).catch(err =>{
				loader.dismiss();
				console.dir(err);
				if(err.code === "auth/invalid-email"){
					this.presentAlert("Failed!", "Please check your email");
					
				}		
				else if(err.code === "auth/email-already-in-use"){
					this.presentAlert("Failed!", "This email is already registered!");

				}else if(err.code === "auth/network-request-failed"){
					this.presentAlert("A network error!", "Please check your internet connection");
				}
			})
			}else{
				this.presentAlert("weak password!", "Password should be at least 6 characters");
			}
		}

  // // //
  goToLogin() {
    this.router.navigate(['login'])
  }
}
