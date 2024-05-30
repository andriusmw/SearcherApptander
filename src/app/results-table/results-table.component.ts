import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../data-service.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-results-table',
  templateUrl: './results-table.component.html',
  styleUrls: ['./results-table.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class ResultsTableComponent implements OnInit {
  results: any[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.results$.subscribe(results => this.results = results);
  }

  clearResults() {
    this.results = []
  }
}
