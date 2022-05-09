import { Injectable } from '@angular/core';
import { Session } from './session/session';
import { SessionService } from './session/session.service';
import { ThemeService } from './theme/theme.service';
import { User } from './user/user';
import { UserService } from './user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  session!: Session;
  user!: User;

  constructor(
    public themeService: ThemeService,
    public userService: UserService,
    public sessionService: SessionService,
  ) { }

  load(): any {
    return Promise.all([
      this.sessionService
        .load(this.sessionService.id)
        .then(session => this.session = session),
      this.userService
        .load(this.userService.id)
        .then(user => this.user = user),
    ]).then(() => {
      this.themeService.applyTheme(this.user.preferences?.theme);
    });
  }
}
