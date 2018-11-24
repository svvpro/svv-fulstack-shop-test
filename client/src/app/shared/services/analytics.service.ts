import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AnalyticPage, OverviewPage} from "../interfaces";

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  constructor(private http: HttpClient) {
  }

  getOverview(): Observable<OverviewPage> {
    return this.http.get<OverviewPage>('/api/analytics/overview');
  }

  getAnalytics(): Observable<AnalyticPage> {
    return this.http.get<AnalyticPage>('/api/analytics/analitics');
  }
}
