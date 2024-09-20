import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CosmeticItemComponent } from './cosmetic-item.component';

describe('CosmeticItemComponent', () => {
  let component: CosmeticItemComponent;
  let fixture: ComponentFixture<CosmeticItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CosmeticItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CosmeticItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
