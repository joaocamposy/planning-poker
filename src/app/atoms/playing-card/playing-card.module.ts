import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayingCardComponent } from './playing-card.component';

@NgModule({
  declarations: [
    PlayingCardComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    PlayingCardComponent,
  ],
})
export class PlayingCardModule { }
