import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { AuthGuard } from './_helpers';
import { Role } from './_models';

const accountModule = () => import('./account/account.module').then(x => x.AccountModule);
const adminModule = () => import('./admin/admin.module').then(x => x.AdminModule);
const profileModule = () => import('./profile/profile.module').then(x => x.ProfileModule);
const placesModule = () => import('./places/places.module').then(x => x.PlacesModule);
const schedulesModule = () => import('./schedules/schedules.module').then(x => x.SchedulesModule);
const idstudentcheckinModule = () => import('./ID-student-checkin/ID-student-checkin.module').then(x => x.IDstudentcheckinModule);
const idstudentModule = () => import('./ID-student/ID-student.module').then(x => x.IDstudentModule);
const studentlistModule = () => import('./student-list/student-list.module').then(x => x.StudentlistModule);

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'account', loadChildren: accountModule },
  { path: 'profile', loadChildren: profileModule, canActivate: [AuthGuard] },
  { path: 'admin', loadChildren: adminModule, canActivate: [AuthGuard], data: { roles: [Role.Admin] } },
  { path: 'places', loadChildren: placesModule, canActivate: [AuthGuard] },
  { path: 'schedules', loadChildren: schedulesModule, canActivate: [AuthGuard] },
  { path: 'id-student', loadChildren: idstudentModule, canActivate: [AuthGuard], data: { roles: [Role.Estudante, Role.Admin] } },
  {
    path: 'id-student-checkin', loadChildren: idstudentcheckinModule,
    canActivate: [AuthGuard], data: { roles: [Role.Motorista, Role.Admin] }
  },
  { path: 'student-list', loadChildren: studentlistModule, canActivate: [AuthGuard], data: { roles: [Role.Motorista, Role.Admin] } },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
