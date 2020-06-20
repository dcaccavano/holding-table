import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { debounce } from '@ember/runloop';

export default class TextFilterComponent extends Component {

  @tracked filterValue = this.args.filter.filterValue;

  @action
  updateFilterValue(e) {
    debounce(this, this.updateFilterDebounced, e, 600);
  };

  @action
  updateFilterDebounced(e) {
    return this.args.updateFilter({
      filterType: "text",
      filterName: this.args.filter.filterName,
      filterValue: e.target.value,
      isNumber: false,
    });
  };
};
