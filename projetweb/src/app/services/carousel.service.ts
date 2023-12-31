import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, onSnapshot, addDoc, doc, updateDoc, deleteDoc, setDoc, getDoc } from 'firebase/firestore';
import { Observable } from 'rxjs';

import { firebaseConfig } from '../environnements/environment';
import { ImgCarousel } from '../interfaces/img-carousel';

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

  getCarouselData(): Observable<any[]> {
    const carouselRef = collection(this.db, 'carousel');

    return new Observable<any[]>((observer) => {
      const unsubscribe = onSnapshot(carouselRef, (querySnapshot) => {
        const carouselData: any[] = [];

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          data['id'] = doc.id;
          carouselData.push(data);
        });

        observer.next(carouselData);
      });

      return unsubscribe;
    });
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

  async update(updatedData: any): Promise<void> {
    const carouselRef = collection(this.db, 'carousel');
    const cityDoc = doc(carouselRef, updatedData.id);

    try {
      await updateDoc(cityDoc, updatedData);
    } catch (error) {
      throw error;
    }
  }

  async delete(item: any): Promise<void> {
    const carouselRef = collection(this.db, 'carousel');
    const cityDoc = doc(carouselRef, item.id);

    try {
      await deleteDoc(cityDoc);
    } catch (error) {
      throw error;
    }
  }
  async downloadImage(item: ImgCarousel) {
    const image = await fetch(item.img);
    const imageBlob = await image.blob();
    const imageURL = URL.createObjectURL(imageBlob);

    const link = document.createElement('a');
    link.href = imageURL;
    link.download = `image_${item.id}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  async updateLikes(item: ImgCarousel) {
    try {
      const itemRef = doc(this.db, `carousel/${item.id}`);

      const snapshot = await getDoc(itemRef);
      const itemData = snapshot.data();

      const updatedLikes = itemData?.['likes'] + 1;

      await updateDoc(itemRef, { likes: updatedLikes });
    } catch (error) {
      throw error;
    }
  }
}
