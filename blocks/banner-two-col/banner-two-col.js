export default function decorate(block) {
  const wrapper = block.firstElementChild;
  if (!wrapper) return;

  const children = [...wrapper.children];
  if (children.length >= 2) {
    children[0].classList.add('banner-col-left');
    children[1].classList.add('banner-col-right');
  }
}
