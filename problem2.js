'use strict';

/* global $, jQuery */

function solution(input) {
    var END_POINT = 'https://www.example.com/comments?count=';

    var lists = document.querySelectorAll('.comment-list');
    lists.forEach(listEl => {
        var count = listEl.getAttribute('data-count');
        var myRequest = END_POINT + count;
        listEl.innerHTML = 'Loading...';

        fetch(myRequest)
            .then(res => res.json().then(addComments.bind(null, listEl)))
            .catch(err => listEl.innerHTML = '');

    });
}

function addComments(listEl, comments) {
    listEl.innerHTML = '';
    comments.forEach(comment => {
        var commentEl = document.createElement("div");
        commentEl.setAttribute("class", "comment-item");

        var comment_usernameEl = document.createElement("div");
        comment_usernameEl.setAttribute("class", "comment-item__username");
        comment_usernameEl.innerHTML = comment.username;
        commentEl.appendChild(comment_usernameEl);

        var comment_messageEl = document.createElement("div");
        comment_messageEl.setAttribute("class", "comment-item__message");
        comment_messageEl.innerHTML = comment.message;
        commentEl.appendChild(comment_messageEl);

        listEl.appendChild(commentEl);
    });
}
