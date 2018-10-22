import { StepComponent } from './../step/step.component';
import { Component, OnInit, ViewChildren, ContentChildren, QueryList, Input, ViewChild } from '@angular/core';
import { StepContentComponent } from '../step-content/step-content.component';
import { StepperHorizontalComponent } from '../stepper-horizontal/stepper-horizontal.component';

@Component({
  selector: 'fiv-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss']
})
export class StepperComponent implements OnInit {

  @ContentChildren(StepComponent) contents: QueryList<StepComponent>;
  @ViewChildren(StepContentComponent) steps: QueryList<StepContentComponent>;
  @ViewChild(StepperHorizontalComponent) horizontal: StepperHorizontalComponent;
  @Input() mode: 'horizontal' | 'vertical' = 'vertical';

  currentIndex = 0;

  constructor() { }

  ngOnInit() {
  }

  open(index: number) {
    if (this.mode === 'horizontal') {
      this.currentIndex = index;
      console.log('+#+#+');
      this.horizontal.open(index);
    } else {
      this.currentIndex = index;
      this.steps.toArray()[index].open();
    }
  }

  close(index: number) {
    if (this.mode === 'horizontal') {
      this.currentIndex = 0;
      this.horizontal.close();
    } else {
      this.currentIndex = - 1;
      this.steps.toArray()[index].close();
    }

  }

  select(index: number) {
    console.log('select', index);
    if (index >= 0 && index < this.contents.length) {
      if (this.mode === 'vertical') {
        this.closeAll();

      }
      this.open(index);
    }
  }

  closeAll() {
    if (this.mode === 'horizontal') {
      this.currentIndex = 0;
      this.horizontal.close();
    } else {
      this.steps.forEach(step => {
        step.close();
      });
    }
  }

  next() {
    const next = this.currentIndex < this.steps.length ? this.currentIndex + 1 : -1;
    console.log('next index', next);
    this.select(next);
  }

  previous() {
    const next = this.currentIndex > 0 ? this.currentIndex + -1 : -1;
    console.log('next index', next);
    this.select(next);
  }

  completeStep(index: number) {
    if (this.mode === 'horizontal') {
      // not yet impletented

    } else {
      this.steps.toArray()[index].complete();

    }
  }

  reset(index: number) {
    if (this.mode === 'horizontal') {
      // not yet impletented
    } else {
      this.steps.toArray()[index].reset();
    }
  }

}