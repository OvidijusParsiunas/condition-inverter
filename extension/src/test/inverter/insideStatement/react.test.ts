import { Inverter } from 'shared/inverter/src/inverter';
import * as assert from 'assert';

// the reason why these tests are done in the extension directory instead of inverter is because they are used to achieve 100% test coverage
suite('React Invertion Suite', () => {
  [
    {
      input: 'className={`banner ${active ? "active" : ""}`}',
      output: 'className={`banner ${!active ? "active" : ""}`}',
    },
    {
      input: 'className = {`banner ${active ? "active" : ""}`}',
      output: 'className = {`banner ${!active ? "active" : ""}`}',
    },
    {
      input: 'className={active ? "active" : ""}',
      output: 'className={!active ? "active" : ""}',
    },
    {
      input: 'className={active ? "active" : dog}><className={active ? "active" : dog}>',
      output: 'className={!active ? "active" : dog}><className={!active ? "active" : dog}>',
    },
    {
      input: `<div className={"btn-group pull-right " + this.props.showBulkActions ? 'show' : 'hidden'}>{children}</div>`,
      output: `<div className={!("btn-group pull-right " + this.props.showBulkActions) ? 'show' : 'hidden'}>{children}</div>`,
    },
    {
      input: 'className = { active ? "active" : ""}',
      output: 'className = { !active ? "active" : ""}',
    },
    {
      input: 'className = { active ? "active" : ""}>',
      output: 'className = { !active ? "active" : ""}>',
    },
    {
      input: 'className = { active ? "active" : ""} >',
      output: 'className = { !active ? "active" : ""} >',
    },
    {
      input: '={`banner ${active ? "active" : ""}`}',
      output: '={`banner ${!active ? "active" : ""}`}',
    },
    {
      input: '{`banner ${active ? "active" : ""}`}',
      output: '{`banner ${!active ? "active" : ""}`}',
    },
    {
      input: '`banner ${active ? "active" : ""}`}',
      output: '`banner ${!active ? "active" : ""}`}',
    },
    {
      input: '{`banner ${active ? "active" : ""}`',
      output: '{`banner ${!active ? "active" : ""}`',
    },
    {
      input: '`banner ${active ? "active" : ""}`',
      output: '`banner ${!active ? "active" : ""}`',
    },
    {
      input: 'banner ${active ? "active" : ""}`',
      output: 'banner ${!active ? "active" : ""}`',
    },
    {
      input: '`banner ${active ? "active" : ""}',
      output: '`banner ${!active ? "active" : ""}',
    },
    {
      input: 'banner ${active ? "active" : ""}',
      output: 'banner ${!active ? "active" : ""}',
    },
    {
      input: '${active ? "active" : ""}',
      output: '${!active ? "active" : ""}',
    },
    {
      input: '{active ? "active" : ""}',
      output: '{!active ? "active" : ""}',
    },
    {
      input: 'active ? "active" : ""}',
      output: '!active ? "active" : ""}',
    },
    {
      input: '${active ? "active" : ""',
      output: '${!active ? "active" : ""',
    },
    {
      input: '{active ? "active" : ""',
      output: '{!active ? "active" : ""',
    },
  ].forEach((testProps) => {
    test(testProps.input, () => {
      const result = Inverter.invert(testProps.input);
      assert.strictEqual(result, testProps.output);
    });
  });
});
