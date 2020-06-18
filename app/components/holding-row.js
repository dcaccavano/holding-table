import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
// Using ramda for utility functions
import R from 'ramda';

export default class HoldingRowComponent extends Component {
  // extracting just the values for each cell
  @tracked rowDataValues = R.values(this.args.rowData);
};
