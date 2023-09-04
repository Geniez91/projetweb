import { Component, Input } from '@angular/core';
import { ImgCarousel } from 'src/app/interfaces/img-carousel';


@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent {

  @Input() city?: ImgCarousel[] = [];



}
