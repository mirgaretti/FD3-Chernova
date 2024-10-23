import React from 'react';
import ReactDOM from 'react-dom';
import RainbowFrame from './components/RainbowFrame';

class App extends React.Component {
  render() {
    let colors = ['#ed8805', '#566d05', '#b08152', '#893e0f', '#516a30', '#dc6c74', '#9c0424', '#eb8c50'];
    return (
      <RainbowFrame colors={colors}>
        Hello!
      </RainbowFrame>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('container'));
