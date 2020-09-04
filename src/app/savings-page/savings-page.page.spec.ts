import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SavingsPagePage } from './savings-page.page';

describe('SavingsPagePage', () => {
  let component: SavingsPagePage;
  let fixture: ComponentFixture<SavingsPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SavingsPagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SavingsPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
