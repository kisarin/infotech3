
import {Injectable} from "@angular/core";
import {Http, Response, Headers, RequestOptions} from "@angular/http";
import { Observable } from 'rxjs';
import {environment} from "../../environments/environment";
import {RequestService} from "../request/request.service";
import {PeopleRequest} from "../model/people-request";

@Injectable()
export class ApiService {

  httpDatabaseReq = environment.firebase.databaseURL + '/requests.json';

  constructor(
    private http: Http,
    private reqService: RequestService) { }

  storeRequests() {
    //store requests from RequestService
    console.log('httpDatabase ' + this.httpDatabaseReq);
    return this.http.put(this.httpDatabaseReq, this.reqService.getRequests());
  }

  updateRequest() {

  }

  createRequest(request) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(request);
    console.log('httpDatabase ' + this.httpDatabaseReq + body);
    return this.http.post(this.httpDatabaseReq, body, options )
      .map(
        (res: Response) => res.json());
  }

  getRequests() {
    //const httpDatabase = environment.firebase.databaseURL + '/requests.json';
    return this.http.get(this.httpDatabaseReq)
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
      );
  }

}