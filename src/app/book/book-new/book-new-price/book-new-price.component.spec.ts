import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookNewPriceComponent } from './book-new-price.component';

describe('BookNewPriceComponent', () => {
  let component: BookNewPriceComponent;
  let fixture: ComponentFixture<BookNewPriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookNewPriceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BookNewPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
