import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class TableSortComponent extends Component {
  @tracked sorter = {name: "", direction: "descending"};

  @action
  sortBy(name) {
    this.sorter = {name: name, direction: this.sorter.direction === "descending" ? "ascending" : "descending" };
    this.args.sortTable(sorter);
  }
};
