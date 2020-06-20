import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

// Using ramda for utility functions
import R from 'ramda';

export default class HeaderCellComponent extends Component {
  // extracting just the values for each cell

  get isSortingBy () {
    return this.args.sorter.name === this.args.headingName;
  }

  get isAscending () {
    return this.args.sorter.direction === "ascending";
  }
  @action
  sort() {
    this.args.sortBy(this.args.headingName);
  }
};
