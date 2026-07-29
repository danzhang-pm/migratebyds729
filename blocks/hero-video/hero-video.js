export default async function decorate(block) {
  const row = block.querySelector(':scope > div');
  if (!row) return;

  const cells = [...row.children];
  if (cells.length < 3) return;

  // Cell 0: contains the video source reference
  const videoCell = cells[0];
  const sourceEl = videoCell.querySelector('source');
  const videoSrc = sourceEl ? sourceEl.getAttribute('src') : null;

  // Create video element for background
  if (videoSrc) {
    const video = document.createElement('video');
    video.className = 'hero-video__bg';
    video.setAttribute('playsinline', '');
    video.setAttribute('autoplay', '');
    video.setAttribute('loop', '');
    video.setAttribute('muted', '');
    video.setAttribute('aria-hidden', 'true');
    const source = document.createElement('source');
    source.setAttribute('src', videoSrc);
    source.setAttribute('type', 'video/mp4');
    video.appendChild(source);
    block.prepend(video);

    // Create pause/play button
    const pauseBtn = document.createElement('button');
    pauseBtn.className = 'hero-video-pause';
    pauseBtn.setAttribute('aria-pressed', 'false');
    pauseBtn.setAttribute('aria-label', 'Pause background video');
    pauseBtn.textContent = '❚❚';
    pauseBtn.addEventListener('click', () => {
      const isPaused = video.paused;
      if (isPaused) {
        video.play();
        pauseBtn.setAttribute('aria-pressed', 'false');
        pauseBtn.textContent = '❚❚';
      } else {
        video.pause();
        pauseBtn.setAttribute('aria-pressed', 'true');
        pauseBtn.textContent = '►';
      }
    });
    block.appendChild(pauseBtn);
  }

  // Cell 1: text content — wrap children in structured container
  const textCell = cells[1];

  // Wrap existing children in a div without removing them from cell first
  const textContent = document.createElement('div');
  textContent.className = 'hero-video-text';

  // Move children one by one
  while (textCell.firstChild) {
    textContent.appendChild(textCell.firstChild);
  }
  textCell.appendChild(textContent);
}
