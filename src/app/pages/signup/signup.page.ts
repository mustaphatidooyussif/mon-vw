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
		
	
		register() {
			var   newuser = {
				email: this.email,
				password: this.password,
				displayName: this.capitalize(this.username)
			}
			const { username, email, password, cpassword } = this
			if (username == '' || email == '' || password == '') {
				console.log("All fields are required...")
				this.presentToast("All fields are required", "danger")
			}
			else if (password.length < 7) {
				this.presentToast('Password is not strong. Try giving more than six characters', "danger")
			}
			else {
					//Loading
					this.presentLoading("Please wait ...")
					this.user.adduser(newuser).then((res: any) => {
					if (res.success){
						this.router.navigate(['/tabs'])
					}
					else{
						alert('Error' + res);
					}
				})
			}
		}  
}
