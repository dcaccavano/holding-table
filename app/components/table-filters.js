import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

// Using ramda for utility functions
import R from 'ramda';
import $ from 'jquery';

const filterTypeMap = {
  "CUSIP": "text",
  "Description": "text",
  "Sector": "select",
  "Quality": "select",
  "Par Value": "range",
  "Maturity": "range",
  "Market Value": "range",
  "Coupon": "range",
  "Accrued": "range",
  "Weight": "range",
  "Yield": "range",
  "Dur": "range",
  "Cov": "range",
  "OAS": "range",
  "Sprd Dur": "range",
  "PD": "range",
  "Price": "range",
};

export default class TableFiltersComponent extends Component {

  @tracked optionsVisible = false;
  // small pill buttons that show the name and value of each filter being used
  // at the top of the screen
  @tracked appliedFilters = [];

  // initalizes all the filters with empty results, will be updated on any
  // filter input
  @tracked allFilters = R.map(fc => {
    return {
      filterName: fc,
      filterValue: filterTypeMap[fc] === "range" ? [] : "",
      filterType: filterTypeMap[fc],
      isNumber: filterTypeMap[fc] === "range",
    };
  })(this.args.filterableColumns);

  @action
  showOptions() {
    this.optionsVisible = true;
  };

  @action
  hideOptions() {
    this.optionsVisible = false;
  };

  // called from the appliedFilterButton in the header, removes the applied filter and associated value
  @action
  removeFilter(filter) {
    let filterToRemove = R.find(R.propEq('filterName', filter.name))(this.allFilters);
    if (filterToRemove.filterType === 'range') {
      filterToRemove.filterValue = [];
      // hack :( to get the input to clear, I ran into my limits of understanding
      // how to clear this out any other way
      $("#inputFilter_" + filter.name.split(' ').join('_') + "_0").val('');
      $("#inputFilter_" + filter.name.split(' ').join('_') + "_1").val('');
    } else {
      filterToRemove.filterValue = '';
      // hack :( to get the input to clear, I ran into my limits of understanding
      // how to clear this out any other way
      $("#inputFilter_" + filter.name).val('');
    }

    this.removeAppliedFilter(filter.name);
    this.args.onFilterUpdated(this.allFilters);
  };

  @action removeAppliedFilter(filterName) {
    let existingAppliedFilter = R.find(R.propEq('name', filterName))(this.appliedFilters);
    this.appliedFilters = R.without([existingAppliedFilter])(this.appliedFilters);
    return this.appliedFilters;
  };

  @action
  updateAppliedFilters(newFilter) {
    let existingAppliedFilter = R.find(R.propEq('name', newFilter['filterName']))(this.appliedFilters);
    this.appliedFilters = [...R.without([existingAppliedFilter])(this.appliedFilters), { name: newFilter.filterName, value: newFilter.filterValue }]
    return this.appliedFilters;
  };

  // called when a filter input is filled in
  @action
  updateFilter(newFilter) {
    let existingFilter = R.find(R.propEq('filterName', newFilter['filterName']))(this.allFilters);
    existingFilter.filterValue = newFilter.filterValue;

    if (R.isEmpty(newFilter.filterValue)) {
      this.removeAppliedFilter(newFilter.filterName);
    } else {
      this.updateAppliedFilters(newFilter);
    }

    // call back up to the holding-table parent to re-filter the table
    this.args.onFilterUpdated(this.allFilters);
  }
};
