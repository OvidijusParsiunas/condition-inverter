const mocha = require('../../../../node_modules/mocha/lib/mocha.js');
import { TestUtil } from '../../shared/functionality/testUtil';
import { TextEditorObj } from '../../shared/types/tests';
import * as vscode from 'vscode';

suite('Highlighted Angular Statement Suite', () => {
  const textEditorObj: TextEditorObj = { textEditor: null };

  mocha.before(() => TestUtil.createTextDocument(textEditorObj));

  mocha.beforeEach(() => TestUtil.removeTextFromEditor(textEditorObj));

  mocha.after(() => TestUtil.executCloseEditorCommand());

  TestUtil.runInversionTests(textEditorObj, 'Multiple Line', [
    {
      lines: [
        {
          input: `<div [class.active]="condition">{children}</div>\n`,
          output: `<div [class.active]="!condition">{children}</div>`,
        },
        {
          input: '<div ng-show="myValue">Content</div>\n',
          output: '<div ng-show="!myValue">Content</div>',
        },
        {
          input: '<div *ngIf="condition">Content</div>\n',
          output: '<div *ngIf="!condition">Content</div>',
        },
        {
          input: '<div [ngIf]="condition">Content</div>\n',
          output: '<div [ngIf]="!condition">Content</div>',
        },
      ],
      selection: {
        start: new vscode.Position(0, 0),
        end: new vscode.Position(3, 37),
      },
    },
    {
      lines: [
        {
          input: `<div [class.active]="condition">{children}</div>\n`,
          output: `<div [class.active]="!condition">{children}</div>`,
        },
        {
          input: '<div ng-show="myValue">Content</div>\n',
          output: '<div ng-show="!myValue">Content</div>',
        },
      ],
      selection: {
        start: new vscode.Position(0, 21),
        end: new vscode.Position(1, 21),
      },
    },
    {
      lines: [
        {
          input: '<div ng-show="myValue">Content</div>\n',
          output: '<div ng-show="!myValue">Content</div>',
        },
        {
          input: '<div *ngIf="condition">Content</div>\n',
          output: '<div *ngIf="!condition">Content</div>',
        },
      ],
      selection: {
        start: new vscode.Position(0, 14),
        end: new vscode.Position(1, 21),
      },
    },
    {
      lines: [
        {
          input: '<div *ngIf="condition">Content</div>\n',
          output: '<div *ngIf="!condition">Content</div>',
        },
        {
          input: '<div [ngIf]="condition">Content</div>\n',
          output: '<div [ngIf]="!condition">Content</div>',
        },
      ],
      selection: {
        start: new vscode.Position(0, 12),
        end: new vscode.Position(1, 22),
      },
    },
    {
      lines: [
        {
          input: `<div [class.active]="condition">{children}</div>\n`,
          output: `<div [class.active]="condition">{children}</div>`,
        },
        {
          input: '<div ng-show="myValue">Content</div>\n',
          output: '<div ng-show="!myValue">Content</div>',
        },
        {
          input: '<div *ngIf="condition">Content</div>\n',
          output: '<div *ngIf="condition">Content</div>',
        },
      ],
      selection: {
        start: new vscode.Position(1, 5),
        end: new vscode.Position(1, 22),
      },
    },
    {
      lines: [
        {
          input: '<div ng-show="myValue">Content</div>\n',
          output: '<div ng-show="myValue">Content</div>',
        },
        {
          input: '<div *ngIf="condition">Content</div>\n',
          output: '<div *ngIf="!condition">Content</div>',
        },
        {
          input: '<div [ngIf]="condition">Content</div>\n',
          output: '<div [ngIf]="condition">Content</div>',
        },
      ],
      selection: {
        start: new vscode.Position(1, 6),
        end: new vscode.Position(1, 23),
      },
    },
    {
      lines: [
        {
          input: '<div [ngIf]="condition">Content</div>\n',
          output: '<div [ngIf]="condition">Content</div>',
        },
        {
          input: `<div [class.active]="condition">{children}</div>\n`,
          output: `<div [class.active]="!condition">{children}</div>`,
        },
        {
          input: '<div ng-show="myValue">Content</div>\n',
          output: '<div ng-show="myValue">Content</div>',
        },
      ],
      selection: {
        start: new vscode.Position(1, 6),
        end: new vscode.Position(1, 30),
      },
    },
    {
      lines: [
        {
          input: '<div *ngIf="condition">Content</div>\n',
          output: '<div *ngIf="condition">Content</div>',
        },
        {
          input: '<div [ngIf]="condition">Content</div>\n',
          output: '<div [ngIf]="!condition">Content</div>',
        },
        {
          input: '<div ng-show="myValue">Content</div>\n',
          output: '<div ng-show="myValue">Content</div>',
        },
      ],
      selection: {
        start: new vscode.Position(1, 6),
        end: new vscode.Position(1, 23),
      },
    },
    {
      lines: [
        {
          input: '<div\n',
          output: '<div',
        },
        {
          input: '[ngIf]="condition"\n',
          output: '[ngIf]="!condition"',
        },
        {
          input: '>\n',
          output: '>',
        },
      ],
      selection: {
        start: new vscode.Position(0, 0),
        end: new vscode.Position(2, 1),
      },
    },
    {
      lines: [
        {
          input: '<div\n',
          output: '<div',
        },
        {
          input: '[ngIf]="condition"\n',
          output: '[ngIf]="!condition"',
        },
        {
          input: '>\n',
          output: '>',
        },
      ],
      selection: {
        start: new vscode.Position(0, 1),
        end: new vscode.Position(2, 0),
      },
    },
    {
      lines: [
        {
          input: '<div\n',
          output: '<div',
        },
        {
          input: '[ngIf]="condition"\n',
          output: '[ngIf]="!condition"',
        },
        {
          input: '>\n',
          output: '>',
        },
      ],
      selection: {
        start: new vscode.Position(1, 8),
        end: new vscode.Position(1, 17),
      },
    },
    {
      lines: [
        {
          input: '<div\n',
          output: '<div',
        },
        {
          input: '[ngIf]="condition"\n',
          output: '[ngIf]="!condition"',
        },
        {
          input: '>\n',
          output: '>',
        },
      ],
      selection: {
        start: new vscode.Position(1, 7),
        end: new vscode.Position(1, 17),
      },
    },
    {
      lines: [
        {
          input: '<div\n',
          output: '<div',
        },
        {
          input: '[ngIf]="condition"\n',
          output: '[ngIf]="!condition"',
        },
        {
          input: '>\n',
          output: '>',
        },
      ],
      selection: {
        start: new vscode.Position(1, 6),
        end: new vscode.Position(1, 17),
      },
    },
    {
      lines: [
        {
          input: '<div\n',
          output: '<div',
        },
        {
          input: '[ngIf]="condition"\n',
          output: '[ngIf]="!condition"',
        },
        {
          input: '>\n',
          output: '>',
        },
      ],
      selection: {
        start: new vscode.Position(1, 5),
        end: new vscode.Position(1, 17),
      },
    },
    {
      lines: [
        {
          input: '<div\n',
          output: '<div',
        },
        {
          input: '[ngIf]="condition"\n',
          output: '[ngIf]="!condition"',
        },
        {
          input: '>\n',
          output: '>',
        },
      ],
      selection: {
        start: new vscode.Position(1, 1),
        end: new vscode.Position(1, 17),
      },
    },
    {
      lines: [
        {
          input: '<div\n',
          output: '<div',
        },
        {
          input: '[ngIf]="condition"\n',
          output: '[ngIf]="!condition"',
        },
        {
          input: '>\n',
          output: '>',
        },
      ],
      selection: {
        start: new vscode.Position(1, 0),
        end: new vscode.Position(1, 18),
      },
    },
    {
      lines: [
        {
          input: '<div [ngIf]="condition">\n',
          output: '<div [ngIf]="!condition">',
        },
        {
          input: '<div [ngIf]="condition">\n',
          output: '<div [ngIf]="!condition">',
        },
        {
          input: '<div style="background-color: green; height: 20px">\n',
          output: '<div style="background-color: green; height: 20px">',
        },
        {
          input: 'ashasdsadasdas\n',
          output: 'ashasdsadasdas',
        },
        {
          input: '</div>\n',
          output: '</div>',
        },
        {
          input: '</div>\n',
          output: '</div>',
        },
        {
          input: '</div>\n',
          output: '</div>',
        },
      ],
      selection: {
        start: new vscode.Position(0, 0),
        end: new vscode.Position(6, 6),
      },
    },
    {
      lines: [
        {
          input: '<div [ngIf]="condition">\n',
          output: '<div [ngIf]="!condition">',
        },
        {
          input: '<div [ngIf]="condition">\n',
          output: '<div [ngIf]="condition">',
        },
        {
          input: '</div>\n',
          output: '</div>',
        },
        {
          input: '</div>\n',
          output: '</div>',
        },
      ],
      selection: {
        start: new vscode.Position(0, 13),
        end: new vscode.Position(1, 4),
      },
    },
    {
      lines: [
        {
          input: '<div [ngIf]="condition">\n',
          output: '<div [ngIf]="condition">',
        },
        {
          input: '<div [ngIf]="condition">\n',
          output: '<div [ngIf]="!condition">',
        },
        {
          input: '</div>\n',
          output: '</div>',
        },
        {
          input: '</div>\n',
          output: '</div>',
        },
      ],
      selection: {
        start: new vscode.Position(0, 24),
        end: new vscode.Position(1, 22),
      },
    },
    {
      lines: [
        {
          input: '<div [ngIf]="\n',
          output: '<div [ngIf]="',
        },
        {
          input: 'condition\n',
          output: '!condition',
        },
        {
          input: '">\n',
          output: '">',
        },
      ],
      selection: {
        start: new vscode.Position(1, 0),
        end: new vscode.Position(1, 9),
      },
    },
    {
      lines: [
        {
          input: '><div [ngIf]="\n',
          output: '><div [ngIf]="',
        },
        {
          input: 'condition\n',
          output: '!condition',
        },
        {
          input: '"><\n',
          output: '"><',
        },
      ],
      selection: {
        start: new vscode.Position(1, 0),
        end: new vscode.Position(1, 9),
      },
    },
    {
      lines: [
        {
          input: '<div [ngIf]=\n',
          output: '<div [ngIf]=',
        },
        {
          input: '"condition"\n',
          output: '"!condition"',
        },
        {
          input: '>\n',
          output: '>',
        },
      ],
      selection: {
        start: new vscode.Position(1, 0),
        end: new vscode.Position(1, 11),
      },
    },
    {
      lines: [
        {
          input: '<div [class.my_class]="condition" [ngIf]=\n',
          output: '<div [class.my_class]="condition" [ngIf]=',
        },
        {
          input: '"condition"\n',
          output: '"!condition"',
        },
        {
          input: '>\n',
          output: '>',
        },
      ],
      selection: {
        start: new vscode.Position(1, 0),
        end: new vscode.Position(1, 11),
      },
    },
    {
      lines: [
        {
          input: '<div [class.my_class]="condition" [ngIf]=\n',
          output: '<div [class.my_class]="!condition" [ngIf]=',
        },
        {
          input: '"condition"\n',
          output: '"condition"',
        },
        {
          input: '>\n',
          output: '>',
        },
      ],
      selection: {
        start: new vscode.Position(0, 23),
        end: new vscode.Position(0, 32),
      },
    },
  ]);
});
