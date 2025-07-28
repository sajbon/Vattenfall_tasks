import { Component, Input } from '@angular/core';
import { ImageModel } from '../../../core/models/image.model';
import { ImageType } from '../../../core/enums/imageType.enum';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrl: './image.component.scss',
  standalone: false,

})
export class ImageComponent {
  @Input()
  image!: ImageModel;
  @Input() style: ImageType = ImageType.full;

  @Input() imageHeight: number = 630;
  @Input() imageWidth: number = 1260;

  ImageType = ImageType;
}
