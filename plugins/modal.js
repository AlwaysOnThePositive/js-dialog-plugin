Element.prototype.appendAfter = function (element) {
  element.parentNode.insertBefore(this, element.nextSibling);
};

function noop() {}

function _createModalFooter(buttons = []) {
  const wrap = document.createElement("div");
  if (!buttons.length) return wrap;

  wrap.classList.add("modal-footer");

  buttons.forEach((btn) => {
    const $btn = document.createElement("button");
    $btn.textContent = btn.text;
    $btn.classList.add("btn");
    $btn.classList.add(`btn-${btn.type || "secondary"}`);
    $btn.onclick = btn.handler || noop;

    wrap.appendChild($btn);
  });

  return wrap;
}

function _createModal(options) {
  const { title, closable, content, width, footerButtons } = options;
  const WIDTH_DEFAULT = "600px";
  const modal = document.createElement("div");
  modal.classList.add("vmodal");
  modal.insertAdjacentHTML(
    "afterbegin",
    `
    <div class="modal-overlay" data-close='overlay'>
      <div class="modal-window" style="width: ${width || WIDTH_DEFAULT}">
        <div class="modal-header">
          <span class="modal-title">${title || "Modal"}</span>
          ${
            closable
              ? '<span class="modal-close" data-close="cross">&times;</span>'
              : ""
          }
        </div>
        <div class="modal-body" data-content>${content || ""}</div>
      </div>
    </div>
  `
  );

  // <div class="modal-footer">
  //   <button class="btn btn-primary">Ok</button>
  //   <button class="btn btn-secondary">Cancel</button>
  // </div>

  const footer = _createModalFooter(footerButtons);
  footer.appendAfter(modal.querySelector("[data-content]"));

  document.body.appendChild(modal);

  return modal;
}

$.modal = function (options) {
  const ANIMATION_DURATION = 200;
  const $modal = _createModal(options);
  let closing = false;
  let destroyed = false;

  const modal = {
    open() {
      if (destroyed) return console.log("modal is destroyed");

      !closing && $modal.classList.add("open");
    },
    close() {
      closing = true;
      $modal.classList.remove("open");
      $modal.classList.add("hide");
      setTimeout(() => {
        $modal.classList.remove("hide");
        closing = false;
        if (typeof options.onClose === 'function') {
          options.onClose();
        }
      }, ANIMATION_DURATION);
    },
  };

  const listener = (event) => {
    if (!event.target.dataset.close) return;

    modal.close();
  };

  $modal.addEventListener("click", listener);

  return Object.assign(modal, {
    destroy() {
      // $modal.parentNode.removeChild($modal);
      $modal.remove();
      $modal.removeEventListener("click", listener);
      destroyed = true;
    },
    setContent(html) {
      $modal.querySelector("[data-content]").innerHTML = html;
    },
  });
};
