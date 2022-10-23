import {
  Component,
  OnInit,
  HostListener,
  ChangeDetectorRef,
} from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from '../services/quiz.service';
import { HelperService } from '../services/helper.service';
import { Option, Question, Quiz, QuizConfig } from '../models/index';
import { StorageService } from '../services/storage.service';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
  providers: [QuizService],
})
export class QuizComponent implements OnInit {
  quizes: any[];
  quiz: Quiz = new Quiz(null);
  mode = 'quiz';
  quizName: string;
  quizConfig: QuizConfig = {
    allowBack: false,
    allowReview: false,
    autoMove: true, // if true, it will move to next question automatically when answered.
    duration: 300, // indicates the time (in secs) in which quiz needs to be completed. 0 means unlimited.
    pageSize: 1,
    requiredAll: false, // indicates if you must answer all the questions before submitting.
    richText: false,
    shuffleQuestions: false,
    shuffleOptions: false,
    showClock: false,
    showPagination: true,
    theme: 'none',
  };

  form: FormGroup;
  formErrors = {
    questions: this.questionsErrors(),
  };

  constructor(
    private quizService: QuizService,
    private _router: Router,
    private _fb: FormBuilder,
    private _localStore: StorageService,
    private _cdRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.quizes = this.quizService.getAll();
    this.quizName = this.quizes[0].id;

    this.form = this._fb.group({
      testTakerName: [''],
      questions: this._fb.array([]),
    });

    this.loadQuiz(this.quizName);
  }

  addMultipleQuestions(questions: Question[]) {
    questions.forEach((q: Question) => this.addQuestion(q));
  }

  addQuestion(q: Question) {
    const control = <FormArray>this.form.controls['questions'];
    control.push(this.initQuestion(q));
  }

  initQuestion(q?: Question) {
    return this._fb.group({
      question: [q.name, [Validators.required]],
      options: this._fb.array([]),
    });
  }

  addMultipleOptions(qIndex: number, options: Option[]) {
    options.forEach((o: Option) => this.addOption(qIndex, o));
  }

  addOption(qIndex, option: Option) {
    const control = (<FormArray>this.form.controls['questions'])
      .at(qIndex)
      .get('options') as FormArray;
    control.push(this.initOption(option));
  }

  initOption(o: Option) {
    return this._fb.group({
      name: [o.name, [Validators.requiredTrue]],
      value: [o.value, [Validators.requiredTrue]],
    });
  }

  loadQuiz(quizName: string) {
    const quizData = this.quizService.get(quizName);
    this.quiz = new Quiz(quizData);

    this.addMultipleQuestions(this.quiz.questions);

    this.quiz.questions.forEach((q, i) =>
      this.addMultipleOptions(i, q.options)
    );

    this.mode = 'quiz';

    // this.modelToForm(quizData);
  }

  onSelect(question: Question, option: Option) {
    if (question.questionTypeId === 1) {
      question.options.forEach((x) => {
        if (x.id !== option.id) x.checked = false;
      });
    }
  }

  isCorrected(question: Question) {
    return question.options.find((x) => x.checked)
      ? 'Answered'
      : 'Not Answered';
  }

  isCorrect(question: Question) {
    return question.options.every((x) => x.checked === x.isCorrect)
      ? 'correct'
      : 'wrong';
  }

  onSubmit() {
    let answers = [];

    console.log('[form valid]', this.form.valid);
    console.log('[form value]', this.form.value);
    this.validateForm();
    // Post your data to the server here.
    // this.mode = 'result';
  }

  // Form validation
  questionsErrors() {
    return [
      {
        question: '',

        options: this.optionsErrors(),
      },
    ];
  }

  optionsErrors() {
    return [
      {
        name: '',
        value: '',
      },
    ];
  }

  validateForm() {
    console.log('validateForm');
    this.validateQuestions();
  }

  validateQuestions() {
    console.log('validateQuestions');
  }
}
