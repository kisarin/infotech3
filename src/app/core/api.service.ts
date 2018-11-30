
import {Injectable} from "@angular/core";
import {Http, Response, Headers} from "@angular/http";
import { Observable } from 'rxjs';
import {environment} from "../../environments/environment";
import {RequestService} from "../request/request.service";
import {PeopleRequest} from "../model/people-request";

@Injectable()
export class ApiService {

  constructor(
    private http: Http,
    private reqService: RequestService) { }

  storeRequests() {
    //store requests from RequestService
    const httpDatabase = environment.firebase.databaseURL + '/requests.json';
    console.log('httpDatabase ' + httpDatabase);
    return this.http.put(httpDatabase, this.reqService.getRequests());
  }

  getRequests() {
    const httpDatabase = environment.firebase.databaseURL + '/requests.json';
    return this.http.get(httpDatabase)
      .map(
        (response: Response) => {
          const requests: PeopleRequest[] = response.json();
          return requests;
        }
      )
      .catch(
        (error: Response) => {
          return Observable.throw("Something went wrong");
        }
      )
      .subscribe(
        (requests: PeopleRequest[]) => {
          this.reqService.setRequests(requests);
        }
      )
      ;
  }

}