import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private apiUrl = 'http://localhost:3000/api/game';

  constructor(private http: HttpClient) {}

  startGame(difficulte: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/start`, { difficulte });
  }

  makeGuess(motId: string, guess: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/guess`, { motId, guess });
  }

  deleteGame(motsId: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/delete`, { motsId });
  }
}
