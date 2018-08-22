'use strict';

//
// 如果文件名为index.md，那么在db.json中的post中，有一个字段为slug: index，表示短文件名。
// 这里，我们用slug来作为查询条件。
//
hexo.extend.helper.register('post_link', function (slug, options) {
  const posts = this.site.posts;
  const root = this.config.root;

  if (!posts) {
    return '';
  }

  if (!slug) {
    throw new Error('post_link: slug is empty!');
  }

  options = options || {};

  const post = posts.findOne({slug});
  if (!post) {
    console.log('post_link: Can not find post by slug:' + slug);
    return '';
  }

  const title = options.title ? options.title : post.title;

  return `<a href="${root}${post.path}" title="${title}">${title}</a>`;
});
