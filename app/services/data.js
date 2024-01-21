import Service from '@ember/service';

import data from 'is-ready/data.json';

export default class Data extends Service {
  get data() {
    return data;
  }

  get total() {
    return data.total;
  }

  get finished() {
    return data.finished;
  }

  get percent() {
    return Math.round((this.finished / this.total) * 100);
  }
}
