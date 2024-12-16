const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
  articleAuthor: Handlebars.compile(document.querySelector('#template-article-author').innerHTML),
  tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
  authorCloudLink: Handlebars.compile(document.querySelector('#template-author-cloud-link').innerHTML)
};

'use strict';

function titleClickHandler(event){
  const clickedElement = this;
  event.preventDefault();

  const activeLinks = document.querySelectorAll('.titles a.active');

  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }

  clickedElement.classList.add('active');

  const activePosts = document.querySelectorAll('.post.active');

  for(let activePost of activePosts){
    activePost.classList.remove('active');
  }
  
  const articleSelector = clickedElement.getAttribute('href');

  let targetArticle = document.querySelector(`[href="${articleSelector}"]`).getAttribute('href');
  targetArticle = targetArticle.substring(1); 

  const activeArticle = document.getElementById(`${targetArticle}`);
  activeArticle.classList.add('active');
}

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optAuthorsListSelector = '.authors.list';

function generateTitleLinks(customSelector = ''){

  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

  let html = '';

  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  for (let article of articles){

    const articleId = article.getAttribute('id');

    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    const linkHTMLData = {id: articleId, title: articleTitle};
    const linkHTML = templates.articleLink(linkHTMLData);

    titleList.insertAdjacentHTML('beforeend',linkHTML);
    html = html + linkHTML;

    const links = document.querySelectorAll('.titles a');

    for(let link of links){
      link.addEventListener('click', titleClickHandler);
    }
  }

}

generateTitleLinks();



const optTagsListSelector = '.tags.list';
const optCloudClassCount = 5;
const optCloudClassPrefix = 'tag-size-';

function calculateTagsParams(tags) {
  const params = {
    min: 999999,
    max: 0
  };

  for (let tag in tags) {
    if (tags[tag] > params.max) {
      params.max = tags[tag];
    }
    if (tags[tag] < params.min) {
      params.min = tags[tag];
    }
  }
  return params;
}

function calculateTagClass(count,params) {
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor( percentage * (optCloudClassCount - 1) + 1 );
  return optCloudClassPrefix + classNumber;
}

function generateTags(){
  let allTags = {};
  const articles = document.getElementsByTagName('article');

  for (let article of articles) {

    let html = '';
    const articleTags = article.getAttribute('data-tags');
    const articleTagsArray = articleTags.split(' ');
    const articleTagList = article.querySelector('div.post-tags ul');
    const tagList = document.querySelector(optTagsListSelector);

    for (let tag of articleTagsArray) {

      const tagLinkHTMLdata = {tag: tag, title: tag};
      const tagLinkHTML = templates.tagLink(tagLinkHTMLdata);
      

      html = html + tagLinkHTML;
      if(!allTags.hasOwnProperty(tag)){
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
    }  

    const tagsParams = calculateTagsParams(allTags);

    const allTagsData = {tags: []};
    for (let tag in allTags) {
      allTagsData.tags.push({
        tag: tag,
        count: allTags[tag],
        className: calculateTagClass(allTags[tag], tagsParams)
      });
    }
    articleTagList.innerHTML = html;
    tagList.innerHTML = templates.tagCloudLink(allTagsData);
  }
}

generateTags();


function tagClickHandler(event){
  event.preventDefault();

  const clickedElement = this;

  const href = clickedElement.getAttribute('href');

  if (!href === href.includes('article')) {
    const tag = href.replace('#tag-', '');

    const generateActiveTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');

    for (let tag of generateActiveTagLinks) {
      tag.classList.remove('active');
    }

    const matchingLinks = document.querySelectorAll(`a[href="${href}"]`);

    for (let tag of matchingLinks) {
      tag.classList.add('active');
    }

    generateTitleLinks('[data-tags~="' + tag + '"]');
  }
}


function addClickListenersToArticleTags(){
  const tagLinks = document.querySelectorAll('article a[href]');
  for (let link of tagLinks) {
    link.addEventListener('click', tagClickHandler);
  }
}

function addClickListenersToCloudTags(){
  const tagLinks = document.querySelectorAll('.list.tags a');
  for (let link of tagLinks) {
    link.addEventListener('click', tagClickHandler);
  }
}

addClickListenersToArticleTags();
addClickListenersToCloudTags();

function generateAuthors(){
  const articles = document.querySelectorAll(optArticleSelector);
  const authorList = document.querySelector(optAuthorsListSelector);
  let allTags = {};
  for (let article of articles) {

    let html = '';
    const authorTag = article.getAttribute('data-author');
    const articleAuthorElement = article.querySelector('p');
    const authorTagHTMLdata = {author: authorTag};
    const authorTagHTML = templates.articleAuthor(authorTagHTMLdata);
    html = html + authorTagHTML;

    if(!allTags.hasOwnProperty(authorTag)){
      allTags[authorTag] = 1;
    } else {
      allTags[authorTag]++;
    }
    const tagsParams = calculateTagsParams(allTags);

    const allAuthorsData = {authors: []};

    for (let author in allTags) {
      const authorLink = author.replace(' ','-').toLowerCase();
      allAuthorsData.authors.push({
        link: authorLink,
        linkName: author,
        count: allAuthorsData[authorLink],
        className: calculateTagClass(allTags[author],tagsParams)
      });
    }

    articleAuthorElement.innerHTML = html;
    authorList.innerHTML = templates.authorCloudLink(allAuthorsData);
  }

  
}

generateAuthors();

function authorClickHandler(event){
  event.preventDefault();

  const clickedElement = this;

  const href = clickedElement.getAttribute('href');
  const authorName = clickedElement.innerHTML;

  if (!href === href.includes('article')) {

    const generateActiveAuthorLinks = document.querySelectorAll(`.list.authors a.active`);

    for (let author of generateActiveAuthorLinks) {
      author.classList.remove('active');
    }

    const matchingLinks = document.querySelectorAll(`.list.authors a[href="${href}"]`);

    for (let author of matchingLinks) {
      author.classList.add('active');
    }

    generateTitleLinks(`[data-author="${authorName}"]`);

  }
}

function addClickListenersToAuthors(){
  const authorLinks = document.querySelectorAll('.list.authors a');
  for (let link of authorLinks) {
    link.addEventListener('click', authorClickHandler);
  }
}

addClickListenersToAuthors();