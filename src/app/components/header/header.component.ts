import { Component, Output, EventEmitter } from '@angular/core';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  @Output() onViewAddTask = new EventEmitter<boolean>();

  title: string = 'Tarefas';
  viewAddTask: boolean = false;

  ViewForm(value: boolean) {
    this.viewAddTask = value;
    this.onViewAddTask.emit(value);
  }
}
