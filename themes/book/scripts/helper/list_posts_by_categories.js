'use strict';

hexo.extend.helper.register('list_posts_by_categories', function (options) {
  const categories = this.site.categories;

  if (!categories || !categories.length) {
    return '';
  }
  options = options || {};

  const style = options.hasOwnProperty('style') ? options.style : 'list';
  const orderby = options.orderby || 'date';
  const order = options.order || -1;
  const className = options.class || 'post';
  const separator = options.hasOwnProperty('separator') ? options.separator : ', ';
  var result = '';
  const self = this;

  //
  // list categories
  categories.forEach(category => {
    let posts = category.posts;

    result += `<div class="${className}-wrapper">`;
    result += `<h1 class="${className}-title">${category.name}</h1>`;

    // Sort the posts
    posts = posts.sort(orderby, order);

    if (style === 'list') {
      result += `<ul class="${className}-list">`;

      posts.forEach(post => {

        // console.log(post)  //canonical_path
        result += `<li class="${className}-list-item">`;
        result += `<a class="${className}-list-link" href="${post.canonical_path}">`;
        result += post.title;
        result += '</a>';
        result += '</li>';
      });

      result += '</ul>';
      result += '</div>';
    }
  });

  return result;
});
