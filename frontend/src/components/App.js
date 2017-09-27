import React from 'react';
import {Link} from 'react-router-dom';
import { Progress, Button } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import ContentList from 'components/common/ContentList';
import './App.css';
const App = () => {

    return(
      <div>
          <h2>React-Basic-App</h2>
          <Link to="/board">boardLink</Link>
      </div>
    );
}; 
export default App;