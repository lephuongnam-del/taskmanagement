import { Injectable } from '@angular/core';
import {WebrequestService} from './webrequest.service'
import { Task } from './models/task.model';
@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor( 
    private webReqService: WebrequestService) { }

  createList(title:string){
    return this.webReqService.post('list',{title});
  }

  getLists() {
    return this.webReqService.get('list');
  }

  getTasks(listId:string) {
    return this.webReqService.get(`list/${listId}/task`);
  }
  createTask(title:string, listId: string){
    return this.webReqService.post(`list/${listId}/task`,{title});

  }
  complete(task: Task) {
    return this.webReqService.patch(`lists/${task._listId}/tasks/${task._id}`, {
      completed: !task.completed
    });
  }
}
