import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class HoldingHeaderComponent extends Component {
  @tracked sorter = {name: "Description", direction: "ascending"};

  @action
  sortBy(name) {
    this.sorter = {name: name, direction: this.sorter.direction === "descending" ? "ascending" : "descending" };
    this.args.sortTable(this.sorter);
  }
};
