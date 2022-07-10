import { TestUtil } from '../shared/functionality/testUtil';
import { deactivate } from '../../extension';

suite('Editor Functionality Suite', () => {
  test('When the extension is deactivated, nothing should happen', () => {
    deactivate();
  });

  test('When no editor is provided, no exception should be thrown', (done) => {
    TestUtil.runInversionCommandWithNoEditor(done);
  });
});
