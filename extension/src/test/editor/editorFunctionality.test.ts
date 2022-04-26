import { deactivate } from '../../extension';
import { TestUtil } from '../util/testUtil';

suite('Editor Functionality Suite', () => {
  test('When the extension is deactivated, nothing should start happening', () => {
    deactivate();
  });

  test('When no editor is provided, no exception should be thrown', (done) => {
    TestUtil.runInversionCommandWithNoEditor(done);
  });
});
