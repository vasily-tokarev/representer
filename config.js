module.exports = (function () { // eslint-disable-line func-names
  switch (process.env.NODE_ENV) {
    case 'production':
      return {
        env: 'prod',
        mountPoint: 'representer',
        output: 'build/representer',
        input: 'tmp/input',
      };
    case 'test':
      return {
        env: 'test',
        mountPoint: 'representer',
        output: 'build/representer',
        input: 'tmp/input',
      };
    default:
      return {
        mountPoint: '/',
        output: 'tmp/output',
        input: 'tmp/input',
        clean: true,
      };
  }
}());
