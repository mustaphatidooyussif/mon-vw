import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthService } from './services/auth.service'

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'signup', loadChildren: './pages/signup/signup.module#SignupPageModule' },
  { path: 'tabs', loadChildren: './pages/tabs/tabs.module#TabsPageModule' , canActivate: [AuthService]},
  { path: 'passwordreset', loadChildren: './pages/passwordreset/passwordreset.module#PasswordresetPageModule' },
  { path: 'profilepic', loadChildren: './pages/profilepic/profilepic.module#ProfilepicPageModule' },
  { path: 'buddies', loadChildren: './pages/buddies/buddies.module#BuddiesPageModule' , canActivate: [AuthService]},
  { path: 'buddychat', loadChildren: './pages/buddychat/buddychat.module#BuddychatPageModule', canActivate: [AuthService] },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
