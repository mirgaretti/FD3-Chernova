import React from 'react';
import ReactDOM from 'react-dom';
import DoubleButton from './components/DoubleButton';
import withRainbowFrame from './components/withRainbowFrame';

const colors = ['#ed8805', '#566d05', '#b08152', '#893e0f', '#516a30', '#dc6c74', '#9c0424', '#eb8c50'];
const FramedDoubleButton = withRainbowFrame(colors)(DoubleButton);

class App extends React.Component {
  showAlert = (num) => {
    alert(`Button ${num} pressed!`);
  };

  render() {
    return (
      <div>
        <DoubleButton caption1="однажды" caption2="пору" cbPressed={this.showAlert}>
          в студёную зимнюю
        </DoubleButton>

        <FramedDoubleButton caption1="я из лесу вышел" caption2="мороз" cbPressed={this.showAlert}>
          был сильный
        </FramedDoubleButton>
      </div>
    );
  }
}
ReactDOM.render(<App />, document.getElementById('container'));