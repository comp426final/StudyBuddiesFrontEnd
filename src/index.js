import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUser, faLock, faCheck, faBook, faPaperPlane, faSearch} from '@fortawesome/free-solid-svg-icons'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'

library.add(faUser);
library.add(faLock);
library.add(faCheck);
library.add(faBook);
library.add(faPaperPlane);
library.add(faGoogle);
library.add(faSearch);

ReactDOM.render(<App />, document.getElementById('root'));


