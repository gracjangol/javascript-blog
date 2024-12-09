'use strict';

function titleClickHandler(event){
  const clickedElement = this;
  event.preventDefault();
  console.log(event);

  /* remove class 'active' from all article links  */

  const activeLinks = document.querySelectorAll('.titles a.active');

  for(let activeLink of activeLinks){
  activeLink.classList.remove('active');
  }

  /* add class 'active' to the clicked link */
  console.log('clickedElement:', clickedElement);
  clickedElement.classList.add('active');

  /* remove class 'active' from all articles */

  const activePosts = document.querySelectorAll('.post.active');

  for(let activePost of activePosts){
  activePost.classList.remove('active');
  }


  /* get 'href' attribute from the clicked link */
  
  const articleSelector = clickedElement.getAttribute("href");

  /* find the correct article using the selector (value of 'href' attribute) */

  let targetArticle = document.querySelector(`[href="${articleSelector}"]`).getAttribute("href")
  targetArticle = targetArticle.substring(1) 
  console.log(targetArticle)

  /* add class 'active' to the correct article */
  const activeArticle = document.getElementById(`${targetArticle}`)
  console.log(activeArticle)
  activeArticle.classList.add('active')
}

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles';

function generateTitleLinks(){

  /* remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';


  /* for each article */
  let html = '';

  const articles = document.querySelectorAll(optArticleSelector)
  for (let article of articles){

    /* get the article id */

    const articleId = article.getAttribute("id");

    /* find the title element */

    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    /* get the title from the title element */


    /* create HTML of the link */

    const linkHTML = `<li><a href="#${articleId}"><span>${articleTitle}</span></a></li>`;
    console.log(linkHTML)

    /* insert link into titleList */
    titleList.insertAdjacentHTML("beforeend",linkHTML)
    html = html + linkHTML;
    console.log(html)

    const links = document.querySelectorAll('.titles a');

    for(let link of links){
    link.addEventListener('click', titleClickHandler);
    }
  }

}

generateTitleLinks();
