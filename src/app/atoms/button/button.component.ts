import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: '*[app-button]',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() color: string = 'transparent';
  @Input() iconOnly: boolean = false;

  @HostBinding('class') get classes(): string[] {
    const padding = this.iconOnly ? ['p-2.5'] : ['px-5', 'py-2.5'];

    const classes = [
      ...padding,
      'inline-flex',
      'justify-center',
      'items-center',
      'text-sm',
      'font-medium',
      'rounded-lg',
      'focus:ring-4',
      'focus:outline-none',
    ];

    switch (this.color) {
      case 'transparent':
        classes.push(...[
          'text-gray-500',
          'dark:text-gray-400',
          'hover:bg-gray-100',
          'dark:hover:bg-gray-700',
          'focus:ring-gray-200',
          'dark:focus:ring-gray-700',
        ]);
        break;
      case 'accent':
        classes.push(...[
          'bg-accent',
          'text-white',
          'hover:bg-accent-darken',
          'focus:ring-blue-300',
        ]);
        break;
    }

    return classes;
  }
}
