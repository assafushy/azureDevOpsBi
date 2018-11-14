import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import logger from 'redux-logger';
import CircularJSON from 'circular-json';

let store;

const persistedState = localStorage.getItem('storeState') ?
                          JSON.parse(localStorage.getItem('storeState')):
                          {}

store = createStore(rootReducer,persistedState,applyMiddleware(thunk,logger));

store.subscribe(()=>{
  try {
    localStorage.setItem('storeState', JSON.stringify(store.getState()));
  } catch (error) {
    try{
    localStorage.setItem('storeState', CircularJSON.stringify(store.getState()));
    }catch(error){
      localStorage.clear();
    }
  }
});

export default store;