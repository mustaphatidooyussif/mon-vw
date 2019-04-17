import { AuthService } from './../../services/auth.service';
import { Component, OnInit} from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'
import { auth } from 'firebase/app'
import { Router } from '@angular/router';
import { LoadingController , ToastController  } from '@ionic/angular';
import * as firebase from 'firebase'
import { UserService } from '../../services/user.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: string = ""
  password: string= ""

  constructor(
    public afAuth: AngularFireAuth, 
		public router: Router,
		public loadingCtrl: LoadingController,
		public user: UserService,
		public toastController: ToastController,
		public authService: AuthService
    ) { }

  ngOnInit() {
  }

	toRegister(){
		this.router.navigate(['signup'])
	}

	//Custom loader
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

	signin() {
		const { email, password } = this
		var credentials ={
			email:email,
			password: password
		}
		if (email == '' || password == ''){
			console.log("All fields are required...")
			this.presentToast("All fields are required", "danger")
	}else{
			//loader
			// this.presentLoading("Please wait...")

			this.authService.login(credentials).then((res: any) => {
      if (!res.code){

				this.user.setUser({
					email: email,
					uid: firebase.auth().currentUser.uid
				})

				this.router.navigate(['/tabs'])
			}
      else{
        alert(res);
			}
    })
	}
  }
	
	// //login function
  // async login() {
	// 	const { email, password } = this

	// 	try {

	// 		if (email == '' || password == ''){
	// 				console.log("All fields are required...")
	// 				this.presentToast("All fields are required", "danger")
	// 		}
	// 		else {
	// 				//loader
	// 				let loading = await this.presentLoading("Please wait...")
	// 				await loading.present()

	// 				const res = await this.afAuth.auth.signInWithEmailAndPassword(email, password)
	// 				console.log(res)
		
	// 				if(res.user) {
	// 					this.user.setUser({
	// 						email,
	// 						uid: res.user.uid
	// 					})
	
	// 					//stop loader
	// 					await loading.dismiss()
	// 					this.router.navigate(['/tabs'])
	// 			}
	// 		}
		
	// 	} catch(err) {
	// 		console.dir(err)
	// 		if(err.code === "auth/user-not-found") {
	// 			console.log("User not found")
	// 		}
	// 	}
	// }

	//Password reset
	passwordReset(){
		this.router.navigate(["passwordreset"])
	}
}
