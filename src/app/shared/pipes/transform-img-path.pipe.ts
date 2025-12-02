import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'transformImgPath',
})
export class TransformImgPathPipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    return value ? 'https://image.tmdb.org/t/p/original/' + value : 'assets/not-found.jpg';
  }
}
