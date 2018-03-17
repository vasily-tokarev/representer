module.exports = (function () { // eslint-disable-line func-names
  switch (process.env.NODE_ENV) {
    case 'production':
      return {
        env: 'prod',
        mountPoint: process.env.MOOUNT_POINT || 'representer',
        output: process.env.OUTPUT_PATH || 'build/representer',
        input: process.env.INPUT_PATH || 'example/input',
      };
    case 'test':
      return {
        env: 'test',
        mountPoint: 'representer',
        output: 'build/representer',
        input: 'example/input',
      };
    default:
      return {
        env: 'dev',
        mountPoint: '/',
        output: 'example/output',
        input: 'example/input',
        clean: true,
      };
  }
}());
