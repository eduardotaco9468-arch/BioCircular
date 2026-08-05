import { Component } from '@angular/core';
import { DashboardMockService } from './services/dashboard-mock.service';
import { DashboardStat } from './interfaces/dashboard-stat.interface';
import { DashboardActivity } from './interfaces/dashboard-activity.interface';
import { DashboardAction } from './interfaces/dashboard-action.interface';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {


  stats: DashboardStat[] = [];
  activities: DashboardActivity[] = [];
  actions: DashboardAction[] = [];


  constructor(
    private dashboardService: DashboardMockService
  ){}


  ngOnInit(): void {

    this.stats = this.dashboardService.getStats();
    this.activities = this.dashboardService.getActivities();
    this.actions = this.dashboardService.getActions();

  }


}