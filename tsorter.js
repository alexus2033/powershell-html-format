var tsorter = function() {
    "use strict";
    var s, c, t, o, r, a, l = !!document.addEventListener,
      e = document.createElement("style");
    return document.head.appendChild(e), e.sheet.insertRule(".tsorterSortable th { cursor: pointer }", 0), e.sheet.insertRule('.tsorterSortable th.descend:after { content: " ▲" }', 0), e.sheet.insertRule('.tsorterSortable th.ascend:after { content: " ▼" }', 0), Object.create || (Object.create = function(e) {
      function t() {}
      return t.prototype = e, new t
    }), c = function(e, t, n) {
      l ? e.addEventListener(t, n, !1) : e.attachEvent("on" + t, n)
    }, t = function(e, t, n) {
      l ? e.removeEventListener(t, n, !1) : e.detachEvent("on" + t, n)
    }, o = function(e, t) {
      var n, e = a(e, t),
        t = e ? e.innerHTML : "";
      if (e && (n = r(t))) return n
    }, r = function(e) {
      return /^[\+\-]?(?:\d*\.)?\d+$/.test(e) ? "numeric" : null
    }, a = function(e, t) {
      for (var n = e; n.children && 0 < n.children.length;) n = n.children[t];
      return n
    }, s = {
      getCell: function(e) {
        return this.trs[e].cells[this.column]
      },
      sort: function(e) {
        var t, n = this,
          r = e.target,
          s = r.parentNode.tagName,
          c = r.getAttribute("data-tsorter") || o(n.trs[1], r.cellIndex),
          e = !!document.body.classList;
        "th" !== s.toLowerCase() && (n.column = n.getHeaderIndex(n.table, r), n.get = n.getAccessor(c), console.log("Sorting by column number " + n.column), e ? ((t = r.classList).contains("descend") ? (t.add("ascend"), t.remove("descend"), n.sortAscending = !0) : (t.contains("ascend") && t.remove("ascend"), t.add("descend"), n.sortAscending = !1), -1 !== n.prevCol && n.prevCol !== n.column && (n.ths[n.prevCol].classList.remove("ascend"), n.ths[n.prevCol].classList.remove("descend"))) : (-1 < (t = r.className.split(" ")).indexOf("descend") ? (r.className = r.className.replace("descend", "ascend"), n.sortAscending = !0) : (-1 < t.indexOf("ascend") ? r.className = r.className.replace("ascend", "descend") : r.className += " descend", n.sortAscending = !1), -1 !== n.prevCol && n.prevCol !== n.column && (n.ths[n.prevCol].className.replace("ascend", ""), n.ths[n.prevCol].className.replace("descend", ""))), n.quicksort(0, n.trs.length), n.prevCol = n.column)
      },
      getAccessor: function(e) {
        var tab = this,
          n = tab.accessors;
        if (n && n[e]) return n[e];
        switch (e) {
          case "link":
            return function(e) {
              return tab.getCell(e).firstChild.firstChild.nodeValue
            };
          case "input":
            return function(e) {
              return tab.getCell(e).firstChild.value
            };
          case "numeric":
            return function(e) {
              return parseFloat(tab.getCell(e).firstChild.nodeValue.replace(',','.').replace(/[^0-9\-.]+/g, ''),10)
            };
          case "date-time":
            return function(e) {
              var dt =  tab.getCell(e).firstChild.nodeValue.toLowerCase();
              var pattern = /(\d{1,2})\.(\d{1,2})\.(\d{2,4})/;
              return dt.replace(pattern,'$3-$2-$1');
            };
          default:
            return function(e) {
              return void 0 !== tab.getCell(e) && null != tab.getCell(e).firstChild ? tab.getCell(e).firstChild.nodeValue : ""
            }
        }
      },
      exchange: function(e, t) {
        var n = this.tbody,
          r = this.trs;
        e === t + 1 ? n.insertBefore(r[e], r[t]) : t === e + 1 ? n.insertBefore(r[t], r[e]) : (t = n.replaceChild(r[e], r[t]), r[e] ? n.insertBefore(t, r[e]) : n.appendChild(t))
      },
      quicksort: function(e, t) {
        var n, r, s, c = this;
        if (!(t <= e + 1)) {
          for (n = e + 1, r = t - 1, c.get(e) > c.get(n) && c.exchange(n, e), c.get(r) > c.get(e) && c.exchange(e, r), c.get(e) > c.get(n) && c.exchange(n, e), s = c.get(e);;) {
            if (c.sortAscending) {
              for (; s > c.get(r);) r--;
              for (; c.get(n) > s;) n++
            } else {
              for (; s < c.get(r);) r--;
              for (; c.get(n) < s;) n++
            }
            if (r <= n) break;
            (c.get(n) > c.get(r) || c.get(n) < c.get(r)) && c.exchange(n, r), n++, r--
          }(c.get(e) > c.get(r) || c.get(e) < c.get(r)) && c.exchange(e, r), r - e < t - r ? (c.quicksort(e, r), c.quicksort(r + 1, t)) : (c.quicksort(r + 1, t), c.quicksort(e, r))
        }
      },
      getHeaderIndex: function(e, t) {
        for (var n = e.tHead.getElementsByTagName("th"), r = 0, s = 0; s < n.length; s++) {
          var c = n[s];
          if (c.innerHTML === t.innerHTML) return r;
          r += c.colSpan
        }
      },
      readHeaders: function(e) {
        for (var t = e.tHead.getElementsByTagName("th"), n = [], r = 0, s = 0; s < t.length; s++)
          for (var c = t[s], o = 0; o < c.colSpan; o++) n[r] = c, r++, console.log("Adding a header at index " + r + " for header " + c.innerHTML);
        return n
      },
      init: function(e, t, n) {
        var r, s = this;
        if ("string" == typeof e && (e = document.getElementById(e)), e && null != e) {
          for (e.className.indexOf("tsorterSortable") <= -1 && (e.className += " tsorterSortable"), s.table = e, s.ths = s.readHeaders(e), s.tbody = e.tBodies[0], s.trs = s.tbody.getElementsByTagName("tr"), s.prevCol = t && 0 < t ? t : -1, s.accessors = n, s.boundSort = s.sort.bind(s), r = 0; r < s.ths.length; r++) c(s.ths[r], "click", s.boundSort);
          void 0 !== t && s.ths.length >= t && (s.ths[t].className += " ascend", t = (n = s.ths[t]).getAttribute("data-tsorter") || o(s.trs[1], n.cellIndex), s.column = n.cellIndex, s.get = s.getAccessor(t), s.quicksort(1, s.ths.length), s.prevCol = s.column)
        }
      },
      destroy: function() {
        var e;
        if (this.ths)
          for (e = 0; e < this.ths.length; e++) t(this.ths[e], "click", this.boundSort)
      }
    }, {
      create: function(e, t, n) {
        var r = Object.create(s);
        return r.init(e, t, n), r
      }
    }
  }();
  