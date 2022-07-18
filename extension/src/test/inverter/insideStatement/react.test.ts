import { Inverter } from 'shared/inverter/src/inverter';
import * as assert from 'assert';

// the reason why these tests are done in the extension directory instead of inverter is because they are used to achieve 100% test coverage
suite('React Invertion Suite', () => {
  [
    {
      input: 'unreadMessages.length > 0 && <div></div>',
      output: 'unreadMessages.length <= 0 || !(<div></div>)',
    },
    {
      input: 'unreadMessages.length > 0 && <div></div',
      output: 'unreadMessages.length <= 0 || !(<div></div)',
    },
    {
      input: 'unreadMessages.length > 0 && <div></',
      output: 'unreadMessages.length <= 0 || !(<div></)',
    },
    {
      input: 'unreadMessages.length > 0 && <div><',
      output: 'unreadMessages.length <= 0 || !(<div><)',
    },
    {
      input: 'unreadMessages.length > 0 && <div>',
      output: 'unreadMessages.length <= 0 || !(<div>)',
    },
    {
      input: 'unreadMessages.length > 0 && <div',
      output: 'unreadMessages.length <= 0 || !(<div)',
    },
    {
      input: 'unreadMessages.length > 0 && <',
      output: 'unreadMessages.length <= 0 || !(<)',
    },
    {
      input: 'unreadMessages.length > 0 && !(<div></div>)',
      output: 'unreadMessages.length <= 0 || <div></div>',
    },
    {
      input: 'unreadMessages.length > 0 && !(<div></div)',
      output: 'unreadMessages.length <= 0 || <div></div',
    },
    {
      input: 'unreadMessages.length > 0 && !(<div></)',
      output: 'unreadMessages.length <= 0 || <div></',
    },
    {
      input: 'unreadMessages.length > 0 && !(<div><)',
      output: 'unreadMessages.length <= 0 || <div><',
    },
    {
      input: 'unreadMessages.length > 0 && !(<div>)',
      output: 'unreadMessages.length <= 0 || <div>',
    },
    {
      input: 'unreadMessages.length > 0 && !(<div)',
      output: 'unreadMessages.length <= 0 || <div',
    },
    {
      input: 'unreadMessages.length > 0 && !(<)',
      output: 'unreadMessages.length <= 0 || <',
    },
    // {
    //   input: '{unreadMessages.length > 0 && <div></div>}',
    //   output: '{unreadMessages.length <= 0 || <div></div>}',
    // },
    // {
    //   input: '{unreadMessages.length > 0 && <div',
    //   output: '{unreadMessages.length <= 0 || <div',
    // },
    // {
    //   input: '{unreadMessages.length > 0 && <',
    //   output: '{unreadMessages.length <= 0 || <',
    // },
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
      input: 'className={active ? "active" : ""',
      output: 'className={!active ? "active" : ""',
    },
    {
      input: 'className={active ? "active" : "',
      output: 'className={!active ? "active" : "',
    },
    {
      input: 'className={active ? "active" :',
      output: 'className={!active ? "active" :',
    },
    {
      input: 'className={active ? "active"',
      output: 'className={!active ? "active"',
    },
    {
      input: 'className={active ? "active',
      output: 'className={!active ? "active',
    },
    {
      input: 'className={active ? "',
      output: 'className={!active ? "',
    },
    {
      input: 'className={active ?',
      output: 'className={!active ?',
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
    {
      input: `<div style={{ visibility: this.state.driverDetails.firstName != undefined? 'visible': 'hidden'}}></div>`,
      output: `<div style={{ visibility: this.state.driverDetails.firstName == undefined? 'visible': 'hidden'}}></div>`,
    },
  ].forEach((testProps) => {
    test(testProps.input, () => {
      const result = Inverter.invert(testProps.input);
      assert.strictEqual(result, testProps.output);
    });
  });
});
