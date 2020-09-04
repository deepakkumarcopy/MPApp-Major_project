import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DeleteGoalPage } from './delete-goal.page';

describe('DeleteGoalPage', () => {
	let component: DeleteGoalPage;
	let fixture: ComponentFixture<DeleteGoalPage>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ DeleteGoalPage ],
			imports: [IonicModule.forRoot()]
		}).compileComponents();

		fixture = TestBed.createComponent(DeleteGoalPage);
		component = fixture.componentInstance;
		fixture.detectChanges();
	}));

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
