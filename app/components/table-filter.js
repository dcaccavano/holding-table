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

const rangeFilters = [
  "Par Value",
  "Maturity",
  "Market Value",
  "Coupon",
  "Accrued",
  "Weight",
  "Yield",
  "Dur",
  "Cov",
  "OAS",
  "Sprd Dur",
  "PD",
  "Price",
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
