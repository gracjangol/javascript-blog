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
  
  const articleSelector = clickedElement.getAttribute("href");

  let targetArticle = document.querySelector(`[href="${articleSelector}"]`).getAttribute("href")
  targetArticle = targetArticle.substring(1) 

  const activeArticle = document.getElementById(`${targetArticle}`)
  activeArticle.classList.add('active')
}

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles';

function generateTitleLinks(){

  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

  let html = '';

  const articles = document.querySelectorAll(optArticleSelector)
  for (let article of articles){

    const articleId = article.getAttribute("id");

    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    const linkHTML = `<li><a href="#${articleId}"><span>${articleTitle}</span></a></li>`;

    titleList.insertAdjacentHTML("beforeend",linkHTML)
    html = html + linkHTML;

    const links = document.querySelectorAll('.titles a');

    for(let link of links){
      link.addEventListener('click', titleClickHandler);
    }
  }

}

generateTitleLinks();
