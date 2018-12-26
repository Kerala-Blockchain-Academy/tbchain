import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManuhomeComponent } from './manuhome.component';

describe('ManuhomeComponent', () => {
  let component: ManuhomeComponent;
  let fixture: ComponentFixture<ManuhomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManuhomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManuhomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
