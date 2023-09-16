import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewBookInfoComponent } from './new-book-info.component';

describe('NewBookInfoComponent', () => {
  let component: NewBookInfoComponent;
  let fixture: ComponentFixture<NewBookInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewBookInfoComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewBookInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
