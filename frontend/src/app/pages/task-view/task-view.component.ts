import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { TaskService } from '../../task.service';
import { List } from '../../models/list.model';
import { Task } from '../../models/task.model';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss']
})
export class TaskViewComponent implements OnInit {
  listId: string;
  list: List[];
  task: Task[];
  listDefault: List[] = [];
  tasksDefault: Task[] = [];
  filterStatus = '-1';
  filterTaskString = '';
  filterListString = '';



  selectedListId: string;
  // router: Router;
  constructor(private authService: AuthService, private taskService: TaskService, private route: ActivatedRoute, private router: Router) {
    this.list = [];
    this.task = [];
  }

  ngOnInit(): void {

    this.route.params.subscribe(
      (params: Params) => {
        if (params.listId) {
          this.listId = params["listId"];
          this.selectedListId = params.listId;
          this.taskService.getTasks(params.listId).subscribe((tasks: Task[]) => {
            this.task = tasks;
            this.tasksDefault = tasks;
          })
        } else {
          this.task = undefined;
        }
      }
    )


    this.taskService.getLists().subscribe((lists: List[]) => {

      if (lists.length == 0) {
        this.list = [];
      } else {
        this.router.navigate(['/list', lists[0]._id]);
        this.list = lists;
        this.listDefault = lists;
      }
    })
  }

  onTaskClick(task: Task) {
    this.taskService.complete(task).subscribe(() => {
      // the task has been set to completed successfully
      console.log("Completed successully!");
      task.completed = !task.completed;
    })
  }

  deleteTask(taskId: string, listId: string) {
    this.taskService.deleteTask(taskId, listId).subscribe(() => {
      this.router.navigate(['/list']);
    })
  }

  deleteList(listId: string) {
    this.taskService.deleteList(listId).subscribe(() => {
      this.router.navigate(['/list']);
    })
  }

  updateList(listId: string) {
    console.log('/update-list/:listId')
    this.router.navigate(['/update-list', listId])
  }

  updateTask(taskId: string) {
    this.router.navigate([`/update-task/${this.listId}/task/${taskId}`])
  }

  onLogoutButtonClick() {
    this.authService.logout()
  }

  filterList() {
    this.list = this.listDefault.filter(x => x.title.includes(this.filterListString))
  }

 

  complete(task: Task) {
    console.log('task')
    this.taskService.complete(task).subscribe(x => {
      console.log(x);
      this.tasksDefault.forEach(x => {
        if (x._id === task._id) {
          x.completed = !x.completed;
        }
      })
    }, err => alert(err));
  }


  filterTaskGlobal() {

    this.task = this.tasksDefault.filter(x => x.title.includes(this.filterTaskString));

    if (this.filterStatus === '0') {
      this.task = this.task.filter(x => !x.completed);
    }
    if (this.filterStatus === '1') {
      this.task = this.task.filter(x => x.completed);
    }
    if (this.filterStatus === '-1') {
      this.task = this.task.filter(x => true);
    }

  }

}
