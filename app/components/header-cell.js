import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class HeaderCellComponent extends Component {
  get isSortingBy () {
    return this.args.sorter.name === this.args.headingName;
  };

  get isAscending () {
    return this.args.sorter.direction === "ascending";
  };

  @action
  sort() {
    this.args.sortBy(this.args.headingName);
  };
};
