import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookNewInfoStepComponent } from './book-new-info-step.component';

describe('BookNewInfoStepComponent', () => {
  let component: BookNewInfoStepComponent;
  let fixture: ComponentFixture<BookNewInfoStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookNewInfoStepComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BookNewInfoStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
