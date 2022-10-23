export class Option {
  id: number;
  questionId: number;
  name: string;
  value: string | number | boolean;
  isCorrect: boolean;
  checked: boolean;

  constructor(data: any) {
    data = data || {};
    this.id = data.id;
    this.questionId = data.questionId;
    this.name = data.name;
    this.value = data.value;
    this.isCorrect = data.isCorrect;
  }
}
