import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observer } from 'rxjs';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrls: ['./load-quiz.component.css']
})
export class LoadQuizComponent implements OnInit {
  catId:any;
  quizzes:any;
  load = true;
  constructor(private route: ActivatedRoute, private quiz: QuizService) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.catId = params['catId'];
      if (this.catId == 0) {
        console.log('Load all the quiz');
        this.quiz.getActiveQuizzes().subscribe(this.getActiveQuizzesObserver)
      } else {
        console.log('Load specific quiz');

        this.quiz.getActiveQuizzesOfCategory(this.catId).subscribe(this.getActiveCategoryWiseQuizzeObserver)
      }
    }
    );
  }

  getActiveCategoryWiseQuizzeObserver: Observer<any> = {
    next: value => {
      this.quizzes = value;
      console.log(this.quizzes);
    },
    error: err => {
      console.error(err);
      Swal.fire('server error !!','Error in loading the data','error');
    },
    complete: () => {
      console.log('Done!');
    }
  };


  getActiveQuizzesObserver: Observer<any> = {
    next: value => {
      this.quizzes = value;
      this.load = false;
      console.log(this.quizzes);
    },
    error: err => {
      console.error(err);
      Swal.fire('server error !!','Error in loading the data','error');
    },
    complete: () => {
      console.log('Done!');
    }
  };


}
  

