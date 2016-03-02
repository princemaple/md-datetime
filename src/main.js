angular.module('mdDatetime', [])
.component('mdTimepicker', {
  template: `
  <button class="md-icon-button md-button md-ink-ripple" type="button">
    <md-icon>
      <svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
        <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
        <path d="M0 0h24v24H0z" fill="none"/>
        <path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
      </svg>
    </md-icon>
  </button>
  <div class="md-timepicker">
    <div class="md-timepicker-ampm" ng-if="T.ampm">
      am/pm
    </div>
    <div class="md-timepicker-clock md-timepicker-hours">
      <div class="md-timepicker-clock-outer-hour md-timepicker-clock-hour"
          ng-repeat="hour in T.outerHours" ng-style="hour.style">
        <span class="md-timepicker-hour-number">{{::hour.value}}</span>
      </div>
      <div class="md-timepicker-clock-inner-hour md-timepicker-clock-hour"
          ng-repeat="hour in T.innerHours" ng-style="hour.style">
        <span class="md-timepicker-hour-number">{{::hour.value}}</span>
      </div>
    </div>
    <div class="md-timepicker-clock md-timepicker-minutes">
      <div class="md-timepicker-clock-minute"
          ng-repeat="minute in T.minutes" ng-style="minute.style">
        <span class="md-timepicker-minute-number">{{::minute.value}}</span>
      </div>
    </div>
  </div>
  `,
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
        return {
          value,
          style: {
            transform: `rotate(${index * 30 + 30}deg) translate(0, -${size}px) rotate(-${index * 30 + 30}deg)`
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
