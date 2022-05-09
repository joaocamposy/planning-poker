import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  appliedColor!: string;
  appliedAccentColor!: string;

  applyTheme(theme?: { color?: string, accentColor?: string }): void {
    this.applyColor(theme?.color || 'system');
    this.applyAccentColor(theme?.accentColor || '#5436b0');
  }

  applyColor(color: string): void {
    if (color === 'system') {
      color = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    if (color === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    this.appliedColor = color;
  }

  applyAccentColor(accentColor: string): void {
    const root = document.documentElement;

    root.style.setProperty('--accent', accentColor);
    root.style.setProperty('--accent-darken', accentColor);

    this.appliedAccentColor = accentColor;
  }
}
