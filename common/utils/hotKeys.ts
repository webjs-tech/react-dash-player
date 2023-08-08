import hotkeys from 'hotkeys-js';

export const setupHotKeys = (videoEl: HTMLVideoElement | null) => {
  if (!videoEl) {
    return;
  }
  hotkeys(
    'f,m,j,k,l,c,space,up,down,left,right,0,1,2,3,4,5,6,7,8,9,shift+n,shift+,,shift+.,alt+p,return,.,,',
    (event, handler) => {
      switch (handler.key) {
        case 'f':
          videoEl.requestFullscreen();
          event.preventDefault();
          break;
        case 'm':
          videoEl.muted = !videoEl.muted;
          event.preventDefault();
          break;
        case 'j':
          videoEl.currentTime = Math.max(videoEl.currentTime - 15, 0);
          event.preventDefault();
          break;
        case 'l':
          videoEl.currentTime = videoEl.currentTime + 15;
          event.preventDefault();
          break;
        case 'c':
          // Show/hide subtitles
          if (videoEl instanceof HTMLVideoElement) {
            // TODO: Show/hide subtitles
            const firstTextTrack = videoEl.textTracks[0];
            if (firstTextTrack) {
              firstTextTrack.mode =
                firstTextTrack.mode === 'showing' ? 'disabled' : 'showing';
            }
          }
          event.preventDefault();
          break;
        case 'k':
        case 'space':
          if (videoEl.paused) videoEl.play();
          else videoEl.pause();
          event.preventDefault();
          break;
        case 'up':
          videoEl.volume = Math.min(videoEl.volume + 0.05, 1);
          event.preventDefault();
          break;
        case 'down':
          videoEl.volume = Math.max(videoEl.volume - 0.05, 0);
          event.preventDefault();
          break;
        case 'left':
          videoEl.currentTime = videoEl.currentTime - 5;
          event.preventDefault();
          break;
        case 'right':
          videoEl.currentTime = videoEl.currentTime + 5;
          event.preventDefault();
          break;
        case '0':
          videoEl.currentTime = 0;
          event.preventDefault();
          break;
        case '1':
          videoEl.currentTime = videoEl.duration * 0.1;
          event.preventDefault();
          break;
        case '2':
          videoEl.currentTime = videoEl.duration * 0.2;
          event.preventDefault();
          break;
        case '3':
          videoEl.currentTime = videoEl.duration * 0.3;
          event.preventDefault();
          break;
        case '4':
          videoEl.currentTime = videoEl.duration * 0.4;
          event.preventDefault();
          break;
        case '5':
          videoEl.currentTime = videoEl.duration * 0.5;
          event.preventDefault();
          break;
        case '6':
          videoEl.currentTime = videoEl.duration * 0.6;
          event.preventDefault();
          break;
        case '7':
          videoEl.currentTime = videoEl.duration * 0.7;
          event.preventDefault();
          break;
        case '8':
          videoEl.currentTime = videoEl.duration * 0.8;
          event.preventDefault();
          break;
        case '9':
          videoEl.currentTime = videoEl.duration * 0.9;
          event.preventDefault();
          break;
        case 'shift+n':
          // TODO: turns on the recommended next video
          // navigateNext()
          event.preventDefault();
          break;
        case 'shift+,':
          {
            const newPlaybackRateDecreased = Math.max(
              videoEl.playbackRate - 0.25,
              0.25
            );
            videoEl.playbackRate = newPlaybackRateDecreased;
          }
          event.preventDefault();
          break;
        case 'shift+.':
          {
            const newPlaybackRateIncreased = Math.min(
              videoEl.playbackRate + 0.25,
              2
            );
            videoEl.playbackRate = newPlaybackRateIncreased;
          }
          event.preventDefault();
          break;
        case 'alt+p':
          document.pictureInPictureElement
            ? document.exitPictureInPicture()
            : videoEl.requestPictureInPicture();
          break;
        case 'return':
          // TODO: skips a fragment of the downloaded video
          // func self.skipSegment()
          break;
        case '.':
          videoEl.currentTime += 0.04;
          event.preventDefault();
          break;
        case ',':
          videoEl.currentTime -= 0.04;
          event.preventDefault();
          break;
        default:
          break;
      }
    }
  );
};
