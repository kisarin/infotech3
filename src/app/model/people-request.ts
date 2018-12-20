export class PeopleRequest {
  public _id: string;
  public id: number;
  public date: string;
  public type: number;
  public description: string;
  public userId: number;

  constructor(_id: string, id: number, date: string, type: number, description: string, userId: number) {
    this._id = _id;
    this.id = id;
    this.date = date;
    this.type = type;
    this.description = description;
    this.userId = userId;
  }
}