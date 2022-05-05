import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';
import { ThemeService } from './theme/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  loading = true;

  constructor(
    public appService: AppService,
    public themeService: ThemeService,
  ) { }

  ngOnInit(): void {
    this.appService.load().then(() => {
      this.loading = false;

      if (!this.appService.user.name) {
        this.promptName();
      }
    });
  }

  promptName(): void {
    const name = prompt('Change your name:', this.appService.user.name);

    if (name) {
      this.appService.user.update({ name });
    }
  }

  changeColor(color: string): void {
    this.appService.user.update({ preferences: { theme: { color } } });
    this.themeService.applyColor(color);
  }

  changeAccentColor(accentColor: string): void {
    this.appService.user.update({ preferences: { theme: { accentColor } } });
    this.themeService.applyAccentColor(accentColor);
  }
}
