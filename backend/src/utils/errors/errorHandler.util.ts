export class errorHandler extends Error {
  status: number;
  constructor(message: string, status = 401) {
    super(message);
    this.name = "errorHandler";
    this.status = status;
  }
}
