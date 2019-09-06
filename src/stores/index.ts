import UserStore from './UserStore';
import RouterStore from './RouterStore';
import LocationStore from './LocationStore';

export default {
  routerStore: new RouterStore(),
  userStore: new UserStore(),
  locationStore: new LocationStore(),
}
