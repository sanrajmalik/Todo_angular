import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { initFlowbite } from 'flowbite';
import { TaskService } from '../../services/task.service';
import { CalendarModule } from 'primeng/calendar';
import { AuthService } from '../../services/auth.service';
import { UpdateModalComponent } from '../modal/update-modal/update-modal.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule,CalendarModule,UpdateModalComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  title:any;
  description:any;
  status:any=null;
  dueDate:Date  | undefined;
  tasks:any;
  searchtext:any;
  tasksCopy: any;
  statusOptions = ['All', 'To Do', 'In Progress', 'Done'];
  selectedStatuses: string[] = ['All'];
  showModal = false;
  taskId: string | undefined; 

  constructor(private taskservice:TaskService, private authservice:AuthService, private cdr: ChangeDetectorRef){
    
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
      this.tasksCopy = this.tasks;
    },err=>{
      if(err.error.error=="Token expired!"){
        this.authservice.logout();
      }
    })
  }
  checkFields(){
    this.dueDate=undefined;
    this.title=null;
    this.description=null;
    this.status=null;
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
      this.getTasks();
      this.updateView();
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
  updateFormFields(a:any){
    this.title= a.title;
    this.dueDate= new Date(a.dueDate);
    this.description= a.description;
    this.status= a.status;
    
  }
  updateTask(a:any){
   
    const data ={
      title:this.title,
      description:this.description,
      status:this.status,
      dueDate:this.dueDate,
    } 
    this.taskservice.updateTask(a._id,data).subscribe(()=>{
      console.log("Task updated");
    },err=>{})
  }

  search(e:any){
    if(e.value){
      this.tasks = this.tasksCopy.filter((x:any)=>x.title.includes(e.value));
    }
    else{
      this.tasks=this.tasksCopy;
    }
  }
  updateView() {
    this.cdr.detectChanges();
  }

  filterTasks() {
    if (this.selectedStatuses.includes('All')) {
      this.tasks = this.tasksCopy;
    } else {
      this.tasks = this.tasksCopy.filter((task:any) => this.selectedStatuses.includes(task.status));
    }
  }
  toggleCheckbox(status: string) {
    if (status === 'All') {
      this.selectedStatuses = ['All'];
    } else {
      this.selectedStatuses = this.selectedStatuses.filter(s => s !== 'All'); // Remove 'All' if present
      if (!this.isChecked(status)) {
        this.selectedStatuses.push(status); // Add the status if checked
      } else {
        this.selectedStatuses = this.selectedStatuses.filter(s => s !== status); // Remove the status if unchecked
      }
    }

    if(this.selectedStatuses.length == 0) {
      this.selectedStatuses = ['All'];
    }

    this.filterTasks();
  }

  isChecked(status: string): boolean {
    return  this.selectedStatuses.includes(status) || this.selectedStatuses.includes("All");
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }
}
