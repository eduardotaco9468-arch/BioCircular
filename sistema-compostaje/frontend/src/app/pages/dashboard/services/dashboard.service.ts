import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DashboardStat } from '../interfaces/dashboard-stat.interface';
import { DashboardActivity } from '../interfaces/dashboard-activity.interface';
import { DashboardAction } from '../interfaces/dashboard-action.interface';
import { API_BASE_URL } from '../../../core/services/api.service';

@Injectable({ providedIn: 'root' })
export class DashboardService {
  private readonly apiUrl = `${API_BASE_URL}/dashboard`;

  constructor(private readonly http: HttpClient) {}

  getStats(): Observable<DashboardStat[]> {
    return this.http.get<DashboardStat[]>(`${this.apiUrl}/stats`);
  }

  getActivities(): Observable<DashboardActivity[]> {
    return this.http.get<DashboardActivity[]>(`${this.apiUrl}/activities`);
  }

  getActions(): Observable<DashboardAction[]> {
    return this.http.get<DashboardAction[]>(`${this.apiUrl}/actions`);
  }
}
