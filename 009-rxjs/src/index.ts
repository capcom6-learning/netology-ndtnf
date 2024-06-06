import { of, from } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';

const url = 'https://api.github.com/search/repositories?q=rxjs';
const o$ = ajax(url)
  .pipe(
    map((response) => response.response),
    map((json) => json.items),
    mergeMap((items) => of(...items)),
    map((item) => item.full_name),
  );

o$.subscribe({
  next: (value: any) => console.log('Next:', value),
  complete: () => console.log('Complete!'),
  error: (error) => console.log('Error!', error)
})