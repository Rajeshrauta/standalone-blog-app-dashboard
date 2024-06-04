import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphAnalyzerComponent } from './graph-analyzer.component';

describe('GraphAnalyzerComponent', () => {
  let component: GraphAnalyzerComponent;
  let fixture: ComponentFixture<GraphAnalyzerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraphAnalyzerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GraphAnalyzerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
