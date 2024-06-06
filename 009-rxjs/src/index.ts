import { of, from } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';

function github() {
  const url = 'https://api.github.com/search/repositories?q=rxjs';
  const o$ = ajax(url)
    .pipe(
      map((response) => response.response),
      map((json) => json.items),
      mergeMap((items) => of(...items)),
      map((item) => item.full_name),
    );

  return o$;
}

function gitlab() {
  const url = 'https://gitlab.com/api/v4/projects?search=rxjs';
  const o$ = ajax.getJSON(url)
    .pipe(
      mergeMap((json: any) => of(...json)),
      map((item: any) => item.path_with_namespace),
    );

  return o$;
}


github().subscribe({
  next: (value: any) => console.log('GitHub:', value),
  complete: () => console.log('GitHub Complete!'),
  error: (error) => console.log('GitHub Error!', error)
});

gitlab().subscribe({
  next: (value: any) => console.log('GitLab:', value),
  complete: () => console.log('GitLab Complete!'),
  error: (error) => console.log('GitLab Error!', error)
});