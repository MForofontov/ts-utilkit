/**
 * Global Jest setup for Allure labels
 * Adds package labels based on test file path
 */

declare const reporter: any;

// Add package label based on test file path
beforeEach(() => {
  const testPath = expect.getState().testPath;
  const currentTest = expect.getState().currentTestName;
  
  if (testPath && typeof reporter !== 'undefined') {
    // Extract package name from path
    const packageMatch = testPath.match(/packages\/([^/]+)\//);
    
    if (packageMatch) {
      const packageName = packageMatch[1];
      
      // Extract test file name for feature
      const fileMatch = testPath.match(/\/([^/]+)\.test\.ts$/);
      const featureName = fileMatch ? fileMatch[1] : 'tests';
      
      // Create hierarchy: Epic (package) -> Feature (test file) -> Story (test name)
      reporter.epic(packageName);
      reporter.feature(featureName);
      if (currentTest) {
        reporter.story(currentTest);
      }
    }
  }
});
