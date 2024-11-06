import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavouritesChartComponent } from './favourites-chart.component';

describe('FavouritesChartComponent', () => {
  let component: FavouritesChartComponent;
  let fixture: ComponentFixture<FavouritesChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavouritesChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavouritesChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
