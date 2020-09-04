import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BudgetExpensePage } from './budget-expense.page';

describe('BudgetExpensePage', () => {
  let component: BudgetExpensePage;
  let fixture: ComponentFixture<BudgetExpensePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BudgetExpensePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BudgetExpensePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
