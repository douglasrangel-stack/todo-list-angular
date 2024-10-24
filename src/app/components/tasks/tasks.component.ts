import { Component, OnInit, Input } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../types/task';
import { TaskItemComponent } from '../task-item/task-item.component';
import { CommonModule } from '@angular/common';
import { AddTaskComponent } from '../add-task/add-task.component';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [TaskItemComponent, CommonModule, AddTaskComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss',
})
export class TasksComponent implements OnInit {
  @Input() viewAddTask!: boolean;

  tasks: Task[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskService.getTasks().subscribe({
      next: (data) => {
        this.tasks = data;
        console.log(this.tasks);
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        console.log('terminou...');
      },
    });
  }

  deleteTask(task: Task) {
    this.taskService.deleteTask(task).subscribe({
      next: () => {
        this.tasks = this.tasks.filter((i) => i.id != task.id);
      },
    });
  }

  toggleFinish(task: Task) {
    task.concluido = !task.concluido;
    this.taskService.updateTask(task).subscribe({
      next: (data) => {
        console.log(data);
      },
    });
  }

  addTask(task: Task) {
    this.taskService.addTask(task).subscribe({
      next: (data) => {
        this.tasks.push(data);
        console.log(data);
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        console.log('terminou...');
      },
    });
  }
}
