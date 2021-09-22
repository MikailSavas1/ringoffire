import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameCmdComponent } from './game-cmd.component';

describe('GameCmdComponent', () => {
  let component: GameCmdComponent;
  let fixture: ComponentFixture<GameCmdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameCmdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameCmdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
