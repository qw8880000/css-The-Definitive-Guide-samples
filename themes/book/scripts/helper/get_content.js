'use strict';

//
// 如果文件名为index.md，那么在db.json中的post中，有一个字段为slug: index，表示短文件名。
// 这里，我们用slug来作为查询条件。
//
hexo.extend.helper.register('get_content', function (slug, options) {
  const posts = this.site.posts;

  if (!posts) {
    return '';
  }

  if (!slug) {
    throw new Error('get_content: slug is empty!');
  }

  const post = posts.findOne({slug});
  if (!post) {
    console.log('get_content: Can not find post by slug:' + slug);
    return '';
  }

  return post ? post.content : '';
});
