import {Injectable} from "@angular/core";
import {PeopleRequest} from "../model/people-request";
import {Subject} from "rxjs";
@Injectable()

export class RequestService {
  requestsChanged = new Subject<PeopleRequest[]>();

  private requests: PeopleRequest[] = [
    new PeopleRequest('5c19d5fecf255c6d00000453', 1, '2018-11-08T13:21:18.715Z', 1, 'Обращение за ЖКХ', 1),
    new PeopleRequest('5c19d5fecf255c6d00000454', 2, '2018-11-07T19:01:18.715Z', 2, 'Обращение за пособием на ребенка', 1),
    new PeopleRequest('5c19d5fecf255c6d00000455', 3, '2018-10-11T08:59:18.715Z', 0, 'Обращение за субсидией', 1)
  ];

  setRequests(requests: PeopleRequest[]) {
  this.requests = requests;
  this.requestsChanged.next(this.requests.slice());
}

  getRequests() {
    return this.requests.slice();
  }

  getRequest(id: number) {
    //find request by id - not index array
    return this.requests.find(x => x.id == id);
  }

  getRequestByIndex(index: number) {
    return this.requests[index];
  }

  getIndexRequest(request: PeopleRequest) {
    return this.requests.findIndex(i => i === request)
  }

  addRequest(request: PeopleRequest) {
    //get new id as increment max id from requests array
    //let id = this.getNewReqId();
    //request.id = id;
    this.requests.push(request);
    this.requestsChanged.next(this.requests.slice());
  }

  getNewReqId() {
    //return max+1 id in requests array
    let max = this.requests[0].id;
    for (let i = 1, len = this.requests.length; i < len; i++) {
      let v = this.requests[i].id;
      max = (v > max) ? v : max;
    }
    max++;
    console.log('Get max id in request array = ' + max);
    return max;
  }

  updateRequest(id: number, updRequest: PeopleRequest) {
    //find request by id - not index array
    this.requests.map((req, i) => {
      if (req.id === id) {
        this.requests[i] = updRequest;
      }
    });
    this.requestsChanged.next(this.requests.slice());
  }

  deleteRequest(id: number) {
    let req = this.requests.find(x => x.id === id);

    let index = this.requests.indexOf(req);
    if (index >= 0) {
      this.requests.splice(index, 1);
    }
    else  console.log('Request with id ' + id + ' dont exist.');

    console.log(this.requests);
    this.requestsChanged.next(this.requests.slice());
  }

}