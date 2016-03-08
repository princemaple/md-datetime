angular.module('mdDatetime')
.component('mdTimepicker', {
  template: require('html!./md-timepicker.html'),
  bindings: { mode: '@' },
  require: {
    modelCtrl: 'ngModel'
  },
  controller($scope, $window) {
    this.$onInit = () => {
      this.modelCtrl.$render = () => {
        this.viewValue = moment(this.modelCtrl.$modelValue).format('HH:mm');

        let { hour, minute } = this.modelCtrl.$modelValue;

        this.hours.forEach(h => { h.selected = h.realValue == hour; });
        this.minutes.forEach((m, index) => { m.selected = (Math.floor(minute / 5) + 11) % 12 == index; });
      };

      angular.element($window).on('click', () => {
        this.picking = false;
        $scope.$digest();
      });
    };

    this.keepPicking = (event) => { event.stopPropagation(); };

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

    this.togglePicking = (event) => {
      if (this.picking) { return this.picking = false; }

      this.picking = true;
      this.pickHour();

      this.keepPicking(event);
    };

    this.pickHour = () => {
      this.pickingMinute = false;
      this.pickingHour = true;
    };

    this.pickMinute = () => {
      this.pickingHour = false;
      this.pickingMinute = true;
    };

    this.selectHour = (hour) => {
      this.modelCtrl.$setViewValue({
        hour: hour.realValue,
        minute: this.modelCtrl.$modelValue.minute
      });

      this.outerHours.forEach(h => { h.selected = false; });
      this.innerHours.forEach(h => { h.selected = false; });
      hour.selected = true;

      this.pickMinute();
    };

    this.selectMinute = (minute) => {
      this.modelCtrl.$setViewValue({
        hour: this.modelCtrl.$modelValue.hour,
        minute: minute.realValue
      });

      this.minutes.forEach(m => { m.selected = false; });
      minute.selected = true;

      this.picking = false;
    };

    this.timePattern = /^[0-2]?[0-9]:[0-5][0-9]$/;

    this.parse = () => {
      if (!this.viewValue) { return; }

      let [hour, minute] = this.viewValue.split(':');

      this.modelCtrl.$setViewValue({ hour, minute });
    };

    this.time = {
      hour: () => moment(this.modelCtrl.$modelValue).format('HH'),
      minute: () => moment(this.modelCtrl.$modelValue).format('mm')
    };
  },
  controllerAs: 'T'
});
