import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'drawing-content',
  standalone: true,
  imports: [RouterOutlet],
  template: ` <router-outlet /> `,
  styles: ``,
})
export class ContentComponent {}
