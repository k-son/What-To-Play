import React, {Component} from 'react';
import Button from './Button';
import { ReactComponent as IconBackArrow} from './icons/back-arrow.svg';
import { ReactComponent as IconChoice} from './icons/choice.svg';
import { ReactComponent as IconDices} from './icons/dices.svg';
import { ReactComponent as IconRefresh} from './icons/refresh.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className="App">
        <Button icon={<IconDices />} />
        <Button icon={<IconRefresh />} />
      </div>
    );
  }
}

export default App;
