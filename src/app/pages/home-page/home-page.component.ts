import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RoomService } from 'src/app/room/room.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {
  constructor(
    private roomService: RoomService,
    private router: Router,
  ) { }

  createRoom(): void {
    const name = prompt('Room name:');

    if (name) {
      const room = this.roomService.create(name);
      this.router.navigate([`/${room.id}`]);
    }
  }
}
