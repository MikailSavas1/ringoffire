import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddNewPlayerComponent } from './dialog-add-new-player.component';

describe('DialogAddNewPlayerComponent', () => {
  let component: DialogAddNewPlayerComponent;
  let fixture: ComponentFixture<DialogAddNewPlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAddNewPlayerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddNewPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
