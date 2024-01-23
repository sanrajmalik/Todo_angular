import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { initFlowbite } from 'flowbite';
import { TaskService } from '../../services/task.service';
import { CalendarModule } from 'primeng/calendar';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule,CalendarModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  title:any;
  description:any;
  status:any=null;
  dueDate:Date[] | undefined;
  tasks:any;
  constructor(private taskservice:TaskService, private authservice:AuthService){
    
  }

  ngOnInit(): void {
    initFlowbite();
    this.getTasks();
  }
  date(e:any){
    this.dueDate=this.dueDate;
    this.title
    this.description;
    this.status;
  }
  
  getTasks(){
    this.taskservice.getTasks().subscribe((res)=>{
      this.tasks = res;
    },err=>{
      if(err.error.error=="Token expired!"){
        this.authservice.logout();
      }
    })
  }

  createTask(){
    const data ={
      title:this.title,
      description:this.description,
      status:this.status,
      dueDate:this.dueDate,
    }
    this.taskservice.createTask(data).subscribe((res)=>{
    this.clearFields();
    },err=>{
      if(err.message.contains("expired")){
        this.authservice.logout();
      }
    })
  }

  deleteTask(data:any){
    this.taskservice.deleteTask(data._id).subscribe((res)=>{
      this.getTasks()
      console.log("Task deleted");
    })
  }

  clearFields(){
    this.dueDate=undefined;
    this.title=null;
    this.description=null;
    this.status=null;
    this.getTasks();
  }
}
