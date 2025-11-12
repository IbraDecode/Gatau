import assert from 'assert'; import { AnalyzerProvider } from '../../app/Providers/AnalyzerProvider.js'; const a = new AnalyzerProvider(); assert.strictEqual(a.detectForbidden('halo'), null);
