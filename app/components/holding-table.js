import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

// Using ramda for utility functions
import R from 'ramda';

export default class HoldingTableComponent extends Component {
  // removing last row from data, it is just an empty row that has the source
  // as one of the columns
  @tracked filteredHoldings = R.init(this.args.data);
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
};
