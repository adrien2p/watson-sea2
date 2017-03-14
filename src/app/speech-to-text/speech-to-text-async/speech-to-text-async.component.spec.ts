import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeechToTextAsyncComponent } from './speech-to-text-async.component';

describe('SpeechToTextAsyncComponent', () => {
  let component: SpeechToTextAsyncComponent;
  let fixture: ComponentFixture<SpeechToTextAsyncComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpeechToTextAsyncComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeechToTextAsyncComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
