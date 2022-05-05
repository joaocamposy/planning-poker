import { Component, HostBinding, Input, OnInit } from '@angular/core';

@Component({
  selector: '*[app-playing-card]',
  templateUrl: './playing-card.component.html',
  styleUrls: ['./playing-card.component.scss'],
})
export class PlayingCardComponent {
  @Input() active = false;
  @Input() hidden?: boolean = false;
  @Input() clickable?: boolean = false;

  @HostBinding('class') get classes(): string[] {
    const classes = [
      'w-14',
      'h-20',
      'inline-flex',
      'justify-center',
      'items-center',
      'text-lg',
      'border',
      'border-accent',
      'font-medium',
      'rounded-lg',
    ];

    if (this.hidden || (this.clickable && this.active)) {
      classes.push('bg-accent');
      classes.push('text-white');
    } else {
      classes.push('text-accent');
    }

    return classes;
  }
}
