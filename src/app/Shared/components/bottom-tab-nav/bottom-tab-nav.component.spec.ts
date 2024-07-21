import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BottomTabNavComponent } from './bottom-tab-nav.component';

describe('BottomTabNavComponent', () => {
  let component: BottomTabNavComponent;
  let fixture: ComponentFixture<BottomTabNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BottomTabNavComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BottomTabNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
