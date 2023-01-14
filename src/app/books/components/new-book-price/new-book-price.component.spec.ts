import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewBookPriceComponent } from './new-book-price.component';

describe('NewBookPriceComponent', () => {
  let component: NewBookPriceComponent;
  let fixture: ComponentFixture<NewBookPriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewBookPriceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewBookPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
