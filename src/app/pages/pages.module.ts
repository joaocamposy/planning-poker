import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ButtonModule } from '../atoms/button/button.module';
import { PlayingCardModule } from '../atoms/playing-card/playing-card.module';
import { HomePageComponent } from './home-page/home-page.component';
import { RoomPageResolver } from './room-page/room-page-resolver';
import { RoomPageComponent } from './room-page/room-page.component';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent
  },
  {
    path: ':id',
    component: RoomPageComponent,
    resolve: { realtimeRoom: RoomPageResolver },
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    CommonModule,
    ButtonModule,
    PlayingCardModule,
  ],
  declarations: [
    HomePageComponent,
    RoomPageComponent,
  ],
  exports: [
    RouterModule,
  ],
})
export class PagesModule { }
