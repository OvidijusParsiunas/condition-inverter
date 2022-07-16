import { Inverter } from '../../../../../shared/out/inverter/src/inverter';
import * as assert from 'assert';

// the reason why these tests are done in the extension directory instead of inverter is because they are used to achieve 100% test coverage
suite('Angular Invertion Suite', () => {
  [
    // {
    //   input: `<div [class.my_class]="condition">{children}</div>`,
    //   output: `<div [class.my_class]="!condition">{children}</div>`,
    // },
    {
      input: `<div [class.my_class]="step === 'step1'">{children}</div>`,
      output: `<div [class.my_class]="step !== 'step1'">{children}</div>`,
    },
    {
      input: `<div [class.my_class] = "step === 'step1'">{children}</div>`,
      output: `<div [class.my_class] = "step !== 'step1'">{children}</div>`,
    },
    {
      input: `<div [class.active]="step === 'step1'">{children}</div>`,
      output: `<div [class.active]="step !== 'step1'">{children}</div>`,
    },
    {
      input: `<div [ngClass]="{'active': step=='step1'}">{children}</div>`,
      output: `<div [ngClass]="{'active': step!='step1'}">{children}</div>`,
    },
    {
      input: `<div [ ngClass ] = " {'active': step=='step1'}">{children}</div>`,
      output: `<div [ ngClass ] = " {'active': step!='step1'}">{children}</div>`,
    },
    {
      input: `<div [ngClass]="step=='step1'?'class1':'class2'">{children}</div>`,
      output: `<div [ngClass]="step!='step1'?'class1':'class2'">{children}</div>`,
    },
    {
      input: `<div [ ngClass ] = " step=='step1'?'class1':'class2'">{children}</div>`,
      output: `<div [ ngClass ] = " step!='step1'?'class1':'class2'">{children}</div>`,
    },
    {
      input: `<div [ngClass]="(step=='step1')?'class1':'class2'">{children}</div>`,
      output: `<div [ngClass]="(step!='step1')?'class1':'class2'">{children}</div>`,
    },
    {
      input: `<div [ngClass]="{'my_class': step === 'step1'}">{children}</div>`,
      output: `<div [ngClass]="{'my_class': step !== 'step1'}">{children}</div>`,
    },
    {
      input: `<div [ngClass]="{'my_class': step === 'step1', 'my_class2' : step === 'step2' }">{children}</div>`,
      output: `<div [ngClass]="{'my_class': step !== 'step1', 'my_class2' : step !== 'step2' }">{children}</div>`,
    },
    {
      input: `<div [ngClass]="{'someClass': property1.isValid && property2.isValid}">{children}</div>`,
      output: `<div [ngClass]="{'someClass': !property1.isValid || !property2.isValid}">{children}</div>`,
    },
    {
      input: `'someClass': property1.isValid && property2.isValid`,
      output: `'someClass': !property1.isValid || !property2.isValid`,
    },
    {
      input: `<div [ngClass]="step == 'step1' ? 'my_class1' : 'my_class2'">{children}</div>`,
      output: `<div [ngClass]="step != 'step1' ? 'my_class1' : 'my_class2'">{children}</div>`,
    },
    {
      input: '<div className={`banner ${active ? "active" : ""}`}>{children}</div>',
      output: '<div className={`banner ${!active ? "active" : ""}`}>{children}</div>',
    },
    {
      input: `<div className={"btn-group pull-right " + (this.props.showBulkActions ? 'show' : 'hidden')}>{children}</div>`,
      output: `<div className={"btn-group pull-right " + (!this.props.showBulkActions ? 'show' : 'hidden')}>{children}</div>`,
    },
    {
      input: `<div className={"btn-group pull-right " + this.props.showBulkActions ? 'show' : 'hidden'}>{children}</div>`,
      output: `<div className={!("btn-group pull-right " + this.props.showBulkActions) ? 'show' : 'hidden'}>{children}</div>`,
    },
    // {
    //   input: '<div [hidden]="expression">Content to render when condition is true.</div>',
    //   output: '<div [hidden]="expression">Content to render when condition is true.</div>',
    // },
    {
      input: '<div ng-show="myValue">Content to render when condition is true.</div>',
      output: '<div ng-show="!myValue">Content to render when condition is true.</div>',
    },
    {
      input: '<div ng-show = " myValue">Content to render when condition is true.</div>',
      output: '<div ng-show = " !myValue">Content to render when condition is true.</div>',
    },
    {
      input: '<div ng-show="`myValue`">Content to render when condition is true.</div>',
      output: '<div ng-show="!`myValue`">Content to render when condition is true.</div>',
    },
    {
      input: '<div ng-show=`myValue`>Content to render when condition is true.</div>',
      output: '<div ng-show=`!myValue`>Content to render when condition is true.</div>',
    },
    {
      input: `<div ng-show='myValue'>Content to render when condition is true.</div>`,
      output: `<div ng-show='!myValue'>Content to render when condition is true.</div>`,
    },
    {
      input: 'div ng-show="myValue">Content to render when condition is true.</div>',
      output: 'div ng-show="!myValue">Content to render when condition is true.</div>',
    },
    {
      input: 'div ng-show="(myValue)">Content to render when condition is true.</div>',
      output: 'div ng-show="(!myValue)">Content to render when condition is true.</div>',
    },
    {
      input: 'div ng-show="!(myValue)">Content to render when condition is true.</div>',
      output: 'div ng-show="myValue">Content to render when condition is true.</div>',
    },
    {
      input: '<div ng-show="myValue && cat">Content to render when condition is true.</div>',
      output: '<div ng-show="!myValue || !cat">Content to render when condition is true.</div>',
    },
    {
      input: '<div ng-show="myValue && cat" ng-hide="myValue && cat">Content to render when condition is true.</div>',
      output: '<div ng-show="!myValue || !cat" ng-hide="!myValue || !cat">Content to render when condition is true.</div>',
    },
    {
      input: '<div ng-show="myValue ? dog : cat" ng-hide="myValue && cat">Content to render when condition is true.</div>',
      output: '<div ng-show="!myValue ? dog : cat" ng-hide="!myValue || !cat">Content to render when condition is true.</div>',
    },
    {
      input: '<div ng-show="myValue ? `dog` : `cat`" ng-hide="myValue && cat">Content to render when condition is true.</div>',
      output: '<div ng-show="!myValue ? `dog` : `cat`" ng-hide="!myValue || !cat">Content to render when condition is true.</div>',
    },
    {
      input: '<div ng-hide="myValue && cat" ng-show="myValue ? dog : cat">Content to render when condition is true.</div>',
      output: '<div ng-hide="!myValue || !cat" ng-show="!myValue ? dog : cat">Content to render when condition is true.</div>',
    },
    {
      input: '<div ng-show="myValue ? dog : cat">Content<div ng-show="myValue ? dog : cat"></div></div>',
      output: '<div ng-show="!myValue ? dog : cat">Content<div ng-show="!myValue ? dog : cat"></div></div>',
    },
    {
      input: '<div ng-show="myValue ? dog : cat" ng-hide="myValue ? dog : cat">Content to render when condition is true.</div>',
      output: '<div ng-show="!myValue ? dog : cat" ng-hide="!myValue ? dog : cat">Content to render when condition is true.</div>',
    },
    {
      input: 'ng-show="myValue',
      output: 'ng-show="!myValue',
    },
    {
      input: 'ng-show="',
      output: 'ng-show="',
    },
    {
      input: 'ng-show=',
      output: 'ng-show=',
    },
    {
      input: 'ng-show',
      output: 'ng-show',
    },
    {
      input: '<div ng-hide="expression">Content to render when condition is true.</div>',
      output: '<div ng-hide="!expression">Content to render when condition is true.</div>',
    },
    {
      input: '<div *ngIf="cat && dog">Content to render when condition is true.</div>',
      output: '<div *ngIf="!cat || !dog">Content to render when condition is true.</div>',
    },
    {
      input: '<div *ngIf = " cat && dog">Content to render when condition is true.</div>',
      output: '<div *ngIf = " !cat || !dog">Content to render when condition is true.</div>',
    },
    {
      input: '<div [ngIf]="cat && dog">Content to render when condition is true.</div>',
      output: '<div [ngIf]="!cat || !dog">Content to render when condition is true.</div>',
    },
    // {
    //   input: '<div *ngIf="condition">Content to render when condition is true.</div>',
    //   output: '<div *ngIf="!condition">Content to render when condition is true.</div>',
    // },
    {
      input: `<div class="col-md-3 d-flex" [ngStyle]="{'background-color': (vars.state=='Signup') ? '#73c7af' : '#ffffff'}">{children}</div>`,
      output: `<div class="col-md-3 d-flex" [ngStyle]="{'background-color': (vars.state!='Signup') ? '#73c7af' : '#ffffff'}">{children}</div>`,
    },
    {
      input: `<div class="col-md-3 d-flex" [style.background-color]="style1 ? 'red' : (style2 ? 'blue' : null)">{children}</div>`,
      output: `<div class="col-md-3 d-flex" [style.background-color]="!style1 ? 'red' : (style2 ? 'blue' : null)">{children}</div>`,
    },
    {
      input: `<div [ngStyle]="{'background-color': style1 ? 'red' : (style2 ? 'blue' : null) }">{children}</div>`,
      output: `<div [ngStyle]="{'background-color': !style1 ? 'red' : (style2 ? 'blue' : null) }">{children}</div>`,
    },
    {
      input: `<div [ngStyle]="styleOne?{'background-color': 'red'} : {'background-color': 'blue'}">{children}</div>`,
      output: `<div [ngStyle]="!styleOne?{'background-color': 'red'} : {'background-color': 'blue'}">{children}</div>`,
    },
    {
      input: `<div [ngStyle]="{ 'top': yourVar === true ? widthColumHalf + 'px': '302px' }">{children}</div>`,
      output: `<div [ngStyle]="{ 'top': yourVar !== true ? widthColumHalf + 'px': '302px' }">{children}</div>`,
    },
    {
      input: `<div [ ngStyle ] = " {  'top': yourVar === true ? widthColumHalf + 'px': '302px' }">{children}</div>`,
      output: `<div [ ngStyle ] = " {  'top': yourVar !== true ? widthColumHalf + 'px': '302px' }">{children}</div>`,
    },
  ].forEach((testProps) => {
    test(testProps.input, () => {
      const result = Inverter.invert(testProps.input);
      assert.strictEqual(result, testProps.output);
    });
  });
});
