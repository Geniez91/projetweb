import { Injectable } from '@angular/core';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { firebaseConfig } from '../environnements/environment';


@Injectable({
  providedIn: 'root'
})
export class CarouselService {
  private app: any;
  private db: any;


  constructor() {
    this.app = initializeApp(firebaseConfig);
    this.db = getFirestore(this.app);
  }

  async getCarouselData() {
    const carouselRef = collection(this.db, 'carousel');

    try {
      const querySnapshot = await getDocs(carouselRef);
      const carouselData = querySnapshot.docs.map((doc) => doc.data());
      return carouselData;

    } catch (error) {
      console.error('Erreur lors de la récupération des données du carousel :', error);
      throw error;
    }
  }
}
