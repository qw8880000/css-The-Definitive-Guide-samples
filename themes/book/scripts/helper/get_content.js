'use strict';

hexo.extend.helper.register('get_content', function (name, options) {
  const posts = this.site.posts;

  if (!posts) {
    return '';
  }

  name = name || 'index';

  //
  // 如果文件名为index.md，那么在db.json中的post中，有一个字段为slug: index，表示短文件名。
  // 这里，我们用slug来作为查询条件。
  //
  const query = {
    slug: name,
  };
  const post = posts.findOne(query);

  return post ? post.content : '';
});
