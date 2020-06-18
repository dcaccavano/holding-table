import Route from '@ember/routing/route';
import d3 from 'd3';

export default class HoldingTableRoute extends Route {
  // parses csv data using d3
  model() {
    // returns an array of objects, each individual holding to be displayed as a table row
    return d3.csv("/holding-list.csv").then(function(data) {
      return data;
    });
  }
}
