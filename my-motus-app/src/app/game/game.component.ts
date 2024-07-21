import { Component } from '@angular/core';
import { GameService } from '../services/game.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  standalone: true,
  imports:[CommonModule,FormsModule, HttpClientModule
    ],
    providers:[GameService],
  styleUrls: ['./game.component.scss']
})
export class GameComponent  {
  gameId!: string;

  firstLetter!: string;
  attempts: string[] = [];
  feedback: any[] = [];
  currentGuess = '';
  completed = false;
  won = false;

  constructor(private gameService: GameService) {}

    startNewGame() {
    this.gameService.startGame('medium').subscribe(
      response => {
        this.gameId = response.motsId;
        this.firstLetter = response.firstLetter;
        this.attempts = [];
        this.feedback = [];
        this.completed = false;
        this.won = false;
      }
    );
  }

  makeGuess() {
    if (this.currentGuess.length !== this.firstLetter.length) return;

    this.gameService.makeGuess(this.gameId, this.currentGuess).subscribe(
      response => {
        this.attempts.push(this.currentGuess);
        this.feedback.push(response.feedback);
        this.completed = response.completed;
        this.won = response.won;
        this.currentGuess = '';
        if(this.completed || this.won) {
            this.gameService.deleteGame(this.gameId).subscribe();
        }
       }
    );
  }
}
