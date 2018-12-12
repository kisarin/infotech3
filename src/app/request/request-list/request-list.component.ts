import {OnInit, Component, OnDestroy} from "@angular/core";
import {PeopleRequest} from "../../model/people-request";
import {RequestService} from "../request.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {ApiService} from "../../core/api.service";
import {UserService} from "../../users/user.service";
import * as moment from 'moment';

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
    //this.api.getRequests();
    this.requests = this.reqService.getRequests();

    this.subscription = this.reqService.requestsChanged.subscribe(
      (requests: PeopleRequest[]) => {
        this.requests = requests;
      }
    );

    //this.requests = this.reqService.getRequests();
  }

  getUserFIO(id: number) {
    return this.userService.getUserFIOById(id);
  }

  onNewRequest() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  onEditRequest(index: number) {
    this.router.navigate([index, 'edit'], {relativeTo: this.route});
  }

  onDeleteRequest(id: number) {
    this.reqService.deleteRequest(id);
    this.requests = this.reqService.getRequests();
  }

  onSaveRequests() {
    this.api.storeRequests()
      .subscribe(
        (response) => console.log(response),
        (error) => console.log(error)
      );
  }

  dateView(str: string) {
    return moment(str).format('DD.MM.YYYY HH:mm');
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}