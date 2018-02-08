import { Component, OnChanges, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { log } from 'util';
type AOA = [string, any];
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'C# to JSON';
  input;
  output;
  constructor() {
  }

  ngOnInit() {
    this.input = '';
    this.output = '';
  }

  converter(): string {
    const fn = [];
    _.each(_.split(this.input, '{ get; set; }'), (o) => {
      const i: [string, string] = _.split(_.replace(o, 'public', '').trim(), ' ');
      if (!_.isEmpty(i[0]) && !_.isNil(i[0]) && !_.isUndefined(i[0])) {
        const rs = i[1] + ':' + this.getType(i[0]);
        fn.push(rs);
      }
    });
    return _.join(fn, ';\r\n');

  }

  getType(ctype: string): string {
    switch (ctype) {
      case 'string': return 'string';
      case 'Nullable<int>': return 'number';
      case 'Nullable<decimal>': return 'number';
      case 'decimal': return 'number';
      case 'int': return 'number';
      case 'bool': return 'boolean';
      case 'Nullable<bool>': return 'boolean';
      case 'System.DateTime': return 'Date';
      case 'Nullable<System.DateTime>': return 'Date';
    }
  }

  inputChange(e: any) {
    this.output = this.converter();
  }
}
