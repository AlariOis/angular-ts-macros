import {Component, OnInit} from '@angular/core';
import {$contains} from "./typescript_ext";

declare const PATH: string;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  env_path = PATH;

  needle_found_with_macro = false;
  needle_found_with_chained_variable = false;

  needle = 'three';
  haystack = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];

  ngOnInit(): void {
    this.find_needle();
  }

  find_needle() {
    this.needle_found_with_macro = $contains!(this.needle, ...this.haystack );
    this.needle_found_with_chained_variable = this.needle.$contains!(...this.haystack);
  }
}
