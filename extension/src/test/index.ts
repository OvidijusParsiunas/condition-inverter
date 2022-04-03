import * as path from 'path';
import * as Mocha from 'mocha';
import * as glob from 'glob';

interface NYCWithBasicMethods {
  writeCoverageFile: () => void;
  report: () => Promise<void>;
}

// create an nyc instance, config here is the same as your package.json
async function setupCoverage(): Promise<NYCWithBasicMethods> {
  const NYC = require('nyc');
  const nyc = new NYC({
    cwd: path.join(__dirname, '..', '..', '..', '..'),
    exclude: ['extension/.vscode-test', 'extension/node_modules', '**/test/**'],
    include: ['extension', 'shared'],
    reporter: ['text', 'html'],
    instrument: true,
    hookRequire: true,
    hookRunInContext: true,
    hookRunInThisContext: true,
    branches: 85,
    lines: 95,
    statements: 95,
    functions: 100,
  });
  await nyc.reset();
  nyc.wrap();
  return nyc;
}

export async function run(): Promise<void> {
  const nyc = process.env.COVERAGE ? await setupCoverage() : null;

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
      await nyc.report();
    }
  }
}
