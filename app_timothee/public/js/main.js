"use strict";

/* globals $:readonly, dateFns:readonly, io:readonly */

(() => {
  /**
   * AUTHENTICATION (using REST API)
   */

  const register = async (username) => {
    try {
      const result = await $.post({
        url: "/auth/register",
        data: JSON.stringify({ username }),
        contentType: "application/json; charset=utf8",
        dataType: "json",
      });
      if (!result || !result.token) {
        throw new Error("Registration failed: try another username");
      }
      saveToken(result.token);
      login(result.token);
    } catch (err) {
      alert(err.message);
      onFailure();
    }
  };

  // Used for auto-login: check token and eventually call "onSuccess()" or "onFailure()"
  const checkToken = (token, onSuccess, onFailure) => {
    // TODO: call "/check-token"
    onSuccess(); // TODO: call onSuccess() if token is OK, onFailure() otherwise
  };

  /**
   * INIT (to be implemented with websocket interactions)
   */

  const login = (token) => {
    console.log({ token });
    // TODO: connect websocket
    // TODO: watch for "recv-message"
    // TODO: optionally watch for "logged-in", "joined-room", and "left-room"
    // TODO: handle errors ("connect_error", "disconnect", ...)
    // TODO: handle initialization:
    const username = "Toto"; // TODO: sent by websocket server on connection
    initializeChat(username);
  };

  const send = (message) => {
    // TODO: emit "send-message" (this should trigger "recv-message" as a result)
  };

  const select = (room) => {
    // TODO: emit "get-messages" to fetch room's messages
    const messages = []; // TODO: sent by websocket server
    // Update UI
    setActiveRoom(room);
    clearRoomBadge(room);
    clearMessages();
    messages.reverse().forEach(addMessage);
  };

  const join = (room) => {
    // TODO: emit "join-room"
    // Update UI
    addRoom(room);
    select(room);
  };

  const leave = (room) => {
    // TODO: emit "leave-room"
    // Update UI
    if (isActiveRoom(room)) {
      clearMessages();
      if (room !== "#general") {
        select("#general");
      }
    }
    removeRoom(room);
  };

  //
  //
  //
  /*****************************************************
   * DO NOT EDIT BELOW
   *****************************************************/
  //
  //
  //

  let activeRoom = null;
  let badgeValue = new Map();

  /**
   * UI: MESSAGES
   */

  const clearMessages = () => {
    $("#messages-container").empty();
  };

  const escape = (string) =>
    string.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  const shortTime = (time) => dateFns.format(new Date(time), "HH:mm");

  const fullTime = (time) =>
    dateFns.format(new Date(time), "YYYY-MM-DD HH:mm:ss");

  const addMessage = ({ room, message, username, date, system }) => {
    if (room && activeRoom !== room) {
      incrRoomBadge(room);
      return;
    }

    if (!room && system && activeRoom !== "(system)") {
      incrRoomBadge("(system)");
      return;
    }

    const html = `<div class="row ${system ? "text-muted" : "bg-light"} py-2">
			<small class="col-auto text-secondary" title="${fullTime(date)}">${shortTime(
      date
    )}</small>
			${
        system
          ? `<span class="col text-wrap"><a href="#" class="text-secondary">@<strong>${escape(
              username
            )}</strong></a> ${escape(message)}</span>`
          : `<a href="#" title="${escape(
              username
            )}" class="col-sm-2 text-truncate">@<strong>${escape(
              username
            )}</strong></a>
				<span class="col text-wrap">${escape(message)}</span>`
      }
		</div>`;
    $("#messages-container").prepend(html);
  };

  /**
   * UI: ROOMS
   */

  const addRoom = (room, { closable = true } = {}) => {
    const html = `<li class="nav-item d-flex" data-room="${room}">
			${
        closable
          ? `<button type="button" class="close pr-3" aria-label="Close">
				<span aria-hidden="true">&times;</span>
			</button>`
          : ""
      }
			<button class="btn nav-link flex-grow-1">
				${room}
				<span class="badge badge-primary badge-pill" style="display:none">0</span>
			</button>
		</li>`;
    $("#rooms-container").append(html);
  };

  const setActiveRoom = (room) => {
    $(`#rooms-container [data-room] .nav-link`).removeClass("active");
    $(`#rooms-container [data-room="${room}"] .nav-link`).addClass("active");
    activeRoom = room;
    $("#action-post-to").text("Post to " + room);
    $('#post-form [name="message"]').focus();
  };

  const isActiveRoom = (room) => {
    return room === activeRoom;
  };

  const incrRoomBadge = (room) => {
    const $badge = $(`#rooms-container [data-room="${room}"] .badge`);
    if ($badge.length) {
      // No badge in DOM = room created without badge feature
      const value = (badgeValue.get(room) || 0) + 1;
      badgeValue.set(room, value);
      $badge.text(value).show();
    }
  };

  const clearRoomBadge = (room) => {
    const $badge = $(`#rooms-container [data-room="${room}"] .badge`);
    if ($badge.length) {
      badgeValue.delete(room);
      $badge.hide();
    }
  };

  const removeRoom = (room) => {
    clearRoomBadge(room);
    $(`#rooms-container [data-room="${room}"]`).remove();
  };

  const clearRooms = () => {
    $("#rooms-container").empty();
    badgeValue.clear();
  };

  /**
   * UI: general
   */

  const initializeChat = (username) => {
    $(".txt-username").text(username);
    // Initial rooms
    clearRooms();
    addRoom("(system)", { closable: false, badge: false });
    addRoom("@" + username, { closable: false });
    addRoom("#general");
    select("#general");
    // Update UI
    $("#step-1").hide();
    $("#step-2").show();
    $("#step-2 input").focus();
  };

  /**
   * EVENT HANDLERS
   */

  $("#login-form").on("submit", (e) => {
    e.preventDefault();
    register(e.target.elements.username.value);
  });

  $('#post-form [name="action"]').on("change", () => {
    $('#post-form [name="message"]').focus();
  });

  $("#post-form").on("submit", (e) => {
    e.preventDefault();
    if (e.target.elements.action.value === "send") {
      send(e.target.elements.message.value);
      e.target.elements.message.value = "";
    } else if (e.target.elements.action.value === "join") {
      join("#" + e.target.elements.message.value);
      e.target.elements.message.value = "";
      e.target.elements.action.value = "send";
    }
  });

  $("#rooms-container").on("click", ".close", (e) => {
    e.preventDefault();
    const room = $(e.target).closest("[data-room]").data("room");
    leave(room);
  });

  $("#rooms-container").on("click", ".nav-link", (e) => {
    e.preventDefault();
    const room = $(e.target).closest("[data-room]").data("room");
    select(room);
  });

  // Auto-login

  const saveToken = (token) => {
    localStorage.setItem("token", token);
  };

  const storedToken = localStorage.getItem("token");
  if (storedToken) {
    // Hide login form during process
    $("#step-1").hide();
    checkToken(
      storedToken,
      () => {
        console.log("Auto-login with token %s", storedToken);
        login(storedToken);
      },
      () => {
        localStorage.removeItem("token");
        // Restore login form
        $("#step-1").show();
      }
    );
  }
})();
