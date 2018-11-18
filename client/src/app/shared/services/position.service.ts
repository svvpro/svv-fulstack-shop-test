import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Message, Position} from "../interfaces";

@Injectable({
  providedIn: 'root'
})
export class PositionService {

  constructor(private http: HttpClient) {
  }

  getAll(categoryId: string): Observable<Position[]> {
    return this.http.get<Position[]>(`/api/position/${categoryId}`);
  }

  add(position: Position): Observable<Position> {
    return this.http.post<Position>('/api/position', position);
  }

  update(id: string, position: Position): Observable<Position> {
    return this.http.patch<Position>(`/api/position/${id}`, position);
  }

  delete(id: string): Observable<Message> {
    return this.http.delete<Message>(`/api/position/${id}`);
  }
}
