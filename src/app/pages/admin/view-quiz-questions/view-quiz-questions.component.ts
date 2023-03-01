import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Observer } from 'rxjs';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quiz-questions',
  templateUrl: './view-quiz-questions.component.html',
  styleUrls: ['./view-quiz-questions.component.css']
})


export class ViewQuizQuestionsComponent implements OnInit {

  qId: any;
  qTitle: any;
  questions =[
    {
      quesId:0,
      answer:"oops",
      content:"oops",
      image:"jpg",
      option1:"option1",
      option2:"option2",
      option3:"option3",
      option4:"option4",
    }
  ];

  constructor(private route: ActivatedRoute,private question:QuestionService, private _snak: MatSnackBar) { }

  ngOnInit(): void {
   this.qId = this.route.snapshot.params['id'];
   this.qTitle = this.route.snapshot.params['title'];
  this.question.getQuestionsOfQuiz(this.qId).subscribe(this.questionObserver);
  }

  questionObserver:Observer<any> = {
    next: value => {
      this.questions = value;
      },
      error: err => {
        Swal.fire('server error !!','Error in loading data','error');
      },
      complete: () => {
        console.log('Done!');
      }
  }


  
  //delete quesion
  deleteQuestion(qid:any) {
    Swal.fire({
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      title: 'Are you sure , want to delete this question?',
    }).then((result) => {
      if (result.isConfirmed) {
        //confim
        this.question.deleteQuestion(qid).subscribe(
          (data) => {
            this._snak.open('Question Deleted ', '', {
              duration: 3000,
            });
            this.questions = this.questions.filter((q) => q.quesId != qid);
          },

          (error) => {
            this._snak.open('Error in deleting questions', '', {
              duration: 3000,
            });
            console.log(error);
          }
        );
      }
    });
  }

}


