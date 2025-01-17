import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopEntryComponent } from './shop-entry.component';

describe('ShopEntryComponent', () => {
  let component: ShopEntryComponent;
  let fixture: ComponentFixture<ShopEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShopEntryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShopEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
