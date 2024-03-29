import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { Router } from '@angular/router';
import { environment } from '../env/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiURL = environment.apiUrl;
  constructor(private httpclient:HttpClient,private dataservice:DataService,private router:Router) { }

  getTasks(){
    return this.httpclient.get<any>(this.apiURL+'/todos/getTodo');
  }
  createTask(data:any){
    return this.httpclient.post<any>(this.apiURL+'/todos/createTodo',data);
  }
  updateTask(id:any,data:any){
    return this.httpclient.put<any>(this.apiURL+'/todos/updateTodo/'+id,data);

  }
  deleteTask(id:any){
    return this.httpclient.delete<any>(this.apiURL+'/todos/deleteTodo/'+id);

  }
}
