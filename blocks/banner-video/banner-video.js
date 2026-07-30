export default async function decorate(block) {
  const row = block.firstElementChild;
  if (!row) return;

  const cells = [...row.children];
  if (cells.length < 2) return;

  const [leftCell, rightCell] = cells;

  leftCell.classList.add('banner-video-left');
  rightCell.classList.add('banner-video-right');

  // Reorganize left cell content
  const leftContent = document.createElement('div');
  leftContent.className = 'left-content-inner';

  const eyebrow = leftCell.querySelector('.eyebrow');
  const heading = leftCell.querySelector('h2');
  const copy = leftCell.querySelector('.copy');
  const btnContainer = leftCell.querySelector('.button-wrapper, .button-container');

  if (eyebrow) leftContent.appendChild(eyebrow);
  if (heading) leftContent.appendChild(heading);
  if (copy) leftContent.appendChild(copy);
  if (btnContainer) {
    const wrapper = document.createElement('div');
    wrapper.className = 'cta-wrapper';
    wrapper.appendChild(btnContainer);
    leftContent.appendChild(wrapper);
  }

  leftCell.innerHTML = '';
  leftCell.appendChild(leftContent);

  // Reorganize right cell content
  const rightContent = document.createElement('div');
  rightContent.className = 'right-content-inner';

  const video = rightCell.querySelector('video');
  const infoBar = rightCell.querySelector('.info-bar');
  const bottomLink = rightCell.querySelector('.bottom-link');

  if (video) rightContent.appendChild(video);
  if (infoBar) rightContent.appendChild(infoBar);
  if (bottomLink) rightContent.appendChild(bottomLink);

  rightCell.innerHTML = '';
  rightCell.appendChild(rightContent);
}
