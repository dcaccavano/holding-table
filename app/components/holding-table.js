import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

// Using ramda for utility functions
import R from 'ramda';

const numberValues = [
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

const isNumber = value => R.contains(value)(numberValues);

// takes the direction, column, and whether it is a number and sorts accordingly
const tableSorter = ({ direction, name, isNumber }) => R.sort(
  (direction === 'descending' ? R.descend : R.ascend)(R.compose(
    isNumber ? Number.parseFloat : R.toLower,
    R.prop(name)
  ))
)

export default class HoldingTableComponent extends Component {
  // removing last row from data, it is just an empty row that has the source
  // as one of the columns
  @tracked filteredHoldings = R.init(this.args.data);
  // remove currency from filters since they are all 'USD'
  @tracked filterableColumns = R.without(
    ["Currency"]
  )(this.args.data.columns);

  // sorts the table by selected column
  @action
  sortTable({ direction, name }) {
    return this.filteredHoldings = tableSorter({ direction, name, isNumber: isNumber(name)})(this.filteredHoldings)
  }

  // when the filters object changes, this is called and the table is re-filtererd
  @action
  onFilterAdded(filters) {

    let _tempResults = R.init(this.args.data);

    filters.forEach((filter, i) => {
      switch (filter.filterType) {
        // for text based filters, see if the string contains the input value
        case 'text':
          _tempResults = R.filter(
            holding => holding[filter.filterName].toLowerCase().includes(filter.filterValue.toLowerCase())
          )(_tempResults)
          break;
        // for select based filters, make sure there is an exact match
        case 'select':
          _tempResults = R.filter(
            holding => holding[filter.filterName] === filter.filterValue
          )(_tempResults)
          break;
        // for ranged based filters, make sure the given result falls between the
        // supplied range
        case 'range':
          _tempResults = R.filter(
            holding =>
              parseFloat(holding[filter.filterName]) >= (filter.filterValue[0] ? filter.filterValue[0] : -10)
              && parseFloat(holding[filter.filterName]) <= (filter.filterValue[1] ? filter.filterValue[1] : 150000)
          )(_tempResults)
            break;
        default:
          _tempResults = this.args.data;
      }
    });
    // return all the filtered results combined
    return this.filteredHoldings = _tempResults;
  };
};
