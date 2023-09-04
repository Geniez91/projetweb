import { Component, OnInit } from '@angular/core';
import { ImgCarousel } from 'src/app/interfaces/img-carousel';
import { CarouselService } from 'src/app/services/carousel.service';
import { CityDialogComponent } from '../city-dialog/city-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit{
  imgCarousel: ImgCarousel[] = [];

  constructor(private carouselService: CarouselService, private dialog: MatDialog)
  {}
  async ngOnInit(): Promise<void> {
    this.imgCarousel = await this.carouselService.getCarouselData();
    console.log('carousel', this.imgCarousel);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CityDialogComponent, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // console.log('Données du dialogue fermé :', result);
        this.carouselService.add(result);
      }
    });
  }

}
