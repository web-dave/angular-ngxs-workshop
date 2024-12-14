import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookNewPriceStepComponent } from './book-new-price-step.component';

describe('BookNewPriceStepComponent', () => {
  let component: BookNewPriceStepComponent;
  let fixture: ComponentFixture<BookNewPriceStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookNewPriceStepComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BookNewPriceStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
