import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

// Using ramda for utility functions
import R from 'ramda';

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

  @tracked allFilters = R.map(fc => {
    return {
      filterName: fc,
      filterValue: filterTypeMap[fc] === "range" ? [] : "",
      filterType: filterTypeMap[fc],
      isNumber: filterTypeMap[fc] === "range",
    }
  })(this.args.filterableColumns);

  @action
  showOptions() {
    this.optionsVisible = true;
  }

  @action
  hideOptions() {
    this.optionsVisible = false;
  }

  @action
  onFilterRemoved(filterName) {
    const filterToRemove = R.find(R.propEq('filterName', filterName))(this.allFilters);
    filterToRemove.filterValue = '';
    this.args.onFilterUpdated(this.allFilters);
  }

  @action
  updateFilter(newFilter) {
    const existingFilter = R.find(R.propEq('filterName', newFilter['filterName']))(this.allFilters);
    existingFilter.filterValue = newFilter.filterValue;
    this.args.onFilterUpdated(this.allFilters);
  }
};
