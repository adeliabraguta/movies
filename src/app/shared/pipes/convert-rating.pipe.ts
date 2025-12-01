import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'convertRating',
})
export class ConvertRatingPipe implements PipeTransform {
  transform(value: number | undefined): string {
    return Number(value).toFixed(1);
  }
}
