import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalRegComponent } from './modal-reg.component';

describe('ModalRegComponent', () => {
  let component: ModalRegComponent;
  let fixture: ComponentFixture<ModalRegComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalRegComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalRegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
