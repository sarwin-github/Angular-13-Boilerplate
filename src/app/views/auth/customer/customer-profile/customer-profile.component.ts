import { 
  Component, 
  OnInit, 
  OnDestroy 
} from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from '../../../../shared/services/auth/customer/customer.service';
import { mainAnimations } from '../../../../shared/animations/main-animations';
import { Subscription } from 'rxjs';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'customer-profile',
  animations: [mainAnimations],
  templateUrl: './customer-profile.component.html',
  styleUrls: ['./customer-profile.component.scss']
})
export class CustomerProfileComponent implements OnInit {
  private req?: Subscription;
  public loading: boolean = true;
  public customer_data: any = {};
  public tabSelected: string = "details";

  constructor(private router:Router, 
    private spinner: NgxSpinnerService,
    private customerService: CustomerService) { }



  
  ngOnInit(): void {
    this.getCustomerProfile();
  }

  ngOnDestroy(): void {
    if(this.req) this.req.unsubscribe();
  }

  getCustomerProfile(): void {
    this.req = this.customerService.getCustomerProfile()
    .subscribe((result: any) => {
      setTimeout(() =>{ 
        this.loading = false;
        this.customer_data = result;
      }, 2000);
      
    },
    // If error in server/api temporary navigate to error page
    (err: any) => {
      //this.spinner.hide();
      localStorage.setItem('sessionError', err);
      localStorage.setItem('sessionUrl', this.router.url);
      this.customerService.logoutCustomer();
    });   
  }
}
