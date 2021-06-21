import { App } from './app';
import { PORT } from './constants/service.constants';

// create an app and start to serve it on PORT
const app = new App();
const application = app.getApplication();
application?.listen(PORT, () => console.info(`Listening on port ${PORT}`));
