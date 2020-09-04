import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddSavingsPage } from './add-savings.page';

describe('AddSavingsPage', () => {
  let component: AddSavingsPage;
  let fixture: ComponentFixture<AddSavingsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSavingsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddSavingsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
