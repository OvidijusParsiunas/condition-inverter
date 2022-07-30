const mocha = require('../../../../node_modules/mocha/lib/mocha.js');
import { TestUtil } from '../../shared/functionality/testUtil';
import { TextEditorObj } from '../../shared/types/tests';
import * as vscode from 'vscode';

suite('Selected Angular Statement Suite', () => {
  const textEditorObj: TextEditorObj = { textEditor: null };

  mocha.before(() => TestUtil.createTextDocument(textEditorObj));

  mocha.beforeEach(() => TestUtil.removeTextFromEditor(textEditorObj));

  mocha.after(() => TestUtil.executCloseEditorCommand());

  TestUtil.runInversionTests(textEditorObj, 'Multiple Line', [
    {
      lines: [
        {
          input: '<div\n',
          output: '<div',
        },
        {
          input: '[ngIf]="condition"\n',
          output: '[ngIf]="condition"',
        },
        {
          input: '>\n',
          output: '>',
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
          input: '<div\n',
          output: '<div',
        },
        {
          input: '[ngIf]="condition"\n',
          output: '[ngIf]="condition"',
        },
        {
          input: '>\n',
          output: '>',
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
          input: '<div\n',
          output: '<div',
        },
        {
          input: '[ngIf]="condition"\n',
          output: '[ngIf]="condition"',
        },
        {
          input: '>\n',
          output: '>',
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
          input: '<div\n',
          output: '<div',
        },
        {
          input: '[ngIf]="condition"\n',
          output: '[ngIf]="condition"',
        },
        {
          input: '>\n',
          output: '>',
        },
      ],
      selection: {
        start: new vscode.Position(1, 0),
        end: new vscode.Position(1, 0),
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
          output: '[ngIf]="condition"',
        },
        {
          input: '>\n',
          output: '>',
        },
      ],
      selection: {
        start: new vscode.Position(1, 18),
        end: new vscode.Position(1, 18),
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
          output: '[ngIf]="condition"',
        },
        {
          input: '>\n',
          output: '>',
        },
      ],
      selection: {
        start: new vscode.Position(2, 0),
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
          output: '[ngIf]="condition"',
        },
        {
          input: '>\n',
          output: '>',
        },
      ],
      selection: {
        start: new vscode.Position(2, 0),
        end: new vscode.Position(2, 0),
      },
    },
    {
      lines: [
        {
          input: '><div\n',
          output: '><div',
        },
        {
          input: '[ngIf]="condition"\n',
          output: '[ngIf]="condition"',
        },
        {
          input: '>\n',
          output: '>',
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
          input: '><div\n',
          output: '><div',
        },
        {
          input: '[ngIf]="condition"\n',
          output: '[ngIf]="condition"',
        },
        {
          input: '>\n',
          output: '>',
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
          input: '\n',
          output: '',
        },
        {
          input: '<div\n',
          output: '<div',
        },
        {
          input: '[ngIf]="condition"\n',
          output: '[ngIf]="condition"',
        },
        {
          input: '>\n',
          output: '>',
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
          input: '>\n',
          output: '>',
        },
        {
          input: '<div\n',
          output: '<div',
        },
        {
          input: '[ngIf]="condition"\n',
          output: '[ngIf]="condition"',
        },
        {
          input: '>\n',
          output: '>',
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
          input: '>\n',
          output: '>',
        },
        {
          input: '<div\n',
          output: '<div',
        },
        {
          input: '[ngIf]="condition"\n',
          output: '[ngIf]="condition"',
        },
        {
          input: '>\n',
          output: '>',
        },
      ],
      selection: {
        start: new vscode.Position(1, 0),
        end: new vscode.Position(1, 0),
      },
    },
    {
      lines: [
        {
          input: 'a\n',
          output: 'a',
        },
        {
          input: '<div\n',
          output: '<div',
        },
        {
          input: '[ngIf]="condition"\n',
          output: '[ngIf]="condition"',
        },
        {
          input: '>\n',
          output: '>',
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
          input: '<div\n',
          output: '<div',
        },
        {
          input: '[ngIf]="condition"\n',
          output: '[ngIf]="condition"',
        },
        {
          input: '><\n',
          output: '><',
        },
      ],
      selection: {
        start: new vscode.Position(2, 1),
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
          output: '[ngIf]="condition"',
        },
        {
          input: '><\n',
          output: '><',
        },
      ],
      selection: {
        start: new vscode.Position(2, 2),
        end: new vscode.Position(2, 2),
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
          output: '[ngIf]="condition"',
        },
        {
          input: '>\n',
          output: '>',
        },
        {
          input: '\n',
          output: '',
        },
      ],
      selection: {
        start: new vscode.Position(3, 0),
        end: new vscode.Position(3, 0),
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
          output: '[ngIf]="condition"',
        },
        {
          input: '>\n',
          output: '>',
        },
        {
          input: '<\n',
          output: '<',
        },
      ],
      selection: {
        start: new vscode.Position(3, 0),
        end: new vscode.Position(3, 0),
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
          output: '[ngIf]="condition"',
        },
        {
          input: '>\n',
          output: '>',
        },
        {
          input: '<\n',
          output: '<',
        },
      ],
      selection: {
        start: new vscode.Position(3, 1),
        end: new vscode.Position(3, 1),
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
          output: '[ngIf]="condition"',
        },
        {
          input: '>\n',
          output: '>',
        },
        {
          input: 'a\n',
          output: 'a',
        },
      ],
      selection: {
        start: new vscode.Position(3, 0),
        end: new vscode.Position(3, 0),
      },
    },
    {
      lines: [
        {
          input: '<div [ngIf]="condition">\n',
          output: '<div [ngIf]="condition">',
        },
        {
          input: '</div>\n',
          output: '</div>',
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
          input: '<div [ngIf]="condition">\n',
          output: '<div [ngIf]="condition">',
        },
        {
          input: '</div>\n',
          output: '</div>',
        },
      ],
      selection: {
        start: new vscode.Position(1, 0),
        end: new vscode.Position(1, 0),
      },
    },
    {
      lines: [
        {
          input: '<div [ngIf]="condition"> \n',
          output: '<div [ngIf]="condition"> ',
        },
        {
          input: ' </div>\n',
          output: ' </div>',
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
          input: '<div [ngIf]="condition"> \n',
          output: '<div [ngIf]="condition"> ',
        },
        {
          input: ' </div>\n',
          output: ' </div>',
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
          input: '<div [ngIf]="condition"> \n',
          output: '<div [ngIf]="condition"> ',
        },
        {
          input: ' </div>\n',
          output: ' </div>',
        },
      ],
      selection: {
        start: new vscode.Position(1, 0),
        end: new vscode.Position(1, 0),
      },
    },
    {
      lines: [
        {
          input: '<div [ngIf]="condition"> \n',
          output: '<div [ngIf]="condition"> ',
        },
        {
          input: ' </div>\n',
          output: ' </div>',
        },
      ],
      selection: {
        start: new vscode.Position(1, 1),
        end: new vscode.Position(1, 1),
      },
    },
    {
      lines: [
        {
          input: '<div [class.my_class]="condition" [ngIf]="\n',
          output: '<div [class.my_class]="condition" [ngIf]="',
        },
        {
          input: 'condition"\n',
          output: '!condition"',
        },
        {
          input: '>\n',
          output: '>',
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
          input: '<div [class.my_class]="condition" [ngIf]="\n',
          output: '<div [class.my_class]="condition" [ngIf]="',
        },
        {
          input: 'condition"\n',
          output: '!condition"',
        },
        {
          input: '>\n',
          output: '>',
        },
      ],
      selection: {
        start: new vscode.Position(1, 0),
        end: new vscode.Position(1, 0),
      },
    },
    {
      lines: [
        {
          input: '<div [class.my_class]="condition" [ngIf]="\n',
          output: '<div [class.my_class]="condition" [ngIf]="',
        },
        {
          input: 'condition"\n',
          output: 'condition"',
        },
        {
          input: '>\n',
          output: '>',
        },
      ],
      selection: {
        start: new vscode.Position(1, 10),
        end: new vscode.Position(1, 10),
      },
    },
  ]);
});
