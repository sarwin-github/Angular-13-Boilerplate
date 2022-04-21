import { 
  Component, 
  OnInit, 
  OnDestroy 
} from '@angular/core';
import { Router } from '@angular/router';
import { mainAnimations } from '@app-shared/animations/main-animations';
import { NgxSpinnerService } from "ngx-spinner";
import { tap } from 'rxjs';
import { 
  Observable, 
  Subscription 
} from 'rxjs';
import { CustomerUserService } from '../state/customer.service';
import { CustomerFacade } from '../state/customer.facade';
import { Customer } from '../customer.model'

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
  public customer: any;
  public customer$: Observable<Customer> = this.customerFacade.customerProfile$;



  constructor(private router:Router, 
    private spinner: NgxSpinnerService,
    private customerFacade: CustomerFacade,
    private customerService: CustomerUserService) { }

  ngOnInit(): void {
    this.customerFacade.getCustomerProfile();

    this.req = this.customer$.subscribe((result: any) => {
      this.customer = result;
    });
    //this.getCustomerProfile();
  }

  ngOnDestroy(): void {
    if(this.req) this.req.unsubscribe();
  }

  getCustomerProfile(): void {
    this.req = this.customerService.getCustomerProfile()
    .subscribe((result: any) => {
      //console.log(result)

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
    });   
  }
}
