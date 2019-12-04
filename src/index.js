import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUser, faLock, faCheck } from '@fortawesome/free-solid-svg-icons'

library.add(faUser);
library.add(faLock);
library.add(faCheck);

ReactDOM.render(<App />, document.getElementById('root'));


