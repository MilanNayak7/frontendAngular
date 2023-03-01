import { Component } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.css']
})
export class ViewCategoriesComponent {
  categores=[
    {
      cid:404,
      title:'Error in Connecction',
      description:'Error in Connection',
    },

  ];

  constructor(private category:CategoryService){}


  ngOnInit(): void {
    this.category.categories().subscribe((data:any)=>{
      this.categores = data;
      console.log(this.categores);
    },

    (error)=>{
      console.log(error);
      Swal.fire("Error !!","error in loading","error");
    }
    )
  }
}
