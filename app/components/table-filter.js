import Component from '@glimmer/component';
// Using ramda for utility functions
import R from 'ramda';

const textFilters = [
  "CUSIP",
  "Description",
];

const selectFilters = [
  "Sector",
  "Quality",
];

export default class TableFilterComponent extends Component {
  get isTextFilter() {
    return R.contains(this.args.filter)(textFilters);
  };
  get isSelectFilter() {
    return R.contains(this.args.filter)(selectFilters);
  };
  get isRangeFilter() {
    return R.contains(this.args.filter)(rangeFilters);
  };
};
