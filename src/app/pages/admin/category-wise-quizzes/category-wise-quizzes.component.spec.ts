import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryWiseQuizzesComponent } from './category-wise-quizzes.component';

describe('CategoryWiseQuizzesComponent', () => {
  let component: CategoryWiseQuizzesComponent;
  let fixture: ComponentFixture<CategoryWiseQuizzesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryWiseQuizzesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryWiseQuizzesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
