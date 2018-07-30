'use strict';

hexo.extend.helper.register('list_posts_by_category', function (options) {
  const categories = this.site.categories;

  if (!categories || !categories.length) {
    return '';
  }
  options = options || {};

  const style = options.hasOwnProperty('style') ? options.style : 'list';
  const orderby = options.orderby || 'date';
  const order = options.order || -1;
  const className = options.class || 'post';
  const transform = options.transform;
  const separator = options.hasOwnProperty('separator') ? options.separator : ', ';
  var result = '';

  //
  // list categories
  categories.forEach(function (category) {
    let posts = category.posts;

    result += `<h1>${category.name}</h1>`;
    result += `<ul class="${className}-list">`;

    // Sort the posts
    posts = posts.sort(orderby, order);

    if (style === 'list') {
      result += `<ul class="${className}-list">`;

      posts.forEach(post => {
        const title = post.title || post.slug;

      result += `<li class="${className}-list-item">`;

      result += `<a class="${className}-list-link" href="${self.url_for(post.path)}">`;
      result += transform ? transform(title) : title;
      result += '</a>';

      result += '</li>';
    });

      result += '</ul>';
    } else {
      posts.forEach((post, i) => {
        if (i) result += separator;

      const title = post.title || post.slug;

      result += `<a class="${className}-link" href="${self.url_for(post.path)}">`;
      result += transform ? transform(title) : title;
      result += '</a>';
    });
    }

    result += '</ul>';
  });
});
