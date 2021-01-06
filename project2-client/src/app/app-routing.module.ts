import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { AuthGuard } from './auth.guard';
import { SocialComponent } from './social/social.component';
import { HomeVisitComponent } from './home-visit/home-visit.component';
import { UserInfoComponent } from './user-info/user-info.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'socials', component: SocialComponent, canActivate: [AuthGuard]},
  {path: 'socials/:id', component: HomeVisitComponent, canActivate: [AuthGuard]},
  {path: 'user-info', component: UserInfoComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
