import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CosmeticListComponent } from './cosmetic-list.component';

describe('CosmeticListComponent', () => {
  let component: CosmeticListComponent;
  let fixture: ComponentFixture<CosmeticListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CosmeticListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CosmeticListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
