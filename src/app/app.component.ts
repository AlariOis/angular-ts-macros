import {Component, OnInit} from '@angular/core';

declare const PATH: string;

declare global {
  interface String {
    $contains<T>(...possible: Array<T>) : boolean;
  }
}

export function $contains<T>(value: T, ...possible: Array<T>): boolean {
  return possible.includes(value);
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  env_path = PATH;

  needle_found = false;
  needle = 'three';
  haystack = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];

  ngOnInit(): void {
    this.find_needle();
  }

  find_needle() {
    this.needle_found = $contains!(this.needle, ...this.haystack );

    // This breaks the build with error
    // No possible candidates for "$contains" call
    // this.needle_found = this.needle.$contains!(...this.haystack);
  }
}
