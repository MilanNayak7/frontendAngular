import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import { Observer } from 'rxjs';
import Swal from 'sweetalert2';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css']
})

export class UpdateQuizComponent implements OnInit{

  constructor(
    private route:ActivatedRoute,
    private _quiz:QuizService,
    private _cat:CategoryService,
    private router:Router
    ){}

    qId = 0;
    quiz:any;
  categories=
  [
    {
      cid:23,
      title:'programming'
    },
    {
      cid:24,
      title:'Java'
    }
  ]

 


  ngOnInit(): void {
    this.qId = this.route.snapshot.params['qid'];
    this._quiz.getQuiz(this.qId).subscribe(this.getUpdateObserver);
    this._cat.categories().subscribe(this.categoryObserver);
  }
  

  getUpdateObserver:Observer<any>={
    next: value => {
        this.quiz = value;
      },
      error: err => {
        Swal.fire('server error !!','Error in loading data','error');
      },
      complete: () => {
        console.log('Done!');
      }
    };


    categoryObserver: Observer<any> = {
      next: value => {
      this.categories = value;
      },
      error: err => {
        Swal.fire('server error !!','Error in loading data','success');
      },
      complete: () => {
        console.log('Done!');
      }
    };

   //update form submit
   public updateData(){
    this._quiz.updateQuiz(this.quiz).subscribe(this.updateObserver)
   }

   updateObserver:Observer<any>={
    next: value => {
      Swal.fire('success','Quiz updated successfully','success').then((e)=>{
        this.router.navigate([`/admin/quizzes`]);
      });
      },
      error: err => {
        Swal.fire('server error !!','Error in loading data','error');
      },
      complete: () => {
        console.log('Done!');
      }
    };


  
  
}
