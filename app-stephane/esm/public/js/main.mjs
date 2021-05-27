"use strict";
(() => {
  let username = null;

  const login = (_username) => {
    username = _username;
    $(".txt-username").text(username);
    $("#step-1").hide();
    $("#step-2").show();
    $("#step-2 input").focus();
  };

  const send = (message) => {};

  const join = (room) => {};

  const clearMessages = () => {
    $("#messages-container").empty();
  };

  const addMessage = () => {
    // TODO
    /*
    <div class="row text-muted py-2">
      <small class="col-auto text-secondary">22:44</small>
      <span class="col text-wrap"><a href="#" class="text-secondary">@<strong>Username</strong></a> a
        quitté #general</span>
    </div>
    <div class="row bg-light py-2">
      <small class="col-auto text-secondary">22:44</small>
      <a href="#" title="Username" class="col-sm-2 text-truncate">@<strong>Username</strong></a>
      <span class="col text-wrap">Bon ben bye…</span>
    </div>
    <div class="row bg-light py-2">
      <small class="col-auto text-secondary">22:41</small>
      <a href="#" title="Un autre username plus long" class="col-sm-2 text-truncate">@<strong>Un autre username
          plus long</strong></a>
      <span class="col text-wrap">Un texte très long qui devrait passer à la ligne on va voir comment ça se
        passe, ah bah ça a l'air de bien se passer</span>
    </div>
    <div class="row text-muted py-2">
      <small class="col-auto text-secondary">22:40</small>
      <span class="col text-wrap"><a href="#" class="text-secondary">@<strong>Un autre username</strong></a> a
        rejoint #general</span>
    </div>
    */
  };

  // Events

  $("#login-form").on("submit", (e) => {
    e.preventDefault();
    login(e.target.elements.username.value);
  });

  $("#post-form").on("submit", (e) => {
    e.preventDefault();
    if (e.target.elements.action.value === "send") {
      send(e.target.elements.message.value);
    } else if (e.target.elements.action.value === "join") {
      join(e.target.elements.message.value);
    }
  });
})();
