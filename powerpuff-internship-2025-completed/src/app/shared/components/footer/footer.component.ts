import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
    selector: 'footer',
    imports: [CommonModule],
    templateUrl: './footer.component.html',
    styleUrl: './footer.component.scss'
})
export class FooterComponent {
  scrollToHeader() {
    document
      .getElementById('header')
      ?.scrollIntoView({ block: 'end', behavior: 'smooth' });
  }
}
