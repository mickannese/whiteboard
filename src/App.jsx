import React from 'react';
import * as Tone from 'tone';
import DogTag from './DogTag.jsx'
import BGPicker from './TagBG.jsx'

const BGList = ["https://images.unsplash.com/photo-1538370965046-79c0d6907d47?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxleHBsb3JlLWZlZWR8NXx8fGVufDB8fHw%3D&w=1000&q=80", 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8aGVhcnRzfGVufDB8fDB8&ixlib=rb-1.2.1&w=1000&q=80', "https://i.pinimg.com/736x/5f/64/9c/5f649c728fc328958997f3feecbf3a7c.jpg", "https://img.apmcdn.org/9d8714db45a8d7cd2dbc2e193a91681651243462/uncropped/1f6898-20141209-sunshine.jpg"]

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
      pupname: '',
      bgList: BGList,
      selectedBG: BGList[0]

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

  dogNameChange(e) {
    this.setState({
      pupname: e.target.value
    })
  }

  selectBG(bg) {
    this.setState({
      selectedBG: bg
    })
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
        <br></br>
        <input type="text" onChange={this.dogNameChange.bind(this)}></input>
        <DogTag name={this.state.pupname} bg={this.state.selectedBG} />
        <BGPicker list={this.state.bgList} select={this.selectBG.bind(this)} />
      </div>
    )
  }
}

export default App;