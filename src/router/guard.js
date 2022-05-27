import userAuthStore from "@/store/auth";

export const requiresGuest = (to, from, next) => {
  const store = userAuthStore();
  const currentUser = store.currentUser;
  if(currentUser) {
    next({
      path: '/private'
    });
  } else {
   store.$reset();
    next();
  }
};

export const requiresAuth = (to, from, next) => {
  const store = userAuthStore();
  const currentUser = store.currentUser;
  if(!currentUser) {
    next({
      path: '/auth',
      query: { redirect: to.fullPath }
    });
  } else {
    next();
  }
};
