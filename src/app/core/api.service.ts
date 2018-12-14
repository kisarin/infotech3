
import {Injectable} from "@angular/core";
import {Http, Response, Headers, RequestOptions} from "@angular/http";
import { Observable } from 'rxjs';
import {environment} from "../../environments/environment";
import {RequestService} from "../request/request.service";
import {PeopleRequest} from "../model/people-request";

//import  * as cors from "cors";

import * as cors from 'cors';


import * as moment from 'moment';

//https://infotech-test.firebaseio.com/requests/0
//https://infotech-test.firebaseio.com/requests.json/2'

@Injectable()
export class ApiService {

  requestUrl = 'https://infotechtest-1f7b.restdb.io/rest/requests';
    //environment.firebase.databaseURL + '/requests';

  headerDict = {
  'Content-Type': 'application/json',
  'x-apikey': 'e7955371df2a2308c011f6cf91c5edfc9b816',
  'Accept': 'application/json',
  //'Access-Control-Allow-Headers': 'Content-Type',
  //'Access-Control-Allow-Origin': 'localhost:4200',
  //'Access-Control-Allow-Methods': 'HEAD, GET, POST, PUT, PATCH, DELETE'
};

  requestOptions = { headers: new Headers(this.headerDict) };

  constructor(
    private http: Http,
    private reqService: RequestService) { }

  storeRequests() {
    //store requests from RequestService
    //console.log('httpDatabase ' + this.requestUrl);
    //let url = 'https://infotechtest-1f7b.restdb.io/rest/'+ 'requests';
    console.log('url = ' + this.requestUrl);
    let reqJson =  JSON.stringify(this.reqService.getRequests());
    console.log('reqJson = ' + reqJson);
    return this.http.put(this.requestUrl, reqJson, this.requestOptions);
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
      .catch(this.handleError)
      .subscribe(
        (requests: PeopleRequest[]) => {
          this.reqService.setRequests(requests);
        }
      );
  }

  getRequest(id: number) {
    // let headers = new Headers({ 'Content-Type': 'application/json' });
    // let options = new RequestOptions({ headers: headers });
    // const corsHandler = cors({origin: true});

    let url = `${this.requestUrl}?q={"id":${id}}`;
    return this.http.get(url, this.requestOptions)
      .map(
        (response: Response) => {
          const request: PeopleRequest = response.json();
          return request;
        }
      )
      .catch(this.handleError)
      .subscribe(
        (request: PeopleRequest) => {
          console.log(request);
        }
      );

  }

  private handleError(error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}