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
  updateList(listId:string,title:string){
    return this.webReqService.patch(`list/${listId}`,{title})
  }
  getLists() {
    return this.webReqService.get('list');
  }
  deleteTask(taskId:string, listId:string) {
    return this.webReqService.delete(`list/${listId}/task/${taskId}`)
  }
  updateTask(title, taskId:string, listId:string) {
    return this.webReqService.patch(`list/${listId}/task/${taskId}`,{title, completed:false})
  }
  getTasks(listId:string) {
    return this.webReqService.get(`list/${listId}/task`);
  }
  createTask(title:string, listId: string){
    return this.webReqService.post(`list/${listId}/task`,{title});
  }
  deleteList(listId: string){
    return this.webReqService.delete(`list/${listId}`);
  }
  complete(task: Task) {
    return this.webReqService.patch(`list/${task._listId}/task/${task._id}`, {
      completed: !task.completed
    });
  }
}
