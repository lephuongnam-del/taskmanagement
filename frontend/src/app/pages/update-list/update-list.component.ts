import { Component, OnInit } from '@angular/core';
import {ActivatedRoute,Params, Router } from '@angular/router';
import {TaskService} from '../../task.service';
import { List } from 'src/app/models/list.model';
@Component({
  selector: 'app-new-list',
  templateUrl: './update-list.component.html',
  styleUrls: ['./update-list.component.scss']
})
export class UpdateListComponent implements OnInit {

  constructor(private taskService:TaskService, private router:Router,private route:ActivatedRoute) { }
  listId : string;
  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.listId = params['listId'];
      }
    )
  }

  updateList(title :string) {
    this.taskService.updateList(this.listId,title).subscribe((list: List) => {
      console.log(list);
      this.router.navigate(['/list']);
    })
  }

}
