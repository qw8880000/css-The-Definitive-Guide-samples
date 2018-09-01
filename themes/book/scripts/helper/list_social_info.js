'use strict';

hexo.extend.helper.register('list_social_info', function (options) {
  const social = this.theme.social;

  if (!Array.isArray(social)) {
    return '';
  }
  options = options || {};

  const style = options.hasOwnProperty('style') ? options.style : 'list';
  const className = options.class || 'social';
  // const separator = options.hasOwnProperty('separator') ? options.separator : '| ';
  let result = '';

  if (style === 'list') {
    result += `<ul class="${className}-list">`;
    social.forEach(item => {
      result += `<li class="${className}-list-item">
                    <a class="${className}-list-link" href="${item.link}" title="${item.title}">
                    <i class="${item.icon}"></i>${item.title}
                    </a>
                  </li>`;
    });
    result += '</ul>';
  } else {
    result += `<div class="${className}-list-item">
                    <a class="${className}-list-link" href="${item.link}" title="${item.title}">
                    <i class="${item.icon}"></i>${item.title}
                    </a>
                  </div>`;
  }

  return result;
});
