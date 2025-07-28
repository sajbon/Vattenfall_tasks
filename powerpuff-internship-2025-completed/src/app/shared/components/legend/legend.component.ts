import { Component, Input } from '@angular/core';
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-legend',
  templateUrl: './legend.component.html',
  styleUrl: './legend.component.scss',
  standalone: false,

})
export class LegendComponent {
  @Input() alignLeft = false;

}
