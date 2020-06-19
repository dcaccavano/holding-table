import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { debounce } from '@ember/runloop';

export default class RangeFilterComponent extends Component {
  // mins and maxes determined by R.sort(R.ascend(R.prop("PROPERTY")))(this.args.data)
  // and finding the beginning and the end
  @tracked min1 = -10;
  @tracked max1 = 150000;
  @tracked min2 = -10;
  @tracked max2 = 150000;
  @tracked filterValue1;
  @tracked filterValue2;

  @action
  // when setting the minimum, make sure the maximum is adjusted so it does not go below
  addMinimumRange(e) {
    this.min2 = e.target.value;
    this.filterValue1 = parseFloat(e.target.value);
    debounce(this, this.filterResultsDebounced, [this.filterValue1, this.filterValue2], 600);
  };

  @action
  // when setting the maximum, make sure the mimimum is adjusted so it does not go above
  addMaximumRange(e) {
    this.max1 = e.target.value;
    this.filterValue2 = parseFloat(e.target.value);
    debounce(this, this.filterResultsDebounced, [this.filterValue1, this.filterValue2], 600);
  };

  @action
  removeFilter() {
    this.filterValue1 = '';
    this.filterValue2 = '';
    this.args.onFilterRemoved(this.args.filterName);
  }

  @action
  filterResultsDebounced(values) {
    return this.args.addFilter({
      filterType: "range",
      filterName: this.args.filterName,
      filterValue: values
    });
  };
};
