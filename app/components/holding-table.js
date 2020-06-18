import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
// Using ramda for utility functions
import R from 'ramda';

export default class HoldingTableComponent extends Component {
  // removing last row from data, it is just an empty row that has the source
  // as one of the columns
  @tracked filteredHoldings = R.init(this.args.data);
};
