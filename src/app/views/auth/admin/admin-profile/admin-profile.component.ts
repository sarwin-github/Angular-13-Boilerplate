import { 
  Component, 
  OnInit, 
  OnDestroy 
} from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../../../../shared/services/auth/admin/admin.service';
import { mainAnimations } from '../../../../shared/animations/main-animations';
import { Subscription } from 'rxjs';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'admin-profile',
  animations: [mainAnimations],
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.scss']
})
export class AdminProfileComponent implements OnInit {
  private req? : Subscription;
  public loading: boolean = true;
  public admin_data: any = {};

  constructor(private router:Router, 
    private spinner: NgxSpinnerService,
    private adminService: AdminService) { }

  ngOnInit(): void {
    this.getAdminProfile();
  }

  ngOnDestroy(): void {
    if(this.req) this.req.unsubscribe();
  }

  getAdminProfile(): void {
    //this.spinner.show()
    // show spinner
    this.req = this.adminService.getAdminProfile()
    .subscribe((result: any) => {
      setTimeout(() => {
        this.loading = false;
        this.admin_data = result;
      }, 2000);
    },
    // If error in server/api temporary navigate to error page
    (err: any) => {
      //this.spinner.hide();
      localStorage.setItem('sessionError', err);
      localStorage.setItem('sessionUrl', this.router.url);
      this.adminService.logoutAdmin();
    });   
  }

  
}
