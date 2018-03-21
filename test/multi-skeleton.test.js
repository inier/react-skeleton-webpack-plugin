/**
 * @file test multi-skeleton
 * @author panyuqi (pyqiverson@gmail.com)
 */

/* eslint-disable fecs-use-standard-promise */

import 'babel-polyfill';
import * as path from 'path';
import Promise from 'bluebird';
import test from 'ava';
import {
    runWebpackCompilerMemoryFs,
    testFs
} from './utils.js';

import multipageConfig from '../examples/multi-skeleton/webpack.config.js';

process.env.NODE_ENV = 'development';

const fs = testFs;

const multipageExamplePath = path.resolve(__dirname, '../examples/multi-skeleton');
const webpackBuildPath = path.resolve(multipageExamplePath, './dist');

const readFile = Promise.promisify(fs.readFile, {context: fs});

let webpackBuildStats = null;

test.before('run webpack build first', async t => {
    webpackBuildStats = await runWebpackCompilerMemoryFs(multipageConfig);
});

test('it should run successfully', async t => {
    let {stats, errors} = webpackBuildStats;
    t.falsy(stats.hasWarnings() && errors.hasWarnings());
});

test('it should insert multi skeletons into index.html', async t => {
    let result = (await readFile(path.join(webpackBuildPath, 'index.html'))).toString();

    let skeleton1DOM = '<div id=skeleton1';
    t.true(result.includes(skeleton1DOM));

    let skeleton2DOM = '<div id=skeleton2';
    t.true(result.includes(skeleton2DOM));
});
