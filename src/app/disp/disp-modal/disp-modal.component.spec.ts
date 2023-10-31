import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DispModalComponent } from './disp-modal.component';

describe('DispModalComponent', () => {
  let component: DispModalComponent;
  let fixture: ComponentFixture<DispModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DispModalComponent]
    });
    fixture = TestBed.createComponent(DispModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
