import { Component, inject } from '@angular/core';
import { Firestore, addDoc, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';





@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  
})
export class FormComponent {
  firestore: Firestore = inject(Firestore)

  constructor() {}
    todo = {
      title: '',
      description: ''
    }
  
 
  submitForm() {
    const todoCollection = collection(this.firestore, 'todos')
    addDoc(todoCollection, this.todo )
  }


}





