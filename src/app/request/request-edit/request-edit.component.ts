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

  selectedRequest: PeopleRequest;
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
        this.reqId = params['id'];
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
      this.selectedRequest = this.reqServ.getRequest(this.reqId);
      if (this.selectedRequest) {
        reqDate = moment(this.selectedRequest.date);
        reqType = this.selectedRequest.type;
        reqDescr = this.selectedRequest.description;
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
    let requestForSave = new PeopleRequest('0', 0, '', 0, '', 0);
    requestForSave.id = this.reqId;
    requestForSave.date = this.reqForm.get('reqdate').value;
    requestForSave.description = this.reqForm.get('reqdescr').value;
    requestForSave.type = +this.reqForm.get('reqtype').value;

    //find userId
    requestForSave.userId = this.user.id;

    if (this.editMode) {
      //if edit mode, userId, id and _id not change
      requestForSave._id = this.selectedRequest._id;
      requestForSave.userId = this.selectedRequest.userId;
      requestForSave.id = this.selectedRequest.id;
      //update selected request in service
      this.reqServ.updateRequest(this.reqId, requestForSave);
      console.log('update request');
      //update selected request in database
      this.api.updateRequest(requestForSave)
        .subscribe(
          (response) => console.log(response),
          (error) => console.log(error)
        );
    }
    else {
      //add request in
      requestForSave.id = this.reqServ.getNewReqId();
      this.api.createRequest(requestForSave)
        .subscribe(
          (response) => {
            console.log('subscribe for new request');
            console.log(response);
          },
          (error) => console.log(error)
        );

      //add selected request in service
      //this.reqServ.addRequest(requestForSave);
      console.log('create request');
    }
    console.log(requestForSave);
    this.onCancel();
  }

  onCancel() {
    //console.log(this.reqForm.value);
    if (this.editMode){
      this.router.navigate(['../../'], {relativeTo: this.route});
    }
    else this.router.navigate(['../'], {relativeTo: this.route});
  }

  findRequest() {
    //let index = this.reqServ.getIndexRequest(this.selectedRequest);
    this.api.getRequest(this.selectedRequest.id);

  }

}