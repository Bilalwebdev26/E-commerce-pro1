export class ApiResponse {
  constructor(statuscode, data, message) {
    this.statuscode = statuscode < 400;
    this.message = message;
    this.data = data;
  }
}
