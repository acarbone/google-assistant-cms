import ContentController from './controller/content.controller';
import App from './app';

new App([
  new ContentController()
], process.env.PORT || 80);
