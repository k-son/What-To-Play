import React, {Component} from 'react';
import Button from './Button';
import Display from './Display';
import { ReactComponent as IconBackArrow} from './icons/back-arrow.svg';
import { ReactComponent as IconChoice} from './icons/choice.svg';
import { ReactComponent as IconDices} from './icons/dices.svg';
import { ReactComponent as IconRefresh} from './icons/refresh.svg';
import './App.css';

class App extends Component {
  static defaultProps = {
    songs: [  
    'About a girl',
    'Born to be wild',
    'Creep',
    'Jolene',
    'Lake Of Fire',
    'Personal Jesus',
    'Rape Me',
    'Seven Nation Army',
    'The man who sold the world',
    'Where did you sleep last night',
    'Zombie',
    'Bad romance'
    ]
  }

  constructor(props) {
    super(props);
    this.state = {
      songs: this.props.songs,
      currentSong: 'O baby baby'
    };
  }

  render() {
    return(
      <div className="App">
        <ul className="App-list">
          {[...this.state.songs]
            .sort((a, b) => a > b ? 1 : -1)
            .map(item => <li key={item}>{item}</li>
          )}
        </ul>
        <Display song={this.state.currentSong} />
        <Button icon={<IconDices />} />
        <Button icon={<IconRefresh />} />
        <Button icon={<IconBackArrow />} />
        <Button icon={<IconChoice />} />
      </div>
    );
  }
}

export default App;
