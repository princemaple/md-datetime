angular.module('mdDatetime', [])
.component('mdTimepicker', {
  template: require('html!./template.html'),
  bindings: { mode: '@' },
  require: {
    modelCtrl: 'ngModel'
  },
  controller() {
    this.$onInit = function() {
      console.log(this);
    };

    this.outerHours = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
    this.innerHours = ['13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '00'];
    this.minutes = ['05', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55', '00'];

    let processClockNumber = (size) => {
      return (value, index) => {
        let deg = index * 30 + 30;

        return {
          value,
          style: {
            transform: `rotate(${deg}deg) translate(0, -${size}px) rotate(-${deg}deg)`
          }
        };
      };
    };

    this.outerHours = this.outerHours.map(processClockNumber(80));
    this.innerHours = this.innerHours.map(processClockNumber(55));
    this.minutes = this.minutes.map(processClockNumber(80));

    this.ampm = this.mode == 'ampm';

    if (this.ampm) { this.innerHours = []; }
  },
  controllerAs: 'T'
})
.component('mdDatetime', {
  bindings: { at: '=' },
  template: `
    <md-datepicker ng-model="DT.params.date" ng-change="DT.updateDate()"></md-datepicker>
    <md-timepicker ng-model="DT.params.time" ng-change="DT.updateTime()" mode="24h"></md-timepicker>
    <br />
    {{DT.datetime.format()}}
  `,
  controller() {
    this.datetime = moment(this.at);

    this.updateDate = function() {
      let newDate = moment(this.params.date);

      this.datetime.year(newDate.year());
      this.datetime.month(newDate.month());
      this.datetime.date(newDate.date());
    };

    this.update = function() {
      this.params = {
        date: this.datetime.toDate(),
        time: {
          hour: this.datetime.hour(),
          minute: this.datetime.minute()
        }
      };
    };

    this.update();
  },
  controllerAs: 'DT'
});
