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
  optTitleListSelector = '.titles';

function generateTitleLinks(){

  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

  let html = '';

  const articles = document.querySelectorAll(optArticleSelector);
  for (let article of articles){

    const articleId = article.getAttribute('id');

    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    const linkHTML = `<li><a href="#${articleId}"><span>${articleTitle}</span></a></li>`;

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

function generateTags(){
  let allTags = [];
  const articles = document.getElementsByTagName('article');

  for (let article of articles) {

    let html = '';
    const articleTags = article.getAttribute('data-tags');
    const articleTagsArray = articleTags.split(' ');
    const tagList = article.querySelector('div.post-tags ul');

    for (let tag of articleTagsArray) {

      const linkTagHtml = `<li><a href="#tag-${tag}">${tag}&nbsp;</a></li>`;

      html = html + linkTagHtml;
      if(allTags.indexOf(linkTagHtml) == -1){
        /* [NEW] add generated code to allTags array */
        allTags.push(linkTagHtml);
      }
    }  
    tagList.innerHTML = html;
    const tagListTest = document.querySelector(optTagsListSelector);
    tagListTest.innerHTML = allTags.join(' ');
  }
}

generateTags();

function tagClickHandler(event){
  event.preventDefault();

  const clickedElement = this;

  const href = clickedElement.getAttribute('href');

  const generateActiveTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');

  for (let tag of generateActiveTagLinks) {
    tag.classList.remove('active');
  }

  const matchingLinks = document.querySelectorAll(`a[href="${href}"]`);

  for (let tag of matchingLinks) {
    tag.classList.add('active');
  }  
}
const tagLinks = document.querySelectorAll('article a[href]');
for (let link of tagLinks) {
  link.addEventListener('click', tagClickHandler);
}


function addClickListenersToTags(){
  const tagLinks = document.querySelectorAll('article a[href]');
  for (let link of tagLinks) {
    link.addEventListener('click', tagClickHandler);
  }
}



function generateAuthors(){
  const articles = document.getElementsByTagName('article');

  for (let article of articles) {

    let html = '';
    const authorTag = article.getAttribute('data-author');

    const articleAuthorElement = article.querySelector('p');

    const authorTagHtml = `<p class="post-author">by ${authorTag}</p>`;
    html = html + authorTagHtml;

    articleAuthorElement.innerHTML = html;
  }
}

generateAuthors();

