import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CosmeticDetailComponent } from './cosmetic-detail.component';

describe('CosmeticDetailComponent', () => {
  let component: CosmeticDetailComponent;
  let fixture: ComponentFixture<CosmeticDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CosmeticDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CosmeticDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
