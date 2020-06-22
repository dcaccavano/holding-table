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
  @tracked filterValue1 = this.args.filter.filterValue[0];
  @tracked filterValue2 = this.args.filter.filterValue[1];

  get idFriendlyName() {
    return this.args.filter.filterName.split(' ').join('_');
  };

  @action
  // when setting the minimum, make sure the maximum is adjusted so it does not go below
  addMinimumRange(e) {
    this.min2 = e.target.value;
    this.filterValue1 = parseFloat(e.target.value);
    if (this.filterValue1 && this.filterValue2) {
      if (this.filterValue1 <= this.filterValue2) {
        this.args.dismissError();
        debounce(this, this.updateFilterDebounced, [this.filterValue1, this.filterValue2], 600);
      } else {
        this.args.showError('Error: The maximum value must be greater than or equal to the minimum value');
      };
    };
  };

  @action
  // when setting the maximum, make sure the mimimum is adjusted so it does not go above
  addMaximumRange(e) {
    this.max1 = e.target.value;
    this.filterValue2 = parseFloat(e.target.value);
    if (this.filterValue1 && this.filterValue2) {
      if (this.filterValue1 <= this.filterValue2) {
        this.args.dismissError();
        debounce(this, this.updateFilterDebounced, [this.filterValue1, this.filterValue2], 600);
      } else {
        this.args.showError('Error: The maximum value must be greater than or equal to the minimum value');
      };
    };
  };

  @action
  updateFilterDebounced(values) {
    return this.args.updateFilter({
      filterType: "range",
      filterName: this.args.filter.filterName,
      filterValue: values,
      isNumber: true,
    });
  };
};
