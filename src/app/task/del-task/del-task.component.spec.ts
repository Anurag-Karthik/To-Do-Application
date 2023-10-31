import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DelTaskComponent } from './del-task.component';

describe('DelTaskComponent', () => {
  let component: DelTaskComponent;
  let fixture: ComponentFixture<DelTaskComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DelTaskComponent]
    });
    fixture = TestBed.createComponent(DelTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
