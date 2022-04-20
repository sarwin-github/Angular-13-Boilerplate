import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common'

@Component({
  selector: 'app-error-not-found',
  templateUrl: './error-not-found.component.html',
  styleUrls: ['./error-not-found.component.scss']
})
export class ErrorNotFoundComponent implements OnInit {

  constructor(private location: Location) { }

  ngOnInit(): void {
  }

  goBack(): void {
    this.location.back();
  }

}
