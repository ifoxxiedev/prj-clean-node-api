export class HttpResponse {
  static badRequest (result) {
    return { statusCode: 400, result }
  }

  static serverError (result) {
    return { statusCode: 500, result }
  }
}
