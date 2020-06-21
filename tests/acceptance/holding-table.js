import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | holding table', function(hooks) {
  setupApplicationTest(hooks);

  test('visiting /holding-table', async function(assert) {
    await visit('/holding-table');

    // the page renders
    assert.equal(currentURL(), '/holding-table');
    // all results show correctly on initial page load
    assert.equal(document.querySelector('.appliedFiltersHeader').textContent, '700 Results Found');
  });

  test('should correctly sort holdings on intital page load', async function(assert) {
    await visit('/holding-table');

    // the correct initial sort should be ascending alphabetical by description
    assert.equal(document.querySelector('.container table tbody tr:first-child td:first-child').textContent, '002824BA');
  });
});
