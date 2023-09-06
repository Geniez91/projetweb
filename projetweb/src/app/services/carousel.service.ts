import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, addDoc, setDoc, doc } from 'firebase/firestore';
import { firebaseConfig } from '../environnements/environment';

@Injectable({
  providedIn: 'root',
})
export class CarouselService {
  private app: any;
  private db: any;

  constructor() {
    this.app = initializeApp(firebaseConfig);
    this.db = getFirestore(this.app);
  }

  async getCarouselData() : Promise<any[]> {
    const carouselRef = collection(this.db, 'carousel');

    try {
      const querySnapshot = await getDocs(carouselRef);
      const carouselData: any[] = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        data['id'] = doc.id;
        carouselData.push(data);
      });

      return carouselData;
    } catch (error) {
      throw error;
    }
  }

  async add(city: any): Promise<void> {
    const carouselRef = collection(this.db, 'carousel');
    const cityDocRef = doc(carouselRef, city.id);

    try {
      await setDoc(cityDocRef, city);
      console.log(city);
    } catch (error) {
      throw error;
    }
  }

}
