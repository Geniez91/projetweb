import { Component, OnInit } from '@angular/core';
import { ImgCarousel } from 'src/app/interfaces/img-carousel';
import { CarouselService } from 'src/app/services/carousel.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit{
  imgCarousel: ImgCarousel[] = [];

  constructor(private carouselService: CarouselService)
  {}
  ngOnInit(): void {
    const carousel = this.carouselService.getCarouselData();
    console.log('carousel', carousel);
  }

}
