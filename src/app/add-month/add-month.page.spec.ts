import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddMonthPage } from './add-month.page';

describe('AddMonthPage', () => {
  let component: AddMonthPage;
  let fixture: ComponentFixture<AddMonthPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMonthPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddMonthPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
