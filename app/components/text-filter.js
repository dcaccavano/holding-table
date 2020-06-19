import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { debounce } from '@ember/runloop';

export default class TextFilterComponent extends Component {
  @tracked filterValue = '';

  @action
  filterResults(e) {
    this.filterValue = e.target.value;
    debounce(this, this.filterResultsDebounced, e, 600);
  };

  @action
  removeFilter() {
    this.filterValue = '';
    this.args.onFilterRemoved(this.args.filterName);
  }

  @action
  filterResultsDebounced(e) {
    return this.args.addFilter({
      filterType: "text",
      filterName: this.args.filterName,
      filterValue: e.target.value
    });
  };
};
