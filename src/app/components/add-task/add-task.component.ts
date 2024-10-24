import {
  Component,
  Output,
  Input,
  EventEmitter,
  SimpleChanges,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '../button/button.component';
import { CommonModule } from '@angular/common';
import { Task } from '../../types/task';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [FormsModule, ButtonComponent, CommonModule],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.scss',
})
export class AddTaskComponent {
  @Output() onAddTask = new EventEmitter<Task>();
  @Input() ActiveViewAddTask!: boolean;

  task: string = '';
  category: string = '';
  finish: boolean = false;
  viewAddTask: boolean = false;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['ActiveViewAddTask']) {
      this.viewAddTask = this.ActiveViewAddTask;
    }
  }

  onSubmit() {
    if (!this.task) {
      alert('Adicione uma tarefa!');
      return;
    }

    const newTask = {
      tarefa: this.task,
      categoria: this.category,
      concluido: this.finish,
    };

    this.onAddTask.emit(newTask);

    this.task = '';
    this.category = '';
    this.finish = false;
  }
}
