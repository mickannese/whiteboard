import React from 'react';
import * as Tone from 'tone';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      binaural: 0,
      binauralSynth: new Tone.Synth().toDestination(),
      binauralOn: false,
      binauralVolume: -6,
      driver: 144,
      driverSynth: new Tone.Synth().toDestination(),
      driverOn: false,
      driverVolume: -6,
      metronome: 60,

    }
  }

  handleSliderChange(e) {
    this.setState({
      [e.target.name]: Number(e.target.value)
    }, () => {
      if (this.state.driverOn && e.target.name === 'driver') {
        this.changeDriverTone();
      } else if (this.state.binauralOn && e.target.name === 'binaural') {
        this.changeBinaural();
      } else if (e.target.name === 'binauralVolume') {
        this.state.binauralSynth.volume.value = this.state.binauralVolume;
      } else if (e.target.name === 'driverVolume') {
        this.state.driverSynth.volume.value = this.state.driverVolume;
      }

    })
  }

  changeBinaural() {
    const now = Tone.now();
    const val = this.state.driver - this.state.binaural
    this.state.binauralSynth.triggerAttack(`${val}`, now)
  }

  changeDriverTone() {
    const now = Tone.now();
    const bval = this.state.driver - this.state.binaural;
    this.state.driverSynth.triggerAttack(`${this.state.driver}`, now);
    this.state.binauralSynth.triggerAttack(`${bval}`, now);
  }

  buttonBinaural() {
    const now = Tone.now();
    if (this.state.binauralOn) {
      this.state.binauralSynth.triggerRelease(now);
      this.setState({ binauralOn: false })
    } else {
      this.state.binauralSynth.volume.value = this.state.binauralVolume;
      const val = this.state.driver - this.state.binaural
      this.state.binauralSynth.triggerAttack(`${val}`, now)
      this.setState({ binauralOn: true })
    }
  }

  buttonTone() {
    const now = Tone.now();
    if (this.state.driverOn) {
      this.state.driverSynth.triggerRelease(now);
      this.setState({ driverOn: false })
    } else {
      this.state.driverSynth.volume.value = this.state.driverVolume;
      this.state.driverSynth.triggerAttack(`${this.state.driver}`, now);
      this.setState({ driverOn: true })
    }
  }

  render() {
    return (
      <div>
        Make Some Tasty Brain Sounds
        <div>
          <input type="range" name="binaural" max="25" value={this.state.binaural} onInput={this.handleSliderChange.bind(this)}></input> {'Binaural Frequency ' + this.state.binaural}
          <br></br>
          <input type="range" name="binauralVolume" value={this.state.volume} min="-15" max="6" onInput={this.handleSliderChange.bind(this)}></input> {'Binaural Volume ' + this.state.binauralVolume}
          <br></br>
          <input type="range" name="driver" value={this.state.driver} onInput={this.handleSliderChange.bind(this)} min="144" max="600"></input> {'Driving Frequency ' + this.state.driver}
          <br></br>
          <input type="range" name="driverVolume" value={this.state.volume} min="-15" max="6" onInput={this.handleSliderChange.bind(this)}></input> {'Driver Volume ' + this.state.driverVolume}
          <br></br>
          <button type="button" onClick={this.buttonTone.bind(this)}>Driver</button>
          <button type="button" onClick={this.buttonBinaural.bind(this)}>Binaural</button>
        </div>
      </div>
    )
  }
}

export default App;