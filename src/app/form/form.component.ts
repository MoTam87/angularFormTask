import { Component, inject } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, deleteDoc, doc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';




@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  
})
export class FormComponent {
  firestore: Firestore = inject(Firestore);
  todos$ !: Observable<any[]>;
  todoCollection = collection(this.firestore, 'todos');

  constructor() {
    this.getTodos()
  }
    todo = {
      title: '',
      description: ''
    }
  
 
  submitForm() {
    const todoCollection = collection(this.firestore, 'todos')
    addDoc(todoCollection, this.todo )
  }

  getTodos() {
    this.todos$ = collectionData(this.todoCollection, {idField : 'id'})
    this.todos$.subscribe ((todo) => {
      console.log(todo)
    })
  }

  deleteTodo(id: string) {
    const todoDoc = doc(this.todoCollection, id)
    deleteDoc(todoDoc)
  }


}





