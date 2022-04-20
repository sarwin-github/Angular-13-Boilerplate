import {
  Component,
  ElementRef,
  Input,
  ViewChild,
  OnChanges,
  OnInit,
  OnDestroy,
  HostListener
} from '@angular/core';
import { mainAnimations } from '../../shared/animations/main-animations';

@Component({
  selector: 'app-home',
  animations: [mainAnimations],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public loading: boolean = true;
  public screenSize: number = 1600;
  constructor() { }

  ngOnInit(): void {
    this.screenSize = window.innerWidth;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenSize = window.innerWidth;
  }
}
