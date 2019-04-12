import { Component, OnInit } from '@angular/core'
import { AlertController, LoadingController , ToastController } from '@ionic/angular'
import { auth } from 'firebase/app'
import { AngularFirestore } from '@angular/fire/firestore'
import { Router } from '@angular/router'
import { AngularFireAuth } from '@angular/fire/auth'
import { UserService } from '../../services/user.service'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  username: string = ""
  email: string = ""
	password: string = ""
  cpassword: string = ""
  
  constructor(
		public afAuth: AngularFireAuth, 
    public alertController: AlertController,
    public loadingCtrl: LoadingController,
		public router: Router,
		public user: UserService,
		public toastController: ToastController,
		public afstore: AngularFirestore
    ) { }

  ngOnInit() {
  }

		//Function to capitalize names
		capitalize = (s) => {
			if (typeof s !== 'string') return ''
			return s.charAt(0).toUpperCase() + s.slice(1)
		}

	//Direct user to loing from register page
	toLogin(){
		this.router.navigate(['login'])
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
    return loading;
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
		
	
	//Register user function
  async register() {
		const { username, email, password, cpassword } = this
		if(password !== cpassword) {
			this.presentToast("Passwords don't match", "danger")
		}

		try { 
			if( username == '' || email == '' || password == ''){
				console.log("All fields are required...")
				this.presentToast("All fields are required", "danger")
			}
			else{
					//Loader
				let loading = await this.presentLoading("Please wait...");
				await loading.present()

				const res = await this.afAuth.auth.createUserWithEmailAndPassword(email, password)

				//save current user
				this.user.setUser({
					email,
					uid: res.user.uid
				})

				//Update user profile in firebase
				this.afstore.doc(`users/${this.user.getUID()}`).set({
					displayName: this.capitalize(username),
					email: email,
					photoURL: 'https://firebasestorage.googleapis.com/v0/b/myapp-4eadd.appspot.com/o/chatterplace.png?alt=media&token=e51fa887-bfc6-48ff-87c6-e2c61976534e'
				})

				//stop loader
				await loading.dismiss()
				this.router.navigate(['/tabs'])
			}
		} catch(error) {
			console.dir(error)
			if(error.code === "auth/email-already-in-use"){
				console.log("Email already in use")
			}
		}
		
	}
}
