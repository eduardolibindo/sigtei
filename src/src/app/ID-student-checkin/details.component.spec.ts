import { async, TestBed } from '@angular/core/testing';
import { IDstudentcheckinModule } from './ID-student-checkin.module';
import { DetailsComponent } from './details.component';


describe('DetailsComponent', () => {

  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        imports: [IDstudentcheckinModule],
        declarations: [DetailsComponent],
      })
      .compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(DetailsComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('should render zxing-scanner tag', async(() => {
    const fixture = TestBed.createComponent(DetailsComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('zxing-scanner')).toBeTruthy();
  }));
});
