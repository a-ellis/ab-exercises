import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { AbstractControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { PokerComponent } from './poker.component';
import { PokerService } from './services/poker.service';

describe('PokerComponent', () => {
  let component: PokerComponent;
  let fixture: ComponentFixture<PokerComponent>;
  let pokerServiceSpy: jasmine.SpyObj<any>;
  let validString: string;
  let invalidString: string;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule, FormsModule, NoopAnimationsModule ],
      declarations: [ PokerComponent ],
      providers: [
        { provide: PokerService, useValue: jasmine.createSpyObj('pokerService', ['evaluateHandRank', 'handIsChanging']) }
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PokerComponent);
    pokerServiceSpy = TestBed.get(PokerService);
    component = fixture.componentInstance;

    validString = '2s 3s 4s 5s 6s';
    invalidString = 'definitely-not-valid';

    pokerServiceSpy.rank$ = of({});
    pokerServiceSpy.hand$ = of([]);

    component.hand$ = null;
    component.rank$ = null;

    fixture.detectChanges();
  });

  it('should create a FormGroup with a pokerHand control', () => {
    expect(component.pokerForm instanceof FormGroup).toBeTruthy();
    expect(component.pokerForm.get('pokerHand')).toBeTruthy();
  });

  describe('pokerForm', () => {

    it('should default to invalid state (pokerHand is required)', () => {
      expect(component.pokerForm.invalid).toBeTruthy();
    });

    it('should only call pokerService if value is valid', fakeAsync(() => {
      const formEl: DebugElement = fixture.debugElement.query(By.css('form'));

      formEl.triggerEventHandler('ngSubmit', null);

      expect(pokerServiceSpy.evaluateHandRank).not.toHaveBeenCalled();

      component.pokerForm.controls.pokerHand.setValue(validString);

      formEl.triggerEventHandler('ngSubmit', null);

      expect(pokerServiceSpy.evaluateHandRank).toHaveBeenCalledWith(validString);
    }));
  });

  describe('pokerHand', () => {
    let input: AbstractControl;

    beforeEach(() => {
      input = component.pokerForm.controls.pokerHand;
    });

    it('should be marked as invalid when empty', () => {
      expect(input.errors.required).toBeTruthy();
    });

    it('should be marked as invalid when invalid value is set', () => {
      input.setValue(invalidString);
      // In this case, toBeTruthy() means there's an error object present on control
      expect(input.errors.pokerHandFormat).toBeTruthy();
    });

    it('should be valid when a valid value is set', () => {
      input.setValue(validString);

      expect(input.errors).toBeNull();
    });

    it('should trigger pokerService when input value is changing', () => {
      const inputEl: HTMLElement = fixture.debugElement.query(By.css('input')).nativeElement;
      inputEl.dispatchEvent(new Event('input'));

      expect(pokerServiceSpy.handIsChanging).toHaveBeenCalled();
    });
  });

});
