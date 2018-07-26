import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PokerCardComponent } from './poker-card.component';


describe('PokerCardComponent', () => {
  let component: PokerCardComponent;
  let fixture: ComponentFixture<PokerCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PokerCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PokerCardComponent);
    component = fixture.componentInstance;
    component.card = { rank: 0, suite: 0 };
    fixture.detectChanges();
  });

  it('should create a backgroundImage for matching card', () => {
    expect(component.backgroundImage.toString()).toContain(`url(./assets/images/cards/${component.card.rank}_${component.card.suite}.svg)`);
  });
});
