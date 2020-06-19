import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

// Using ramda for utility functions
import R from 'ramda';

export default class TableSortComponent extends Component {
  @tracked name = 'CUSIP';
  @tracked direction = 'descending';

  @action
  setName(e) {
    this.name = e.target.value;
    this.args.sortTable(
      { name: this.name, direction: this.direction }
    );
  };

  @action
  setDirection(e) {
    this.direction = e.target.value;
    this.args.sortTable(
      { name: this.name, direction: this.direction }
    );
  };
};
