const logger = (store) => (next) => (action) => {
  console.log('Middleware triggered: ', action);
  next(action);
};

export default logger;
