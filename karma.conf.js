// Karma configuration file, see link for more information
// https://karma-runner.github.io/0.13/config/configuration-file.html

module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine', '@angular/cli'],
        plugins: [
            require('karma-chrome-launcher'),
            require('karma-jasmine'),
            require('karma-jasmine-html-reporter'),
            require('karma-remap-istanbul'),
            require('karma-spec-reporter'),
            require('@angular/cli/plugins/karma')
        ],
        client: {
            clearContext: false // leave Jasmine Spec Runner output visible in browser
        },
        files: [
            { pattern: './src/test.ts', watched: false }
        ],
        preprocessors: {
            './src/test.ts': ['@angular/cli']
        },
        mime: {
            'text/x-typescript': ['ts', 'tsx']
        },
        remapIstanbulReporter: {
            remapOptions: {
                exclude: function (path) {
                    const EXCLUDED_FILES = [
                        '/src/app/shared/tests/mocks/mock-local-tunnel.service.ts',
                        '/src/app/shared/tests/mocks/mock-socket-manager.service.ts',
                        '/src/app/shared/tests/mocks/mock-speech-to-text.service.ts'
                    ];
                    return EXCLUDED_FILES.indexOf(path.substring(__dirname.length)) >= 0;
                }
            },
            reports: {
                html: 'coverage',
                lcovonly: './coverage/coverage.lcov'
            }
        },
        angularCli: {
            environment: 'dev'
        },
        reporters: config.angularCli && config.angularCli.codeCoverage
            ? ['spec', 'progress', 'karma-remap-istanbul']
            : ['spec', 'progress'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['Chrome'],
        singleRun: false
    });
};
