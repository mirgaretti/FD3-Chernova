import React from 'react';
import ReactDOM from 'react-dom';
import DoubleButton from './components/DoubleButton';
import withRainbowFrame from './components/withRainbowFrame';

const colors = ['#ed8805', '#566d05', '#b08152', '#893e0f', '#516a30', '#dc6c74', '#9c0424', '#eb8c50'];
const FramedDoubleButton = withRainbowFrame(colors)(DoubleButton);

class App extends React.Component {
  state = {
    isFramed: false,
    caption1: "однажды",
    caption2: "пору",
  };

  handleFirstButtonClick = () => {
    this.setState({
      isFramed: true,
      caption1: "я из лесу",
      caption2: "мороз",
    });
  };

  handleSecondButtonClick = () => {
    this.setState({
      isFramed: false,
      caption1: "однажды",
      caption2: "пору",
    });
  };

  render() {
    const ButtonComponent = this.state.isFramed ? FramedDoubleButton : DoubleButton;

    return (
      <div>
        <ButtonComponent
          caption1={this.state.caption1}
          caption2={this.state.caption2}
          cbPressed={num => {
            if (num === 1) this.handleFirstButtonClick();
            if (num === 2) this.handleSecondButtonClick();
          }}
        >
          {this.state.isFramed ? " вышел, был сильный " : " в студёную зимнюю "}
        </ButtonComponent>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('container'));