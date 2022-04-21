import {
  Component,
  OnInit,
  OnDestroy
} from '@angular/core';
import {
  Router,
  ActivatedRoute
} from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { CustomerService } from '@app-shared/services/auth/customer/customer.service';
import { ICustomerInput } from '@app-shared/models/customer-interface';
import { mainAnimations } from '@app-shared/animations/main-animations';
import { Subscription } from 'rxjs';
import { NgxSpinnerService } from "ngx-spinner";
import * as Model from '../customer.model';

@Component({
  selector: 'customer-signup',
  animations: [mainAnimations],
  templateUrl: './customer-signup.component.html',
  styleUrls: ['./customer-signup.component.scss']
})
export class CustomerSignupComponent implements OnInit {
  private req?: Subscription;
  private postReq?: Subscription;
  private loginReq?: Subscription;
  private customer_email: string = '';
  private customer_password : string = '';

  public customer: Model.Customer = {
    address: '',
    email: '',
    name: '',
    phone: null,
    password: null
  };
  public customerSignupForm: FormGroup;
  public message: any = localStorage.getItem('signupMessage');
  public error: any = localStorage.getItem('signupError');
  public inputType: string = 'password';


  constructor(
    private router:Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private customerService: CustomerService) {
  }

  ngOnInit(): void {
    this.customerSignupForm = this.formBuilder.group({
      email: [
        null,
        Validators.compose([Validators.required, Validators.email])
      ],
      password: [
        null,
        Validators.compose([Validators.required, Validators.minLength(6)])
      ],
      /*confirmPassword: [
        null,
        Validators.compose([Validators.required, Validators.minLength(6)])
      ],*/
      name: [
        null,
        Validators.compose([Validators.required])
      ],
      address: [
        null,
        Validators.compose([Validators.required])
      ],
      agree_to_term: [
        null,
        Validators.compose([Validators.required])
      ],
      phone: [
        null,
        Validators.compose([Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")])
      ]
    });

    // this.createForm();
  }

  ngOnDestroy(): void {
    localStorage.removeItem('signupError');
    localStorage.removeItem('signupMessage');

    if(this.postReq) this.postReq.unsubscribe();
    if(this.loginReq) this.loginReq.unsubscribe();
  }

  createForm(): void {
    // this.req = this.customerService.getCustomerSignupForm()
    // .subscribe((data: any) => {
    //   console.log(data);
    // });
  }

  /* signupCustomer - create new customer
  * parameter
  *   - @event : event value
  */
  signupCustomer(e: Event): void {
    this.customer.email = this.customerSignupForm?.get('email')?.value;
    this.customer.password = this.customerSignupForm?.get('password')?.value;
    //this.customer.confirmPassword = this.customerSignupForm?.get('confirmPassword')?.value;
    this.customer.name = this.customerSignupForm?.get('name')?.value;
    this.customer.address = this.customerSignupForm?.get('address')?.value;
    this.customer.phone = this.customerSignupForm?.get('phone')?.value;
    //this.customer.address = this.customerSignupForm?.get('address')?.value;

    // initialize inputs
    let body: Model.Customer  = {
      email: this.customer.email,
      password: this.customer.password,
      name: this.customer.name,
      address: this.customer.address,
      phone: this.customer.phone
      //address: this.customer.address,
      //phone: this.customer.phone,
      //'confirm-password': this.customer.confirmPassword
    };

    // Show Spinner
    //this.spinner.show();

    // execute http post request
    this.postReq = this.customerService.postSignUp(body)
    .subscribe((result: any) => {
      // if error then throw error result
      if(result.error){
        window.scroll(0, 0);
        localStorage.setItem('signupError', result.error);

        this.error = localStorage.getItem('signupError');
        //this.spinner.hide();
        this.router.navigate(['/account/signup']);
      }

      // if no error, execute login validation
      else {
        localStorage.removeItem('signupError');

        // After successful signup execute login request to server
        this.loginCustomer(result, body);
      }
    },
    // If error in server/api temporary navigate to error page
    (err: any) => {
      //this.spinner.hide();
      localStorage.setItem('sessionError', err);
      localStorage.setItem('sessionUrl', this.router.url);
    });
  }

  // login customer
  loginCustomer(result: any, body: any): void {
    this.loginReq = this.customerService.postLogin(JSON.stringify(body))
    .subscribe((customer) => {
      localStorage.setItem('loginMessage', 'Login was successful.');
      localStorage.setItem('token', 'Bearer ' + customer.token);
      localStorage.setItem('refreshToken', result.refreshToken);
      localStorage.setItem('customer', JSON.stringify({
        _id: result.student?._id,
        name: result.student?.name,
        email: result.student?.email
      }));

      this.customerSignupForm.reset();
      this.message = localStorage.getItem('loginMessage');
      this.customerService.setCustomerLogin(true);

      //spinner ends after 2 seconds
      setTimeout(() => {
        //this.spinner.hide();
        this.router.navigate(['/profile']);
      }, 2000);
    });
  }

  // Clear error message
  onAlertClose(): void {
    localStorage.removeItem('signupError');
    localStorage.removeItem('signupMessage');

    this.error   = undefined;
    this.message = undefined;
  }
}
