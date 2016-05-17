angular.module('mdDatetime')
.component('mdDatetime', {
  require: {
    modelCtrl: 'ngModel'
  },
  template: require('html!./md-datetime.html'),
  controller($attrs) {
    this.$onInit = () => {
      this.modelCtrl.$render = () => {
        this.datetime = moment(this.modelCtrl.$modelValue);
        this.updateParams(true);
      };
    };

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

    this.updateParams = (init) => {
      this.params = {
        date: this.datetime.toDate(),
        time: {
          hour: this.datetime.hour(),
          minute: this.datetime.minute()
        }
      };

      if (init) { return; }
      this.modelCtrl.$setViewValue(this.datetime.toISOString());
    };

    this.canReset = !('noReset' in $attrs);

    this.reset = () => {
      this.datetime = moment();
      this.updateParams();
    };
  },
  controllerAs: 'DT'
});
