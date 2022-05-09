import * as path from 'path';

interface Totals {
  total: number;
  covered: number;
  skipped: number;
  pct: number;
}

interface CoverageSummary {
  lines: Totals;
  statements: Totals;
  branches: Totals;
  functions: Totals;
}

interface CoverageMap {
  getCoverageSummary(): CoverageSummary;
}

interface NYCWithBasicMethods {
  writeCoverageFile: () => void;
  report: () => Promise<void>;
  getCoverageMapFromAllCoverageFiles: () => Promise<CoverageMap>;
}

export class NYC {
  private static readonly thresholds: { [key in keyof CoverageSummary]: number } = {
    branches: 100,
    lines: 100,
    statements: 100,
    functions: 100,
  };

  // create an nyc instance, config here is the same as your package.json
  public static async setupCoverage(): Promise<NYCWithBasicMethods> {
    const NYC = require('nyc');
    const nyc = new NYC({
      cwd: path.join(__dirname, '..', '..', '..', '..'),
      exclude: ['extension/.vscode-test', 'extension/node_modules', '**/test/**'],
      include: ['extension', 'shared'],
      reporter: ['text', 'lcov'],
      instrument: true,
      hookRequire: true,
      hookRunInContext: true,
      hookRunInThisContext: true,
      ...NYC.thresholds,
    });
    await nyc.reset();
    nyc.wrap();
    return nyc;
  }

  private static validateCoverage(summary: CoverageSummary): void {
    let isThresholdMet = true;
    const keysOfThresholds = Object.keys(NYC.thresholds) as Array<keyof CoverageSummary>;
    keysOfThresholds.forEach((key) => {
      const coverage = (summary[key] as Totals).pct;
      if (coverage < NYC.thresholds[key]) {
        console.error(`ERROR: Coverage for ${key} (${coverage}%) does not meet global threshold (${NYC.thresholds[key]}%)`);
        if (isThresholdMet) isThresholdMet = false;
      }
    });
    if (!isThresholdMet) throw new Error('Coverage threshold has not been met');
  }

  public static async generateAndAnalyzeCoverage(nyc: NYCWithBasicMethods): Promise<void> {
    nyc.writeCoverageFile();
    await nyc.report();
    const result = await nyc.getCoverageMapFromAllCoverageFiles();
    const summary = result.getCoverageSummary();
    NYC.validateCoverage(summary);
  }
}
