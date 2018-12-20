import {OnInit, Component, OnDestroy} from "@angular/core";
import {PeopleRequest} from "../../model/people-request";
import {RequestService} from "../request.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {ApiService} from "../../core/api.service";
import {UserService} from "../../users/user.service";
import * as moment from 'moment';
import {RestService} from "../../core/rest.service";

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html'
})

export class RequestListComponent implements OnInit, OnDestroy {
  requests: PeopleRequest[];
  subscription: Subscription;

  reqTypesDict = [
    {id: 0, value: 'Обращение по телефону'},
    {id: 0, value: 'Обращение по ЕПГУ'},
    {id: 0, value: 'МФЦ'}
  ];

  constructor (private reqService: RequestService, private userService: UserService,
               private route: ActivatedRoute, private router: Router, private api: ApiService) {}

  ngOnInit() {
    this.api.getRequests();
    this.requests = this.reqService.getRequests();

    this.subscription = this.reqService.requestsChanged.subscribe(
      (requests: PeopleRequest[]) => {
        this.requests = requests;
      }
    );
  }

  getUserFIO(id: number) {
    return this.userService.getUserFIOById(id);
  }

  onNewRequest() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  onEditRequest(index: string) {
    this.router.navigate([index, 'edit'], {relativeTo: this.route});
  }

  onDeleteRequest(id: number) {
    this.api.deleteRequest(id)
      .subscribe(
        result => console.log(result),
        error => console.log(error));
    //this.reqService.deleteRequest(id);
    this.requests = this.reqService.getRequests()

  }

  /*onSaveRequests() {
    //for save all requests from list - need create post array http in api
    this.api.storeRequests()
      .subscribe(
        (response) => console.log(response),
        (error) => console.log(error)
      );
  }*/

  onGetServiceRequests() {
    console.log('Service now have ' + this.reqService.getRequests().length + ' requests');
    console.log(this.reqService.getRequests());

  }

  dateView(str: string) {
    return moment(str).format('DD.MM.YYYY HH:mm');
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onGetRequestFromDatebase(id: number) {
    this.api.getRequest(id).subscribe(
      (request: PeopleRequest) => {
        console.log(request);
      }
    );
  }

  onGetRequests(){
    this.api.getRequests();
  }

}