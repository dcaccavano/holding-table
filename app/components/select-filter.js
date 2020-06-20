import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { debounce } from '@ember/runloop';

export default class SelectFilterComponent extends Component {

  @tracked filterValue = this.args.filter.filterValue;

  // not the most elegant, but these are all of the unique instances for
  // each of these categories. used R.uniq(R.pluck("PROPERTY"))(this.args.data)
  @tracked uniqSectors = ["F1", "IM", "IY", "IZ", "C9", "IA", "I1", "U1", "F4", "I6", "IX", "I2", "F2", "A4", "IT", "F5", "B1", "I3", "M2", "ID", "Y1", "I8", "X1", "IG", "F9", "X5", "IW", "IJ", "X3", "IS", "IN", "A6", "IO", "IV", "Y5", "2A", "3A", "4A", "N1", "H2", "N3", "G2", "N2", "H4", "C2", "H5", "A1", "F8", "C0", "C1", "I4", "Y3", "7A", "M0", "F6", "U2", "IU", "X2", "OA", "F3", "I9", "TA", "TN", "TR", "I5", "IL", "C5"];
  @tracked uniqQualities = ["AA3", "BAA1", "A2", "BAA2", "AAA", "A3", "A1", "BBB+", "BAA3", "AA1", "AA2", "BA3", "A+", "A-", "AA+", "NR", "BBB", "A", "AA"];

  get isSector() {
    return this.args.filter.filterName === 'Sector';
  };
  get isQuality() {
    return this.args.filter.filterName === 'Quality';
  };

  @action
  updateFilterValue(e) {
    debounce(this, this.updateFilterDebounced, e, 600);
  };

  @action
  updateFilterDebounced(e) {
    return this.args.updateFilter({
      filterType: "select",
      filterName: this.args.filter.filterName,
      filterValue: e.target.value,
      isNumber: false,
    });
  };
};
