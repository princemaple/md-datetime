angular.module('mdDatetime', ['ngMaterial'])
.component('mdTimepicker', {
  template: require('html!./md-timepicker.html'),
  bindings: { mode: '@' },
  require: {
    modelCtrl: 'ngModel'
  },
  controller() {
    this.$onInit = () => {
      this.modelCtrl.$render = () => {
        this.display = moment(this.modelCtrl.$modelValue).format('HH:mm');

        let { hour, minute } = this.modelCtrl.$modelValue;

        this.hours.forEach(h => { h.selected = h.realValue == hour; });
        this.minutes.forEach(m => { m.selected = Math.abs(m.realValue - minute) <= 2.5; });
      };
    };

    this.outerHours = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
    this.innerHours = ['13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '00'];
    this.minutes = ['05', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55', '00'];

    let processClockNumber = (type, size) => {
      return (viewValue, index) => {
        let deg = index * 30 + 30;

        return {
          type,
          viewValue,
          realValue: parseInt(viewValue, 10),
          style: {
            transform: `rotate(${deg}deg) translate(0, -${size}px) rotate(-${deg}deg)`
          }
        };
      };
    };

    this.outerHours = this.outerHours.map(processClockNumber('hour', 80));
    this.innerHours = this.innerHours.map(processClockNumber('hour', 55));

    this.ampm = this.mode == 'ampm';
    if (this.ampm) { this.innerHours = []; }

    this.hours = this.outerHours.concat(this.innerHours);
    this.minutes = this.minutes.map(processClockNumber('minute', 80));

    this.selectHour = (hour) => {
      this.modelCtrl.$setViewValue({
        hour: hour.realValue,
        minute: this.modelCtrl.$modelValue.minute
      });

      this.outerHours.forEach(h => { h.selected = false; });
      this.innerHours.forEach(h => { h.selected = false; });
      hour.selected = true;
    };

    this.selectMinute = (minute) => {
      this.modelCtrl.$setViewValue({
        hour: this.modelCtrl.$modelValue.hour,
        minute: minute.realValue
      });

      this.minutes.forEach(m => { m.selected = false; });
      minute.selected = true;
    };
  },
  controllerAs: 'T'
})
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

    this.updateParams = function() {
      this.params = {
        date: this.datetime.toDate(),
        time: {
          hour: this.datetime.hour(),
          minute: this.datetime.minute()
        }
      };
    };

    this.updateParams();
  },
  controllerAs: 'DT'
});
