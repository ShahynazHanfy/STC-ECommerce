import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavCategoryComponent } from './nav-category.component';

describe('NavCategoryComponent', () => {
  let component: NavCategoryComponent;
  let fixture: ComponentFixture<NavCategoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NavCategoryComponent]
    });
    fixture = TestBed.createComponent(NavCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
