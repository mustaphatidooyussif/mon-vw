import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilepicPage } from './profilepic.page';

describe('ProfilepicPage', () => {
  let component: ProfilepicPage;
  let fixture: ComponentFixture<ProfilepicPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfilepicPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilepicPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
