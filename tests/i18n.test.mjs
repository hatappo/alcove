import assert from 'node:assert/strict';
import { test } from 'node:test';
import { i18n } from '../extension/i18n.js';

test('Language follows browser preferences unless explicitly chosen, with an English fallback', () => {
  assert.equal(i18n.resolve('auto', ['ja-JP', 'en']), 'ja');
  assert.equal(i18n.resolve('auto', ['en-US', 'ja']), 'en');
  assert.equal(i18n.resolve('auto', ['fr']), 'en');
  assert.equal(i18n.resolve('en', ['ja-JP']), 'en');
  assert.equal(i18n.resolve('ja', ['en-US']), 'ja');
  assert.equal(i18n.t('Alcove settings'), 'Alcove settings');
  assert.equal(i18n.t('Alcove settings', 'ja'), 'Alcove 設定');
  assert.equal(i18n.t('Unknown message', 'ja'), 'Unknown message');
});

test('The URL template stays literal in localized instructions', () => {
  const key = 'URLs can include {nonce}, which is replaced with a new random value whenever you open or reload a page.';
  assert.match(i18n.t(key, 'ja'), /URL内に \{nonce\} を含めると/);
  assert.equal(i18n.t(key, 'en'), key);
});
