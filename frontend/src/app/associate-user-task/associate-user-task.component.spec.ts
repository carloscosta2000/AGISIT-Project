import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociateUserTaskComponent } from './associate-user-task.component';

describe('AssociateUserTaskComponent', () => {
  let component: AssociateUserTaskComponent;
  let fixture: ComponentFixture<AssociateUserTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssociateUserTaskComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssociateUserTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
