angular.module('mdDatetime')
.component('mdDatetime', {
  bindings: { at: '=' },
  template: require('html!./md-datetime.html'),
  controller() {
    this.datetime = moment(this.at);

    this.updateDate = () => {
      let newDate = moment(this.params.date);

      this.datetime.year(newDate.year());
      this.datetime.month(newDate.month());
      this.datetime.date(newDate.date());

      this.updateParams();
    };

    this.updateTime = () => {
      this.datetime.hour(this.params.time.hour);
      this.datetime.minute(this.params.time.minute);

      this.updateParams();
    };

    this.updateParams = () => {
      this.params = {
        date: this.datetime.toDate(),
        time: {
          hour: this.datetime.hour(),
          minute: this.datetime.minute()
        }
      };
    };

    this.reset = () => {
      this.datetime = moment();
      this.updateParams();
    };

    this.updateParams();
  },
  controllerAs: 'DT'
});
