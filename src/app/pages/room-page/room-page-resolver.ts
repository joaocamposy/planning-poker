import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { RoomService } from 'src/app/room/room.service';
import { Room } from '../../room/room';

@Injectable({ providedIn: 'root' })
export class RoomPageResolver implements Resolve<Promise<Room | null>> {
  constructor(private roomService: RoomService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot): Promise<Room | null> {
    return this.roomService.load(route.params.id)
      .then(room => {
        if (!room) {
          this.router.navigate(['/']);
        }

        return room;
      });
  }
}
