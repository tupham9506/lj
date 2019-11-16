export default function ({ store, route, redirect }) {
  let isAuth = !!(store.state.auth && store.state.auth.account);
  switch(route.path) {
    case '/':
      if(isAuth) redirect(`/${store.state.auth.account}`);
      break;
    default:
      if(!isAuth) redirect(`/`);
  }
}