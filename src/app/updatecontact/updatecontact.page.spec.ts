import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatecontactPage } from './updatecontact.page';

describe('UpdatecontactPage', () => {
  let component: UpdatecontactPage;
  let fixture: ComponentFixture<UpdatecontactPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatecontactPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatecontactPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
