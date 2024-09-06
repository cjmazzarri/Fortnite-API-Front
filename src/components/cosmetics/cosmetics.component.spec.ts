import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CosmeticsComponent } from './cosmetics.component';

describe('CosmeticsComponent', () => {
  let component: CosmeticsComponent;
  let fixture: ComponentFixture<CosmeticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CosmeticsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CosmeticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
