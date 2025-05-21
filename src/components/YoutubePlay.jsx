import React, { useEffect, useRef } from 'react';

const YouTubeAutoFullscreen = ({ videoId="GtZcI9dE4yU" }) => {
  const playerContainerRef = useRef(null);
  const playerRef = useRef(null);
  const hasEnteredFullscreen = useRef(false);

  useEffect(() => {
    // 載入YouTube API
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    // 創建YouTube播放器
    window.onYouTubeIframeAPIReady = () => {
      playerRef.current = new window.YT.Player(playerContainerRef.current, {
        height: '100%',
        width: '100%',
        videoId: videoId,
        playerVars: {
          'playsinline': 0,
          'controls': 1,
          'rel': 0,
          'fs': 1,
          'modestbranding': 1,
          'autoplay': 0
        },
        events: {
          'onStateChange': onPlayerStateChange,
          'onReady': onPlayerReady
        }
      });
    };

    // 播放器準備就緒處理函數
    const onPlayerReady = (event) => {
      // 獲取播放器實例
      const player = event.target;
      
      // 設置點擊事件監聽器
      const iframe = playerContainerRef.current.querySelector('iframe');
      if (iframe) {
        iframe.addEventListener('click', () => {
          // 播放影片
          player.playVideo();
          // 只在第一次播放時進入全螢幕
          if (!hasEnteredFullscreen.current) {
            if (player.getIframe) {
              const iframe = player.getIframe();
              if (iframe.requestFullscreen) {
                iframe.requestFullscreen();
              } else if (iframe.webkitRequestFullscreen) {
                iframe.webkitRequestFullscreen();
              } else if (iframe.mozRequestFullScreen) {
                iframe.mozRequestFullScreen();
              } else if (iframe.msRequestFullscreen) {
                iframe.msRequestFullscreen();
              }
              hasEnteredFullscreen.current = true;
            }
          }
        });
      }
    };

    // 播放狀態變化處理函數
    const onPlayerStateChange = (event) => {
      if (event.data === window.YT.PlayerState.PLAYING && !hasEnteredFullscreen.current) {
        const player = event.target;
        if (player.getIframe) {
          const iframe = player.getIframe();
          if (iframe.requestFullscreen) {
            iframe.requestFullscreen();
          } else if (iframe.webkitRequestFullscreen) {
            iframe.webkitRequestFullscreen();
          } else if (iframe.mozRequestFullScreen) {
            iframe.mozRequestFullScreen();
          } else if (iframe.msRequestFullscreen) {
            iframe.msRequestFullscreen();
          }
          hasEnteredFullscreen.current = true;
        }
      }
    };

    // 清理函數
    return () => {
      window.onYouTubeIframeAPIReady = null;
      if (playerRef.current) {
        playerRef.current.destroy();
      }
      hasEnteredFullscreen.current = false;
    };
  }, [videoId]);

  return (
    <div className="youtube-player-container" style={{ width: '100%', height: '100%' }}>
      <div id="youtube-player" ref={playerContainerRef} style={{ width: '100%', height: '100%' }}></div>
    </div>
  );
};

export default YouTubeAutoFullscreen;
