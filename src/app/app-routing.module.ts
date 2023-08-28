import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './core/components/login/login.component';
import { AuthenticationGuard } from './core/guards/authentication.guard';
import { RoleGuard } from './core/guards/role.guard';
import { ROLE } from './core/models/role';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'AdminPanel', loadChildren: () => import('./features/admin-feature/admin-feature.module').then(m => m.AdminFeatureModule),
    canActivate: [AuthenticationGuard, RoleGuard], data: { expectedRole: ROLE.ADMIN, redirectTo: 'UserDashboard' }
  },
  {
    path: 'UserDashboard', loadChildren: () => import('./features/user-dashboard-feature/user-dashboard-feature.module').then(m => m.UserDashboardFeatureModule),
    canActivate: [AuthenticationGuard, RoleGuard], data: { expectedRole: ROLE.USER, redirectTo: 'AdminPanel' }
  },
  {path: '**', component: NotFoundComponent}

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
