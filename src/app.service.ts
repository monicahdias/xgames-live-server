import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getAppStatus(): string {
    return 'Server is running! 🚀\n Please check https://xgames-live-server.herokuapp.com/api for Swagger docs...';
  }
}
