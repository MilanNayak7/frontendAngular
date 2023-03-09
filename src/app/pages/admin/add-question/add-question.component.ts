import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observer } from 'rxjs';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})

export class AddQuestionComponent implements OnInit {

constructor( private _route: ActivatedRoute,private _question: QuestionService){}

  qId:any;
  qTitle:any;
  
  question = {
    quiz: {
      qId:0
    },
    content: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    answer: '',
  };

  ngOnInit(): void {
    this.qId = this._route.snapshot.params['qid'];
    this.question.quiz['qId'] = this.qId;
    this.qTitle = this._route.snapshot.params['title'];
  }

  formSubmit() {
    if (this.question.content.trim() == '' || this.question.content == null) {
      return;
    }

    if (this.question.option1.trim() == '' || this.question.option1 == null) {
      return;
    }
    if (this.question.option2.trim() == '' || this.question.option2 == null) {
      return;
    }
    if (this.question.answer.trim() == '' || this.question.answer == null) {
      return;
    }

        //form submit
        this._question.addQuestion(this.question).subscribe(this.questionObserver)
  }

  questionObserver: Observer<any> = {
    next: value => {
      Swal.fire('Success ', 'Question Added. Add Another one', 'success');
      this.question.content = '';
      this.question.option1 = '';
      this.question.option2 = '';
      this.question.option3 = '';
      this.question.option4 = '';
      this.question.answer = '';
    },
    error: err => {
      console.error(err);
      Swal.fire('server error !!','Error in loading the data','success');
    },
    complete: () => {
      console.log('Done!');
    }
  };
}
