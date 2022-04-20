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
import { AdminService } from '../../../../shared/services/auth/admin/admin.service';
import { IAdminInput } from '../../../../shared/models/admin-interface';
import { mainAnimations } from '../../../../shared/animations/main-animations';
import { Subscription } from 'rxjs';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'admin-signup',
  animations: [mainAnimations],
  templateUrl: './admin-signup.component.html',
  styleUrls: ['./admin-signup.component.scss']
})
export class AdminSignupComponent implements OnInit {
  private req? : Subscription;
  private postReq? : Subscription;
  private loginReq? : Subscription;

  public admin: IAdminInput;
  public adminSignupForm: FormGroup;
  public message: any = localStorage.getItem('signupMessage');
  public error: any = localStorage.getItem('signupError'); 

  constructor(private router:Router, 
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private adminService: AdminService) { 
    this.admin = <IAdminInput>{};
    this.adminSignupForm = this.formBuilder.group({
      email: [
        null, 
        Validators.compose([Validators.required, Validators.email])
      ],
      password: [
        null, 
        Validators.compose([Validators.required, Validators.minLength(6)])
      ],
      confirmPassword: [
        null, 
        Validators.compose([Validators.required, Validators.minLength(6)])
      ],
      name: [
        null, 
        Validators.compose([Validators.required])
      ],
      company: [
        null, 
        Validators.compose([Validators.required])
      ],
      address: [
        null, 
        Validators.compose([Validators.required])
      ],
      phone: [
        null, 
        Validators.compose([Validators.required])
      ]
    });
  }

  ngOnInit(): void {
    this.createForm();
  }

  ngOnDestroy(): void {
    localStorage.removeItem('signupError');
    localStorage.removeItem('signupMessage');

    if(this.postReq) this.postReq.unsubscribe();
    if(this.loginReq) this.loginReq.unsubscribe();
  }

  createForm(): void {
    this.req = this.adminService.getAdminSignupForm().subscribe((data) => {
      console.log(data);
    });
  }

  /* signupAdmin - create new admin
  * parameter
  *   - @event : event value
  */
  signUpAdmin(event: Event): void {
    this.admin.email = this.adminSignupForm?.get('email')?.value;
    this.admin.password = this.adminSignupForm?.get('password')?.value;
    this.admin.confirmPassword = this.adminSignupForm?.get('confirmPassword')?.value;
    this.admin.name = this.adminSignupForm?.get('name')?.value;
    this.admin.company = this.adminSignupForm?.get('company')?.value;
    this.admin.address = this.adminSignupForm?.get('address')?.value;
    this.admin.phone = this.adminSignupForm?.get('phone')?.value;

    // initialize inputs
    let body  = {
      email: this.admin.email,
      password: this.admin.password,
      name: this.admin.name,
      company: this.admin.company,
      address: this.admin.address,
      phone: this.admin.phone,
      'confirm-password': this.admin.confirmPassword
    };

    // Show Spinner
    //this.spinner.show();

    // execute http post request
    this.postReq = this.adminService.postSignUp(body)
    .subscribe((result: any) => {
      // if error then throw error result 
      if(result.error){
        window.scroll(0, 0);
        localStorage.setItem('signupError', result.error);

        this.error = localStorage.getItem('signupError');
        //this.spinner.hide();
        this.router.navigate(['admin/signup']);
      } 
      // if no error, execute login validation
      else {
        localStorage.removeItem('signupError');

        // After successful signup execute login request to server
        this.loginAdmin(result, body);
      }
    },
    // If error in server/api temporary navigate to error page
    (err) => {
      //this.spinner.hide();
      localStorage.setItem('sessionError', err);
      localStorage.setItem('sessionUrl', this.router.url);
    });    
  }

  // login admin
  loginAdmin(result: any, body: any): void {
    this.loginReq = this.adminService.postLogin(JSON.stringify(body))
    .subscribe((admin) => {
      localStorage.setItem('loginMessage', 'Login was successful.');
      localStorage.setItem('token', 'Bearer ' + admin.token);
      localStorage.setItem('refreshToken', result.refreshToken);
      localStorage.setItem('admin', JSON.stringify({
        _id: result.teacher._id,
        name: result.teacher.name,
        email: result.teacher.email
      }));

      this.adminSignupForm.reset();
      this.message = localStorage.getItem('loginMessage');
      this.adminService.setAdminLogin(true);

      // spinner ends after 2 seconds 
      setTimeout(() => {
        //this.spinner.hide();
        this.router.navigate(['/admin/profile']);
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
