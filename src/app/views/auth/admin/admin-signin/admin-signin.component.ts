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
import { AdminService } from '../../../../shared/services/auth/admin/admin.service'
import { mainAnimations } from '../../../../shared/animations/main-animations';
import { Subscription } from 'rxjs';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'admin-signin',
  animations: [mainAnimations],
  templateUrl: './admin-signin.component.html',
  styleUrls: ['./admin-signin.component.scss']
})
export class AdminSigninComponent implements OnInit {
  private req? : Subscription;
  private postReq? : Subscription;
  private admin_email : string = '';
  private admin_password : string = '';

  public adminLoginForm : FormGroup;
  public message : any = localStorage.getItem('loginMessage');
  public error : any = localStorage.getItem('loginError');

  constructor(private router:Router, 
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private adminService: AdminService) { 
    this.adminLoginForm = this.formBuilder.group({
      email: [
        null, 
        Validators.compose([Validators.required, Validators.email])
      ],
      password: [
        null, 
        Validators.compose([Validators.required, Validators.minLength(6)])
      ]
    });
  }

  ngOnInit(): void {
    this.createForm();
  }

  ngOnDestroy(): void {
    localStorage.removeItem('loginError');
    localStorage.removeItem('loginMessage');

    if(this.req) this.req.unsubscribe();
    if(this.postReq) this.postReq.unsubscribe();
  }

  createForm(): void {
    this.req = this.adminService.getAdminLoginForm().subscribe((data) => {
      console.log(data);
    });
  }

  loginAdmin(event: Event): void {
    //get value from form controls
    this.admin_email = this.adminLoginForm?.get('email')?.value;
    this.admin_password = this.adminLoginForm?.get('password')?.value;
    
    // initialize inputs
    let body  = {
      email: this.admin_email,
      password: this.admin_password,
    };

    // Show Spinner
    //this.spinner.show();

    // execute http post request
    this.postReq = this.adminService
    .postLogin(body)
    .subscribe((result: any) => {
      // if error then throw error result 
      if(result.error){
        window.scroll(0, 0);
        localStorage.setItem('loginError', result.error);

        this.error = localStorage.getItem('loginError');
        //this.spinner.hide();
        this.router.navigate(['/admin/signin']);
      } 

      // if no error, execute login validation
      else {
        let data = result;

        localStorage.removeItem('loginError');
        localStorage.setItem('loginMessage', 'Login was successful.');
        localStorage.setItem('token', 'Bearer ' + data.token);
        localStorage.setItem('token_authorization', data.token.replace('Bearer ', ''));
        localStorage.setItem('refreshToken', result.refreshToken);
        localStorage.setItem('admin', JSON.stringify({
          _id: result?.teacher._id,
          name: result?.teacher.name,
          email: result?.teacher.email
        }));

        this.adminLoginForm.reset();
        this.message = localStorage.getItem('loginMessage');
        this.adminService.setAdminLogin(true);

        // spinner ends after 2 seconds 
        setTimeout(() => {
          this.spinner.hide();
          this.router.navigate(['/admin/profile']);
        }, 2000);
      }
    },
    // If error in server/api temporary navigate to error page
    (err: any) => {
      this.spinner.hide();
      localStorage.setItem('sessionError', err);
      localStorage.setItem('sessionUrl', this.router.url);
    });    
  }

  // Clear error message
  onAlertClose(): void {
    localStorage.removeItem('loginError');
    localStorage.removeItem('loginMessage');
    this.error   = undefined;
    this.message = undefined;
  }

  

}
