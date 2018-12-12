
import {Injectable} from "@angular/core";
import {Http, Response, Headers, RequestOptions} from "@angular/http";
import { Observable } from 'rxjs';
import {environment} from "../../environments/environment";
import {RequestService} from "../request/request.service";
import {PeopleRequest} from "../model/people-request";

@Injectable()
export class ApiService {

  requestUrl = environment.firebase.databaseURL + '/requests.json';

  constructor(
    private http: Http,
    private reqService: RequestService) { }

  storeRequests() {
    //store requests from RequestService
    console.log('httpDatabase ' + this.requestUrl);
    // let count = this.reqService.getRequests().length;
    // for (let i = 0; i< count; i++) {
    //   this.updateRequest(this.reqService.getRequestByIndex(i));
    // }
    return this.http.put(this.requestUrl, this.reqService.getRequests());
  }

  updateRequest(request: PeopleRequest) {
    let headers = new Headers();
    let index = this.reqService.getIndexRequest(request);
    console.log('Index is = ' + index);
    console.log('Try update request ' + JSON.stringify(request));

    headers.append('Content-Type', 'application/json');
    let url = `${this.requestUrl}/${index}`;
    return this.http.put(url, request);

  }

  createRequest(request) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(request);
    console.log('httpDatabase ' + this.requestUrl + body);
    return this.http.post(this.requestUrl, body, options )
      .map(
        (res: Response) => res.json());
  }

  getRequests() {
    //const httpDatabase = environment.firebase.databaseURL + '/requests.json';
    return this.http.get(this.requestUrl)
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