import Service from '@ember/service';

export default class Data extends Service {
  get data() {
    return globalThis.GH_ISSUE_DATA;
  }

  get total() {
    return globalThis.GH_ISSUE_DATA.total;
  }

  get finished() {
    return globalThis.GH_ISSUE_DATA.finished;
  }

  get percent() {
    return Math.round((this.finished / this.total) * 100);
  }

  get labels() {
    return globalThis.GH_ISSUE_DATA.labels;
  }
}
