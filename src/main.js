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
  00:00
  `,
  bindings: { mode: '@' },
  require: {
    modelCtrl: 'ngModel'
  },
  controller() {
    this.$onInit = function() {
      console.log(this);
    };
  }
})
.component('mdDatetime', {
  bindings: { at: '=' },
  template: `
    <md-datepicker ng-model="DT.params.date" ng-change="DT.updateDate()"></md-datepicker>
    <md-timepicker ng-model="DT.params.time" ng-change="DT.updateTime()"></md-timepicker>
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
