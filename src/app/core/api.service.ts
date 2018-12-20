
import {Injectable} from "@angular/core";
import {Http, Response, Headers, RequestOptions} from "@angular/http";
import { Observable } from 'rxjs';
import {environment} from "../../environments/environment";
import {RequestService} from "../request/request.service";
import {PeopleRequest} from "../model/people-request";


@Injectable()
export class ApiService {

  requestUrl = environment.restdb.databaseUrl + '/requests';
    //environment.firebase.databaseURL + '/requests';

  headerDict = {
  'Content-Type': 'application/json',
  'x-apikey': 'e7955371df2a2308c011f6cf91c5edfc9b816',
  'Accept': 'application/json',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Origin': 'localhost:4200',
  'Access-Control-Allow-Methods': 'HEAD, GET, POST, PUT, PATCH, DELETE'
};

  requestOptions = { headers: new Headers(this.headerDict) };

  constructor(
    private http: Http,
    private reqService: RequestService) { }

  storeRequests() {
    //store all requests from RequestService
    console.log('url = ' + this.requestUrl);
    let reqJson =  JSON.stringify(this.reqService.getRequests());
    console.log('reqJson = ' + reqJson);
    return this.http.put(this.requestUrl, reqJson, this.requestOptions);
  }

  updateRequest(request: PeopleRequest) {
    console.log('Try update request ' + JSON.stringify(request));
    let url = `${this.requestUrl}/${request._id}`;
    return this.http.put(url, request, this.requestOptions);

  }

  createRequest(request: PeopleRequest) {
    //add in restdb object without _id property - so restdb can use her _id
    let newRequest : {id: number, date: string, type: number, description: string, userId: number};
    newRequest = {id: request.id, date: request.date, type: request.type, description: request.description, userId: request.userId};
    console.log(newRequest);

    let body = JSON.stringify(newRequest);
    console.log('httpDatabase ' + body);
    console.log('body = ' + this.requestUrl);
    return this.http.post(this.requestUrl, body, this.requestOptions )
      .map(
        (res: Response) => {
          //res.json();
          console.log('add new request from res _id = ' + res.json()._id);
          request._id = res.json()._id;
          this.reqService.addRequest(request);
        })
      .catch(this.handleError);
  }

  getRequests() {
    //const httpDatabase = environment.firebase.databaseURL + '/requests.json';
    return this.http.get(this.requestUrl, this.requestOptions)
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
          console.log('Get request from DB');
          console.log(requests);
        }
      );
  }

  getRequest(id: number) {
    //get request by id
    console.log('Try find request from BD by id');
    let url = `${this.requestUrl}?q={"id": ${id}}`;
    return this.http.get(url, this.requestOptions)
      .map(
        (response: any) => {
          //console.log(response);
          //const request: PeopleRequest = response.json();
          let json = response.json();
          const request: PeopleRequest = json[0];
          //const request = Object.keys(response).map(key => response[key]);
           //console.log('request 1');
           //console.log(request);
           //console.log('descript ' + request.description);

          //console.log('request');
          //console.log(request);
          return request;
        }
      )
      .catch(this.handleError);

  }

  deleteRequest(id: number) {
    let deletedRequest = this.reqService.getRequest(id);
    let url = `${this.requestUrl}/${deletedRequest._id}`;
    console.log('Try delete request with id = ' + id + ' in url ' + url);
    console.log(deletedRequest);
    return this.http.delete(url, this.requestOptions)
      .map(
        (response: Response) => {
          console.log(response.json());
          this.reqService.deleteRequest(id);
        }
      )
      .catch(this.handleError);
  }

  private handleError(error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    return Observable.throw(errMsg);
  }



}