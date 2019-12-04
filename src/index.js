import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUser, faLock, faCheck, faBook } from '@fortawesome/free-solid-svg-icons'

library.add(faUser);
library.add(faLock);
library.add(faCheck);
library.add(faBook);

ReactDOM.render(<App />, document.getElementById('root'));


