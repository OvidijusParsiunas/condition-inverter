import * as path from 'path';
import * as Mocha from 'mocha';
import * as glob from 'glob';

interface NYCWithBasicMethods {
  writeCoverageFile: () => void;
  report: () => void;
}

// create an nyc instance, config here is the same as your package.json
function setupCoverage(): NYCWithBasicMethods {
  const NYC = require('nyc');
  const nyc = new NYC({
    cwd: path.join(__dirname, '..', '..', '..'),
    exclude: ['**/test/**', '.vscode-test/**'],
    reporter: ['text', 'html'],
    all: true,
    instrument: true,
    hookRequire: true,
    hookRunInContext: true,
    hookRunInThisContext: true,
    branches: 85,
    lines: 95,
    statements: 95,
    functions: 100,
  });
  nyc.reset();
  nyc.wrap();
  return nyc;
}

export async function run(): Promise<void> {
  const nyc = process.env.COVERAGE ? setupCoverage() : null;

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
  } finally {
    if (nyc) {
      nyc.writeCoverageFile();
      nyc.report();
    }
  }
}
