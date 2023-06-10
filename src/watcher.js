import onChange from 'on-change';

const watchedState = (initialState, form, textLib) => onChange(initialState, (path, value) => {
  const feedback = document.querySelector('.feedback');

  if (path === 'form.error') {
    const inputField = document.getElementById('url-input');
    if (value !== null) {
      if (feedback.classList.contains('text-success')) {
        feedback.classList.replace('text-success', 'text-danger');
      }
      inputField.classList.add('is-invalid');
    } else {
      if (feedback.classList.contains('text-danger')) {
        feedback.classList.replace('text-danger', 'text-success');
      }
      inputField.classList.remove('is-invalid');
    }
    feedback.innerHTML = value;
  }

  if (path === 'flows') {
    form.reset();
    form.querySelector('input').focus();
    if (feedback.classList.contains('text-danger')) {
      feedback.classList.replace('text-danger', 'text-success');
    }
  }

  if (path === 'feeds') {
    feedback.innerHTML = textLib.t('successLoad');
    const feedsContainer = document.querySelector('.feeds');
    if (feedsContainer.childNodes.length === 0) {
      const div11 = document.createElement('div');
      div11.classList.add('card', 'border-0');
      const div12 = document.createElement('div');
      div12.classList.add('card-body');
      const feedsTitle = document.createElement('h2');
      feedsTitle.classList.add('card-title', 'h4');
      feedsTitle.innerHTML = textLib.t('feedsTitle');
      div12.appendChild(feedsTitle);
      div11.appendChild(div12);
      const ul1 = document.createElement('ul');
      ul1.classList.add('list-group', 'border-0', 'rounded-0');
      div11.appendChild(ul1);
      feedsContainer.appendChild(div11);
    }
    const feedEl = document.createElement('li');
    const lastFeed = value[value.length - 1];
    feedEl.id = lastFeed.id;
    feedEl.classList.add('list-group-item', 'border-0', 'border-end-0');
    const feedTitle = document.createElement('h3');
    feedTitle.classList.add('h6', 'm-0');
    feedTitle.innerHTML = lastFeed.title;
    const feedDescr = document.createElement('p');
    feedDescr.classList.add('m-0', 'small', 'text-black-50');
    feedDescr.innerHTML = lastFeed.description;
    feedEl.appendChild(feedTitle);
    feedEl.appendChild(feedDescr);
    const feedUl = feedsContainer.querySelector('ul');
    feedUl.appendChild(feedEl);
  }

  if (path === 'posts') {
    const postsContainer = document.querySelector('.posts');
    if (postsContainer.childNodes.length === 0) {
      const div21 = document.createElement('div');
      div21.classList.add('card', 'border-0');
      const div3 = document.createElement('div');
      div3.classList.add('card-body');
      const postsTitle = document.createElement('h2');
      postsTitle.classList.add('card-title', 'h4');
      postsTitle.innerHTML = textLib.t('postsTitle');
      div3.appendChild(postsTitle);
      div21.appendChild(div3);
      const ul2 = document.createElement('ul');
      ul2.classList.add('list-group', 'border-0', 'rounded-0');
      div21.appendChild(ul2);
      postsContainer.appendChild(div21);
    }
    const postEl = document.createElement('li');
    const lastPost = value[value.length - 1];
    postEl.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'border-0', 'border-end-0');
    const link = document.createElement('a');
    link.href = lastPost.link;
    link.setAttribute('class', 'fw-bold');
    link.setAttribute('data-id', lastPost.id);
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener noreferrer');
    link.textContent = lastPost.title;
    const button = document.createElement('button');
    button.classList.add('btn', 'btn-outline-primary', 'btn-sm');
    button.setAttribute('type', 'button');
    button.setAttribute('data-id', lastPost.id);
    button.setAttribute('data-bs-toggle', 'modal');
    button.setAttribute('data-bs-target', '#modal');
    button.innerHTML = textLib.t('btnSm');
    postEl.appendChild(link);
    postEl.appendChild(button);
    const postUl = postsContainer.querySelector('ul');
    postUl.appendChild(postEl);
  }

  if (path === 'activePost') {
    const activePost = initialState.posts.find((p) => p.id === value);
    const modalTitle = document.querySelector('.modal-title');
    modalTitle.innerHTML = activePost.title;
    const modalBody = document.querySelector('.modal-body');
    modalBody.innerHTML = activePost.description;
    const openFull = document.querySelector('.full-article');
    openFull.href = activePost.link;
  }

  if (path === 'seenPosts') {
    const newSeenPostId = value[value.length - 1];
    const newSeenPost = document.querySelector(`[data-id="${newSeenPostId}"]`);
    newSeenPost.classList.replace('fw-bold', 'fw-normal');
    newSeenPost.classList.add('link-secondary');
  }
});

export default watchedState;
