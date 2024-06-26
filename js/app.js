(() => {
  "use strict";
  function e(e) {
    this.type = e;
  }
  (e.prototype.init = function () {
    const e = this;
    (this.оbjects = []),
      (this.daClassname = "_dynamic_adapt_"),
      (this.nodes = document.querySelectorAll("[data-da]"));
    for (let e = 0; e < this.nodes.length; e++) {
      const t = this.nodes[e],
        s = t.dataset.da.trim().split(","),
        i = {};
      (i.element = t),
        (i.parent = t.parentNode),
        (i.destination = document.querySelector(s[0].trim())),
        (i.breakpoint = s[1] ? s[1].trim() : "767"),
        (i.place = s[2] ? s[2].trim() : "last"),
        (i.index = this.indexInParent(i.parent, i.element)),
        this.оbjects.push(i);
    }
    this.arraySort(this.оbjects),
      (this.mediaQueries = Array.prototype.map.call(
        this.оbjects,
        function (e) {
          return (
            "(" + this.type + "-width: " + e.breakpoint + "px)," + e.breakpoint
          );
        },
        this,
      )),
      (this.mediaQueries = Array.prototype.filter.call(
        this.mediaQueries,
        function (e, t, s) {
          return Array.prototype.indexOf.call(s, e) === t;
        },
      ));
    for (let t = 0; t < this.mediaQueries.length; t++) {
      const s = this.mediaQueries[t],
        i = String.prototype.split.call(s, ","),
        l = window.matchMedia(i[0]),
        a = i[1],
        n = Array.prototype.filter.call(this.оbjects, function (e) {
          return e.breakpoint === a;
        });
      l.addListener(function () {
        e.mediaHandler(l, n);
      }),
        this.mediaHandler(l, n);
    }
  }),
    (e.prototype.mediaHandler = function (e, t) {
      if (e.matches)
        for (let e = 0; e < t.length; e++) {
          const s = t[e];
          (s.index = this.indexInParent(s.parent, s.element)),
            this.moveTo(s.place, s.element, s.destination);
        }
      else
        for (let e = t.length - 1; e >= 0; e--) {
          const s = t[e];
          s.element.classList.contains(this.daClassname) &&
            this.moveBack(s.parent, s.element, s.index);
        }
    }),
    (e.prototype.moveTo = function (e, t, s) {
      t.classList.add(this.daClassname),
        "last" === e || e >= s.children.length
          ? s.insertAdjacentElement("beforeend", t)
          : "first" !== e
          ? s.children[e].insertAdjacentElement("beforebegin", t)
          : s.insertAdjacentElement("afterbegin", t);
    }),
    (e.prototype.moveBack = function (e, t, s) {
      t.classList.remove(this.daClassname),
        void 0 !== e.children[s]
          ? e.children[s].insertAdjacentElement("beforebegin", t)
          : e.insertAdjacentElement("beforeend", t);
    }),
    (e.prototype.indexInParent = function (e, t) {
      const s = Array.prototype.slice.call(e.children);
      return Array.prototype.indexOf.call(s, t);
    }),
    (e.prototype.arraySort = function (e) {
      "min" === this.type
        ? Array.prototype.sort.call(e, function (e, t) {
            return e.breakpoint === t.breakpoint
              ? e.place === t.place
                ? 0
                : "first" === e.place || "last" === t.place
                ? -1
                : "last" === e.place || "first" === t.place
                ? 1
                : e.place - t.place
              : e.breakpoint - t.breakpoint;
          })
        : Array.prototype.sort.call(e, function (e, t) {
            return e.breakpoint === t.breakpoint
              ? e.place === t.place
                ? 0
                : "first" === e.place || "last" === t.place
                ? 1
                : "last" === e.place || "first" === t.place
                ? -1
                : t.place - e.place
              : t.breakpoint - e.breakpoint;
          });
    });
  new e("max").init();
  class t {
    constructor(e) {
      let t = {
        logging: !0,
        init: !0,
        attributeOpenButton: "data-popup",
        attributeCloseButton: "data-close",
        fixElementSelector: "[data-lp]",
        youtubeAttribute: "data-youtube",
        youtubePlaceAttribute: "data-youtube-place",
        setAutoplayYoutube: !0,
        classes: {
          popup: "popup",
          popupContent: "popup__content",
          popupActive: "popup_show",
          bodyActive: "popup-show",
        },
        focusCatch: !0,
        closeEsc: !0,
        bodyLock: !0,
        bodyLockDelay: 500,
        hashSettings: { location: !0, goHash: !0 },
        on: {
          beforeOpen: function () {},
          afterOpen: function () {},
          beforeClose: function () {},
          afterClose: function () {},
        },
      };
      (this.isOpen = !1),
        (this.targetOpen = { selector: !1, element: !1 }),
        (this.previousOpen = { selector: !1, element: !1 }),
        (this.lastClosed = { selector: !1, element: !1 }),
        (this._dataValue = !1),
        (this.hash = !1),
        (this._reopen = !1),
        (this._selectorOpen = !1),
        (this.lastFocusEl = !1),
        (this._focusEl = [
          "a[href]",
          'input:not([disabled]):not([type="hidden"]):not([aria-hidden])',
          "button:not([disabled]):not([aria-hidden])",
          "select:not([disabled]):not([aria-hidden])",
          "textarea:not([disabled]):not([aria-hidden])",
          "area[href]",
          "iframe",
          "object",
          "embed",
          "[contenteditable]",
          '[tabindex]:not([tabindex^="-"])',
        ]),
        (this.options = {
          ...t,
          ...e,
          classes: { ...t.classes, ...e?.classes },
          hashSettings: { ...t.hashSettings, ...e?.hashSettings },
          on: { ...t.on, ...e?.on },
        }),
        this.options.init && this.initPopups();
    }
    initPopups() {
      this.popupLogging("Проснулся"), this.eventsPopup();
    }
    eventsPopup() {
      document.addEventListener(
        "click",
        function (e) {
          const t = e.target.closest(`[${this.options.attributeOpenButton}]`);
          if (t)
            return (
              e.preventDefault(),
              (this._dataValue = t.getAttribute(
                this.options.attributeOpenButton,
              )
                ? t.getAttribute(this.options.attributeOpenButton)
                : "error"),
              "error" !== this._dataValue
                ? (this.isOpen || (this.lastFocusEl = t),
                  (this.targetOpen.selector = `${this._dataValue}`),
                  (this._selectorOpen = !0),
                  void this.open())
                : void this.popupLogging(
                    `Ой ой, не заполнен атрибут у ${t.classList}`,
                  )
            );
          return e.target.closest(`[${this.options.attributeCloseButton}]`) ||
            (!e.target.closest(`.${this.options.classes.popupContent}`) &&
              this.isOpen)
            ? (e.preventDefault(), void this.close())
            : void 0;
        }.bind(this),
      ),
        document.addEventListener(
          "keydown",
          function (e) {
            if (
              this.options.closeEsc &&
              27 == e.which &&
              "Escape" === e.code &&
              this.isOpen
            )
              return e.preventDefault(), void this.close();
            this.options.focusCatch &&
              9 == e.which &&
              this.isOpen &&
              this._focusCatch(e);
          }.bind(this),
        ),
        document.querySelector("form[data-ajax],form[data-dev]") &&
          document.addEventListener(
            "formSent",
            function (e) {
              const t = e.detail.form.dataset.popupMessage;
              t && this.open(t);
            }.bind(this),
          ),
        this.options.hashSettings.goHash &&
          (window.addEventListener(
            "hashchange",
            function () {
              window.location.hash
                ? this._openToHash()
                : this.close(this.targetOpen.selector);
            }.bind(this),
          ),
          window.addEventListener(
            "load",
            function () {
              window.location.hash && this._openToHash();
            }.bind(this),
          ));
    }
    open(e) {
      if (
        (e &&
          "string" == typeof e &&
          "" !== e.trim() &&
          ((this.targetOpen.selector = e), (this._selectorOpen = !0)),
        this.isOpen && ((this._reopen = !0), this.close()),
        this._selectorOpen ||
          (this.targetOpen.selector = this.lastClosed.selector),
        this._reopen || (this.previousActiveElement = document.activeElement),
        (this.targetOpen.element = document.querySelector(
          this.targetOpen.selector,
        )),
        this.targetOpen.element)
      ) {
        if (
          this.targetOpen.element.hasAttribute(this.options.youtubeAttribute)
        ) {
          const e = `https://www.youtube.com/embed/${this.targetOpen.element.getAttribute(
              this.options.youtubeAttribute,
            )}?rel=0&showinfo=0&autoplay=1`,
            t = document.createElement("iframe");
          t.setAttribute("allowfullscreen", "");
          const s = this.options.setAutoplayYoutube ? "autoplay;" : "";
          t.setAttribute("allow", `${s}; encrypted-media`),
            t.setAttribute("src", e),
            this.targetOpen.element.querySelector(
              `[${this.options.youtubePlaceAttribute}]`,
            ) &&
              this.targetOpen.element
                .querySelector(`[${this.options.youtubePlaceAttribute}]`)
                .appendChild(t);
        }
        this.options.hashSettings.location &&
          (this._getHash(), this._setHash()),
          this.options.on.beforeOpen(this),
          this.targetOpen.element.classList.add(
            this.options.classes.popupActive,
          ),
          document.body.classList.add(this.options.classes.bodyActive),
          this._reopen ? (this._reopen = !1) : r(),
          this.targetOpen.element.setAttribute("aria-hidden", "false"),
          (this.previousOpen.selector = this.targetOpen.selector),
          (this.previousOpen.element = this.targetOpen.element),
          (this._selectorOpen = !1),
          (this.isOpen = !0),
          setTimeout(() => {
            this._focusTrap();
          }, 50),
          document.dispatchEvent(
            new CustomEvent("afterPopupOpen", { detail: { popup: this } }),
          ),
          this.popupLogging("Открыл попап");
      } else
        this.popupLogging(
          "Ой ой, такого попапа нет. Проверьте корректность ввода. ",
        );
    }
    close(e) {
      e &&
        "string" == typeof e &&
        "" !== e.trim() &&
        (this.previousOpen.selector = e),
        this.isOpen &&
          n &&
          (this.options.on.beforeClose(this),
          this.targetOpen.element.hasAttribute(this.options.youtubeAttribute) &&
            this.targetOpen.element.querySelector(
              `[${this.options.youtubePlaceAttribute}]`,
            ) &&
            (this.targetOpen.element.querySelector(
              `[${this.options.youtubePlaceAttribute}]`,
            ).innerHTML = ""),
          this.previousOpen.element.classList.remove(
            this.options.classes.popupActive,
          ),
          this.previousOpen.element.setAttribute("aria-hidden", "true"),
          this._reopen ||
            (document.body.classList.remove(this.options.classes.bodyActive),
            r(),
            (this.isOpen = !1)),
          this._removeHash(),
          this._selectorOpen &&
            ((this.lastClosed.selector = this.previousOpen.selector),
            (this.lastClosed.element = this.previousOpen.element)),
          this.options.on.afterClose(this),
          setTimeout(() => {
            this._focusTrap();
          }, 50),
          this.popupLogging("Закрыл попап"));
    }
    _getHash() {
      this.options.hashSettings.location &&
        (this.hash = this.targetOpen.selector.includes("#")
          ? this.targetOpen.selector
          : this.targetOpen.selector.replace(".", "#"));
    }
    _openToHash() {
      let e = document.querySelector(
        `.${window.location.hash.replace("#", "")}`,
      )
        ? `.${window.location.hash.replace("#", "")}`
        : document.querySelector(`${window.location.hash}`)
        ? `${window.location.hash}`
        : null;
      document.querySelector(`[${this.options.attributeOpenButton}="${e}"]`) &&
        e &&
        this.open(e);
    }
    _setHash() {
      history.pushState("", "", this.hash);
    }
    _removeHash() {
      history.pushState("", "", window.location.href.split("#")[0]);
    }
    _focusCatch(e) {
      const t = this.targetOpen.element.querySelectorAll(this._focusEl),
        s = Array.prototype.slice.call(t),
        i = s.indexOf(document.activeElement);
      e.shiftKey && 0 === i && (s[s.length - 1].focus(), e.preventDefault()),
        e.shiftKey || i !== s.length - 1 || (s[0].focus(), e.preventDefault());
    }
    _focusTrap() {
      const e = this.previousOpen.element.querySelectorAll(this._focusEl);
      !this.isOpen && this.lastFocusEl
        ? this.lastFocusEl.focus()
        : e[0].focus();
    }
    popupLogging(e) {
      this.options.logging && d(`[Попапос]: ${e}`);
    }
  }
  let s = {
    Android: function () {
      return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
      return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
      return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
      return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
      return (
        s.Android() || s.BlackBerry() || s.iOS() || s.Opera() || s.Windows()
      );
    },
  };
  let i = (e, t = 500, s = 0) => {
      e.classList.contains("_slide") ||
        (e.classList.add("_slide"),
        (e.style.transitionProperty = "height, margin, padding"),
        (e.style.transitionDuration = t + "ms"),
        (e.style.height = `${e.offsetHeight}px`),
        e.offsetHeight,
        (e.style.overflow = "hidden"),
        (e.style.height = s ? `${s}px` : "0px"),
        (e.style.paddingTop = 0),
        (e.style.paddingBottom = 0),
        (e.style.marginTop = 0),
        (e.style.marginBottom = 0),
        window.setTimeout(() => {
          (e.hidden = !s),
            !s && e.style.removeProperty("height"),
            e.style.removeProperty("padding-top"),
            e.style.removeProperty("padding-bottom"),
            e.style.removeProperty("margin-top"),
            e.style.removeProperty("margin-bottom"),
            !s && e.style.removeProperty("overflow"),
            e.style.removeProperty("transition-duration"),
            e.style.removeProperty("transition-property"),
            e.classList.remove("_slide");
        }, t));
    },
    l = (e, t = 500, s = 0) => {
      if (!e.classList.contains("_slide")) {
        e.classList.add("_slide"),
          (e.hidden = !e.hidden && null),
          s && e.style.removeProperty("height");
        let i = e.offsetHeight;
        (e.style.overflow = "hidden"),
          (e.style.height = s ? `${s}px` : "0px"),
          (e.style.paddingTop = 0),
          (e.style.paddingBottom = 0),
          (e.style.marginTop = 0),
          (e.style.marginBottom = 0),
          e.offsetHeight,
          (e.style.transitionProperty = "height, margin, padding"),
          (e.style.transitionDuration = t + "ms"),
          (e.style.height = i + "px"),
          e.style.removeProperty("padding-top"),
          e.style.removeProperty("padding-bottom"),
          e.style.removeProperty("margin-top"),
          e.style.removeProperty("margin-bottom"),
          window.setTimeout(() => {
            e.style.removeProperty("height"),
              e.style.removeProperty("overflow"),
              e.style.removeProperty("transition-duration"),
              e.style.removeProperty("transition-property"),
              e.classList.remove("_slide");
          }, t);
      }
    },
    a = (e, t = 500) => (e.hidden ? l(e, t) : i(e, t)),
    n = !0,
    r = (e = 500) => {
      document.documentElement.classList.contains("lock") ? o(e) : c(e);
    },
    o = (e = 500) => {
      let t = document.querySelector("body");
      if (n) {
        let s = document.querySelectorAll("[data-lp]");
        setTimeout(() => {
          for (let e = 0; e < s.length; e++) {
            s[e].style.paddingRight = "0px";
          }
          (t.style.paddingRight = "0px"),
            document.documentElement.classList.remove("lock");
        }, e),
          (n = !1),
          setTimeout(function () {
            n = !0;
          }, e);
      }
    },
    c = (e = 500) => {
      let t = document.querySelector("body");
      if (n) {
        let s = document.querySelectorAll("[data-lp]");
        for (let e = 0; e < s.length; e++) {
          s[e].style.paddingRight =
            window.innerWidth -
            document.querySelector(".wrapper").offsetWidth +
            "px";
        }
        (t.style.paddingRight =
          window.innerWidth -
          document.querySelector(".wrapper").offsetWidth +
          "px"),
          document.documentElement.classList.add("lock"),
          (n = !1),
          setTimeout(function () {
            n = !0;
          }, e);
      }
    };
  function d(e) {
    setTimeout(() => {
      window.FLS && console.log(e);
    }, 0);
  }
  let p = (e, t = !1, s = 500, i = 0) => {
    const l = document.querySelector(e);
    if (l) {
      let a = "",
        n = 0;
      t &&
        ((a = "header.header"), (n = document.querySelector(a).offsetHeight));
      let r = {
        speedAsDuration: !0,
        speed: s,
        header: a,
        offset: i,
        easing: "easeOutQuad",
      };
      if (
        (document.documentElement.classList.contains("menu-open") &&
          (o(), document.documentElement.classList.remove("menu-open")),
        "undefined" != typeof SmoothScroll)
      )
        new SmoothScroll().animateScroll(l, "", r);
      else {
        let e = l.getBoundingClientRect().top + scrollY;
        window.scrollTo({ top: n ? e - n : e, behavior: "smooth" });
      }
      d(`[gotoBlock]: Юхуу...едем к ${e}`);
    } else d(`[gotoBlock]: Ой ой..Такого блока нет на странице: ${e}`);
  };
  class u {
    constructor(e, t = null) {
      if (
        ((this.config = Object.assign({ init: !0, logging: !0 }, e)),
        (this.selectClasses = {
          classSelect: "select",
          classSelectBody: "select__body",
          classSelectTitle: "select__title",
          classSelectValue: "select__value",
          classSelectLabel: "select__label",
          classSelectInput: "select__input",
          classSelectText: "select__text",
          classSelectLink: "select__link",
          classSelectOptions: "select__options",
          classSelectOptionsScroll: "select__scroll",
          classSelectOption: "select__option",
          classSelectContent: "select__content",
          classSelectRow: "select__row",
          classSelectData: "select__asset",
          classSelectDisabled: "_select-disabled",
          classSelectTag: "_select-tag",
          classSelectOpen: "_select-open",
          classSelectActive: "_select-active",
          classSelectFocus: "_select-focus",
          classSelectMultiple: "_select-multiple",
          classSelectCheckBox: "_select-checkbox",
          classSelectOptionSelected: "_select-selected",
        }),
        (this._this = this),
        this.config.init)
      ) {
        const e = t
          ? document.querySelectorAll(t)
          : document.querySelectorAll("select");
        e.length
          ? (this.selectsInit(e),
            this.setLogging(`Проснулся, построил селектов: (${e.length})`))
          : this.setLogging("Сплю, нет ни одного select zzZZZzZZz");
      }
    }
    getSelectClass(e) {
      return `.${e}`;
    }
    getSelectElement(e, t) {
      return {
        originalSelect: e.querySelector("select"),
        selectElement: e.querySelector(this.getSelectClass(t)),
      };
    }
    selectsInit(e) {
      e.forEach((e, t) => {
        this.selectInit(e, t + 1);
      }),
        document.addEventListener(
          "click",
          function (e) {
            this.selectsActions(e);
          }.bind(this),
        ),
        document.addEventListener(
          "keydown",
          function (e) {
            this.selectsActions(e);
          }.bind(this),
        ),
        document.addEventListener(
          "focusin",
          function (e) {
            this.selectsActions(e);
          }.bind(this),
        ),
        document.addEventListener(
          "focusout",
          function (e) {
            this.selectsActions(e);
          }.bind(this),
        );
    }
    selectInit(e, t) {
      const s = this;
      let i = document.createElement("div");
      if (
        (i.classList.add(this.selectClasses.classSelect),
        e.parentNode.insertBefore(i, e),
        i.appendChild(e),
        (e.hidden = !0),
        t && (e.dataset.id = t),
        i.insertAdjacentHTML(
          "beforeend",
          `<div class="${this.selectClasses.classSelectBody}"><div hidden class="${this.selectClasses.classSelectOptions}"></div></div>`,
        ),
        this.selectBuild(e),
        this.getSelectPlaceholder(e) &&
          ((e.dataset.placeholder = this.getSelectPlaceholder(e).value),
          this.getSelectPlaceholder(e).label.show))
      ) {
        this.getSelectElement(
          i,
          this.selectClasses.classSelectTitle,
        ).selectElement.insertAdjacentHTML(
          "afterbegin",
          `<span class="${this.selectClasses.classSelectLabel}">${
            this.getSelectPlaceholder(e).label.text
              ? this.getSelectPlaceholder(e).label.text
              : this.getSelectPlaceholder(e).value
          }</span>`,
        );
      }
      (e.dataset.speed = e.dataset.speed ? e.dataset.speed : "150"),
        e.addEventListener("change", function (e) {
          s.selectChange(e);
        });
    }
    selectBuild(e) {
      const t = e.parentElement;
      (t.dataset.id = e.dataset.id),
        t.classList.add(
          e.getAttribute("class") ? `select_${e.getAttribute("class")}` : "",
        ),
        e.multiple
          ? t.classList.add(this.selectClasses.classSelectMultiple)
          : t.classList.remove(this.selectClasses.classSelectMultiple),
        e.hasAttribute("data-checkbox") && e.multiple
          ? t.classList.add(this.selectClasses.classSelectCheckBox)
          : t.classList.remove(this.selectClasses.classSelectCheckBox),
        this.setSelectTitleValue(t, e),
        this.setOptions(t, e),
        e.hasAttribute("data-search") && this.searchActions(t),
        e.hasAttribute("data-open") && this.selectAction(t),
        this.selectDisabled(t, e);
    }
    selectsActions(e) {
      const t = e.target,
        s = e.type;
      if (
        t.closest(this.getSelectClass(this.selectClasses.classSelect)) ||
        t.closest(this.getSelectClass(this.selectClasses.classSelectTag))
      ) {
        const i = t.closest(".select")
            ? t.closest(".select")
            : document.querySelector(
                `.${this.selectClasses.classSelect}[data-id="${
                  t.closest(
                    this.getSelectClass(this.selectClasses.classSelectTag),
                  ).dataset.selectId
                }"]`,
              ),
          l = this.getSelectElement(i).originalSelect;
        if ("click" === s) {
          if (!l.disabled)
            if (
              t.closest(this.getSelectClass(this.selectClasses.classSelectTag))
            ) {
              const e = t.closest(
                  this.getSelectClass(this.selectClasses.classSelectTag),
                ),
                s = document.querySelector(
                  `.${this.selectClasses.classSelect}[data-id="${e.dataset.selectId}"] .select__option[data-value="${e.dataset.value}"]`,
                );
              this.optionAction(i, l, s);
            } else if (
              t.closest(
                this.getSelectClass(this.selectClasses.classSelectTitle),
              )
            )
              this.selectAction(i);
            else if (
              t.closest(
                this.getSelectClass(this.selectClasses.classSelectOption),
              )
            ) {
              const e = t.closest(
                this.getSelectClass(this.selectClasses.classSelectOption),
              );
              this.optionAction(i, l, e);
            }
        } else
          "focusin" === s || "focusout" === s
            ? t.closest(this.getSelectClass(this.selectClasses.classSelect)) &&
              ("focusin" === s
                ? i.classList.add(this.selectClasses.classSelectFocus)
                : i.classList.remove(this.selectClasses.classSelectFocus))
            : "keydown" === s && "Escape" === e.code && this.selectsСlose();
      } else this.selectsСlose();
    }
    selectsСlose() {
      const e = document.querySelectorAll(
        `${this.getSelectClass(
          this.selectClasses.classSelect,
        )}${this.getSelectClass(this.selectClasses.classSelectOpen)}`,
      );
      e.length &&
        e.forEach((e) => {
          this.selectAction(e);
        });
    }
    selectAction(e) {
      const t = this.getSelectElement(e).originalSelect,
        s = this.getSelectElement(
          e,
          this.selectClasses.classSelectOptions,
        ).selectElement;
      s.classList.contains("_slide") ||
        (e.classList.toggle(this.selectClasses.classSelectOpen),
        a(s, t.dataset.speed));
    }
    setSelectTitleValue(e, t) {
      const s = this.getSelectElement(
          e,
          this.selectClasses.classSelectBody,
        ).selectElement,
        i = this.getSelectElement(
          e,
          this.selectClasses.classSelectTitle,
        ).selectElement;
      i && i.remove(),
        s.insertAdjacentHTML("afterbegin", this.getSelectTitleValue(e, t));
    }
    getSelectTitleValue(e, t) {
      let s = this.getSelectedOptionsData(t, 2).html;
      if (
        (t.multiple &&
          t.hasAttribute("data-tags") &&
          ((s = this.getSelectedOptionsData(t)
            .elements.map(
              (t) =>
                `<span role="button" data-select-id="${
                  e.dataset.id
                }" data-value="${
                  t.value
                }" class="_select-tag">${this.getSelectElementContent(
                  t,
                )}</span>`,
            )
            .join("")),
          t.dataset.tags &&
            document.querySelector(t.dataset.tags) &&
            ((document.querySelector(t.dataset.tags).innerHTML = s),
            t.hasAttribute("data-search") && (s = !1))),
        (s = s.length ? s : t.dataset.placeholder),
        this.getSelectedOptionsData(t).values.length
          ? e.classList.add(this.selectClasses.classSelectActive)
          : e.classList.remove(this.selectClasses.classSelectActive),
        t.hasAttribute("data-search"))
      )
        return `<div class="${this.selectClasses.classSelectTitle}"><span class="${this.selectClasses.classSelectValue}"><input autocomplete="off" type="text" placeholder="${s}" data-placeholder="${s}" class="${this.selectClasses.classSelectInput}"></span></div>`;
      {
        const e =
          this.getSelectedOptionsData(t).elements.length &&
          this.getSelectedOptionsData(t).elements[0].dataset.class
            ? ` ${this.getSelectedOptionsData(t).elements[0].dataset.class}`
            : "";
        return `<button type="button" class="${this.selectClasses.classSelectTitle}"><span class="${this.selectClasses.classSelectValue}"><span class="${this.selectClasses.classSelectContent}${e}">${s}</span></span></button>`;
      }
    }
    getSelectElementContent(e) {
      const t = e.dataset.asset ? `${e.dataset.asset}` : "",
        s = t.indexOf("img") >= 0 ? `<img src="${t}" alt="">` : t;
      let i = "";
      return (
        (i += t ? `<span class="${this.selectClasses.classSelectRow}">` : ""),
        (i += t ? `<span class="${this.selectClasses.classSelectData}">` : ""),
        (i += t ? s : ""),
        (i += t ? "</span>" : ""),
        (i += t ? `<span class="${this.selectClasses.classSelectText}">` : ""),
        (i += e.textContent),
        (i += t ? "</span>" : ""),
        (i += t ? "</span>" : ""),
        i
      );
    }
    getSelectPlaceholder(e) {
      const t = Array.from(e.options).find((e) => !e.value);
      if (t)
        return {
          value: t.textContent,
          show: t.hasAttribute("data-show"),
          label: { show: t.hasAttribute("data-label"), text: t.dataset.label },
        };
    }
    getSelectedOptionsData(e, t) {
      let s = [];
      return (
        e.multiple
          ? (s = Array.from(e.options)
              .filter((e) => e.value)
              .filter((e) => e.selected))
          : s.push(e.options[e.selectedIndex]),
        {
          elements: s.map((e) => e),
          values: s.filter((e) => e.value).map((e) => e.value),
          html: s.map((e) => this.getSelectElementContent(e)),
        }
      );
    }
    getOptions(e) {
      let t = e.hasAttribute("data-scroll") ? "data-simplebar" : "",
        s = e.dataset.scroll ? `style="max-height:${e.dataset.scroll}px"` : "",
        i = Array.from(e.options);
      if (i.length > 0) {
        let l = "";
        return (
          ((this.getSelectPlaceholder(e) &&
            !this.getSelectPlaceholder(e).show) ||
            e.multiple) &&
            (i = i.filter((e) => e.value)),
          (l += t
            ? `<div ${t} ${s} class="${this.selectClasses.classSelectOptionsScroll}">`
            : ""),
          i.forEach((t) => {
            l += this.getOption(t, e);
          }),
          (l += t ? "</div>" : ""),
          l
        );
      }
    }
    getOption(e, t) {
      const s =
          e.selected && t.multiple
            ? ` ${this.selectClasses.classSelectOptionSelected}`
            : "",
        i = e.selected && !t.hasAttribute("data-show-selected") ? "hidden" : "",
        l = e.dataset.class ? ` ${e.dataset.class}` : "",
        a = !!e.dataset.href && e.dataset.href,
        n = e.hasAttribute("data-href-blank") ? 'target="_blank"' : "";
      let r = "";
      return (
        (r += a
          ? `<a ${n} ${i} href="${a}" data-value="${e.value}" class="${this.selectClasses.classSelectOption}${l}${s}">`
          : `<button ${i} class="${this.selectClasses.classSelectOption}${l}${s}" data-value="${e.value}" type="button">`),
        (r += this.getSelectElementContent(e)),
        (r += a ? "</a>" : "</button>"),
        r
      );
    }
    setOptions(e, t) {
      this.getSelectElement(
        e,
        this.selectClasses.classSelectOptions,
      ).selectElement.innerHTML = this.getOptions(t);
    }
    optionAction(e, t, s) {
      if (t.multiple) {
        s.classList.toggle(this.selectClasses.classSelectOptionSelected);
        this.getSelectedOptionsData(t).elements.forEach((e) => {
          e.removeAttribute("selected");
        });
        e.querySelectorAll(
          this.getSelectClass(this.selectClasses.classSelectOptionSelected),
        ).forEach((e) => {
          t.querySelector(`option[value="${e.dataset.value}"]`).setAttribute(
            "selected",
            "selected",
          );
        });
      } else
        t.hasAttribute("data-show-selected") ||
          (e.querySelector(
            `${this.getSelectClass(
              this.selectClasses.classSelectOption,
            )}[hidden]`,
          ) &&
            (e.querySelector(
              `${this.getSelectClass(
                this.selectClasses.classSelectOption,
              )}[hidden]`,
            ).hidden = !1),
          (s.hidden = !0)),
          (t.value = s.hasAttribute("data-value")
            ? s.dataset.value
            : s.textContent),
          this.selectAction(e);
      this.setSelectTitleValue(e, t), this.setSelectChange(t);
    }
    selectChange(e) {
      const t = e.target;
      this.selectBuild(t), this.setSelectChange(t);
    }
    setSelectChange(e) {
      if (
        (e.hasAttribute("data-validate") && m.validateInput(e),
        e.hasAttribute("data-submit") && e.value)
      ) {
        let t = document.createElement("button");
        (t.type = "submit"), e.closest("form").append(t), t.click(), t.remove();
      }
      const t = e.parentElement;
      this.selectCallback(t, e);
    }
    selectDisabled(e, t) {
      t.disabled
        ? (e.classList.add(this.selectClasses.classSelectDisabled),
          (this.getSelectElement(
            e,
            this.selectClasses.classSelectTitle,
          ).selectElement.disabled = !0))
        : (e.classList.remove(this.selectClasses.classSelectDisabled),
          (this.getSelectElement(
            e,
            this.selectClasses.classSelectTitle,
          ).selectElement.disabled = !1));
    }
    searchActions(e) {
      this.getSelectElement(e).originalSelect;
      const t = this.getSelectElement(
          e,
          this.selectClasses.classSelectInput,
        ).selectElement,
        s = this.getSelectElement(
          e,
          this.selectClasses.classSelectOptions,
        ).selectElement,
        i = s.querySelectorAll(`.${this.selectClasses.classSelectOption}`),
        l = this;
      t.addEventListener("input", function () {
        i.forEach((e) => {
          e.textContent.toUpperCase().indexOf(t.value.toUpperCase()) >= 0
            ? (e.hidden = !1)
            : (e.hidden = !0);
        }),
          !0 === s.hidden && l.selectAction(e);
      });
    }
    selectCallback(e, t) {
      document.dispatchEvent(
        new CustomEvent("selectCallback", { detail: { select: t } }),
      );
    }
    setLogging(e) {
      this.config.logging && d(`[select]: ${e}`);
    }
  }
  const h = { inputMaskModule: null, selectModule: null };
  let m = {
    getErrors(e) {
      let t = 0,
        s = e.querySelectorAll("*[data-required]");
      return (
        s.length &&
          s.forEach((e) => {
            (null === e.offsetParent && "SELECT" !== e.tagName) ||
              e.disabled ||
              (t += this.validateInput(e));
          }),
        t
      );
    },
    validateInput(e) {
      let t = 0;
      return (
        "email" === e.dataset.required
          ? ((e.value = e.value.replace(" ", "")),
            this.emailTest(e) ? (this.addError(e), t++) : this.removeError(e))
          : ("checkbox" !== e.type || e.checked) && e.value
          ? this.removeError(e)
          : (this.addError(e), t++),
        t
      );
    },
    addError(e) {
      e.classList.add("_form-error"),
        e.parentElement.classList.add("_form-error");
      let t = e.parentElement.querySelector(".form__error");
      t && e.parentElement.removeChild(t),
        e.dataset.error &&
          e.parentElement.insertAdjacentHTML(
            "beforeend",
            `<div class="form__error">${e.dataset.error}</div>`,
          );
    },
    removeError(e) {
      e.classList.remove("_form-error"),
        e.parentElement.classList.remove("_form-error"),
        e.parentElement.querySelector(".form__error") &&
          e.parentElement.removeChild(
            e.parentElement.querySelector(".form__error"),
          );
    },
    formClean(e) {
      e.reset(),
        setTimeout(() => {
          let t = e.querySelectorAll("input,textarea");
          for (let e = 0; e < t.length; e++) {
            const s = t[e];
            s.parentElement.classList.remove("_form-focus"),
              s.classList.remove("_form-focus"),
              m.removeError(s),
              (s.value = s.dataset.placeholder);
          }
          let s = e.querySelectorAll(".checkbox__input");
          if (s.length > 0)
            for (let e = 0; e < s.length; e++) {
              s[e].checked = !1;
            }
          if (h.selectModule) {
            let t = e.querySelectorAll(".select");
            if (t.length)
              for (let e = 0; e < t.length; e++) {
                const s = t[e].querySelector("select");
                h.selectModule.selectBuild(s);
              }
          }
        }, 0);
    },
    emailTest: (e) =>
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(e.value),
  };
  function f(e) {
    return (
      null !== e &&
      "object" == typeof e &&
      "constructor" in e &&
      e.constructor === Object
    );
  }
  function g(e, t) {
    void 0 === e && (e = {}),
      void 0 === t && (t = {}),
      Object.keys(t).forEach((s) => {
        void 0 === e[s]
          ? (e[s] = t[s])
          : f(t[s]) && f(e[s]) && Object.keys(t[s]).length > 0 && g(e[s], t[s]);
      });
  }
  const v = {
    body: {},
    addEventListener() {},
    removeEventListener() {},
    activeElement: { blur() {}, nodeName: "" },
    querySelector: () => null,
    querySelectorAll: () => [],
    getElementById: () => null,
    createEvent: () => ({ initEvent() {} }),
    createElement: () => ({
      children: [],
      childNodes: [],
      style: {},
      setAttribute() {},
      getElementsByTagName: () => [],
    }),
    createElementNS: () => ({}),
    importNode: () => null,
    location: {
      hash: "",
      host: "",
      hostname: "",
      href: "",
      origin: "",
      pathname: "",
      protocol: "",
      search: "",
    },
  };
  function S() {
    const e = "undefined" != typeof document ? document : {};
    return g(e, v), e;
  }
  const b = {
    document: v,
    navigator: { userAgent: "" },
    location: {
      hash: "",
      host: "",
      hostname: "",
      href: "",
      origin: "",
      pathname: "",
      protocol: "",
      search: "",
    },
    history: { replaceState() {}, pushState() {}, go() {}, back() {} },
    CustomEvent: function () {
      return this;
    },
    addEventListener() {},
    removeEventListener() {},
    getComputedStyle: () => ({ getPropertyValue: () => "" }),
    Image() {},
    Date() {},
    screen: {},
    setTimeout() {},
    clearTimeout() {},
    matchMedia: () => ({}),
    requestAnimationFrame: (e) =>
      "undefined" == typeof setTimeout ? (e(), null) : setTimeout(e, 0),
    cancelAnimationFrame(e) {
      "undefined" != typeof setTimeout && clearTimeout(e);
    },
  };
  function y() {
    const e = "undefined" != typeof window ? window : {};
    return g(e, b), e;
  }
  function w(e, t) {
    return void 0 === t && (t = 0), setTimeout(e, t);
  }
  function E() {
    return Date.now();
  }
  function T(e, t) {
    void 0 === t && (t = "x");
    const s = y();
    let i, l, a;
    const n = (function (e) {
      const t = y();
      let s;
      return (
        t.getComputedStyle && (s = t.getComputedStyle(e, null)),
        !s && e.currentStyle && (s = e.currentStyle),
        s || (s = e.style),
        s
      );
    })(e);
    return (
      s.WebKitCSSMatrix
        ? ((l = n.transform || n.webkitTransform),
          l.split(",").length > 6 &&
            (l = l
              .split(", ")
              .map((e) => e.replace(",", "."))
              .join(", ")),
          (a = new s.WebKitCSSMatrix("none" === l ? "" : l)))
        : ((a =
            n.MozTransform ||
            n.OTransform ||
            n.MsTransform ||
            n.msTransform ||
            n.transform ||
            n
              .getPropertyValue("transform")
              .replace("translate(", "matrix(1, 0, 0, 1,")),
          (i = a.toString().split(","))),
      "x" === t &&
        (l = s.WebKitCSSMatrix
          ? a.m41
          : 16 === i.length
          ? parseFloat(i[12])
          : parseFloat(i[4])),
      "y" === t &&
        (l = s.WebKitCSSMatrix
          ? a.m42
          : 16 === i.length
          ? parseFloat(i[13])
          : parseFloat(i[5])),
      l || 0
    );
  }
  function C(e) {
    return (
      "object" == typeof e &&
      null !== e &&
      e.constructor &&
      "Object" === Object.prototype.toString.call(e).slice(8, -1)
    );
  }
  function x() {
    const e = Object(arguments.length <= 0 ? void 0 : arguments[0]),
      t = ["__proto__", "constructor", "prototype"];
    for (let i = 1; i < arguments.length; i += 1) {
      const l = i < 0 || arguments.length <= i ? void 0 : arguments[i];
      if (
        null != l &&
        ((s = l),
        !("undefined" != typeof window && void 0 !== window.HTMLElement
          ? s instanceof HTMLElement
          : s && (1 === s.nodeType || 11 === s.nodeType)))
      ) {
        const s = Object.keys(Object(l)).filter((e) => t.indexOf(e) < 0);
        for (let t = 0, i = s.length; t < i; t += 1) {
          const i = s[t],
            a = Object.getOwnPropertyDescriptor(l, i);
          void 0 !== a &&
            a.enumerable &&
            (C(e[i]) && C(l[i])
              ? l[i].__swiper__
                ? (e[i] = l[i])
                : x(e[i], l[i])
              : !C(e[i]) && C(l[i])
              ? ((e[i] = {}), l[i].__swiper__ ? (e[i] = l[i]) : x(e[i], l[i]))
              : (e[i] = l[i]));
        }
      }
    }
    var s;
    return e;
  }
  function L(e, t, s) {
    e.style.setProperty(t, s);
  }
  function A(e) {
    let { swiper: t, targetPosition: s, side: i } = e;
    const l = y(),
      a = -t.translate;
    let n,
      r = null;
    const o = t.params.speed;
    (t.wrapperEl.style.scrollSnapType = "none"),
      l.cancelAnimationFrame(t.cssModeFrameID);
    const c = s > a ? "next" : "prev",
      d = (e, t) => ("next" === c && e >= t) || ("prev" === c && e <= t),
      p = () => {
        (n = new Date().getTime()), null === r && (r = n);
        const e = Math.max(Math.min((n - r) / o, 1), 0),
          c = 0.5 - Math.cos(e * Math.PI) / 2;
        let u = a + c * (s - a);
        if ((d(u, s) && (u = s), t.wrapperEl.scrollTo({ [i]: u }), d(u, s)))
          return (
            (t.wrapperEl.style.overflow = "hidden"),
            (t.wrapperEl.style.scrollSnapType = ""),
            setTimeout(() => {
              (t.wrapperEl.style.overflow = ""),
                t.wrapperEl.scrollTo({ [i]: u });
            }),
            void l.cancelAnimationFrame(t.cssModeFrameID)
          );
        t.cssModeFrameID = l.requestAnimationFrame(p);
      };
    p();
  }
  function P(e, t) {
    return (
      void 0 === t && (t = ""), [...e.children].filter((e) => e.matches(t))
    );
  }
  function M(e, t) {
    void 0 === t && (t = []);
    const s = document.createElement(e);
    return s.classList.add(...(Array.isArray(t) ? t : [t])), s;
  }
  function O(e, t) {
    return y().getComputedStyle(e, null).getPropertyValue(t);
  }
  function _(e) {
    let t,
      s = e;
    if (s) {
      for (t = 0; null !== (s = s.previousSibling); )
        1 === s.nodeType && (t += 1);
      return t;
    }
  }
  function k(e, t) {
    const s = [];
    let i = e.parentElement;
    for (; i; )
      t ? i.matches(t) && s.push(i) : s.push(i), (i = i.parentElement);
    return s;
  }
  function $(e, t, s) {
    const i = y();
    return s
      ? e["width" === t ? "offsetWidth" : "offsetHeight"] +
          parseFloat(
            i
              .getComputedStyle(e, null)
              .getPropertyValue("width" === t ? "margin-right" : "margin-top"),
          ) +
          parseFloat(
            i
              .getComputedStyle(e, null)
              .getPropertyValue(
                "width" === t ? "margin-left" : "margin-bottom",
              ),
          )
      : e.offsetWidth;
  }
  let I, z, D;
  function B() {
    return (
      I ||
        (I = (function () {
          const e = y(),
            t = S();
          return {
            smoothScroll:
              t.documentElement &&
              t.documentElement.style &&
              "scrollBehavior" in t.documentElement.style,
            touch: !!(
              "ontouchstart" in e ||
              (e.DocumentTouch && t instanceof e.DocumentTouch)
            ),
          };
        })()),
      I
    );
  }
  function G(e) {
    return (
      void 0 === e && (e = {}),
      z ||
        (z = (function (e) {
          let { userAgent: t } = void 0 === e ? {} : e;
          const s = B(),
            i = y(),
            l = i.navigator.platform,
            a = t || i.navigator.userAgent,
            n = { ios: !1, android: !1 },
            r = i.screen.width,
            o = i.screen.height,
            c = a.match(/(Android);?[\s\/]+([\d.]+)?/);
          let d = a.match(/(iPad).*OS\s([\d_]+)/);
          const p = a.match(/(iPod)(.*OS\s([\d_]+))?/),
            u = !d && a.match(/(iPhone\sOS|iOS)\s([\d_]+)/),
            h = "Win32" === l;
          let m = "MacIntel" === l;
          return (
            !d &&
              m &&
              s.touch &&
              [
                "1024x1366",
                "1366x1024",
                "834x1194",
                "1194x834",
                "834x1112",
                "1112x834",
                "768x1024",
                "1024x768",
                "820x1180",
                "1180x820",
                "810x1080",
                "1080x810",
              ].indexOf(`${r}x${o}`) >= 0 &&
              ((d = a.match(/(Version)\/([\d.]+)/)),
              d || (d = [0, 1, "13_0_0"]),
              (m = !1)),
            c && !h && ((n.os = "android"), (n.android = !0)),
            (d || u || p) && ((n.os = "ios"), (n.ios = !0)),
            n
          );
        })(e)),
      z
    );
  }
  function q() {
    return (
      D ||
        (D = (function () {
          const e = y();
          let t = !1;
          function s() {
            const t = e.navigator.userAgent.toLowerCase();
            return (
              t.indexOf("safari") >= 0 &&
              t.indexOf("chrome") < 0 &&
              t.indexOf("android") < 0
            );
          }
          if (s()) {
            const s = String(e.navigator.userAgent);
            if (s.includes("Version/")) {
              const [e, i] = s
                .split("Version/")[1]
                .split(" ")[0]
                .split(".")
                .map((e) => Number(e));
              t = e < 16 || (16 === e && i < 2);
            }
          }
          return {
            isSafari: t || s(),
            needPerspectiveFix: t,
            isWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(
              e.navigator.userAgent,
            ),
          };
        })()),
      D
    );
  }
  var H = {
    on(e, t, s) {
      const i = this;
      if (!i.eventsListeners || i.destroyed) return i;
      if ("function" != typeof t) return i;
      const l = s ? "unshift" : "push";
      return (
        e.split(" ").forEach((e) => {
          i.eventsListeners[e] || (i.eventsListeners[e] = []),
            i.eventsListeners[e][l](t);
        }),
        i
      );
    },
    once(e, t, s) {
      const i = this;
      if (!i.eventsListeners || i.destroyed) return i;
      if ("function" != typeof t) return i;
      function l() {
        i.off(e, l), l.__emitterProxy && delete l.__emitterProxy;
        for (var s = arguments.length, a = new Array(s), n = 0; n < s; n++)
          a[n] = arguments[n];
        t.apply(i, a);
      }
      return (l.__emitterProxy = t), i.on(e, l, s);
    },
    onAny(e, t) {
      const s = this;
      if (!s.eventsListeners || s.destroyed) return s;
      if ("function" != typeof e) return s;
      const i = t ? "unshift" : "push";
      return (
        s.eventsAnyListeners.indexOf(e) < 0 && s.eventsAnyListeners[i](e), s
      );
    },
    offAny(e) {
      const t = this;
      if (!t.eventsListeners || t.destroyed) return t;
      if (!t.eventsAnyListeners) return t;
      const s = t.eventsAnyListeners.indexOf(e);
      return s >= 0 && t.eventsAnyListeners.splice(s, 1), t;
    },
    off(e, t) {
      const s = this;
      return !s.eventsListeners || s.destroyed
        ? s
        : s.eventsListeners
        ? (e.split(" ").forEach((e) => {
            void 0 === t
              ? (s.eventsListeners[e] = [])
              : s.eventsListeners[e] &&
                s.eventsListeners[e].forEach((i, l) => {
                  (i === t || (i.__emitterProxy && i.__emitterProxy === t)) &&
                    s.eventsListeners[e].splice(l, 1);
                });
          }),
          s)
        : s;
    },
    emit() {
      const e = this;
      if (!e.eventsListeners || e.destroyed) return e;
      if (!e.eventsListeners) return e;
      let t, s, i;
      for (var l = arguments.length, a = new Array(l), n = 0; n < l; n++)
        a[n] = arguments[n];
      "string" == typeof a[0] || Array.isArray(a[0])
        ? ((t = a[0]), (s = a.slice(1, a.length)), (i = e))
        : ((t = a[0].events), (s = a[0].data), (i = a[0].context || e)),
        s.unshift(i);
      return (
        (Array.isArray(t) ? t : t.split(" ")).forEach((t) => {
          e.eventsAnyListeners &&
            e.eventsAnyListeners.length &&
            e.eventsAnyListeners.forEach((e) => {
              e.apply(i, [t, ...s]);
            }),
            e.eventsListeners &&
              e.eventsListeners[t] &&
              e.eventsListeners[t].forEach((e) => {
                e.apply(i, s);
              });
        }),
        e
      );
    },
  };
  const V = (e, t) => {
      if (!e || e.destroyed || !e.params) return;
      const s = t.closest(
        e.isElement ? "swiper-slide" : `.${e.params.slideClass}`,
      );
      if (s) {
        let t = s.querySelector(`.${e.params.lazyPreloaderClass}`);
        !t &&
          e.isElement &&
          (s.shadowRoot
            ? (t = s.shadowRoot.querySelector(
                `.${e.params.lazyPreloaderClass}`,
              ))
            : requestAnimationFrame(() => {
                s.shadowRoot &&
                  ((t = s.shadowRoot.querySelector(
                    `.${e.params.lazyPreloaderClass}`,
                  )),
                  t && t.remove());
              })),
          t && t.remove();
      }
    },
    F = (e, t) => {
      if (!e.slides[t]) return;
      const s = e.slides[t].querySelector('[loading="lazy"]');
      s && s.removeAttribute("loading");
    },
    N = (e) => {
      if (!e || e.destroyed || !e.params) return;
      let t = e.params.lazyPreloadPrevNext;
      const s = e.slides.length;
      if (!s || !t || t < 0) return;
      t = Math.min(t, s);
      const i =
          "auto" === e.params.slidesPerView
            ? e.slidesPerViewDynamic()
            : Math.ceil(e.params.slidesPerView),
        l = e.activeIndex;
      if (e.params.grid && e.params.grid.rows > 1) {
        const s = l,
          a = [s - t];
        return (
          a.push(...Array.from({ length: t }).map((e, t) => s + i + t)),
          void e.slides.forEach((t, s) => {
            a.includes(t.column) && F(e, s);
          })
        );
      }
      const a = l + i - 1;
      if (e.params.rewind || e.params.loop)
        for (let i = l - t; i <= a + t; i += 1) {
          const t = ((i % s) + s) % s;
          (t < l || t > a) && F(e, t);
        }
      else
        for (let i = Math.max(l - t, 0); i <= Math.min(a + t, s - 1); i += 1)
          i !== l && (i > a || i < l) && F(e, i);
    };
  var j = {
    updateSize: function () {
      const e = this;
      let t, s;
      const i = e.el;
      (t =
        void 0 !== e.params.width && null !== e.params.width
          ? e.params.width
          : i.clientWidth),
        (s =
          void 0 !== e.params.height && null !== e.params.height
            ? e.params.height
            : i.clientHeight),
        (0 === t && e.isHorizontal()) ||
          (0 === s && e.isVertical()) ||
          ((t =
            t -
            parseInt(O(i, "padding-left") || 0, 10) -
            parseInt(O(i, "padding-right") || 0, 10)),
          (s =
            s -
            parseInt(O(i, "padding-top") || 0, 10) -
            parseInt(O(i, "padding-bottom") || 0, 10)),
          Number.isNaN(t) && (t = 0),
          Number.isNaN(s) && (s = 0),
          Object.assign(e, {
            width: t,
            height: s,
            size: e.isHorizontal() ? t : s,
          }));
    },
    updateSlides: function () {
      const e = this;
      function t(t) {
        return e.isHorizontal()
          ? t
          : {
              width: "height",
              "margin-top": "margin-left",
              "margin-bottom ": "margin-right",
              "margin-left": "margin-top",
              "margin-right": "margin-bottom",
              "padding-left": "padding-top",
              "padding-right": "padding-bottom",
              marginRight: "marginBottom",
            }[t];
      }
      function s(e, s) {
        return parseFloat(e.getPropertyValue(t(s)) || 0);
      }
      const i = e.params,
        {
          wrapperEl: l,
          slidesEl: a,
          size: n,
          rtlTranslate: r,
          wrongRTL: o,
        } = e,
        c = e.virtual && i.virtual.enabled,
        d = c ? e.virtual.slides.length : e.slides.length,
        p = P(a, `.${e.params.slideClass}, swiper-slide`),
        u = c ? e.virtual.slides.length : p.length;
      let h = [];
      const m = [],
        f = [];
      let g = i.slidesOffsetBefore;
      "function" == typeof g && (g = i.slidesOffsetBefore.call(e));
      let v = i.slidesOffsetAfter;
      "function" == typeof v && (v = i.slidesOffsetAfter.call(e));
      const S = e.snapGrid.length,
        b = e.slidesGrid.length;
      let y = i.spaceBetween,
        w = -g,
        E = 0,
        T = 0;
      if (void 0 === n) return;
      "string" == typeof y && y.indexOf("%") >= 0
        ? (y = (parseFloat(y.replace("%", "")) / 100) * n)
        : "string" == typeof y && (y = parseFloat(y)),
        (e.virtualSize = -y),
        p.forEach((e) => {
          r ? (e.style.marginLeft = "") : (e.style.marginRight = ""),
            (e.style.marginBottom = ""),
            (e.style.marginTop = "");
        }),
        i.centeredSlides &&
          i.cssMode &&
          (L(l, "--swiper-centered-offset-before", ""),
          L(l, "--swiper-centered-offset-after", ""));
      const C = i.grid && i.grid.rows > 1 && e.grid;
      let x;
      C && e.grid.initSlides(u);
      const A =
        "auto" === i.slidesPerView &&
        i.breakpoints &&
        Object.keys(i.breakpoints).filter(
          (e) => void 0 !== i.breakpoints[e].slidesPerView,
        ).length > 0;
      for (let l = 0; l < u; l += 1) {
        let a;
        if (
          ((x = 0),
          p[l] && (a = p[l]),
          C && e.grid.updateSlide(l, a, u, t),
          !p[l] || "none" !== O(a, "display"))
        ) {
          if ("auto" === i.slidesPerView) {
            A && (p[l].style[t("width")] = "");
            const n = getComputedStyle(a),
              r = a.style.transform,
              o = a.style.webkitTransform;
            if (
              (r && (a.style.transform = "none"),
              o && (a.style.webkitTransform = "none"),
              i.roundLengths)
            )
              x = e.isHorizontal() ? $(a, "width", !0) : $(a, "height", !0);
            else {
              const e = s(n, "width"),
                t = s(n, "padding-left"),
                i = s(n, "padding-right"),
                l = s(n, "margin-left"),
                r = s(n, "margin-right"),
                o = n.getPropertyValue("box-sizing");
              if (o && "border-box" === o) x = e + l + r;
              else {
                const { clientWidth: s, offsetWidth: n } = a;
                x = e + t + i + l + r + (n - s);
              }
            }
            r && (a.style.transform = r),
              o && (a.style.webkitTransform = o),
              i.roundLengths && (x = Math.floor(x));
          } else
            (x = (n - (i.slidesPerView - 1) * y) / i.slidesPerView),
              i.roundLengths && (x = Math.floor(x)),
              p[l] && (p[l].style[t("width")] = `${x}px`);
          p[l] && (p[l].swiperSlideSize = x),
            f.push(x),
            i.centeredSlides
              ? ((w = w + x / 2 + E / 2 + y),
                0 === E && 0 !== l && (w = w - n / 2 - y),
                0 === l && (w = w - n / 2 - y),
                Math.abs(w) < 0.001 && (w = 0),
                i.roundLengths && (w = Math.floor(w)),
                T % i.slidesPerGroup == 0 && h.push(w),
                m.push(w))
              : (i.roundLengths && (w = Math.floor(w)),
                (T - Math.min(e.params.slidesPerGroupSkip, T)) %
                  e.params.slidesPerGroup ==
                  0 && h.push(w),
                m.push(w),
                (w = w + x + y)),
            (e.virtualSize += x + y),
            (E = x),
            (T += 1);
        }
      }
      if (
        ((e.virtualSize = Math.max(e.virtualSize, n) + v),
        r &&
          o &&
          ("slide" === i.effect || "coverflow" === i.effect) &&
          (l.style.width = `${e.virtualSize + y}px`),
        i.setWrapperSize && (l.style[t("width")] = `${e.virtualSize + y}px`),
        C && e.grid.updateWrapperSize(x, h, t),
        !i.centeredSlides)
      ) {
        const t = [];
        for (let s = 0; s < h.length; s += 1) {
          let l = h[s];
          i.roundLengths && (l = Math.floor(l)),
            h[s] <= e.virtualSize - n && t.push(l);
        }
        (h = t),
          Math.floor(e.virtualSize - n) - Math.floor(h[h.length - 1]) > 1 &&
            h.push(e.virtualSize - n);
      }
      if (c && i.loop) {
        const t = f[0] + y;
        if (i.slidesPerGroup > 1) {
          const s = Math.ceil(
              (e.virtual.slidesBefore + e.virtual.slidesAfter) /
                i.slidesPerGroup,
            ),
            l = t * i.slidesPerGroup;
          for (let e = 0; e < s; e += 1) h.push(h[h.length - 1] + l);
        }
        for (
          let s = 0;
          s < e.virtual.slidesBefore + e.virtual.slidesAfter;
          s += 1
        )
          1 === i.slidesPerGroup && h.push(h[h.length - 1] + t),
            m.push(m[m.length - 1] + t),
            (e.virtualSize += t);
      }
      if ((0 === h.length && (h = [0]), 0 !== y)) {
        const s = e.isHorizontal() && r ? "marginLeft" : t("marginRight");
        p.filter(
          (e, t) => !(i.cssMode && !i.loop) || t !== p.length - 1,
        ).forEach((e) => {
          e.style[s] = `${y}px`;
        });
      }
      if (i.centeredSlides && i.centeredSlidesBounds) {
        let e = 0;
        f.forEach((t) => {
          e += t + (y || 0);
        }),
          (e -= y);
        const t = e - n;
        h = h.map((e) => (e <= 0 ? -g : e > t ? t + v : e));
      }
      if (i.centerInsufficientSlides) {
        let e = 0;
        if (
          (f.forEach((t) => {
            e += t + (y || 0);
          }),
          (e -= y),
          e < n)
        ) {
          const t = (n - e) / 2;
          h.forEach((e, s) => {
            h[s] = e - t;
          }),
            m.forEach((e, s) => {
              m[s] = e + t;
            });
        }
      }
      if (
        (Object.assign(e, {
          slides: p,
          snapGrid: h,
          slidesGrid: m,
          slidesSizesGrid: f,
        }),
        i.centeredSlides && i.cssMode && !i.centeredSlidesBounds)
      ) {
        L(l, "--swiper-centered-offset-before", -h[0] + "px"),
          L(
            l,
            "--swiper-centered-offset-after",
            e.size / 2 - f[f.length - 1] / 2 + "px",
          );
        const t = -e.snapGrid[0],
          s = -e.slidesGrid[0];
        (e.snapGrid = e.snapGrid.map((e) => e + t)),
          (e.slidesGrid = e.slidesGrid.map((e) => e + s));
      }
      if (
        (u !== d && e.emit("slidesLengthChange"),
        h.length !== S &&
          (e.params.watchOverflow && e.checkOverflow(),
          e.emit("snapGridLengthChange")),
        m.length !== b && e.emit("slidesGridLengthChange"),
        i.watchSlidesProgress && e.updateSlidesOffset(),
        !(c || i.cssMode || ("slide" !== i.effect && "fade" !== i.effect)))
      ) {
        const t = `${i.containerModifierClass}backface-hidden`,
          s = e.el.classList.contains(t);
        u <= i.maxBackfaceHiddenSlides
          ? s || e.el.classList.add(t)
          : s && e.el.classList.remove(t);
      }
    },
    updateAutoHeight: function (e) {
      const t = this,
        s = [],
        i = t.virtual && t.params.virtual.enabled;
      let l,
        a = 0;
      "number" == typeof e
        ? t.setTransition(e)
        : !0 === e && t.setTransition(t.params.speed);
      const n = (e) => (i ? t.slides[t.getSlideIndexByData(e)] : t.slides[e]);
      if ("auto" !== t.params.slidesPerView && t.params.slidesPerView > 1)
        if (t.params.centeredSlides)
          (t.visibleSlides || []).forEach((e) => {
            s.push(e);
          });
        else
          for (l = 0; l < Math.ceil(t.params.slidesPerView); l += 1) {
            const e = t.activeIndex + l;
            if (e > t.slides.length && !i) break;
            s.push(n(e));
          }
      else s.push(n(t.activeIndex));
      for (l = 0; l < s.length; l += 1)
        if (void 0 !== s[l]) {
          const e = s[l].offsetHeight;
          a = e > a ? e : a;
        }
      (a || 0 === a) && (t.wrapperEl.style.height = `${a}px`);
    },
    updateSlidesOffset: function () {
      const e = this,
        t = e.slides,
        s = e.isElement
          ? e.isHorizontal()
            ? e.wrapperEl.offsetLeft
            : e.wrapperEl.offsetTop
          : 0;
      for (let i = 0; i < t.length; i += 1)
        t[i].swiperSlideOffset =
          (e.isHorizontal() ? t[i].offsetLeft : t[i].offsetTop) -
          s -
          e.cssOverflowAdjustment();
    },
    updateSlidesProgress: function (e) {
      void 0 === e && (e = (this && this.translate) || 0);
      const t = this,
        s = t.params,
        { slides: i, rtlTranslate: l, snapGrid: a } = t;
      if (0 === i.length) return;
      void 0 === i[0].swiperSlideOffset && t.updateSlidesOffset();
      let n = -e;
      l && (n = e),
        i.forEach((e) => {
          e.classList.remove(s.slideVisibleClass);
        }),
        (t.visibleSlidesIndexes = []),
        (t.visibleSlides = []);
      let r = s.spaceBetween;
      "string" == typeof r && r.indexOf("%") >= 0
        ? (r = (parseFloat(r.replace("%", "")) / 100) * t.size)
        : "string" == typeof r && (r = parseFloat(r));
      for (let e = 0; e < i.length; e += 1) {
        const o = i[e];
        let c = o.swiperSlideOffset;
        s.cssMode && s.centeredSlides && (c -= i[0].swiperSlideOffset);
        const d =
            (n + (s.centeredSlides ? t.minTranslate() : 0) - c) /
            (o.swiperSlideSize + r),
          p =
            (n - a[0] + (s.centeredSlides ? t.minTranslate() : 0) - c) /
            (o.swiperSlideSize + r),
          u = -(n - c),
          h = u + t.slidesSizesGrid[e];
        ((u >= 0 && u < t.size - 1) ||
          (h > 1 && h <= t.size) ||
          (u <= 0 && h >= t.size)) &&
          (t.visibleSlides.push(o),
          t.visibleSlidesIndexes.push(e),
          i[e].classList.add(s.slideVisibleClass)),
          (o.progress = l ? -d : d),
          (o.originalProgress = l ? -p : p);
      }
    },
    updateProgress: function (e) {
      const t = this;
      if (void 0 === e) {
        const s = t.rtlTranslate ? -1 : 1;
        e = (t && t.translate && t.translate * s) || 0;
      }
      const s = t.params,
        i = t.maxTranslate() - t.minTranslate();
      let { progress: l, isBeginning: a, isEnd: n, progressLoop: r } = t;
      const o = a,
        c = n;
      if (0 === i) (l = 0), (a = !0), (n = !0);
      else {
        l = (e - t.minTranslate()) / i;
        const s = Math.abs(e - t.minTranslate()) < 1,
          r = Math.abs(e - t.maxTranslate()) < 1;
        (a = s || l <= 0), (n = r || l >= 1), s && (l = 0), r && (l = 1);
      }
      if (s.loop) {
        const s = t.getSlideIndexByData(0),
          i = t.getSlideIndexByData(t.slides.length - 1),
          l = t.slidesGrid[s],
          a = t.slidesGrid[i],
          n = t.slidesGrid[t.slidesGrid.length - 1],
          o = Math.abs(e);
        (r = o >= l ? (o - l) / n : (o + n - a) / n), r > 1 && (r -= 1);
      }
      Object.assign(t, {
        progress: l,
        progressLoop: r,
        isBeginning: a,
        isEnd: n,
      }),
        (s.watchSlidesProgress || (s.centeredSlides && s.autoHeight)) &&
          t.updateSlidesProgress(e),
        a && !o && t.emit("reachBeginning toEdge"),
        n && !c && t.emit("reachEnd toEdge"),
        ((o && !a) || (c && !n)) && t.emit("fromEdge"),
        t.emit("progress", l);
    },
    updateSlidesClasses: function () {
      const e = this,
        { slides: t, params: s, slidesEl: i, activeIndex: l } = e,
        a = e.virtual && s.virtual.enabled,
        n = (e) => P(i, `.${s.slideClass}${e}, swiper-slide${e}`)[0];
      let r;
      if (
        (t.forEach((e) => {
          e.classList.remove(
            s.slideActiveClass,
            s.slideNextClass,
            s.slidePrevClass,
          );
        }),
        a)
      )
        if (s.loop) {
          let t = l - e.virtual.slidesBefore;
          t < 0 && (t = e.virtual.slides.length + t),
            t >= e.virtual.slides.length && (t -= e.virtual.slides.length),
            (r = n(`[data-swiper-slide-index="${t}"]`));
        } else r = n(`[data-swiper-slide-index="${l}"]`);
      else r = t[l];
      if (r) {
        r.classList.add(s.slideActiveClass);
        let e = (function (e, t) {
          const s = [];
          for (; e.nextElementSibling; ) {
            const i = e.nextElementSibling;
            t ? i.matches(t) && s.push(i) : s.push(i), (e = i);
          }
          return s;
        })(r, `.${s.slideClass}, swiper-slide`)[0];
        s.loop && !e && (e = t[0]), e && e.classList.add(s.slideNextClass);
        let i = (function (e, t) {
          const s = [];
          for (; e.previousElementSibling; ) {
            const i = e.previousElementSibling;
            t ? i.matches(t) && s.push(i) : s.push(i), (e = i);
          }
          return s;
        })(r, `.${s.slideClass}, swiper-slide`)[0];
        s.loop && 0 === !i && (i = t[t.length - 1]),
          i && i.classList.add(s.slidePrevClass);
      }
      e.emitSlidesClasses();
    },
    updateActiveIndex: function (e) {
      const t = this,
        s = t.rtlTranslate ? t.translate : -t.translate,
        {
          snapGrid: i,
          params: l,
          activeIndex: a,
          realIndex: n,
          snapIndex: r,
        } = t;
      let o,
        c = e;
      const d = (e) => {
        let s = e - t.virtual.slidesBefore;
        return (
          s < 0 && (s = t.virtual.slides.length + s),
          s >= t.virtual.slides.length && (s -= t.virtual.slides.length),
          s
        );
      };
      if (
        (void 0 === c &&
          (c = (function (e) {
            const { slidesGrid: t, params: s } = e,
              i = e.rtlTranslate ? e.translate : -e.translate;
            let l;
            for (let e = 0; e < t.length; e += 1)
              void 0 !== t[e + 1]
                ? i >= t[e] && i < t[e + 1] - (t[e + 1] - t[e]) / 2
                  ? (l = e)
                  : i >= t[e] && i < t[e + 1] && (l = e + 1)
                : i >= t[e] && (l = e);
            return (
              s.normalizeSlideIndex && (l < 0 || void 0 === l) && (l = 0), l
            );
          })(t)),
        i.indexOf(s) >= 0)
      )
        o = i.indexOf(s);
      else {
        const e = Math.min(l.slidesPerGroupSkip, c);
        o = e + Math.floor((c - e) / l.slidesPerGroup);
      }
      if ((o >= i.length && (o = i.length - 1), c === a))
        return (
          o !== r && ((t.snapIndex = o), t.emit("snapIndexChange")),
          void (
            t.params.loop &&
            t.virtual &&
            t.params.virtual.enabled &&
            (t.realIndex = d(c))
          )
        );
      let p;
      (p =
        t.virtual && l.virtual.enabled && l.loop
          ? d(c)
          : t.slides[c]
          ? parseInt(
              t.slides[c].getAttribute("data-swiper-slide-index") || c,
              10,
            )
          : c),
        Object.assign(t, {
          previousSnapIndex: r,
          snapIndex: o,
          previousRealIndex: n,
          realIndex: p,
          previousIndex: a,
          activeIndex: c,
        }),
        t.initialized && N(t),
        t.emit("activeIndexChange"),
        t.emit("snapIndexChange"),
        (t.initialized || t.params.runCallbacksOnInit) &&
          (n !== p && t.emit("realIndexChange"), t.emit("slideChange"));
    },
    updateClickedSlide: function (e, t) {
      const s = this,
        i = s.params;
      let l = e.closest(`.${i.slideClass}, swiper-slide`);
      !l &&
        s.isElement &&
        t &&
        t.length > 1 &&
        t.includes(e) &&
        [...t.slice(t.indexOf(e) + 1, t.length)].forEach((e) => {
          !l &&
            e.matches &&
            e.matches(`.${i.slideClass}, swiper-slide`) &&
            (l = e);
        });
      let a,
        n = !1;
      if (l)
        for (let e = 0; e < s.slides.length; e += 1)
          if (s.slides[e] === l) {
            (n = !0), (a = e);
            break;
          }
      if (!l || !n)
        return (s.clickedSlide = void 0), void (s.clickedIndex = void 0);
      (s.clickedSlide = l),
        s.virtual && s.params.virtual.enabled
          ? (s.clickedIndex = parseInt(
              l.getAttribute("data-swiper-slide-index"),
              10,
            ))
          : (s.clickedIndex = a),
        i.slideToClickedSlide &&
          void 0 !== s.clickedIndex &&
          s.clickedIndex !== s.activeIndex &&
          s.slideToClickedSlide();
    },
  };
  var R = {
    getTranslate: function (e) {
      void 0 === e && (e = this.isHorizontal() ? "x" : "y");
      const { params: t, rtlTranslate: s, translate: i, wrapperEl: l } = this;
      if (t.virtualTranslate) return s ? -i : i;
      if (t.cssMode) return i;
      let a = T(l, e);
      return (a += this.cssOverflowAdjustment()), s && (a = -a), a || 0;
    },
    setTranslate: function (e, t) {
      const s = this,
        { rtlTranslate: i, params: l, wrapperEl: a, progress: n } = s;
      let r,
        o = 0,
        c = 0;
      s.isHorizontal() ? (o = i ? -e : e) : (c = e),
        l.roundLengths && ((o = Math.floor(o)), (c = Math.floor(c))),
        (s.previousTranslate = s.translate),
        (s.translate = s.isHorizontal() ? o : c),
        l.cssMode
          ? (a[s.isHorizontal() ? "scrollLeft" : "scrollTop"] = s.isHorizontal()
              ? -o
              : -c)
          : l.virtualTranslate ||
            (s.isHorizontal()
              ? (o -= s.cssOverflowAdjustment())
              : (c -= s.cssOverflowAdjustment()),
            (a.style.transform = `translate3d(${o}px, ${c}px, 0px)`));
      const d = s.maxTranslate() - s.minTranslate();
      (r = 0 === d ? 0 : (e - s.minTranslate()) / d),
        r !== n && s.updateProgress(e),
        s.emit("setTranslate", s.translate, t);
    },
    minTranslate: function () {
      return -this.snapGrid[0];
    },
    maxTranslate: function () {
      return -this.snapGrid[this.snapGrid.length - 1];
    },
    translateTo: function (e, t, s, i, l) {
      void 0 === e && (e = 0),
        void 0 === t && (t = this.params.speed),
        void 0 === s && (s = !0),
        void 0 === i && (i = !0);
      const a = this,
        { params: n, wrapperEl: r } = a;
      if (a.animating && n.preventInteractionOnTransition) return !1;
      const o = a.minTranslate(),
        c = a.maxTranslate();
      let d;
      if (
        ((d = i && e > o ? o : i && e < c ? c : e),
        a.updateProgress(d),
        n.cssMode)
      ) {
        const e = a.isHorizontal();
        if (0 === t) r[e ? "scrollLeft" : "scrollTop"] = -d;
        else {
          if (!a.support.smoothScroll)
            return (
              A({ swiper: a, targetPosition: -d, side: e ? "left" : "top" }), !0
            );
          r.scrollTo({ [e ? "left" : "top"]: -d, behavior: "smooth" });
        }
        return !0;
      }
      return (
        0 === t
          ? (a.setTransition(0),
            a.setTranslate(d),
            s &&
              (a.emit("beforeTransitionStart", t, l), a.emit("transitionEnd")))
          : (a.setTransition(t),
            a.setTranslate(d),
            s &&
              (a.emit("beforeTransitionStart", t, l),
              a.emit("transitionStart")),
            a.animating ||
              ((a.animating = !0),
              a.onTranslateToWrapperTransitionEnd ||
                (a.onTranslateToWrapperTransitionEnd = function (e) {
                  a &&
                    !a.destroyed &&
                    e.target === this &&
                    (a.wrapperEl.removeEventListener(
                      "transitionend",
                      a.onTranslateToWrapperTransitionEnd,
                    ),
                    (a.onTranslateToWrapperTransitionEnd = null),
                    delete a.onTranslateToWrapperTransitionEnd,
                    s && a.emit("transitionEnd"));
                }),
              a.wrapperEl.addEventListener(
                "transitionend",
                a.onTranslateToWrapperTransitionEnd,
              ))),
        !0
      );
    },
  };
  function W(e) {
    let { swiper: t, runCallbacks: s, direction: i, step: l } = e;
    const { activeIndex: a, previousIndex: n } = t;
    let r = i;
    if (
      (r || (r = a > n ? "next" : a < n ? "prev" : "reset"),
      t.emit(`transition${l}`),
      s && a !== n)
    ) {
      if ("reset" === r) return void t.emit(`slideResetTransition${l}`);
      t.emit(`slideChangeTransition${l}`),
        "next" === r
          ? t.emit(`slideNextTransition${l}`)
          : t.emit(`slidePrevTransition${l}`);
    }
  }
  var Y = {
    slideTo: function (e, t, s, i, l) {
      void 0 === e && (e = 0),
        void 0 === t && (t = this.params.speed),
        void 0 === s && (s = !0),
        "string" == typeof e && (e = parseInt(e, 10));
      const a = this;
      let n = e;
      n < 0 && (n = 0);
      const {
        params: r,
        snapGrid: o,
        slidesGrid: c,
        previousIndex: d,
        activeIndex: p,
        rtlTranslate: u,
        wrapperEl: h,
        enabled: m,
      } = a;
      if ((a.animating && r.preventInteractionOnTransition) || (!m && !i && !l))
        return !1;
      const f = Math.min(a.params.slidesPerGroupSkip, n);
      let g = f + Math.floor((n - f) / a.params.slidesPerGroup);
      g >= o.length && (g = o.length - 1);
      const v = -o[g];
      if (r.normalizeSlideIndex)
        for (let e = 0; e < c.length; e += 1) {
          const t = -Math.floor(100 * v),
            s = Math.floor(100 * c[e]),
            i = Math.floor(100 * c[e + 1]);
          void 0 !== c[e + 1]
            ? t >= s && t < i - (i - s) / 2
              ? (n = e)
              : t >= s && t < i && (n = e + 1)
            : t >= s && (n = e);
        }
      if (a.initialized && n !== p) {
        if (
          !a.allowSlideNext &&
          (u
            ? v > a.translate && v > a.minTranslate()
            : v < a.translate && v < a.minTranslate())
        )
          return !1;
        if (
          !a.allowSlidePrev &&
          v > a.translate &&
          v > a.maxTranslate() &&
          (p || 0) !== n
        )
          return !1;
      }
      let S;
      if (
        (n !== (d || 0) && s && a.emit("beforeSlideChangeStart"),
        a.updateProgress(v),
        (S = n > p ? "next" : n < p ? "prev" : "reset"),
        (u && -v === a.translate) || (!u && v === a.translate))
      )
        return (
          a.updateActiveIndex(n),
          r.autoHeight && a.updateAutoHeight(),
          a.updateSlidesClasses(),
          "slide" !== r.effect && a.setTranslate(v),
          "reset" !== S && (a.transitionStart(s, S), a.transitionEnd(s, S)),
          !1
        );
      if (r.cssMode) {
        const e = a.isHorizontal(),
          s = u ? v : -v;
        if (0 === t) {
          const t = a.virtual && a.params.virtual.enabled;
          t &&
            ((a.wrapperEl.style.scrollSnapType = "none"),
            (a._immediateVirtual = !0)),
            t && !a._cssModeVirtualInitialSet && a.params.initialSlide > 0
              ? ((a._cssModeVirtualInitialSet = !0),
                requestAnimationFrame(() => {
                  h[e ? "scrollLeft" : "scrollTop"] = s;
                }))
              : (h[e ? "scrollLeft" : "scrollTop"] = s),
            t &&
              requestAnimationFrame(() => {
                (a.wrapperEl.style.scrollSnapType = ""),
                  (a._immediateVirtual = !1);
              });
        } else {
          if (!a.support.smoothScroll)
            return (
              A({ swiper: a, targetPosition: s, side: e ? "left" : "top" }), !0
            );
          h.scrollTo({ [e ? "left" : "top"]: s, behavior: "smooth" });
        }
        return !0;
      }
      return (
        a.setTransition(t),
        a.setTranslate(v),
        a.updateActiveIndex(n),
        a.updateSlidesClasses(),
        a.emit("beforeTransitionStart", t, i),
        a.transitionStart(s, S),
        0 === t
          ? a.transitionEnd(s, S)
          : a.animating ||
            ((a.animating = !0),
            a.onSlideToWrapperTransitionEnd ||
              (a.onSlideToWrapperTransitionEnd = function (e) {
                a &&
                  !a.destroyed &&
                  e.target === this &&
                  (a.wrapperEl.removeEventListener(
                    "transitionend",
                    a.onSlideToWrapperTransitionEnd,
                  ),
                  (a.onSlideToWrapperTransitionEnd = null),
                  delete a.onSlideToWrapperTransitionEnd,
                  a.transitionEnd(s, S));
              }),
            a.wrapperEl.addEventListener(
              "transitionend",
              a.onSlideToWrapperTransitionEnd,
            )),
        !0
      );
    },
    slideToLoop: function (e, t, s, i) {
      if (
        (void 0 === e && (e = 0),
        void 0 === t && (t = this.params.speed),
        void 0 === s && (s = !0),
        "string" == typeof e)
      ) {
        e = parseInt(e, 10);
      }
      const l = this;
      let a = e;
      return (
        l.params.loop &&
          (l.virtual && l.params.virtual.enabled
            ? (a += l.virtual.slidesBefore)
            : (a = l.getSlideIndexByData(a))),
        l.slideTo(a, t, s, i)
      );
    },
    slideNext: function (e, t, s) {
      void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
      const i = this,
        { enabled: l, params: a, animating: n } = i;
      if (!l) return i;
      let r = a.slidesPerGroup;
      "auto" === a.slidesPerView &&
        1 === a.slidesPerGroup &&
        a.slidesPerGroupAuto &&
        (r = Math.max(i.slidesPerViewDynamic("current", !0), 1));
      const o = i.activeIndex < a.slidesPerGroupSkip ? 1 : r,
        c = i.virtual && a.virtual.enabled;
      if (a.loop) {
        if (n && !c && a.loopPreventsSliding) return !1;
        if (
          (i.loopFix({ direction: "next" }),
          (i._clientLeft = i.wrapperEl.clientLeft),
          i.activeIndex === i.slides.length - 1 && a.cssMode)
        )
          return (
            requestAnimationFrame(() => {
              i.slideTo(i.activeIndex + o, e, t, s);
            }),
            !0
          );
      }
      return a.rewind && i.isEnd
        ? i.slideTo(0, e, t, s)
        : i.slideTo(i.activeIndex + o, e, t, s);
    },
    slidePrev: function (e, t, s) {
      void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
      const i = this,
        {
          params: l,
          snapGrid: a,
          slidesGrid: n,
          rtlTranslate: r,
          enabled: o,
          animating: c,
        } = i;
      if (!o) return i;
      const d = i.virtual && l.virtual.enabled;
      if (l.loop) {
        if (c && !d && l.loopPreventsSliding) return !1;
        i.loopFix({ direction: "prev" }),
          (i._clientLeft = i.wrapperEl.clientLeft);
      }
      function p(e) {
        return e < 0 ? -Math.floor(Math.abs(e)) : Math.floor(e);
      }
      const u = p(r ? i.translate : -i.translate),
        h = a.map((e) => p(e));
      let m = a[h.indexOf(u) - 1];
      if (void 0 === m && l.cssMode) {
        let e;
        a.forEach((t, s) => {
          u >= t && (e = s);
        }),
          void 0 !== e && (m = a[e > 0 ? e - 1 : e]);
      }
      let f = 0;
      if (
        (void 0 !== m &&
          ((f = n.indexOf(m)),
          f < 0 && (f = i.activeIndex - 1),
          "auto" === l.slidesPerView &&
            1 === l.slidesPerGroup &&
            l.slidesPerGroupAuto &&
            ((f = f - i.slidesPerViewDynamic("previous", !0) + 1),
            (f = Math.max(f, 0)))),
        l.rewind && i.isBeginning)
      ) {
        const l =
          i.params.virtual && i.params.virtual.enabled && i.virtual
            ? i.virtual.slides.length - 1
            : i.slides.length - 1;
        return i.slideTo(l, e, t, s);
      }
      return l.loop && 0 === i.activeIndex && l.cssMode
        ? (requestAnimationFrame(() => {
            i.slideTo(f, e, t, s);
          }),
          !0)
        : i.slideTo(f, e, t, s);
    },
    slideReset: function (e, t, s) {
      return (
        void 0 === e && (e = this.params.speed),
        void 0 === t && (t = !0),
        this.slideTo(this.activeIndex, e, t, s)
      );
    },
    slideToClosest: function (e, t, s, i) {
      void 0 === e && (e = this.params.speed),
        void 0 === t && (t = !0),
        void 0 === i && (i = 0.5);
      const l = this;
      let a = l.activeIndex;
      const n = Math.min(l.params.slidesPerGroupSkip, a),
        r = n + Math.floor((a - n) / l.params.slidesPerGroup),
        o = l.rtlTranslate ? l.translate : -l.translate;
      if (o >= l.snapGrid[r]) {
        const e = l.snapGrid[r];
        o - e > (l.snapGrid[r + 1] - e) * i && (a += l.params.slidesPerGroup);
      } else {
        const e = l.snapGrid[r - 1];
        o - e <= (l.snapGrid[r] - e) * i && (a -= l.params.slidesPerGroup);
      }
      return (
        (a = Math.max(a, 0)),
        (a = Math.min(a, l.slidesGrid.length - 1)),
        l.slideTo(a, e, t, s)
      );
    },
    slideToClickedSlide: function () {
      const e = this,
        { params: t, slidesEl: s } = e,
        i =
          "auto" === t.slidesPerView
            ? e.slidesPerViewDynamic()
            : t.slidesPerView;
      let l,
        a = e.clickedIndex;
      const n = e.isElement ? "swiper-slide" : `.${t.slideClass}`;
      if (t.loop) {
        if (e.animating) return;
        (l = parseInt(
          e.clickedSlide.getAttribute("data-swiper-slide-index"),
          10,
        )),
          t.centeredSlides
            ? a < e.loopedSlides - i / 2 ||
              a > e.slides.length - e.loopedSlides + i / 2
              ? (e.loopFix(),
                (a = e.getSlideIndex(
                  P(s, `${n}[data-swiper-slide-index="${l}"]`)[0],
                )),
                w(() => {
                  e.slideTo(a);
                }))
              : e.slideTo(a)
            : a > e.slides.length - i
            ? (e.loopFix(),
              (a = e.getSlideIndex(
                P(s, `${n}[data-swiper-slide-index="${l}"]`)[0],
              )),
              w(() => {
                e.slideTo(a);
              }))
            : e.slideTo(a);
      } else e.slideTo(a);
    },
  };
  var X = {
    loopCreate: function (e) {
      const t = this,
        { params: s, slidesEl: i } = t;
      if (!s.loop || (t.virtual && t.params.virtual.enabled)) return;
      P(i, `.${s.slideClass}, swiper-slide`).forEach((e, t) => {
        e.setAttribute("data-swiper-slide-index", t);
      }),
        t.loopFix({
          slideRealIndex: e,
          direction: s.centeredSlides ? void 0 : "next",
        });
    },
    loopFix: function (e) {
      let {
        slideRealIndex: t,
        slideTo: s = !0,
        direction: i,
        setTranslate: l,
        activeSlideIndex: a,
        byController: n,
        byMousewheel: r,
      } = void 0 === e ? {} : e;
      const o = this;
      if (!o.params.loop) return;
      o.emit("beforeLoopFix");
      const {
        slides: c,
        allowSlidePrev: d,
        allowSlideNext: p,
        slidesEl: u,
        params: h,
      } = o;
      if (
        ((o.allowSlidePrev = !0),
        (o.allowSlideNext = !0),
        o.virtual && h.virtual.enabled)
      )
        return (
          s &&
            (h.centeredSlides || 0 !== o.snapIndex
              ? h.centeredSlides && o.snapIndex < h.slidesPerView
                ? o.slideTo(o.virtual.slides.length + o.snapIndex, 0, !1, !0)
                : o.snapIndex === o.snapGrid.length - 1 &&
                  o.slideTo(o.virtual.slidesBefore, 0, !1, !0)
              : o.slideTo(o.virtual.slides.length, 0, !1, !0)),
          (o.allowSlidePrev = d),
          (o.allowSlideNext = p),
          void o.emit("loopFix")
        );
      const m =
        "auto" === h.slidesPerView
          ? o.slidesPerViewDynamic()
          : Math.ceil(parseFloat(h.slidesPerView, 10));
      let f = h.loopedSlides || m;
      f % h.slidesPerGroup != 0 &&
        (f += h.slidesPerGroup - (f % h.slidesPerGroup)),
        (o.loopedSlides = f);
      const g = [],
        v = [];
      let S = o.activeIndex;
      void 0 === a
        ? (a = o.getSlideIndex(
            o.slides.filter((e) => e.classList.contains(h.slideActiveClass))[0],
          ))
        : (S = a);
      const b = "next" === i || !i,
        y = "prev" === i || !i;
      let w = 0,
        E = 0;
      if (a < f) {
        w = Math.max(f - a, h.slidesPerGroup);
        for (let e = 0; e < f - a; e += 1) {
          const t = e - Math.floor(e / c.length) * c.length;
          g.push(c.length - t - 1);
        }
      } else if (a > o.slides.length - 2 * f) {
        E = Math.max(a - (o.slides.length - 2 * f), h.slidesPerGroup);
        for (let e = 0; e < E; e += 1) {
          const t = e - Math.floor(e / c.length) * c.length;
          v.push(t);
        }
      }
      if (
        (y &&
          g.forEach((e) => {
            (o.slides[e].swiperLoopMoveDOM = !0),
              u.prepend(o.slides[e]),
              (o.slides[e].swiperLoopMoveDOM = !1);
          }),
        b &&
          v.forEach((e) => {
            (o.slides[e].swiperLoopMoveDOM = !0),
              u.append(o.slides[e]),
              (o.slides[e].swiperLoopMoveDOM = !1);
          }),
        o.recalcSlides(),
        "auto" === h.slidesPerView && o.updateSlides(),
        h.watchSlidesProgress && o.updateSlidesOffset(),
        s)
      )
        if (g.length > 0 && y)
          if (void 0 === t) {
            const e = o.slidesGrid[S],
              t = o.slidesGrid[S + w] - e;
            r
              ? o.setTranslate(o.translate - t)
              : (o.slideTo(S + w, 0, !1, !0),
                l &&
                  ((o.touches[o.isHorizontal() ? "startX" : "startY"] += t),
                  (o.touchEventsData.currentTranslate = o.translate)));
          } else
            l &&
              (o.slideToLoop(t, 0, !1, !0),
              (o.touchEventsData.currentTranslate = o.translate));
        else if (v.length > 0 && b)
          if (void 0 === t) {
            const e = o.slidesGrid[S],
              t = o.slidesGrid[S - E] - e;
            r
              ? o.setTranslate(o.translate - t)
              : (o.slideTo(S - E, 0, !1, !0),
                l &&
                  ((o.touches[o.isHorizontal() ? "startX" : "startY"] += t),
                  (o.touchEventsData.currentTranslate = o.translate)));
          } else o.slideToLoop(t, 0, !1, !0);
      if (
        ((o.allowSlidePrev = d),
        (o.allowSlideNext = p),
        o.controller && o.controller.control && !n)
      ) {
        const e = {
          slideRealIndex: t,
          direction: i,
          setTranslate: l,
          activeSlideIndex: a,
          byController: !0,
        };
        Array.isArray(o.controller.control)
          ? o.controller.control.forEach((t) => {
              !t.destroyed &&
                t.params.loop &&
                t.loopFix({
                  ...e,
                  slideTo: t.params.slidesPerView === h.slidesPerView && s,
                });
            })
          : o.controller.control instanceof o.constructor &&
            o.controller.control.params.loop &&
            o.controller.control.loopFix({
              ...e,
              slideTo:
                o.controller.control.params.slidesPerView === h.slidesPerView &&
                s,
            });
      }
      o.emit("loopFix");
    },
    loopDestroy: function () {
      const e = this,
        { params: t, slidesEl: s } = e;
      if (!t.loop || (e.virtual && e.params.virtual.enabled)) return;
      e.recalcSlides();
      const i = [];
      e.slides.forEach((e) => {
        const t =
          void 0 === e.swiperSlideIndex
            ? 1 * e.getAttribute("data-swiper-slide-index")
            : e.swiperSlideIndex;
        i[t] = e;
      }),
        e.slides.forEach((e) => {
          e.removeAttribute("data-swiper-slide-index");
        }),
        i.forEach((e) => {
          s.append(e);
        }),
        e.recalcSlides(),
        e.slideTo(e.realIndex, 0);
    },
  };
  function U(e) {
    const t = this,
      s = S(),
      i = y(),
      l = t.touchEventsData;
    l.evCache.push(e);
    const { params: a, touches: n, enabled: r } = t;
    if (!r) return;
    if (!a.simulateTouch && "mouse" === e.pointerType) return;
    if (t.animating && a.preventInteractionOnTransition) return;
    !t.animating && a.cssMode && a.loop && t.loopFix();
    let o = e;
    o.originalEvent && (o = o.originalEvent);
    let c = o.target;
    if ("wrapper" === a.touchEventsTarget && !t.wrapperEl.contains(c)) return;
    if ("which" in o && 3 === o.which) return;
    if ("button" in o && o.button > 0) return;
    if (l.isTouched && l.isMoved) return;
    const d = !!a.noSwipingClass && "" !== a.noSwipingClass,
      p = e.composedPath ? e.composedPath() : e.path;
    d && o.target && o.target.shadowRoot && p && (c = p[0]);
    const u = a.noSwipingSelector
        ? a.noSwipingSelector
        : `.${a.noSwipingClass}`,
      h = !(!o.target || !o.target.shadowRoot);
    if (
      a.noSwiping &&
      (h
        ? (function (e, t) {
            return (
              void 0 === t && (t = this),
              (function t(s) {
                if (!s || s === S() || s === y()) return null;
                s.assignedSlot && (s = s.assignedSlot);
                const i = s.closest(e);
                return i || s.getRootNode ? i || t(s.getRootNode().host) : null;
              })(t)
            );
          })(u, c)
        : c.closest(u))
    )
      return void (t.allowClick = !0);
    if (a.swipeHandler && !c.closest(a.swipeHandler)) return;
    (n.currentX = o.pageX), (n.currentY = o.pageY);
    const m = n.currentX,
      f = n.currentY,
      g = a.edgeSwipeDetection || a.iOSEdgeSwipeDetection,
      v = a.edgeSwipeThreshold || a.iOSEdgeSwipeThreshold;
    if (g && (m <= v || m >= i.innerWidth - v)) {
      if ("prevent" !== g) return;
      e.preventDefault();
    }
    Object.assign(l, {
      isTouched: !0,
      isMoved: !1,
      allowTouchCallbacks: !0,
      isScrolling: void 0,
      startMoving: void 0,
    }),
      (n.startX = m),
      (n.startY = f),
      (l.touchStartTime = E()),
      (t.allowClick = !0),
      t.updateSize(),
      (t.swipeDirection = void 0),
      a.threshold > 0 && (l.allowThresholdMove = !1);
    let b = !0;
    c.matches(l.focusableElements) &&
      ((b = !1), "SELECT" === c.nodeName && (l.isTouched = !1)),
      s.activeElement &&
        s.activeElement.matches(l.focusableElements) &&
        s.activeElement !== c &&
        s.activeElement.blur();
    const w = b && t.allowTouchMove && a.touchStartPreventDefault;
    (!a.touchStartForcePreventDefault && !w) ||
      c.isContentEditable ||
      o.preventDefault(),
      a.freeMode &&
        a.freeMode.enabled &&
        t.freeMode &&
        t.animating &&
        !a.cssMode &&
        t.freeMode.onTouchStart(),
      t.emit("touchStart", o);
  }
  function K(e) {
    const t = S(),
      s = this,
      i = s.touchEventsData,
      { params: l, touches: a, rtlTranslate: n, enabled: r } = s;
    if (!r) return;
    if (!l.simulateTouch && "mouse" === e.pointerType) return;
    let o = e;
    if ((o.originalEvent && (o = o.originalEvent), !i.isTouched))
      return void (
        i.startMoving &&
        i.isScrolling &&
        s.emit("touchMoveOpposite", o)
      );
    const c = i.evCache.findIndex((e) => e.pointerId === o.pointerId);
    c >= 0 && (i.evCache[c] = o);
    const d = i.evCache.length > 1 ? i.evCache[0] : o,
      p = d.pageX,
      u = d.pageY;
    if (o.preventedByNestedSwiper) return (a.startX = p), void (a.startY = u);
    if (!s.allowTouchMove)
      return (
        o.target.matches(i.focusableElements) || (s.allowClick = !1),
        void (
          i.isTouched &&
          (Object.assign(a, {
            startX: p,
            startY: u,
            prevX: s.touches.currentX,
            prevY: s.touches.currentY,
            currentX: p,
            currentY: u,
          }),
          (i.touchStartTime = E()))
        )
      );
    if (l.touchReleaseOnEdges && !l.loop)
      if (s.isVertical()) {
        if (
          (u < a.startY && s.translate <= s.maxTranslate()) ||
          (u > a.startY && s.translate >= s.minTranslate())
        )
          return (i.isTouched = !1), void (i.isMoved = !1);
      } else if (
        (p < a.startX && s.translate <= s.maxTranslate()) ||
        (p > a.startX && s.translate >= s.minTranslate())
      )
        return;
    if (
      t.activeElement &&
      o.target === t.activeElement &&
      o.target.matches(i.focusableElements)
    )
      return (i.isMoved = !0), void (s.allowClick = !1);
    if (
      (i.allowTouchCallbacks && s.emit("touchMove", o),
      o.targetTouches && o.targetTouches.length > 1)
    )
      return;
    (a.currentX = p), (a.currentY = u);
    const h = a.currentX - a.startX,
      m = a.currentY - a.startY;
    if (s.params.threshold && Math.sqrt(h ** 2 + m ** 2) < s.params.threshold)
      return;
    if (void 0 === i.isScrolling) {
      let e;
      (s.isHorizontal() && a.currentY === a.startY) ||
      (s.isVertical() && a.currentX === a.startX)
        ? (i.isScrolling = !1)
        : h * h + m * m >= 25 &&
          ((e = (180 * Math.atan2(Math.abs(m), Math.abs(h))) / Math.PI),
          (i.isScrolling = s.isHorizontal()
            ? e > l.touchAngle
            : 90 - e > l.touchAngle));
    }
    if (
      (i.isScrolling && s.emit("touchMoveOpposite", o),
      void 0 === i.startMoving &&
        ((a.currentX === a.startX && a.currentY === a.startY) ||
          (i.startMoving = !0)),
      i.isScrolling ||
        (s.zoom &&
          s.params.zoom &&
          s.params.zoom.enabled &&
          i.evCache.length > 1))
    )
      return void (i.isTouched = !1);
    if (!i.startMoving) return;
    (s.allowClick = !1),
      !l.cssMode && o.cancelable && o.preventDefault(),
      l.touchMoveStopPropagation && !l.nested && o.stopPropagation();
    let f = s.isHorizontal() ? h : m,
      g = s.isHorizontal()
        ? a.currentX - a.previousX
        : a.currentY - a.previousY;
    l.oneWayMovement &&
      ((f = Math.abs(f) * (n ? 1 : -1)), (g = Math.abs(g) * (n ? 1 : -1))),
      (a.diff = f),
      (f *= l.touchRatio),
      n && ((f = -f), (g = -g));
    const v = s.touchesDirection;
    (s.swipeDirection = f > 0 ? "prev" : "next"),
      (s.touchesDirection = g > 0 ? "prev" : "next");
    const b = s.params.loop && !l.cssMode,
      y =
        ("next" === s.swipeDirection && s.allowSlideNext) ||
        ("prev" === s.swipeDirection && s.allowSlidePrev);
    if (!i.isMoved) {
      if (
        (b && y && s.loopFix({ direction: s.swipeDirection }),
        (i.startTranslate = s.getTranslate()),
        s.setTransition(0),
        s.animating)
      ) {
        const e = new window.CustomEvent("transitionend", {
          bubbles: !0,
          cancelable: !0,
        });
        s.wrapperEl.dispatchEvent(e);
      }
      (i.allowMomentumBounce = !1),
        !l.grabCursor ||
          (!0 !== s.allowSlideNext && !0 !== s.allowSlidePrev) ||
          s.setGrabCursor(!0),
        s.emit("sliderFirstMove", o);
    }
    let w;
    i.isMoved &&
      v !== s.touchesDirection &&
      b &&
      y &&
      Math.abs(f) >= 1 &&
      (s.loopFix({ direction: s.swipeDirection, setTranslate: !0 }), (w = !0)),
      s.emit("sliderMove", o),
      (i.isMoved = !0),
      (i.currentTranslate = f + i.startTranslate);
    let T = !0,
      C = l.resistanceRatio;
    if (
      (l.touchReleaseOnEdges && (C = 0),
      f > 0
        ? (b &&
            y &&
            !w &&
            i.currentTranslate >
              (l.centeredSlides
                ? s.minTranslate() - s.size / 2
                : s.minTranslate()) &&
            s.loopFix({
              direction: "prev",
              setTranslate: !0,
              activeSlideIndex: 0,
            }),
          i.currentTranslate > s.minTranslate() &&
            ((T = !1),
            l.resistance &&
              (i.currentTranslate =
                s.minTranslate() -
                1 +
                (-s.minTranslate() + i.startTranslate + f) ** C)))
        : f < 0 &&
          (b &&
            y &&
            !w &&
            i.currentTranslate <
              (l.centeredSlides
                ? s.maxTranslate() + s.size / 2
                : s.maxTranslate()) &&
            s.loopFix({
              direction: "next",
              setTranslate: !0,
              activeSlideIndex:
                s.slides.length -
                ("auto" === l.slidesPerView
                  ? s.slidesPerViewDynamic()
                  : Math.ceil(parseFloat(l.slidesPerView, 10))),
            }),
          i.currentTranslate < s.maxTranslate() &&
            ((T = !1),
            l.resistance &&
              (i.currentTranslate =
                s.maxTranslate() +
                1 -
                (s.maxTranslate() - i.startTranslate - f) ** C))),
      T && (o.preventedByNestedSwiper = !0),
      !s.allowSlideNext &&
        "next" === s.swipeDirection &&
        i.currentTranslate < i.startTranslate &&
        (i.currentTranslate = i.startTranslate),
      !s.allowSlidePrev &&
        "prev" === s.swipeDirection &&
        i.currentTranslate > i.startTranslate &&
        (i.currentTranslate = i.startTranslate),
      s.allowSlidePrev ||
        s.allowSlideNext ||
        (i.currentTranslate = i.startTranslate),
      l.threshold > 0)
    ) {
      if (!(Math.abs(f) > l.threshold || i.allowThresholdMove))
        return void (i.currentTranslate = i.startTranslate);
      if (!i.allowThresholdMove)
        return (
          (i.allowThresholdMove = !0),
          (a.startX = a.currentX),
          (a.startY = a.currentY),
          (i.currentTranslate = i.startTranslate),
          void (a.diff = s.isHorizontal()
            ? a.currentX - a.startX
            : a.currentY - a.startY)
        );
    }
    l.followFinger &&
      !l.cssMode &&
      (((l.freeMode && l.freeMode.enabled && s.freeMode) ||
        l.watchSlidesProgress) &&
        (s.updateActiveIndex(), s.updateSlidesClasses()),
      l.freeMode &&
        l.freeMode.enabled &&
        s.freeMode &&
        s.freeMode.onTouchMove(),
      s.updateProgress(i.currentTranslate),
      s.setTranslate(i.currentTranslate));
  }
  function Q(e) {
    const t = this,
      s = t.touchEventsData,
      i = s.evCache.findIndex((t) => t.pointerId === e.pointerId);
    if (
      (i >= 0 && s.evCache.splice(i, 1),
      ["pointercancel", "pointerout", "pointerleave", "contextmenu"].includes(
        e.type,
      ))
    ) {
      if (
        !(
          ["pointercancel", "contextmenu"].includes(e.type) &&
          (t.browser.isSafari || t.browser.isWebView)
        )
      )
        return;
    }
    const {
      params: l,
      touches: a,
      rtlTranslate: n,
      slidesGrid: r,
      enabled: o,
    } = t;
    if (!o) return;
    if (!l.simulateTouch && "mouse" === e.pointerType) return;
    let c = e;
    if (
      (c.originalEvent && (c = c.originalEvent),
      s.allowTouchCallbacks && t.emit("touchEnd", c),
      (s.allowTouchCallbacks = !1),
      !s.isTouched)
    )
      return (
        s.isMoved && l.grabCursor && t.setGrabCursor(!1),
        (s.isMoved = !1),
        void (s.startMoving = !1)
      );
    l.grabCursor &&
      s.isMoved &&
      s.isTouched &&
      (!0 === t.allowSlideNext || !0 === t.allowSlidePrev) &&
      t.setGrabCursor(!1);
    const d = E(),
      p = d - s.touchStartTime;
    if (t.allowClick) {
      const e = c.path || (c.composedPath && c.composedPath());
      t.updateClickedSlide((e && e[0]) || c.target, e),
        t.emit("tap click", c),
        p < 300 &&
          d - s.lastClickTime < 300 &&
          t.emit("doubleTap doubleClick", c);
    }
    if (
      ((s.lastClickTime = E()),
      w(() => {
        t.destroyed || (t.allowClick = !0);
      }),
      !s.isTouched ||
        !s.isMoved ||
        !t.swipeDirection ||
        0 === a.diff ||
        s.currentTranslate === s.startTranslate)
    )
      return (s.isTouched = !1), (s.isMoved = !1), void (s.startMoving = !1);
    let u;
    if (
      ((s.isTouched = !1),
      (s.isMoved = !1),
      (s.startMoving = !1),
      (u = l.followFinger
        ? n
          ? t.translate
          : -t.translate
        : -s.currentTranslate),
      l.cssMode)
    )
      return;
    if (l.freeMode && l.freeMode.enabled)
      return void t.freeMode.onTouchEnd({ currentPos: u });
    let h = 0,
      m = t.slidesSizesGrid[0];
    for (
      let e = 0;
      e < r.length;
      e += e < l.slidesPerGroupSkip ? 1 : l.slidesPerGroup
    ) {
      const t = e < l.slidesPerGroupSkip - 1 ? 1 : l.slidesPerGroup;
      void 0 !== r[e + t]
        ? u >= r[e] && u < r[e + t] && ((h = e), (m = r[e + t] - r[e]))
        : u >= r[e] && ((h = e), (m = r[r.length - 1] - r[r.length - 2]));
    }
    let f = null,
      g = null;
    l.rewind &&
      (t.isBeginning
        ? (g =
            l.virtual && l.virtual.enabled && t.virtual
              ? t.virtual.slides.length - 1
              : t.slides.length - 1)
        : t.isEnd && (f = 0));
    const v = (u - r[h]) / m,
      S = h < l.slidesPerGroupSkip - 1 ? 1 : l.slidesPerGroup;
    if (p > l.longSwipesMs) {
      if (!l.longSwipes) return void t.slideTo(t.activeIndex);
      "next" === t.swipeDirection &&
        (v >= l.longSwipesRatio
          ? t.slideTo(l.rewind && t.isEnd ? f : h + S)
          : t.slideTo(h)),
        "prev" === t.swipeDirection &&
          (v > 1 - l.longSwipesRatio
            ? t.slideTo(h + S)
            : null !== g && v < 0 && Math.abs(v) > l.longSwipesRatio
            ? t.slideTo(g)
            : t.slideTo(h));
    } else {
      if (!l.shortSwipes) return void t.slideTo(t.activeIndex);
      t.navigation &&
      (c.target === t.navigation.nextEl || c.target === t.navigation.prevEl)
        ? c.target === t.navigation.nextEl
          ? t.slideTo(h + S)
          : t.slideTo(h)
        : ("next" === t.swipeDirection && t.slideTo(null !== f ? f : h + S),
          "prev" === t.swipeDirection && t.slideTo(null !== g ? g : h));
    }
  }
  function Z() {
    const e = this,
      { params: t, el: s } = e;
    if (s && 0 === s.offsetWidth) return;
    t.breakpoints && e.setBreakpoint();
    const { allowSlideNext: i, allowSlidePrev: l, snapGrid: a } = e,
      n = e.virtual && e.params.virtual.enabled;
    (e.allowSlideNext = !0),
      (e.allowSlidePrev = !0),
      e.updateSize(),
      e.updateSlides(),
      e.updateSlidesClasses();
    const r = n && t.loop;
    !("auto" === t.slidesPerView || t.slidesPerView > 1) ||
    !e.isEnd ||
    e.isBeginning ||
    e.params.centeredSlides ||
    r
      ? e.params.loop && !n
        ? e.slideToLoop(e.realIndex, 0, !1, !0)
        : e.slideTo(e.activeIndex, 0, !1, !0)
      : e.slideTo(e.slides.length - 1, 0, !1, !0),
      e.autoplay &&
        e.autoplay.running &&
        e.autoplay.paused &&
        (clearTimeout(e.autoplay.resizeTimeout),
        (e.autoplay.resizeTimeout = setTimeout(() => {
          e.autoplay &&
            e.autoplay.running &&
            e.autoplay.paused &&
            e.autoplay.resume();
        }, 500))),
      (e.allowSlidePrev = l),
      (e.allowSlideNext = i),
      e.params.watchOverflow && a !== e.snapGrid && e.checkOverflow();
  }
  function J(e) {
    const t = this;
    t.enabled &&
      (t.allowClick ||
        (t.params.preventClicks && e.preventDefault(),
        t.params.preventClicksPropagation &&
          t.animating &&
          (e.stopPropagation(), e.stopImmediatePropagation())));
  }
  function ee() {
    const e = this,
      { wrapperEl: t, rtlTranslate: s, enabled: i } = e;
    if (!i) return;
    let l;
    (e.previousTranslate = e.translate),
      e.isHorizontal()
        ? (e.translate = -t.scrollLeft)
        : (e.translate = -t.scrollTop),
      0 === e.translate && (e.translate = 0),
      e.updateActiveIndex(),
      e.updateSlidesClasses();
    const a = e.maxTranslate() - e.minTranslate();
    (l = 0 === a ? 0 : (e.translate - e.minTranslate()) / a),
      l !== e.progress && e.updateProgress(s ? -e.translate : e.translate),
      e.emit("setTranslate", e.translate, !1);
  }
  function te(e) {
    const t = this;
    V(t, e.target),
      t.params.cssMode ||
        ("auto" !== t.params.slidesPerView && !t.params.autoHeight) ||
        t.update();
  }
  let se = !1;
  function ie() {}
  const le = (e, t) => {
    const s = S(),
      { params: i, el: l, wrapperEl: a, device: n } = e,
      r = !!i.nested,
      o = "on" === t ? "addEventListener" : "removeEventListener",
      c = t;
    l[o]("pointerdown", e.onTouchStart, { passive: !1 }),
      s[o]("pointermove", e.onTouchMove, { passive: !1, capture: r }),
      s[o]("pointerup", e.onTouchEnd, { passive: !0 }),
      s[o]("pointercancel", e.onTouchEnd, { passive: !0 }),
      s[o]("pointerout", e.onTouchEnd, { passive: !0 }),
      s[o]("pointerleave", e.onTouchEnd, { passive: !0 }),
      s[o]("contextmenu", e.onTouchEnd, { passive: !0 }),
      (i.preventClicks || i.preventClicksPropagation) &&
        l[o]("click", e.onClick, !0),
      i.cssMode && a[o]("scroll", e.onScroll),
      i.updateOnWindowResize
        ? e[c](
            n.ios || n.android
              ? "resize orientationchange observerUpdate"
              : "resize observerUpdate",
            Z,
            !0,
          )
        : e[c]("observerUpdate", Z, !0),
      l[o]("load", e.onLoad, { capture: !0 });
  };
  const ae = (e, t) => e.grid && t.grid && t.grid.rows > 1;
  var ne = {
    init: !0,
    direction: "horizontal",
    oneWayMovement: !1,
    touchEventsTarget: "wrapper",
    initialSlide: 0,
    speed: 300,
    cssMode: !1,
    updateOnWindowResize: !0,
    resizeObserver: !0,
    nested: !1,
    createElements: !1,
    enabled: !0,
    focusableElements: "input, select, option, textarea, button, video, label",
    width: null,
    height: null,
    preventInteractionOnTransition: !1,
    userAgent: null,
    url: null,
    edgeSwipeDetection: !1,
    edgeSwipeThreshold: 20,
    autoHeight: !1,
    setWrapperSize: !1,
    virtualTranslate: !1,
    effect: "slide",
    breakpoints: void 0,
    breakpointsBase: "window",
    spaceBetween: 0,
    slidesPerView: 1,
    slidesPerGroup: 1,
    slidesPerGroupSkip: 0,
    slidesPerGroupAuto: !1,
    centeredSlides: !1,
    centeredSlidesBounds: !1,
    slidesOffsetBefore: 0,
    slidesOffsetAfter: 0,
    normalizeSlideIndex: !0,
    centerInsufficientSlides: !1,
    watchOverflow: !0,
    roundLengths: !1,
    touchRatio: 1,
    touchAngle: 45,
    simulateTouch: !0,
    shortSwipes: !0,
    longSwipes: !0,
    longSwipesRatio: 0.5,
    longSwipesMs: 300,
    followFinger: !0,
    allowTouchMove: !0,
    threshold: 5,
    touchMoveStopPropagation: !1,
    touchStartPreventDefault: !0,
    touchStartForcePreventDefault: !1,
    touchReleaseOnEdges: !1,
    uniqueNavElements: !0,
    resistance: !0,
    resistanceRatio: 0.85,
    watchSlidesProgress: !1,
    grabCursor: !1,
    preventClicks: !0,
    preventClicksPropagation: !0,
    slideToClickedSlide: !1,
    loop: !1,
    loopedSlides: null,
    loopPreventsSliding: !0,
    rewind: !1,
    allowSlidePrev: !0,
    allowSlideNext: !0,
    swipeHandler: null,
    noSwiping: !0,
    noSwipingClass: "swiper-no-swiping",
    noSwipingSelector: null,
    passiveListeners: !0,
    maxBackfaceHiddenSlides: 10,
    containerModifierClass: "swiper-",
    slideClass: "swiper-slide",
    slideActiveClass: "swiper-slide-active",
    slideVisibleClass: "swiper-slide-visible",
    slideNextClass: "swiper-slide-next",
    slidePrevClass: "swiper-slide-prev",
    wrapperClass: "swiper-wrapper",
    lazyPreloaderClass: "swiper-lazy-preloader",
    lazyPreloadPrevNext: 0,
    runCallbacksOnInit: !0,
    _emitClasses: !1,
  };
  function re(e, t) {
    return function (s) {
      void 0 === s && (s = {});
      const i = Object.keys(s)[0],
        l = s[i];
      "object" == typeof l && null !== l
        ? (!0 === e[i] && (e[i] = { enabled: !0 }),
          "navigation" === i &&
            e[i] &&
            e[i].enabled &&
            !e[i].prevEl &&
            !e[i].nextEl &&
            (e[i].auto = !0),
          ["pagination", "scrollbar"].indexOf(i) >= 0 &&
            e[i] &&
            e[i].enabled &&
            !e[i].el &&
            (e[i].auto = !0),
          i in e && "enabled" in l
            ? ("object" != typeof e[i] ||
                "enabled" in e[i] ||
                (e[i].enabled = !0),
              e[i] || (e[i] = { enabled: !1 }),
              x(t, s))
            : x(t, s))
        : x(t, s);
    };
  }
  const oe = {
      eventsEmitter: H,
      update: j,
      translate: R,
      transition: {
        setTransition: function (e, t) {
          const s = this;
          s.params.cssMode ||
            ((s.wrapperEl.style.transitionDuration = `${e}ms`),
            (s.wrapperEl.style.transitionDelay = 0 === e ? "0ms" : "")),
            s.emit("setTransition", e, t);
        },
        transitionStart: function (e, t) {
          void 0 === e && (e = !0);
          const s = this,
            { params: i } = s;
          i.cssMode ||
            (i.autoHeight && s.updateAutoHeight(),
            W({ swiper: s, runCallbacks: e, direction: t, step: "Start" }));
        },
        transitionEnd: function (e, t) {
          void 0 === e && (e = !0);
          const s = this,
            { params: i } = s;
          (s.animating = !1),
            i.cssMode ||
              (s.setTransition(0),
              W({ swiper: s, runCallbacks: e, direction: t, step: "End" }));
        },
      },
      slide: Y,
      loop: X,
      grabCursor: {
        setGrabCursor: function (e) {
          const t = this;
          if (
            !t.params.simulateTouch ||
            (t.params.watchOverflow && t.isLocked) ||
            t.params.cssMode
          )
            return;
          const s =
            "container" === t.params.touchEventsTarget ? t.el : t.wrapperEl;
          t.isElement && (t.__preventObserver__ = !0),
            (s.style.cursor = "move"),
            (s.style.cursor = e ? "grabbing" : "grab"),
            t.isElement &&
              requestAnimationFrame(() => {
                t.__preventObserver__ = !1;
              });
        },
        unsetGrabCursor: function () {
          const e = this;
          (e.params.watchOverflow && e.isLocked) ||
            e.params.cssMode ||
            (e.isElement && (e.__preventObserver__ = !0),
            (e[
              "container" === e.params.touchEventsTarget ? "el" : "wrapperEl"
            ].style.cursor = ""),
            e.isElement &&
              requestAnimationFrame(() => {
                e.__preventObserver__ = !1;
              }));
        },
      },
      events: {
        attachEvents: function () {
          const e = this,
            t = S(),
            { params: s } = e;
          (e.onTouchStart = U.bind(e)),
            (e.onTouchMove = K.bind(e)),
            (e.onTouchEnd = Q.bind(e)),
            s.cssMode && (e.onScroll = ee.bind(e)),
            (e.onClick = J.bind(e)),
            (e.onLoad = te.bind(e)),
            se || (t.addEventListener("touchstart", ie), (se = !0)),
            le(e, "on");
        },
        detachEvents: function () {
          le(this, "off");
        },
      },
      breakpoints: {
        setBreakpoint: function () {
          const e = this,
            { realIndex: t, initialized: s, params: i, el: l } = e,
            a = i.breakpoints;
          if (!a || (a && 0 === Object.keys(a).length)) return;
          const n = e.getBreakpoint(a, e.params.breakpointsBase, e.el);
          if (!n || e.currentBreakpoint === n) return;
          const r = (n in a ? a[n] : void 0) || e.originalParams,
            o = ae(e, i),
            c = ae(e, r),
            d = i.enabled;
          o && !c
            ? (l.classList.remove(
                `${i.containerModifierClass}grid`,
                `${i.containerModifierClass}grid-column`,
              ),
              e.emitContainerClasses())
            : !o &&
              c &&
              (l.classList.add(`${i.containerModifierClass}grid`),
              ((r.grid.fill && "column" === r.grid.fill) ||
                (!r.grid.fill && "column" === i.grid.fill)) &&
                l.classList.add(`${i.containerModifierClass}grid-column`),
              e.emitContainerClasses()),
            ["navigation", "pagination", "scrollbar"].forEach((t) => {
              if (void 0 === r[t]) return;
              const s = i[t] && i[t].enabled,
                l = r[t] && r[t].enabled;
              s && !l && e[t].disable(), !s && l && e[t].enable();
            });
          const p = r.direction && r.direction !== i.direction,
            u = i.loop && (r.slidesPerView !== i.slidesPerView || p),
            h = i.loop;
          p && s && e.changeDirection(), x(e.params, r);
          const m = e.params.enabled,
            f = e.params.loop;
          Object.assign(e, {
            allowTouchMove: e.params.allowTouchMove,
            allowSlideNext: e.params.allowSlideNext,
            allowSlidePrev: e.params.allowSlidePrev,
          }),
            d && !m ? e.disable() : !d && m && e.enable(),
            (e.currentBreakpoint = n),
            e.emit("_beforeBreakpoint", r),
            s &&
              (u
                ? (e.loopDestroy(), e.loopCreate(t), e.updateSlides())
                : !h && f
                ? (e.loopCreate(t), e.updateSlides())
                : h && !f && e.loopDestroy()),
            e.emit("breakpoint", r);
        },
        getBreakpoint: function (e, t, s) {
          if ((void 0 === t && (t = "window"), !e || ("container" === t && !s)))
            return;
          let i = !1;
          const l = y(),
            a = "window" === t ? l.innerHeight : s.clientHeight,
            n = Object.keys(e).map((e) => {
              if ("string" == typeof e && 0 === e.indexOf("@")) {
                const t = parseFloat(e.substr(1));
                return { value: a * t, point: e };
              }
              return { value: e, point: e };
            });
          n.sort((e, t) => parseInt(e.value, 10) - parseInt(t.value, 10));
          for (let e = 0; e < n.length; e += 1) {
            const { point: a, value: r } = n[e];
            "window" === t
              ? l.matchMedia(`(min-width: ${r}px)`).matches && (i = a)
              : r <= s.clientWidth && (i = a);
          }
          return i || "max";
        },
      },
      checkOverflow: {
        checkOverflow: function () {
          const e = this,
            { isLocked: t, params: s } = e,
            { slidesOffsetBefore: i } = s;
          if (i) {
            const t = e.slides.length - 1,
              s = e.slidesGrid[t] + e.slidesSizesGrid[t] + 2 * i;
            e.isLocked = e.size > s;
          } else e.isLocked = 1 === e.snapGrid.length;
          !0 === s.allowSlideNext && (e.allowSlideNext = !e.isLocked),
            !0 === s.allowSlidePrev && (e.allowSlidePrev = !e.isLocked),
            t && t !== e.isLocked && (e.isEnd = !1),
            t !== e.isLocked && e.emit(e.isLocked ? "lock" : "unlock");
        },
      },
      classes: {
        addClasses: function () {
          const e = this,
            { classNames: t, params: s, rtl: i, el: l, device: a } = e,
            n = (function (e, t) {
              const s = [];
              return (
                e.forEach((e) => {
                  "object" == typeof e
                    ? Object.keys(e).forEach((i) => {
                        e[i] && s.push(t + i);
                      })
                    : "string" == typeof e && s.push(t + e);
                }),
                s
              );
            })(
              [
                "initialized",
                s.direction,
                { "free-mode": e.params.freeMode && s.freeMode.enabled },
                { autoheight: s.autoHeight },
                { rtl: i },
                { grid: s.grid && s.grid.rows > 1 },
                {
                  "grid-column":
                    s.grid && s.grid.rows > 1 && "column" === s.grid.fill,
                },
                { android: a.android },
                { ios: a.ios },
                { "css-mode": s.cssMode },
                { centered: s.cssMode && s.centeredSlides },
                { "watch-progress": s.watchSlidesProgress },
              ],
              s.containerModifierClass,
            );
          t.push(...n), l.classList.add(...t), e.emitContainerClasses();
        },
        removeClasses: function () {
          const { el: e, classNames: t } = this;
          e.classList.remove(...t), this.emitContainerClasses();
        },
      },
    },
    ce = {};
  class de {
    constructor() {
      let e, t;
      for (var s = arguments.length, i = new Array(s), l = 0; l < s; l++)
        i[l] = arguments[l];
      1 === i.length &&
      i[0].constructor &&
      "Object" === Object.prototype.toString.call(i[0]).slice(8, -1)
        ? (t = i[0])
        : ([e, t] = i),
        t || (t = {}),
        (t = x({}, t)),
        e && !t.el && (t.el = e);
      const a = S();
      if (
        t.el &&
        "string" == typeof t.el &&
        a.querySelectorAll(t.el).length > 1
      ) {
        const e = [];
        return (
          a.querySelectorAll(t.el).forEach((s) => {
            const i = x({}, t, { el: s });
            e.push(new de(i));
          }),
          e
        );
      }
      const n = this;
      (n.__swiper__ = !0),
        (n.support = B()),
        (n.device = G({ userAgent: t.userAgent })),
        (n.browser = q()),
        (n.eventsListeners = {}),
        (n.eventsAnyListeners = []),
        (n.modules = [...n.__modules__]),
        t.modules && Array.isArray(t.modules) && n.modules.push(...t.modules);
      const r = {};
      n.modules.forEach((e) => {
        e({
          params: t,
          swiper: n,
          extendParams: re(t, r),
          on: n.on.bind(n),
          once: n.once.bind(n),
          off: n.off.bind(n),
          emit: n.emit.bind(n),
        });
      });
      const o = x({}, ne, r);
      return (
        (n.params = x({}, o, ce, t)),
        (n.originalParams = x({}, n.params)),
        (n.passedParams = x({}, t)),
        n.params &&
          n.params.on &&
          Object.keys(n.params.on).forEach((e) => {
            n.on(e, n.params.on[e]);
          }),
        n.params && n.params.onAny && n.onAny(n.params.onAny),
        Object.assign(n, {
          enabled: n.params.enabled,
          el: e,
          classNames: [],
          slides: [],
          slidesGrid: [],
          snapGrid: [],
          slidesSizesGrid: [],
          isHorizontal: () => "horizontal" === n.params.direction,
          isVertical: () => "vertical" === n.params.direction,
          activeIndex: 0,
          realIndex: 0,
          isBeginning: !0,
          isEnd: !1,
          translate: 0,
          previousTranslate: 0,
          progress: 0,
          velocity: 0,
          animating: !1,
          cssOverflowAdjustment() {
            return Math.trunc(this.translate / 2 ** 23) * 2 ** 23;
          },
          allowSlideNext: n.params.allowSlideNext,
          allowSlidePrev: n.params.allowSlidePrev,
          touchEventsData: {
            isTouched: void 0,
            isMoved: void 0,
            allowTouchCallbacks: void 0,
            touchStartTime: void 0,
            isScrolling: void 0,
            currentTranslate: void 0,
            startTranslate: void 0,
            allowThresholdMove: void 0,
            focusableElements: n.params.focusableElements,
            lastClickTime: 0,
            clickTimeout: void 0,
            velocities: [],
            allowMomentumBounce: void 0,
            startMoving: void 0,
            evCache: [],
          },
          allowClick: !0,
          allowTouchMove: n.params.allowTouchMove,
          touches: { startX: 0, startY: 0, currentX: 0, currentY: 0, diff: 0 },
          imagesToLoad: [],
          imagesLoaded: 0,
        }),
        n.emit("_swiper"),
        n.params.init && n.init(),
        n
      );
    }
    getSlideIndex(e) {
      const { slidesEl: t, params: s } = this,
        i = _(P(t, `.${s.slideClass}, swiper-slide`)[0]);
      return _(e) - i;
    }
    getSlideIndexByData(e) {
      return this.getSlideIndex(
        this.slides.filter(
          (t) => 1 * t.getAttribute("data-swiper-slide-index") === e,
        )[0],
      );
    }
    recalcSlides() {
      const { slidesEl: e, params: t } = this;
      this.slides = P(e, `.${t.slideClass}, swiper-slide`);
    }
    enable() {
      const e = this;
      e.enabled ||
        ((e.enabled = !0),
        e.params.grabCursor && e.setGrabCursor(),
        e.emit("enable"));
    }
    disable() {
      const e = this;
      e.enabled &&
        ((e.enabled = !1),
        e.params.grabCursor && e.unsetGrabCursor(),
        e.emit("disable"));
    }
    setProgress(e, t) {
      const s = this;
      e = Math.min(Math.max(e, 0), 1);
      const i = s.minTranslate(),
        l = (s.maxTranslate() - i) * e + i;
      s.translateTo(l, void 0 === t ? 0 : t),
        s.updateActiveIndex(),
        s.updateSlidesClasses();
    }
    emitContainerClasses() {
      const e = this;
      if (!e.params._emitClasses || !e.el) return;
      const t = e.el.className
        .split(" ")
        .filter(
          (t) =>
            0 === t.indexOf("swiper") ||
            0 === t.indexOf(e.params.containerModifierClass),
        );
      e.emit("_containerClasses", t.join(" "));
    }
    getSlideClasses(e) {
      const t = this;
      return t.destroyed
        ? ""
        : e.className
            .split(" ")
            .filter(
              (e) =>
                0 === e.indexOf("swiper-slide") ||
                0 === e.indexOf(t.params.slideClass),
            )
            .join(" ");
    }
    emitSlidesClasses() {
      const e = this;
      if (!e.params._emitClasses || !e.el) return;
      const t = [];
      e.slides.forEach((s) => {
        const i = e.getSlideClasses(s);
        t.push({ slideEl: s, classNames: i }), e.emit("_slideClass", s, i);
      }),
        e.emit("_slideClasses", t);
    }
    slidesPerViewDynamic(e, t) {
      void 0 === e && (e = "current"), void 0 === t && (t = !1);
      const {
        params: s,
        slides: i,
        slidesGrid: l,
        slidesSizesGrid: a,
        size: n,
        activeIndex: r,
      } = this;
      let o = 1;
      if ("number" == typeof s.slidesPerView) return s.slidesPerView;
      if (s.centeredSlides) {
        let e,
          t = i[r] ? i[r].swiperSlideSize : 0;
        for (let s = r + 1; s < i.length; s += 1)
          i[s] &&
            !e &&
            ((t += i[s].swiperSlideSize), (o += 1), t > n && (e = !0));
        for (let s = r - 1; s >= 0; s -= 1)
          i[s] &&
            !e &&
            ((t += i[s].swiperSlideSize), (o += 1), t > n && (e = !0));
      } else if ("current" === e)
        for (let e = r + 1; e < i.length; e += 1) {
          (t ? l[e] + a[e] - l[r] < n : l[e] - l[r] < n) && (o += 1);
        }
      else
        for (let e = r - 1; e >= 0; e -= 1) {
          l[r] - l[e] < n && (o += 1);
        }
      return o;
    }
    update() {
      const e = this;
      if (!e || e.destroyed) return;
      const { snapGrid: t, params: s } = e;
      function i() {
        const t = e.rtlTranslate ? -1 * e.translate : e.translate,
          s = Math.min(Math.max(t, e.maxTranslate()), e.minTranslate());
        e.setTranslate(s), e.updateActiveIndex(), e.updateSlidesClasses();
      }
      let l;
      if (
        (s.breakpoints && e.setBreakpoint(),
        [...e.el.querySelectorAll('[loading="lazy"]')].forEach((t) => {
          t.complete && V(e, t);
        }),
        e.updateSize(),
        e.updateSlides(),
        e.updateProgress(),
        e.updateSlidesClasses(),
        s.freeMode && s.freeMode.enabled && !s.cssMode)
      )
        i(), s.autoHeight && e.updateAutoHeight();
      else {
        if (
          ("auto" === s.slidesPerView || s.slidesPerView > 1) &&
          e.isEnd &&
          !s.centeredSlides
        ) {
          const t =
            e.virtual && s.virtual.enabled ? e.virtual.slides : e.slides;
          l = e.slideTo(t.length - 1, 0, !1, !0);
        } else l = e.slideTo(e.activeIndex, 0, !1, !0);
        l || i();
      }
      s.watchOverflow && t !== e.snapGrid && e.checkOverflow(),
        e.emit("update");
    }
    changeDirection(e, t) {
      void 0 === t && (t = !0);
      const s = this,
        i = s.params.direction;
      return (
        e || (e = "horizontal" === i ? "vertical" : "horizontal"),
        e === i ||
          ("horizontal" !== e && "vertical" !== e) ||
          (s.el.classList.remove(`${s.params.containerModifierClass}${i}`),
          s.el.classList.add(`${s.params.containerModifierClass}${e}`),
          s.emitContainerClasses(),
          (s.params.direction = e),
          s.slides.forEach((t) => {
            "vertical" === e ? (t.style.width = "") : (t.style.height = "");
          }),
          s.emit("changeDirection"),
          t && s.update()),
        s
      );
    }
    changeLanguageDirection(e) {
      const t = this;
      (t.rtl && "rtl" === e) ||
        (!t.rtl && "ltr" === e) ||
        ((t.rtl = "rtl" === e),
        (t.rtlTranslate = "horizontal" === t.params.direction && t.rtl),
        t.rtl
          ? (t.el.classList.add(`${t.params.containerModifierClass}rtl`),
            (t.el.dir = "rtl"))
          : (t.el.classList.remove(`${t.params.containerModifierClass}rtl`),
            (t.el.dir = "ltr")),
        t.update());
    }
    mount(e) {
      const t = this;
      if (t.mounted) return !0;
      let s = e || t.params.el;
      if (("string" == typeof s && (s = document.querySelector(s)), !s))
        return !1;
      (s.swiper = t),
        s.parentNode &&
          s.parentNode.host &&
          "SWIPER-CONTAINER" === s.parentNode.host.nodeName &&
          (t.isElement = !0);
      const i = () =>
        `.${(t.params.wrapperClass || "").trim().split(" ").join(".")}`;
      let l = (() => {
        if (s && s.shadowRoot && s.shadowRoot.querySelector) {
          return s.shadowRoot.querySelector(i());
        }
        return P(s, i())[0];
      })();
      return (
        !l &&
          t.params.createElements &&
          ((l = M("div", t.params.wrapperClass)),
          s.append(l),
          P(s, `.${t.params.slideClass}`).forEach((e) => {
            l.append(e);
          })),
        Object.assign(t, {
          el: s,
          wrapperEl: l,
          slidesEl:
            t.isElement && !s.parentNode.host.slideSlots
              ? s.parentNode.host
              : l,
          hostEl: t.isElement ? s.parentNode.host : s,
          mounted: !0,
          rtl: "rtl" === s.dir.toLowerCase() || "rtl" === O(s, "direction"),
          rtlTranslate:
            "horizontal" === t.params.direction &&
            ("rtl" === s.dir.toLowerCase() || "rtl" === O(s, "direction")),
          wrongRTL: "-webkit-box" === O(l, "display"),
        }),
        !0
      );
    }
    init(e) {
      const t = this;
      if (t.initialized) return t;
      if (!1 === t.mount(e)) return t;
      t.emit("beforeInit"),
        t.params.breakpoints && t.setBreakpoint(),
        t.addClasses(),
        t.updateSize(),
        t.updateSlides(),
        t.params.watchOverflow && t.checkOverflow(),
        t.params.grabCursor && t.enabled && t.setGrabCursor(),
        t.params.loop && t.virtual && t.params.virtual.enabled
          ? t.slideTo(
              t.params.initialSlide + t.virtual.slidesBefore,
              0,
              t.params.runCallbacksOnInit,
              !1,
              !0,
            )
          : t.slideTo(
              t.params.initialSlide,
              0,
              t.params.runCallbacksOnInit,
              !1,
              !0,
            ),
        t.params.loop && t.loopCreate(),
        t.attachEvents();
      const s = [...t.el.querySelectorAll('[loading="lazy"]')];
      return (
        t.isElement && s.push(...t.hostEl.querySelectorAll('[loading="lazy"]')),
        s.forEach((e) => {
          e.complete
            ? V(t, e)
            : e.addEventListener("load", (e) => {
                V(t, e.target);
              });
        }),
        N(t),
        (t.initialized = !0),
        N(t),
        t.emit("init"),
        t.emit("afterInit"),
        t
      );
    }
    destroy(e, t) {
      void 0 === e && (e = !0), void 0 === t && (t = !0);
      const s = this,
        { params: i, el: l, wrapperEl: a, slides: n } = s;
      return (
        void 0 === s.params ||
          s.destroyed ||
          (s.emit("beforeDestroy"),
          (s.initialized = !1),
          s.detachEvents(),
          i.loop && s.loopDestroy(),
          t &&
            (s.removeClasses(),
            l.removeAttribute("style"),
            a.removeAttribute("style"),
            n &&
              n.length &&
              n.forEach((e) => {
                e.classList.remove(
                  i.slideVisibleClass,
                  i.slideActiveClass,
                  i.slideNextClass,
                  i.slidePrevClass,
                ),
                  e.removeAttribute("style"),
                  e.removeAttribute("data-swiper-slide-index");
              })),
          s.emit("destroy"),
          Object.keys(s.eventsListeners).forEach((e) => {
            s.off(e);
          }),
          !1 !== e &&
            ((s.el.swiper = null),
            (function (e) {
              const t = e;
              Object.keys(t).forEach((e) => {
                try {
                  t[e] = null;
                } catch (e) {}
                try {
                  delete t[e];
                } catch (e) {}
              });
            })(s)),
          (s.destroyed = !0)),
        null
      );
    }
    static extendDefaults(e) {
      x(ce, e);
    }
    static get extendedDefaults() {
      return ce;
    }
    static get defaults() {
      return ne;
    }
    static installModule(e) {
      de.prototype.__modules__ || (de.prototype.__modules__ = []);
      const t = de.prototype.__modules__;
      "function" == typeof e && t.indexOf(e) < 0 && t.push(e);
    }
    static use(e) {
      return Array.isArray(e)
        ? (e.forEach((e) => de.installModule(e)), de)
        : (de.installModule(e), de);
    }
  }
  function pe(e) {
    return (
      void 0 === e && (e = ""),
      `.${e
        .trim()
        .replace(/([\.:!+\/])/g, "\\$1")
        .replace(/ /g, ".")}`
    );
  }
  function ue(e) {
    let { swiper: t, extendParams: s, on: i, emit: l } = e;
    const a = "swiper-pagination";
    let n;
    s({
      pagination: {
        el: null,
        bulletElement: "span",
        clickable: !1,
        hideOnClick: !1,
        renderBullet: null,
        renderProgressbar: null,
        renderFraction: null,
        renderCustom: null,
        progressbarOpposite: !1,
        type: "bullets",
        dynamicBullets: !1,
        dynamicMainBullets: 1,
        formatFractionCurrent: (e) => e,
        formatFractionTotal: (e) => e,
        bulletClass: `${a}-bullet`,
        bulletActiveClass: `${a}-bullet-active`,
        modifierClass: `${a}-`,
        currentClass: `${a}-current`,
        totalClass: `${a}-total`,
        hiddenClass: `${a}-hidden`,
        progressbarFillClass: `${a}-progressbar-fill`,
        progressbarOppositeClass: `${a}-progressbar-opposite`,
        clickableClass: `${a}-clickable`,
        lockClass: `${a}-lock`,
        horizontalClass: `${a}-horizontal`,
        verticalClass: `${a}-vertical`,
        paginationDisabledClass: `${a}-disabled`,
      },
    }),
      (t.pagination = { el: null, bullets: [] });
    let r = 0;
    const o = (e) => (Array.isArray(e) ? e : [e]).filter((e) => !!e);
    function c() {
      return (
        !t.params.pagination.el ||
        !t.pagination.el ||
        (Array.isArray(t.pagination.el) && 0 === t.pagination.el.length)
      );
    }
    function d(e, s) {
      const { bulletActiveClass: i } = t.params.pagination;
      e &&
        (e = e[("prev" === s ? "previous" : "next") + "ElementSibling"]) &&
        (e.classList.add(`${i}-${s}`),
        (e = e[("prev" === s ? "previous" : "next") + "ElementSibling"]) &&
          e.classList.add(`${i}-${s}-${s}`));
    }
    function p(e) {
      const s = e.target.closest(pe(t.params.pagination.bulletClass));
      if (!s) return;
      e.preventDefault();
      const i = _(s) * t.params.slidesPerGroup;
      if (t.params.loop) {
        if (t.realIndex === i) return;
        const e = t.realIndex,
          s = t.getSlideIndexByData(i),
          l = t.getSlideIndexByData(t.realIndex),
          a = (i) => {
            const l = t.activeIndex;
            t.loopFix({ direction: i, activeSlideIndex: s, slideTo: !1 });
            l === t.activeIndex && t.slideToLoop(e, 0, !1, !0);
          };
        if (s > t.slides.length - t.loopedSlides) a(s > l ? "next" : "prev");
        else if (t.params.centeredSlides) {
          const e =
            "auto" === t.params.slidesPerView
              ? t.slidesPerViewDynamic()
              : Math.ceil(parseFloat(t.params.slidesPerView, 10));
          s < Math.floor(e / 2) && a("prev");
        }
        t.slideToLoop(i);
      } else t.slideTo(i);
    }
    function u() {
      const e = t.rtl,
        s = t.params.pagination;
      if (c()) return;
      let i,
        a,
        p = t.pagination.el;
      p = o(p);
      const u =
          t.virtual && t.params.virtual.enabled
            ? t.virtual.slides.length
            : t.slides.length,
        h = t.params.loop
          ? Math.ceil(u / t.params.slidesPerGroup)
          : t.snapGrid.length;
      if (
        (t.params.loop
          ? ((a = t.previousRealIndex || 0),
            (i =
              t.params.slidesPerGroup > 1
                ? Math.floor(t.realIndex / t.params.slidesPerGroup)
                : t.realIndex))
          : void 0 !== t.snapIndex
          ? ((i = t.snapIndex), (a = t.previousSnapIndex))
          : ((a = t.previousIndex || 0), (i = t.activeIndex || 0)),
        "bullets" === s.type &&
          t.pagination.bullets &&
          t.pagination.bullets.length > 0)
      ) {
        const l = t.pagination.bullets;
        let o, c, u;
        if (
          (s.dynamicBullets &&
            ((n = $(l[0], t.isHorizontal() ? "width" : "height", !0)),
            p.forEach((e) => {
              e.style[t.isHorizontal() ? "width" : "height"] =
                n * (s.dynamicMainBullets + 4) + "px";
            }),
            s.dynamicMainBullets > 1 &&
              void 0 !== a &&
              ((r += i - (a || 0)),
              r > s.dynamicMainBullets - 1
                ? (r = s.dynamicMainBullets - 1)
                : r < 0 && (r = 0)),
            (o = Math.max(i - r, 0)),
            (c = o + (Math.min(l.length, s.dynamicMainBullets) - 1)),
            (u = (c + o) / 2)),
          l.forEach((e) => {
            const t = [
              ...[
                "",
                "-next",
                "-next-next",
                "-prev",
                "-prev-prev",
                "-main",
              ].map((e) => `${s.bulletActiveClass}${e}`),
            ]
              .map((e) =>
                "string" == typeof e && e.includes(" ") ? e.split(" ") : e,
              )
              .flat();
            e.classList.remove(...t);
          }),
          p.length > 1)
        )
          l.forEach((e) => {
            const l = _(e);
            l === i
              ? e.classList.add(...s.bulletActiveClass.split(" "))
              : t.isElement && e.setAttribute("part", "bullet"),
              s.dynamicBullets &&
                (l >= o &&
                  l <= c &&
                  e.classList.add(...`${s.bulletActiveClass}-main`.split(" ")),
                l === o && d(e, "prev"),
                l === c && d(e, "next"));
          });
        else {
          const e = l[i];
          if (
            (e && e.classList.add(...s.bulletActiveClass.split(" ")),
            t.isElement &&
              l.forEach((e, t) => {
                e.setAttribute("part", t === i ? "bullet-active" : "bullet");
              }),
            s.dynamicBullets)
          ) {
            const e = l[o],
              t = l[c];
            for (let e = o; e <= c; e += 1)
              l[e] &&
                l[e].classList.add(...`${s.bulletActiveClass}-main`.split(" "));
            d(e, "prev"), d(t, "next");
          }
        }
        if (s.dynamicBullets) {
          const i = Math.min(l.length, s.dynamicMainBullets + 4),
            a = (n * i - n) / 2 - u * n,
            r = e ? "right" : "left";
          l.forEach((e) => {
            e.style[t.isHorizontal() ? r : "top"] = `${a}px`;
          });
        }
      }
      p.forEach((e, a) => {
        if (
          ("fraction" === s.type &&
            (e.querySelectorAll(pe(s.currentClass)).forEach((e) => {
              e.textContent = s.formatFractionCurrent(i + 1);
            }),
            e.querySelectorAll(pe(s.totalClass)).forEach((e) => {
              e.textContent = s.formatFractionTotal(h);
            })),
          "progressbar" === s.type)
        ) {
          let l;
          l = s.progressbarOpposite
            ? t.isHorizontal()
              ? "vertical"
              : "horizontal"
            : t.isHorizontal()
            ? "horizontal"
            : "vertical";
          const a = (i + 1) / h;
          let n = 1,
            r = 1;
          "horizontal" === l ? (n = a) : (r = a),
            e.querySelectorAll(pe(s.progressbarFillClass)).forEach((e) => {
              (e.style.transform = `translate3d(0,0,0) scaleX(${n}) scaleY(${r})`),
                (e.style.transitionDuration = `${t.params.speed}ms`);
            });
        }
        "custom" === s.type && s.renderCustom
          ? ((e.innerHTML = s.renderCustom(t, i + 1, h)),
            0 === a && l("paginationRender", e))
          : (0 === a && l("paginationRender", e), l("paginationUpdate", e)),
          t.params.watchOverflow &&
            t.enabled &&
            e.classList[t.isLocked ? "add" : "remove"](s.lockClass);
      });
    }
    function h() {
      const e = t.params.pagination;
      if (c()) return;
      const s =
        t.virtual && t.params.virtual.enabled
          ? t.virtual.slides.length
          : t.slides.length;
      let i = t.pagination.el;
      i = o(i);
      let a = "";
      if ("bullets" === e.type) {
        let i = t.params.loop
          ? Math.ceil(s / t.params.slidesPerGroup)
          : t.snapGrid.length;
        t.params.freeMode && t.params.freeMode.enabled && i > s && (i = s);
        for (let s = 0; s < i; s += 1)
          e.renderBullet
            ? (a += e.renderBullet.call(t, s, e.bulletClass))
            : (a += `<${e.bulletElement} ${
                t.isElement ? 'part="bullet"' : ""
              } class="${e.bulletClass}"></${e.bulletElement}>`);
      }
      "fraction" === e.type &&
        (a = e.renderFraction
          ? e.renderFraction.call(t, e.currentClass, e.totalClass)
          : `<span class="${e.currentClass}"></span> / <span class="${e.totalClass}"></span>`),
        "progressbar" === e.type &&
          (a = e.renderProgressbar
            ? e.renderProgressbar.call(t, e.progressbarFillClass)
            : `<span class="${e.progressbarFillClass}"></span>`),
        (t.pagination.bullets = []),
        i.forEach((s) => {
          "custom" !== e.type && (s.innerHTML = a || ""),
            "bullets" === e.type &&
              t.pagination.bullets.push(
                ...s.querySelectorAll(pe(e.bulletClass)),
              );
        }),
        "custom" !== e.type && l("paginationRender", i[0]);
    }
    function m() {
      t.params.pagination = (function (e, t, s, i) {
        return (
          e.params.createElements &&
            Object.keys(i).forEach((l) => {
              if (!s[l] && !0 === s.auto) {
                let a = P(e.el, `.${i[l]}`)[0];
                a ||
                  ((a = M("div", i[l])), (a.className = i[l]), e.el.append(a)),
                  (s[l] = a),
                  (t[l] = a);
              }
            }),
          s
        );
      })(t, t.originalParams.pagination, t.params.pagination, {
        el: "swiper-pagination",
      });
      const e = t.params.pagination;
      if (!e.el) return;
      let s;
      "string" == typeof e.el && t.isElement && (s = t.el.querySelector(e.el)),
        s ||
          "string" != typeof e.el ||
          (s = [...document.querySelectorAll(e.el)]),
        s || (s = e.el),
        s &&
          0 !== s.length &&
          (t.params.uniqueNavElements &&
            "string" == typeof e.el &&
            Array.isArray(s) &&
            s.length > 1 &&
            ((s = [...t.el.querySelectorAll(e.el)]),
            s.length > 1 &&
              (s = s.filter((e) => k(e, ".swiper")[0] === t.el)[0])),
          Array.isArray(s) && 1 === s.length && (s = s[0]),
          Object.assign(t.pagination, { el: s }),
          (s = o(s)),
          s.forEach((s) => {
            "bullets" === e.type &&
              e.clickable &&
              s.classList.add(...(e.clickableClass || "").split(" ")),
              s.classList.add(e.modifierClass + e.type),
              s.classList.add(
                t.isHorizontal() ? e.horizontalClass : e.verticalClass,
              ),
              "bullets" === e.type &&
                e.dynamicBullets &&
                (s.classList.add(`${e.modifierClass}${e.type}-dynamic`),
                (r = 0),
                e.dynamicMainBullets < 1 && (e.dynamicMainBullets = 1)),
              "progressbar" === e.type &&
                e.progressbarOpposite &&
                s.classList.add(e.progressbarOppositeClass),
              e.clickable && s.addEventListener("click", p),
              t.enabled || s.classList.add(e.lockClass);
          }));
    }
    function f() {
      const e = t.params.pagination;
      if (c()) return;
      let s = t.pagination.el;
      s &&
        ((s = o(s)),
        s.forEach((s) => {
          s.classList.remove(e.hiddenClass),
            s.classList.remove(e.modifierClass + e.type),
            s.classList.remove(
              t.isHorizontal() ? e.horizontalClass : e.verticalClass,
            ),
            e.clickable &&
              (s.classList.remove(...(e.clickableClass || "").split(" ")),
              s.removeEventListener("click", p));
        })),
        t.pagination.bullets &&
          t.pagination.bullets.forEach((t) =>
            t.classList.remove(...e.bulletActiveClass.split(" ")),
          );
    }
    i("changeDirection", () => {
      if (!t.pagination || !t.pagination.el) return;
      const e = t.params.pagination;
      let { el: s } = t.pagination;
      (s = o(s)),
        s.forEach((s) => {
          s.classList.remove(e.horizontalClass, e.verticalClass),
            s.classList.add(
              t.isHorizontal() ? e.horizontalClass : e.verticalClass,
            );
        });
    }),
      i("init", () => {
        !1 === t.params.pagination.enabled ? g() : (m(), h(), u());
      }),
      i("activeIndexChange", () => {
        void 0 === t.snapIndex && u();
      }),
      i("snapIndexChange", () => {
        u();
      }),
      i("snapGridLengthChange", () => {
        h(), u();
      }),
      i("destroy", () => {
        f();
      }),
      i("enable disable", () => {
        let { el: e } = t.pagination;
        e &&
          ((e = o(e)),
          e.forEach((e) =>
            e.classList[t.enabled ? "remove" : "add"](
              t.params.pagination.lockClass,
            ),
          ));
      }),
      i("lock unlock", () => {
        u();
      }),
      i("click", (e, s) => {
        const i = s.target,
          a = o(t.pagination.el);
        if (
          t.params.pagination.el &&
          t.params.pagination.hideOnClick &&
          a &&
          a.length > 0 &&
          !i.classList.contains(t.params.pagination.bulletClass)
        ) {
          if (
            t.navigation &&
            ((t.navigation.nextEl && i === t.navigation.nextEl) ||
              (t.navigation.prevEl && i === t.navigation.prevEl))
          )
            return;
          const e = a[0].classList.contains(t.params.pagination.hiddenClass);
          l(!0 === e ? "paginationShow" : "paginationHide"),
            a.forEach((e) =>
              e.classList.toggle(t.params.pagination.hiddenClass),
            );
        }
      });
    const g = () => {
      t.el.classList.add(t.params.pagination.paginationDisabledClass);
      let { el: e } = t.pagination;
      e &&
        ((e = o(e)),
        e.forEach((e) =>
          e.classList.add(t.params.pagination.paginationDisabledClass),
        )),
        f();
    };
    Object.assign(t.pagination, {
      enable: () => {
        t.el.classList.remove(t.params.pagination.paginationDisabledClass);
        let { el: e } = t.pagination;
        e &&
          ((e = o(e)),
          e.forEach((e) =>
            e.classList.remove(t.params.pagination.paginationDisabledClass),
          )),
          m(),
          h(),
          u();
      },
      disable: g,
      render: h,
      update: u,
      init: m,
      destroy: f,
    });
  }
  function he() {
    let e = document.querySelectorAll(
      '[class*="__swiper"]:not(.swiper-wrapper)',
    );
    e &&
      e.forEach((e) => {
        e.parentElement.classList.add("swiper"),
          e.classList.add("swiper-wrapper");
        for (const t of e.children) t.classList.add("swiper-slide");
      });
  }
  Object.keys(oe).forEach((e) => {
    Object.keys(oe[e]).forEach((t) => {
      de.prototype[t] = oe[e][t];
    });
  }),
    de.use([
      function (e) {
        let { swiper: t, on: s, emit: i } = e;
        const l = y();
        let a = null,
          n = null;
        const r = () => {
            t &&
              !t.destroyed &&
              t.initialized &&
              (i("beforeResize"), i("resize"));
          },
          o = () => {
            t && !t.destroyed && t.initialized && i("orientationchange");
          };
        s("init", () => {
          t.params.resizeObserver && void 0 !== l.ResizeObserver
            ? t &&
              !t.destroyed &&
              t.initialized &&
              ((a = new ResizeObserver((e) => {
                n = l.requestAnimationFrame(() => {
                  const { width: s, height: i } = t;
                  let l = s,
                    a = i;
                  e.forEach((e) => {
                    let { contentBoxSize: s, contentRect: i, target: n } = e;
                    (n && n !== t.el) ||
                      ((l = i ? i.width : (s[0] || s).inlineSize),
                      (a = i ? i.height : (s[0] || s).blockSize));
                  }),
                    (l === s && a === i) || r();
                });
              })),
              a.observe(t.el))
            : (l.addEventListener("resize", r),
              l.addEventListener("orientationchange", o));
        }),
          s("destroy", () => {
            n && l.cancelAnimationFrame(n),
              a && a.unobserve && t.el && (a.unobserve(t.el), (a = null)),
              l.removeEventListener("resize", r),
              l.removeEventListener("orientationchange", o);
          });
      },
      function (e) {
        let { swiper: t, extendParams: s, on: i, emit: l } = e;
        const a = [],
          n = y(),
          r = function (e, s) {
            void 0 === s && (s = {});
            const i = new (n.MutationObserver || n.WebkitMutationObserver)(
              (e) => {
                if (t.__preventObserver__) return;
                if (1 === e.length) return void l("observerUpdate", e[0]);
                const s = function () {
                  l("observerUpdate", e[0]);
                };
                n.requestAnimationFrame
                  ? n.requestAnimationFrame(s)
                  : n.setTimeout(s, 0);
              },
            );
            i.observe(e, {
              attributes: void 0 === s.attributes || s.attributes,
              childList: void 0 === s.childList || s.childList,
              characterData: void 0 === s.characterData || s.characterData,
            }),
              a.push(i);
          };
        s({ observer: !1, observeParents: !1, observeSlideChildren: !1 }),
          i("init", () => {
            if (t.params.observer) {
              if (t.params.observeParents) {
                const e = k(t.hostEl);
                for (let t = 0; t < e.length; t += 1) r(e[t]);
              }
              r(t.hostEl, { childList: t.params.observeSlideChildren }),
                r(t.wrapperEl, { attributes: !1 });
            }
          }),
          i("destroy", () => {
            a.forEach((e) => {
              e.disconnect();
            }),
              a.splice(0, a.length);
          });
      },
    ]),
    window.addEventListener("load", function (e) {
      he(),
        document.querySelector(".customer-section__slider") &&
          new de(".customer-section__slider", {
            modules: [ue],
            observer: !0,
            observeParents: !0,
            watchOverflow: !0,
            slidesPerView: 1,
            spaceBetween: 0,
            speed: 800,
            pagination: { el: ".customer-section__pagging", clickable: !0 },
            breakpoints: {
              1024: { slidesPerView: 2 },
              768: { slidesPerView: 1, spaceBetween: 0 },
            },
            on: {},
          });
    });
  let me = !1;
  setTimeout(() => {
    if (me) {
      let e = new Event("windowScroll");
      window.addEventListener("scroll", function (t) {
        document.dispatchEvent(e);
      });
    }
  }, 0);
  const fe = document.querySelectorAll(".item-restaurant__bookmark"),
    ge = document.querySelectorAll(".item-restaurant__svg-bookmark");
  fe[0] &&
    fe[0].addEventListener("click", function (e) {
      ge[0].classList.toggle("color");
    }),
    fe[1] &&
      fe[1].addEventListener("click", function (e) {
        ge[1].classList.toggle("color");
      }),
    fe[2] &&
      fe[2].addEventListener("click", function (e) {
        ge[2].classList.toggle("color");
      });
  const ve = document.querySelectorAll(".item-dishes__favorite"),
    Se = document.querySelectorAll(".item-dishes__svg-favorite");
  ve[0] &&
    ve[0].addEventListener("click", function (e) {
      Se[0].classList.toggle("item-dishes__favorite-color");
    }),
    ve[1] &&
      ve[1].addEventListener("click", function (e) {
        Se[1].classList.toggle("item-dishes__favorite-color");
      }),
    ve[2] &&
      ve[2].addEventListener("click", function (e) {
        Se[2].classList.toggle("item-dishes__favorite-color");
      }),
    ve[3] &&
      ve[3].addEventListener("click", function (e) {
        Se[3].classList.toggle("item-dishes__favorite-color");
      }),
    ve[4] &&
      ve[4].addEventListener("click", function (e) {
        Se[4].classList.toggle("item-dishes__favorite-color");
      });
  const be = document.querySelectorAll(".item-dishes__add");
  be[0] &&
    be[0].addEventListener("click", function (e) {
      be[0].classList.toggle("item-dishes__add-color");
    }),
    be[1] &&
      be[1].addEventListener("click", function (e) {
        be[1].classList.toggle("item-dishes__add-color");
      }),
    be[2] &&
      be[2].addEventListener("click", function (e) {
        be[2].classList.toggle("item-dishes__add-color");
      }),
    be[3] &&
      be[3].addEventListener("click", function (e) {
        be[3].classList.toggle("item-dishes__add-color");
      }),
    be[4] &&
      be[4].addEventListener("click", function (e) {
        be[4].classList.toggle("item-dishes__add-color");
      }),
    (window.FLS = !0),
    (function (e) {
      let t = new Image();
      (t.onload = t.onerror =
        function () {
          e(2 == t.height);
        }),
        (t.src =
          "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA");
    })(function (e) {
      let t = !0 === e ? "webp" : "no-webp";
      document.documentElement.classList.add(t);
    }),
    s.any() && document.documentElement.classList.add("touch"),
    (function () {
      let e = document.querySelector(".icon-menu");
      e &&
        e.addEventListener("click", function (e) {
          n && (r(), document.documentElement.classList.toggle("menu-open"));
        });
    })(),
    new t({}),
    (function () {
      const e = document.querySelectorAll(
        "input[placeholder],textarea[placeholder]",
      );
      e.length &&
        e.forEach((e) => {
          e.dataset.placeholder = e.placeholder;
        }),
        document.body.addEventListener("focusin", function (e) {
          const t = e.target;
          ("INPUT" !== t.tagName && "TEXTAREA" !== t.tagName) ||
            (t.dataset.placeholder && (t.placeholder = ""),
            t.classList.add("_form-focus"),
            t.parentElement.classList.add("_form-focus"),
            m.removeError(t));
        }),
        document.body.addEventListener("focusout", function (e) {
          const t = e.target;
          ("INPUT" !== t.tagName && "TEXTAREA" !== t.tagName) ||
            (t.dataset.placeholder && (t.placeholder = t.dataset.placeholder),
            t.classList.remove("_form-focus"),
            t.parentElement.classList.remove("_form-focus"),
            t.hasAttribute("data-validate") && m.validateInput(t));
        });
    })(),
    (function (e) {
      const t = document.forms;
      if (t.length)
        for (const e of t)
          e.addEventListener("submit", function (e) {
            s(e.target, e);
          }),
            e.addEventListener("reset", function (e) {
              const t = e.target;
              m.formClean(t);
            });
      async function s(t, s) {
        if (0 === (e ? m.getErrors(t) : 0)) {
          if (t.hasAttribute("data-ajax")) {
            s.preventDefault();
            const e = t.getAttribute("action")
                ? t.getAttribute("action").trim()
                : "#",
              l = t.getAttribute("method")
                ? t.getAttribute("method").trim()
                : "GET",
              a = new FormData(t);
            t.classList.add("_sending");
            const n = await fetch(e, { method: l, body: a });
            if (n.ok) {
              await n.json();
              t.classList.remove("_sending"), i(t);
            } else alert("Ошибка"), t.classList.remove("_sending");
          } else t.hasAttribute("data-dev") && (s.preventDefault(), i(t));
        } else {
          s.preventDefault();
          const e = t.querySelector("._form-error");
          e && t.hasAttribute("data-goto-error") && p(e, !0, 1e3);
        }
      }
      function i(e) {
        document.dispatchEvent(
          new CustomEvent("formSent", { detail: { form: e } }),
        ),
          m.formClean(e),
          d(`[Формы]: ${"Форма отправлена!"}`);
      }
    })(!0),
    (h.selectModule = new u({}));
})();
