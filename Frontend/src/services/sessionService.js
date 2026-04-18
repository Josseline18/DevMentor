let currentUser = null;

export const setCurrentUser = (user) => {
  currentUser = user;
};

export const updateCurrentUser = (partialUser) => {
  currentUser = {
    ...(currentUser || {}),
    ...(partialUser || {}),
  };

  return currentUser;
};

export const getCurrentUser = () => currentUser;

export const clearCurrentUser = () => {
  currentUser = null;
};
