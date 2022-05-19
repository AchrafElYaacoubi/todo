import { history } from '../store';

export function pushTo(route) {
  return history.push(route);
}
