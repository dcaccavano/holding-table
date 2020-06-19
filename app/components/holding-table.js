import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

// Using ramda for utility functions
import R from 'ramda';

export default class HoldingTableComponent extends Component {
  // removing last row from data, it is just an empty row that has the source
  // as one of the columns
  @tracked filteredHoldings = R.init(this.args.data);
  @tracked filters = [];
  // remove currnency from filters since they are all 'USD'
  @tracked filterableColumns = R.without(
    ["Currency"]
  )(this.args.data.columns);

  // sorts the table by selected column
  @action
  sortTable(sortable) {
    this.filteredHoldings = R.sort(
      sortable.direction === 'descending'
      ? R.descend(R.prop(sortable.name))
      : R.ascend(R.prop(sortable.name))
    )(this.filteredHoldings);
  }

  // adds the filters to the existing filters (if any) and filters down the results
  // this is called on change (with debounce) on any filter input
  @action
  addFilter(newFilter) {
    // find the existing filter if there is one.
    const existingFilter = R.find(R.propEq('filterName', newFilter['filterName']))(this.filters)

    // if there is an existing filter, remove it, before adding this new filter
    if (existingFilter) {
      this.filters = [...R.without([existingFilter])(this.filters), newFilter];
    // otherwise, add this newFilter to the array of existing filters
    } else {
      this.filters = [...this.filters, newFilter];
    }

    let _tempResults = R.init(this.args.data);

    this.filters.forEach((filter, i) => {
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
        default:
          _tempResults = this.args.data;
      }
    });
    // return all the filtered results combined
    return this.filteredHoldings = _tempResults;
  };
};
