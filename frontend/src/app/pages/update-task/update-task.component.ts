import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TaskService} from '../../task.service';
import { Task } from '../../models/task.model';
@Component({
  selector: 'app-new-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.scss']
})
export class UpdateTaskComponent implements OnInit {

  constructor(private taskService : TaskService, private route: ActivatedRoute,private router: Router ) { }

    listId : string;
    taskId : string;
  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.listId = params['listId'];
        this.taskId = params['taskId'];
      }
    )
  }
  updateTask(title:string){
    // alert("new task adding")
    this.taskService.updateTask(title, this.taskId, this.listId).subscribe(() => {
       this.router.navigate(['/list/' +this.listId]);
      
    })
  }
}
