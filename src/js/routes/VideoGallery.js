import React, { Component } from 'react';
import classNames from "classnames";

import RingButton from '../components/RingButton';

import ReactPlayer from 'react-player';


class VideoGalleryPlayer extends Component {
  constructor(props) {
    super(props);
        
    this.state = {
      url: 'https://www.youtube.com/watch?v=AEBIJRAkujM',
      playing: true,
      volume: 0.8,
      muted: false,
      played: 0,
      loaded: 0,
      duration: 0,
      playbackRate: 1.0,
      loop: false
    }
  }
  
  playPause = () => {
    this.setState({ playing: !this.state.playing })
  }

  stop = () => {
    this.setState({ url: null, playing: false })
  }

  toggleLoop = () => {
    this.setState({ loop: !this.state.loop })
  }

  setVolume = e => {
    this.setState({ volume: parseFloat(e.target.value) })
  }

  toggleMuted = () => {
    this.setState({ muted: !this.state.muted })
  }

  setPlaybackRate = e => {
    this.setState({ playbackRate: parseFloat(e.target.value) })
  }

  onPlay = () => {
    // console.log('onPlay')
    this.setState({ playing: true })
  }

  onPause = () => {
    // console.log('onPause')
    this.setState({ playing: false })
  }

  onSeekMouseDown = e => {
    this.setState({ seeking: true })
  }

  onSeekChange = e => {
    this.setState({ played: parseFloat(e.target.value) })
  }

  onSeekMouseUp = e => {
    this.setState({ seeking: false })
    this.player.seekTo(parseFloat(e.target.value))
  }

  onProgress = state => {
    if (!this.state.seeking) {
      this.setState(state)
    }
  }

  onEnded = () => {
    // console.log('onEnded')
    this.setState({ playing: this.state.loop })
  }

  onDuration = (duration) => {
    // console.log('onDuration', duration)
    this.setState({ duration })
  }

  onClickFullscreen = () => {
    screenfull.request(findDOMNode(this.player))
  }
  
  ref = player => {
    this.player = player
  }
  
  render() {
    const { isOpen, closePlayer } = this.props;
    const { url, playing, volume, muted, loop, played, loaded, duration, playbackRate } = this.state;
        
    const classnames = classNames({
      "video-gallery-player": true,
      "video-gallery-player--open": isOpen
    });
    
    return (
      <div className={classnames}>
        <ReactPlayer
        ref={this.ref}
        url='https://www.youtube.com/watch?v=AEBIJRAkujM'
        playing={isOpen && playing}
        width="100%"
        className="player"
        loop={loop}
        playbackRate={playbackRate}
        volume={volume}
        style={{ paddingBottom: '56.25%' }}
        muted={muted}
        onPlay={this.onPlay}
        onPause={this.onPause}
        onEnded={this.onEnded}
        onProgress={this.onProgress}
        onDuration={this.onDuration}
        config={{
          youtube: {
            playerVars: { 
            	rel: 0, 
            	showinfo: 0, 
            	ecver: 2,
            	modestbranding: 1,
            }
          }
        }}
        />
        <button className="close-button" onClick={() => closePlayer()}><i className="am-icon am-icon-close"></i></button>

        <div className="controls">
          <RingButton onclick={this.playPause}>
            {playing ? (<i className="am-icon am-icon-pause"></i>) : (<i className="am-icon am-icon-play"></i>)}
          </RingButton>
          <RingButton>
            <input id='muted' type='checkbox' checked={muted} onChange={this.toggleMuted} />
            <label htmlFor='muted'>
              <div className="bar barOn"></div>
              <div className="bar barOn"></div>
              <div className="bar barOn"></div>
              <div className="bar barOn"></div>
            </label>
          </RingButton>
          <input 
          type='range'
          min={0}
          max={1}
          step='any'
          value={played}
          onMouseDown={this.onSeekMouseDown}
          onChange={this.onSeekChange}
          onMouseUp={this.onSeekMouseUp}
          />
        </div>
      </div>
    )
  }
}

class VideoGalleryItem extends Component {
    
  constructor(props) {
    super(props);
    
    this.state = {
    }
  }
  
  play = () => {
    this.refs.video.play();
  }
  
  pause = () => {
    this.refs.video.pause();
  }

  render() {

    const classnames = classNames({
      "video-gallery-item": true
    });
    
    const { title, source, onclick } = this.props;
                
    return (
      <div className={classnames} onMouseEnter={this.play} onMouseLeave={this.pause} onClick={() => onclick()}>
          <div className="video-border"></div>
          <div className="legend">
              <h6 className="legend-text">{title}</h6>
          </div>
          <div className="video-btn-out"></div>
          <div className="video-btn-over">
              <div className="video-arrow"/>
          </div>
          <video ref="video" loop>
            <source src={source} type="video/mp4"></source>
          </video>
      </div>
    )
  }
}

export default class VideoGallery extends Component {
    
  constructor(props) {
    super(props);
        
    this.state = {
      playerOpen: false
    }
  }
  
  togglePlayerOpen = () => {
    this.setState({
      playerOpen: !this.state.playerOpen
    });
  }

  render() {

    const classnames = classNames({
      "video-gallery": true
    });
    
    return (
      <div className={classnames}>
        <h1>Videos</h1>
        <div className="video-gallery-grid">
        <VideoGalleryItem title="Trailer 1" source="/assets/img/_videos/videos_bg2.mp4" onclick={this.togglePlayerOpen}/>
        <VideoGalleryItem title="Trailer 2" source="/assets/img/_videos/videos_bg4.mp4" onclick={this.togglePlayerOpen}/>
        <VideoGalleryItem title="Trailer 3" source="/assets/img/_videos/videos_bg5.mp4" onclick={this.togglePlayerOpen}/>
        <VideoGalleryItem title="Trailer 4" source="/assets/img/_videos/videos_bg3.mp4" onclick={this.togglePlayerOpen}/>
        <VideoGalleryItem title="Trailer 5" source="/assets/img/_videos/videos_bg1.mp4" onclick={this.togglePlayerOpen}/>
        <VideoGalleryItem title="Trailer 6" source="/assets/img/_videos/videos_bg0.mp4" onclick={this.togglePlayerOpen}/>
        </div>
        <VideoGalleryPlayer isOpen={this.state.playerOpen} closePlayer={this.togglePlayerOpen}/>
      </div>
    )
  }
}
