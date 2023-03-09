import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Observer } from 'rxjs';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-category-wise-quizzes',
  templateUrl: './category-wise-quizzes.component.html',
  styleUrls: ['./category-wise-quizzes.component.css']
})
export class CategoryWiseQuizzesComponent implements OnInit {
  constructor(private route:ActivatedRoute,private quizService:QuizService){}

cid:number=0;

quizzes:any;

  ngOnInit(): void {
    this.cid = this.route.snapshot.params['cid'];
    this.quizService.getActiveQuizzesOfCategory(this.cid).subscribe(this.quizObserver);
  }

  quizObserver:Observer<any> = {
    next: value => {
      this.quizzes = value;
      },
      error: err => {
        Swal.fire('server error !!','Error in loading data','error');
      },
      complete: () => {
        console.log('Done!');
      }
  }

  
}
