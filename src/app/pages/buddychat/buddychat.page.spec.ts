import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuddychatPage } from './buddychat.page';

describe('BuddychatPage', () => {
  let component: BuddychatPage;
  let fixture: ComponentFixture<BuddychatPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuddychatPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuddychatPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
