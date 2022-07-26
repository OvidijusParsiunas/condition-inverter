const mocha = require('../../../../node_modules/mocha/lib/mocha.js');
import { TestUtil } from '../../shared/functionality/testUtil';
import { TextEditorObj } from '../../shared/types/tests';
import * as vscode from 'vscode';

suite('Selected Angular Statement Suite', () => {
  const textEditorObj: TextEditorObj = { textEditor: null };

  mocha.before(() => TestUtil.createTextDocument(textEditorObj));

  mocha.beforeEach(() => TestUtil.removeTextFromEditor(textEditorObj));

  mocha.after(() => TestUtil.executCloseEditorCommand());

  TestUtil.runInversionTests(textEditorObj, 'Single Line', [
    {
      lines: [
        {
          input: `><div [class.active]="condition">{children}</div>`,
          output: `><div [class.active]="condition">{children}</div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 0),
        end: new vscode.Position(0, 0),
      },
    },
    {
      lines: [
        {
          input: `><div [class.active]="condition">{children}</div>`,
          output: `><div [class.active]="condition">{children}</div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 1),
        end: new vscode.Position(0, 1),
      },
    },
    {
      lines: [
        {
          input: `><div [class.active]="condition">{children}</div>`,
          output: `><div [class.active]="condition">{children}</div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 2),
        end: new vscode.Position(0, 2),
      },
    },
    {
      lines: [
        {
          input: `><div [class.active]="condition">{children}</div>`,
          output: `><div [class.active]="condition">{children}</div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 5),
        end: new vscode.Position(0, 5),
      },
    },
    {
      lines: [
        {
          input: `<div [class.active]="condition">{children}</div>`,
          output: `<div [class.active]="condition">{children}</div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 0),
        end: new vscode.Position(0, 0),
      },
    },
    {
      lines: [
        {
          input: `<div [class.active]="condition">{children}</div>`,
          output: `<div [class.active]="condition">{children}</div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 1),
        end: new vscode.Position(0, 1),
      },
    },
    {
      lines: [
        {
          input: `<div [class.active]="condition">{children}</div>`,
          output: `<div [class.active]="condition">{children}</div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 4),
        end: new vscode.Position(0, 4),
      },
    },
    {
      lines: [
        {
          input: `<div [class.active]="condition">{children}</div>`,
          output: `<div [class.active]="condition">{children}</div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 5),
        end: new vscode.Position(0, 5),
      },
    },
    {
      lines: [
        {
          input: `<div [class.active]="condition">{children}</div>`,
          output: `<div [class.active]="condition">{children}</div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 6),
        end: new vscode.Position(0, 6),
      },
    },
    {
      lines: [
        {
          input: `<div [class.active]="condition">{children}</div>`,
          output: `<div [class.active]="condition">{children}</div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 11),
        end: new vscode.Position(0, 11),
      },
    },
    {
      lines: [
        {
          input: `<div [class.active]="condition">{children}</div>`,
          output: `<div [class.active]="condition">{children}</div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 12),
        end: new vscode.Position(0, 12),
      },
    },
    {
      lines: [
        {
          input: `<div [class.active]="condition">{children}</div>`,
          output: `<div [class.active]="condition">{children}</div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 18),
        end: new vscode.Position(0, 18),
      },
    },
    {
      lines: [
        {
          input: `<div [class.active]="condition">{children}</div>`,
          output: `<div [class.active]="!condition">{children}</div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 20),
        end: new vscode.Position(0, 20),
      },
    },
    {
      lines: [
        {
          input: `<div [class.active]="condition">{children}</div>`,
          output: `<div [class.active]="!condition">{children}</div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 21),
        end: new vscode.Position(0, 21),
      },
    },
    {
      lines: [
        {
          input: `<div [class.active]="condition">{children}</div>`,
          output: `<div [class.active]="!condition">{children}</div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 20),
        end: new vscode.Position(0, 20),
      },
    },
    {
      lines: [
        {
          input: `<div [class.active]="condition">{children}</div>`,
          output: `<div [class.active]="!condition">{children}</div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 30),
        end: new vscode.Position(0, 30),
      },
    },
    {
      lines: [
        {
          input: `<div [class.active]="condition">{children}</div>`,
          output: `<div [class.active]="condition">{children}</div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 31),
        end: new vscode.Position(0, 31),
      },
    },
    {
      lines: [
        {
          input: `<div [class.active]="condition">{children}</div>`,
          output: `<div [class.active]="condition">{children}</div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 32),
        end: new vscode.Position(0, 32),
      },
    },
    {
      lines: [
        {
          input: `<div [class.active]="condition">{children}</div>`,
          output: `<div [class.active]="condition">{children}</div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 33),
        end: new vscode.Position(0, 33),
      },
    },
    {
      lines: [
        {
          input: `<div [class.active]="condition">{children}</div>`,
          output: `<div [class.active]="condition">{children}</div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 41),
        end: new vscode.Position(0, 41),
      },
    },
    {
      lines: [
        {
          input: `<div [class.active]="condition">{children}</div>`,
          output: `<div [class.active]="condition">{children}</div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 42),
        end: new vscode.Position(0, 42),
      },
    },
    {
      lines: [
        {
          input: `<div [class.active]="condition">{children}</div>`,
          output: `<div [class.active]="condition">{children}</div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 43),
        end: new vscode.Position(0, 43),
      },
    },
    {
      lines: [
        {
          input: `<div [class.active]="condition">{children}</div>`,
          output: `<div [class.active]="condition">{children}</div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 44),
        end: new vscode.Position(0, 44),
      },
    },
    {
      lines: [
        {
          input: `<div [class.active]="condition">{children}</div>`,
          output: `<div [class.active]="condition">{children}</div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 47),
        end: new vscode.Position(0, 47),
      },
    },
    {
      lines: [
        {
          input: `<div [class.active]="condition">{children}</div>`,
          output: `<div [class.active]="condition">{children}</div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 48),
        end: new vscode.Position(0, 48),
      },
    },
    {
      lines: [
        {
          input: `<div [class.active]="condition">{children}</div><`,
          output: `<div [class.active]="condition">{children}</div><`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 42),
        end: new vscode.Position(0, 42),
      },
    },
    {
      lines: [
        {
          input: `<div [class.active]="condition">{children}</div><`,
          output: `<div [class.active]="condition">{children}</div><`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 43),
        end: new vscode.Position(0, 43),
      },
    },
    {
      lines: [
        {
          input: `<div [class.active]="condition">{children}</div><`,
          output: `<div [class.active]="condition">{children}</div><`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 44),
        end: new vscode.Position(0, 44),
      },
    },
    {
      lines: [
        {
          input: `<div [class.active]="condition">{children}</div><`,
          output: `<div [class.active]="condition">{children}</div><`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 47),
        end: new vscode.Position(0, 47),
      },
    },
    {
      lines: [
        {
          input: `<div [class.active]="condition">{children}</div><`,
          output: `<div [class.active]="condition">{children}</div><`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 48),
        end: new vscode.Position(0, 48),
      },
    },
    {
      lines: [
        {
          input: `<div [class.active]="condition">{children}</div><`,
          output: `<div [class.active]="condition">{children}</div><`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 49),
        end: new vscode.Position(0, 49),
      },
    },
    {
      lines: [
        {
          input: `<div [ngStyle]="{'color': condition ? 'red' : 'blue'}" [ngIf]="condition" ng-show="myValue" *ngIf="condition" ng-show="myValue">`,
          output: `<div [ngStyle]="{'color': condition ? 'red' : 'blue'}" [ngIf]="condition" ng-show="myValue" *ngIf="condition" ng-show="myValue">`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 5),
        end: new vscode.Position(0, 5),
      },
    },
    {
      lines: [
        {
          input: `<div [ngStyle]="{'color': condition ? 'red' : 'blue'}" [ngIf]="condition" ng-show="myValue" *ngIf="condition" ng-show="myValue">`,
          output: `<div [ngStyle]="{'color': condition ? 'red' : 'blue'}" [ngIf]="condition" ng-show="myValue" *ngIf="condition" ng-show="myValue">`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 6),
        end: new vscode.Position(0, 6),
      },
    },
    {
      lines: [
        {
          input: `<div [ngStyle]="{'color': condition ? 'red' : 'blue'}" [ngIf]="condition" ng-show="myValue" *ngIf="condition" ng-show="myValue">`,
          output: `<div [ngStyle]="{'color': condition ? 'red' : 'blue'}" [ngIf]="condition" ng-show="myValue" *ngIf="condition" ng-show="myValue">`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 13),
        end: new vscode.Position(0, 13),
      },
    },
    {
      lines: [
        {
          input: `<div [ngStyle]="{'color': condition ? 'red' : 'blue'}" [ngIf]="condition" ng-show="myValue" *ngIf="condition" ng-show="myValue">`,
          output: `<div [ngStyle]="{'color': condition ? 'red' : 'blue'}" [ngIf]="condition" ng-show="myValue" *ngIf="condition" ng-show="myValue">`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 14),
        end: new vscode.Position(0, 14),
      },
    },
    {
      lines: [
        {
          input: `<div [ngStyle]="{'color': condition ? 'red' : 'blue'}" [ngIf]="condition" ng-show="myValue" *ngIf="condition" ng-show="myValue">`,
          output: `<div [ngStyle]="{'color': condition ? 'red' : 'blue'}" [ngIf]="condition" ng-show="myValue" *ngIf="condition" ng-show="myValue">`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 15),
        end: new vscode.Position(0, 15),
      },
    },
    {
      lines: [
        {
          input: `<div [ngStyle]="{'color': condition ? 'red' : 'blue'}" [ngIf]="condition" ng-show="myValue" *ngIf="condition" ng-show="myValue">`,
          output: `<div [ngStyle]="{'color': condition ? 'red' : 'blue'}" [ngIf]="condition" ng-show="myValue" *ngIf="condition" ng-show="myValue">`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 16),
        end: new vscode.Position(0, 16),
      },
    },
    {
      lines: [
        {
          input: `<div [ngStyle]="{'color': condition ? 'red' : 'blue'}" [ngIf]="condition" ng-show="myValue" *ngIf="condition" ng-show="myValue">`,
          output: `<div [ngStyle]="{'color': condition ? 'red' : 'blue'}" [ngIf]="condition" ng-show="myValue" *ngIf="condition" ng-show="myValue">`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 17),
        end: new vscode.Position(0, 17),
      },
    },
    {
      lines: [
        {
          input: `<div [ngStyle]="{'color': condition ? 'red' : 'blue'}" [ngIf]="condition" ng-show="myValue" *ngIf="condition" ng-show="myValue">`,
          output: `<div [ngStyle]="{'color': condition ? 'red' : 'blue'}" [ngIf]="condition" ng-show="myValue" *ngIf="condition" ng-show="myValue">`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 18),
        end: new vscode.Position(0, 18),
      },
    },
    {
      lines: [
        {
          input: `<div [ngStyle]="{'color': condition ? 'red' : 'blue'}" [ngIf]="condition" ng-show="myValue" *ngIf="condition" ng-show="myValue">`,
          output: `<div [ngStyle]="{'color': condition ? 'red' : 'blue'}" [ngIf]="condition" ng-show="myValue" *ngIf="condition" ng-show="myValue">`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 23),
        end: new vscode.Position(0, 23),
      },
    },
    {
      lines: [
        {
          input: `<div [ngStyle]="{'color': condition ? 'red' : 'blue'}" [ngIf]="condition" ng-show="myValue" *ngIf="condition" ng-show="myValue">`,
          output: `<div [ngStyle]="{'color': condition ? 'red' : 'blue'}" [ngIf]="condition" ng-show="myValue" *ngIf="condition" ng-show="myValue">`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 24),
        end: new vscode.Position(0, 24),
      },
    },
    {
      lines: [
        {
          input: `<div [ngStyle]="{'color': condition ? 'red' : 'blue'}" [ngIf]="condition" ng-show="myValue" *ngIf="condition" ng-show="myValue">`,
          output: `<div [ngStyle]="{'color': !condition ? 'red' : 'blue'}" [ngIf]="condition" ng-show="myValue" *ngIf="condition" ng-show="myValue">`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 25),
        end: new vscode.Position(0, 25),
      },
    },
    {
      lines: [
        {
          input: `<div [ngStyle]="{'color': condition ? 'red' : 'blue'}" [ngIf]="condition" ng-show="myValue" *ngIf="condition" ng-show="myValue">`,
          output: `<div [ngStyle]="{'color': !condition ? 'red' : 'blue'}" [ngIf]="condition" ng-show="myValue" *ngIf="condition" ng-show="myValue">`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 26),
        end: new vscode.Position(0, 26),
      },
    },
    {
      lines: [
        {
          input: `<div [ngStyle]="{'color': condition ? 'red' : 'blue'}" [ngIf]="condition" ng-show="myValue" *ngIf="condition" ng-show="myValue">`,
          output: `<div [ngStyle]="{'color': !condition ? 'red' : 'blue'}" [ngIf]="condition" ng-show="myValue" *ngIf="condition" ng-show="myValue">`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 35),
        end: new vscode.Position(0, 35),
      },
    },
    {
      lines: [
        {
          input: `<div [ngStyle]="{'color': condition ? 'red' : 'blue'}" [ngIf]="condition" ng-show="myValue" *ngIf="condition" ng-show="myValue">`,
          output: `<div [ngStyle]="{'color': condition ? 'red' : 'blue'}" [ngIf]="condition" ng-show="myValue" *ngIf="condition" ng-show="myValue">`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 36),
        end: new vscode.Position(0, 36),
      },
    },
    {
      lines: [
        {
          input: `<div [ngStyle]="{'color': condition ? 'red' : 'blue'}" [ngIf]="condition" ng-show="myValue" *ngIf="condition" ng-show="myValue">`,
          output: `<div [ngStyle]="{'color': condition ? 'red' : 'blue'}" [ngIf]="condition" ng-show="myValue" *ngIf="condition" ng-show="myValue">`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 37),
        end: new vscode.Position(0, 37),
      },
    },
    {
      lines: [
        {
          input: `<div [ngStyle]="{'color': condition ? 'red' : 'blue'}" [ngIf]="condition" ng-show="myValue" *ngIf="condition" ng-show="myValue">`,
          output: `<div [ngStyle]="{'color': condition ? 'red' : 'blue'}" [ngIf]="condition" ng-show="myValue" *ngIf="condition" ng-show="myValue">`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 38),
        end: new vscode.Position(0, 38),
      },
    },
    {
      lines: [
        {
          input: `<div [ngStyle]="{'color': condition ? 'red' : 'blue'}" [ngIf]="condition" ng-show="myValue" *ngIf="condition" ng-show="myValue">`,
          output: `<div [ngStyle]="{'color': condition ? 'red' : 'blue'}" [ngIf]="condition" ng-show="myValue" *ngIf="condition" ng-show="myValue">`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 39),
        end: new vscode.Position(0, 39),
      },
    },
    {
      lines: [
        {
          input: `<div [ngStyle]="{'color': condition ? 'red' : 'blue'}" [ngIf]="condition" ng-show="myValue" *ngIf="condition" ng-show="myValue">`,
          output: `<div [ngStyle]="{'color': condition ? 'red' : 'blue'}" [ngIf]="condition" ng-show="myValue" *ngIf="condition" ng-show="myValue">`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 42),
        end: new vscode.Position(0, 42),
      },
    },
    {
      lines: [
        {
          input: `<div [ngStyle]="{'color': condition ? 'red' : 'blue'}" [ngIf]="condition" ng-show="myValue" *ngIf="condition" ng-show="myValue">`,
          output: `<div [ngStyle]="{'color': condition ? 'red' : 'blue'}" [ngIf]="condition" ng-show="myValue" *ngIf="condition" ng-show="myValue">`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 43),
        end: new vscode.Position(0, 43),
      },
    },
    {
      lines: [
        {
          input: `<div [ngStyle]="{'color': condition ? 'red' : 'blue'}" [ngIf]="condition" ng-show="myValue" *ngIf="condition" ng-show="myValue">`,
          output: `<div [ngStyle]="{'color': condition ? 'red' : 'blue'}" [ngIf]="condition" ng-show="myValue" *ngIf="condition" ng-show="myValue">`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 44),
        end: new vscode.Position(0, 44),
      },
    },
    {
      lines: [
        {
          input: `<div [ngStyle]="{'color': condition ? 'red' : 'blue'}" [ngIf]="condition" ng-show="myValue" *ngIf="condition" ng-show="myValue">`,
          output: `<div [ngStyle]="{'color': condition ? 'red' : 'blue'}" [ngIf]="condition" ng-show="myValue" *ngIf="condition" ng-show="myValue">`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 45),
        end: new vscode.Position(0, 45),
      },
    },
    {
      lines: [
        {
          input: `<div [ngStyle]="{'color': condition ? 'red' : 'blue'}" [ngIf]="condition" ng-show="myValue" *ngIf="condition" ng-show="myValue">`,
          output: `<div [ngStyle]="{'color': condition ? 'red' : 'blue'}" [ngIf]="condition" ng-show="myValue" *ngIf="condition" ng-show="myValue">`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 46),
        end: new vscode.Position(0, 46),
      },
    },
    {
      lines: [
        {
          input: `<div [ngStyle]="{'color': condition ? 'red' : 'blue'}" [ngIf]="condition" ng-show="myValue" *ngIf="condition" ng-show="myValue">`,
          output: `<div [ngStyle]="{'color': condition ? 'red' : 'blue'}" [ngIf]="condition" ng-show="myValue" *ngIf="condition" ng-show="myValue">`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 47),
        end: new vscode.Position(0, 47),
      },
    },
    {
      lines: [
        {
          input: `<div [ngStyle]="{'color': condition ? 'red' : 'blue'}" [ngIf]="condition" ng-show="myValue" *ngIf="condition" ng-show="myValue">`,
          output: `<div [ngStyle]="{'color': condition ? 'red' : 'blue'}" [ngIf]="condition" ng-show="myValue" *ngIf="condition" ng-show="myValue">`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 51),
        end: new vscode.Position(0, 51),
      },
    },
    {
      lines: [
        {
          input: `<div [ngStyle]="{'color': condition ? 'red' : 'blue'}" [ngIf]="condition" ng-show="myValue" *ngIf="condition" ng-show="myValue">`,
          output: `<div [ngStyle]="{'color': condition ? 'red' : 'blue'}" [ngIf]="condition" ng-show="myValue" *ngIf="condition" ng-show="myValue">`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 52),
        end: new vscode.Position(0, 52),
      },
    },
    {
      lines: [
        {
          input: `<div [ngStyle]="{'color': condition ? 'red' : 'blue'}" [ngIf]="condition" ng-show="myValue" *ngIf="condition" ng-show="myValue">`,
          output: `<div [ngStyle]="{'color': condition ? 'red' : 'blue'}" [ngIf]="condition" ng-show="myValue" *ngIf="condition" ng-show="myValue">`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 53),
        end: new vscode.Position(0, 53),
      },
    },
    {
      lines: [
        {
          input: `<div [ngStyle]="{'color': condition ? 'red' : 'blue'}" [ngIf]="condition" ng-show="myValue" *ngIf="condition" ng-show="myValue">`,
          output: `<div [ngStyle]="{'color': condition ? 'red' : 'blue'}" [ngIf]="condition" ng-show="myValue" *ngIf="condition" ng-show="myValue">`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 54),
        end: new vscode.Position(0, 54),
      },
    },
    {
      lines: [
        {
          input: `<div [ngStyle]="{'color': condition ? 'red' : 'blue'}" [ngIf]="condition" ng-show="myValue" *ngIf="condition" ng-show="myValue">`,
          output: `<div [ngStyle]="{'color': condition ? 'red' : 'blue'}" [ngIf]="condition" ng-show="myValue" *ngIf="condition" ng-show="myValue">`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 55),
        end: new vscode.Position(0, 55),
      },
    },
    {
      lines: [
        {
          input: `<div [ngStyle]="{'color': condition ? 'red' : 'blue'}" [ngIf]="condition" ng-show="myValue" *ngIf="condition" ng-show="myValue">`,
          output: `<div [ngStyle]="{'color': condition ? 'red' : 'blue'}" [ngIf]="condition" ng-show="myValue" *ngIf="condition" ng-show="myValue">`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 56),
        end: new vscode.Position(0, 56),
      },
    },
    {
      lines: [
        {
          input: `<div [ngStyle]="{'color': condition ? 'red' : 'blue'}" [ngIf]="condition" ng-show="myValue" *ngIf="condition" ng-show="myValue">`,
          output: `<div [ngStyle]="{'color': condition ? 'red' : 'blue'}" [ngIf]="condition" ng-show="myValue" *ngIf="condition" ng-show="myValue">`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 60),
        end: new vscode.Position(0, 60),
      },
    },
    {
      lines: [
        {
          input: `<div [ngStyle]="{'color': condition ? 'red' : 'blue'}" [ngIf]="condition" ng-show="myValue" *ngIf="condition" ng-show="myValue">`,
          output: `<div [ngStyle]="{'color': condition ? 'red' : 'blue'}" [ngIf]="!condition" ng-show="myValue" *ngIf="condition" ng-show="myValue">`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 63),
        end: new vscode.Position(0, 63),
      },
    },
    {
      lines: [
        {
          input: `<div [ngStyle]="{'color': condition ? 'red' : 'blue'}" [ngIf]="condition" ng-show="myValue" *ngIf="condition" ng-show="myValue">`,
          output: `<div [ngStyle]="{'color': condition ? 'red' : 'blue'}" [ngIf]="!condition" ng-show="myValue" *ngIf="condition" ng-show="myValue">`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 72),
        end: new vscode.Position(0, 72),
      },
    },
    {
      lines: [
        {
          input: `<div [ngStyle]="{'color': condition ? 'red' : 'blue'}" [ngIf]="condition" ng-show="myValue" *ngIf="condition" ng-show="myValue">`,
          output: `<div [ngStyle]="{'color': condition ? 'red' : 'blue'}" [ngIf]="condition" ng-show="myValue" *ngIf="condition" ng-show="myValue">`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 73),
        end: new vscode.Position(0, 73),
      },
    },
    {
      lines: [
        {
          input: `<div [ngStyle]="{'color': condition ? 'red' : 'blue'}" [ngIf]="condition" ng-show="myValue" *ngIf="condition" ng-show="myValue">`,
          output: `<div [ngStyle]="{'color': condition ? 'red' : 'blue'}" [ngIf]="condition" ng-show="myValue" *ngIf="condition" ng-show="myValue">`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 74),
        end: new vscode.Position(0, 74),
      },
    },
    {
      lines: [
        {
          input: `<div [ngStyle]="{'color': condition ? 'red' : 'blue'}" [ngIf]="condition" ng-show="myValue" *ngIf="condition" ng-show="myValue">`,
          output: `<div [ngStyle]="{'color': condition ? 'red' : 'blue'}" [ngIf]="condition" ng-show="myValue" *ngIf="condition" ng-show="myValue">`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 76),
        end: new vscode.Position(0, 76),
      },
    },
    {
      lines: [
        {
          input: `<div [ngStyle]="{'color': condition ? 'red' : 'blue'}" [ngIf]="condition" ng-show="myValue" *ngIf="condition" ng-show="myValue">`,
          output: `<div [ngStyle]="{'color': condition ? 'red' : 'blue'}" [ngIf]="condition" ng-show="myValue" *ngIf="condition" ng-show="myValue">`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 77),
        end: new vscode.Position(0, 77),
      },
    },
    {
      lines: [
        {
          input: `<div [ngStyle]="{'color': condition ? 'red' : 'blue'}" [ngIf]="condition" ng-show="myValue" *ngIf="condition" ng-show="myValue">`,
          output: `<div [ngStyle]="{'color': condition ? 'red' : 'blue'}" [ngIf]="condition" ng-show="myValue" *ngIf="condition" ng-show="myValue">`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 80),
        end: new vscode.Position(0, 80),
      },
    },
    {
      lines: [
        {
          input: `<div [ngStyle]="{'color': condition ? 'red' : 'blue'}" [ngIf]="condition" ng-show="myValue" *ngIf="condition" ng-show="myValue">`,
          output: `<div [ngStyle]="{'color': condition ? 'red' : 'blue'}" [ngIf]="condition" ng-show="!myValue" *ngIf="condition" ng-show="myValue">`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 83),
        end: new vscode.Position(0, 83),
      },
    },
    {
      lines: [
        {
          input: `<div [ngStyle]="{'color': condition ? 'red' : 'blue'}" [ngIf]="condition" ng-show="myValue" *ngIf="condition" ng-show="myValue">`,
          output: `<div [ngStyle]="{'color': condition ? 'red' : 'blue'}" [ngIf]="condition" ng-show="!myValue" *ngIf="condition" ng-show="myValue">`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 90),
        end: new vscode.Position(0, 90),
      },
    },
    {
      lines: [
        {
          input: `<div [ngStyle]="{'color': condition ? 'red' : 'blue'}" [ngIf]="condition" ng-show="myValue" *ngIf="condition" ng-show="myValue">`,
          output: `<div [ngStyle]="{'color': condition ? 'red' : 'blue'}" [ngIf]="condition" ng-show="myValue" *ngIf="condition" ng-show="myValue">`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 91),
        end: new vscode.Position(0, 91),
      },
    },
    {
      lines: [
        {
          input: `<div [ngStyle]="{'color': condition ? 'red' : 'blue'}" [ngIf]="condition" ng-show="myValue" *ngIf="condition" ng-show="myValue">`,
          output: `<div [ngStyle]="{'color': condition ? 'red' : 'blue'}" [ngIf]="condition" ng-show="myValue" *ngIf="condition" ng-show="myValue">`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 92),
        end: new vscode.Position(0, 92),
      },
    },
    {
      lines: [
        {
          input: `<div [ngStyle]="{'color': condition ? 'red' : 'blue'}" [ngIf]="condition" ng-show="myValue" *ngIf="condition" ng-show="myValue">`,
          output: `<div [ngStyle]="{'color': condition ? 'red' : 'blue'}" [ngIf]="condition" ng-show="myValue" *ngIf="condition" ng-show="myValue">`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 93),
        end: new vscode.Position(0, 93),
      },
    },
    {
      lines: [
        {
          input: `<div [ngStyle]="{'color': condition ? 'red' : 'blue'}" [ngIf]="condition" ng-show="myValue" *ngIf="condition" ng-show="myValue">`,
          output: `<div [ngStyle]="{'color': condition ? 'red' : 'blue'}" [ngIf]="condition" ng-show="myValue" *ngIf="condition" ng-show="myValue">`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 96),
        end: new vscode.Position(0, 96),
      },
    },
    {
      lines: [
        {
          input: `<div [ngStyle]="{'color': condition ? 'red' : 'blue'}" [ngIf]="condition" ng-show="myValue" *ngIf="condition" ng-show="myValue">`,
          output: `<div [ngStyle]="{'color': condition ? 'red' : 'blue'}" [ngIf]="condition" ng-show="myValue" *ngIf="!condition" ng-show="myValue">`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 99),
        end: new vscode.Position(0, 99),
      },
    },
    {
      lines: [
        {
          input: `<div [ngStyle]="{'color': condition ? 'red' : 'blue'}" [ngIf]="condition" ng-show="myValue" *ngIf="condition" ng-show="myValue">`,
          output: `<div [ngStyle]="{'color': condition ? 'red' : 'blue'}" [ngIf]="condition" ng-show="myValue" *ngIf="!condition" ng-show="myValue">`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 108),
        end: new vscode.Position(0, 108),
      },
    },
    {
      lines: [
        {
          input: `<div [ngStyle]="{'color': condition ? 'red' : 'blue'}" [ngIf]="condition" ng-show="myValue" *ngIf="condition" ng-show="myValue">`,
          output: `<div [ngStyle]="{'color': condition ? 'red' : 'blue'}" [ngIf]="condition" ng-show="myValue" *ngIf="condition" ng-show="myValue">`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 109),
        end: new vscode.Position(0, 109),
      },
    },
    {
      lines: [
        {
          input: `<div [ngStyle]="{'color': condition ? 'red' : 'blue'}" [ngIf]="condition" ng-show="myValue" *ngIf="condition" ng-show="myValue">`,
          output: `<div [ngStyle]="{'color': condition ? 'red' : 'blue'}" [ngIf]="condition" ng-show="myValue" *ngIf="condition" ng-show="myValue">`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 110),
        end: new vscode.Position(0, 110),
      },
    },
    {
      lines: [
        {
          input: `<div [ngStyle]="{'color': condition ? 'red' : 'blue'}" [ngIf]="condition" ng-show="myValue" *ngIf="condition" ng-show="myValue">`,
          output: `<div [ngStyle]="{'color': condition ? 'red' : 'blue'}" [ngIf]="condition" ng-show="myValue" *ngIf="condition" ng-show="myValue">`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 112),
        end: new vscode.Position(0, 112),
      },
    },
    {
      lines: [
        {
          input: `<div [ngStyle]="{'color': condition ? 'red' : 'blue'}" [ngIf]="condition" ng-show="myValue" *ngIf="condition" ng-show="myValue">`,
          output: `<div [ngStyle]="{'color': condition ? 'red' : 'blue'}" [ngIf]="condition" ng-show="myValue" *ngIf="condition" ng-show="myValue">`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 113),
        end: new vscode.Position(0, 113),
      },
    },
    {
      lines: [
        {
          input: `<div [ngStyle]="{'color': condition ? 'red' : 'blue'}" [ngIf]="condition" ng-show="myValue" *ngIf="condition" ng-show="myValue">`,
          output: `<div [ngStyle]="{'color': condition ? 'red' : 'blue'}" [ngIf]="condition" ng-show="myValue" *ngIf="condition" ng-show="myValue">`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 116),
        end: new vscode.Position(0, 116),
      },
    },
    {
      lines: [
        {
          input: `<div [ngStyle]="{'color': condition ? 'red' : 'blue'}" [ngIf]="condition" ng-show="myValue" *ngIf="condition" ng-show="myValue">`,
          output: `<div [ngStyle]="{'color': condition ? 'red' : 'blue'}" [ngIf]="condition" ng-show="myValue" *ngIf="condition" ng-show="!myValue">`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 119),
        end: new vscode.Position(0, 119),
      },
    },
    {
      lines: [
        {
          input: `<div [ngStyle]="{'color': condition ? 'red' : 'blue'}" [ngIf]="condition" ng-show="myValue" *ngIf="condition" ng-show="myValue">`,
          output: `<div [ngStyle]="{'color': condition ? 'red' : 'blue'}" [ngIf]="condition" ng-show="myValue" *ngIf="condition" ng-show="!myValue">`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 126),
        end: new vscode.Position(0, 126),
      },
    },
    {
      lines: [
        {
          input: `<div [ngStyle]="{'color': condition ? 'red' : 'blue'}" [ngIf]="condition" ng-show="myValue" *ngIf="condition" ng-show="myValue">`,
          output: `<div [ngStyle]="{'color': condition ? 'red' : 'blue'}" [ngIf]="condition" ng-show="myValue" *ngIf="condition" ng-show="myValue">`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 127),
        end: new vscode.Position(0, 127),
      },
    },
  ]);
});
