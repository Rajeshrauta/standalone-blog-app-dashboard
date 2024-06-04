import { Component, OnInit } from '@angular/core';
import { SubscribersService } from '../services/subscribers.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-subscribers',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './subscribers.component.html',
  styleUrl: './subscribers.component.css'
})
export class SubscribersComponent implements OnInit {

  subsciberArray: Array<object>;
  constructor(private subService: SubscribersService) { }

  ngOnInit(): void {
    this.subService.loadData().subscribe(val => {
      this.subsciberArray = val;
    });
  }

  onDelete(id) {
    this.subService.deleteData(id);
  }
}
