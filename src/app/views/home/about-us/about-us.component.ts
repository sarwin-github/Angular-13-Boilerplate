import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {
  @Input() screenSize: number = 1600;
  constructor() { }

  ngOnInit(): void {
    
  }

}
