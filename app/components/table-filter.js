import Component from '@glimmer/component';

export default class TableFilterComponent extends Component {
  get isTextFilter() {
    return this.args.filter.filterType === 'text';
  }
  get isSelectFilter() {
    return this.args.filter.filterType === 'select';
  };
  get isRangeFilter() {
    return this.args.filter.filterType === 'range';
  };
};
