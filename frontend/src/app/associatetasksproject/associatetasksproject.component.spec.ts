import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociateTasksProjectComponent } from './associatetasksproject.component';

describe('AssociatetasksprojectComponent', () => {
  let component: AssociateTasksProjectComponent;
  let fixture: ComponentFixture<AssociateTasksProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssociateTasksProjectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssociateTasksProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
