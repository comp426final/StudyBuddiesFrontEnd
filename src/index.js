import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUser, faLock, faCheck, faBook, faPaperPlane, faSearch, faExclamationTriangle, faPlus, faSignInAlt, faBackspace} from '@fortawesome/free-solid-svg-icons'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import {Provider} from 'react-redux'
import reduxThunk from 'redux-thunk';
import reducers from './reducers';
import {createStore, applyMiddleware} from 'redux';
import * as serviceWorker from './serviceWorker';



library.add(faUser);
library.add(faLock);
library.add(faCheck);
library.add(faBook);
library.add(faPaperPlane);
library.add(faGoogle);
library.add(faSearch);
library.add(faExclamationTriangle);
library.add(faPlus);
library.add(faSignInAlt);
library.add(faBackspace);

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
serviceWorker.register();
// ReactDOM.render(<App />, document.getElementById('root'));


