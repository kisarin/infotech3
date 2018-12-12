import {Component, OnInit} from "@angular/core";
import {PeopleRequest} from "../../model/people-request";
import {ActivatedRoute, Router, Params} from "@angular/router";
import {RequestService} from "../request.service";
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {UserService} from "../../users/user.service";
import {AuthService} from "../../auth/auth.service";
import {User} from "../../model/user";
import * as moment from 'moment';
import {ApiService} from "../../core/api.service";

@Component({
  selector: 'app-request-edit',
  templateUrl: './request-edit.component.html',
})

export class RequestEditComponent implements OnInit{
  //for date
  options: any = {format: 'DD.MM.YYYY HH:mm', showClear: true};

  request: PeopleRequest;
  editMode = false;
  reqId: number;
  user: User;

  profile: any;

  reqTypesDict = [
    {id: 0, value: 'Обращение по телефону'},
    {id: 1, value: 'Обращение по ЕПГУ'},
    {id: 2, value: 'МФЦ'}
  ];
  reqForm: FormGroup;

  constructor ( private route: ActivatedRoute, private router: Router,
                private reqServ: RequestService, private userServise: UserService,
                private api: ApiService,
                private auth: AuthService) {}

  ngOnInit() {

    this.route.params.subscribe(
      (params: Params) => {
        this.reqId = +params['id'];
        this.editMode = params['id'] != null;
        this.initProfile();

      });
  }

  initProfile() {
    let sub = '';
    if (this.auth.userProfile) {
      this.profile = this.auth.userProfile;
      sub = this.profile.sub;
      console.log('1 Req Init get profile from auth.userProfile ' + sub);
    } else {
      this.auth.getProfile((err, profile) => {
        this.profile = profile;
        sub = this.profile.sub;
        console.log('2 Req Init get profile from auth.getProfile ' + sub);
        this.findUser();
      });
    }
    console.log('initForm start');
    this.initForm();
  }

  initForm() {
    //this.findUser();
    let reqDate = moment(Date.now());
    let reqType = 0;
    let reqDescr = '';
    if (this.editMode) {
      this.request = this.reqServ.getRequest(this.reqId);
      if (this.request) {
        reqDate = moment(this.request.date);
        reqType = this.request.type;
        reqDescr = this.request.description;
      }
    }
    this.reqForm = new FormGroup({
      'reqdate': new FormControl(reqDate, Validators.required),
      'reqtype': new FormControl(reqType),
      'reqdescr': new FormControl(reqDescr)});


    console.log('initForm end');
    this.findUser();
  }



  findUser() {
    console.log('findUser');
    if (this.profile) {
      this.user = this.userServise.getUserByToken(this.profile.sub);
    } else {
      console.log('User not found.');
      //this.user = this.userServise.getUserById(1);
    }
  }


  onSubmit() {
    const request = new PeopleRequest(0, '', 0, '', 0);
    request.id = this.reqId;
    request.date = this.reqForm.get('reqdate').value;
    request.description = this.reqForm.get('reqdescr').value;
    request.type = +this.reqForm.get('reqtype').value;

    //find userId
    request.userId = this.user.id;

    if (this.editMode) {
      //if edit mode, userId not change
      request.userId = this.request.userId;
      this.reqServ.updateRequest(this.reqId, request);
    }
    else {
      this.reqServ.addRequest(request);
    }
    console.log(request);

    this.api.storeRequests()
      .subscribe(
        (response) => console.log(response),
        (error) => console.log(error)
      );

    this.onCancel();
  }

  onCancel() {
    //console.log(this.reqForm.value);
    if (this.editMode){
      this.router.navigate(['../../'], {relativeTo: this.route});
    }
    else this.router.navigate(['../'], {relativeTo: this.route});
  }

}