import { Component, HostBinding, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { SessionService } from 'src/app/session/session.service';
import { Room } from '../../room/room';

@Component({
  selector: 'app-room-page',
  templateUrl: './room-page.component.html',
  styleUrls: ['./room-page.component.scss'],
})
export class RoomPageComponent implements OnInit {
  room!: Room;
  participant?: { vote?: any, name?: string | null, isAdmin?: boolean };

  constructor(
    private route: ActivatedRoute,
    private appService: AppService,
    public sessionService: SessionService
  ) { }

  itsYou(sessionId: string): boolean {
    return this.sessionService.id === sessionId;
  }

  @HostBinding('class') get classes(): string[] {
    return [
      'block',
      'h-full',
    ];
  }

  ngOnInit(): void {
    this.room = this.route.snapshot.data.realtimeRoom;
    this.initialize();
  }

  start(): void {
    this.room.start();
  }

  finish(): void {
   this.room.finish();
  }

  vote(vote?: any): void {
    this.room.vote(this.sessionService.id, vote);
  }

  changeName(): void {
    const newName = prompt('Room name:', this.room.name)?.trim();
    this.room.update({ name: newName });
  }

  private initialize(): void {
    this.room.subscribe(() => {
      this.room
        .participate(this.sessionService.id, { vote: null, name: this.appService.user.name })
        .then(participant => this.participant = participant);
    });
  }
}
