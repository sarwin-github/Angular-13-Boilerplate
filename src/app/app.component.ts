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
import * as AOS from 'aos';
import {
  ActivatedRoute,
  NavigationEnd,
  Router
} from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public title = 'my-pet-go';
  private req: Subscription;
  private location: string = '';
  private screenSize: number = 1600;

  constructor(
    public router: Router,
    public route: ActivatedRoute,
  ) {
    this.location = this.router.url;
    this.req = this.router.events.subscribe((event: any) => {
      if(event){

        if(router.url !== this.location){
          this.location = router.url;
          AOS.refreshHard();
          window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
          });
          
        }
      }
    });

    /*this.router.routeReuseStrategy.shouldReuseRoute = function() {
      return false;
    };*/
  }

  ngOnInit(): void {
    if(window.innerWidth > 1400){
      this.aosInit();
    }

    else this.aosInitMobile();
    
  }

  // on window resize
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    AOS.refreshHard();
  }

  aosInit(){
    AOS.init({
      // Global settings:
      disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
      startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
      initClassName: 'aos-init', // class applied after initialization
      animatedClassName: 'aos-animate', // class applied on animation
      useClassNames: true, // if true, will add content of `data-aos` as classes on scroll
      disableMutationObserver: false, // disables automatic mutations' detections (advanced)
      debounceDelay: 100, // the delay on debounce used while resizing window (advanced)
      throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)
      
      // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
      offset: 120, // offset (in px) from the original trigger point
      delay: 0, // values from 0 to 3000, with step 50ms
      duration: 500, // values from 0 to 3000, with step 50ms
      easing: 'ease', // default easing for AOS animations
      once: window.innerWidth > 1500 ? false : true, // whether animation should happen only once - while scrolling down
      mirror: false, // whether elements should animate out while scrolling past them
      anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation

    });
  }

  aosInitMobile(){
    AOS.init({
      // Global settings:
      disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
      startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
      initClassName: 'aos-init', // class applied after initialization
      animatedClassName: 'aos-animate', // class applied on animation
      useClassNames: true, // if true, will add content of `data-aos` as classes on scroll
      disableMutationObserver: false, // disables automatic mutations' detections (advanced)
      debounceDelay: 100, // the delay on debounce used while resizing window (advanced)
      throttleDelay: 0, // the delay on throttle used while scrolling the page (advanced)
      
      // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
      offset: 0, // offset (in px) from the original trigger point
      delay: 0, // values from 0 to 3000, with step 50ms
      duration: 400, // values from 0 to 3000, with step 50ms
      easing: 'ease', // default easing for AOS animations
      once: true, // whether animation should happen only once - while scrolling down
      mirror: false, // whether elements should animate out while scrolling past them
      anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation

    });
  }
}
