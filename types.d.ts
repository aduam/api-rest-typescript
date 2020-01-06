declare namespace Express {
  export interface Request {
    userContent: {
      _id: string,
      username: string,
      email: string,
    }
  }
}