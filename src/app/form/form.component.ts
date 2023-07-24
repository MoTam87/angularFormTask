import { Component, inject } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, deleteDoc, doc, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { DialogComponent } from '../dialog/dialog.component';




@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  
})
export class FormComponent {
  firestore: Firestore = inject(Firestore);
  todos$ !: Observable<any[]>;
  todoCollection = collection(this.firestore, 'todos');
  dialog: any;

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

  updateUser(todo: any): void {
    const todoDoc = doc(this.todoCollection, todo.id)
    updateDoc(todoDoc, todo)
  }


  openDialog(todo: any): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {name: todo.title, description: todo.description, id: todo.id},
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log('The dialog was closed');
      console.log(result);
      this.updateUser(result)
      
    });
  }


}





