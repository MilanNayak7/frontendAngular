import { Component,OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { Observer } from 'rxjs';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit{

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
 
  quizData={
    title:'',
    description:'',
    maxMarks:'',
    numberOfQuestions:'',
    active:true,
    category:{
      cid:'',
    },
  };
  
 
  constructor(
    private cat:CategoryService,
    private snack:MatSnackBar,
    private quiz:QuizService
    ){
  }

  ngOnInit(): void {
    this.cat.categories().subscribe(this.myObserver)
  }

  myObserver: Observer<any> = {
    next: value => {
    this.categories = value;
    },
    error: err => {
      console.error(err);
      Swal.fire('server error !!','Error in loading the data','success');
    },
    complete: () => {
      console.log('Done!');
    }
  };


  addQuiz(){
    if(this.quizData.title.trim()==''|| this.quizData.category== null){
      this.snack.open("Title Required !!",'',{
        duration:3000,
      });
      return;
    }

    //validation

    //call server
    this.quiz.addQuiz(this.quizData).subscribe(this.quizObserver)

  }
  
  quizObserver: Observer<any> = {
    next: value => {
   Swal.fire('Success','quiz is added','success');
    },
    error: err => {
      console.error(err);
      Swal.fire('server error !!','Error in loading data','success');
    },
    complete: () => {
      console.log('Done!');
    }
  };

}
