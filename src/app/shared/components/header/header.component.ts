import { Component,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
  AfterViewInit,
  OnDestroy 
} from '@angular/core';
import { 
  Router, 
  ActivatedRoute 
} from '@angular/router';
import { CustomerService } from '../../services/auth/customer/customer.service';
import { AdminService } from '../../services/auth/admin/admin.service';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs';
import * as Model from '@main/app.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  private req?: Subscription;

  public headerItems: any = [
    //{ title: 'Home', id: 'home', route: '/' },
    { title: 'About', id: 'about', route: '/about' },
    { 
      title: 'Profile', 
      id: 'profile', 
      route: '/profile', 
      sub_routes: [
        {
          title: "Account Settings",  
          id: 'account-settings',  
          route: '/profile'
        },
      ]

    },
  ];

  public loggedInCustomer: any;
  public loggedInClient: any;
  public location: any;

  constructor(private router:Router, 
    private activatedRoute: ActivatedRoute,
    private customerService: CustomerService,
    private adminService: AdminService) { 

    this.location = this.router.url;

    this.req = this.router.events.subscribe((event: any) => {
      this.location = this.router.url;
      
      this.customerService.customerStatus$.subscribe((result: any) => {
        this.loggedInCustomer = result;
      });

      this.adminService.adminStatus$.subscribe((result: any) => {
        this.loggedInClient = result;
      });
    });
  }

  ngOnInit(): void  {
  }

  ngOnDestroy(): void {
    if(this.req) this.req.unsubscribe();
  }

  navigateToRoute(route){
    this.router.navigate([route]);
  }

  customerLogout(): void {
    this.req = this.customerService.logoutCustomer()
    .subscribe(() => {
      window.scrollTo(0, 0);
    });
  }

  adminLogout(): void {
    this.req = this.adminService.logoutAdmin()
    .subscribe(() => {
      window.scrollTo(0, 0);
    });
  }
}
