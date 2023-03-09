import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';


@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})

export class AddCategoryComponent {
constructor(private addCat:CategoryService,private _snack:MatSnackBar){}

  category = {
    title:'',
    description:''
  };

  formSubmit(){
    if(this.category.title.trim()==''||this.category.description.trim()==''){
      this._snack.open('Title Required !!','',{
        duration:3000,
      });
      return;
    }
    this.addCat.addCategory(this.category);
  }
}
