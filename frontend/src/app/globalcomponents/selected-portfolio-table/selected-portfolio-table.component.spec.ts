import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedPortfolioTableComponent } from './selected-portfolio-table.component';

describe('SelectedPortfolioTableComponent', () => {
  let component: SelectedPortfolioTableComponent;
  let fixture: ComponentFixture<SelectedPortfolioTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectedPortfolioTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedPortfolioTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
