// controllers/exampleController.ts

import { Request, Response } from 'express';

class ExampleController {
  public getExample(req: Request, res: Response): void {
    try {
      // Your logic for handling the request goes here
      const data = {
        message: 'This is an example response',
      };

      res.status(200).json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export default new ExampleController();
