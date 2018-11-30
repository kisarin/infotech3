import {Injectable} from "@angular/core";
import {PeopleRequest} from "../model/people-request";
import {Subject} from "rxjs";
import {User} from "../model/user";

@Injectable()
export class UserService {
  private users: User[] = [
    new User(1, 'ircha',  'auth0|5bfe2a265b802c26c099185e','irchatest@mail.ru', 'Ирина', 'Голанова'),
    new User(2, 'marina', 'auth0|5bf68b05216f88072844032f','ircha22@list.ru ', 'Марина', 'Сазонова')
  ];

  setUsers(users: User[]) {
    this.users = users;
  }

  getUsers() {
    return this.users.slice();
  }

  getUserById(id: number) {
    //find user by id - not index array
    return this.users.find(x => x.id == id);
  }

  getUserByToken(token: string) {
    //find user token
    return this.users.find(x => x.tokenId == token);
  }

  getUserFIOById(id: number) {
    let user = this.users.find(x => x.id == id);
    return user.lastName + ' ' + user.firstName;
  }

}

