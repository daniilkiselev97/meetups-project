import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cardDate'
})
export class CardDatePipe implements PipeTransform {

	transform(value: string, args?: unknown[]): any {
		const date = new Date(value)

    const year: string = date.getFullYear().toString().slice(-2);
    const month: string = ('0' + (date.getMonth() + 1)).slice(-2);
    const day: string = ('0' + date.getDate()).slice(-2);
    const hours: string = ('0' + date.getHours()).slice(-2);
    const minutes: string = ('0' + date.getMinutes()).slice(-2);

    return `${day}.${month}.${year} ${hours}:${minutes}`;
  }

}
