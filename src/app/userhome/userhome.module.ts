import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { UserhomePage } from './userhome.page';

const routes: Routes = [
  {
    path: '',
    component: UserhomePage,
   /*children: [
      /*{
        path: '',
        redirectTo: 'userhome',
        pathMatch: 'full'
      },
      {
        path: 'userhome',
        loadChildren: '../userhome/userhome.module#UserhomePageModule'
      },
      {
        path: 'map',
        loadChildren: '../map/map.module#MapPageModule',
      },
      {
        path: 'contacts',
        loadChildren: '../contacts/contacts.module#ContactsPageModule',
      },
      {
        path: 'emergency',
        loadChildren: '../emergency/emergency.module#EmergencyPageModule',
      },
      {
        path: 'tips',
        loadChildren: '../tips/tips.module#TipsPageModule'
      }
    ]*/
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [UserhomePage]
})
export class UserhomePageModule {}
