import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class TableFilterComponent extends Component {
  @tracked showErrorMessage = false;
  @tracked errorMessage = '';

  get isTextFilter() {
    return this.args.filter.filterType === 'text';
  };
  get isSelectFilter() {
    return this.args.filter.filterType === 'select';
  };
  get isRangeFilter() {
    return this.args.filter.filterType === 'range';
  };

  @action
  showError(message) {
    this.showErrorMessage = true;
    this.errorMessage = message;
  };

  @action
  dismissError() {
    this.showErrorMessage = false;
    this.errorMessage = '';
  };
};
