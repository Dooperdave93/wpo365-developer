! function(e) {
    var t = {};

    function n(r) {
        if (t[r]) return t[r].exports;
        var o = t[r] = {
            i: r,
            l: !1,
            exports: {}
        };
        return e[r].call(o.exports, o, o.exports, n), o.l = !0, o.exports
    }
    n.m = e, n.c = t, n.d = function(e, t, r) {
        n.o(e, t) || Object.defineProperty(e, t, {
            enumerable: !0,
            get: r
        })
    }, n.r = function(e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }, n.t = function(e, t) {
        if (1 & t && (e = n(e)), 8 & t) return e;
        if (4 & t && "object" == typeof e && e && e.__esModule) return e;
        var r = Object.create(null);
        if (n.r(r), Object.defineProperty(r, "default", {
                enumerable: !0,
                value: e
            }), 2 & t && "string" != typeof e)
            for (var o in e) n.d(r, o, function(t) {
                return e[t]
            }.bind(null, o));
        return r
    }, n.n = function(e) {
        var t = e && e.__esModule ? function() {
            return e.default
        } : function() {
            return e
        };
        return n.d(t, "a", t), t
    }, n.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }, n.p = "", n(n.s = 5)
}([function(e, t) {
    e.exports = React
}, function(e, t) {
    e.exports = window.wp.blocks
}, , function(e, t) {
    e.exports = ReactDOM
}, , function(e, t, n) {
    "use strict";
    n.r(t);
    var r = n(0),
        o = n(3);

    function l(e) {
        return (l = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        })(e)
    }

    function i(e, t) {
        return function(e) {
            if (Array.isArray(e)) return e
        }(e) || function(e, t) {
            var n = e && ("undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"]);
            if (null != n) {
                var r, o, l = [],
                    _n = !0,
                    i = !1;
                try {
                    for (n = n.call(e); !(_n = (r = n.next()).done) && (l.push(r.value), !t || l.length !== t); _n = !0);
                } catch (e) {
                    i = !0, o = e
                } finally {
                    try {
                        _n || null == n.return || n.return()
                    } finally {
                        if (i) throw o
                    }
                }
                return l
            }
        }(e, t) || function(e, t) {
            if (e) {
                if ("string" == typeof e) return a(e, t);
                var n = Object.prototype.toString.call(e).slice(8, -1);
                return "Object" === n && e.constructor && (n = e.constructor.name), "Map" === n || "Set" === n ? Array.from(e) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? a(e, t) : void 0
            }
        }(e, t) || function() {
            throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
        }()
    }

    function a(e, t) {
        (null == t || t > e.length) && (t = e.length);
        for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
        return r
    }
    n(1), n(6);
    var c = document.getElementById("wpo365Recent");
    o.render(wp.element.createElement((function(e) {
        var t, n = window.wpo365.blocks.nonce,
            o = window.wpo365.blocks.apiUrl,
            a = (10, (t = c.getAttribute("data-pagesize")) && !isNaN(parseInt(t)) ? parseInt(t) : 10),
            u = i(r.useState([]), 2),
            s = u[0],
            p = u[1],
            f = i(r.useState(""), 2),
            d = f[0],
            y = f[1],
            m = i(r.useState(null), 2),
            b = m[0],
            h = m[1],
            g = i(r.useState(""), 2),
            w = g[0],
            v = g[1];
        return r.useEffect((function() {
            fetch(o + "/me", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json; odata=verbose",
                    "X-WP-Nonce": n
                },
                body: JSON.stringify({
                    data: null,
                    headers: null,
                    query: "sites/32b1ea3b-60ad-43ea-b5d1-3c06a01c4cd5,53b5c081-e8ac-4cb2-82a5-69ae905175fd/lists/4774b24a-2b3e-4278-beac-1e77c9220c68/items",
                    scope: "https://graph.microsoft.com/Sites.Read.All",
                    application: !1,
                    binary: !1,
                    method: "GET"
                })
            }).then((function(e) {
                return e.json()
            })).then((function(e) {
                if (console.log(e), "object" != l(e) || !e.value) throw "Fetch returned an unexpected result -> " + JSON.stringify(e);
                p(e.value)
            })).catch((function(e) {
                e.response ? y(JSON.stringify(e.response.data)) : y(JSON.stringify(e))
            }))
        }), []), r.useEffect((function() {
            fetch(o + "/me", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json; odata=verbose",
                    "X-WP-Nonce": n
                },
                body: JSON.stringify({
                    data: null,
                    headers: null,
                    query: "photo/$value",
                    scope: "https://graph.microsoft.com/User.Read",
                    application: !1,
                    binary: !0,
                    method: "GET"
                })
            }).then((function(e) {
                return e.json()
            })).then((function(e) {
                if (console.log(e), "object" != l(e) || !e.binary) throw "Fetch returned an unexpected result -> " + JSON.stringify(e);
                h("data:image/png;base64,".concat(e.binary))
            })).catch((function(e) {
                e.response ? v(JSON.stringify(e.response.data)) : v(JSON.stringify(e))
            }))
        }), []), wp.element.createElement("div", null, wp.element.createElement("div", {
            style: {
                display: "block"
            }
        }, wp.element.createElement("table", null, wp.element.createElement("tbody", null, wp.element.createElement("tr", null, wp.element.createElement("td", null, wp.element.createElement("div", null, wp.element.createElement("div", {
            style: {
                display: "table-cell"
            }
        }, wp.element.createElement("h3", {
            style: {
                lineHeight: "100px",
                verticalAlign: "middle"
            }
        }, "My recent documents")), wp.element.createElement("div", {
            style: {
                display: "table-cell",
                lineHeight: "100px",
                verticalAlign: "middle",
                paddingLeft: "50px"
            }
        }, b && wp.element.createElement("img", {
            src: b,
            style: {
                display: "block",
                width: "90px",
                height: "90px"
            }
        }))))), Array.isArray(s) && s.map((function(e, t) {
            return wp.element.createElement("tr", {
                key: "tr_" + t
            }, wp.element.createElement("td", {
                key: "td_" + t
            }, e.resourceVisualization.title))
        }))))), d && wp.element.createElement("div", {
            style: {
                display: "block"
            }
        }, d), w && wp.element.createElement("div", {
            style: {
                display: "block"
            }
        }, w))
    }), null), c)
}, function(e, t) {
    e.exports = window.wp.element
}]);