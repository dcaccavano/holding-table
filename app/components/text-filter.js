import Component from '@glimmer/component';
import { action } from '@ember/object';
import { debounce } from '@ember/runloop';

export default class TextFilterComponent extends Component {

  @action
  filterResults(e) {
    debounce(this, this.filterResultsDebounced, e, 600);
  };

  @action
  filterResultsDebounced(e) {
    return this.args.addFilter({
      filterType: "text",
      filterName: this.args.filterName,
      filterValue: e.target.value
    });
  };
};
