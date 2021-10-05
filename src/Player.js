import React from 'react';
import './ReactVideoPlayer.css';
import './progress.css'


class VideoPlayer extends React.Component {

  constructor(props){
    super(props)
    
    this.state={
      volume :1
    }
  }

  setVolume=()=>{
    document.getElementById('video').volume = this.state.volume
    console.log(this.state.volume);
  }

  

  playPause(){
    let video=document.getElementById('video');
    
    if(video.paused){
      video.play()
      document.getElementById('play').innerHTML = `<i class="fas fa-pause fa-2x"></i>`
    }else{
      video.pause()
      document.getElementById('play').innerHTML = `<i class="fas fa-play fa-2x"></i>`
    }
    


  }
  stopButton(){
    document.getElementById('video').currentTime = 0
    document.getElementById('video').pause()
    document.getElementById('play').innerHTML = `<i class="fas fa-play fa-2x"></i>`
  }

  handleChange(){
    let video=document.getElementById('video');
    let progress = document.getElementById('progress')
    progress.value = video.currentTime/video.duration*100
    
    let hourDigits;
    let minDigits;
    let secondDigits;
    let hour = Math.floor(video.currentTime/3600)
    let min = Math.floor(video.currentTime/60)
    let sec = Math.floor(video.currentTime%60)

    if(hour < 10){
      hourDigits = '0'+String(hour)
    }else{
      hourDigits=hour
    }
    
    if(min < 10){
      minDigits = '0'+String(min)
    }else{
      minDigits=min
    }
    
    if(sec < 10){
      secondDigits = '0'+String(sec)
    }else{
      secondDigits=sec
    }

    document.querySelector('.timestamp').innerHTML=`${hourDigits}:${minDigits}:${secondDigits}`
  }

  handleOnChange=(e)=>{
    const val = e.target.value
    let video=document.getElementById('video');
    video.currentTime = (+val*video.duration)/100
  }


  volumeUp = () => {
    if(this.state.volume < 1 && this.state.volume >=0){
      this.setState((prevState)=>{
        return{
          
          volume:Number((prevState.volume + 0.1).toFixed(2))
        }
      })
    }

    setTimeout(()=>{this.setVolume()},100)

  }
  volumeDown = () => {
    if(this.state.volume <= 1 && this.state.volume > 0){
      this.setState((prevState)=>{
        return{
          
          volume:Number((prevState.volume - 0.1).toFixed(2))
        }
      })
    }
    setTimeout(()=>{this.setVolume()},100)

  }




  render(){

    return(
      <div>
        <p>React Video Player</p>
        <video 
          src="video/gone.mp4"
          poster="img/poster.png"
          id="video"
          className="screen"
          onClick={this.playPause}
          onTimeUpdate={this.handleChange}

        ></video>
        <div className="controlPanel">
          <button onClick={this.playPause} id="play"><i className="fas fa-play fa-2x"></i></button>
          <button onClick={this.stopButton} id="stop"><i className="fas fa-stop fa-2x"></i></button>

          <button  id="vol" onClick={this.volumeUp}><i className="fas fa-volume-off fa-2x"></i></button>
          <button  id="plus" onClick={this.volumeUp}><i className="fas fa-plus"></i></button>
          <span className="volumeLevel">{this.state.volume*10}</span>
          <button  id="minus" onClick={this.volumeDown}><i className="fas fa-minus"></i></button>
  
          <input 
            type="range" 
            id="progress" 
            className="progress" 
            min="0" max="100" 
            step="0.1" 
            defaultValue="0"
            onChange={this.handleOnChange}
          />
          <span className="timestamp">00:00:00</span>
  
        
        </div>
        

      </div>
    )
  }

}

export default VideoPlayer;
