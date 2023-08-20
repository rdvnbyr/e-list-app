import {configureStore} from '@reduxjs/toolkit';
import {pokemonApi} from '../views/auth/_redux/rtk';
import saga from 'redux-saga';
import {rootSaga} from './saga';


const sagaMiddleware = saga();

const store = configureStore({
  reducer: {
    counter: {},
    [pokemonApi.reducerPath]: pokemonApi.reducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
      thunk: false,
    })
      .concat(sagaMiddleware)
      .concat(pokemonApi.middleware),
});

sagaMiddleware.run(rootSaga);

export {store};
