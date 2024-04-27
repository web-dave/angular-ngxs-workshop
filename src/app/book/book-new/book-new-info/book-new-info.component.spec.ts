import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookNewInfoComponent } from './book-new-info.component';

xdescribe('BookNewInfoComponent', () => {
  let component: BookNewInfoComponent;
  let fixture: ComponentFixture<BookNewInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookNewInfoComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(BookNewInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
