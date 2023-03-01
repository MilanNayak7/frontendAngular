import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import { Observer } from 'rxjs';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css']
})
export class ViewQuizzesComponent implements OnInit{

  quizzes = [
    {
      qId: 23,
      title: 'Basic java quiz',
      description: 'Core Java is used for developing computing or desktop applications. Advance Java is used for developing enterprise applications.',
      maxMarks: '50',
      numberOfQuestions: '20',
      active: '',
      category: {
        title: 'Programming'
      }
    },
  ];


constructor(private quiz:QuizService){}
  ngOnInit(): void {
    this.quiz.quizses().subscribe(this.myObserver);
  }


myObserver: Observer<any> = {
  next: value => {
  this.quizzes = value;
  },
  error: err => {
    Swal.fire('server error !!','Error in loading data','error');
  },
  complete: () => {
    console.log('Done!');
  }
};
qid = 0;
deleteQuiz(qid:any){
Swal.fire({
  icon:'info',
  title:'Are you sure ?',
  confirmButtonText:'Delete',
  showCancelButton:true,
}).then((result)=>{
  if(result.isConfirmed){
    this.qid = qid;
    this.quiz.deleteQuiz(qid).subscribe(this.deleteObserver);
  }
})
}

deleteObserver:Observer<any>={
  next: value => {
    this.quizzes = this.quizzes.filter((quiz)=>quiz.qId != this.qid)
    Swal.fire('Successful','Quiz deleted','success');
    },
    error: err => {
      Swal.fire('server error !!','Error in loading data','error');
    },
    complete: () => {
      console.log('Done!');
    }
  };

}
