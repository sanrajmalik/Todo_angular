import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-update-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './update-modal.component.html',
  styleUrl: './update-modal.component.css'
})
export class UpdateModalComponent implements OnInit  {
  @Input() modalId: string | undefined;
  modalIdNew: string | undefined;

  ngOnInit() {
    this.modalIdNew = this.modalId;
  }
}
