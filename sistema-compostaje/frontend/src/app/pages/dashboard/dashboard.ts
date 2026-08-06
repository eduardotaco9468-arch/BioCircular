import { Component, OnInit, OnDestroy } from '@angular/core';
import { DashboardService } from './services/dashboard.service';
import { DashboardStat } from './interfaces/dashboard-stat.interface';
import { DashboardActivity } from './interfaces/dashboard-activity.interface';
import { DashboardAction } from './interfaces/dashboard-action.interface';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit, OnDestroy {


  stats: DashboardStat[] = [];
  activities: DashboardActivity[] = [];
  actions: DashboardAction[] = [];
  private statsSub!: Subscription;
  private activitiesSub!: Subscription;
  private actionsSub!: Subscription;



  constructor(
    private dashboardService: DashboardService
  ){}



  ngOnInit(): void {
    this.statsSub = this.dashboardService.getStats().subscribe(data => {
      this.stats = data;
    });
    this.activitiesSub = this.dashboardService.getActivities().subscribe(data => {
      this.activities = data;
    });
    this.actionsSub = this.dashboardService.getActions().subscribe(data => {
      this.actions = data;
    });
  }



  ngOnDestroy(): void {
    this.statsSub.unsubscribe();
    this.activitiesSub.unsubscribe();
    this.actionsSub.unsubscribe();
  }



}