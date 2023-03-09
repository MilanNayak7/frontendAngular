import { Component } from '@angular/core';
import { Observer } from 'rxjs';
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
    this.category.categories().subscribe(this.categoryObserver)
  }

  categoryObserver: Observer<any> = {
    next: value => {
      this.categores = value;
    },
    error: err => {
      Swal.fire('server error !!','Error in loading the data','success');
    },
    complete: () => {
      console.log('Done!');
    }
  };

}
