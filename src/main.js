angular.module('mdDatetime', [])
.component('mdDatetime', {
  template: `
    <md-datepicker ng-model="DT.date"></md-datepicker>
  `,
  controller() {
    this.time = this.date = new Date();
  },
  controllerAs: 'DT'
});
