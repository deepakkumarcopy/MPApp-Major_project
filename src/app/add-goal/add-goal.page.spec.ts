import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddGoalPage } from './add-goal.page';

describe('AddGoalPage', () => {
	let component: AddGoalPage;
	let fixture: ComponentFixture<AddGoalPage>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ AddGoalPage ],
			imports: [IonicModule.forRoot()]
		}).compileComponents();

		fixture = TestBed.createComponent(AddGoalPage);
		component = fixture.componentInstance;
		fixture.detectChanges();
	}));

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
