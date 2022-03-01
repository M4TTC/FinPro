import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindSymbolsComponent } from './find-symbols.component';

describe('FindSymbolsComponent', () => {
  let component: FindSymbolsComponent;
  let fixture: ComponentFixture<FindSymbolsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FindSymbolsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FindSymbolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
