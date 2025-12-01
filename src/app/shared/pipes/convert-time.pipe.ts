import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'convertTime',
})
export class ConvertTimePipe implements PipeTransform {
  transform(value: number): string {
    const h: number = Math.floor(value / 60);
    const m: number = value % 60;

    const formattedMinutes: string | number = m < 10 ? '0' + m : m;

    if (h === 0) return `${formattedMinutes}m`;

    return `${h}h ${formattedMinutes}m`;
  }
}
