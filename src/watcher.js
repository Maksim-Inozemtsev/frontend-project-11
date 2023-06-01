import onChange from 'on-change';

const watchedState = (state, form) => onChange(state, (path, value, previousValue) => {
  const inputField = document.querySelector('#url-input');
  if (path === 'error') {
    inputField.classList.add('is-invalid');
  }
  if (path === 'flows') {
    form.reset();
    form.querySelector('input').focus();
    if (inputField.classList.contains('is-invalid')) {
      inputField.classList.remove('is-invalid');
    }
  }
  if (path === 'feeds') {
    const feedEl = document.createElement('div');
    const lastFeed = value[value.length - 1];
    feedEl.id = lastFeed.id;
    const p1 = document.createElement('p');
    p1.innerHTML = lastFeed.title;
    const p2 = document.createElement('p');
    p2.innerHTML = lastFeed.description;
    feedEl.append(p1);
    feedEl.append(p2);
    const postsContainer = document.createElement('div');
    postsContainer.classList.add('link-container');
    feedEl.append(postsContainer);
    document.body.appendChild(feedEl);
  }
  if (path === 'posts') {
    const lastPost = value[value.length - 1];
    const div = document.getElementById(lastPost.feedID);
    const container = div.querySelector('.link-container');
    const link = document.createElement('a');
    link.classList.add('nav-link');
    link.id = lastPost.id;
    link.href = lastPost.link;
    link.textContent = lastPost.title;
    container.appendChild(link);
  }
});

export default watchedState;
