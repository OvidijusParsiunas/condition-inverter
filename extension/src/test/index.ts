import { NYC } from './util/nyc';
import * as Mocha from 'mocha';
import * as path from 'path';
import * as glob from 'glob';

export async function run(): Promise<void> {
  const nyc = process.env.COVERAGE ? await NYC.setupCoverage() : null;

  // Create the mocha test
  const mocha = new Mocha({
    ui: 'tdd',
    color: true,
  });

  const testsRoot = path.resolve(__dirname, '..');
  const files = glob.sync('**/**.test.js', { cwd: testsRoot });
  // Add files to the test suite
  files.forEach((f) => mocha.addFile(path.resolve(testsRoot, f)));

  try {
    await new Promise<void>((resolve, reject) => {
      // Run the mocha test
      mocha.run((failures) => {
        if (failures > 0) {
          reject(new Error(`${failures} tests failed.`));
        } else {
          resolve();
        }
      });
    });
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    if (nyc) await NYC.generateAndAnalyzeCoverage(nyc);
  }
}
