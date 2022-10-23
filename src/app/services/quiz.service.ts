import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PERSONALITY_QUIZ_DATA } from '../../data/personality-quiz.data';

@Injectable()
export class QuizService {
  constructor(private http: HttpClient) {}

  get(type: string): any {
    let data: any;
    switch (type) {
      case 'personality-quiz':
        return PERSONALITY_QUIZ_DATA;
        break;
    }
  }

  getAll() {
    return [{ id: 'personality-quiz', name: 'Personality quiz' }];
  }
}
