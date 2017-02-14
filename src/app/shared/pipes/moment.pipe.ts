import {Pipe, PipeTransform} from '@angular/core';
import * as moment from 'moment';

/*
 * Time helper using momentjs
 * Usage:
 *   timestamp | moment:'DD.MM.YYYY'
 * Defaults to 'L' - locale ie. '01/24/2016'
*/
@Pipe({
  name: 'moment',
  pure: true
})
export class MomentPipe implements PipeTransform {
  transform(value:number, args:string[]) : any {
    let date = moment(value);
    if (date.isValid()) {
      return date.format(args[0] || 'L');
    } else {
      return value;
    }
  }
}
