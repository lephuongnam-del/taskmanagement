import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import {TaskService} from '../../task.service';
import {List} from '../../models/list.model';
import {Task} from '../../models/task.model';
@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss']
})
export class TaskViewComponent implements OnInit {

  list: List[];
  task: Task[];
  constructor(private taskService: TaskService, private route: ActivatedRoute) { }

  ngOnInit(): void {
   
    this.route.params.subscribe(
      (params: Params) => {
        if (params.listId) {
          
          this.taskService.getTasks(params.listId).subscribe((tasks: Task[]) => {
            this.task = tasks;
          })
        } else {
          this.task = undefined;
        }
      }
    )
   

    this.taskService.getLists().subscribe((lists: List[]) => {
      this.list= lists;
    }) 
  }
  
  onTaskClick(task:Task) {
    this.taskService.complete(task).subscribe(() => {
      // the task has been set to completed successfully
      console.log("Completed successully!");
      task.completed = !task.completed;
    })
  }
   
}
