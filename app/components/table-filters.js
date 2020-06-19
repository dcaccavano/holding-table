import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

// Using ramda for utility functions
import R from 'ramda';

export default class TableFiltersComponent extends Component {
  @tracked filterInputs = [];
  @tracked addedFilters = [];
  @tracked availableFilters = this.args.filterableColumns;


  @action
  onFilterSelected(e) {
    this.filterInputs = [...this.filterInputs, e.target.value];
    this.availableFilters = R.without([e.target.value])(this.availableFilters);
  }

  @action
  onFilterRemoved(filterName) {
    this.filterInputs = R.without([filterName])(this.filterInputs);
    const filterToRemove = R.find(R.propEq('filterName', filterName))(this.addedFilters);
    this.addedFilters = R.without([filterToRemove])(this.addedFilters);
    this.availableFilters = [...this.availableFilters, filterName];
    this.args.onFilterAdded(this.addedFilters);
  }

  @action
  addFilter(newFilter) {
    // find the existing filter if there is one.
    const existingFilter = R.find(R.propEq('filterName', newFilter['filterName']))(this.addedFilters);

    // if there is an existing filter, remove it, before adding this new filter
    if (existingFilter) {
      this.addedFilters = [...R.without([existingFilter])(this.addedFilters), newFilter];
    // otherwise, add this newFilter to the array of existing filters
    } else {
      this.addedFilters = [...this.addedFilters, newFilter];
    }
    this.args.onFilterAdded(this.addedFilters);
  }
};
