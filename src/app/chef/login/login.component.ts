import {Component, Inject, OnInit} from '@angular/core';
import {Chef} from "../../dto/chef";
import {Router} from "@angular/router";
import {DataService} from "../../shared/services/data.service";
import {MatDialog} from "@angular/material/dialog";
import {DialogComponent} from "../../shared/dialog/dialog.component";
import {SESSION_STORAGE, WebStorageService} from "ngx-webstorage-service";
import {LoginService} from "../../shared/services/login.service";
import {ChefService} from "../../shared/services/chef.service";
import {MyErrorHandler} from "../../shared/error/my-error-handler";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../../app.component.css']
})
export class LoginComponent extends MyErrorHandler implements OnInit {

  chef = new Chef();
  isLoggingIn = true;
  passwordRepeat: string;
  loading: boolean;
  passwordsUnequal: boolean;

  constructor(private router: Router, private loginService: LoginService, private chefService: ChefService,
              private dataService: DataService, public dialog: MatDialog,
              @Inject(SESSION_STORAGE) private storage: WebStorageService) {
    super();
  }

  ngOnInit() {
    if (this.storage.get('loggedIn') === true) {
      this.loading = true;
      this.getChef(this.storage.get('userId'));
    }
  }

  getChef(chefId: number) {
    this.chefService.getChef(chefId).subscribe(chef => {
      this.loginService.login(chef).subscribe(() => {
        this.loginSucces(chef);
      }, error => {
        this.loading = false;
        console.error(error);
      });
    }, error => {
      this.loading = false;
      console.error(error);
    });
  }

  login(formvalid: any) {
    if (!formvalid) {
      return;
    }
    this.loading = true;
    this.loginService.login(this.chef).subscribe(data => {
      this.storage.set('loggedIn', true);
      this.storage.set('userId', data.id);
      this.storage.set('access_token', data.token);
      this.loginSucces(data);
    }, error => {
      this.loading = false;
      this.openDialog('Login failed', 'Email or password incorrect');
      console.error(error);
    });
  }

  loginSucces(chef: Chef) {
    this.dataService.setChef(chef);
    if (chef.passwordReset) {
      this.navigateToPasswordChange();
    } else {
      this.navigateToCookbook();
    }
  }

  signUp(formvalid: any) {
    if (!this.validateChef(this.chef) || !formvalid) {
      return;
    }

    this.loading = true;
    this.chef.emailNotifications = true;

    this.loginService.register(this.chef).subscribe(data => {
        this.openDialog('', 'Account created!');
        this.dataService.setChef(data);
        this.storage.set('loggedIn', true);
        this.storage.set('userId', data.id);
        this.storage.set('access_token', data.token);
        this.navigateToCookbook();
      },
      error => {
        let errorText = 'Oh no. Account could not be created';
        //TODO: check error message instead of error statuscode
        if (error.error.status === 418) {
          errorText = 'Chef name already in use';
          //errorText = error.error.message.replace('UserNotUniqueException: ', '');
        } else if (error.error.status === 417 || error.error.status === 500) {
          errorText = 'Email already in use';
        }
        this.loading = false;
        console.error(error);
        this.openDialog('Error occurred', errorText);
      });
  }

  validateChef(chef: Chef) {
    if (chef.password !== this.passwordRepeat) {
      this.passwordsUnequal = true;
      return false;
    }
    this.passwordsUnequal = false;
    return true;
  }

  openDialog(title: string, message: string) {
    this.dialog.open(DialogComponent, {
      width: '250px',
      data: {title, message}
    });
  }

  toggleDisplay() {
    this.isLoggingIn = !this.isLoggingIn;
  }

  navigateToCookbook() {
    this.router.navigate(['/cookbook']);
  }

  navigateToPasswordReset() {
    this.router.navigate(['/reset-password']);
  }

  navigateToPasswordChange() {
    this.router.navigate(['/change-password/false']);
  }

}
