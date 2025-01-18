import { Component } from '@angular/core';
import { ContentComponent } from './content.component';
import { HeaderComponent } from './header.component';

@Component({
  selector: 'app-content-wrapper',
  standalone: true,
  imports: [ContentComponent, HeaderComponent],
  template: `
    <drawing-header />
    <drawing-content />
  `,
  styles: '',
})
export class ContentWrapperComponent {}
