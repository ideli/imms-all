(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports={
    "distVersion":"1.0",
    "maxTabCount":9,
    "plugins":{
        "autocomplete":"autocomplete/autocomplete.js",
        "datepicker":"my97/datepicker.js",
        "ztree":"ztree/ztree.js",
        "echarts":"echarts/echarts317.js",
        "echarts2":"echarts/echarts225.js",
        "echarts3":"echarts/echarts317.js",
        "china":"echarts/china.js",
        "dict":"dict/dict.js"
    }
}
},{}],2:[function(require,module,exports){
var _easyui=function(jQuery) {
    (function ($) {
        $.parser = {
            auto: true,
            onComplete: function (_1) {
            },
            plugins: ["draggable", "droppable", "resizable", "pagination", "tooltip", "linkbutton", "menu", "menubutton", "splitbutton", "progressbar", "tree", "textbox", "filebox", "combo", "combobox", "combotree", "combogrid", "numberbox", "validatebox", "searchbox", "spinner", "numberspinner", "timespinner", "datetimespinner", "calendar", "datebox", "datetimebox", "slider", "layout", "panel", "datagrid", "propertygrid", "treegrid", "datalist", "tabs", "accordion", "window", "dialog", "form"],
            parse: function (_2) {
                var aa = [];
                for (var i = 0; i < $.parser.plugins.length; i++) {
                    var _3 = $.parser.plugins[i];
                    var r = $(".easyui-" + _3, _2);
                    if (r.length) {
                        if (r[_3]) {
                            r[_3]();
                        } else {
                            aa.push({name: _3, jq: r});
                        }
                    }
                }
                if (aa.length && window.easyloader) {
                    var _4 = [];
                    for (var i = 0; i < aa.length; i++) {
                        _4.push(aa[i].name);
                    }
                    easyloader.load(_4, function () {
                        for (var i = 0; i < aa.length; i++) {
                            var _5 = aa[i].name;
                            var jq = aa[i].jq;
                            jq[_5]();
                        }
                        $.parser.onComplete.call($.parser, _2);
                    });
                } else {
                    $.parser.onComplete.call($.parser, _2);
                }
            },
            parseValue: function (_6, _7, _8, _9) {
                _9 = _9 || 0;
                var v = $.trim(String(_7 || ""));
                var _a = v.substr(v.length - 1, 1);
                if (_a == "%") {
                    v = parseInt(v.substr(0, v.length - 1));
                    if (_6.toLowerCase().indexOf("width") >= 0) {
                        v = Math.floor((_8.width() - _9) * v / 100);
                    } else {
                        v = Math.floor((_8.height() - _9) * v / 100);
                    }
                } else {
                    v = parseInt(v) || undefined;
                }
                return v;
            },
            parseOptions: function (_b, _c) {
                var t = $(_b);
                var _d = {};
                var s = $.trim(t.attr("data-options"));
                if (s) {
                    if (s.substring(0, 1) != "{") {
                        s = "{" + s + "}";
                    }
                    _d = (new Function("return " + s))();
                }
                $.map(["width", "height", "left", "top", "minWidth", "maxWidth", "minHeight", "maxHeight"], function (p) {
                    var pv = $.trim(_b.style[p] || "");
                    if (pv) {
                        if (pv.indexOf("%") == -1) {
                            pv = parseInt(pv) || undefined;
                        }
                        _d[p] = pv;
                    }
                });
                if (_c) {
                    var _e = {};
                    for (var i = 0; i < _c.length; i++) {
                        var pp = _c[i];
                        if (typeof pp == "string") {
                            _e[pp] = t.attr(pp);
                        } else {
                            for (var _f in pp) {
                                var _10 = pp[_f];
                                if (_10 == "boolean") {
                                    _e[_f] = t.attr(_f) ? (t.attr(_f) == "true") : undefined;
                                } else {
                                    if (_10 == "number") {
                                        _e[_f] = t.attr(_f) == "0" ? 0 : parseFloat(t.attr(_f)) || undefined;
                                    }
                                }
                            }
                        }
                    }
                    $.extend(_d, _e);
                }
                return _d;
            }
        };
        $(function () {
            var d = $("<div style=\"position:absolute;top:-1000px;width:100px;height:100px;padding:5px\"></div>").appendTo("body");
            $._boxModel = d.outerWidth() != 100;
            d.remove();
            if (!window.easyloader && $.parser.auto) {
                $.parser.parse();
            }
        });
        $.fn._outerWidth = function (_11) {
            if (_11 == undefined) {
                if (this[0] == window) {
                    return this.width() || document.body.clientWidth;
                }
                return this.outerWidth() || 0;
            }
            return this._size("width", _11);
        };
        $.fn._outerHeight = function (_12) {
            if (_12 == undefined) {
                if (this[0] == window) {
                    return this.height() || document.body.clientHeight;
                }
                return this.outerHeight() || 0;
            }
            return this._size("height", _12);
        };
        $.fn._scrollLeft = function (_13) {
            if (_13 == undefined) {
                return this.scrollLeft();
            } else {
                return this.each(function () {
                    $(this).scrollLeft(_13);
                });
            }
        };
        $.fn._propAttr = $.fn.prop || $.fn.attr;
        $.fn._size = function (_14, _15) {
            if (typeof _14 == "string") {
                if (_14 == "clear") {
                    return this.each(function () {
                        $(this).css({width: "", minWidth: "", maxWidth: "", height: "", minHeight: "", maxHeight: ""});
                    });
                } else {
                    if (_14 == "fit") {
                        return this.each(function () {
                            _16(this, this.tagName == "BODY" ? $("body") : $(this).parent(), true);
                        });
                    } else {
                        if (_14 == "unfit") {
                            return this.each(function () {
                                _16(this, $(this).parent(), false);
                            });
                        } else {
                            if (_15 == undefined) {
                                return _17(this[0], _14);
                            } else {
                                return this.each(function () {
                                    _17(this, _14, _15);
                                });
                            }
                        }
                    }
                }
            } else {
                return this.each(function () {
                    _15 = _15 || $(this).parent();
                    $.extend(_14, _16(this, _15, _14.fit) || {});
                    var r1 = _18(this, "width", _15, _14);
                    var r2 = _18(this, "height", _15, _14);
                    if (r1 || r2) {
                        $(this).addClass("easyui-fluid");
                    } else {
                        $(this).removeClass("easyui-fluid");
                    }
                });
            }
            function _16(_19, _1a, fit) {
                if (!_1a.length) {
                    return false;
                }
                var t = $(_19)[0];
                var p = _1a[0];
                var _1b = p.fcount || 0;
                if (fit) {
                    if (!t.fitted) {
                        t.fitted = true;
                        p.fcount = _1b + 1;
                        $(p).addClass("panel-noscroll");
                        if (p.tagName == "BODY") {
                            $("html").addClass("panel-fit");
                        }
                    }
                    return {width: ($(p).width() || 1), height: ($(p).height() || 1)};
                } else {
                    if (t.fitted) {
                        t.fitted = false;
                        p.fcount = _1b - 1;
                        if (p.fcount == 0) {
                            $(p).removeClass("panel-noscroll");
                            if (p.tagName == "BODY") {
                                $("html").removeClass("panel-fit");
                            }
                        }
                    }
                    return false;
                }
            };
            function _18(_1c, _1d, _1e, _1f) {
                var t = $(_1c);
                var p = _1d;
                var p1 = p.substr(0, 1).toUpperCase() + p.substr(1);
                var min = $.parser.parseValue("min" + p1, _1f["min" + p1], _1e);
                var max = $.parser.parseValue("max" + p1, _1f["max" + p1], _1e);
                var val = $.parser.parseValue(p, _1f[p], _1e);
                var _20 = (String(_1f[p] || "").indexOf("%") >= 0 ? true : false);
                if (!isNaN(val)) {
                    var v = Math.min(Math.max(val, min || 0), max || 99999);
                    if (!_20) {
                        _1f[p] = v;
                    }
                    t._size("min" + p1, "");
                    t._size("max" + p1, "");
                    t._size(p, v);
                } else {
                    t._size(p, "");
                    t._size("min" + p1, min);
                    t._size("max" + p1, max);
                }
                return _20 || _1f.fit;
            };
            function _17(_21, _22, _23) {
                var t = $(_21);
                if (_23 == undefined) {
                    _23 = parseInt(_21.style[_22]);
                    if (isNaN(_23)) {
                        return undefined;
                    }
                    if ($._boxModel) {
                        _23 += _24();
                    }
                    return _23;
                } else {
                    if (_23 === "") {
                        t.css(_22, "");
                    } else {
                        if ($._boxModel) {
                            _23 -= _24();
                            if (_23 < 0) {
                                _23 = 0;
                            }
                        }
                        t.css(_22, _23 + "px");
                    }
                }
                function _24() {
                    if (_22.toLowerCase().indexOf("width") >= 0) {
                        return t.outerWidth() - t.width();
                    } else {
                        return t.outerHeight() - t.height();
                    }
                };
            };
        };
    })(jQuery);
    (function ($) {
        var _25 = null;
        var _26 = null;
        var _27 = false;

        function _28(e) {
            if (e.touches.length != 1) {
                return;
            }
            if (!_27) {
                _27 = true;
                dblClickTimer = setTimeout(function () {
                    _27 = false;
                }, 500);
            } else {
                clearTimeout(dblClickTimer);
                _27 = false;
                _29(e, "dblclick");
            }
            _25 = setTimeout(function () {
                _29(e, "contextmenu", 3);
            }, 1000);
            _29(e, "mousedown");
            if ($.fn.draggable.isDragging || $.fn.resizable.isResizing) {
                e.preventDefault();
            }
        };
        function _2a(e) {
            if (e.touches.length != 1) {
                return;
            }
            if (_25) {
                clearTimeout(_25);
            }
            _29(e, "mousemove");
            if ($.fn.draggable.isDragging || $.fn.resizable.isResizing) {
                e.preventDefault();
            }
        };
        function _2b(e) {
            if (_25) {
                clearTimeout(_25);
            }
            _29(e, "mouseup");
            if ($.fn.draggable.isDragging || $.fn.resizable.isResizing) {
                e.preventDefault();
            }
        };
        function _29(e, _2c, _2d) {
            var _2e = new $.Event(_2c);
            _2e.pageX = e.changedTouches[0].pageX;
            _2e.pageY = e.changedTouches[0].pageY;
            _2e.which = _2d || 1;
            $(e.target).trigger(_2e);
        };
        if (document.addEventListener) {
            document.addEventListener("touchstart", _28, true);
            document.addEventListener("touchmove", _2a, true);
            document.addEventListener("touchend", _2b, true);
        }
    })(jQuery);
    (function ($) {
        function _2f(e) {
            var _30 = $.data(e.data.target, "draggable");
            var _31 = _30.options;
            var _32 = _30.proxy;
            var _33 = e.data;
            var _34 = _33.startLeft + e.pageX - _33.startX;
            var top = _33.startTop + e.pageY - _33.startY;
            if (_32) {
                if (_32.parent()[0] == document.body) {
                    if (_31.deltaX != null && _31.deltaX != undefined) {
                        _34 = e.pageX + _31.deltaX;
                    } else {
                        _34 = e.pageX - e.data.offsetWidth;
                    }
                    if (_31.deltaY != null && _31.deltaY != undefined) {
                        top = e.pageY + _31.deltaY;
                    } else {
                        top = e.pageY - e.data.offsetHeight;
                    }
                } else {
                    if (_31.deltaX != null && _31.deltaX != undefined) {
                        _34 += e.data.offsetWidth + _31.deltaX;
                    }
                    if (_31.deltaY != null && _31.deltaY != undefined) {
                        top += e.data.offsetHeight + _31.deltaY;
                    }
                }
            }
            if (e.data.parent != document.body) {
                _34 += $(e.data.parent).scrollLeft();
                top += $(e.data.parent).scrollTop();
            }
            if (_31.axis == "h") {
                _33.left = _34;
            } else {
                if (_31.axis == "v") {
                    _33.top = top;
                } else {
                    _33.left = _34;
                    _33.top = top;
                }
            }
        };
        function _35(e) {
            var _36 = $.data(e.data.target, "draggable");
            var _37 = _36.options;
            var _38 = _36.proxy;
            if (!_38) {
                _38 = $(e.data.target);
            }
            _38.css({left: e.data.left, top: e.data.top});
            $("body").css("cursor", _37.cursor);
        };
        function _39(e) {
            if (!$.fn.draggable.isDragging) {
                return false;
            }
            var _3a = $.data(e.data.target, "draggable");
            var _3b = _3a.options;
            var _3c = $(".droppable").filter(function () {
                return e.data.target != this;
            }).filter(function () {
                var _3d = $.data(this, "droppable").options.accept;
                if (_3d) {
                    return $(_3d).filter(function () {
                            return this == e.data.target;
                        }).length > 0;
                } else {
                    return true;
                }
            });
            _3a.droppables = _3c;
            var _3e = _3a.proxy;
            if (!_3e) {
                if (_3b.proxy) {
                    if (_3b.proxy == "clone") {
                        _3e = $(e.data.target).clone().insertAfter(e.data.target);
                    } else {
                        _3e = _3b.proxy.call(e.data.target, e.data.target);
                    }
                    _3a.proxy = _3e;
                } else {
                    _3e = $(e.data.target);
                }
            }
            _3e.css("position", "absolute");
            _2f(e);
            _35(e);
            _3b.onStartDrag.call(e.data.target, e);
            return false;
        };
        function _3f(e) {
            if (!$.fn.draggable.isDragging) {
                return false;
            }
            var _40 = $.data(e.data.target, "draggable");
            _2f(e);
            if (_40.options.onDrag.call(e.data.target, e) != false) {
                _35(e);
            }
            var _41 = e.data.target;
            _40.droppables.each(function () {
                var _42 = $(this);
                if (_42.droppable("options").disabled) {
                    return;
                }
                var p2 = _42.offset();
                if (e.pageX > p2.left && e.pageX < p2.left + _42.outerWidth() && e.pageY > p2.top && e.pageY < p2.top + _42.outerHeight()) {
                    if (!this.entered) {
                        $(this).trigger("_dragenter", [_41]);
                        this.entered = true;
                    }
                    $(this).trigger("_dragover", [_41]);
                } else {
                    if (this.entered) {
                        $(this).trigger("_dragleave", [_41]);
                        this.entered = false;
                    }
                }
            });
            return false;
        };
        function _43(e) {
            if (!$.fn.draggable.isDragging) {
                _44();
                return false;
            }
            _3f(e);
            var _45 = $.data(e.data.target, "draggable");
            var _46 = _45.proxy;
            var _47 = _45.options;
            if (_47.revert) {
                if (_48() == true) {
                    $(e.data.target).css({
                        position: e.data.startPosition,
                        left: e.data.startLeft,
                        top: e.data.startTop
                    });
                } else {
                    if (_46) {
                        var _49, top;
                        if (_46.parent()[0] == document.body) {
                            _49 = e.data.startX - e.data.offsetWidth;
                            top = e.data.startY - e.data.offsetHeight;
                        } else {
                            _49 = e.data.startLeft;
                            top = e.data.startTop;
                        }
                        _46.animate({left: _49, top: top}, function () {
                            _4a();
                        });
                    } else {
                        $(e.data.target).animate({left: e.data.startLeft, top: e.data.startTop}, function () {
                            $(e.data.target).css("position", e.data.startPosition);
                        });
                    }
                }
            } else {
                $(e.data.target).css({position: "absolute", left: e.data.left, top: e.data.top});
                _48();
            }
            _47.onStopDrag.call(e.data.target, e);
            _44();
            function _4a() {
                if (_46) {
                    _46.remove();
                }
                _45.proxy = null;
            };
            function _48() {
                var _4b = false;
                _45.droppables.each(function () {
                    var _4c = $(this);
                    if (_4c.droppable("options").disabled) {
                        return;
                    }
                    var p2 = _4c.offset();
                    if (e.pageX > p2.left && e.pageX < p2.left + _4c.outerWidth() && e.pageY > p2.top && e.pageY < p2.top + _4c.outerHeight()) {
                        if (_47.revert) {
                            $(e.data.target).css({
                                position: e.data.startPosition,
                                left: e.data.startLeft,
                                top: e.data.startTop
                            });
                        }
                        $(this).trigger("_drop", [e.data.target]);
                        _4a();
                        _4b = true;
                        this.entered = false;
                        return false;
                    }
                });
                if (!_4b && !_47.revert) {
                    _4a();
                }
                return _4b;
            };
            return false;
        };
        function _44() {
            if ($.fn.draggable.timer) {
                clearTimeout($.fn.draggable.timer);
                $.fn.draggable.timer = undefined;
            }
            $(document).unbind(".draggable");
            $.fn.draggable.isDragging = false;
            setTimeout(function () {
                $("body").css("cursor", "");
            }, 100);
        };
        $.fn.draggable = function (_4d, _4e) {
            if (typeof _4d == "string") {
                return $.fn.draggable.methods[_4d](this, _4e);
            }
            return this.each(function () {
                var _4f;
                var _50 = $.data(this, "draggable");
                if (_50) {
                    _50.handle.unbind(".draggable");
                    _4f = $.extend(_50.options, _4d);
                } else {
                    _4f = $.extend({}, $.fn.draggable.defaults, $.fn.draggable.parseOptions(this), _4d || {});
                }
                var _51 = _4f.handle ? (typeof _4f.handle == "string" ? $(_4f.handle, this) : _4f.handle) : $(this);
                $.data(this, "draggable", {options: _4f, handle: _51});
                if (_4f.disabled) {
                    $(this).css("cursor", "");
                    return;
                }
                _51.unbind(".draggable").bind("mousemove.draggable", {target: this}, function (e) {
                    if ($.fn.draggable.isDragging) {
                        return;
                    }
                    var _52 = $.data(e.data.target, "draggable").options;
                    if (_53(e)) {
                        $(this).css("cursor", _52.cursor);
                    } else {
                        $(this).css("cursor", "");
                    }
                }).bind("mouseleave.draggable", {target: this}, function (e) {
                    $(this).css("cursor", "");
                }).bind("mousedown.draggable", {target: this}, function (e) {
                    if (_53(e) == false) {
                        return;
                    }
                    $(this).css("cursor", "");
                    var _54 = $(e.data.target).position();
                    var _55 = $(e.data.target).offset();
                    var _56 = {
                        startPosition: $(e.data.target).css("position"),
                        startLeft: _54.left,
                        startTop: _54.top,
                        left: _54.left,
                        top: _54.top,
                        startX: e.pageX,
                        startY: e.pageY,
                        offsetWidth: (e.pageX - _55.left),
                        offsetHeight: (e.pageY - _55.top),
                        target: e.data.target,
                        parent: $(e.data.target).parent()[0]
                    };
                    $.extend(e.data, _56);
                    var _57 = $.data(e.data.target, "draggable").options;
                    if (_57.onBeforeDrag.call(e.data.target, e) == false) {
                        return;
                    }
                    $(document).bind("mousedown.draggable", e.data, _39);
                    $(document).bind("mousemove.draggable", e.data, _3f);
                    $(document).bind("mouseup.draggable", e.data, _43);
                    $.fn.draggable.timer = setTimeout(function () {
                        $.fn.draggable.isDragging = true;
                        _39(e);
                    }, _57.delay);
                    return false;
                });
                function _53(e) {
                    var _58 = $.data(e.data.target, "draggable");
                    var _59 = _58.handle;
                    var _5a = $(_59).offset();
                    var _5b = $(_59).outerWidth();
                    var _5c = $(_59).outerHeight();
                    var t = e.pageY - _5a.top;
                    var r = _5a.left + _5b - e.pageX;
                    var b = _5a.top + _5c - e.pageY;
                    var l = e.pageX - _5a.left;
                    return Math.min(t, r, b, l) > _58.options.edge;
                };
            });
        };
        $.fn.draggable.methods = {
            options: function (jq) {
                return $.data(jq[0], "draggable").options;
            }, proxy: function (jq) {
                return $.data(jq[0], "draggable").proxy;
            }, enable: function (jq) {
                return jq.each(function () {
                    $(this).draggable({disabled: false});
                });
            }, disable: function (jq) {
                return jq.each(function () {
                    $(this).draggable({disabled: true});
                });
            }
        };
        $.fn.draggable.parseOptions = function (_5d) {
            var t = $(_5d);
            return $.extend({}, $.parser.parseOptions(_5d, ["cursor", "handle", "axis", {
                "revert": "boolean",
                "deltaX": "number",
                "deltaY": "number",
                "edge": "number",
                "delay": "number"
            }]), {disabled: (t.attr("disabled") ? true : undefined)});
        };
        $.fn.draggable.defaults = {
            proxy: null,
            revert: false,
            cursor: "move",
            deltaX: null,
            deltaY: null,
            handle: null,
            disabled: false,
            edge: 0,
            axis: null,
            delay: 100,
            onBeforeDrag: function (e) {
            },
            onStartDrag: function (e) {
            },
            onDrag: function (e) {
            },
            onStopDrag: function (e) {
            }
        };
        $.fn.draggable.isDragging = false;
    })(jQuery);
    (function ($) {
        function _5e(_5f) {
            $(_5f).addClass("droppable");
            $(_5f).bind("_dragenter", function (e, _60) {
                $.data(_5f, "droppable").options.onDragEnter.apply(_5f, [e, _60]);
            });
            $(_5f).bind("_dragleave", function (e, _61) {
                $.data(_5f, "droppable").options.onDragLeave.apply(_5f, [e, _61]);
            });
            $(_5f).bind("_dragover", function (e, _62) {
                $.data(_5f, "droppable").options.onDragOver.apply(_5f, [e, _62]);
            });
            $(_5f).bind("_drop", function (e, _63) {
                $.data(_5f, "droppable").options.onDrop.apply(_5f, [e, _63]);
            });
        };
        $.fn.droppable = function (_64, _65) {
            if (typeof _64 == "string") {
                return $.fn.droppable.methods[_64](this, _65);
            }
            _64 = _64 || {};
            return this.each(function () {
                var _66 = $.data(this, "droppable");
                if (_66) {
                    $.extend(_66.options, _64);
                } else {
                    _5e(this);
                    $.data(this, "droppable", {options: $.extend({}, $.fn.droppable.defaults, $.fn.droppable.parseOptions(this), _64)});
                }
            });
        };
        $.fn.droppable.methods = {
            options: function (jq) {
                return $.data(jq[0], "droppable").options;
            }, enable: function (jq) {
                return jq.each(function () {
                    $(this).droppable({disabled: false});
                });
            }, disable: function (jq) {
                return jq.each(function () {
                    $(this).droppable({disabled: true});
                });
            }
        };
        $.fn.droppable.parseOptions = function (_67) {
            var t = $(_67);
            return $.extend({}, $.parser.parseOptions(_67, ["accept"]), {disabled: (t.attr("disabled") ? true : undefined)});
        };
        $.fn.droppable.defaults = {
            accept: null, disabled: false, onDragEnter: function (e, _68) {
            }, onDragOver: function (e, _69) {
            }, onDragLeave: function (e, _6a) {
            }, onDrop: function (e, _6b) {
            }
        };
    })(jQuery);
    (function ($) {
        $.fn.resizable = function (_6c, _6d) {
            if (typeof _6c == "string") {
                return $.fn.resizable.methods[_6c](this, _6d);
            }
            function _6e(e) {
                var _6f = e.data;
                var _70 = $.data(_6f.target, "resizable").options;
                if (_6f.dir.indexOf("e") != -1) {
                    var _71 = _6f.startWidth + e.pageX - _6f.startX;
                    _71 = Math.min(Math.max(_71, _70.minWidth), _70.maxWidth);
                    _6f.width = _71;
                }
                if (_6f.dir.indexOf("s") != -1) {
                    var _72 = _6f.startHeight + e.pageY - _6f.startY;
                    _72 = Math.min(Math.max(_72, _70.minHeight), _70.maxHeight);
                    _6f.height = _72;
                }
                if (_6f.dir.indexOf("w") != -1) {
                    var _71 = _6f.startWidth - e.pageX + _6f.startX;
                    _71 = Math.min(Math.max(_71, _70.minWidth), _70.maxWidth);
                    _6f.width = _71;
                    _6f.left = _6f.startLeft + _6f.startWidth - _6f.width;
                }
                if (_6f.dir.indexOf("n") != -1) {
                    var _72 = _6f.startHeight - e.pageY + _6f.startY;
                    _72 = Math.min(Math.max(_72, _70.minHeight), _70.maxHeight);
                    _6f.height = _72;
                    _6f.top = _6f.startTop + _6f.startHeight - _6f.height;
                }
            };
            function _73(e) {
                var _74 = e.data;
                var t = $(_74.target);
                t.css({left: _74.left, top: _74.top});
                if (t.outerWidth() != _74.width) {
                    t._outerWidth(_74.width);
                }
                if (t.outerHeight() != _74.height) {
                    t._outerHeight(_74.height);
                }
            };
            function _75(e) {
                $.fn.resizable.isResizing = true;
                $.data(e.data.target, "resizable").options.onStartResize.call(e.data.target, e);
                return false;
            };
            function _76(e) {
                _6e(e);
                if ($.data(e.data.target, "resizable").options.onResize.call(e.data.target, e) != false) {
                    _73(e);
                }
                return false;
            };
            function _77(e) {
                $.fn.resizable.isResizing = false;
                _6e(e, true);
                _73(e);
                $.data(e.data.target, "resizable").options.onStopResize.call(e.data.target, e);
                $(document).unbind(".resizable");
                $("body").css("cursor", "");
                return false;
            };
            return this.each(function () {
                var _78 = null;
                var _79 = $.data(this, "resizable");
                if (_79) {
                    $(this).unbind(".resizable");
                    _78 = $.extend(_79.options, _6c || {});
                } else {
                    _78 = $.extend({}, $.fn.resizable.defaults, $.fn.resizable.parseOptions(this), _6c || {});
                    $.data(this, "resizable", {options: _78});
                }
                if (_78.disabled == true) {
                    return;
                }
                $(this).bind("mousemove.resizable", {target: this}, function (e) {
                    if ($.fn.resizable.isResizing) {
                        return;
                    }
                    var dir = _7a(e);
                    if (dir == "") {
                        $(e.data.target).css("cursor", "");
                    } else {
                        $(e.data.target).css("cursor", dir + "-resize");
                    }
                }).bind("mouseleave.resizable", {target: this}, function (e) {
                    $(e.data.target).css("cursor", "");
                }).bind("mousedown.resizable", {target: this}, function (e) {
                    var dir = _7a(e);
                    if (dir == "") {
                        return;
                    }
                    function _7b(css) {
                        var val = parseInt($(e.data.target).css(css));
                        if (isNaN(val)) {
                            return 0;
                        } else {
                            return val;
                        }
                    };
                    var _7c = {
                        target: e.data.target,
                        dir: dir,
                        startLeft: _7b("left"),
                        startTop: _7b("top"),
                        left: _7b("left"),
                        top: _7b("top"),
                        startX: e.pageX,
                        startY: e.pageY,
                        startWidth: $(e.data.target).outerWidth(),
                        startHeight: $(e.data.target).outerHeight(),
                        width: $(e.data.target).outerWidth(),
                        height: $(e.data.target).outerHeight(),
                        deltaWidth: $(e.data.target).outerWidth() - $(e.data.target).width(),
                        deltaHeight: $(e.data.target).outerHeight() - $(e.data.target).height()
                    };
                    $(document).bind("mousedown.resizable", _7c, _75);
                    $(document).bind("mousemove.resizable", _7c, _76);
                    $(document).bind("mouseup.resizable", _7c, _77);
                    $("body").css("cursor", dir + "-resize");
                });
                function _7a(e) {
                    var tt = $(e.data.target);
                    var dir = "";
                    var _7d = tt.offset();
                    var _7e = tt.outerWidth();
                    var _7f = tt.outerHeight();
                    var _80 = _78.edge;
                    if (e.pageY > _7d.top && e.pageY < _7d.top + _80) {
                        dir += "n";
                    } else {
                        if (e.pageY < _7d.top + _7f && e.pageY > _7d.top + _7f - _80) {
                            dir += "s";
                        }
                    }
                    if (e.pageX > _7d.left && e.pageX < _7d.left + _80) {
                        dir += "w";
                    } else {
                        if (e.pageX < _7d.left + _7e && e.pageX > _7d.left + _7e - _80) {
                            dir += "e";
                        }
                    }
                    var _81 = _78.handles.split(",");
                    for (var i = 0; i < _81.length; i++) {
                        var _82 = _81[i].replace(/(^\s*)|(\s*$)/g, "");
                        if (_82 == "all" || _82 == dir) {
                            return dir;
                        }
                    }
                    return "";
                };
            });
        };
        $.fn.resizable.methods = {
            options: function (jq) {
                return $.data(jq[0], "resizable").options;
            }, enable: function (jq) {
                return jq.each(function () {
                    $(this).resizable({disabled: false});
                });
            }, disable: function (jq) {
                return jq.each(function () {
                    $(this).resizable({disabled: true});
                });
            }
        };
        $.fn.resizable.parseOptions = function (_83) {
            var t = $(_83);
            return $.extend({}, $.parser.parseOptions(_83, ["handles", {
                minWidth: "number",
                minHeight: "number",
                maxWidth: "number",
                maxHeight: "number",
                edge: "number"
            }]), {disabled: (t.attr("disabled") ? true : undefined)});
        };
        $.fn.resizable.defaults = {
            disabled: false,
            handles: "n, e, s, w, ne, se, sw, nw, all",
            minWidth: 10,
            minHeight: 10,
            maxWidth: 10000,
            maxHeight: 10000,
            edge: 5,
            onStartResize: function (e) {
            },
            onResize: function (e) {
            },
            onStopResize: function (e) {
            }
        };
        $.fn.resizable.isResizing = false;
    })(jQuery);
    (function ($) {
        function _84(_85, _86) {
            var _87 = $.data(_85, "linkbutton").options;
            if (_86) {
                $.extend(_87, _86);
            }
            if (_87.width || _87.height || _87.fit) {
                var btn = $(_85);
                var _88 = btn.parent();
                var _89 = btn.is(":visible");
                if (!_89) {
                    var _8a = $("<div style=\"display:none\"></div>").insertBefore(_85);
                    var _8b = {position: btn.css("position"), display: btn.css("display"), left: btn.css("left")};
                    btn.appendTo("body");
                    btn.css({position: "absolute", display: "inline-block", left: -20000});
                }
                btn._size(_87, _88);
                var _8c = btn.find(".l-btn-left");
                _8c.css("margin-top", 0);
                _8c.css("margin-top", parseInt((btn.height() - _8c.height()) / 2) + "px");
                if (!_89) {
                    btn.insertAfter(_8a);
                    btn.css(_8b);
                    _8a.remove();
                }
            }
        };
        function _8d(_8e) {
            var _8f = $.data(_8e, "linkbutton").options;
            var t = $(_8e).empty();
            t.addClass("l-btn").removeClass("l-btn-plain l-btn-selected l-btn-plain-selected l-btn-outline");
            t.removeClass("l-btn-small l-btn-medium l-btn-large").addClass("l-btn-" + _8f.size);
            if (_8f.plain) {
                t.addClass("l-btn-plain");
            }
            if (_8f.outline) {
                t.addClass("l-btn-outline");
            }
            if (_8f.selected) {
                t.addClass(_8f.plain ? "l-btn-selected l-btn-plain-selected" : "l-btn-selected");
            }
            t.attr("group", _8f.group || "");
            t.attr("id", _8f.id || "");
            var _90 = $("<span class=\"l-btn-left\"></span>").appendTo(t);
            if (_8f.text) {
                $("<span class=\"l-btn-text\"></span>").html(_8f.text).appendTo(_90);
            } else {
                $("<span class=\"l-btn-text l-btn-empty\">&nbsp;</span>").appendTo(_90);
            }
            if (_8f.iconCls) {
                $("<span class=\"l-btn-icon\">&nbsp;</span>").addClass(_8f.iconCls).appendTo(_90);
                _90.addClass("l-btn-icon-" + _8f.iconAlign);
            }
            t.unbind(".linkbutton").bind("focus.linkbutton", function () {
                if (!_8f.disabled) {
                    $(this).addClass("l-btn-focus");
                }
            }).bind("blur.linkbutton", function () {
                $(this).removeClass("l-btn-focus");
            }).bind("click.linkbutton", function () {
                if (!_8f.disabled) {
                    if (_8f.toggle) {
                        if (_8f.selected) {
                            $(this).linkbutton("unselect");
                        } else {
                            $(this).linkbutton("select");
                        }
                    }
                    _8f.onClick.call(this);
                }
            });
            _91(_8e, _8f.selected);
            _92(_8e, _8f.disabled);
        };
        function _91(_93, _94) {
            var _95 = $.data(_93, "linkbutton").options;
            if (_94) {
                if (_95.group) {
                    $("a.l-btn[group=\"" + _95.group + "\"]").each(function () {
                        var o = $(this).linkbutton("options");
                        if (o.toggle) {
                            $(this).removeClass("l-btn-selected l-btn-plain-selected");
                            o.selected = false;
                        }
                    });
                }
                $(_93).addClass(_95.plain ? "l-btn-selected l-btn-plain-selected" : "l-btn-selected");
                _95.selected = true;
            } else {
                if (!_95.group) {
                    $(_93).removeClass("l-btn-selected l-btn-plain-selected");
                    _95.selected = false;
                }
            }
        };
        function _92(_96, _97) {
            var _98 = $.data(_96, "linkbutton");
            var _99 = _98.options;
            $(_96).removeClass("l-btn-disabled l-btn-plain-disabled");
            if (_97) {
                _99.disabled = true;
                var _9a = $(_96).attr("href");
                if (_9a) {
                    _98.href = _9a;
                    $(_96).attr("href", "javascript:void(0)");
                }
                if (_96.onclick) {
                    _98.onclick = _96.onclick;
                    _96.onclick = null;
                }
                _99.plain ? $(_96).addClass("l-btn-disabled l-btn-plain-disabled") : $(_96).addClass("l-btn-disabled");
            } else {
                _99.disabled = false;
                if (_98.href) {
                    $(_96).attr("href", _98.href);
                }
                if (_98.onclick) {
                    _96.onclick = _98.onclick;
                }
            }
        };
        $.fn.linkbutton = function (_9b, _9c) {
            if (typeof _9b == "string") {
                return $.fn.linkbutton.methods[_9b](this, _9c);
            }
            _9b = _9b || {};
            return this.each(function () {
                var _9d = $.data(this, "linkbutton");
                if (_9d) {
                    $.extend(_9d.options, _9b);
                } else {
                    $.data(this, "linkbutton", {options: $.extend({}, $.fn.linkbutton.defaults, $.fn.linkbutton.parseOptions(this), _9b)});
                    $(this).removeAttr("disabled");
                    $(this).bind("_resize", function (e, _9e) {
                        if ($(this).hasClass("easyui-fluid") || _9e) {
                            _84(this);
                        }
                        return false;
                    });
                }
                _8d(this);
                _84(this);
            });
        };
        $.fn.linkbutton.methods = {
            options: function (jq) {
                return $.data(jq[0], "linkbutton").options;
            }, resize: function (jq, _9f) {
                return jq.each(function () {
                    _84(this, _9f);
                });
            }, enable: function (jq) {
                return jq.each(function () {
                    _92(this, false);
                });
            }, disable: function (jq) {
                return jq.each(function () {
                    _92(this, true);
                });
            }, select: function (jq) {
                return jq.each(function () {
                    _91(this, true);
                });
            }, unselect: function (jq) {
                return jq.each(function () {
                    _91(this, false);
                });
            }
        };
        $.fn.linkbutton.parseOptions = function (_a0) {
            var t = $(_a0);
            return $.extend({}, $.parser.parseOptions(_a0, ["id", "iconCls", "iconAlign", "group", "size", {
                plain: "boolean",
                toggle: "boolean",
                selected: "boolean",
                outline: "boolean"
            }]), {
                disabled: (t.attr("disabled") ? true : undefined),
                text: $.trim(t.html()),
                iconCls: (t.attr("icon") || t.attr("iconCls"))
            });
        };
        $.fn.linkbutton.defaults = {
            id: null,
            disabled: false,
            toggle: false,
            selected: false,
            outline: false,
            group: null,
            plain: false,
            text: "",
            iconCls: null,
            iconAlign: "left",
            size: "small",
            onClick: function () {
            }
        };
    })(jQuery);
    (function ($) {
        function _a1(_a2) {
            var _a3 = $.data(_a2, "pagination");
            var _a4 = _a3.options;
            var bb = _a3.bb = {};
            var _a5 = $(_a2).addClass("pagination").html("<table cellspacing=\"0\" cellpadding=\"0\" border=\"0\"><tr></tr></table>");
            var tr = _a5.find("tr");
            var aa = $.extend([], _a4.layout);
            if (!_a4.showPageList) {
                _a6(aa, "list");
            }
            if (!_a4.showRefresh) {
                _a6(aa, "refresh");
            }
            if (aa[0] == "sep") {
                aa.shift();
            }
            if (aa[aa.length - 1] == "sep") {
                aa.pop();
            }
            for (var _a7 = 0; _a7 < aa.length; _a7++) {
                var _a8 = aa[_a7];
                if (_a8 == "list") {
                    var ps = $("<select class=\"pagination-page-list\"></select>");
                    ps.bind("change", function () {
                        _a4.pageSize = parseInt($(this).val());
                        _a4.onChangePageSize.call(_a2, _a4.pageSize);
                        _ae(_a2, _a4.pageNumber);
                    });
                    for (var i = 0; i < _a4.pageList.length; i++) {
                        $("<option></option>").text(_a4.pageList[i]).appendTo(ps);
                    }
                    $("<td></td>").append(ps).appendTo(tr);
                } else {
                    if (_a8 == "sep") {
                        $("<td><div class=\"pagination-btn-separator\"></div></td>").appendTo(tr);
                    } else {
                        if (_a8 == "first") {
                            bb.first = _a9("first");
                        } else {
                            if (_a8 == "prev") {
                                bb.prev = _a9("prev");
                            } else {
                                if (_a8 == "next") {
                                    bb.next = _a9("next");
                                } else {
                                    if (_a8 == "last") {
                                        bb.last = _a9("last");
                                    } else {
                                        if (_a8 == "manual") {
                                            $("<span style=\"padding-left:6px;\"></span>").html(_a4.beforePageText).appendTo(tr).wrap("<td></td>");
                                            bb.num = $("<input class=\"pagination-num\" type=\"text\" value=\"1\" size=\"2\">").appendTo(tr).wrap("<td></td>");
                                            bb.num.unbind(".pagination").bind("keydown.pagination", function (e) {
                                                if (e.keyCode == 13) {
                                                    var _aa = parseInt($(this).val()) || 1;
                                                    _ae(_a2, _aa);
                                                    return false;
                                                }
                                            });
                                            bb.after = $("<span style=\"padding-right:6px;\"></span>").appendTo(tr).wrap("<td></td>");
                                        } else {
                                            if (_a8 == "refresh") {
                                                bb.refresh = _a9("refresh");
                                            } else {
                                                if (_a8 == "links") {
                                                    $("<td class=\"pagination-links\"></td>").appendTo(tr);
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            if (_a4.buttons) {
                $("<td><div class=\"pagination-btn-separator\"></div></td>").appendTo(tr);
                if ($.isArray(_a4.buttons)) {
                    for (var i = 0; i < _a4.buttons.length; i++) {
                        var btn = _a4.buttons[i];
                        if (btn == "-") {
                            $("<td><div class=\"pagination-btn-separator\"></div></td>").appendTo(tr);
                        } else {
                            var td = $("<td></td>").appendTo(tr);
                            var a = $("<a href=\"javascript:void(0)\"></a>").appendTo(td);
                            a[0].onclick = eval(btn.handler || function () {
                                });
                            a.linkbutton($.extend({}, btn, {plain: true}));
                        }
                    }
                } else {
                    var td = $("<td></td>").appendTo(tr);
                    $(_a4.buttons).appendTo(td).show();
                }
            }
            $("<div class=\"pagination-info\"></div>").appendTo(_a5);
            $("<div style=\"clear:both;\"></div>").appendTo(_a5);
            function _a9(_ab) {
                var btn = _a4.nav[_ab];
                var a = $("<a href=\"javascript:void(0)\"></a>").appendTo(tr);
                a.wrap("<td></td>");
                a.linkbutton({
                    iconCls: btn.iconCls,
                    plain: true
                }).unbind(".pagination").bind("click.pagination", function () {
                    btn.handler.call(_a2);
                });
                return a;
            };
            function _a6(aa, _ac) {
                var _ad = $.inArray(_ac, aa);
                if (_ad >= 0) {
                    aa.splice(_ad, 1);
                }
                return aa;
            };
        };
        function _ae(_af, _b0) {
            var _b1 = $.data(_af, "pagination").options;
            _b2(_af, {pageNumber: _b0});
            _b1.onSelectPage.call(_af, _b1.pageNumber, _b1.pageSize);
        };
        function _b2(_b3, _b4) {
            var _b5 = $.data(_b3, "pagination");
            var _b6 = _b5.options;
            var bb = _b5.bb;
            $.extend(_b6, _b4 || {});
            var ps = $(_b3).find("select.pagination-page-list");
            if (ps.length) {
                ps.val(_b6.pageSize + "");
                _b6.pageSize = parseInt(ps.val());
            }
            var _b7 = Math.ceil(_b6.total / _b6.pageSize) || 1;
            if (_b6.pageNumber < 1) {
                _b6.pageNumber = 1;
            }
            if (_b6.pageNumber > _b7) {
                _b6.pageNumber = _b7;
            }
            if (_b6.total == 0) {
                _b6.pageNumber = 0;
                _b7 = 0;
            }
            if (bb.num) {
                bb.num.val(_b6.pageNumber);
            }
            if (bb.after) {
                bb.after.html(_b6.afterPageText.replace(/{pages}/, _b7));
            }
            var td = $(_b3).find("td.pagination-links");
            if (td.length) {
                td.empty();
                var _b8 = _b6.pageNumber - Math.floor(_b6.links / 2);
                if (_b8 < 1) {
                    _b8 = 1;
                }
                var _b9 = _b8 + _b6.links - 1;
                if (_b9 > _b7) {
                    _b9 = _b7;
                }
                _b8 = _b9 - _b6.links + 1;
                if (_b8 < 1) {
                    _b8 = 1;
                }
                for (var i = _b8; i <= _b9; i++) {
                    var a = $("<a class=\"pagination-link\" href=\"javascript:void(0)\"></a>").appendTo(td);
                    a.linkbutton({plain: true, text: i});
                    if (i == _b6.pageNumber) {
                        a.linkbutton("select");
                    } else {
                        a.unbind(".pagination").bind("click.pagination", {pageNumber: i}, function (e) {
                            _ae(_b3, e.data.pageNumber);
                        });
                    }
                }
            }
            var _ba = _b6.displayMsg;
            _ba = _ba.replace(/{from}/, _b6.total == 0 ? 0 : _b6.pageSize * (_b6.pageNumber - 1) + 1);
            _ba = _ba.replace(/{to}/, Math.min(_b6.pageSize * (_b6.pageNumber), _b6.total));
            _ba = _ba.replace(/{total}/, _b6.total);
            $(_b3).find("div.pagination-info").html(_ba);
            if (bb.first) {
                bb.first.linkbutton({disabled: ((!_b6.total) || _b6.pageNumber == 1)});
            }
            if (bb.prev) {
                bb.prev.linkbutton({disabled: ((!_b6.total) || _b6.pageNumber == 1)});
            }
            if (bb.next) {
                bb.next.linkbutton({disabled: (_b6.pageNumber == _b7)});
            }
            if (bb.last) {
                bb.last.linkbutton({disabled: (_b6.pageNumber == _b7)});
            }
            _bb(_b3, _b6.loading);
        };
        function _bb(_bc, _bd) {
            var _be = $.data(_bc, "pagination");
            var _bf = _be.options;
            _bf.loading = _bd;
            if (_bf.showRefresh && _be.bb.refresh) {
                _be.bb.refresh.linkbutton({iconCls: (_bf.loading ? "pagination-loading" : "pagination-load")});
            }
        };
        $.fn.pagination = function (_c0, _c1) {
            if (typeof _c0 == "string") {
                return $.fn.pagination.methods[_c0](this, _c1);
            }
            _c0 = _c0 || {};
            return this.each(function () {
                var _c2;
                var _c3 = $.data(this, "pagination");
                if (_c3) {
                    _c2 = $.extend(_c3.options, _c0);
                } else {
                    _c2 = $.extend({}, $.fn.pagination.defaults, $.fn.pagination.parseOptions(this), _c0);
                    $.data(this, "pagination", {options: _c2});
                }
                _a1(this);
                _b2(this);
            });
        };
        $.fn.pagination.methods = {
            options: function (jq) {
                return $.data(jq[0], "pagination").options;
            }, loading: function (jq) {
                return jq.each(function () {
                    _bb(this, true);
                });
            }, loaded: function (jq) {
                return jq.each(function () {
                    _bb(this, false);
                });
            }, refresh: function (jq, _c4) {
                return jq.each(function () {
                    _b2(this, _c4);
                });
            }, select: function (jq, _c5) {
                return jq.each(function () {
                    _ae(this, _c5);
                });
            }
        };
        $.fn.pagination.parseOptions = function (_c6) {
            var t = $(_c6);
            return $.extend({}, $.parser.parseOptions(_c6, [{
                total: "number",
                pageSize: "number",
                pageNumber: "number",
                links: "number"
            }, {
                loading: "boolean",
                showPageList: "boolean",
                showRefresh: "boolean"
            }]), {pageList: (t.attr("pageList") ? eval(t.attr("pageList")) : undefined)});
        };
        $.fn.pagination.defaults = {
            total: 1,
            pageSize: 10,
            pageNumber: 1,
            pageList: [10, 20, 30, 50],
            loading: false,
            buttons: null,
            showPageList: true,
            showRefresh: true,
            links: 10,
            layout: ["list", "sep", "first", "prev", "sep", "manual", "sep", "next", "last", "sep", "refresh"],
            onSelectPage: function (_c7, _c8) {
            },
            onBeforeRefresh: function (_c9, _ca) {
            },
            onRefresh: function (_cb, _cc) {
            },
            onChangePageSize: function (_cd) {
            },
            beforePageText: "Page",
            afterPageText: "of {pages}",
            displayMsg: "Displaying {from} to {to} of {total} items",
            nav: {
                first: {
                    iconCls: "pagination-first", handler: function () {
                        var _ce = $(this).pagination("options");
                        if (_ce.pageNumber > 1) {
                            $(this).pagination("select", 1);
                        }
                    }
                }, prev: {
                    iconCls: "pagination-prev", handler: function () {
                        var _cf = $(this).pagination("options");
                        if (_cf.pageNumber > 1) {
                            $(this).pagination("select", _cf.pageNumber - 1);
                        }
                    }
                }, next: {
                    iconCls: "pagination-next", handler: function () {
                        var _d0 = $(this).pagination("options");
                        var _d1 = Math.ceil(_d0.total / _d0.pageSize);
                        if (_d0.pageNumber < _d1) {
                            $(this).pagination("select", _d0.pageNumber + 1);
                        }
                    }
                }, last: {
                    iconCls: "pagination-last", handler: function () {
                        var _d2 = $(this).pagination("options");
                        var _d3 = Math.ceil(_d2.total / _d2.pageSize);
                        if (_d2.pageNumber < _d3) {
                            $(this).pagination("select", _d3);
                        }
                    }
                }, refresh: {
                    iconCls: "pagination-refresh", handler: function () {
                        var _d4 = $(this).pagination("options");
                        if (_d4.onBeforeRefresh.call(this, _d4.pageNumber, _d4.pageSize) != false) {
                            $(this).pagination("select", _d4.pageNumber);
                            _d4.onRefresh.call(this, _d4.pageNumber, _d4.pageSize);
                        }
                    }
                }
            }
        };
    })(jQuery);
    (function ($) {
        function _d5(_d6) {
            var _d7 = $(_d6);
            _d7.addClass("tree");
            return _d7;
        };
        function _d8(_d9) {
            var _da = $.data(_d9, "tree").options;
            $(_d9).unbind().bind("mouseover", function (e) {
                var tt = $(e.target);
                var _db = tt.closest("div.tree-node");
                if (!_db.length) {
                    return;
                }
                _db.addClass("tree-node-hover");
                if (tt.hasClass("tree-hit")) {
                    if (tt.hasClass("tree-expanded")) {
                        tt.addClass("tree-expanded-hover");
                    } else {
                        tt.addClass("tree-collapsed-hover");
                    }
                }
                e.stopPropagation();
            }).bind("mouseout", function (e) {
                var tt = $(e.target);
                var _dc = tt.closest("div.tree-node");
                if (!_dc.length) {
                    return;
                }
                _dc.removeClass("tree-node-hover");
                if (tt.hasClass("tree-hit")) {
                    if (tt.hasClass("tree-expanded")) {
                        tt.removeClass("tree-expanded-hover");
                    } else {
                        tt.removeClass("tree-collapsed-hover");
                    }
                }
                e.stopPropagation();
            }).bind("click", function (e) {
                var tt = $(e.target);
                var _dd = tt.closest("div.tree-node");
                if (!_dd.length) {
                    return;
                }
                if (tt.hasClass("tree-hit")) {
                    _144(_d9, _dd[0]);
                    return false;
                } else {
                    if (tt.hasClass("tree-checkbox")) {
                        _104(_d9, _dd[0]);
                        return false;
                    } else {
                        _18a(_d9, _dd[0]);
                        _da.onClick.call(_d9, _e0(_d9, _dd[0]));
                    }
                }
                e.stopPropagation();
            }).bind("dblclick", function (e) {
                var _de = $(e.target).closest("div.tree-node");
                if (!_de.length) {
                    return;
                }
                _18a(_d9, _de[0]);
                _da.onDblClick.call(_d9, _e0(_d9, _de[0]));
                e.stopPropagation();
            }).bind("contextmenu", function (e) {
                var _df = $(e.target).closest("div.tree-node");
                if (!_df.length) {
                    return;
                }
                _da.onContextMenu.call(_d9, e, _e0(_d9, _df[0]));
                e.stopPropagation();
            });
        };
        function _e1(_e2) {
            var _e3 = $.data(_e2, "tree").options;
            _e3.dnd = false;
            var _e4 = $(_e2).find("div.tree-node");
            _e4.draggable("disable");
            _e4.css("cursor", "pointer");
        };
        function _e5(_e6) {
            var _e7 = $.data(_e6, "tree");
            var _e8 = _e7.options;
            var _e9 = _e7.tree;
            _e7.disabledNodes = [];
            _e8.dnd = true;
            _e9.find("div.tree-node").draggable({
                disabled: false, revert: true, cursor: "pointer", proxy: function (_ea) {
                    var p = $("<div class=\"tree-node-proxy\"></div>").appendTo("body");
                    p.html("<span class=\"tree-dnd-icon tree-dnd-no\">&nbsp;</span>" + $(_ea).find(".tree-title").html());
                    p.hide();
                    return p;
                }, deltaX: 15, deltaY: 15, onBeforeDrag: function (e) {
                    if (_e8.onBeforeDrag.call(_e6, _e0(_e6, this)) == false) {
                        return false;
                    }
                    if ($(e.target).hasClass("tree-hit") || $(e.target).hasClass("tree-checkbox")) {
                        return false;
                    }
                    if (e.which != 1) {
                        return false;
                    }
                    $(this).next("ul").find("div.tree-node").droppable({accept: "no-accept"});
                    var _eb = $(this).find("span.tree-indent");
                    if (_eb.length) {
                        e.data.offsetWidth -= _eb.length * _eb.width();
                    }
                }, onStartDrag: function () {
                    $(this).draggable("proxy").css({left: -10000, top: -10000});
                    _e8.onStartDrag.call(_e6, _e0(_e6, this));
                    var _ec = _e0(_e6, this);
                    if (_ec.id == undefined) {
                        _ec.id = "easyui_tree_node_id_temp";
                        _127(_e6, _ec);
                    }
                    _e7.draggingNodeId = _ec.id;
                }, onDrag: function (e) {
                    var x1 = e.pageX, y1 = e.pageY, x2 = e.data.startX, y2 = e.data.startY;
                    var d = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
                    if (d > 3) {
                        $(this).draggable("proxy").show();
                    }
                    this.pageY = e.pageY;
                }, onStopDrag: function () {
                    $(this).next("ul").find("div.tree-node").droppable({accept: "div.tree-node"});
                    for (var i = 0; i < _e7.disabledNodes.length; i++) {
                        $(_e7.disabledNodes[i]).droppable("enable");
                    }
                    _e7.disabledNodes = [];
                    var _ed = _182(_e6, _e7.draggingNodeId);
                    if (_ed && _ed.id == "easyui_tree_node_id_temp") {
                        _ed.id = "";
                        _127(_e6, _ed);
                    }
                    _e8.onStopDrag.call(_e6, _ed);
                }
            }).droppable({
                accept: "div.tree-node", onDragEnter: function (e, _ee) {
                    if (_e8.onDragEnter.call(_e6, this, _ef(_ee)) == false) {
                        _f0(_ee, false);
                        $(this).removeClass("tree-node-append tree-node-top tree-node-bottom");
                        $(this).droppable("disable");
                        _e7.disabledNodes.push(this);
                    }
                }, onDragOver: function (e, _f1) {
                    if ($(this).droppable("options").disabled) {
                        return;
                    }
                    var _f2 = _f1.pageY;
                    var top = $(this).offset().top;
                    var _f3 = top + $(this).outerHeight();
                    _f0(_f1, true);
                    $(this).removeClass("tree-node-append tree-node-top tree-node-bottom");
                    if (_f2 > top + (_f3 - top) / 2) {
                        if (_f3 - _f2 < 5) {
                            $(this).addClass("tree-node-bottom");
                        } else {
                            $(this).addClass("tree-node-append");
                        }
                    } else {
                        if (_f2 - top < 5) {
                            $(this).addClass("tree-node-top");
                        } else {
                            $(this).addClass("tree-node-append");
                        }
                    }
                    if (_e8.onDragOver.call(_e6, this, _ef(_f1)) == false) {
                        _f0(_f1, false);
                        $(this).removeClass("tree-node-append tree-node-top tree-node-bottom");
                        $(this).droppable("disable");
                        _e7.disabledNodes.push(this);
                    }
                }, onDragLeave: function (e, _f4) {
                    _f0(_f4, false);
                    $(this).removeClass("tree-node-append tree-node-top tree-node-bottom");
                    _e8.onDragLeave.call(_e6, this, _ef(_f4));
                }, onDrop: function (e, _f5) {
                    var _f6 = this;
                    var _f7, _f8;
                    if ($(this).hasClass("tree-node-append")) {
                        _f7 = _f9;
                        _f8 = "append";
                    } else {
                        _f7 = _fa;
                        _f8 = $(this).hasClass("tree-node-top") ? "top" : "bottom";
                    }
                    if (_e8.onBeforeDrop.call(_e6, _f6, _ef(_f5), _f8) == false) {
                        $(this).removeClass("tree-node-append tree-node-top tree-node-bottom");
                        return;
                    }
                    _f7(_f5, _f6, _f8);
                    $(this).removeClass("tree-node-append tree-node-top tree-node-bottom");
                }
            });
            function _ef(_fb, pop) {
                return $(_fb).closest("ul.tree").tree(pop ? "pop" : "getData", _fb);
            };
            function _f0(_fc, _fd) {
                var _fe = $(_fc).draggable("proxy").find("span.tree-dnd-icon");
                _fe.removeClass("tree-dnd-yes tree-dnd-no").addClass(_fd ? "tree-dnd-yes" : "tree-dnd-no");
            };
            function _f9(_ff, dest) {
                if (_e0(_e6, dest).state == "closed") {
                    _13c(_e6, dest, function () {
                        _100();
                    });
                } else {
                    _100();
                }
                function _100() {
                    var node = _ef(_ff, true);
                    $(_e6).tree("append", {parent: dest, data: [node]});
                    _e8.onDrop.call(_e6, dest, node, "append");
                };
            };
            function _fa(_101, dest, _102) {
                var _103 = {};
                if (_102 == "top") {
                    _103.before = dest;
                } else {
                    _103.after = dest;
                }
                var node = _ef(_101, true);
                _103.data = node;
                $(_e6).tree("insert", _103);
                _e8.onDrop.call(_e6, dest, node, _102);
            };
        };
        function _104(_105, _106, _107) {
            var _108 = $.data(_105, "tree");
            var opts = _108.options;
            if (!opts.checkbox) {
                return;
            }
            var _109 = _e0(_105, _106);
            if (_107 == undefined) {
                var ck = $(_106).find(".tree-checkbox");
                if (ck.hasClass("tree-checkbox1")) {
                    _107 = false;
                } else {
                    if (ck.hasClass("tree-checkbox0")) {
                        _107 = true;
                    } else {
                        if (_109._checked == undefined) {
                            _109._checked = $(_106).find(".tree-checkbox").hasClass("tree-checkbox1");
                        }
                        _107 = !_109._checked;
                    }
                }
            }
            _109._checked = _107;
            if (opts.onBeforeCheck.call(_105, _109, _107) == false) {
                return;
            }
            if (opts.cascadeCheck) {
                _10a(_109, _107);
                _10b(_109, _107);
            } else {
                _10c($(_109.target), _107 ? "1" : "0");
            }
            opts.onCheck.call(_105, _109, _107);
            function _10c(node, flag) {
                var ck = node.find(".tree-checkbox");
                ck.removeClass("tree-checkbox0 tree-checkbox1 tree-checkbox2");
                ck.addClass("tree-checkbox" + flag);
            };
            function _10a(_10d, _10e) {
                if (opts.deepCheck) {
                    var node = $("#" + _10d.domId);
                    var flag = _10e ? "1" : "0";
                    _10c(node, flag);
                    _10c(node.next(), flag);
                } else {
                    _10f(_10d, _10e);
                    _12a(_10d.children || [], function (n) {
                        _10f(n, _10e);
                    });
                }
            };
            function _10f(_110, _111) {
                if (_110.hidden) {
                    return;
                }
                var cls = "tree-checkbox" + (_111 ? "1" : "0");
                var node = $("#" + _110.domId);
                _10c(node, _111 ? "1" : "0");
                if (_110.children) {
                    for (var i = 0; i < _110.children.length; i++) {
                        if (_110.children[i].hidden) {
                            if (!$("#" + _110.children[i].domId).find("." + cls).length) {
                                _10c(node, "2");
                                var _112 = _14f(_105, node[0]);
                                while (_112) {
                                    _10c($(_112.target), "2");
                                    _112 = _14f(_105, _112[0]);
                                }
                                return;
                            }
                        }
                    }
                }
            };
            function _10b(_113, _114) {
                var node = $("#" + _113.domId);
                var _115 = _14f(_105, node[0]);
                if (_115) {
                    var flag = "";
                    if (_116(node, true)) {
                        flag = "1";
                    } else {
                        if (_116(node, false)) {
                            flag = "0";
                        } else {
                            flag = "2";
                        }
                    }
                    _10c($(_115.target), flag);
                    _10b(_115, _114);
                }
            };
            function _116(node, _117) {
                var cls = "tree-checkbox" + (_117 ? "1" : "0");
                var ck = node.find(".tree-checkbox");
                if (!ck.hasClass(cls)) {
                    return false;
                }
                var b = true;
                node.parent().siblings().each(function () {
                    var ck = $(this).children("div.tree-node").children(".tree-checkbox");
                    if (ck.length && !ck.hasClass(cls)) {
                        b = false;
                        return false;
                    }
                });
                return b;
            };
        };
        function _118(_119, _11a) {
            var opts = $.data(_119, "tree").options;
            if (!opts.checkbox) {
                return;
            }
            var node = $(_11a);
            if (_11b(_119, _11a)) {
                var ck = node.find(".tree-checkbox");
                if (ck.length) {
                    if (ck.hasClass("tree-checkbox1")) {
                        _104(_119, _11a, true);
                    } else {
                        _104(_119, _11a, false);
                    }
                } else {
                    if (opts.onlyLeafCheck) {
                        $("<span class=\"tree-checkbox tree-checkbox0\"></span>").insertBefore(node.find(".tree-title"));
                    }
                }
            } else {
                var ck = node.find(".tree-checkbox");
                if (opts.onlyLeafCheck) {
                    ck.remove();
                } else {
                    if (ck.hasClass("tree-checkbox1")) {
                        _104(_119, _11a, true);
                    } else {
                        if (ck.hasClass("tree-checkbox2")) {
                            var _11c = true;
                            var _11d = true;
                            var _11e = _11f(_119, _11a);
                            for (var i = 0; i < _11e.length; i++) {
                                if (_11e[i].checked) {
                                    _11d = false;
                                } else {
                                    _11c = false;
                                }
                            }
                            if (_11c) {
                                _104(_119, _11a, true);
                            }
                            if (_11d) {
                                _104(_119, _11a, false);
                            }
                        }
                    }
                }
            }
        };
        function _120(_121, ul, data, _122) {
            var _123 = $.data(_121, "tree");
            var opts = _123.options;
            var _124 = $(ul).prevAll("div.tree-node:first");
            data = opts.loadFilter.call(_121, data, _124[0]);
            var _125 = _126(_121, "domId", _124.attr("id"));
            if (!_122) {
                _125 ? _125.children = data : _123.data = data;
                $(ul).empty();
            } else {
                if (_125) {
                    _125.children ? _125.children = _125.children.concat(data) : _125.children = data;
                } else {
                    _123.data = _123.data.concat(data);
                }
            }
            opts.view.render.call(opts.view, _121, ul, data);
            if (opts.dnd) {
                _e5(_121);
            }
            if (_125) {
                _127(_121, _125);
            }
            var _128 = [];
            var _129 = [];
            for (var i = 0; i < data.length; i++) {
                var node = data[i];
                if (!node.checked) {
                    _128.push(node);
                }
            }
            _12a(data, function (node) {
                if (node.checked) {
                    _129.push(node);
                }
            });
            var _12b = opts.onCheck;
            opts.onCheck = function () {
            };
            if (_128.length) {
                _104(_121, $("#" + _128[0].domId)[0], false);
            }
            for (var i = 0; i < _129.length; i++) {
                _104(_121, $("#" + _129[i].domId)[0], true);
            }
            opts.onCheck = _12b;
            setTimeout(function () {
                _12c(_121, _121);
            }, 0);
            opts.onLoadSuccess.call(_121, _125, data);
        };
        function _12c(_12d, ul, _12e) {
            var opts = $.data(_12d, "tree").options;
            if (opts.lines) {
                $(_12d).addClass("tree-lines");
            } else {
                $(_12d).removeClass("tree-lines");
                return;
            }
            if (!_12e) {
                _12e = true;
                $(_12d).find("span.tree-indent").removeClass("tree-line tree-join tree-joinbottom");
                $(_12d).find("div.tree-node").removeClass("tree-node-last tree-root-first tree-root-one");
                var _12f = $(_12d).tree("getRoots");
                if (_12f.length > 1) {
                    $(_12f[0].target).addClass("tree-root-first");
                } else {
                    if (_12f.length == 1) {
                        $(_12f[0].target).addClass("tree-root-one");
                    }
                }
            }
            $(ul).children("li").each(function () {
                var node = $(this).children("div.tree-node");
                var ul = node.next("ul");
                if (ul.length) {
                    if ($(this).next().length) {
                        _130(node);
                    }
                    _12c(_12d, ul, _12e);
                } else {
                    _131(node);
                }
            });
            var _132 = $(ul).children("li:last").children("div.tree-node").addClass("tree-node-last");
            _132.children("span.tree-join").removeClass("tree-join").addClass("tree-joinbottom");
            function _131(node, _133) {
                var icon = node.find("span.tree-icon");
                icon.prev("span.tree-indent").addClass("tree-join");
            };
            function _130(node) {
                var _134 = node.find("span.tree-indent, span.tree-hit").length;
                node.next().find("div.tree-node").each(function () {
                    $(this).children("span:eq(" + (_134 - 1) + ")").addClass("tree-line");
                });
            };
        };
        function _135(_136, ul, _137, _138) {
            var opts = $.data(_136, "tree").options;
            _137 = $.extend({}, opts.queryParams, _137 || {});
            var _139 = null;
            if (_136 != ul) {
                var node = $(ul).prev();
                _139 = _e0(_136, node[0]);
            }
            if (opts.onBeforeLoad.call(_136, _139, _137) == false) {
                return;
            }
            var _13a = $(ul).prev().children("span.tree-folder");
            _13a.addClass("tree-loading");
            var _13b = opts.loader.call(_136, _137, function (data) {
                _13a.removeClass("tree-loading");
                _120(_136, ul, data);
                if (_138) {
                    _138();
                }
            }, function () {
                _13a.removeClass("tree-loading");
                opts.onLoadError.apply(_136, arguments);
                if (_138) {
                    _138();
                }
            });
            if (_13b == false) {
                _13a.removeClass("tree-loading");
            }
        };
        function _13c(_13d, _13e, _13f) {
            var opts = $.data(_13d, "tree").options;
            var hit = $(_13e).children("span.tree-hit");
            if (hit.length == 0) {
                return;
            }
            if (hit.hasClass("tree-expanded")) {
                return;
            }
            var node = _e0(_13d, _13e);
            if (opts.onBeforeExpand.call(_13d, node) == false) {
                return;
            }
            hit.removeClass("tree-collapsed tree-collapsed-hover").addClass("tree-expanded");
            hit.next().addClass("tree-folder-open");
            var ul = $(_13e).next();
            if (ul.length) {
                if (opts.animate) {
                    ul.slideDown("normal", function () {
                        node.state = "open";
                        opts.onExpand.call(_13d, node);
                        if (_13f) {
                            _13f();
                        }
                    });
                } else {
                    ul.css("display", "block");
                    node.state = "open";
                    opts.onExpand.call(_13d, node);
                    if (_13f) {
                        _13f();
                    }
                }
            } else {
                var _140 = $("<ul style=\"display:none\"></ul>").insertAfter(_13e);
                _135(_13d, _140[0], {id: node.id}, function () {
                    if (_140.is(":empty")) {
                        _140.remove();
                    }
                    if (opts.animate) {
                        _140.slideDown("normal", function () {
                            node.state = "open";
                            opts.onExpand.call(_13d, node);
                            if (_13f) {
                                _13f();
                            }
                        });
                    } else {
                        _140.css("display", "block");
                        node.state = "open";
                        opts.onExpand.call(_13d, node);
                        if (_13f) {
                            _13f();
                        }
                    }
                });
            }
        };
        function _141(_142, _143) {
            var opts = $.data(_142, "tree").options;
            var hit = $(_143).children("span.tree-hit");
            if (hit.length == 0) {
                return;
            }
            if (hit.hasClass("tree-collapsed")) {
                return;
            }
            var node = _e0(_142, _143);
            if (opts.onBeforeCollapse.call(_142, node) == false) {
                return;
            }
            hit.removeClass("tree-expanded tree-expanded-hover").addClass("tree-collapsed");
            hit.next().removeClass("tree-folder-open");
            var ul = $(_143).next();
            if (opts.animate) {
                ul.slideUp("normal", function () {
                    node.state = "closed";
                    opts.onCollapse.call(_142, node);
                });
            } else {
                ul.css("display", "none");
                node.state = "closed";
                opts.onCollapse.call(_142, node);
            }
        };
        function _144(_145, _146) {
            var hit = $(_146).children("span.tree-hit");
            if (hit.length == 0) {
                return;
            }
            if (hit.hasClass("tree-expanded")) {
                _141(_145, _146);
            } else {
                _13c(_145, _146);
            }
        };
        function _147(_148, _149) {
            var _14a = _11f(_148, _149);
            if (_149) {
                _14a.unshift(_e0(_148, _149));
            }
            for (var i = 0; i < _14a.length; i++) {
                _13c(_148, _14a[i].target);
            }
        };
        function _14b(_14c, _14d) {
            var _14e = [];
            var p = _14f(_14c, _14d);
            while (p) {
                _14e.unshift(p);
                p = _14f(_14c, p.target);
            }
            for (var i = 0; i < _14e.length; i++) {
                _13c(_14c, _14e[i].target);
            }
        };
        function _150(_151, _152) {
            var c = $(_151).parent();
            while (c[0].tagName != "BODY" && c.css("overflow-y") != "auto") {
                c = c.parent();
            }
            var n = $(_152);
            var ntop = n.offset().top;
            if (c[0].tagName != "BODY") {
                var ctop = c.offset().top;
                if (ntop < ctop) {
                    c.scrollTop(c.scrollTop() + ntop - ctop);
                } else {
                    if (ntop + n.outerHeight() > ctop + c.outerHeight() - 18) {
                        c.scrollTop(c.scrollTop() + ntop + n.outerHeight() - ctop - c.outerHeight() + 18);
                    }
                }
            } else {
                c.scrollTop(ntop);
            }
        };
        function _153(_154, _155) {
            var _156 = _11f(_154, _155);
            if (_155) {
                _156.unshift(_e0(_154, _155));
            }
            for (var i = 0; i < _156.length; i++) {
                _141(_154, _156[i].target);
            }
        };
        function _157(_158, _159) {
            var node = $(_159.parent);
            var data = _159.data;
            if (!data) {
                return;
            }
            data = $.isArray(data) ? data : [data];
            if (!data.length) {
                return;
            }
            var ul;
            if (node.length == 0) {
                ul = $(_158);
            } else {
                if (_11b(_158, node[0])) {
                    var _15a = node.find("span.tree-icon");
                    _15a.removeClass("tree-file").addClass("tree-folder tree-folder-open");
                    var hit = $("<span class=\"tree-hit tree-expanded\"></span>").insertBefore(_15a);
                    if (hit.prev().length) {
                        hit.prev().remove();
                    }
                }
                ul = node.next();
                if (!ul.length) {
                    ul = $("<ul></ul>").insertAfter(node);
                }
            }
            _120(_158, ul[0], data, true);
            _118(_158, ul.prev());
        };
        function _15b(_15c, _15d) {
            var ref = _15d.before || _15d.after;
            var _15e = _14f(_15c, ref);
            var data = _15d.data;
            if (!data) {
                return;
            }
            data = $.isArray(data) ? data : [data];
            if (!data.length) {
                return;
            }
            _157(_15c, {parent: (_15e ? _15e.target : null), data: data});
            var _15f = _15e ? _15e.children : $(_15c).tree("getRoots");
            for (var i = 0; i < _15f.length; i++) {
                if (_15f[i].domId == $(ref).attr("id")) {
                    for (var j = data.length - 1; j >= 0; j--) {
                        _15f.splice((_15d.before ? i : (i + 1)), 0, data[j]);
                    }
                    _15f.splice(_15f.length - data.length, data.length);
                    break;
                }
            }
            var li = $();
            for (var i = 0; i < data.length; i++) {
                li = li.add($("#" + data[i].domId).parent());
            }
            if (_15d.before) {
                li.insertBefore($(ref).parent());
            } else {
                li.insertAfter($(ref).parent());
            }
        };
        function _160(_161, _162) {
            var _163 = del(_162);
            $(_162).parent().remove();
            if (_163) {
                if (!_163.children || !_163.children.length) {
                    var node = $(_163.target);
                    node.find(".tree-icon").removeClass("tree-folder").addClass("tree-file");
                    node.find(".tree-hit").remove();
                    $("<span class=\"tree-indent\"></span>").prependTo(node);
                    node.next().remove();
                }
                _127(_161, _163);
                _118(_161, _163.target);
            }
            _12c(_161, _161);
            function del(_164) {
                var id = $(_164).attr("id");
                var _165 = _14f(_161, _164);
                var cc = _165 ? _165.children : $.data(_161, "tree").data;
                for (var i = 0; i < cc.length; i++) {
                    if (cc[i].domId == id) {
                        cc.splice(i, 1);
                        break;
                    }
                }
                return _165;
            };
        };
        function _127(_166, _167) {
            var opts = $.data(_166, "tree").options;
            var node = $(_167.target);
            var data = _e0(_166, _167.target);
            var _168 = data.checked;
            if (data.iconCls) {
                node.find(".tree-icon").removeClass(data.iconCls);
            }
            $.extend(data, _167);
            node.find(".tree-title").html(opts.formatter.call(_166, data));
            if (data.iconCls) {
                node.find(".tree-icon").addClass(data.iconCls);
            }
            if (_168 != data.checked) {
                _104(_166, _167.target, data.checked);
            }
        };
        function _169(_16a, _16b) {
            if (_16b) {
                var p = _14f(_16a, _16b);
                while (p) {
                    _16b = p.target;
                    p = _14f(_16a, _16b);
                }
                return _e0(_16a, _16b);
            } else {
                var _16c = _16d(_16a);
                return _16c.length ? _16c[0] : null;
            }
        };
        function _16d(_16e) {
            var _16f = $.data(_16e, "tree").data;
            for (var i = 0; i < _16f.length; i++) {
                _170(_16f[i]);
            }
            return _16f;
        };
        function _11f(_171, _172) {
            var _173 = [];
            var n = _e0(_171, _172);
            var data = n ? (n.children || []) : $.data(_171, "tree").data;
            _12a(data, function (node) {
                _173.push(_170(node));
            });
            return _173;
        };
        function _14f(_174, _175) {
            var p = $(_175).closest("ul").prevAll("div.tree-node:first");
            return _e0(_174, p[0]);
        };
        function _176(_177, _178) {
            _178 = _178 || "checked";
            if (!$.isArray(_178)) {
                _178 = [_178];
            }
            var _179 = [];
            for (var i = 0; i < _178.length; i++) {
                var s = _178[i];
                if (s == "checked") {
                    _179.push("span.tree-checkbox1");
                } else {
                    if (s == "unchecked") {
                        _179.push("span.tree-checkbox0");
                    } else {
                        if (s == "indeterminate") {
                            _179.push("span.tree-checkbox2");
                        }
                    }
                }
            }
            var _17a = [];
            $(_177).find(_179.join(",")).each(function () {
                var node = $(this).parent();
                _17a.push(_e0(_177, node[0]));
            });
            return _17a;
        };
        function _17b(_17c) {
            var node = $(_17c).find("div.tree-node-selected");
            return node.length ? _e0(_17c, node[0]) : null;
        };
        function _17d(_17e, _17f) {
            var data = _e0(_17e, _17f);
            if (data && data.children) {
                _12a(data.children, function (node) {
                    _170(node);
                });
            }
            return data;
        };
        function _e0(_180, _181) {
            return _126(_180, "domId", $(_181).attr("id"));
        };
        function _182(_183, id) {
            return _126(_183, "id", id);
        };
        function _126(_184, _185, _186) {
            var data = $.data(_184, "tree").data;
            var _187 = null;
            _12a(data, function (node) {
                if (node[_185] == _186) {
                    _187 = _170(node);
                    return false;
                }
            });
            return _187;
        };
        function _170(node) {
            var d = $("#" + node.domId);
            node.target = d[0];
            node.checked = d.find(".tree-checkbox").hasClass("tree-checkbox1");
            return node;
        };
        function _12a(data, _188) {
            var _189 = [];
            for (var i = 0; i < data.length; i++) {
                _189.push(data[i]);
            }
            while (_189.length) {
                var node = _189.shift();
                if (_188(node) == false) {
                    return;
                }
                if (node.children) {
                    for (var i = node.children.length - 1; i >= 0; i--) {
                        _189.unshift(node.children[i]);
                    }
                }
            }
        };
        function _18a(_18b, _18c) {
            var opts = $.data(_18b, "tree").options;
            var node = _e0(_18b, _18c);
            if (opts.onBeforeSelect.call(_18b, node) == false) {
                return;
            }
            $(_18b).find("div.tree-node-selected").removeClass("tree-node-selected");
            $(_18c).addClass("tree-node-selected");
            opts.onSelect.call(_18b, node);
        };
        function _11b(_18d, _18e) {
            return $(_18e).children("span.tree-hit").length == 0;
        };
        function _18f(_190, _191) {
            var opts = $.data(_190, "tree").options;
            var node = _e0(_190, _191);
            if (opts.onBeforeEdit.call(_190, node) == false) {
                return;
            }
            $(_191).css("position", "relative");
            var nt = $(_191).find(".tree-title");
            var _192 = nt.outerWidth();
            nt.empty();
            var _193 = $("<input class=\"tree-editor\">").appendTo(nt);
            _193.val(node.text).focus();
            _193.width(_192 + 20);
            _193.height(document.compatMode == "CSS1Compat" ? (18 - (_193.outerHeight() - _193.height())) : 18);
            _193.bind("click", function (e) {
                return false;
            }).bind("mousedown", function (e) {
                e.stopPropagation();
            }).bind("mousemove", function (e) {
                e.stopPropagation();
            }).bind("keydown", function (e) {
                if (e.keyCode == 13) {
                    _194(_190, _191);
                    return false;
                } else {
                    if (e.keyCode == 27) {
                        _198(_190, _191);
                        return false;
                    }
                }
            }).bind("blur", function (e) {
                e.stopPropagation();
                _194(_190, _191);
            });
        };
        function _194(_195, _196) {
            var opts = $.data(_195, "tree").options;
            $(_196).css("position", "");
            var _197 = $(_196).find("input.tree-editor");
            var val = _197.val();
            _197.remove();
            var node = _e0(_195, _196);
            node.text = val;
            _127(_195, node);
            opts.onAfterEdit.call(_195, node);
        };
        function _198(_199, _19a) {
            var opts = $.data(_199, "tree").options;
            $(_19a).css("position", "");
            $(_19a).find("input.tree-editor").remove();
            var node = _e0(_199, _19a);
            _127(_199, node);
            opts.onCancelEdit.call(_199, node);
        };
        function _19b(_19c, q) {
            var _19d = $.data(_19c, "tree");
            var opts = _19d.options;
            var ids = {};
            _12a(_19d.data, function (node) {
                if (opts.filter.call(_19c, q, node)) {
                    $("#" + node.domId).removeClass("tree-node-hidden");
                    ids[node.domId] = 1;
                    node.hidden = false;
                } else {
                    $("#" + node.domId).addClass("tree-node-hidden");
                    node.hidden = true;
                }
            });
            for (var id in ids) {
                _19e(id);
            }
            function _19e(_19f) {
                var p = $(_19c).tree("getParent", $("#" + _19f)[0]);
                while (p) {
                    $(p.target).removeClass("tree-node-hidden");
                    p.hidden = false;
                    p = $(_19c).tree("getParent", p.target);
                }
            };
        };
        $.fn.tree = function (_1a0, _1a1) {
            if (typeof _1a0 == "string") {
                return $.fn.tree.methods[_1a0](this, _1a1);
            }
            var _1a0 = _1a0 || {};
            return this.each(function () {
                var _1a2 = $.data(this, "tree");
                var opts;
                if (_1a2) {
                    opts = $.extend(_1a2.options, _1a0);
                    _1a2.options = opts;
                } else {
                    opts = $.extend({}, $.fn.tree.defaults, $.fn.tree.parseOptions(this), _1a0);
                    $.data(this, "tree", {options: opts, tree: _d5(this), data: []});
                    var data = $.fn.tree.parseData(this);
                    if (data.length) {
                        _120(this, this, data);
                    }
                }
                _d8(this);
                if (opts.data) {
                    _120(this, this, $.extend(true, [], opts.data));
                }
                _135(this, this);
            });
        };
        $.fn.tree.methods = {
            options: function (jq) {
                return $.data(jq[0], "tree").options;
            }, loadData: function (jq, data) {
                return jq.each(function () {
                    _120(this, this, data);
                });
            }, getNode: function (jq, _1a3) {
                return _e0(jq[0], _1a3);
            }, getData: function (jq, _1a4) {
                return _17d(jq[0], _1a4);
            }, reload: function (jq, _1a5) {
                return jq.each(function () {
                    if (_1a5) {
                        var node = $(_1a5);
                        var hit = node.children("span.tree-hit");
                        hit.removeClass("tree-expanded tree-expanded-hover").addClass("tree-collapsed");
                        node.next().remove();
                        _13c(this, _1a5);
                    } else {
                        $(this).empty();
                        _135(this, this);
                    }
                });
            }, getRoot: function (jq, _1a6) {
                return _169(jq[0], _1a6);
            }, getRoots: function (jq) {
                return _16d(jq[0]);
            }, getParent: function (jq, _1a7) {
                return _14f(jq[0], _1a7);
            }, getChildren: function (jq, _1a8) {
                return _11f(jq[0], _1a8);
            }, getChecked: function (jq, _1a9) {
                return _176(jq[0], _1a9);
            }, getSelected: function (jq) {
                return _17b(jq[0]);
            }, isLeaf: function (jq, _1aa) {
                return _11b(jq[0], _1aa);
            }, find: function (jq, id) {
                return _182(jq[0], id);
            }, select: function (jq, _1ab) {
                return jq.each(function () {
                    _18a(this, _1ab);
                });
            }, check: function (jq, _1ac) {
                return jq.each(function () {
                    _104(this, _1ac, true);
                });
            }, uncheck: function (jq, _1ad) {
                return jq.each(function () {
                    _104(this, _1ad, false);
                });
            }, collapse: function (jq, _1ae) {
                return jq.each(function () {
                    _141(this, _1ae);
                });
            }, expand: function (jq, _1af) {
                return jq.each(function () {
                    _13c(this, _1af);
                });
            }, collapseAll: function (jq, _1b0) {
                return jq.each(function () {
                    _153(this, _1b0);
                });
            }, expandAll: function (jq, _1b1) {
                return jq.each(function () {
                    _147(this, _1b1);
                });
            }, expandTo: function (jq, _1b2) {
                return jq.each(function () {
                    _14b(this, _1b2);
                });
            }, scrollTo: function (jq, _1b3) {
                return jq.each(function () {
                    _150(this, _1b3);
                });
            }, toggle: function (jq, _1b4) {
                return jq.each(function () {
                    _144(this, _1b4);
                });
            }, append: function (jq, _1b5) {
                return jq.each(function () {
                    _157(this, _1b5);
                });
            }, insert: function (jq, _1b6) {
                return jq.each(function () {
                    _15b(this, _1b6);
                });
            }, remove: function (jq, _1b7) {
                return jq.each(function () {
                    _160(this, _1b7);
                });
            }, pop: function (jq, _1b8) {
                var node = jq.tree("getData", _1b8);
                jq.tree("remove", _1b8);
                return node;
            }, update: function (jq, _1b9) {
                return jq.each(function () {
                    _127(this, _1b9);
                });
            }, enableDnd: function (jq) {
                return jq.each(function () {
                    _e5(this);
                });
            }, disableDnd: function (jq) {
                return jq.each(function () {
                    _e1(this);
                });
            }, beginEdit: function (jq, _1ba) {
                return jq.each(function () {
                    _18f(this, _1ba);
                });
            }, endEdit: function (jq, _1bb) {
                return jq.each(function () {
                    _194(this, _1bb);
                });
            }, cancelEdit: function (jq, _1bc) {
                return jq.each(function () {
                    _198(this, _1bc);
                });
            }, doFilter: function (jq, q) {
                return jq.each(function () {
                    _19b(this, q);
                });
            }
        };
        $.fn.tree.parseOptions = function (_1bd) {
            var t = $(_1bd);
            return $.extend({}, $.parser.parseOptions(_1bd, ["url", "method", {
                checkbox: "boolean",
                cascadeCheck: "boolean",
                onlyLeafCheck: "boolean"
            }, {animate: "boolean", lines: "boolean", dnd: "boolean"}]));
        };
        $.fn.tree.parseData = function (_1be) {
            var data = [];
            _1bf(data, $(_1be));
            return data;
            function _1bf(aa, tree) {
                tree.children("li").each(function () {
                    var node = $(this);
                    var item = $.extend({}, $.parser.parseOptions(this, ["id", "iconCls", "state"]), {checked: (node.attr("checked") ? true : undefined)});
                    item.text = node.children("span").html();
                    if (!item.text) {
                        item.text = node.html();
                    }
                    var _1c0 = node.children("ul");
                    if (_1c0.length) {
                        item.children = [];
                        _1bf(item.children, _1c0);
                    }
                    aa.push(item);
                });
            };
        };
        var _1c1 = 1;
        var _1c2 = {
            render: function (_1c3, ul, data) {
                var opts = $.data(_1c3, "tree").options;
                var _1c4 = $(ul).prev("div.tree-node").find("span.tree-indent, span.tree-hit").length;
                var cc = _1c5(_1c4, data);
                $(ul).append(cc.join(""));
                function _1c5(_1c6, _1c7) {
                    var cc = [];
                    for (var i = 0; i < _1c7.length; i++) {
                        var item = _1c7[i];
                        if (item.state != "open" && item.state != "closed") {
                            item.state = "open";
                        }
                        item.domId = "_easyui_tree_" + _1c1++;
                        cc.push("<li>");
                        cc.push("<div id=\"" + item.domId + "\" class=\"tree-node\">");
                        for (var j = 0; j < _1c6; j++) {
                            cc.push("<span class=\"tree-indent\"></span>");
                        }
                        var _1c8 = false;
                        if (item.state == "closed") {
                            cc.push("<span class=\"tree-hit tree-collapsed\"></span>");
                            cc.push("<span class=\"tree-icon tree-folder " + (item.iconCls ? item.iconCls : "") + "\"></span>");
                        } else {
                            if (item.children && item.children.length) {
                                cc.push("<span class=\"tree-hit tree-expanded\"></span>");
                                cc.push("<span class=\"tree-icon tree-folder tree-folder-open " + (item.iconCls ? item.iconCls : "") + "\"></span>");
                            } else {
                                cc.push("<span class=\"tree-indent\"></span>");
                                cc.push("<span class=\"tree-icon tree-file " + (item.iconCls ? item.iconCls : "") + "\"></span>");
                                _1c8 = true;
                            }
                        }
                        if (opts.checkbox) {
                            if ((!opts.onlyLeafCheck) || _1c8) {
                                cc.push("<span class=\"tree-checkbox tree-checkbox0\"></span>");
                            }
                        }
                        cc.push("<span class=\"tree-title\">" + opts.formatter.call(_1c3, item) + "</span>");
                        cc.push("</div>");
                        if (item.children && item.children.length) {
                            var tmp = _1c5(_1c6 + 1, item.children);
                            cc.push("<ul style=\"display:" + (item.state == "closed" ? "none" : "block") + "\">");
                            cc = cc.concat(tmp);
                            cc.push("</ul>");
                        }
                        cc.push("</li>");
                    }
                    return cc;
                };
            }
        };
        $.fn.tree.defaults = {
            url: null,
            method: "post",
            animate: false,
            checkbox: false,
            cascadeCheck: true,
            onlyLeafCheck: false,
            lines: false,
            dnd: false,
            data: null,
            queryParams: {},
            formatter: function (node) {
                return node.text;
            },
            filter: function (q, node) {
                return node.text.toLowerCase().indexOf(q.toLowerCase()) >= 0;
            },
            loader: function (_1c9, _1ca, _1cb) {
                var opts = $(this).tree("options");
                if (!opts.url) {
                    return false;
                }
                $.ajax({
                    type: opts.method, url: opts.url, data: _1c9, dataType: "json", success: function (data) {
                        _1ca(data);
                    }, error: function () {
                        _1cb.apply(this, arguments);
                    }
                });
            },
            loadFilter: function (data, _1cc) {
                return data;
            },
            view: _1c2,
            onBeforeLoad: function (node, _1cd) {
            },
            onLoadSuccess: function (node, data) {
            },
            onLoadError: function () {
            },
            onClick: function (node) {
            },
            onDblClick: function (node) {
            },
            onBeforeExpand: function (node) {
            },
            onExpand: function (node) {
            },
            onBeforeCollapse: function (node) {
            },
            onCollapse: function (node) {
            },
            onBeforeCheck: function (node, _1ce) {
            },
            onCheck: function (node, _1cf) {
            },
            onBeforeSelect: function (node) {
            },
            onSelect: function (node) {
            },
            onContextMenu: function (e, node) {
            },
            onBeforeDrag: function (node) {
            },
            onStartDrag: function (node) {
            },
            onStopDrag: function (node) {
            },
            onDragEnter: function (_1d0, _1d1) {
            },
            onDragOver: function (_1d2, _1d3) {
            },
            onDragLeave: function (_1d4, _1d5) {
            },
            onBeforeDrop: function (_1d6, _1d7, _1d8) {
            },
            onDrop: function (_1d9, _1da, _1db) {
            },
            onBeforeEdit: function (node) {
            },
            onAfterEdit: function (node) {
            },
            onCancelEdit: function (node) {
            }
        };
    })(jQuery);
    (function ($) {
        function init(_1dc) {
            $(_1dc).addClass("progressbar");
            $(_1dc).html("<div class=\"progressbar-text\"></div><div class=\"progressbar-value\"><div class=\"progressbar-text\"></div></div>");
            $(_1dc).bind("_resize", function (e, _1dd) {
                if ($(this).hasClass("easyui-fluid") || _1dd) {
                    _1de(_1dc);
                }
                return false;
            });
            return $(_1dc);
        };
        function _1de(_1df, _1e0) {
            var opts = $.data(_1df, "progressbar").options;
            var bar = $.data(_1df, "progressbar").bar;
            if (_1e0) {
                opts.width = _1e0;
            }
            bar._size(opts);
            bar.find("div.progressbar-text").css("width", bar.width());
            bar.find("div.progressbar-text,div.progressbar-value").css({
                height: bar.height() + "px",
                lineHeight: bar.height() + "px"
            });
        };
        $.fn.progressbar = function (_1e1, _1e2) {
            if (typeof _1e1 == "string") {
                var _1e3 = $.fn.progressbar.methods[_1e1];
                if (_1e3) {
                    return _1e3(this, _1e2);
                }
            }
            _1e1 = _1e1 || {};
            return this.each(function () {
                var _1e4 = $.data(this, "progressbar");
                if (_1e4) {
                    $.extend(_1e4.options, _1e1);
                } else {
                    _1e4 = $.data(this, "progressbar", {
                        options: $.extend({}, $.fn.progressbar.defaults, $.fn.progressbar.parseOptions(this), _1e1),
                        bar: init(this)
                    });
                }
                $(this).progressbar("setValue", _1e4.options.value);
                _1de(this);
            });
        };
        $.fn.progressbar.methods = {
            options: function (jq) {
                return $.data(jq[0], "progressbar").options;
            }, resize: function (jq, _1e5) {
                return jq.each(function () {
                    _1de(this, _1e5);
                });
            }, getValue: function (jq) {
                return $.data(jq[0], "progressbar").options.value;
            }, setValue: function (jq, _1e6) {
                if (_1e6 < 0) {
                    _1e6 = 0;
                }
                if (_1e6 > 100) {
                    _1e6 = 100;
                }
                return jq.each(function () {
                    var opts = $.data(this, "progressbar").options;
                    var text = opts.text.replace(/{value}/, _1e6);
                    var _1e7 = opts.value;
                    opts.value = _1e6;
                    $(this).find("div.progressbar-value").width(_1e6 + "%");
                    $(this).find("div.progressbar-text").html(text);
                    if (_1e7 != _1e6) {
                        opts.onChange.call(this, _1e6, _1e7);
                    }
                });
            }
        };
        $.fn.progressbar.parseOptions = function (_1e8) {
            return $.extend({}, $.parser.parseOptions(_1e8, ["width", "height", "text", {value: "number"}]));
        };
        $.fn.progressbar.defaults = {
            width: "auto", height: 22, value: 0, text: "{value}%", onChange: function (_1e9, _1ea) {
            }
        };
    })(jQuery);
    (function ($) {
        function init(_1eb) {
            $(_1eb).addClass("tooltip-f");
        };
        function _1ec(_1ed) {
            var opts = $.data(_1ed, "tooltip").options;
            $(_1ed).unbind(".tooltip").bind(opts.showEvent + ".tooltip", function (e) {
                $(_1ed).tooltip("show", e);
            }).bind(opts.hideEvent + ".tooltip", function (e) {
                $(_1ed).tooltip("hide", e);
            }).bind("mousemove.tooltip", function (e) {
                if (opts.trackMouse) {
                    opts.trackMouseX = e.pageX;
                    opts.trackMouseY = e.pageY;
                    $(_1ed).tooltip("reposition");
                }
            });
        };
        function _1ee(_1ef) {
            var _1f0 = $.data(_1ef, "tooltip");
            if (_1f0.showTimer) {
                clearTimeout(_1f0.showTimer);
                _1f0.showTimer = null;
            }
            if (_1f0.hideTimer) {
                clearTimeout(_1f0.hideTimer);
                _1f0.hideTimer = null;
            }
        };
        function _1f1(_1f2) {
            var _1f3 = $.data(_1f2, "tooltip");
            if (!_1f3 || !_1f3.tip) {
                return;
            }
            var opts = _1f3.options;
            var tip = _1f3.tip;
            var pos = {left: -100000, top: -100000};
            if ($(_1f2).is(":visible")) {
                pos = _1f4(opts.position);
                if (opts.position == "top" && pos.top < 0) {
                    pos = _1f4("bottom");
                } else {
                    if ((opts.position == "bottom") && (pos.top + tip._outerHeight() > $(window)._outerHeight() + $(document).scrollTop())) {
                        pos = _1f4("top");
                    }
                }
                if (pos.left < 0) {
                    if (opts.position == "left") {
                        pos = _1f4("right");
                    } else {
                        $(_1f2).tooltip("arrow").css("left", tip._outerWidth() / 2 + pos.left);
                        pos.left = 0;
                    }
                } else {
                    if (pos.left + tip._outerWidth() > $(window)._outerWidth() + $(document)._scrollLeft()) {
                        if (opts.position == "right") {
                            pos = _1f4("left");
                        } else {
                            var left = pos.left;
                            pos.left = $(window)._outerWidth() + $(document)._scrollLeft() - tip._outerWidth();
                            $(_1f2).tooltip("arrow").css("left", tip._outerWidth() / 2 - (pos.left - left));
                        }
                    }
                }
            }
            tip.css({
                left: pos.left,
                top: pos.top,
                zIndex: (opts.zIndex != undefined ? opts.zIndex : ($.fn.window ? $.fn.window.defaults.zIndex++ : ""))
            });
            opts.onPosition.call(_1f2, pos.left, pos.top);
            function _1f4(_1f5) {
                opts.position = _1f5 || "bottom";
                tip.removeClass("tooltip-top tooltip-bottom tooltip-left tooltip-right").addClass("tooltip-" + opts.position);
                var left, top;
                if (opts.trackMouse) {
                    t = $();
                    left = opts.trackMouseX + opts.deltaX;
                    top = opts.trackMouseY + opts.deltaY;
                } else {
                    var t = $(_1f2);
                    left = t.offset().left + opts.deltaX;
                    top = t.offset().top + opts.deltaY;
                }
                switch (opts.position) {
                    case "right":
                        left += t._outerWidth() + 12 + (opts.trackMouse ? 12 : 0);
                        top -= (tip._outerHeight() - t._outerHeight()) / 2;
                        break;
                    case "left":
                        left -= tip._outerWidth() + 12 + (opts.trackMouse ? 12 : 0);
                        top -= (tip._outerHeight() - t._outerHeight()) / 2;
                        break;
                    case "top":
                        left -= (tip._outerWidth() - t._outerWidth()) / 2;
                        top -= tip._outerHeight() + 12 + (opts.trackMouse ? 12 : 0);
                        break;
                    case "bottom":
                        left -= (tip._outerWidth() - t._outerWidth()) / 2;
                        top += t._outerHeight() + 12 + (opts.trackMouse ? 12 : 0);
                        break;
                }
                return {left: left, top: top};
            };
        };
        function _1f6(_1f7, e) {
            var _1f8 = $.data(_1f7, "tooltip");
            var opts = _1f8.options;
            var tip = _1f8.tip;
            if (!tip) {
                tip = $("<div tabindex=\"-1\" class=\"tooltip\">" + "<div class=\"tooltip-content\"></div>" + "<div class=\"tooltip-arrow-outer\"></div>" + "<div class=\"tooltip-arrow\"></div>" + "</div>").appendTo("body");
                _1f8.tip = tip;
                _1f9(_1f7);
            }
            _1ee(_1f7);
            _1f8.showTimer = setTimeout(function () {
                $(_1f7).tooltip("reposition");
                tip.show();
                opts.onShow.call(_1f7, e);
                var _1fa = tip.children(".tooltip-arrow-outer");
                var _1fb = tip.children(".tooltip-arrow");
                var bc = "border-" + opts.position + "-color";
                _1fa.add(_1fb).css({
                    borderTopColor: "",
                    borderBottomColor: "",
                    borderLeftColor: "",
                    borderRightColor: ""
                });
                _1fa.css(bc, tip.css(bc));
                _1fb.css(bc, tip.css("backgroundColor"));
            }, opts.showDelay);
        };
        function _1fc(_1fd, e) {
            var _1fe = $.data(_1fd, "tooltip");
            if (_1fe && _1fe.tip) {
                _1ee(_1fd);
                _1fe.hideTimer = setTimeout(function () {
                    _1fe.tip.hide();
                    _1fe.options.onHide.call(_1fd, e);
                }, _1fe.options.hideDelay);
            }
        };
        function _1f9(_1ff, _200) {
            var _201 = $.data(_1ff, "tooltip");
            var opts = _201.options;
            if (_200) {
                opts.content = _200;
            }
            if (!_201.tip) {
                return;
            }
            var cc = typeof opts.content == "function" ? opts.content.call(_1ff) : opts.content;
            _201.tip.children(".tooltip-content").html(cc);
            opts.onUpdate.call(_1ff, cc);
        };
        function _202(_203) {
            var _204 = $.data(_203, "tooltip");
            if (_204) {
                _1ee(_203);
                var opts = _204.options;
                if (_204.tip) {
                    _204.tip.remove();
                }
                if (opts._title) {
                    $(_203).attr("title", opts._title);
                }
                $.removeData(_203, "tooltip");
                $(_203).unbind(".tooltip").removeClass("tooltip-f");
                opts.onDestroy.call(_203);
            }
        };
        $.fn.tooltip = function (_205, _206) {
            if (typeof _205 == "string") {
                return $.fn.tooltip.methods[_205](this, _206);
            }
            _205 = _205 || {};
            return this.each(function () {
                var _207 = $.data(this, "tooltip");
                if (_207) {
                    $.extend(_207.options, _205);
                } else {
                    $.data(this, "tooltip", {options: $.extend({}, $.fn.tooltip.defaults, $.fn.tooltip.parseOptions(this), _205)});
                    init(this);
                }
                _1ec(this);
                _1f9(this);
            });
        };
        $.fn.tooltip.methods = {
            options: function (jq) {
                return $.data(jq[0], "tooltip").options;
            }, tip: function (jq) {
                return $.data(jq[0], "tooltip").tip;
            }, arrow: function (jq) {
                return jq.tooltip("tip").children(".tooltip-arrow-outer,.tooltip-arrow");
            }, show: function (jq, e) {
                return jq.each(function () {
                    _1f6(this, e);
                });
            }, hide: function (jq, e) {
                return jq.each(function () {
                    _1fc(this, e);
                });
            }, update: function (jq, _208) {
                return jq.each(function () {
                    _1f9(this, _208);
                });
            }, reposition: function (jq) {
                return jq.each(function () {
                    _1f1(this);
                });
            }, destroy: function (jq) {
                return jq.each(function () {
                    _202(this);
                });
            }
        };
        $.fn.tooltip.parseOptions = function (_209) {
            var t = $(_209);
            var opts = $.extend({}, $.parser.parseOptions(_209, ["position", "showEvent", "hideEvent", "content", {
                trackMouse: "boolean",
                deltaX: "number",
                deltaY: "number",
                showDelay: "number",
                hideDelay: "number"
            }]), {_title: t.attr("title")});
            t.attr("title", "");
            if (!opts.content) {
                opts.content = opts._title;
            }
            return opts;
        };
        $.fn.tooltip.defaults = {
            position: "bottom",
            content: null,
            trackMouse: false,
            deltaX: 0,
            deltaY: 0,
            showEvent: "mouseenter",
            hideEvent: "mouseleave",
            showDelay: 200,
            hideDelay: 100,
            onShow: function (e) {
            },
            onHide: function (e) {
            },
            onUpdate: function (_20a) {
            },
            onPosition: function (left, top) {
            },
            onDestroy: function () {
            }
        };
    })(jQuery);
    (function ($) {
        $.fn._remove = function () {
            return this.each(function () {
                $(this).remove();
                try {
                    this.outerHTML = "";
                }
                catch (err) {
                }
            });
        };
        function _20b(node) {
            node._remove();
        };
        function _20c(_20d, _20e) {
            var _20f = $.data(_20d, "panel");
            var opts = _20f.options;
            var _210 = _20f.panel;
            var _211 = _210.children(".panel-header");
            var _212 = _210.children(".panel-body");
            var _213 = _210.children(".panel-footer");
            if (_20e) {
                $.extend(opts, {
                    width: _20e.width,
                    height: _20e.height,
                    minWidth: _20e.minWidth,
                    maxWidth: _20e.maxWidth,
                    minHeight: _20e.minHeight,
                    maxHeight: _20e.maxHeight,
                    left: _20e.left,
                    top: _20e.top
                });
            }
            _210._size(opts);
            _211.add(_212)._outerWidth(_210.width());
            if (!isNaN(parseInt(opts.height))) {
                _212._outerHeight(_210.height() - _211._outerHeight() - _213._outerHeight());
            } else {
                _212.css("height", "");
                var min = $.parser.parseValue("minHeight", opts.minHeight, _210.parent());
                var max = $.parser.parseValue("maxHeight", opts.maxHeight, _210.parent());
                var _214 = _211._outerHeight() + _213._outerHeight() + _210._outerHeight() - _210.height();
                _212._size("minHeight", min ? (min - _214) : "");
                _212._size("maxHeight", max ? (max - _214) : "");
            }
            _210.css({height: "", minHeight: "", maxHeight: "", left: opts.left, top: opts.top});
            opts.onResize.apply(_20d, [opts.width, opts.height]);
            $(_20d).panel("doLayout");
        };
        function _215(_216, _217) {
            var opts = $.data(_216, "panel").options;
            var _218 = $.data(_216, "panel").panel;
            if (_217) {
                if (_217.left != null) {
                    opts.left = _217.left;
                }
                if (_217.top != null) {
                    opts.top = _217.top;
                }
            }
            _218.css({left: opts.left, top: opts.top});
            opts.onMove.apply(_216, [opts.left, opts.top]);
        };
        function _219(_21a) {
            $(_21a).addClass("panel-body")._size("clear");
            var _21b = $("<div class=\"panel\"></div>").insertBefore(_21a);
            _21b[0].appendChild(_21a);
            _21b.bind("_resize", function (e, _21c) {
                if ($(this).hasClass("easyui-fluid") || _21c) {
                    _20c(_21a);
                }
                return false;
            });
            return _21b;
        };
        function _21d(_21e) {
            var _21f = $.data(_21e, "panel");
            var opts = _21f.options;
            var _220 = _21f.panel;
            _220.css(opts.style);
            _220.addClass(opts.cls);
            _221();
            _222();
            var _223 = $(_21e).panel("header");
            var body = $(_21e).panel("body");
            var _224 = $(_21e).siblings(".panel-footer");
            if (opts.border) {
                _223.removeClass("panel-header-noborder");
                body.removeClass("panel-body-noborder");
                _224.removeClass("panel-footer-noborder");
            } else {
                _223.addClass("panel-header-noborder");
                body.addClass("panel-body-noborder");
                _224.addClass("panel-footer-noborder");
            }
            _223.addClass(opts.headerCls);
            body.addClass(opts.bodyCls);
            $(_21e).attr("id", opts.id || "");
            if (opts.content) {
                $(_21e).panel("clear");
                $(_21e).html(opts.content);
                $.parser.parse($(_21e));
            }
            function _221() {
                if (opts.noheader || (!opts.title && !opts.header)) {
                    _20b(_220.children(".panel-header"));
                    _220.children(".panel-body").addClass("panel-body-noheader");
                } else {
                    if (opts.header) {
                        $(opts.header).addClass("panel-header").prependTo(_220);
                    } else {
                        var _225 = _220.children(".panel-header");
                        if (!_225.length) {
                            _225 = $("<div class=\"panel-header\"></div>").prependTo(_220);
                        }
                        if (!$.isArray(opts.tools)) {
                            _225.find("div.panel-tool .panel-tool-a").appendTo(opts.tools);
                        }
                        _225.empty();
                        var _226 = $("<div class=\"panel-title\"></div>").html(opts.title).appendTo(_225);
                        if (opts.iconCls) {
                            _226.addClass("panel-with-icon");
                            $("<div class=\"panel-icon\"></div>").addClass(opts.iconCls).appendTo(_225);
                        }
                        var tool = $("<div class=\"panel-tool\"></div>").appendTo(_225);
                        tool.bind("click", function (e) {
                            e.stopPropagation();
                        });
                        if (opts.tools) {
                            if ($.isArray(opts.tools)) {
                                $.map(opts.tools, function (t) {
                                    _227(tool, t.iconCls, eval(t.handler));
                                });
                            } else {
                                $(opts.tools).children().each(function () {
                                    $(this).addClass($(this).attr("iconCls")).addClass("panel-tool-a").appendTo(tool);
                                });
                            }
                        }
                        if (opts.collapsible) {
                            _227(tool, "panel-tool-collapse", function () {
                                if (opts.collapsed == true) {
                                    _245(_21e, true);
                                } else {
                                    _238(_21e, true);
                                }
                            });
                        }
                        if (opts.minimizable) {
                            _227(tool, "panel-tool-min", function () {
                                _24b(_21e);
                            });
                        }
                        if (opts.maximizable) {
                            _227(tool, "panel-tool-max", function () {
                                if (opts.maximized == true) {
                                    _24e(_21e);
                                } else {
                                    _237(_21e);
                                }
                            });
                        }
                        if (opts.closable) {
                            _227(tool, "panel-tool-close", function () {
                                _239(_21e);
                            });
                        }
                    }
                    _220.children("div.panel-body").removeClass("panel-body-noheader");
                }
            };
            function _227(c, icon, _228) {
                var a = $("<a href=\"javascript:void(0)\"></a>").addClass(icon).appendTo(c);
                a.bind("click", _228);
            };
            function _222() {
                if (opts.footer) {
                    $(opts.footer).addClass("panel-footer").appendTo(_220);
                    $(_21e).addClass("panel-body-nobottom");
                } else {
                    _220.children(".panel-footer").remove();
                    $(_21e).removeClass("panel-body-nobottom");
                }
            };
        };
        function _229(_22a, _22b) {
            var _22c = $.data(_22a, "panel");
            var opts = _22c.options;
            if (_22d) {
                opts.queryParams = _22b;
            }
            if (!opts.href) {
                return;
            }
            if (!_22c.isLoaded || !opts.cache) {
                var _22d = $.extend({}, opts.queryParams);
                if (opts.onBeforeLoad.call(_22a, _22d) == false) {
                    return;
                }
                _22c.isLoaded = false;
                $(_22a).panel("clear");
                if (opts.loadingMessage) {
                    $(_22a).html($("<div class=\"panel-loading\"></div>").html(opts.loadingMessage));
                }
                opts.loader.call(_22a, _22d, function (data) {
                    var _22e = opts.extractor.call(_22a, data);
                    $(_22a).html(_22e);
                    $.parser.parse($(_22a));
                    opts.onLoad.apply(_22a, arguments);
                    _22c.isLoaded = true;
                }, function () {
                    opts.onLoadError.apply(_22a, arguments);
                });
            }
        };
        function _22f(_230) {
            var t = $(_230);
            t.find(".combo-f").each(function () {
                $(this).combo("destroy");
            });
            t.find(".m-btn").each(function () {
                $(this).menubutton("destroy");
            });
            t.find(".s-btn").each(function () {
                $(this).splitbutton("destroy");
            });
            t.find(".tooltip-f").each(function () {
                $(this).tooltip("destroy");
            });
            t.children("div").each(function () {
                $(this)._size("unfit");
            });
            t.empty();
        };
        function _231(_232) {
            $(_232).panel("doLayout", true);
        };
        function _233(_234, _235) {
            var opts = $.data(_234, "panel").options;
            var _236 = $.data(_234, "panel").panel;
            if (_235 != true) {
                if (opts.onBeforeOpen.call(_234) == false) {
                    return;
                }
            }
            _236.stop(true, true);
            if ($.isFunction(opts.openAnimation)) {
                opts.openAnimation.call(_234, cb);
            } else {
                switch (opts.openAnimation) {
                    case "slide":
                        _236.slideDown(opts.openDuration, cb);
                        break;
                    case "fade":
                        _236.fadeIn(opts.openDuration, cb);
                        break;
                    case "show":
                        _236.show(opts.openDuration, cb);
                        break;
                    default:
                        _236.show();
                        cb();
                }
            }
            function cb() {
                opts.closed = false;
                opts.minimized = false;
                var tool = _236.children(".panel-header").find("a.panel-tool-restore");
                if (tool.length) {
                    opts.maximized = true;
                }
                opts.onOpen.call(_234);
                if (opts.maximized == true) {
                    opts.maximized = false;
                    _237(_234);
                }
                if (opts.collapsed == true) {
                    opts.collapsed = false;
                    _238(_234);
                }
                if (!opts.collapsed) {
                    _229(_234);
                    _231(_234);
                }
            };
        };
        function _239(_23a, _23b) {
            var opts = $.data(_23a, "panel").options;
            var _23c = $.data(_23a, "panel").panel;
            if (_23b != true) {
                if (opts.onBeforeClose.call(_23a) == false) {
                    return;
                }
            }
            _23c.stop(true, true);
            _23c._size("unfit");
            if ($.isFunction(opts.closeAnimation)) {
                opts.closeAnimation.call(_23a, cb);
            } else {
                switch (opts.closeAnimation) {
                    case "slide":
                        _23c.slideUp(opts.closeDuration, cb);
                        break;
                    case "fade":
                        _23c.fadeOut(opts.closeDuration, cb);
                        break;
                    case "hide":
                        _23c.hide(opts.closeDuration, cb);
                        break;
                    default:
                        _23c.hide();
                        cb();
                }
            }
            function cb() {
                opts.closed = true;
                opts.onClose.call(_23a);
            };
        };
        function _23d(_23e, _23f) {
            var _240 = $.data(_23e, "panel");
            var opts = _240.options;
            var _241 = _240.panel;
            if (_23f != true) {
                if (opts.onBeforeDestroy.call(_23e) == false) {
                    return;
                }
            }
            $(_23e).panel("clear").panel("clear", "footer");
            _20b(_241);
            opts.onDestroy.call(_23e);
        };
        function _238(_242, _243) {
            var opts = $.data(_242, "panel").options;
            var _244 = $.data(_242, "panel").panel;
            var body = _244.children(".panel-body");
            var tool = _244.children(".panel-header").find("a.panel-tool-collapse");
            if (opts.collapsed == true) {
                return;
            }
            body.stop(true, true);
            if (opts.onBeforeCollapse.call(_242) == false) {
                return;
            }
            tool.addClass("panel-tool-expand");
            if (_243 == true) {
                body.slideUp("normal", function () {
                    opts.collapsed = true;
                    opts.onCollapse.call(_242);
                });
            } else {
                body.hide();
                opts.collapsed = true;
                opts.onCollapse.call(_242);
            }
        };
        function _245(_246, _247) {
            var opts = $.data(_246, "panel").options;
            var _248 = $.data(_246, "panel").panel;
            var body = _248.children(".panel-body");
            var tool = _248.children(".panel-header").find("a.panel-tool-collapse");
            if (opts.collapsed == false) {
                return;
            }
            body.stop(true, true);
            if (opts.onBeforeExpand.call(_246) == false) {
                return;
            }
            tool.removeClass("panel-tool-expand");
            if (_247 == true) {
                body.slideDown("normal", function () {
                    opts.collapsed = false;
                    opts.onExpand.call(_246);
                    _229(_246);
                    _231(_246);
                });
            } else {
                body.show();
                opts.collapsed = false;
                opts.onExpand.call(_246);
                _229(_246);
                _231(_246);
            }
        };
        function _237(_249) {
            var opts = $.data(_249, "panel").options;
            var _24a = $.data(_249, "panel").panel;
            var tool = _24a.children(".panel-header").find("a.panel-tool-max");
            if (opts.maximized == true) {
                return;
            }
            tool.addClass("panel-tool-restore");
            if (!$.data(_249, "panel").original) {
                $.data(_249, "panel").original = {
                    width: opts.width,
                    height: opts.height,
                    left: opts.left,
                    top: opts.top,
                    fit: opts.fit
                };
            }
            opts.left = 0;
            opts.top = 0;
            opts.fit = true;
            _20c(_249);
            opts.minimized = false;
            opts.maximized = true;
            opts.onMaximize.call(_249);
        };
        function _24b(_24c) {
            var opts = $.data(_24c, "panel").options;
            var _24d = $.data(_24c, "panel").panel;
            _24d._size("unfit");
            _24d.hide();
            opts.minimized = true;
            opts.maximized = false;
            opts.onMinimize.call(_24c);
        };
        function _24e(_24f) {
            var opts = $.data(_24f, "panel").options;
            var _250 = $.data(_24f, "panel").panel;
            var tool = _250.children(".panel-header").find("a.panel-tool-max");
            if (opts.maximized == false) {
                return;
            }
            _250.show();
            tool.removeClass("panel-tool-restore");
            $.extend(opts, $.data(_24f, "panel").original);
            _20c(_24f);
            opts.minimized = false;
            opts.maximized = false;
            $.data(_24f, "panel").original = null;
            opts.onRestore.call(_24f);
        };
        function _251(_252, _253) {
            $.data(_252, "panel").options.title = _253;
            $(_252).panel("header").find("div.panel-title").html(_253);
        };
        var _254 = null;
        $(window).unbind(".panel").bind("resize.panel", function () {
            if (_254) {
                clearTimeout(_254);
            }
            _254 = setTimeout(function () {
                var _255 = $("body.layout");
                if (_255.length) {
                    _255.layout("resize");
                    $("body").children(".easyui-fluid:visible").each(function () {
                        $(this).triggerHandler("_resize");
                    });
                } else {
                    $("body").panel("doLayout");
                }
                _254 = null;
            }, 100);
        });
        $.fn.panel = function (_256, _257) {
            if (typeof _256 == "string") {
                return $.fn.panel.methods[_256](this, _257);
            }
            _256 = _256 || {};
            return this.each(function () {
                var _258 = $.data(this, "panel");
                var opts;
                if (_258) {
                    opts = $.extend(_258.options, _256);
                    _258.isLoaded = false;
                } else {
                    opts = $.extend({}, $.fn.panel.defaults, $.fn.panel.parseOptions(this), _256);
                    $(this).attr("title", "");
                    _258 = $.data(this, "panel", {options: opts, panel: _219(this), isLoaded: false});
                }
                _21d(this);
                if (opts.doSize == true) {
                    _258.panel.css("display", "block");
                    _20c(this);
                }
                if (opts.closed == true || opts.minimized == true) {
                    _258.panel.hide();
                } else {
                    _233(this);
                }
            });
        };
        $.fn.panel.methods = {
            options: function (jq) {
                return $.data(jq[0], "panel").options;
            }, panel: function (jq) {
                return $.data(jq[0], "panel").panel;
            }, header: function (jq) {
                return $.data(jq[0], "panel").panel.children(".panel-header");
            }, footer: function (jq) {
                return jq.panel("panel").children(".panel-footer");
            }, body: function (jq) {
                return $.data(jq[0], "panel").panel.children(".panel-body");
            }, setTitle: function (jq, _259) {
                return jq.each(function () {
                    _251(this, _259);
                });
            }, open: function (jq, _25a) {
                return jq.each(function () {
                    _233(this, _25a);
                });
            }, close: function (jq, _25b) {
                return jq.each(function () {
                    _239(this, _25b);
                });
            }, destroy: function (jq, _25c) {
                return jq.each(function () {
                    _23d(this, _25c);
                });
            }, clear: function (jq, type) {
                return jq.each(function () {
                    _22f(type == "footer" ? $(this).panel("footer") : this);
                });
            }, refresh: function (jq, href) {
                return jq.each(function () {
                    var _25d = $.data(this, "panel");
                    _25d.isLoaded = false;
                    if (href) {
                        if (typeof href == "string") {
                            _25d.options.href = href;
                        } else {
                            _25d.options.queryParams = href;
                        }
                    }
                    _229(this);
                });
            }, resize: function (jq, _25e) {
                return jq.each(function () {
                    _20c(this, _25e);
                });
            }, doLayout: function (jq, all) {
                return jq.each(function () {
                    _25f(this, "body");
                    _25f($(this).siblings(".panel-footer")[0], "footer");
                    function _25f(_260, type) {
                        if (!_260) {
                            return;
                        }
                        var _261 = _260 == $("body")[0];
                        var s = $(_260).find("div.panel:visible,div.accordion:visible,div.tabs-container:visible,div.layout:visible,.easyui-fluid:visible").filter(function (_262, el) {
                            var p = $(el).parents(".panel-" + type + ":first");
                            return _261 ? p.length == 0 : p[0] == _260;
                        });
                        s.each(function () {
                            $(this).triggerHandler("_resize", [all || false]);
                        });
                    };
                });
            }, move: function (jq, _263) {
                return jq.each(function () {
                    _215(this, _263);
                });
            }, maximize: function (jq) {
                return jq.each(function () {
                    _237(this);
                });
            }, minimize: function (jq) {
                return jq.each(function () {
                    _24b(this);
                });
            }, restore: function (jq) {
                return jq.each(function () {
                    _24e(this);
                });
            }, collapse: function (jq, _264) {
                return jq.each(function () {
                    _238(this, _264);
                });
            }, expand: function (jq, _265) {
                return jq.each(function () {
                    _245(this, _265);
                });
            }
        };
        $.fn.panel.parseOptions = function (_266) {
            var t = $(_266);
            var hh = t.children(".panel-header,header");
            var ff = t.children(".panel-footer,footer");
            return $.extend({}, $.parser.parseOptions(_266, ["id", "width", "height", "left", "top", "title", "iconCls", "cls", "headerCls", "bodyCls", "tools", "href", "method", "header", "footer", {
                cache: "boolean",
                fit: "boolean",
                border: "boolean",
                noheader: "boolean"
            }, {collapsible: "boolean", minimizable: "boolean", maximizable: "boolean"}, {
                closable: "boolean",
                collapsed: "boolean",
                minimized: "boolean",
                maximized: "boolean",
                closed: "boolean"
            }, "openAnimation", "closeAnimation", {
                openDuration: "number",
                closeDuration: "number"
            },]), {
                loadingMessage: (t.attr("loadingMessage") != undefined ? t.attr("loadingMessage") : undefined),
                header: (hh.length ? hh.removeClass("panel-header") : undefined),
                footer: (ff.length ? ff.removeClass("panel-footer") : undefined)
            });
        };
        $.fn.panel.defaults = {
            id: null,
            title: null,
            iconCls: null,
            width: "auto",
            height: "auto",
            left: null,
            top: null,
            cls: null,
            headerCls: null,
            bodyCls: null,
            style: {},
            href: null,
            cache: true,
            fit: false,
            border: true,
            doSize: true,
            noheader: false,
            content: null,
            collapsible: false,
            minimizable: false,
            maximizable: false,
            closable: false,
            collapsed: false,
            minimized: false,
            maximized: false,
            closed: false,
            openAnimation: false,
            openDuration: 400,
            closeAnimation: false,
            closeDuration: 400,
            tools: null,
            footer: null,
            header: null,
            queryParams: {},
            method: "get",
            href: null,
            loadingMessage: "Loading...",
            loader: function (_267, _268, _269) {
                var opts = $(this).panel("options");
                if (!opts.href) {
                    return false;
                }
                $.ajax({
                    type: opts.method,
                    url: opts.href,
                    cache: false,
                    data: _267,
                    dataType: "html",
                    success: function (data) {
                        _268(data);
                    },
                    error: function () {
                        _269.apply(this, arguments);
                    }
                });
            },
            extractor: function (data) {
                var _26a = /<body[^>]*>((.|[\n\r])*)<\/body>/im;
                var _26b = _26a.exec(data);
                if (_26b) {
                    return _26b[1];
                } else {
                    return data;
                }
            },
            onBeforeLoad: function (_26c) {
            },
            onLoad: function () {
            },
            onLoadError: function () {
            },
            onBeforeOpen: function () {
            },
            onOpen: function () {
            },
            onBeforeClose: function () {
            },
            onClose: function () {
            },
            onBeforeDestroy: function () {
            },
            onDestroy: function () {
            },
            onResize: function (_26d, _26e) {
            },
            onMove: function (left, top) {
            },
            onMaximize: function () {
            },
            onRestore: function () {
            },
            onMinimize: function () {
            },
            onBeforeCollapse: function () {
            },
            onBeforeExpand: function () {
            },
            onCollapse: function () {
            },
            onExpand: function () {
            }
        };
    })(jQuery);
    (function ($) {
        function _26f(_270, _271) {
            var _272 = $.data(_270, "window");
            if (_271) {
                if (_271.left != null) {
                    _272.options.left = _271.left;
                }
                if (_271.top != null) {
                    _272.options.top = _271.top;
                }
            }
            $(_270).panel("move", _272.options);
            if (_272.shadow) {
                _272.shadow.css({left: _272.options.left, top: _272.options.top});
            }
        };
        function _273(_274, _275) {
            var opts = $.data(_274, "window").options;
            var pp = $(_274).window("panel");
            var _276 = pp._outerWidth();
            if (opts.inline) {
                var _277 = pp.parent();
                opts.left = Math.ceil((_277.width() - _276) / 2 + _277.scrollLeft());
            } else {
                opts.left = Math.ceil(($(window)._outerWidth() - _276) / 2 + $(document).scrollLeft());
            }
            if (_275) {
                _26f(_274);
            }
        };
        function _278(_279, _27a) {
            var opts = $.data(_279, "window").options;
            var pp = $(_279).window("panel");
            var _27b = pp._outerHeight();
            if (opts.inline) {
                var _27c = pp.parent();
                opts.top = Math.ceil((_27c.height() - _27b) / 2 + _27c.scrollTop());
            } else {
                opts.top = Math.ceil(($(window)._outerHeight() - _27b) / 2 + $(document).scrollTop());
            }
            if (_27a) {
                _26f(_279);
            }
        };
        function _27d(_27e) {
            var _27f = $.data(_27e, "window");
            var opts = _27f.options;
            var win = $(_27e).panel($.extend({}, _27f.options, {
                border: false,
                doSize: true,
                closed: true,
                cls: "window",
                headerCls: "window-header",
                bodyCls: "window-body " + (opts.noheader ? "window-body-noheader" : ""),
                onBeforeDestroy: function () {
                    if (opts.onBeforeDestroy.call(_27e) == false) {
                        return false;
                    }
                    if (_27f.shadow) {
                        _27f.shadow.remove();
                    }
                    if (_27f.mask) {
                        _27f.mask.remove();
                    }
                },
                onClose: function () {
                    if (_27f.shadow) {
                        _27f.shadow.hide();
                    }
                    if (_27f.mask) {
                        _27f.mask.hide();
                    }
                    opts.onClose.call(_27e);
                },
                onOpen: function () {
                    if (_27f.mask) {
                        _27f.mask.css({display: "block", zIndex: $.fn.window.defaults.zIndex++});
                    }
                    if (_27f.shadow) {
                        _27f.shadow.css({
                            display: "block",
                            zIndex: $.fn.window.defaults.zIndex++,
                            left: opts.left,
                            top: opts.top,
                            width: _27f.window._outerWidth(),
                            height: _27f.window._outerHeight()
                        });
                    }
                    _27f.window.css("z-index", $.fn.window.defaults.zIndex++);
                    opts.onOpen.call(_27e);
                },
                onResize: function (_280, _281) {
                    var _282 = $(this).panel("options");
                    $.extend(opts, {width: _282.width, height: _282.height, left: _282.left, top: _282.top});
                    if (_27f.shadow) {
                        _27f.shadow.css({
                            left: opts.left,
                            top: opts.top,
                            width: _27f.window._outerWidth(),
                            height: _27f.window._outerHeight()
                        });
                    }
                    opts.onResize.call(_27e, _280, _281);
                },
                onMinimize: function () {
                    if (_27f.shadow) {
                        _27f.shadow.hide();
                    }
                    if (_27f.mask) {
                        _27f.mask.hide();
                    }
                    _27f.options.onMinimize.call(_27e);
                },
                onBeforeCollapse: function () {
                    if (opts.onBeforeCollapse.call(_27e) == false) {
                        return false;
                    }
                    if (_27f.shadow) {
                        _27f.shadow.hide();
                    }
                },
                onExpand: function () {
                    if (_27f.shadow) {
                        _27f.shadow.show();
                    }
                    opts.onExpand.call(_27e);
                }
            }));
            _27f.window = win.panel("panel");
            if (_27f.mask) {
                _27f.mask.remove();
            }
            if (opts.modal == true) {
                _27f.mask = $("<div class=\"window-mask\"></div>").insertAfter(_27f.window);
                _27f.mask.css({
                    width: (opts.inline ? _27f.mask.parent().width() : _283().width),
                    height: (opts.inline ? _27f.mask.parent().height() : _283().height),
                    display: "none"
                });
            }
            if (_27f.shadow) {
                _27f.shadow.remove();
            }
            if (opts.shadow == true) {
                _27f.shadow = $("<div class=\"window-shadow\"></div>").insertAfter(_27f.window);
                _27f.shadow.css({display: "none"});
            }
            if (opts.left == null) {
                _273(_27e);
            }
            if (opts.top == null) {
                _278(_27e);
            }
            _26f(_27e);
            if (!opts.closed) {
                win.window("open");
            }
        };
        function _284(_285) {
            var _286 = $.data(_285, "window");
            _286.window.draggable({
                handle: ">div.panel-header>div.panel-title",
                disabled: _286.options.draggable == false,
                onStartDrag: function (e) {
                    if (_286.mask) {
                        _286.mask.css("z-index", $.fn.window.defaults.zIndex++);
                    }
                    if (_286.shadow) {
                        _286.shadow.css("z-index", $.fn.window.defaults.zIndex++);
                    }
                    _286.window.css("z-index", $.fn.window.defaults.zIndex++);
                    if (!_286.proxy) {
                        _286.proxy = $("<div class=\"window-proxy\"></div>").insertAfter(_286.window);
                    }
                    _286.proxy.css({
                        display: "none",
                        zIndex: $.fn.window.defaults.zIndex++,
                        left: e.data.left,
                        top: e.data.top
                    });
                    _286.proxy._outerWidth(_286.window._outerWidth());
                    _286.proxy._outerHeight(_286.window._outerHeight());
                    setTimeout(function () {
                        if (_286.proxy) {
                            _286.proxy.show();
                        }
                    }, 500);
                },
                onDrag: function (e) {
                    _286.proxy.css({display: "block", left: e.data.left, top: e.data.top});
                    return false;
                },
                onStopDrag: function (e) {
                    _286.options.left = e.data.left;
                    _286.options.top = e.data.top;
                    $(_285).window("move");
                    _286.proxy.remove();
                    _286.proxy = null;
                }
            });
            _286.window.resizable({
                disabled: _286.options.resizable == false, onStartResize: function (e) {
                    if (_286.pmask) {
                        _286.pmask.remove();
                    }
                    _286.pmask = $("<div class=\"window-proxy-mask\"></div>").insertAfter(_286.window);
                    _286.pmask.css({
                        zIndex: $.fn.window.defaults.zIndex++,
                        left: e.data.left,
                        top: e.data.top,
                        width: _286.window._outerWidth(),
                        height: _286.window._outerHeight()
                    });
                    if (_286.proxy) {
                        _286.proxy.remove();
                    }
                    _286.proxy = $("<div class=\"window-proxy\"></div>").insertAfter(_286.window);
                    _286.proxy.css({zIndex: $.fn.window.defaults.zIndex++, left: e.data.left, top: e.data.top});
                    _286.proxy._outerWidth(e.data.width)._outerHeight(e.data.height);
                }, onResize: function (e) {
                    _286.proxy.css({left: e.data.left, top: e.data.top});
                    _286.proxy._outerWidth(e.data.width);
                    _286.proxy._outerHeight(e.data.height);
                    return false;
                }, onStopResize: function (e) {
                    $(_285).window("resize", e.data);
                    _286.pmask.remove();
                    _286.pmask = null;
                    _286.proxy.remove();
                    _286.proxy = null;
                }
            });
        };
        function _283() {
            if (document.compatMode == "BackCompat") {
                return {
                    width: Math.max(document.body.scrollWidth, document.body.clientWidth),
                    height: Math.max(document.body.scrollHeight, document.body.clientHeight)
                };
            } else {
                return {
                    width: Math.max(document.documentElement.scrollWidth, document.documentElement.clientWidth),
                    height: Math.max(document.documentElement.scrollHeight, document.documentElement.clientHeight)
                };
            }
        };
        $(window).resize(function () {
            $("body>div.window-mask").css({width: $(window)._outerWidth(), height: $(window)._outerHeight()});
            setTimeout(function () {
                $("body>div.window-mask").css({width: _283().width, height: _283().height});
            }, 50);
        });
        $.fn.window = function (_287, _288) {
            if (typeof _287 == "string") {
                var _289 = $.fn.window.methods[_287];
                if (_289) {
                    return _289(this, _288);
                } else {
                    return this.panel(_287, _288);
                }
            }
            _287 = _287 || {};
            return this.each(function () {
                var _28a = $.data(this, "window");
                if (_28a) {
                    $.extend(_28a.options, _287);
                } else {
                    _28a = $.data(this, "window", {options: $.extend({}, $.fn.window.defaults, $.fn.window.parseOptions(this), _287)});
                    if (!_28a.options.inline) {
                        document.body.appendChild(this);
                    }
                }
                _27d(this);
                _284(this);
            });
        };
        $.fn.window.methods = {
            options: function (jq) {
                var _28b = jq.panel("options");
                var _28c = $.data(jq[0], "window").options;
                return $.extend(_28c, {
                    closed: _28b.closed,
                    collapsed: _28b.collapsed,
                    minimized: _28b.minimized,
                    maximized: _28b.maximized
                });
            }, window: function (jq) {
                return $.data(jq[0], "window").window;
            }, move: function (jq, _28d) {
                return jq.each(function () {
                    _26f(this, _28d);
                });
            }, hcenter: function (jq) {
                return jq.each(function () {
                    _273(this, true);
                });
            }, vcenter: function (jq) {
                return jq.each(function () {
                    _278(this, true);
                });
            }, center: function (jq) {
                return jq.each(function () {
                    _273(this);
                    _278(this);
                    _26f(this);
                });
            }
        };
        $.fn.window.parseOptions = function (_28e) {
            return $.extend({}, $.fn.panel.parseOptions(_28e), $.parser.parseOptions(_28e, [{
                draggable: "boolean",
                resizable: "boolean",
                shadow: "boolean",
                modal: "boolean",
                inline: "boolean"
            }]));
        };
        $.fn.window.defaults = $.extend({}, $.fn.panel.defaults, {
            zIndex: 9000,
            draggable: true,
            resizable: true,
            shadow: true,
            modal: false,
            inline: false,
            title: "New Window",
            collapsible: true,
            minimizable: true,
            maximizable: true,
            closable: true,
            closed: false
        });
    })(jQuery);
    (function ($) {
        function _28f(_290) {
            var opts = $.data(_290, "dialog").options;
            opts.inited = false;
            $(_290).window($.extend({}, opts, {
                onResize: function (w, h) {
                    if (opts.inited) {
                        _295(this);
                        opts.onResize.call(this, w, h);
                    }
                }
            }));
            var win = $(_290).window("window");
            if (opts.toolbar) {
                if ($.isArray(opts.toolbar)) {
                    $(_290).siblings("div.dialog-toolbar").remove();
                    var _291 = $("<div class=\"dialog-toolbar\"><table cellspacing=\"0\" cellpadding=\"0\"><tr></tr></table></div>").appendTo(win);
                    var tr = _291.find("tr");
                    for (var i = 0; i < opts.toolbar.length; i++) {
                        var btn = opts.toolbar[i];
                        if (btn == "-") {
                            $("<td><div class=\"dialog-tool-separator\"></div></td>").appendTo(tr);
                        } else {
                            var td = $("<td></td>").appendTo(tr);
                            var tool = $("<a href=\"javascript:void(0)\"></a>").appendTo(td);
                            tool[0].onclick = eval(btn.handler || function () {
                                });
                            tool.linkbutton($.extend({}, btn, {plain: true}));
                        }
                    }
                } else {
                    $(opts.toolbar).addClass("dialog-toolbar").appendTo(win);
                    $(opts.toolbar).show();
                }
            } else {
                $(_290).siblings("div.dialog-toolbar").remove();
            }
            if (opts.buttons) {
                if ($.isArray(opts.buttons)) {
                    $(_290).siblings("div.dialog-button").remove();
                    var _292 = $("<div class=\"dialog-button\"></div>").appendTo(win);
                    for (var i = 0; i < opts.buttons.length; i++) {
                        var p = opts.buttons[i];
                        var _293 = $("<a href=\"javascript:void(0)\"></a>").appendTo(_292);
                        if (p.handler) {
                            _293[0].onclick = p.handler;
                        }
                        _293.linkbutton(p);
                    }
                } else {
                    $(opts.buttons).addClass("dialog-button").appendTo(win);
                    $(opts.buttons).show();
                }
            } else {
                $(_290).siblings("div.dialog-button").remove();
            }
            opts.inited = true;
            var _294 = opts.closed;
            win.show();
            $(_290).window("resize");
            if (_294) {
                win.hide();
            }
        };
        function _295(_296, _297) {
            var t = $(_296);
            var opts = t.dialog("options");
            var _298 = opts.noheader;
            var tb = t.siblings(".dialog-toolbar");
            var bb = t.siblings(".dialog-button");
            tb.insertBefore(_296).css({
                position: "relative",
                borderTopWidth: (_298 ? 1 : 0),
                top: (_298 ? tb.length : 0)
            });
            bb.insertAfter(_296).css({position: "relative", top: -1});
            tb.add(bb)._outerWidth(t._outerWidth()).find(".easyui-fluid:visible").each(function () {
                $(this).triggerHandler("_resize");
            });
            if (!isNaN(parseInt(opts.height))) {
                t._outerHeight(t._outerHeight() - tb._outerHeight() - bb._outerHeight());
            }
            var _299 = $.data(_296, "window").shadow;
            if (_299) {
                var cc = t.panel("panel");
                _299.css({width: cc._outerWidth(), height: cc._outerHeight()});
            }
        };
        $.fn.dialog = function (_29a, _29b) {
            if (typeof _29a == "string") {
                var _29c = $.fn.dialog.methods[_29a];
                if (_29c) {
                    return _29c(this, _29b);
                } else {
                    return this.window(_29a, _29b);
                }
            }
            _29a = _29a || {};
            return this.each(function () {
                var _29d = $.data(this, "dialog");
                if (_29d) {
                    $.extend(_29d.options, _29a);
                } else {
                    $.data(this, "dialog", {options: $.extend({}, $.fn.dialog.defaults, $.fn.dialog.parseOptions(this), _29a)});
                }
                _28f(this);
            });
        };
        $.fn.dialog.methods = {
            options: function (jq) {
                var _29e = $.data(jq[0], "dialog").options;
                var _29f = jq.panel("options");
                $.extend(_29e, {
                    width: _29f.width,
                    height: _29f.height,
                    left: _29f.left,
                    top: _29f.top,
                    closed: _29f.closed,
                    collapsed: _29f.collapsed,
                    minimized: _29f.minimized,
                    maximized: _29f.maximized
                });
                return _29e;
            }, dialog: function (jq) {
                return jq.window("window");
            }
        };
        $.fn.dialog.parseOptions = function (_2a0) {
            var t = $(_2a0);
            return $.extend({}, $.fn.window.parseOptions(_2a0), $.parser.parseOptions(_2a0, ["toolbar", "buttons"]), {
                toolbar: (t.children(".dialog-toolbar").length ? t.children(".dialog-toolbar").removeClass("dialog-toolbar") : undefined),
                buttons: (t.children(".dialog-button").length ? t.children(".dialog-button").removeClass("dialog-button") : undefined)
            });
        };
        $.fn.dialog.defaults = $.extend({}, $.fn.window.defaults, {
            title: "New Dialog",
            collapsible: false,
            minimizable: false,
            maximizable: false,
            resizable: false,
            toolbar: null,
            buttons: null
        });
    })(jQuery);
    (function ($) {
        function _2a1() {
            $(document).unbind(".messager").bind("keydown.messager", function (e) {
                if (e.keyCode == 27) {
                    $("body").children("div.messager-window").children("div.messager-body").each(function () {
                        $(this).window("close");
                    });
                } else {
                    if (e.keyCode == 9) {
                        var win = $("body").children("div.messager-window").children("div.messager-body");
                        if (!win.length) {
                            return;
                        }
                        var _2a2 = win.find(".messager-input,.messager-button .l-btn");
                        for (var i = 0; i < _2a2.length; i++) {
                            if ($(_2a2[i]).is(":focus")) {
                                $(_2a2[i >= _2a2.length - 1 ? 0 : i + 1]).focus();
                                return false;
                            }
                        }
                    }
                }
            });
        };
        function _2a3() {
            $(document).unbind(".messager");
        };
        function _2a4(_2a5) {
            var opts = $.extend({}, $.messager.defaults, {
                modal: false,
                shadow: false,
                draggable: false,
                resizable: false,
                closed: true,
                style: {
                    left: "",
                    top: "",
                    right: 0,
                    zIndex: $.fn.window.defaults.zIndex++,
                    bottom: -document.body.scrollTop - document.documentElement.scrollTop
                },
                title: "",
                width: 250,
                height: 100,
                showType: "slide",
                showSpeed: 600,
                msg: "",
                timeout: 4000
            }, _2a5);
            var win = $("<div class=\"messager-body\"></div>").html(opts.msg).appendTo("body");
            win.window($.extend({}, opts, {
                openAnimation: (opts.showType),
                closeAnimation: (opts.showType == "show" ? "hide" : opts.showType),
                openDuration: opts.showSpeed,
                closeDuration: opts.showSpeed,
                onOpen: function () {
                    win.window("window").hover(function () {
                        if (opts.timer) {
                            clearTimeout(opts.timer);
                        }
                    }, function () {
                        _2a6();
                    });
                    _2a6();
                    function _2a6() {
                        if (opts.timeout > 0) {
                            opts.timer = setTimeout(function () {
                                if (win.length && win.data("window")) {
                                    win.window("close");
                                }
                            }, opts.timeout);
                        }
                    };
                    if (_2a5.onOpen) {
                        _2a5.onOpen.call(this);
                    } else {
                        opts.onOpen.call(this);
                    }
                },
                onClose: function () {
                    if (opts.timer) {
                        clearTimeout(opts.timer);
                    }
                    if (_2a5.onClose) {
                        _2a5.onClose.call(this);
                    } else {
                        opts.onClose.call(this);
                    }
                    win.window("destroy");
                }
            }));
            win.window("window").css(opts.style);
            win.window("open");
            return win;
        };
        function _2a7(_2a8) {
            _2a1();
            var win = $("<div class=\"messager-body\"></div>").appendTo("body");
            win.window($.extend({}, _2a8, {
                doSize: false, noheader: (_2a8.title ? false : true), onClose: function () {
                    _2a3();
                    if (_2a8.onClose) {
                        _2a8.onClose.call(this);
                    }
                    setTimeout(function () {
                        win.window("destroy");
                    }, 100);
                }
            }));
            if (_2a8.buttons && _2a8.buttons.length) {
                var tb = $("<div class=\"messager-button\"></div>").appendTo(win);
                $.map(_2a8.buttons, function (btn) {
                    $("<a href=\"javascript:void(0)\" style=\"margin-left:10px\"></a>").appendTo(tb).linkbutton(btn);
                });
            }
            win.window("window").addClass("messager-window");
            win.window("resize");
            win.children("div.messager-button").children("a:first").focus();
            return win;
        };
        $.messager = {
            show: function (_2a9) {
                return _2a4(_2a9);
            }, alert: function (_2aa, msg, icon, fn) {
                var opts = typeof _2aa == "object" ? _2aa : {title: _2aa, msg: msg, icon: icon, fn: fn};
                var cls = opts.icon ? "messager-icon messager-" + opts.icon : "";
                opts = $.extend({}, $.messager.defaults, {
                    content: "<div class=\"" + cls + "\"></div>" + "<div>" + opts.msg + "</div>" + "<div style=\"clear:both;\"/>",
                    buttons: [{
                        text: $.messager.defaults.ok, onClick: function () {
                            win.window("close");
                            opts.fn();
                        }
                    }]
                }, opts);
                var win = _2a7(opts);
                return win;
            }, confirm: function (_2ab, msg, fn) {
                var opts = typeof _2ab == "object" ? _2ab : {title: _2ab, msg: msg, fn: fn};
                opts = $.extend({}, $.messager.defaults, {
                    content: "<div class=\"messager-icon messager-question\"></div>" + "<div>" + opts.msg + "</div>" + "<div style=\"clear:both;\"/>",
                    buttons: [{
                        text: $.messager.defaults.ok, onClick: function () {
                            win.window("close");
                            opts.fn(true);
                        }
                    }, {
                        text: $.messager.defaults.cancel, onClick: function () {
                            win.window("close");
                            opts.fn(false);
                        }
                    }]
                }, opts);
                var win = _2a7(opts);
                return win;
            }, prompt: function (_2ac, msg, fn) {
                var opts = typeof _2ac == "object" ? _2ac : {title: _2ac, msg: msg, fn: fn};
                opts = $.extend({}, $.messager.defaults, {
                    content: "<div class=\"messager-icon messager-question\"></div>" + "<div>" + opts.msg + "</div>" + "<br/>" + "<div style=\"clear:both;\"/>" + "<div><input class=\"messager-input\" type=\"text\"/></div>",
                    buttons: [{
                        text: $.messager.defaults.ok, onClick: function () {
                            win.window("close");
                            opts.fn(win.find(".messager-input").val());
                        }
                    }, {
                        text: $.messager.defaults.cancel, onClick: function () {
                            win.window("close");
                            opts.fn();
                        }
                    }]
                }, opts);
                var win = _2a7(opts);
                win.find("input.messager-input").focus();
                return win;
            }, progress: function (_2ad) {
                var _2ae = {
                    bar: function () {
                        return $("body>div.messager-window").find("div.messager-p-bar");
                    }, close: function () {
                        var win = $("body>div.messager-window>div.messager-body:has(div.messager-progress)");
                        if (win.length) {
                            win.window("close");
                        }
                    }
                };
                if (typeof _2ad == "string") {
                    var _2af = _2ae[_2ad];
                    return _2af();
                }
                var opts = $.extend({}, {
                    title: "",
                    content: undefined,
                    msg: "",
                    text: undefined,
                    interval: 300
                }, _2ad || {});
                var win = _2a7($.extend({}, $.messager.defaults, {
                    content: "<div class=\"messager-progress\"><div class=\"messager-p-msg\">" + opts.msg + "</div><div class=\"messager-p-bar\"></div></div>",
                    closable: false,
                    doSize: false
                }, opts, {
                    onClose: function () {
                        if (this.timer) {
                            clearInterval(this.timer);
                        }
                        if (_2ad.onClose) {
                            _2ad.onClose.call(this);
                        } else {
                            $.messager.defaults.onClose.call(this);
                        }
                    }
                }));
                var bar = win.find("div.messager-p-bar");
                bar.progressbar({text: opts.text});
                win.window("resize");
                if (opts.interval) {
                    win[0].timer = setInterval(function () {
                        var v = bar.progressbar("getValue");
                        v += 10;
                        if (v > 100) {
                            v = 0;
                        }
                        bar.progressbar("setValue", v);
                    }, opts.interval);
                }
                return win;
            }
        };
        $.messager.defaults = $.extend({}, $.fn.window.defaults, {
            ok: "确定",
            cancel: "取消",
            width: 300,
            height: "auto",
            modal: true,
            collapsible: false,
            minimizable: false,
            maximizable: false,
            resizable: false,
            fn: function () {
            }
        });
    })(jQuery);
    (function ($) {
        function _2b0(_2b1, _2b2) {
            var _2b3 = $.data(_2b1, "accordion");
            var opts = _2b3.options;
            var _2b4 = _2b3.panels;
            var cc = $(_2b1);
            if (_2b2) {
                $.extend(opts, {width: _2b2.width, height: _2b2.height});
            }
            cc._size(opts);
            var _2b5 = 0;
            var _2b6 = "auto";
            var _2b7 = cc.find(">.panel>.accordion-header");
            if (_2b7.length) {
                _2b5 = $(_2b7[0]).css("height", "")._outerHeight();
            }
            if (!isNaN(parseInt(opts.height))) {
                _2b6 = cc.height() - _2b5 * _2b7.length;
            }
            _2b8(true, _2b6 - _2b8(false) + 1);
            function _2b8(_2b9, _2ba) {
                var _2bb = 0;
                for (var i = 0; i < _2b4.length; i++) {
                    var p = _2b4[i];
                    var h = p.panel("header")._outerHeight(_2b5);
                    if (p.panel("options").collapsible == _2b9) {
                        var _2bc = isNaN(_2ba) ? undefined : (_2ba + _2b5 * h.length);
                        p.panel("resize", {width: cc.width(), height: (_2b9 ? _2bc : undefined)});
                        _2bb += p.panel("panel").outerHeight() - _2b5 * h.length;
                    }
                }
                return _2bb;
            };
        };
        function _2bd(_2be, _2bf, _2c0, all) {
            var _2c1 = $.data(_2be, "accordion").panels;
            var pp = [];
            for (var i = 0; i < _2c1.length; i++) {
                var p = _2c1[i];
                if (_2bf) {
                    if (p.panel("options")[_2bf] == _2c0) {
                        pp.push(p);
                    }
                } else {
                    if (p[0] == $(_2c0)[0]) {
                        return i;
                    }
                }
            }
            if (_2bf) {
                return all ? pp : (pp.length ? pp[0] : null);
            } else {
                return -1;
            }
        };
        function _2c2(_2c3) {
            return _2bd(_2c3, "collapsed", false, true);
        };
        function _2c4(_2c5) {
            var pp = _2c2(_2c5);
            return pp.length ? pp[0] : null;
        };
        function _2c6(_2c7, _2c8) {
            return _2bd(_2c7, null, _2c8);
        };
        function _2c9(_2ca, _2cb) {
            var _2cc = $.data(_2ca, "accordion").panels;
            if (typeof _2cb == "number") {
                if (_2cb < 0 || _2cb >= _2cc.length) {
                    return null;
                } else {
                    return _2cc[_2cb];
                }
            }
            return _2bd(_2ca, "title", _2cb);
        };
        function _2cd(_2ce) {
            var opts = $.data(_2ce, "accordion").options;
            var cc = $(_2ce);
            if (opts.border) {
                cc.removeClass("accordion-noborder");
            } else {
                cc.addClass("accordion-noborder");
            }
        };
        function init(_2cf) {
            var _2d0 = $.data(_2cf, "accordion");
            var cc = $(_2cf);
            cc.addClass("accordion");
            _2d0.panels = [];
            cc.children("div").each(function () {
                var opts = $.extend({}, $.parser.parseOptions(this), {selected: ($(this).attr("selected") ? true : undefined)});
                var pp = $(this);
                _2d0.panels.push(pp);
                _2d2(_2cf, pp, opts);
            });
            cc.bind("_resize", function (e, _2d1) {
                if ($(this).hasClass("easyui-fluid") || _2d1) {
                    _2b0(_2cf);
                }
                return false;
            });
        };
        function _2d2(_2d3, pp, _2d4) {
            var opts = $.data(_2d3, "accordion").options;
            pp.panel($.extend({}, {
                collapsible: true,
                minimizable: false,
                maximizable: false,
                closable: false,
                doSize: false,
                collapsed: true,
                headerCls: "accordion-header",
                bodyCls: "accordion-body"
            }, _2d4, {
                onBeforeExpand: function () {
                    if (_2d4.onBeforeExpand) {
                        if (_2d4.onBeforeExpand.call(this) == false) {
                            return false;
                        }
                    }
                    if (!opts.multiple) {
                        var all = $.grep(_2c2(_2d3), function (p) {
                            return p.panel("options").collapsible;
                        });
                        for (var i = 0; i < all.length; i++) {
                            _2dc(_2d3, _2c6(_2d3, all[i]));
                        }
                    }
                    var _2d5 = $(this).panel("header");
                    _2d5.addClass("accordion-header-selected");
                    _2d5.find(".accordion-collapse").removeClass("accordion-expand");
                }, onExpand: function () {
                    if (_2d4.onExpand) {
                        _2d4.onExpand.call(this);
                    }
                    opts.onSelect.call(_2d3, $(this).panel("options").title, _2c6(_2d3, this));
                }, onBeforeCollapse: function () {
                    if (_2d4.onBeforeCollapse) {
                        if (_2d4.onBeforeCollapse.call(this) == false) {
                            return false;
                        }
                    }
                    var _2d6 = $(this).panel("header");
                    _2d6.removeClass("accordion-header-selected");
                    _2d6.find(".accordion-collapse").addClass("accordion-expand");
                }, onCollapse: function () {
                    if (_2d4.onCollapse) {
                        _2d4.onCollapse.call(this);
                    }
                    opts.onUnselect.call(_2d3, $(this).panel("options").title, _2c6(_2d3, this));
                }
            }));
            var _2d7 = pp.panel("header");
            var tool = _2d7.children("div.panel-tool");
            tool.children("a.panel-tool-collapse").hide();
            var t = $("<a href=\"javascript:void(0)\"></a>").addClass("accordion-collapse accordion-expand").appendTo(tool);
            t.bind("click", function () {
                _2d8(pp);
                return false;
            });
            pp.panel("options").collapsible ? t.show() : t.hide();
            _2d7.click(function () {
                _2d8(pp);
                return false;
            });
            function _2d8(p) {
                var _2d9 = p.panel("options");
                if (_2d9.collapsible) {
                    var _2da = _2c6(_2d3, p);
                    if (_2d9.collapsed) {
                        _2db(_2d3, _2da);
                    } else {
                        _2dc(_2d3, _2da);
                    }
                }
            };
        };
        function _2db(_2dd, _2de) {
            var p = _2c9(_2dd, _2de);
            if (!p) {
                return;
            }
            _2df(_2dd);
            var opts = $.data(_2dd, "accordion").options;
            p.panel("expand", opts.animate);
        };
        function _2dc(_2e0, _2e1) {
            var p = _2c9(_2e0, _2e1);
            if (!p) {
                return;
            }
            _2df(_2e0);
            var opts = $.data(_2e0, "accordion").options;
            p.panel("collapse", opts.animate);
        };
        function _2e2(_2e3) {
            var opts = $.data(_2e3, "accordion").options;
            var p = _2bd(_2e3, "selected", true);
            if (p) {
                _2e4(_2c6(_2e3, p));
            } else {
                _2e4(opts.selected);
            }
            function _2e4(_2e5) {
                var _2e6 = opts.animate;
                opts.animate = false;
                _2db(_2e3, _2e5);
                opts.animate = _2e6;
            };
        };
        function _2df(_2e7) {
            var _2e8 = $.data(_2e7, "accordion").panels;
            for (var i = 0; i < _2e8.length; i++) {
                _2e8[i].stop(true, true);
            }
        };
        function add(_2e9, _2ea) {
            var _2eb = $.data(_2e9, "accordion");
            var opts = _2eb.options;
            var _2ec = _2eb.panels;
            if (_2ea.selected == undefined) {
                _2ea.selected = true;
            }
            _2df(_2e9);
            var pp = $("<div></div>").appendTo(_2e9);
            _2ec.push(pp);
            _2d2(_2e9, pp, _2ea);
            _2b0(_2e9);
            opts.onAdd.call(_2e9, _2ea.title, _2ec.length - 1);
            if (_2ea.selected) {
                _2db(_2e9, _2ec.length - 1);
            }
        };
        function _2ed(_2ee, _2ef) {
            var _2f0 = $.data(_2ee, "accordion");
            var opts = _2f0.options;
            var _2f1 = _2f0.panels;
            _2df(_2ee);
            var _2f2 = _2c9(_2ee, _2ef);
            var _2f3 = _2f2.panel("options").title;
            var _2f4 = _2c6(_2ee, _2f2);
            if (!_2f2) {
                return;
            }
            if (opts.onBeforeRemove.call(_2ee, _2f3, _2f4) == false) {
                return;
            }
            _2f1.splice(_2f4, 1);
            _2f2.panel("destroy");
            if (_2f1.length) {
                _2b0(_2ee);
                var curr = _2c4(_2ee);
                if (!curr) {
                    _2db(_2ee, 0);
                }
            }
            opts.onRemove.call(_2ee, _2f3, _2f4);
        };
        $.fn.accordion = function (_2f5, _2f6) {
            if (typeof _2f5 == "string") {
                return $.fn.accordion.methods[_2f5](this, _2f6);
            }
            _2f5 = _2f5 || {};
            return this.each(function () {
                var _2f7 = $.data(this, "accordion");
                if (_2f7) {
                    $.extend(_2f7.options, _2f5);
                } else {
                    $.data(this, "accordion", {
                        options: $.extend({}, $.fn.accordion.defaults, $.fn.accordion.parseOptions(this), _2f5),
                        accordion: $(this).addClass("accordion"),
                        panels: []
                    });
                    init(this);
                }
                _2cd(this);
                _2b0(this);
                _2e2(this);
            });
        };
        $.fn.accordion.methods = {
            options: function (jq) {
                return $.data(jq[0], "accordion").options;
            }, panels: function (jq) {
                return $.data(jq[0], "accordion").panels;
            }, resize: function (jq, _2f8) {
                return jq.each(function () {
                    _2b0(this, _2f8);
                });
            }, getSelections: function (jq) {
                return _2c2(jq[0]);
            }, getSelected: function (jq) {
                return _2c4(jq[0]);
            }, getPanel: function (jq, _2f9) {
                return _2c9(jq[0], _2f9);
            }, getPanelIndex: function (jq, _2fa) {
                return _2c6(jq[0], _2fa);
            }, select: function (jq, _2fb) {
                return jq.each(function () {
                    _2db(this, _2fb);
                });
            }, unselect: function (jq, _2fc) {
                return jq.each(function () {
                    _2dc(this, _2fc);
                });
            }, add: function (jq, _2fd) {
                return jq.each(function () {
                    add(this, _2fd);
                });
            }, remove: function (jq, _2fe) {
                return jq.each(function () {
                    _2ed(this, _2fe);
                });
            }
        };
        $.fn.accordion.parseOptions = function (_2ff) {
            var t = $(_2ff);
            return $.extend({}, $.parser.parseOptions(_2ff, ["width", "height", {
                fit: "boolean",
                border: "boolean",
                animate: "boolean",
                multiple: "boolean",
                selected: "number"
            }]));
        };
        $.fn.accordion.defaults = {
            width: "auto",
            height: "auto",
            fit: false,
            border: true,
            animate: true,
            multiple: false,
            selected: 0,
            onSelect: function (_300, _301) {
            },
            onUnselect: function (_302, _303) {
            },
            onAdd: function (_304, _305) {
            },
            onBeforeRemove: function (_306, _307) {
            },
            onRemove: function (_308, _309) {
            }
        };
    })(jQuery);
    (function ($) {
        function _30a(c) {
            var w = 0;
            $(c).children().each(function () {
                w += $(this).outerWidth(true);
            });
            return w;
        };
        function _30b(_30c) {
            var opts = $.data(_30c, "tabs").options;
            if (opts.tabPosition == "left" || opts.tabPosition == "right" || !opts.showHeader) {
                return;
            }
            var _30d = $(_30c).children("div.tabs-header");
            var tool = _30d.children("div.tabs-tool");
            var _30e = _30d.children("div.tabs-scroller-left");
            var _30f = _30d.children("div.tabs-scroller-right");
            var wrap = _30d.children("div.tabs-wrap");
            var _310 = _30d.outerHeight();
            if (opts.plain) {
                _310 -= _310 - _30d.height();
            }
            tool._outerHeight(_310);
            var _311 = _30a(_30d.find("ul.tabs"));
            var _312 = _30d.width() - tool._outerWidth();
            if (_311 > _312) {
                _30e.add(_30f).show()._outerHeight(_310);
                if (opts.toolPosition == "left") {
                    tool.css({left: _30e.outerWidth(), right: ""});
                    wrap.css({
                        marginLeft: _30e.outerWidth() + tool._outerWidth(),
                        marginRight: _30f._outerWidth(),
                        width: _312 - _30e.outerWidth() - _30f.outerWidth()
                    });
                } else {
                    tool.css({left: "", right: _30f.outerWidth()});
                    wrap.css({
                        marginLeft: _30e.outerWidth(),
                        marginRight: _30f.outerWidth() + tool._outerWidth(),
                        width: _312 - _30e.outerWidth() - _30f.outerWidth()
                    });
                }
            } else {
                _30e.add(_30f).hide();
                if (opts.toolPosition == "left") {
                    tool.css({left: 0, right: ""});
                    wrap.css({marginLeft: tool._outerWidth(), marginRight: 0, width: _312});
                } else {
                    tool.css({left: "", right: 0});
                    wrap.css({marginLeft: 0, marginRight: tool._outerWidth(), width: _312});
                }
            }
        };
        function _313(_314) {
            var opts = $.data(_314, "tabs").options;
            var _315 = $(_314).children("div.tabs-header");
            if (opts.tools) {
                if (typeof opts.tools == "string") {
                    $(opts.tools).addClass("tabs-tool").appendTo(_315);
                    $(opts.tools).show();
                } else {
                    _315.children("div.tabs-tool").remove();
                    var _316 = $("<div class=\"tabs-tool\"><table cellspacing=\"0\" cellpadding=\"0\" style=\"height:100%\"><tr></tr></table></div>").appendTo(_315);
                    var tr = _316.find("tr");
                    for (var i = 0; i < opts.tools.length; i++) {
                        var td = $("<td></td>").appendTo(tr);
                        var tool = $("<a href=\"javascript:void(0);\"></a>").appendTo(td);
                        tool[0].onclick = eval(opts.tools[i].handler || function () {
                            });
                        tool.linkbutton($.extend({}, opts.tools[i], {plain: true}));
                    }
                }
            } else {
                _315.children("div.tabs-tool").remove();
            }
        };
        function _317(_318, _319) {
            var _31a = $.data(_318, "tabs");
            var opts = _31a.options;
            var cc = $(_318);
            if (!opts.doSize) {
                return;
            }
            if (_319) {
                $.extend(opts, {width: _319.width, height: _319.height});
            }
            cc._size(opts);
            var _31b = cc.children("div.tabs-header");
            var _31c = cc.children("div.tabs-panels");
            var wrap = _31b.find("div.tabs-wrap");
            var ul = wrap.find(".tabs");
            ul.children("li").removeClass("tabs-first tabs-last");
            ul.children("li:first").addClass("tabs-first");
            ul.children("li:last").addClass("tabs-last");
            if (opts.tabPosition == "left" || opts.tabPosition == "right") {
                _31b._outerWidth(opts.showHeader ? opts.headerWidth : 0);
                _31c._outerWidth(cc.width() - _31b.outerWidth());
                _31b.add(_31c)._outerHeight(opts.height);
                wrap._outerWidth(_31b.width());
                ul._outerWidth(wrap.width()).css("height", "");
            } else {
                _31b.children("div.tabs-scroller-left,div.tabs-scroller-right,div.tabs-tool").css("display", opts.showHeader ? "block" : "none");
                _31b._outerWidth(cc.width()).css("height", "");
                if (opts.showHeader) {
                    _31b.css("background-color", "");
                    wrap.css("height", "");
                } else {
                    _31b.css("background-color", "transparent");
                    _31b._outerHeight(0);
                    wrap._outerHeight(0);
                }
                ul._outerHeight(opts.tabHeight).css("width", "");
                ul._outerHeight(ul.outerHeight() - ul.height() - 1 + opts.tabHeight).css("width", "");
                _31c._size("height", isNaN(opts.height) ? "" : (opts.height - _31b.outerHeight()));
                _31c._size("width", isNaN(opts.width) ? "" : opts.width);
            }
            if (_31a.tabs.length) {
                var d1 = ul.outerWidth(true) - ul.width();
                var li = ul.children("li:first");
                var d2 = li.outerWidth(true) - li.width();
                var _31d = _31b.width() - _31b.children(".tabs-tool")._outerWidth();
                var _31e = Math.floor((_31d - d1 - d2 * _31a.tabs.length) / _31a.tabs.length);
                $.map(_31a.tabs, function (p) {
                    _31f(p, (opts.justified && $.inArray(opts.tabPosition, ["top", "bottom"]) >= 0) ? _31e : undefined);
                });
                if (opts.justified && $.inArray(opts.tabPosition, ["top", "bottom"]) >= 0) {
                    var _320 = _31d - d1 - _30a(ul);
                    _31f(_31a.tabs[_31a.tabs.length - 1], _31e + _320);
                }
            }
            _30b(_318);
            function _31f(p, _321) {
                var _322 = p.panel("options");
                var p_t = _322.tab.find("a.tabs-inner");
                var _321 = _321 ? _321 : (parseInt(_322.tabWidth || opts.tabWidth || undefined));
                if (_321) {
                    p_t._outerWidth(_321);
                } else {
                    p_t.css("width", "");
                }
                p_t._outerHeight(opts.tabHeight);
                p_t.css("lineHeight", p_t.height() + "px");
                p_t.find(".easyui-fluid:visible").triggerHandler("_resize");
            };
        };
        function _323(_324) {
            var opts = $.data(_324, "tabs").options;
            var tab = _325(_324);
            if (tab) {
                var _326 = $(_324).children("div.tabs-panels");
                var _327 = opts.width == "auto" ? "auto" : _326.width();
                var _328 = opts.height == "auto" ? "auto" : _326.height();
                tab.panel("resize", {width: _327, height: _328});
            }
        };
        function _329(_32a) {
            var tabs = $.data(_32a, "tabs").tabs;
            var cc = $(_32a).addClass("tabs-container");
            var _32b = $("<div class=\"tabs-panels\"></div>").insertBefore(cc);
            cc.children("div").each(function () {
                _32b[0].appendChild(this);
            });
            cc[0].appendChild(_32b[0]);
            $("<div class=\"tabs-header\">" + "<div class=\"tabs-scroller-left\"></div>" + "<div class=\"tabs-scroller-right\"></div>" + "<div class=\"tabs-wrap\">" + "<ul class=\"tabs\"></ul>" + "</div>" + "</div>").prependTo(_32a);
            cc.children("div.tabs-panels").children("div").each(function (i) {
                var opts = $.extend({}, $.parser.parseOptions(this), {selected: ($(this).attr("selected") ? true : undefined)});
                _338(_32a, opts, $(this));
            });
            cc.children("div.tabs-header").find(".tabs-scroller-left, .tabs-scroller-right").hover(function () {
                $(this).addClass("tabs-scroller-over");
            }, function () {
                $(this).removeClass("tabs-scroller-over");
            });
            cc.bind("_resize", function (e, _32c) {
                if ($(this).hasClass("easyui-fluid") || _32c) {
                    _317(_32a);
                    _323(_32a);
                }
                return false;
            });
        };
        function _32d(_32e) {
            var _32f = $.data(_32e, "tabs");
            var opts = _32f.options;
            $(_32e).children("div.tabs-header").unbind().bind("click", function (e) {
                if ($(e.target).hasClass("tabs-scroller-left")) {
                    $(_32e).tabs("scrollBy", -opts.scrollIncrement);
                } else {
                    if ($(e.target).hasClass("tabs-scroller-right")) {
                        $(_32e).tabs("scrollBy", opts.scrollIncrement);
                    } else {
                        var li = $(e.target).closest("li");
                        if (li.hasClass("tabs-disabled")) {
                            return false;
                        }
                        var a = $(e.target).closest("a.tabs-close");
                        if (a.length) {
                            _351(_32e, _330(li));
                        } else {
                            if (li.length) {
                                var _331 = _330(li);
                                var _332 = _32f.tabs[_331].panel("options");
                                if (_332.collapsible) {
                                    _332.closed ? _348(_32e, _331) : _365(_32e, _331);
                                } else {
                                    _348(_32e, _331);
                                }
                            }
                        }
                        return false;
                    }
                }
            }).bind("contextmenu", function (e) {
                var li = $(e.target).closest("li");
                if (li.hasClass("tabs-disabled")) {
                    return;
                }
                if (li.length) {
                    opts.onContextMenu.call(_32e, e, li.find("span.tabs-title").html(), _330(li));
                }
            });
            function _330(li) {
                var _333 = 0;
                li.parent().children("li").each(function (i) {
                    if (li[0] == this) {
                        _333 = i;
                        return false;
                    }
                });
                return _333;
            };
        };
        function _334(_335) {
            var opts = $.data(_335, "tabs").options;
            var _336 = $(_335).children("div.tabs-header");
            var _337 = $(_335).children("div.tabs-panels");
            _336.removeClass("tabs-header-top tabs-header-bottom tabs-header-left tabs-header-right");
            _337.removeClass("tabs-panels-top tabs-panels-bottom tabs-panels-left tabs-panels-right");
            if (opts.tabPosition == "top") {
                _336.insertBefore(_337);
            } else {
                if (opts.tabPosition == "bottom") {
                    _336.insertAfter(_337);
                    _336.addClass("tabs-header-bottom");
                    _337.addClass("tabs-panels-top");
                } else {
                    if (opts.tabPosition == "left") {
                        _336.addClass("tabs-header-left");
                        _337.addClass("tabs-panels-right");
                    } else {
                        if (opts.tabPosition == "right") {
                            _336.addClass("tabs-header-right");
                            _337.addClass("tabs-panels-left");
                        }
                    }
                }
            }
            if (opts.plain == true) {
                _336.addClass("tabs-header-plain");
            } else {
                _336.removeClass("tabs-header-plain");
            }
            _336.removeClass("tabs-header-narrow").addClass(opts.narrow ? "tabs-header-narrow" : "");
            var tabs = _336.find(".tabs");
            tabs.removeClass("tabs-pill").addClass(opts.pill ? "tabs-pill" : "");
            tabs.removeClass("tabs-narrow").addClass(opts.narrow ? "tabs-narrow" : "");
            tabs.removeClass("tabs-justified").addClass(opts.justified ? "tabs-justified" : "");
            if (opts.border == true) {
                _336.removeClass("tabs-header-noborder");
                _337.removeClass("tabs-panels-noborder");
            } else {
                _336.addClass("tabs-header-noborder");
                _337.addClass("tabs-panels-noborder");
            }
            opts.doSize = true;
        };
        function _338(_339, _33a, pp) {
            _33a = _33a || {};
            var _33b = $.data(_339, "tabs");
            var tabs = _33b.tabs;
            if (_33a.index == undefined || _33a.index > tabs.length) {
                _33a.index = tabs.length;
            }
            if (_33a.index < 0) {
                _33a.index = 0;
            }
            var ul = $(_339).children("div.tabs-header").find("ul.tabs");
            var _33c = $(_339).children("div.tabs-panels");
            var tab = $("<li>" + "<a href=\"javascript:void(0)\" class=\"tabs-inner\">" + "<span class=\"tabs-title\"></span>" + "<span class=\"tabs-icon\"></span>" + "</a>" + "</li>");
            if (!pp) {
                pp = $("<div></div>");
            }
            if (_33a.index >= tabs.length) {
                tab.appendTo(ul);
                pp.appendTo(_33c);
                tabs.push(pp);
            } else {
                tab.insertBefore(ul.children("li:eq(" + _33a.index + ")"));
                pp.insertBefore(_33c.children("div.panel:eq(" + _33a.index + ")"));
                tabs.splice(_33a.index, 0, pp);
            }
            pp.panel($.extend({}, _33a, {
                tab: tab,
                border: false,
                noheader: true,
                closed: true,
                doSize: false,
                iconCls: (_33a.icon ? _33a.icon : undefined),
                onLoad: function () {
                    if (_33a.onLoad) {
                        _33a.onLoad.call(this, arguments);
                    }
                    _33b.options.onLoad.call(_339, $(this));
                },
                onBeforeOpen: function () {
                    if (_33a.onBeforeOpen) {
                        if (_33a.onBeforeOpen.call(this) == false) {
                            return false;
                        }
                    }
                    var p = $(_339).tabs("getSelected");
                    if (p) {
                        if (p[0] != this) {
                            $(_339).tabs("unselect", _343(_339, p));
                            p = $(_339).tabs("getSelected");
                            if (p) {
                                return false;
                            }
                        } else {
                            _323(_339);
                            return false;
                        }
                    }
                    var _33d = $(this).panel("options");
                    _33d.tab.addClass("tabs-selected");
                    var wrap = $(_339).find(">div.tabs-header>div.tabs-wrap");
                    var left = _33d.tab.position().left;
                    var _33e = left + _33d.tab.outerWidth();
                    if (left < 0 || _33e > wrap.width()) {
                        var _33f = left - (wrap.width() - _33d.tab.width()) / 2;
                        $(_339).tabs("scrollBy", _33f);
                    } else {
                        $(_339).tabs("scrollBy", 0);
                    }
                    var _340 = $(this).panel("panel");
                    _340.css("display", "block");
                    _323(_339);
                    _340.css("display", "none");
                },
                onOpen: function () {
                    if (_33a.onOpen) {
                        _33a.onOpen.call(this);
                    }
                    var _341 = $(this).panel("options");
                    _33b.selectHis.push(_341.title);
                    _33b.options.onSelect.call(_339, _341.title, _343(_339, this));
                },
                onBeforeClose: function () {
                    if (_33a.onBeforeClose) {
                        if (_33a.onBeforeClose.call(this) == false) {
                            return false;
                        }
                    }
                    $(this).panel("options").tab.removeClass("tabs-selected");
                },
                onClose: function () {
                    if (_33a.onClose) {
                        _33a.onClose.call(this);
                    }
                    var _342 = $(this).panel("options");
                    _33b.options.onUnselect.call(_339, _342.title, _343(_339, this));
                }
            }));
            $(_339).tabs("update", {tab: pp, options: pp.panel("options"), type: "header"});
        };
        function _344(_345, _346) {
            var _347 = $.data(_345, "tabs");
            var opts = _347.options;
            if (_346.selected == undefined) {
                _346.selected = true;
            }
            _338(_345, _346);
            opts.onAdd.call(_345, _346.title, _346.index);
            if (_346.selected) {
                _348(_345, _346.index);
            }
        };
        function _349(_34a, _34b) {
            _34b.type = _34b.type || "all";
            var _34c = $.data(_34a, "tabs").selectHis;
            var pp = _34b.tab;
            var _34d = pp.panel("options").title;
            if (_34b.type == "all" || _34b == "body") {
                pp.panel($.extend({}, _34b.options, {iconCls: (_34b.options.icon ? _34b.options.icon : undefined)}));
            }
            if (_34b.type == "all" || _34b.type == "header") {
                var opts = pp.panel("options");
                var tab = opts.tab;
                if (opts.header) {
                    tab.find(".tabs-inner").html($(opts.header));
                } else {
                    var _34e = tab.find("span.tabs-title");
                    var _34f = tab.find("span.tabs-icon");
                    _34e.html(opts.title);
                    _34f.attr("class", "tabs-icon");
                    tab.find("a.tabs-close").remove();
                    if (opts.closable) {
                        _34e.addClass("tabs-closable");
                        $("<a href=\"javascript:void(0)\" class=\"tabs-close\"></a>").appendTo(tab);
                    } else {
                        _34e.removeClass("tabs-closable");
                    }
                    if (opts.iconCls) {
                        _34e.addClass("tabs-with-icon");
                        _34f.addClass(opts.iconCls);
                    } else {
                        _34e.removeClass("tabs-with-icon");
                    }
                    if (opts.tools) {
                        var _350 = tab.find("span.tabs-p-tool");
                        if (!_350.length) {
                            var _350 = $("<span class=\"tabs-p-tool\"></span>").insertAfter(tab.find("a.tabs-inner"));
                        }
                        if ($.isArray(opts.tools)) {
                            for (var i = 0; i < opts.tools.length; i++) {
                                var t = $("<a href=\"javascript:void(0)\"></a>").appendTo(_350);
                                t.addClass(opts.tools[i].iconCls);
                                if (opts.tools[i].handler) {
                                    t.bind("click", {handler: opts.tools[i].handler}, function (e) {
                                        if ($(this).parents("li").hasClass("tabs-disabled")) {
                                            return;
                                        }
                                        e.data.handler.call(this);
                                    });
                                }
                            }
                        } else {
                            $(opts.tools).children().appendTo(_350);
                        }
                        var pr = _350.children().length * 12;
                        if (opts.closable) {
                            pr += 8;
                        } else {
                            pr -= 3;
                            _350.css("right", "5px");
                        }
                        _34e.css("padding-right", pr + "px");
                    } else {
                        tab.find("span.tabs-p-tool").remove();
                        _34e.css("padding-right", "");
                    }
                }
                if (_34d != opts.title) {
                    for (var i = 0; i < _34c.length; i++) {
                        if (_34c[i] == _34d) {
                            _34c[i] = opts.title;
                        }
                    }
                }
            }
            _317(_34a);
            $.data(_34a, "tabs").options.onUpdate.call(_34a, opts.title, _343(_34a, pp));
        };
        function _351(_352, _353) {
            var opts = $.data(_352, "tabs").options;
            var tabs = $.data(_352, "tabs").tabs;
            var _354 = $.data(_352, "tabs").selectHis;
            if (!_355(_352, _353)) {
                return;
            }
            var tab = _356(_352, _353);
            var _357 = tab.panel("options").title;
            var _358 = _343(_352, tab);
            if (opts.onBeforeClose.call(_352, _357, _358) == false) {
                return;
            }
            var tab = _356(_352, _353, true);
            tab.panel("options").tab.remove();
            tab.panel("destroy");
            opts.onClose.call(_352, _357, _358);
            _317(_352);
            for (var i = 0; i < _354.length; i++) {
                if (_354[i] == _357) {
                    _354.splice(i, 1);
                    i--;
                }
            }
            var _359 = _354.pop();
            if (_359) {
                _348(_352, _359);
            } else {
                if (tabs.length) {
                    _348(_352, 0);
                }
            }
        };
        function _356(_35a, _35b, _35c) {
            var tabs = $.data(_35a, "tabs").tabs;
            if (typeof _35b == "number") {
                if (_35b < 0 || _35b >= tabs.length) {
                    return null;
                } else {
                    var tab = tabs[_35b];
                    if (_35c) {
                        tabs.splice(_35b, 1);
                    }
                    return tab;
                }
            }
            for (var i = 0; i < tabs.length; i++) {
                var tab = tabs[i];
                if (tab.panel("options").title == _35b) {
                    if (_35c) {
                        tabs.splice(i, 1);
                    }
                    return tab;
                }
            }
            return null;
        };
        function _343(_35d, tab) {
            var tabs = $.data(_35d, "tabs").tabs;
            for (var i = 0; i < tabs.length; i++) {
                if (tabs[i][0] == $(tab)[0]) {
                    return i;
                }
            }
            return -1;
        };
        function _325(_35e) {
            var tabs = $.data(_35e, "tabs").tabs;
            for (var i = 0; i < tabs.length; i++) {
                var tab = tabs[i];
                if (tab.panel("options").tab.hasClass("tabs-selected")) {
                    return tab;
                }
            }
            return null;
        };
        function _35f(_360) {
            var _361 = $.data(_360, "tabs");
            var tabs = _361.tabs;
            for (var i = 0; i < tabs.length; i++) {
                if (tabs[i].panel("options").selected) {
                    _348(_360, i);
                    return;
                }
            }
            _348(_360, _361.options.selected);
        };
        function _348(_362, _363) {
            var p = _356(_362, _363);
            if (p && !p.is(":visible")) {
                _364(_362);
                p.panel("open");
            }
        };
        function _365(_366, _367) {
            var p = _356(_366, _367);
            if (p && p.is(":visible")) {
                _364(_366);
                p.panel("close");
            }
        };
        function _364(_368) {
            $(_368).children("div.tabs-panels").each(function () {
                $(this).stop(true, true);
            });
        };
        function _355(_369, _36a) {
            return _356(_369, _36a) != null;
        };
        function _36b(_36c, _36d) {
            var opts = $.data(_36c, "tabs").options;
            opts.showHeader = _36d;
            $(_36c).tabs("resize");
        };
        $.fn.tabs = function (_36e, _36f) {
            if (typeof _36e == "string") {
                return $.fn.tabs.methods[_36e](this, _36f);
            }
            _36e = _36e || {};
            return this.each(function () {
                var _370 = $.data(this, "tabs");
                if (_370) {
                    $.extend(_370.options, _36e);
                } else {
                    $.data(this, "tabs", {
                        options: $.extend({}, $.fn.tabs.defaults, $.fn.tabs.parseOptions(this), _36e),
                        tabs: [],
                        selectHis: []
                    });
                    _329(this);
                }
                _313(this);
                _334(this);
                _317(this);
                _32d(this);
                _35f(this);
            });
        };
        $.fn.tabs.methods = {
            options: function (jq) {
                var cc = jq[0];
                var opts = $.data(cc, "tabs").options;
                var s = _325(cc);
                opts.selected = s ? _343(cc, s) : -1;
                return opts;
            }, tabs: function (jq) {
                return $.data(jq[0], "tabs").tabs;
            }, resize: function (jq, _371) {
                return jq.each(function () {
                    _317(this, _371);
                    _323(this);
                });
            }, add: function (jq, _372) {
                return jq.each(function () {
                    _344(this, _372);
                });
            }, close: function (jq, _373) {
                return jq.each(function () {
                    _351(this, _373);
                });
            }, getTab: function (jq, _374) {
                return _356(jq[0], _374);
            }, getTabIndex: function (jq, tab) {
                return _343(jq[0], tab);
            }, getSelected: function (jq) {
                return _325(jq[0]);
            }, select: function (jq, _375) {
                return jq.each(function () {
                    _348(this, _375);
                });
            }, unselect: function (jq, _376) {
                return jq.each(function () {
                    _365(this, _376);
                });
            }, exists: function (jq, _377) {
                return _355(jq[0], _377);
            }, update: function (jq, _378) {
                return jq.each(function () {
                    _349(this, _378);
                });
            }, enableTab: function (jq, _379) {
                return jq.each(function () {
                    $(this).tabs("getTab", _379).panel("options").tab.removeClass("tabs-disabled");
                });
            }, disableTab: function (jq, _37a) {
                return jq.each(function () {
                    $(this).tabs("getTab", _37a).panel("options").tab.addClass("tabs-disabled");
                });
            }, showHeader: function (jq) {
                return jq.each(function () {
                    _36b(this, true);
                });
            }, hideHeader: function (jq) {
                return jq.each(function () {
                    _36b(this, false);
                });
            }, scrollBy: function (jq, _37b) {
                return jq.each(function () {
                    var opts = $(this).tabs("options");
                    var wrap = $(this).find(">div.tabs-header>div.tabs-wrap");
                    var pos = Math.min(wrap._scrollLeft() + _37b, _37c());
                    wrap.animate({scrollLeft: pos}, opts.scrollDuration);
                    function _37c() {
                        var w = 0;
                        var ul = wrap.children("ul");
                        ul.children("li").each(function () {
                            w += $(this).outerWidth(true);
                        });
                        return w - wrap.width() + (ul.outerWidth() - ul.width());
                    };
                });
            }
        };
        $.fn.tabs.parseOptions = function (_37d) {
            return $.extend({}, $.parser.parseOptions(_37d, ["tools", "toolPosition", "tabPosition", {
                fit: "boolean",
                border: "boolean",
                plain: "boolean"
            }, {
                headerWidth: "number",
                tabWidth: "number",
                tabHeight: "number",
                selected: "number"
            }, {showHeader: "boolean", justified: "boolean", narrow: "boolean", pill: "boolean"}]));
        };
        $.fn.tabs.defaults = {
            width: "auto",
            height: "auto",
            headerWidth: 150,
            tabWidth: "auto",
            tabHeight: 27,
            selected: 0,
            showHeader: true,
            plain: false,
            fit: false,
            border: true,
            justified: false,
            narrow: false,
            pill: false,
            tools: null,
            toolPosition: "right",
            tabPosition: "top",
            scrollIncrement: 100,
            scrollDuration: 400,
            onLoad: function (_37e) {
            },
            onSelect: function (_37f, _380) {
            },
            onUnselect: function (_381, _382) {
            },
            onBeforeClose: function (_383, _384) {
            },
            onClose: function (_385, _386) {
            },
            onAdd: function (_387, _388) {
            },
            onUpdate: function (_389, _38a) {
            },
            onContextMenu: function (e, _38b, _38c) {
            }
        };
    })(jQuery);
    (function ($) {
        var _38d = false;

        function _38e(_38f, _390) {
            var _391 = $.data(_38f, "layout");
            var opts = _391.options;
            var _392 = _391.panels;
            var cc = $(_38f);
            if (_390) {
                $.extend(opts, {width: _390.width, height: _390.height});
            }
            if (_38f.tagName.toLowerCase() == "body") {
                cc._size("fit");
            } else {
                cc._size(opts);
            }
            var cpos = {top: 0, left: 0, width: cc.width(), height: cc.height()};
            _393(_394(_392.expandNorth) ? _392.expandNorth : _392.north, "n");
            _393(_394(_392.expandSouth) ? _392.expandSouth : _392.south, "s");
            _395(_394(_392.expandEast) ? _392.expandEast : _392.east, "e");
            _395(_394(_392.expandWest) ? _392.expandWest : _392.west, "w");
            _392.center.panel("resize", cpos);
            function _393(pp, type) {
                if (!pp.length || !_394(pp)) {
                    return;
                }
                var opts = pp.panel("options");
                pp.panel("resize", {width: cc.width(), height: opts.height});
                var _396 = pp.panel("panel").outerHeight();
                pp.panel("move", {left: 0, top: (type == "n" ? 0 : cc.height() - _396)});
                cpos.height -= _396;
                if (type == "n") {
                    cpos.top += _396;
                    if (!opts.split && opts.border) {
                        cpos.top--;
                    }
                }
                if (!opts.split && opts.border) {
                    cpos.height++;
                }
            };
            function _395(pp, type) {
                if (!pp.length || !_394(pp)) {
                    return;
                }
                var opts = pp.panel("options");
                pp.panel("resize", {width: opts.width, height: cpos.height});
                var _397 = pp.panel("panel").outerWidth();
                pp.panel("move", {left: (type == "e" ? cc.width() - _397 : 0), top: cpos.top});
                cpos.width -= _397;
                if (type == "w") {
                    cpos.left += _397;
                    if (!opts.split && opts.border) {
                        cpos.left--;
                    }
                }
                if (!opts.split && opts.border) {
                    cpos.width++;
                }
            };
        };
        function init(_398) {
            var cc = $(_398);
            cc.addClass("layout");
            function _399(cc) {
                cc.children("div").each(function () {
                    var opts = $.fn.layout.parsePanelOptions(this);
                    if ("north,south,east,west,center".indexOf(opts.region) >= 0) {
                        _39b(_398, opts, this);
                    }
                });
            };
            cc.children("form").length ? _399(cc.children("form")) : _399(cc);
            cc.append("<div class=\"layout-split-proxy-h\"></div><div class=\"layout-split-proxy-v\"></div>");
            cc.bind("_resize", function (e, _39a) {
                if ($(this).hasClass("easyui-fluid") || _39a) {
                    _38e(_398);
                }
                return false;
            });
        };
        function _39b(_39c, _39d, el) {
            _39d.region = _39d.region || "center";
            var _39e = $.data(_39c, "layout").panels;
            var cc = $(_39c);
            var dir = _39d.region;
            if (_39e[dir].length) {
                return;
            }
            var pp = $(el);
            if (!pp.length) {
                pp = $("<div></div>").appendTo(cc);
            }
            var _39f = $.extend({}, $.fn.layout.paneldefaults, {
                width: (pp.length ? parseInt(pp[0].style.width) || pp.outerWidth() : "auto"),
                height: (pp.length ? parseInt(pp[0].style.height) || pp.outerHeight() : "auto"),
                doSize: false,
                collapsible: true,
                cls: ("layout-panel layout-panel-" + dir),
                bodyCls: "layout-body",
                onOpen: function () {
                    var tool = $(this).panel("header").children("div.panel-tool");
                    tool.children("a.panel-tool-collapse").hide();
                    var _3a0 = {north: "up", south: "down", east: "right", west: "left"};
                    if (!_3a0[dir]) {
                        return;
                    }
                    var _3a1 = "layout-button-" + _3a0[dir];
                    var t = tool.children("a." + _3a1);
                    if (!t.length) {
                        t = $("<a href=\"javascript:void(0)\"></a>").addClass(_3a1).appendTo(tool);
                        t.bind("click", {dir: dir}, function (e) {
                            _3ad(_39c, e.data.dir);
                            return false;
                        });
                    }
                    $(this).panel("options").collapsible ? t.show() : t.hide();
                }
            }, _39d);
            pp.panel(_39f);
            _39e[dir] = pp;
            var _3a2 = {north: "s", south: "n", east: "w", west: "e"};
            var _3a3 = pp.panel("panel");
            if (pp.panel("options").split) {
                _3a3.addClass("layout-split-" + dir);
            }
            _3a3.resizable($.extend({}, {
                handles: (_3a2[dir] || ""), disabled: (!pp.panel("options").split), onStartResize: function (e) {
                    _38d = true;
                    if (dir == "north" || dir == "south") {
                        var _3a4 = $(">div.layout-split-proxy-v", _39c);
                    } else {
                        var _3a4 = $(">div.layout-split-proxy-h", _39c);
                    }
                    var top = 0, left = 0, _3a5 = 0, _3a6 = 0;
                    var pos = {display: "block"};
                    if (dir == "north") {
                        pos.top = parseInt(_3a3.css("top")) + _3a3.outerHeight() - _3a4.height();
                        pos.left = parseInt(_3a3.css("left"));
                        pos.width = _3a3.outerWidth();
                        pos.height = _3a4.height();
                    } else {
                        if (dir == "south") {
                            pos.top = parseInt(_3a3.css("top"));
                            pos.left = parseInt(_3a3.css("left"));
                            pos.width = _3a3.outerWidth();
                            pos.height = _3a4.height();
                        } else {
                            if (dir == "east") {
                                pos.top = parseInt(_3a3.css("top")) || 0;
                                pos.left = parseInt(_3a3.css("left")) || 0;
                                pos.width = _3a4.width();
                                pos.height = _3a3.outerHeight();
                            } else {
                                if (dir == "west") {
                                    pos.top = parseInt(_3a3.css("top")) || 0;
                                    pos.left = _3a3.outerWidth() - _3a4.width();
                                    pos.width = _3a4.width();
                                    pos.height = _3a3.outerHeight();
                                }
                            }
                        }
                    }
                    _3a4.css(pos);
                    $("<div class=\"layout-mask\"></div>").css({
                        left: 0,
                        top: 0,
                        width: cc.width(),
                        height: cc.height()
                    }).appendTo(cc);
                }, onResize: function (e) {
                    if (dir == "north" || dir == "south") {
                        var _3a7 = $(">div.layout-split-proxy-v", _39c);
                        _3a7.css("top", e.pageY - $(_39c).offset().top - _3a7.height() / 2);
                    } else {
                        var _3a7 = $(">div.layout-split-proxy-h", _39c);
                        _3a7.css("left", e.pageX - $(_39c).offset().left - _3a7.width() / 2);
                    }
                    return false;
                }, onStopResize: function (e) {
                    cc.children("div.layout-split-proxy-v,div.layout-split-proxy-h").hide();
                    pp.panel("resize", e.data);
                    _38e(_39c);
                    _38d = false;
                    cc.find(">div.layout-mask").remove();
                }
            }, _39d));
        };
        function _3a8(_3a9, _3aa) {
            var _3ab = $.data(_3a9, "layout").panels;
            if (_3ab[_3aa].length) {
                _3ab[_3aa].panel("destroy");
                _3ab[_3aa] = $();
                var _3ac = "expand" + _3aa.substring(0, 1).toUpperCase() + _3aa.substring(1);
                if (_3ab[_3ac]) {
                    _3ab[_3ac].panel("destroy");
                    _3ab[_3ac] = undefined;
                }
            }
        };
        function _3ad(_3ae, _3af, _3b0) {
            if (_3b0 == undefined) {
                _3b0 = "normal";
            }
            var _3b1 = $.data(_3ae, "layout").panels;
            var p = _3b1[_3af];
            var _3b2 = p.panel("options");
            if (_3b2.onBeforeCollapse.call(p) == false) {
                return;
            }
            var _3b3 = "expand" + _3af.substring(0, 1).toUpperCase() + _3af.substring(1);
            if (!_3b1[_3b3]) {
                _3b1[_3b3] = _3b4(_3af);
                _3b1[_3b3].panel("panel").bind("click", function () {
                    p.panel("expand", false).panel("open");
                    var _3b5 = _3b6();
                    p.panel("resize", _3b5.collapse);
                    p.panel("panel").animate(_3b5.expand, function () {
                        $(this).unbind(".layout").bind("mouseleave.layout", {region: _3af}, function (e) {
                            if (_38d == true) {
                                return;
                            }
                            if ($("body>div.combo-p>div.combo-panel:visible").length) {
                                return;
                            }
                            _3ad(_3ae, e.data.region);
                        });
                    });
                    return false;
                });
            }
            var _3b7 = _3b6();
            if (!_394(_3b1[_3b3])) {
                _3b1.center.panel("resize", _3b7.resizeC);
            }
            p.panel("panel").animate(_3b7.collapse, _3b0, function () {
                p.panel("collapse", false).panel("close");
                _3b1[_3b3].panel("open").panel("resize", _3b7.expandP);
                $(this).unbind(".layout");
            });
            function _3b4(dir) {
                var icon;
                if (dir == "east") {
                    icon = "layout-button-left";
                } else {
                    if (dir == "west") {
                        icon = "layout-button-right";
                    } else {
                        if (dir == "north") {
                            icon = "layout-button-down";
                        } else {
                            if (dir == "south") {
                                icon = "layout-button-up";
                            }
                        }
                    }
                }
                var p = $("<div></div>").appendTo(_3ae);
                p.panel($.extend({}, $.fn.layout.paneldefaults, {
                    cls: ("layout-expand layout-expand-" + dir),
                    title: "&nbsp;",
                    closed: true,
                    minWidth: 0,
                    minHeight: 0,
                    doSize: false,
                    tools: [{
                        iconCls: icon, handler: function () {
                            _3bd(_3ae, _3af);
                            return false;
                        }
                    }]
                }));
                p.panel("panel").hover(function () {
                    $(this).addClass("layout-expand-over");
                }, function () {
                    $(this).removeClass("layout-expand-over");
                });
                return p;
            };
            function _3b6() {
                var cc = $(_3ae);
                var _3b8 = _3b1.center.panel("options");
                var _3b9 = _3b2.collapsedSize;
                if (_3af == "east") {
                    var _3ba = p.panel("panel")._outerWidth();
                    var _3bb = _3b8.width + _3ba - _3b9;
                    if (_3b2.split || !_3b2.border) {
                        _3bb++;
                    }
                    return {
                        resizeC: {width: _3bb},
                        expand: {left: cc.width() - _3ba},
                        expandP: {top: _3b8.top, left: cc.width() - _3b9, width: _3b9, height: _3b8.height},
                        collapse: {left: cc.width(), top: _3b8.top, height: _3b8.height}
                    };
                } else {
                    if (_3af == "west") {
                        var _3ba = p.panel("panel")._outerWidth();
                        var _3bb = _3b8.width + _3ba - _3b9;
                        if (_3b2.split || !_3b2.border) {
                            _3bb++;
                        }
                        return {
                            resizeC: {width: _3bb, left: _3b9 - 1},
                            expand: {left: 0},
                            expandP: {left: 0, top: _3b8.top, width: _3b9, height: _3b8.height},
                            collapse: {left: -_3ba, top: _3b8.top, height: _3b8.height}
                        };
                    } else {
                        if (_3af == "north") {
                            var _3bc = p.panel("panel")._outerHeight();
                            var hh = _3b8.height;
                            if (!_394(_3b1.expandNorth)) {
                                hh += _3bc - _3b9 + ((_3b2.split || !_3b2.border) ? 1 : 0);
                            }
                            _3b1.east.add(_3b1.west).add(_3b1.expandEast).add(_3b1.expandWest).panel("resize", {
                                top: _3b9 - 1,
                                height: hh
                            });
                            return {
                                resizeC: {top: _3b9 - 1, height: hh},
                                expand: {top: 0},
                                expandP: {top: 0, left: 0, width: cc.width(), height: _3b9},
                                collapse: {top: -_3bc, width: cc.width()}
                            };
                        } else {
                            if (_3af == "south") {
                                var _3bc = p.panel("panel")._outerHeight();
                                var hh = _3b8.height;
                                if (!_394(_3b1.expandSouth)) {
                                    hh += _3bc - _3b9 + ((_3b2.split || !_3b2.border) ? 1 : 0);
                                }
                                _3b1.east.add(_3b1.west).add(_3b1.expandEast).add(_3b1.expandWest).panel("resize", {height: hh});
                                return {
                                    resizeC: {height: hh},
                                    expand: {top: cc.height() - _3bc},
                                    expandP: {top: cc.height() - _3b9, left: 0, width: cc.width(), height: _3b9},
                                    collapse: {top: cc.height(), width: cc.width()}
                                };
                            }
                        }
                    }
                }
            };
        };
        function _3bd(_3be, _3bf) {
            var _3c0 = $.data(_3be, "layout").panels;
            var p = _3c0[_3bf];
            var _3c1 = p.panel("options");
            if (_3c1.onBeforeExpand.call(p) == false) {
                return;
            }
            var _3c2 = "expand" + _3bf.substring(0, 1).toUpperCase() + _3bf.substring(1);
            if (_3c0[_3c2]) {
                _3c0[_3c2].panel("close");
                p.panel("panel").stop(true, true);
                p.panel("expand", false).panel("open");
                var _3c3 = _3c4();
                p.panel("resize", _3c3.collapse);
                p.panel("panel").animate(_3c3.expand, function () {
                    _38e(_3be);
                });
            }
            function _3c4() {
                var cc = $(_3be);
                var _3c5 = _3c0.center.panel("options");
                if (_3bf == "east" && _3c0.expandEast) {
                    return {
                        collapse: {left: cc.width(), top: _3c5.top, height: _3c5.height},
                        expand: {left: cc.width() - p.panel("panel")._outerWidth()}
                    };
                } else {
                    if (_3bf == "west" && _3c0.expandWest) {
                        return {
                            collapse: {left: -p.panel("panel")._outerWidth(), top: _3c5.top, height: _3c5.height},
                            expand: {left: 0}
                        };
                    } else {
                        if (_3bf == "north" && _3c0.expandNorth) {
                            return {
                                collapse: {top: -p.panel("panel")._outerHeight(), width: cc.width()},
                                expand: {top: 0}
                            };
                        } else {
                            if (_3bf == "south" && _3c0.expandSouth) {
                                return {
                                    collapse: {top: cc.height(), width: cc.width()},
                                    expand: {top: cc.height() - p.panel("panel")._outerHeight()}
                                };
                            }
                        }
                    }
                }
            };
        };
        function _394(pp) {
            if (!pp) {
                return false;
            }
            if (pp.length) {
                return pp.panel("panel").is(":visible");
            } else {
                return false;
            }
        };
        function _3c6(_3c7) {
            var _3c8 = $.data(_3c7, "layout").panels;
            _3c9("east");
            _3c9("west");
            _3c9("north");
            _3c9("south");
            function _3c9(_3ca) {
                var p = _3c8[_3ca];
                if (p.length && p.panel("options").collapsed) {
                    _3ad(_3c7, _3ca, 0);
                }
            };
        };
        function _3cb(_3cc, _3cd, _3ce) {
            var p = $(_3cc).layout("panel", _3cd);
            p.panel("options").split = _3ce;
            var cls = "layout-split-" + _3cd;
            var _3cf = p.panel("panel").removeClass(cls);
            if (_3ce) {
                _3cf.addClass(cls);
            }
            _3cf.resizable({disabled: (!_3ce)});
            _38e(_3cc);
        };
        $.fn.layout = function (_3d0, _3d1) {
            if (typeof _3d0 == "string") {
                return $.fn.layout.methods[_3d0](this, _3d1);
            }
            _3d0 = _3d0 || {};
            return this.each(function () {
                var _3d2 = $.data(this, "layout");
                if (_3d2) {
                    $.extend(_3d2.options, _3d0);
                } else {
                    var opts = $.extend({}, $.fn.layout.defaults, $.fn.layout.parseOptions(this), _3d0);
                    $.data(this, "layout", {
                        options: opts,
                        panels: {center: $(), north: $(), south: $(), east: $(), west: $()}
                    });
                    init(this);
                }
                _38e(this);
                _3c6(this);
            });
        };
        $.fn.layout.methods = {
            options: function (jq) {
                return $.data(jq[0], "layout").options;
            }, resize: function (jq, _3d3) {
                return jq.each(function () {
                    _38e(this, _3d3);
                });
            }, panel: function (jq, _3d4) {
                return $.data(jq[0], "layout").panels[_3d4];
            }, collapse: function (jq, _3d5) {
                return jq.each(function () {
                    _3ad(this, _3d5);
                });
            }, expand: function (jq, _3d6) {
                return jq.each(function () {
                    _3bd(this, _3d6);
                });
            }, add: function (jq, _3d7) {
                return jq.each(function () {
                    _39b(this, _3d7);
                    _38e(this);
                    if ($(this).layout("panel", _3d7.region).panel("options").collapsed) {
                        _3ad(this, _3d7.region, 0);
                    }
                });
            }, remove: function (jq, _3d8) {
                return jq.each(function () {
                    _3a8(this, _3d8);
                    _38e(this);
                });
            }, split: function (jq, _3d9) {
                return jq.each(function () {
                    _3cb(this, _3d9, true);
                });
            }, unsplit: function (jq, _3da) {
                return jq.each(function () {
                    _3cb(this, _3da, false);
                });
            }
        };
        $.fn.layout.parseOptions = function (_3db) {
            return $.extend({}, $.parser.parseOptions(_3db, [{fit: "boolean"}]));
        };
        $.fn.layout.defaults = {fit: false};
        $.fn.layout.parsePanelOptions = function (_3dc) {
            var t = $(_3dc);
            return $.extend({}, $.fn.panel.parseOptions(_3dc), $.parser.parseOptions(_3dc, ["region", {
                split: "boolean",
                collpasedSize: "number",
                minWidth: "number",
                minHeight: "number",
                maxWidth: "number",
                maxHeight: "number"
            }]));
        };
        $.fn.layout.paneldefaults = $.extend({}, $.fn.panel.defaults, {
            region: null,
            split: false,
            collapsedSize: 28,
            minWidth: 10,
            minHeight: 10,
            maxWidth: 10000,
            maxHeight: 10000
        });
    })(jQuery);
    (function ($) {
        $(function () {
            $(document).unbind(".menu").bind("mousedown.menu", function (e) {
                var m = $(e.target).closest("div.menu,div.combo-p");
                if (m.length) {
                    return;
                }
                $("body>div.menu-top:visible").not(".menu-inline").menu("hide");
                _3dd($("body>div.menu:visible").not(".menu-inline"));
            });
        });
        function init(_3de) {
            var opts = $.data(_3de, "menu").options;
            $(_3de).addClass("menu-top");
            opts.inline ? $(_3de).addClass("menu-inline") : $(_3de).appendTo("body");
            $(_3de).bind("_resize", function (e, _3df) {
                if ($(this).hasClass("easyui-fluid") || _3df) {
                    $(_3de).menu("resize", _3de);
                }
                return false;
            });
            var _3e0 = _3e1($(_3de));
            for (var i = 0; i < _3e0.length; i++) {
                _3e2(_3e0[i]);
            }
            function _3e1(menu) {
                var _3e3 = [];
                menu.addClass("menu");
                _3e3.push(menu);
                if (!menu.hasClass("menu-content")) {
                    menu.children("div").each(function () {
                        var _3e4 = $(this).children("div");
                        if (_3e4.length) {
                            _3e4.appendTo("body");
                            this.submenu = _3e4;
                            var mm = _3e1(_3e4);
                            _3e3 = _3e3.concat(mm);
                        }
                    });
                }
                return _3e3;
            };
            function _3e2(menu) {
                var wh = $.parser.parseOptions(menu[0], ["width", "height"]);
                menu[0].originalHeight = wh.height || 0;
                if (menu.hasClass("menu-content")) {
                    menu[0].originalWidth = wh.width || menu._outerWidth();
                } else {
                    menu[0].originalWidth = wh.width || 0;
                    menu.children("div").each(function () {
                        var item = $(this);
                        var _3e5 = $.extend({}, $.parser.parseOptions(this, ["name", "iconCls", "href", {separator: "boolean"}]), {disabled: (item.attr("disabled") ? true : undefined)});
                        if (_3e5.separator) {
                            item.addClass("menu-sep");
                        }
                        if (!item.hasClass("menu-sep")) {
                            item[0].itemName = _3e5.name || "";
                            item[0].itemHref = _3e5.href || "";
                            var text = item.addClass("menu-item").html();
                            item.empty().append($("<div class=\"menu-text\"></div>").html(text));
                            if (_3e5.iconCls) {
                                $("<div class=\"menu-icon\"></div>").addClass(_3e5.iconCls).appendTo(item);
                            }
                            if (_3e5.disabled) {
                                _3e6(_3de, item[0], true);
                            }
                            if (item[0].submenu) {
                                $("<div class=\"menu-rightarrow\"></div>").appendTo(item);
                            }
                            _3e7(_3de, item);
                        }
                    });
                    $("<div class=\"menu-line\"></div>").prependTo(menu);
                }
                _3e8(_3de, menu);
                if (!menu.hasClass("menu-inline")) {
                    menu.hide();
                }
                _3e9(_3de, menu);
            };
        };
        function _3e8(_3ea, menu) {
            var opts = $.data(_3ea, "menu").options;
            var _3eb = menu.attr("style") || "";
            menu.css({display: "block", left: -10000, height: "auto", overflow: "hidden"});
            menu.find(".menu-item").each(function () {
                $(this)._outerHeight(opts.itemHeight);
                $(this).find(".menu-text").css({
                    height: (opts.itemHeight - 2) + "px",
                    lineHeight: (opts.itemHeight - 2) + "px"
                });
            });
            menu.removeClass("menu-noline").addClass(opts.noline ? "menu-noline" : "");
            var _3ec = menu[0].originalWidth || "auto";
            if (isNaN(parseInt(_3ec))) {
                _3ec = 0;
                menu.find("div.menu-text").each(function () {
                    if (_3ec < $(this)._outerWidth()) {
                        _3ec = $(this)._outerWidth();
                    }
                });
                _3ec += 40;
            }
            var _3ed = menu.outerHeight();
            var _3ee = menu[0].originalHeight || "auto";
            if (isNaN(parseInt(_3ee))) {
                _3ee = _3ed;
                if (menu.hasClass("menu-top") && opts.alignTo) {
                    var at = $(opts.alignTo);
                    var h1 = at.offset().top - $(document).scrollTop();
                    var h2 = $(window)._outerHeight() + $(document).scrollTop() - at.offset().top - at._outerHeight();
                    _3ee = Math.min(_3ee, Math.max(h1, h2));
                } else {
                    if (_3ee > $(window)._outerHeight()) {
                        _3ee = $(window).height();
                    }
                }
            }
            menu.attr("style", _3eb);
            menu._size({fit: (menu[0] == _3ea ? opts.fit : false), width: _3ec, minWidth: opts.minWidth, height: _3ee});
            menu.css("overflow", menu.outerHeight() < _3ed ? "auto" : "hidden");
            menu.children("div.menu-line")._outerHeight(_3ed - 2);
        };
        function _3e9(_3ef, menu) {
            if (menu.hasClass("menu-inline")) {
                return;
            }
            var _3f0 = $.data(_3ef, "menu");
            menu.unbind(".menu").bind("mouseenter.menu", function () {
                if (_3f0.timer) {
                    clearTimeout(_3f0.timer);
                    _3f0.timer = null;
                }
            }).bind("mouseleave.menu", function () {
                if (_3f0.options.hideOnUnhover) {
                    _3f0.timer = setTimeout(function () {
                        _3f1(_3ef, $(_3ef).hasClass("menu-inline"));
                    }, _3f0.options.duration);
                }
            });
        };
        function _3e7(_3f2, item) {
            if (!item.hasClass("menu-item")) {
                return;
            }
            item.unbind(".menu");
            item.bind("click.menu", function () {
                if ($(this).hasClass("menu-item-disabled")) {
                    return;
                }
                if (!this.submenu) {
                    _3f1(_3f2, $(_3f2).hasClass("menu-inline"));
                    var href = this.itemHref;
                    if (href) {
                        location.href = href;
                    }
                }
                $(this).trigger("mouseenter");
                var item = $(_3f2).menu("getItem", this);
                $.data(_3f2, "menu").options.onClick.call(_3f2, item);
            }).bind("mouseenter.menu", function (e) {
                item.siblings().each(function () {
                    if (this.submenu) {
                        _3dd(this.submenu);
                    }
                    $(this).removeClass("menu-active");
                });
                item.addClass("menu-active");
                if ($(this).hasClass("menu-item-disabled")) {
                    item.addClass("menu-active-disabled");
                    return;
                }
                var _3f3 = item[0].submenu;
                if (_3f3) {
                    $(_3f2).menu("show", {menu: _3f3, parent: item});
                }
            }).bind("mouseleave.menu", function (e) {
                item.removeClass("menu-active menu-active-disabled");
                var _3f4 = item[0].submenu;
                if (_3f4) {
                    if (e.pageX >= parseInt(_3f4.css("left"))) {
                        item.addClass("menu-active");
                    } else {
                        _3dd(_3f4);
                    }
                } else {
                    item.removeClass("menu-active");
                }
            });
        };
        function _3f1(_3f5, _3f6) {
            var _3f7 = $.data(_3f5, "menu");
            if (_3f7) {
                if ($(_3f5).is(":visible")) {
                    _3dd($(_3f5));
                    if (_3f6) {
                        $(_3f5).show();
                    } else {
                        _3f7.options.onHide.call(_3f5);
                    }
                }
            }
            return false;
        };
        function _3f8(_3f9, _3fa) {
            var left, top;
            _3fa = _3fa || {};
            var menu = $(_3fa.menu || _3f9);
            $(_3f9).menu("resize", menu[0]);
            if (menu.hasClass("menu-top")) {
                var opts = $.data(_3f9, "menu").options;
                $.extend(opts, _3fa);
                left = opts.left;
                top = opts.top;
                if (opts.alignTo) {
                    var at = $(opts.alignTo);
                    left = at.offset().left;
                    top = at.offset().top + at._outerHeight();
                    if (opts.align == "right") {
                        left += at.outerWidth() - menu.outerWidth();
                    }
                }
                if (left + menu.outerWidth() > $(window)._outerWidth() + $(document)._scrollLeft()) {
                    left = $(window)._outerWidth() + $(document).scrollLeft() - menu.outerWidth() - 5;
                }
                if (left < 0) {
                    left = 0;
                }
                top = _3fb(top, opts.alignTo);
            } else {
                var _3fc = _3fa.parent;
                left = _3fc.offset().left + _3fc.outerWidth() - 2;
                if (left + menu.outerWidth() + 5 > $(window)._outerWidth() + $(document).scrollLeft()) {
                    left = _3fc.offset().left - menu.outerWidth() + 2;
                }
                top = _3fb(_3fc.offset().top - 3);
            }
            function _3fb(top, _3fd) {
                if (top + menu.outerHeight() > $(window)._outerHeight() + $(document).scrollTop()) {
                    if (_3fd) {
                        top = $(_3fd).offset().top - menu._outerHeight();
                    } else {
                        top = $(window)._outerHeight() + $(document).scrollTop() - menu.outerHeight();
                    }
                }
                if (top < 0) {
                    top = 0;
                }
                return top;
            };
            menu.css({left: left, top: top});
            menu.show(0, function () {
                if (!menu[0].shadow) {
                    menu[0].shadow = $("<div class=\"menu-shadow\"></div>").insertAfter(menu);
                }
                menu[0].shadow.css({
                    display: (menu.hasClass("menu-inline") ? "none" : "block"),
                    zIndex: $.fn.menu.defaults.zIndex++,
                    left: menu.css("left"),
                    top: menu.css("top"),
                    width: menu.outerWidth(),
                    height: menu.outerHeight()
                });
                menu.css("z-index", $.fn.menu.defaults.zIndex++);
                if (menu.hasClass("menu-top")) {
                    $.data(menu[0], "menu").options.onShow.call(menu[0]);
                }
            });
        };
        function _3dd(menu) {
            if (menu && menu.length) {
                _3fe(menu);
                menu.find("div.menu-item").each(function () {
                    if (this.submenu) {
                        _3dd(this.submenu);
                    }
                    $(this).removeClass("menu-active");
                });
            }
            function _3fe(m) {
                m.stop(true, true);
                if (m[0].shadow) {
                    m[0].shadow.hide();
                }
                m.hide();
            };
        };
        function _3ff(_400, text) {
            var _401 = null;
            var tmp = $("<div></div>");

            function find(menu) {
                menu.children("div.menu-item").each(function () {
                    var item = $(_400).menu("getItem", this);
                    var s = tmp.empty().html(item.text).text();
                    if (text == $.trim(s)) {
                        _401 = item;
                    } else {
                        if (this.submenu && !_401) {
                            find(this.submenu);
                        }
                    }
                });
            };
            find($(_400));
            tmp.remove();
            return _401;
        };
        function _3e6(_402, _403, _404) {
            var t = $(_403);
            if (!t.hasClass("menu-item")) {
                return;
            }
            if (_404) {
                t.addClass("menu-item-disabled");
                if (_403.onclick) {
                    _403.onclick1 = _403.onclick;
                    _403.onclick = null;
                }
            } else {
                t.removeClass("menu-item-disabled");
                if (_403.onclick1) {
                    _403.onclick = _403.onclick1;
                    _403.onclick1 = null;
                }
            }
        };
        function _405(_406, _407) {
            var opts = $.data(_406, "menu").options;
            var menu = $(_406);
            if (_407.parent) {
                if (!_407.parent.submenu) {
                    var _408 = $("<div class=\"menu\"><div class=\"menu-line\"></div></div>").appendTo("body");
                    _408.hide();
                    _407.parent.submenu = _408;
                    $("<div class=\"menu-rightarrow\"></div>").appendTo(_407.parent);
                }
                menu = _407.parent.submenu;
            }
            if (_407.separator) {
                var item = $("<div class=\"menu-sep\"></div>").appendTo(menu);
            } else {
                var item = $("<div class=\"menu-item\"></div>").appendTo(menu);
                $("<div class=\"menu-text\"></div>").html(_407.text).appendTo(item);
            }
            if (_407.iconCls) {
                $("<div class=\"menu-icon\"></div>").addClass(_407.iconCls).appendTo(item);
            }
            if (_407.id) {
                item.attr("id", _407.id);
            }
            if (_407.name) {
                item[0].itemName = _407.name;
            }
            if (_407.href) {
                item[0].itemHref = _407.href;
            }
            if (_407.onclick) {
                if (typeof _407.onclick == "string") {
                    item.attr("onclick", _407.onclick);
                } else {
                    item[0].onclick = eval(_407.onclick);
                }
            }
            if (_407.handler) {
                item[0].onclick = eval(_407.handler);
            }
            if (_407.disabled) {
                _3e6(_406, item[0], true);
            }
            _3e7(_406, item);
            _3e9(_406, menu);
            _3e8(_406, menu);
        };
        function _409(_40a, _40b) {
            function _40c(el) {
                if (el.submenu) {
                    el.submenu.children("div.menu-item").each(function () {
                        _40c(this);
                    });
                    var _40d = el.submenu[0].shadow;
                    if (_40d) {
                        _40d.remove();
                    }
                    el.submenu.remove();
                }
                $(el).remove();
            };
            var menu = $(_40b).parent();
            _40c(_40b);
            _3e8(_40a, menu);
        };
        function _40e(_40f, _410, _411) {
            var menu = $(_410).parent();
            if (_411) {
                $(_410).show();
            } else {
                $(_410).hide();
            }
            _3e8(_40f, menu);
        };
        function _412(_413) {
            $(_413).children("div.menu-item").each(function () {
                _409(_413, this);
            });
            if (_413.shadow) {
                _413.shadow.remove();
            }
            $(_413).remove();
        };
        $.fn.menu = function (_414, _415) {
            if (typeof _414 == "string") {
                return $.fn.menu.methods[_414](this, _415);
            }
            _414 = _414 || {};
            return this.each(function () {
                var _416 = $.data(this, "menu");
                if (_416) {
                    $.extend(_416.options, _414);
                } else {
                    _416 = $.data(this, "menu", {options: $.extend({}, $.fn.menu.defaults, $.fn.menu.parseOptions(this), _414)});
                    init(this);
                }
                $(this).css({left: _416.options.left, top: _416.options.top});
            });
        };
        $.fn.menu.methods = {
            options: function (jq) {
                return $.data(jq[0], "menu").options;
            }, show: function (jq, pos) {
                return jq.each(function () {
                    _3f8(this, pos);
                });
            }, hide: function (jq) {
                return jq.each(function () {
                    _3f1(this);
                });
            }, destroy: function (jq) {
                return jq.each(function () {
                    _412(this);
                });
            }, setText: function (jq, _417) {
                return jq.each(function () {
                    $(_417.target).children("div.menu-text").html(_417.text);
                });
            }, setIcon: function (jq, _418) {
                return jq.each(function () {
                    $(_418.target).children("div.menu-icon").remove();
                    if (_418.iconCls) {
                        $("<div class=\"menu-icon\"></div>").addClass(_418.iconCls).appendTo(_418.target);
                    }
                });
            }, getItem: function (jq, _419) {
                var t = $(_419);
                var item = {
                    target: _419,
                    id: t.attr("id"),
                    text: $.trim(t.children("div.menu-text").html()),
                    disabled: t.hasClass("menu-item-disabled"),
                    name: _419.itemName,
                    href: _419.itemHref,
                    onclick: _419.onclick
                };
                var icon = t.children("div.menu-icon");
                if (icon.length) {
                    var cc = [];
                    var aa = icon.attr("class").split(" ");
                    for (var i = 0; i < aa.length; i++) {
                        if (aa[i] != "menu-icon") {
                            cc.push(aa[i]);
                        }
                    }
                    item.iconCls = cc.join(" ");
                }
                return item;
            }, findItem: function (jq, text) {
                return _3ff(jq[0], text);
            }, appendItem: function (jq, _41a) {
                return jq.each(function () {
                    _405(this, _41a);
                });
            }, removeItem: function (jq, _41b) {
                return jq.each(function () {
                    _409(this, _41b);
                });
            }, enableItem: function (jq, _41c) {
                return jq.each(function () {
                    _3e6(this, _41c, false);
                });
            }, disableItem: function (jq, _41d) {
                return jq.each(function () {
                    _3e6(this, _41d, true);
                });
            }, showItem: function (jq, _41e) {
                return jq.each(function () {
                    _40e(this, _41e, true);
                });
            }, hideItem: function (jq, _41f) {
                return jq.each(function () {
                    _40e(this, _41f, false);
                });
            }, resize: function (jq, _420) {
                return jq.each(function () {
                    _3e8(this, $(_420));
                });
            }
        };
        $.fn.menu.parseOptions = function (_421) {
            return $.extend({}, $.parser.parseOptions(_421, [{
                minWidth: "number",
                itemHeight: "number",
                duration: "number",
                hideOnUnhover: "boolean"
            }, {fit: "boolean", inline: "boolean", noline: "boolean"}]));
        };
        $.fn.menu.defaults = {
            zIndex: 110000,
            left: 0,
            top: 0,
            alignTo: null,
            align: "left",
            minWidth: 120,
            itemHeight: 22,
            duration: 100,
            hideOnUnhover: true,
            inline: false,
            fit: false,
            noline: false,
            onShow: function () {
            },
            onHide: function () {
            },
            onClick: function (item) {
            }
        };
    })(jQuery);
    (function ($) {
        function init(_422) {
            var opts = $.data(_422, "menubutton").options;
            var btn = $(_422);
            btn.linkbutton(opts);
            if (opts.hasDownArrow) {
                btn.removeClass(opts.cls.btn1 + " " + opts.cls.btn2).addClass("m-btn");
                btn.removeClass("m-btn-small m-btn-medium m-btn-large").addClass("m-btn-" + opts.size);
                var _423 = btn.find(".l-btn-left");
                $("<span></span>").addClass(opts.cls.arrow).appendTo(_423);
                $("<span></span>").addClass("m-btn-line").appendTo(_423);
            }
            $(_422).menubutton("resize");
            if (opts.menu) {
                $(opts.menu).menu({duration: opts.duration});
                var _424 = $(opts.menu).menu("options");
                var _425 = _424.onShow;
                var _426 = _424.onHide;
                $.extend(_424, {
                    onShow: function () {
                        var _427 = $(this).menu("options");
                        var btn = $(_427.alignTo);
                        var opts = btn.menubutton("options");
                        btn.addClass((opts.plain == true) ? opts.cls.btn2 : opts.cls.btn1);
                        _425.call(this);
                    }, onHide: function () {
                        var _428 = $(this).menu("options");
                        var btn = $(_428.alignTo);
                        var opts = btn.menubutton("options");
                        btn.removeClass((opts.plain == true) ? opts.cls.btn2 : opts.cls.btn1);
                        _426.call(this);
                    }
                });
            }
        };
        function _429(_42a) {
            var opts = $.data(_42a, "menubutton").options;
            var btn = $(_42a);
            var t = btn.find("." + opts.cls.trigger);
            if (!t.length) {
                t = btn;
            }
            t.unbind(".menubutton");
            var _42b = null;
            t.bind("click.menubutton", function () {
                if (!_42c()) {
                    _42d(_42a);
                    return false;
                }
            }).bind("mouseenter.menubutton", function () {
                if (!_42c()) {
                    _42b = setTimeout(function () {
                        _42d(_42a);
                    }, opts.duration);
                    return false;
                }
            }).bind("mouseleave.menubutton", function () {
                if (_42b) {
                    clearTimeout(_42b);
                }
                $(opts.menu).triggerHandler("mouseleave");
            });
            function _42c() {
                return $(_42a).linkbutton("options").disabled;
            };
        };
        function _42d(_42e) {
            var opts = $(_42e).menubutton("options");
            if (opts.disabled || !opts.menu) {
                return;
            }
            $("body>div.menu-top").menu("hide");
            var btn = $(_42e);
            var mm = $(opts.menu);
            if (mm.length) {
                mm.menu("options").alignTo = btn;
                mm.menu("show", {alignTo: btn, align: opts.menuAlign});
            }
            btn.blur();
        };
        $.fn.menubutton = function (_42f, _430) {
            if (typeof _42f == "string") {
                var _431 = $.fn.menubutton.methods[_42f];
                if (_431) {
                    return _431(this, _430);
                } else {
                    return this.linkbutton(_42f, _430);
                }
            }
            _42f = _42f || {};
            return this.each(function () {
                var _432 = $.data(this, "menubutton");
                if (_432) {
                    $.extend(_432.options, _42f);
                } else {
                    $.data(this, "menubutton", {options: $.extend({}, $.fn.menubutton.defaults, $.fn.menubutton.parseOptions(this), _42f)});
                    $(this).removeAttr("disabled");
                }
                init(this);
                _429(this);
            });
        };
        $.fn.menubutton.methods = {
            options: function (jq) {
                var _433 = jq.linkbutton("options");
                return $.extend($.data(jq[0], "menubutton").options, {
                    toggle: _433.toggle,
                    selected: _433.selected,
                    disabled: _433.disabled
                });
            }, destroy: function (jq) {
                return jq.each(function () {
                    var opts = $(this).menubutton("options");
                    if (opts.menu) {
                        $(opts.menu).menu("destroy");
                    }
                    $(this).remove();
                });
            }
        };
        $.fn.menubutton.parseOptions = function (_434) {
            var t = $(_434);
            return $.extend({}, $.fn.linkbutton.parseOptions(_434), $.parser.parseOptions(_434, ["menu", {
                plain: "boolean",
                hasDownArrow: "boolean",
                duration: "number"
            }]));
        };
        $.fn.menubutton.defaults = $.extend({}, $.fn.linkbutton.defaults, {
            plain: true,
            hasDownArrow: true,
            menu: null,
            menuAlign: "left",
            duration: 100,
            cls: {btn1: "m-btn-active", btn2: "m-btn-plain-active", arrow: "m-btn-downarrow", trigger: "m-btn"}
        });
    })(jQuery);
    (function ($) {
        function init(_435) {
            var opts = $.data(_435, "splitbutton").options;
            $(_435).menubutton(opts);
            $(_435).addClass("s-btn");
        };
        $.fn.splitbutton = function (_436, _437) {
            if (typeof _436 == "string") {
                var _438 = $.fn.splitbutton.methods[_436];
                if (_438) {
                    return _438(this, _437);
                } else {
                    return this.menubutton(_436, _437);
                }
            }
            _436 = _436 || {};
            return this.each(function () {
                var _439 = $.data(this, "splitbutton");
                if (_439) {
                    $.extend(_439.options, _436);
                } else {
                    $.data(this, "splitbutton", {options: $.extend({}, $.fn.splitbutton.defaults, $.fn.splitbutton.parseOptions(this), _436)});
                    $(this).removeAttr("disabled");
                }
                init(this);
            });
        };
        $.fn.splitbutton.methods = {
            options: function (jq) {
                var _43a = jq.menubutton("options");
                var _43b = $.data(jq[0], "splitbutton").options;
                $.extend(_43b, {disabled: _43a.disabled, toggle: _43a.toggle, selected: _43a.selected});
                return _43b;
            }
        };
        $.fn.splitbutton.parseOptions = function (_43c) {
            var t = $(_43c);
            return $.extend({}, $.fn.linkbutton.parseOptions(_43c), $.parser.parseOptions(_43c, ["menu", {
                plain: "boolean",
                duration: "number"
            }]));
        };
        $.fn.splitbutton.defaults = $.extend({}, $.fn.linkbutton.defaults, {
            plain: true,
            menu: null,
            duration: 100,
            cls: {
                btn1: "m-btn-active s-btn-active",
                btn2: "m-btn-plain-active s-btn-plain-active",
                arrow: "m-btn-downarrow",
                trigger: "m-btn-line"
            }
        });
    })(jQuery);
    (function ($) {
        function init(_43d) {
            $(_43d).addClass("validatebox-text");
        };
        function _43e(_43f) {
            var _440 = $.data(_43f, "validatebox");
            _440.validating = false;
            if (_440.timer) {
                clearTimeout(_440.timer);
            }
            $(_43f).tooltip("destroy");
            $(_43f).unbind();
            $(_43f).remove();
        };
        function _441(_442) {
            var opts = $.data(_442, "validatebox").options;
            var box = $(_442);
            box.unbind(".validatebox");
            if (opts.novalidate || box.is(":disabled")) {
                return;
            }
            for (var _443 in opts.events) {
                $(_442).bind(_443 + ".validatebox", {target: _442}, opts.events[_443]);
            }
        };
        function _444(e) {
            var _445 = e.data.target;
            var _446 = $.data(_445, "validatebox");
            var box = $(_445);
            if ($(_445).attr("readonly")) {
                return;
            }
            _446.validating = true;
            _446.value = undefined;
            (function () {
                if (_446.validating) {
                    if (_446.value != box.val()) {
                        _446.value = box.val();
                        if (_446.timer) {
                            clearTimeout(_446.timer);
                        }
                        _446.timer = setTimeout(function () {
                            $(_445).validatebox("validate");
                        }, _446.options.delay);
                    } else {
                        _447(_445);
                    }
                    setTimeout(arguments.callee, 200);
                }
            })();
        };
        function _448(e) {
            var _449 = e.data.target;
            var _44a = $.data(_449, "validatebox");
            if (_44a.timer) {
                clearTimeout(_44a.timer);
                _44a.timer = undefined;
            }
            _44a.validating = false;
            _44b(_449);
        };
        function _44c(e) {
            var _44d = e.data.target;
            if ($(_44d).hasClass("validatebox-invalid")) {
                _44e(_44d);
            }
        };
        function _44f(e) {
            var _450 = e.data.target;
            var _451 = $.data(_450, "validatebox");
            if (!_451.validating) {
                _44b(_450);
            }
        };
        function _44e(_452) {
            var _453 = $.data(_452, "validatebox");
            var opts = _453.options;
            $(_452).tooltip($.extend({}, opts.tipOptions, {
                content: _453.message,
                position: opts.tipPosition,
                deltaX: opts.deltaX
            })).tooltip("show");
            _453.tip = true;
        };
        function _447(_454) {
            var _455 = $.data(_454, "validatebox");
            if (_455 && _455.tip) {
                $(_454).tooltip("reposition");
            }
        };
        function _44b(_456) {
            var _457 = $.data(_456, "validatebox");
            _457.tip = false;
            $(_456).tooltip("hide");
        };
        function _458(_459) {
            var _45a = $.data(_459, "validatebox");
            var opts = _45a.options;
            var box = $(_459);
            opts.onBeforeValidate.call(_459);
            var _45b = _45c();
            opts.onValidate.call(_459, _45b);
            return _45b;
            function _45d(msg) {
                _45a.message = msg;
            };
            function _45e(_45f, _460) {
                var _461 = box.val();
                var _462 = /([a-zA-Z_]+)(.*)/.exec(_45f);
                var rule = opts.rules[_462[1]];
                if (rule && _461) {
                    var _463 = _460 || opts.validParams || eval(_462[2]);
                    if (!rule["validator"].call(_459, _461, _463)) {
                        box.addClass("validatebox-invalid");
                        var _464 = rule["message"];
                        if (_463) {
                            for (var i = 0; i < _463.length; i++) {
                                _464 = _464.replace(new RegExp("\\{" + i + "\\}", "g"), _463[i]);
                            }
                        }
                        _45d(opts.invalidMessage || _464);
                        if (_45a.validating) {
                            _44e(_459);
                        }
                        return false;
                    }
                }
                return true;
            };
            function _45c() {
                box.removeClass("validatebox-invalid");
                _44b(_459);
                if (opts.novalidate || box.is(":disabled")) {
                    return true;
                }
                if (opts.required) {
                    if (box.val() == "") {
                        box.addClass("validatebox-invalid");
                        _45d(opts.missingMessage);
                        if (_45a.validating) {
                            _44e(_459);
                        }
                        return false;
                    }
                }
                if (opts.validType) {
                    if ($.isArray(opts.validType)) {
                        for (var i = 0; i < opts.validType.length; i++) {
                            if (!_45e(opts.validType[i])) {
                                return false;
                            }
                        }
                    } else {
                        if (typeof opts.validType == "string") {
                            if (!_45e(opts.validType)) {
                                return false;
                            }
                        } else {
                            for (var _465 in opts.validType) {
                                var _466 = opts.validType[_465];
                                if (!_45e(_465, _466)) {
                                    return false;
                                }
                            }
                        }
                    }
                }
                return true;
            };
        };
        function _467(_468, _469) {
            var opts = $.data(_468, "validatebox").options;
            if (_469 != undefined) {
                opts.novalidate = _469;
            }
            if (opts.novalidate) {
                $(_468).removeClass("validatebox-invalid");
                _44b(_468);
            }
            _458(_468);
            _441(_468);
        };
        $.fn.validatebox = function (_46a, _46b) {
            if (typeof _46a == "string") {
                return $.fn.validatebox.methods[_46a](this, _46b);
            }
            _46a = _46a || {};
            return this.each(function () {
                var _46c = $.data(this, "validatebox");
                if (_46c) {
                    $.extend(_46c.options, _46a);
                } else {
                    init(this);
                    $.data(this, "validatebox", {options: $.extend({}, $.fn.validatebox.defaults, $.fn.validatebox.parseOptions(this), _46a)});
                }
                _467(this);
                _458(this);
            });
        };
        $.fn.validatebox.methods = {
            options: function (jq) {
                return $.data(jq[0], "validatebox").options;
            }, destroy: function (jq) {
                return jq.each(function () {
                    _43e(this);
                });
            }, validate: function (jq) {
                return jq.each(function () {
                    _458(this);
                });
            }, isValid: function (jq) {
                return _458(jq[0]);
            }, enableValidation: function (jq) {
                return jq.each(function () {
                    _467(this, false);
                });
            }, disableValidation: function (jq) {
                return jq.each(function () {
                    _467(this, true);
                });
            }
        };
        $.fn.validatebox.parseOptions = function (_46d) {
            var t = $(_46d);
            return $.extend({}, $.parser.parseOptions(_46d, ["validType", "missingMessage", "invalidMessage", "tipPosition", {
                delay: "number",
                deltaX: "number"
            }]), {
                required: (t.attr("required") ? true : undefined),
                novalidate: (t.attr("novalidate") != undefined ? true : undefined)
            });
        };
        $.fn.validatebox.defaults = {
            required: false,
            validType: null,
            validParams: null,
            delay: 200,
            missingMessage: "This field is required.",
            invalidMessage: null,
            tipPosition: "right",
            deltaX: 0,
            novalidate: false,
            events: {
                focus: _444, blur: _448, mouseenter: _44c, mouseleave: _44f, click: function (e) {
                    var t = $(e.data.target);
                    if (!t.is(":focus")) {
                        t.trigger("focus");
                    }
                }
            },
            tipOptions: {
                showEvent: "none", hideEvent: "none", showDelay: 0, hideDelay: 0, zIndex: "", onShow: function () {
                    $(this).tooltip("tip").css({color: "#000", borderColor: "#CC9933", backgroundColor: "#FFFFCC"});
                }, onHide: function () {
                    $(this).tooltip("destroy");
                }
            },
            rules: {
                email: {
                    validator: function (_46e) {
                        return /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i.test(_46e);
                    }, message: "Please enter a valid email address."
                }, url: {
                    validator: function (_46f) {
                        return /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(_46f);
                    }, message: "Please enter a valid URL."
                }, length: {
                    validator: function (_470, _471) {
                        var len = $.trim(_470).length;
                        return len >= _471[0] && len <= _471[1];
                    }, message: "Please enter a value between {0} and {1}."
                }, remote: {
                    validator: function (_472, _473) {
                        var data = {};
                        data[_473[1]] = _472;
                        var _474 = $.ajax({
                            url: _473[0],
                            dataType: "json",
                            data: data,
                            async: false,
                            cache: false,
                            type: "post"
                        }).responseText;
                        return _474 == "true";
                    }, message: "Please fix this field."
                }
            },
            onBeforeValidate: function () {
            },
            onValidate: function (_475) {
            }
        };
    })(jQuery);
    (function ($) {
        function init(_476) {
            $(_476).addClass("textbox-f").hide();
            var span = $("<span class=\"textbox\">" + "<input class=\"textbox-text\" autocomplete=\"off\">" + "<input type=\"hidden\" class=\"textbox-value\">" + "</span>").insertAfter(_476);
            var name = $(_476).attr("name");
            if (name) {
                span.find("input.textbox-value").attr("name", name);
                $(_476).removeAttr("name").attr("textboxName", name);
            }
            return span;
        };
        function _477(_478) {
            var _479 = $.data(_478, "textbox");
            var opts = _479.options;
            var tb = _479.textbox;
            tb.find(".textbox-text").remove();
            if (opts.multiline) {
                $("<textarea class=\"textbox-text\" autocomplete=\"off\"></textarea>").prependTo(tb);
            } else {
                $("<input type=\"" + opts.type + "\" class=\"textbox-text\" autocomplete=\"off\">").prependTo(tb);
            }
            tb.find(".textbox-addon").remove();
            var bb = opts.icons ? $.extend(true, [], opts.icons) : [];
            if (opts.iconCls) {
                bb.push({iconCls: opts.iconCls, disabled: true});
            }
            if (bb.length) {
                var bc = $("<span class=\"textbox-addon\"></span>").prependTo(tb);
                bc.addClass("textbox-addon-" + opts.iconAlign);
                for (var i = 0; i < bb.length; i++) {
                    bc.append("<a href=\"javascript:void(0)\" class=\"textbox-icon " + bb[i].iconCls + "\" icon-index=\"" + i + "\" tabindex=\"-1\"></a>");
                }
            }
            tb.find(".textbox-button").remove();
            if (opts.buttonText || opts.buttonIcon) {
                var btn = $("<a href=\"javascript:void(0)\" class=\"textbox-button\"></a>").prependTo(tb);
                btn.addClass("textbox-button-" + opts.buttonAlign).linkbutton({
                    text: opts.buttonText,
                    iconCls: opts.buttonIcon
                });
            }
            _47a(_478, opts.disabled);
            _47b(_478, opts.readonly);
        };
        function _47c(_47d) {
            var tb = $.data(_47d, "textbox").textbox;
            tb.find(".textbox-text").validatebox("destroy");
            tb.remove();
            $(_47d).remove();
        };
        function _47e(_47f, _480) {
            var _481 = $.data(_47f, "textbox");
            var opts = _481.options;
            var tb = _481.textbox;
            var _482 = tb.parent();
            if (_480) {
                opts.width = _480;
            }
            if (isNaN(parseInt(opts.width))) {
                var c = $(_47f).clone();
                c.css("visibility", "hidden");
                c.insertAfter(_47f);
                opts.width = c.outerWidth();
                c.remove();
            }
            var _483 = tb.is(":visible");
            if (!_483) {
                tb.appendTo("body");
            }
            var _484 = tb.find(".textbox-text");
            var btn = tb.find(".textbox-button");
            var _485 = tb.find(".textbox-addon");
            var _486 = _485.find(".textbox-icon");
            tb._size(opts, _482);
            btn.linkbutton("resize", {height: tb.height()});
            btn.css({left: (opts.buttonAlign == "left" ? 0 : ""), right: (opts.buttonAlign == "right" ? 0 : "")});
            _485.css({
                left: (opts.iconAlign == "left" ? (opts.buttonAlign == "left" ? btn._outerWidth() : 0) : ""),
                right: (opts.iconAlign == "right" ? (opts.buttonAlign == "right" ? btn._outerWidth() : 0) : "")
            });
            _486.css({width: opts.iconWidth + "px", height: tb.height() + "px"});
            _484.css({
                paddingLeft: (_47f.style.paddingLeft || ""),
                paddingRight: (_47f.style.paddingRight || ""),
                marginLeft: _487("left"),
                marginRight: _487("right")
            });
            if (opts.multiline) {
                _484.css({paddingTop: (_47f.style.paddingTop || ""), paddingBottom: (_47f.style.paddingBottom || "")});
                _484._outerHeight(tb.height());
            } else {
                var _488 = Math.floor((tb.height() - _484.height()) / 2);
                _484.css({paddingTop: _488 + "px", paddingBottom: _488 + "px"});
            }
            _484._outerWidth(tb.width() - _486.length * opts.iconWidth - btn._outerWidth());
            if (!_483) {
                tb.insertAfter(_47f);
            }
            opts.onResize.call(_47f, opts.width, opts.height);
            function _487(_489) {
                return (opts.iconAlign == _489 ? _485._outerWidth() : 0) + (opts.buttonAlign == _489 ? btn._outerWidth() : 0);
            };
        };
        function _48a(_48b) {
            var opts = $(_48b).textbox("options");
            var _48c = $(_48b).textbox("textbox");
            _48c.validatebox($.extend({}, opts, {
                deltaX: $(_48b).textbox("getTipX"), onBeforeValidate: function () {
                    var box = $(this);
                    if (!box.is(":focus")) {
                        opts.oldInputValue = box.val();
                        box.val(opts.value);
                    }
                }, onValidate: function (_48d) {
                    var box = $(this);
                    if (opts.oldInputValue != undefined) {
                        box.val(opts.oldInputValue);
                        opts.oldInputValue = undefined;
                    }
                    var tb = box.parent();
                    if (_48d) {
                        tb.removeClass("textbox-invalid");
                    } else {
                        tb.addClass("textbox-invalid");
                    }
                }
            }));
        };
        function _48e(_48f) {
            var _490 = $.data(_48f, "textbox");
            var opts = _490.options;
            var tb = _490.textbox;
            var _491 = tb.find(".textbox-text");
            _491.attr("placeholder", opts.prompt);
            _491.unbind(".textbox");
            if (!opts.disabled && !opts.readonly) {
                _491.bind("blur.textbox", function (e) {
                    if (!tb.hasClass("textbox-focused")) {
                        return;
                    }
                    opts.value = $(this).val();
                    if (opts.value == "") {
                        $(this).val(opts.prompt).addClass("textbox-prompt");
                    } else {
                        $(this).removeClass("textbox-prompt");
                    }
                    tb.removeClass("textbox-focused");
                }).bind("focus.textbox", function (e) {
                    if (tb.hasClass("textbox-focused")) {
                        return;
                    }
                    if ($(this).val() != opts.value) {
                        $(this).val(opts.value);
                    }
                    $(this).removeClass("textbox-prompt");
                    tb.addClass("textbox-focused");
                });
                for (var _492 in opts.inputEvents) {
                    _491.bind(_492 + ".textbox", {target: _48f}, opts.inputEvents[_492]);
                }
            }
            var _493 = tb.find(".textbox-addon");
            _493.unbind().bind("click", {target: _48f}, function (e) {
                var icon = $(e.target).closest("a.textbox-icon:not(.textbox-icon-disabled)");
                if (icon.length) {
                    var _494 = parseInt(icon.attr("icon-index"));
                    var conf = opts.icons[_494];
                    if (conf && conf.handler) {
                        conf.handler.call(icon[0], e);
                        opts.onClickIcon.call(_48f, _494);
                    }
                }
            });
            _493.find(".textbox-icon").each(function (_495) {
                var conf = opts.icons[_495];
                var icon = $(this);
                if (!conf || conf.disabled || opts.disabled || opts.readonly) {
                    icon.addClass("textbox-icon-disabled");
                } else {
                    icon.removeClass("textbox-icon-disabled");
                }
            });
            var btn = tb.find(".textbox-button");
            btn.unbind(".textbox").bind("click.textbox", function () {
                if (!btn.linkbutton("options").disabled) {
                    opts.onClickButton.call(_48f);
                }
            });
            btn.linkbutton((opts.disabled || opts.readonly) ? "disable" : "enable");
            tb.unbind(".textbox").bind("_resize.textbox", function (e, _496) {
                if ($(this).hasClass("easyui-fluid") || _496) {
                    _47e(_48f);
                }
                return false;
            });
        };
        function _47a(_497, _498) {
            var _499 = $.data(_497, "textbox");
            var opts = _499.options;
            var tb = _499.textbox;
            if (_498) {
                opts.disabled = true;
                $(_497).attr("disabled", "disabled");
                tb.addClass("textbox-disabled");
                tb.find(".textbox-text,.textbox-value").attr("disabled", "disabled");
            } else {
                opts.disabled = false;
                tb.removeClass("textbox-disabled");
                $(_497).removeAttr("disabled");
                tb.find(".textbox-text,.textbox-value").removeAttr("disabled");
            }
        };
        function _47b(_49a, mode) {
            var _49b = $.data(_49a, "textbox");
            var opts = _49b.options;
            opts.readonly = mode == undefined ? true : mode;
            _49b.textbox.removeClass("textbox-readonly").addClass(opts.readonly ? "textbox-readonly" : "");
            var _49c = _49b.textbox.find(".textbox-text");
            _49c.removeAttr("readonly");
            if (opts.readonly || !opts.editable) {
                _49c.attr("readonly", "readonly");
            }
        };
        $.fn.textbox = function (_49d, _49e) {
            if (typeof _49d == "string") {
                var _49f = $.fn.textbox.methods[_49d];
                if (_49f) {
                    return _49f(this, _49e);
                } else {
                    return this.each(function () {
                        var _4a0 = $(this).textbox("textbox");
                        _4a0.validatebox(_49d, _49e);
                    });
                }
            }
            _49d = _49d || {};
            return this.each(function () {
                var _4a1 = $.data(this, "textbox");
                if (_4a1) {
                    $.extend(_4a1.options, _49d);
                    if (_49d.value != undefined) {
                        _4a1.options.originalValue = _49d.value;
                    }
                } else {
                    _4a1 = $.data(this, "textbox", {
                        options: $.extend({}, $.fn.textbox.defaults, $.fn.textbox.parseOptions(this), _49d),
                        textbox: init(this)
                    });
                    _4a1.options.originalValue = _4a1.options.value;
                }
                _477(this);
                _48e(this);
                _47e(this);
                _48a(this);
                $(this).textbox("initValue", _4a1.options.value);
            });
        };
        $.fn.textbox.methods = {
            options: function (jq) {
                return $.data(jq[0], "textbox").options;
            }, cloneFrom: function (jq, from) {
                return jq.each(function () {
                    var t = $(this);
                    if (t.data("textbox")) {
                        return;
                    }
                    if (!$(from).data("textbox")) {
                        $(from).textbox();
                    }
                    var name = t.attr("name") || "";
                    t.addClass("textbox-f").hide();
                    t.removeAttr("name").attr("textboxName", name);
                    var span = $(from).next().clone().insertAfter(t);
                    span.find("input.textbox-value").attr("name", name);
                    $.data(this, "textbox", {options: $.extend(true, {}, $(from).textbox("options")), textbox: span});
                    var _4a2 = $(from).textbox("button");
                    if (_4a2.length) {
                        t.textbox("button").linkbutton($.extend(true, {}, _4a2.linkbutton("options")));
                    }
                    _48e(this);
                    _48a(this);
                });
            }, textbox: function (jq) {
                return $.data(jq[0], "textbox").textbox.find(".textbox-text");
            }, button: function (jq) {
                return $.data(jq[0], "textbox").textbox.find(".textbox-button");
            }, destroy: function (jq) {
                return jq.each(function () {
                    _47c(this);
                });
            }, resize: function (jq, _4a3) {
                return jq.each(function () {
                    _47e(this, _4a3);
                });
            }, disable: function (jq) {
                return jq.each(function () {
                    _47a(this, true);
                    _48e(this);
                });
            }, enable: function (jq) {
                return jq.each(function () {
                    _47a(this, false);
                    _48e(this);
                });
            }, readonly: function (jq, mode) {
                return jq.each(function () {
                    _47b(this, mode);
                    _48e(this);
                });
            }, isValid: function (jq) {
                return jq.textbox("textbox").validatebox("isValid");
            }, clear: function (jq) {
                return jq.each(function () {
                    $(this).textbox("setValue", "");
                });
            }, setText: function (jq, _4a4) {
                return jq.each(function () {
                    var opts = $(this).textbox("options");
                    var _4a5 = $(this).textbox("textbox");
                    if ($(this).textbox("getText") != _4a4) {
                        opts.value = _4a4;
                        _4a5.val(_4a4);
                    }
                    if (!_4a5.is(":focus")) {
                        if (_4a4) {
                            _4a5.removeClass("textbox-prompt");
                        } else {
                            _4a5.val(opts.prompt).addClass("textbox-prompt");
                        }
                    }
                    $(this).textbox("validate");
                });
            }, initValue: function (jq, _4a6) {
                return jq.each(function () {
                    var _4a7 = $.data(this, "textbox");
                    _4a7.options.value = "";
                    $(this).textbox("setText", _4a6);
                    _4a7.textbox.find(".textbox-value").val(_4a6);
                    $(this).val(_4a6);
                });
            }, setValue: function (jq, _4a8) {
                return jq.each(function () {
                    var opts = $.data(this, "textbox").options;
                    var _4a9 = $(this).textbox("getValue");
                    $(this).textbox("initValue", _4a8);
                    if (_4a9 != _4a8) {
                        opts.onChange.call(this, _4a8, _4a9);
                        $(this).closest("form").trigger("_change", [this]);
                    }
                });
            }, getText: function (jq) {
                var _4aa = jq.textbox("textbox");
                if (_4aa.is(":focus")) {
                    return _4aa.val();
                } else {
                    return jq.textbox("options").value;
                }
            }, getValue: function (jq) {
                return jq.data("textbox").textbox.find(".textbox-value").val();
            }, reset: function (jq) {
                return jq.each(function () {
                    var opts = $(this).textbox("options");
                    $(this).textbox("setValue", opts.originalValue);
                });
            }, getIcon: function (jq, _4ab) {
                return jq.data("textbox").textbox.find(".textbox-icon:eq(" + _4ab + ")");
            }, getTipX: function (jq) {
                var _4ac = jq.data("textbox");
                var opts = _4ac.options;
                var tb = _4ac.textbox;
                var _4ad = tb.find(".textbox-text");
                var _4ae = tb.find(".textbox-addon")._outerWidth();
                var _4af = tb.find(".textbox-button")._outerWidth();
                if (opts.tipPosition == "right") {
                    return (opts.iconAlign == "right" ? _4ae : 0) + (opts.buttonAlign == "right" ? _4af : 0) + 1;
                } else {
                    if (opts.tipPosition == "left") {
                        return (opts.iconAlign == "left" ? -_4ae : 0) + (opts.buttonAlign == "left" ? -_4af : 0) - 1;
                    } else {
                        return _4ae / 2 * (opts.iconAlign == "right" ? 1 : -1);
                    }
                }
            }
        };
        $.fn.textbox.parseOptions = function (_4b0) {
            var t = $(_4b0);
            return $.extend({}, $.fn.validatebox.parseOptions(_4b0), $.parser.parseOptions(_4b0, ["prompt", "iconCls", "iconAlign", "buttonText", "buttonIcon", "buttonAlign", {
                multiline: "boolean",
                editable: "boolean",
                iconWidth: "number"
            }]), {
                value: (t.val() || undefined),
                type: (t.attr("type") ? t.attr("type") : undefined),
                disabled: (t.attr("disabled") ? true : undefined),
                readonly: (t.attr("readonly") ? true : undefined)
            });
        };
        $.fn.textbox.defaults = $.extend({}, $.fn.validatebox.defaults, {
            width: "auto",
            height: 22,
            prompt: "",
            value: "",
            type: "text",
            multiline: false,
            editable: true,
            disabled: false,
            readonly: false,
            icons: [],
            iconCls: null,
            iconAlign: "right",
            iconWidth: 18,
            buttonText: "",
            buttonIcon: null,
            buttonAlign: "right",
            inputEvents: {
                blur: function (e) {
                    var t = $(e.data.target);
                    var opts = t.textbox("options");
                    t.textbox("setValue", opts.value);
                }, keydown: function (e) {
                    if (e.keyCode == 13) {
                        var t = $(e.data.target);
                        t.textbox("setValue", t.textbox("getText"));
                    }
                }
            },
            onChange: function (_4b1, _4b2) {
            },
            onResize: function (_4b3, _4b4) {
            },
            onClickButton: function () {
            },
            onClickIcon: function (_4b5) {
            }
        });
    })(jQuery);
    (function ($) {
        var _4b6 = 0;

        function _4b7(_4b8) {
            var _4b9 = $.data(_4b8, "filebox");
            var opts = _4b9.options;
            var id = "filebox_file_id_" + (++_4b6);
            $(_4b8).addClass("filebox-f").textbox(opts);
            $(_4b8).textbox("textbox").attr("readonly", "readonly");
            _4b9.filebox = $(_4b8).next().addClass("filebox");
            _4b9.filebox.find(".textbox-value").remove();
            opts.oldValue = "";
            var file = $("<input type=\"file\" class=\"textbox-value\">").appendTo(_4b9.filebox);
            file.attr("id", id).attr("name", $(_4b8).attr("textboxName") || "");
            file.change(function () {
                $(_4b8).filebox("setText", this.value);
                opts.onChange.call(_4b8, this.value, opts.oldValue);
                opts.oldValue = this.value;
            });
            var btn = $(_4b8).filebox("button");
            if (btn.length) {
                $("<label class=\"filebox-label\" for=\"" + id + "\"></label>").appendTo(btn);
                if (btn.linkbutton("options").disabled) {
                    file.attr("disabled", "disabled");
                } else {
                    file.removeAttr("disabled");
                }
            }
        };
        $.fn.filebox = function (_4ba, _4bb) {
            if (typeof _4ba == "string") {
                var _4bc = $.fn.filebox.methods[_4ba];
                if (_4bc) {
                    return _4bc(this, _4bb);
                } else {
                    return this.textbox(_4ba, _4bb);
                }
            }
            _4ba = _4ba || {};
            return this.each(function () {
                var _4bd = $.data(this, "filebox");
                if (_4bd) {
                    $.extend(_4bd.options, _4ba);
                } else {
                    $.data(this, "filebox", {options: $.extend({}, $.fn.filebox.defaults, $.fn.filebox.parseOptions(this), _4ba)});
                }
                _4b7(this);
            });
        };
        $.fn.filebox.methods = {
            options: function (jq) {
                var opts = jq.textbox("options");
                return $.extend($.data(jq[0], "filebox").options, {
                    width: opts.width,
                    value: opts.value,
                    originalValue: opts.originalValue,
                    disabled: opts.disabled,
                    readonly: opts.readonly
                });
            }
        };
        $.fn.filebox.parseOptions = function (_4be) {
            return $.extend({}, $.fn.textbox.parseOptions(_4be), {});
        };
        $.fn.filebox.defaults = $.extend({}, $.fn.textbox.defaults, {
            buttonIcon: null,
            buttonText: "Choose File",
            buttonAlign: "right",
            inputEvents: {}
        });
    })(jQuery);
    (function ($) {
        function _4bf(_4c0) {
            var _4c1 = $.data(_4c0, "searchbox");
            var opts = _4c1.options;
            var _4c2 = $.extend(true, [], opts.icons);
            _4c2.push({
                iconCls: "searchbox-button", handler: function (e) {
                    var t = $(e.data.target);
                    var opts = t.searchbox("options");
                    opts.searcher.call(e.data.target, t.searchbox("getValue"), t.searchbox("getName"));
                }
            });
            _4c3();
            var _4c4 = _4c5();
            $(_4c0).addClass("searchbox-f").textbox($.extend({}, opts, {
                icons: _4c2,
                buttonText: (_4c4 ? _4c4.text : "")
            }));
            $(_4c0).attr("searchboxName", $(_4c0).attr("textboxName"));
            _4c1.searchbox = $(_4c0).next();
            _4c1.searchbox.addClass("searchbox");
            _4c6(_4c4);
            function _4c3() {
                if (opts.menu) {
                    _4c1.menu = $(opts.menu).menu();
                    var _4c7 = _4c1.menu.menu("options");
                    var _4c8 = _4c7.onClick;
                    _4c7.onClick = function (item) {
                        _4c6(item);
                        _4c8.call(this, item);
                    };
                } else {
                    if (_4c1.menu) {
                        _4c1.menu.menu("destroy");
                    }
                    _4c1.menu = null;
                }
            };
            function _4c5() {
                if (_4c1.menu) {
                    var item = _4c1.menu.children("div.menu-item:first");
                    _4c1.menu.children("div.menu-item").each(function () {
                        var _4c9 = $.extend({}, $.parser.parseOptions(this), {selected: ($(this).attr("selected") ? true : undefined)});
                        if (_4c9.selected) {
                            item = $(this);
                            return false;
                        }
                    });
                    return _4c1.menu.menu("getItem", item[0]);
                } else {
                    return null;
                }
            };
            function _4c6(item) {
                if (!item) {
                    return;
                }
                $(_4c0).textbox("button").menubutton({
                    text: item.text,
                    iconCls: (item.iconCls || null),
                    menu: _4c1.menu,
                    menuAlign: opts.buttonAlign,
                    plain: false
                });
                _4c1.searchbox.find("input.textbox-value").attr("name", item.name || item.text);
                $(_4c0).searchbox("resize");
            };
        };
        $.fn.searchbox = function (_4ca, _4cb) {
            if (typeof _4ca == "string") {
                var _4cc = $.fn.searchbox.methods[_4ca];
                if (_4cc) {
                    return _4cc(this, _4cb);
                } else {
                    return this.textbox(_4ca, _4cb);
                }
            }
            _4ca = _4ca || {};
            return this.each(function () {
                var _4cd = $.data(this, "searchbox");
                if (_4cd) {
                    $.extend(_4cd.options, _4ca);
                } else {
                    $.data(this, "searchbox", {options: $.extend({}, $.fn.searchbox.defaults, $.fn.searchbox.parseOptions(this), _4ca)});
                }
                _4bf(this);
            });
        };
        $.fn.searchbox.methods = {
            options: function (jq) {
                var opts = jq.textbox("options");
                return $.extend($.data(jq[0], "searchbox").options, {
                    width: opts.width,
                    value: opts.value,
                    originalValue: opts.originalValue,
                    disabled: opts.disabled,
                    readonly: opts.readonly
                });
            }, menu: function (jq) {
                return $.data(jq[0], "searchbox").menu;
            }, getName: function (jq) {
                return $.data(jq[0], "searchbox").searchbox.find("input.textbox-value").attr("name");
            }, selectName: function (jq, name) {
                return jq.each(function () {
                    var menu = $.data(this, "searchbox").menu;
                    if (menu) {
                        menu.children("div.menu-item").each(function () {
                            var item = menu.menu("getItem", this);
                            if (item.name == name) {
                                $(this).triggerHandler("click");
                                return false;
                            }
                        });
                    }
                });
            }, destroy: function (jq) {
                return jq.each(function () {
                    var menu = $(this).searchbox("menu");
                    if (menu) {
                        menu.menu("destroy");
                    }
                    $(this).textbox("destroy");
                });
            }
        };
        $.fn.searchbox.parseOptions = function (_4ce) {
            var t = $(_4ce);
            return $.extend({}, $.fn.textbox.parseOptions(_4ce), $.parser.parseOptions(_4ce, ["menu"]), {searcher: (t.attr("searcher") ? eval(t.attr("searcher")) : undefined)});
        };
        $.fn.searchbox.defaults = $.extend({}, $.fn.textbox.defaults, {
            inputEvents: $.extend({}, $.fn.textbox.defaults.inputEvents, {
                keydown: function (e) {
                    if (e.keyCode == 13) {
                        e.preventDefault();
                        var t = $(e.data.target);
                        var opts = t.searchbox("options");
                        t.searchbox("setValue", $(this).val());
                        opts.searcher.call(e.data.target, t.searchbox("getValue"), t.searchbox("getName"));
                        return false;
                    }
                }
            }), buttonAlign: "left", menu: null, searcher: function (_4cf, name) {
            }
        });
    })(jQuery);
    (function ($) {
        function _4d0(_4d1, _4d2) {
            var opts = $.data(_4d1, "form").options;
            $.extend(opts, _4d2 || {});
            var _4d3 = $.extend({}, opts.queryParams);
            if (opts.onSubmit.call(_4d1, _4d3) == false) {
                return;
            }
            $(_4d1).find(".textbox-text:focus").blur();
            var _4d4 = "easyui_frame_" + (new Date().getTime());
            var _4d5 = $("<iframe id=" + _4d4 + " name=" + _4d4 + "></iframe>").appendTo("body");
            _4d5.attr("src", window.ActiveXObject ? "javascript:false" : "about:blank");
            _4d5.css({position: "absolute", top: -1000, left: -1000});
            _4d5.bind("load", cb);
            _4d6(_4d3);
            function _4d6(_4d7) {
                var form = $(_4d1);
                if (opts.url) {
                    form.attr("action", opts.url);
                }
                var t = form.attr("target"), a = form.attr("action");
                form.attr("target", _4d4);
                var _4d8 = $();
                try {
                    for (var n in _4d7) {
                        var _4d9 = $("<input type=\"hidden\" name=\"" + n + "\">").val(_4d7[n]).appendTo(form);
                        _4d8 = _4d8.add(_4d9);
                    }
                    _4da();
                    form[0].submit();
                }
                finally {
                    form.attr("action", a);
                    t ? form.attr("target", t) : form.removeAttr("target");
                    _4d8.remove();
                }
            };
            function _4da() {
                var f = $("#" + _4d4);
                if (!f.length) {
                    return;
                }
                try {
                    var s = f.contents()[0].readyState;
                    if (s && s.toLowerCase() == "uninitialized") {
                        setTimeout(_4da, 100);
                    }
                }
                catch (e) {
                    cb();
                }
            };
            var _4db = 10;

            function cb() {
                var f = $("#" + _4d4);
                if (!f.length) {
                    return;
                }
                f.unbind();
                var data = "";
                try {
                    var body = f.contents().find("body");
                    data = body.html();
                    if (data == "") {
                        if (--_4db) {
                            setTimeout(cb, 100);
                            return;
                        }
                    }
                    var ta = body.find(">textarea");
                    if (ta.length) {
                        data = ta.val();
                    } else {
                        var pre = body.find(">pre");
                        if (pre.length) {
                            data = pre.html();
                        }
                    }
                }
                catch (e) {
                }
                opts.success(data);
                setTimeout(function () {
                    f.unbind();
                    f.remove();
                }, 100);
            };
        };
        function load(_4dc, data) {
            var opts = $.data(_4dc, "form").options;
            if (typeof data == "string") {
                var _4dd = {};
                if (opts.onBeforeLoad.call(_4dc, _4dd) == false) {
                    return;
                }
                $.ajax({
                    url: data, data: _4dd, dataType: "json", success: function (data) {
                        _4de(data);
                    }, error: function () {
                        opts.onLoadError.apply(_4dc, arguments);
                    }
                });
            } else {
                _4de(data);
            }
            function _4de(data) {
                var form = $(_4dc);
                for (var name in data) {
                    var val = data[name];
                    if (!_4df(name, val)) {
                        if (!_4e0(name, val)) {
                            form.find("input[name=\"" + name + "\"]").val(val);
                            form.find("textarea[name=\"" + name + "\"]").val(val);
                            form.find("select[name=\"" + name + "\"]").val(val);
                        }
                    }
                }
                opts.onLoadSuccess.call(_4dc, data);
                form.form("validate");
            };
            function _4df(name, val) {
                var cc = $(_4dc).find("input[name=\"" + name + "\"][type=radio], input[name=\"" + name + "\"][type=checkbox]");
                if (cc.length) {
                    cc._propAttr("checked", false);
                    cc.each(function () {
                        var f = $(this);
                        if (f.val() == String(val) || $.inArray(f.val(), $.isArray(val) ? val : [val]) >= 0) {
                            f._propAttr("checked", true);
                        }
                    });
                    return true;
                }
                return false;
            };
            function _4e0(name, val) {
                var _4e1 = $(_4dc).find("[textboxName=\"" + name + "\"],[sliderName=\"" + name + "\"]");
                if (_4e1.length) {
                    for (var i = 0; i < opts.fieldTypes.length; i++) {
                        var type = opts.fieldTypes[i];
                        var _4e2 = _4e1.data(type);
                        if (_4e2) {
                            if (_4e2.options.multiple || _4e2.options.range) {
                                _4e1[type]("setValues", val);
                            } else {
                                _4e1[type]("setValue", val);
                            }
                            return true;
                        }
                    }
                }
                return false;
            };
        };
        function _4e3(_4e4) {
            $("input,select,textarea", _4e4).each(function () {
                var t = this.type, tag = this.tagName.toLowerCase();
                if (t == "text" || t == "hidden" || t == "password" || tag == "textarea") {
                    this.value = "";
                } else {
                    if (t == "file") {
                        var file = $(this);
                        if (!file.hasClass("textbox-value")) {
                            var _4e5 = file.clone().val("");
                            _4e5.insertAfter(file);
                            if (file.data("validatebox")) {
                                file.validatebox("destroy");
                                _4e5.validatebox();
                            } else {
                                file.remove();
                            }
                        }
                    } else {
                        if (t == "checkbox" || t == "radio") {
                            this.checked = false;
                        } else {
                            if (tag == "select") {
                                this.selectedIndex = -1;
                            }
                        }
                    }
                }
            });
            var form = $(_4e4);
            var opts = $.data(_4e4, "form").options;
            for (var i = opts.fieldTypes.length - 1; i >= 0; i--) {
                var type = opts.fieldTypes[i];
                var _4e6 = form.find("." + type + "-f");
                if (_4e6.length && _4e6[type]) {
                    _4e6[type]("clear");
                }
            }
            form.form("validate");
        };
        function _4e7(_4e8) {
            _4e8.reset();
            var form = $(_4e8);
            var opts = $.data(_4e8, "form").options;
            for (var i = opts.fieldTypes.length - 1; i >= 0; i--) {
                var type = opts.fieldTypes[i];
                var _4e9 = form.find("." + type + "-f");
                if (_4e9.length && _4e9[type]) {
                    _4e9[type]("reset");
                }
            }
            form.form("validate");
        };
        function _4ea(_4eb) {
            var _4ec = $.data(_4eb, "form").options;
            $(_4eb).unbind(".form");
            if (_4ec.ajax) {
                $(_4eb).bind("submit.form", function () {
                    setTimeout(function () {
                        _4d0(_4eb, _4ec);
                    }, 0);
                    return false;
                });
            }
            $(_4eb).bind("_change.form", function (e, t) {
                _4ec.onChange.call(this, t);
            }).bind("change.form", function (e) {
                var t = e.target;
                if (!$(t).hasClass("textbox-text")) {
                    _4ec.onChange.call(this, t);
                }
            });
            _4ed(_4eb, _4ec.novalidate);
        };
        function _4ee(_4ef, _4f0) {
            _4f0 = _4f0 || {};
            var _4f1 = $.data(_4ef, "form");
            if (_4f1) {
                $.extend(_4f1.options, _4f0);
            } else {
                $.data(_4ef, "form", {options: $.extend({}, $.fn.form.defaults, $.fn.form.parseOptions(_4ef), _4f0)});
            }
        };
        function _4f2(_4f3) {
            if ($.fn.validatebox) {
                var t = $(_4f3);
                t.find(".validatebox-text:not(:disabled)").validatebox("validate");
                var _4f4 = t.find(".validatebox-invalid");
                _4f4.filter(":not(:disabled):first").focus();
                return _4f4.length == 0;
            }
            return true;
        };
        function _4ed(_4f5, _4f6) {
            var opts = $.data(_4f5, "form").options;
            opts.novalidate = _4f6;
            $(_4f5).find(".validatebox-text:not(:disabled)").validatebox(_4f6 ? "disableValidation" : "enableValidation");
        };
        $.fn.form = function (_4f7, _4f8) {
            if (typeof _4f7 == "string") {
                this.each(function () {
                    _4ee(this);
                });
                return $.fn.form.methods[_4f7](this, _4f8);
            }
            return this.each(function () {
                _4ee(this, _4f7);
                _4ea(this);
            });
        };
        $.fn.form.methods = {
            options: function (jq) {
                return $.data(jq[0], "form").options;
            }, submit: function (jq, _4f9) {
                return jq.each(function () {
                    _4d0(this, _4f9);
                });
            }, load: function (jq, data) {
                return jq.each(function () {
                    load(this, data);
                });
            }, clear: function (jq) {
                return jq.each(function () {
                    _4e3(this);
                });
            }, reset: function (jq) {
                return jq.each(function () {
                    _4e7(this);
                });
            }, validate: function (jq) {
                return _4f2(jq[0]);
            }, disableValidation: function (jq) {
                return jq.each(function () {
                    _4ed(this, true);
                });
            }, enableValidation: function (jq) {
                return jq.each(function () {
                    _4ed(this, false);
                });
            }
        };
        $.fn.form.parseOptions = function (_4fa) {
            var t = $(_4fa);
            return $.extend({}, $.parser.parseOptions(_4fa, [{ajax: "boolean"}]), {url: (t.attr("action") ? t.attr("action") : undefined)});
        };
        $.fn.form.defaults = {
            fieldTypes: ["combobox", "combotree", "combogrid", "datetimebox", "datebox", "combo", "datetimespinner", "timespinner", "numberspinner", "spinner", "slider", "searchbox", "numberbox", "textbox"],
            novalidate: false,
            ajax: true,
            url: null,
            queryParams: {},
            onSubmit: function (_4fb) {
                return $(this).form("validate");
            },
            success: function (data) {
            },
            onBeforeLoad: function (_4fc) {
            },
            onLoadSuccess: function (data) {
            },
            onLoadError: function () {
            },
            onChange: function (_4fd) {
            }
        };
    })(jQuery);
    (function ($) {
        function _4fe(_4ff) {
            var _500 = $.data(_4ff, "numberbox");
            var opts = _500.options;
            $(_4ff).addClass("numberbox-f").textbox(opts);
            $(_4ff).textbox("textbox").css({imeMode: "disabled"});
            $(_4ff).attr("numberboxName", $(_4ff).attr("textboxName"));
            _500.numberbox = $(_4ff).next();
            _500.numberbox.addClass("numberbox");
            var _501 = opts.parser.call(_4ff, opts.value);
            var _502 = opts.formatter.call(_4ff, _501);
            $(_4ff).numberbox("initValue", _501).numberbox("setText", _502);
        };
        function _503(_504, _505) {
            var _506 = $.data(_504, "numberbox");
            var opts = _506.options;
            var _505 = opts.parser.call(_504, _505);
            var text = opts.formatter.call(_504, _505);
            opts.value = _505;
            $(_504).textbox("setText", text).textbox("setValue", _505);
            text = opts.formatter.call(_504, $(_504).textbox("getValue"));
            $(_504).textbox("setText", text);
        };
        $.fn.numberbox = function (_507, _508) {
            if (typeof _507 == "string") {
                var _509 = $.fn.numberbox.methods[_507];
                if (_509) {
                    return _509(this, _508);
                } else {
                    return this.textbox(_507, _508);
                }
            }
            _507 = _507 || {};
            return this.each(function () {
                var _50a = $.data(this, "numberbox");
                if (_50a) {
                    $.extend(_50a.options, _507);
                } else {
                    _50a = $.data(this, "numberbox", {options: $.extend({}, $.fn.numberbox.defaults, $.fn.numberbox.parseOptions(this), _507)});
                }
                _4fe(this);
            });
        };
        $.fn.numberbox.methods = {
            options: function (jq) {
                var opts = jq.data("textbox") ? jq.textbox("options") : {};
                return $.extend($.data(jq[0], "numberbox").options, {
                    width: opts.width,
                    originalValue: opts.originalValue,
                    disabled: opts.disabled,
                    readonly: opts.readonly
                });
            }, fix: function (jq) {
                return jq.each(function () {
                    $(this).numberbox("setValue", $(this).numberbox("getText"));
                });
            }, setValue: function (jq, _50b) {
                return jq.each(function () {
                    _503(this, _50b);
                });
            }, clear: function (jq) {
                return jq.each(function () {
                    $(this).textbox("clear");
                    $(this).numberbox("options").value = "";
                });
            }, reset: function (jq) {
                return jq.each(function () {
                    $(this).textbox("reset");
                    $(this).numberbox("setValue", $(this).numberbox("getValue"));
                });
            }
        };
        $.fn.numberbox.parseOptions = function (_50c) {
            var t = $(_50c);
            return $.extend({}, $.fn.textbox.parseOptions(_50c), $.parser.parseOptions(_50c, ["decimalSeparator", "groupSeparator", "suffix", {
                min: "number",
                max: "number",
                precision: "number"
            }]), {prefix: (t.attr("prefix") ? t.attr("prefix") : undefined)});
        };
        $.fn.numberbox.defaults = $.extend({}, $.fn.textbox.defaults, {
            inputEvents: {
                keypress: function (e) {
                    var _50d = e.data.target;
                    var opts = $(_50d).numberbox("options");
                    return opts.filter.call(_50d, e);
                }, blur: function (e) {
                    var _50e = e.data.target;
                    $(_50e).numberbox("setValue", $(_50e).numberbox("getText"));
                }, keydown: function (e) {
                    if (e.keyCode == 13) {
                        var _50f = e.data.target;
                        $(_50f).numberbox("setValue", $(_50f).numberbox("getText"));
                    }
                }
            },
            min: null,
            max: null,
            precision: 0,
            decimalSeparator: ".",
            groupSeparator: "",
            prefix: "",
            suffix: "",
            filter: function (e) {
                var opts = $(this).numberbox("options");
                var s = $(this).numberbox("getText");
                if (e.which == 13) {
                    return true;
                }
                if (e.which == 45) {
                    return (s.indexOf("-") == -1 ? true : false);
                }
                var c = String.fromCharCode(e.which);
                if (c == opts.decimalSeparator) {
                    return (s.indexOf(c) == -1 ? true : false);
                } else {
                    if (c == opts.groupSeparator) {
                        return true;
                    } else {
                        if ((e.which >= 48 && e.which <= 57 && e.ctrlKey == false && e.shiftKey == false) || e.which == 0 || e.which == 8) {
                            return true;
                        } else {
                            if (e.ctrlKey == true && (e.which == 99 || e.which == 118)) {
                                return true;
                            } else {
                                return false;
                            }
                        }
                    }
                }
            },
            formatter: function (_510) {
                if (!_510) {
                    return _510;
                }
                _510 = _510 + "";
                var opts = $(this).numberbox("options");
                var s1 = _510, s2 = "";
                var dpos = _510.indexOf(".");
                if (dpos >= 0) {
                    s1 = _510.substring(0, dpos);
                    s2 = _510.substring(dpos + 1, _510.length);
                }
                if (opts.groupSeparator) {
                    var p = /(\d+)(\d{3})/;
                    while (p.test(s1)) {
                        s1 = s1.replace(p, "$1" + opts.groupSeparator + "$2");
                    }
                }
                if (s2) {
                    return opts.prefix + s1 + opts.decimalSeparator + s2 + opts.suffix;
                } else {
                    return opts.prefix + s1 + opts.suffix;
                }
            },
            parser: function (s) {
                s = s + "";
                var opts = $(this).numberbox("options");
                if (parseFloat(s) != s) {
                    if (opts.prefix) {
                        s = $.trim(s.replace(new RegExp("\\" + $.trim(opts.prefix), "g"), ""));
                    }
                    if (opts.suffix) {
                        s = $.trim(s.replace(new RegExp("\\" + $.trim(opts.suffix), "g"), ""));
                    }
                    if (opts.groupSeparator) {
                        s = $.trim(s.replace(new RegExp("\\" + opts.groupSeparator, "g"), ""));
                    }
                    if (opts.decimalSeparator) {
                        s = $.trim(s.replace(new RegExp("\\" + opts.decimalSeparator, "g"), "."));
                    }
                    s = s.replace(/\s/g, "");
                }
                var val = parseFloat(s).toFixed(opts.precision);
                if (isNaN(val)) {
                    val = "";
                } else {
                    if (typeof (opts.min) == "number" && val < opts.min) {
                        val = opts.min.toFixed(opts.precision);
                    } else {
                        if (typeof (opts.max) == "number" && val > opts.max) {
                            val = opts.max.toFixed(opts.precision);
                        }
                    }
                }
                return val;
            }
        });
    })(jQuery);
    (function ($) {
        function _511(_512, _513) {
            var opts = $.data(_512, "calendar").options;
            var t = $(_512);
            if (_513) {
                $.extend(opts, {width: _513.width, height: _513.height});
            }
            t._size(opts, t.parent());
            t.find(".calendar-body")._outerHeight(t.height() - t.find(".calendar-header")._outerHeight());
            if (t.find(".calendar-menu").is(":visible")) {
                _514(_512);
            }
        };
        function init(_515) {
            $(_515).addClass("calendar").html("<div class=\"calendar-header\">" + "<div class=\"calendar-nav calendar-prevmonth\"></div>" + "<div class=\"calendar-nav calendar-nextmonth\"></div>" + "<div class=\"calendar-nav calendar-prevyear\"></div>" + "<div class=\"calendar-nav calendar-nextyear\"></div>" + "<div class=\"calendar-title\">" + "<span class=\"calendar-text\"></span>" + "</div>" + "</div>" + "<div class=\"calendar-body\">" + "<div class=\"calendar-menu\">" + "<div class=\"calendar-menu-year-inner\">" + "<span class=\"calendar-nav calendar-menu-prev\"></span>" + "<span><input class=\"calendar-menu-year\" type=\"text\"></input></span>" + "<span class=\"calendar-nav calendar-menu-next\"></span>" + "</div>" + "<div class=\"calendar-menu-month-inner\">" + "</div>" + "</div>" + "</div>");
            $(_515).bind("_resize", function (e, _516) {
                if ($(this).hasClass("easyui-fluid") || _516) {
                    _511(_515);
                }
                return false;
            });
        };
        function _517(_518) {
            var opts = $.data(_518, "calendar").options;
            var menu = $(_518).find(".calendar-menu");
            menu.find(".calendar-menu-year").unbind(".calendar").bind("keypress.calendar", function (e) {
                if (e.keyCode == 13) {
                    _519(true);
                }
            });
            $(_518).unbind(".calendar").bind("mouseover.calendar", function (e) {
                var t = _51a(e.target);
                if (t.hasClass("calendar-nav") || t.hasClass("calendar-text") || (t.hasClass("calendar-day") && !t.hasClass("calendar-disabled"))) {
                    t.addClass("calendar-nav-hover");
                }
            }).bind("mouseout.calendar", function (e) {
                var t = _51a(e.target);
                if (t.hasClass("calendar-nav") || t.hasClass("calendar-text") || (t.hasClass("calendar-day") && !t.hasClass("calendar-disabled"))) {
                    t.removeClass("calendar-nav-hover");
                }
            }).bind("click.calendar", function (e) {
                var t = _51a(e.target);
                if (t.hasClass("calendar-menu-next") || t.hasClass("calendar-nextyear")) {
                    _51b(1);
                } else {
                    if (t.hasClass("calendar-menu-prev") || t.hasClass("calendar-prevyear")) {
                        _51b(-1);
                    } else {
                        if (t.hasClass("calendar-menu-month")) {
                            menu.find(".calendar-selected").removeClass("calendar-selected");
                            t.addClass("calendar-selected");
                            _519(true);
                        } else {
                            if (t.hasClass("calendar-prevmonth")) {
                                _51c(-1);
                            } else {
                                if (t.hasClass("calendar-nextmonth")) {
                                    _51c(1);
                                } else {
                                    if (t.hasClass("calendar-text")) {
                                        if (menu.is(":visible")) {
                                            menu.hide();
                                        } else {
                                            _514(_518);
                                        }
                                    } else {
                                        if (t.hasClass("calendar-day")) {
                                            if (t.hasClass("calendar-disabled")) {
                                                return;
                                            }
                                            var _51d = opts.current;
                                            t.closest("div.calendar-body").find(".calendar-selected").removeClass("calendar-selected");
                                            t.addClass("calendar-selected");
                                            var _51e = t.attr("abbr").split(",");
                                            var y = parseInt(_51e[0]);
                                            var m = parseInt(_51e[1]);
                                            var d = parseInt(_51e[2]);
                                            opts.current = new Date(y, m - 1, d);
                                            opts.onSelect.call(_518, opts.current);
                                            if (!_51d || _51d.getTime() != opts.current.getTime()) {
                                                opts.onChange.call(_518, opts.current, _51d);
                                            }
                                            if (opts.year != y || opts.month != m) {
                                                opts.year = y;
                                                opts.month = m;
                                                show(_518);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            });
            function _51a(t) {
                var day = $(t).closest(".calendar-day");
                if (day.length) {
                    return day;
                } else {
                    return $(t);
                }
            };
            function _519(_51f) {
                var menu = $(_518).find(".calendar-menu");
                var year = menu.find(".calendar-menu-year").val();
                var _520 = menu.find(".calendar-selected").attr("abbr");
                if (!isNaN(year)) {
                    opts.year = parseInt(year);
                    opts.month = parseInt(_520);
                    show(_518);
                }
                if (_51f) {
                    menu.hide();
                }
            };
            function _51b(_521) {
                opts.year += _521;
                show(_518);
                menu.find(".calendar-menu-year").val(opts.year);
            };
            function _51c(_522) {
                opts.month += _522;
                if (opts.month > 12) {
                    opts.year++;
                    opts.month = 1;
                } else {
                    if (opts.month < 1) {
                        opts.year--;
                        opts.month = 12;
                    }
                }
                show(_518);
                menu.find("td.calendar-selected").removeClass("calendar-selected");
                menu.find("td:eq(" + (opts.month - 1) + ")").addClass("calendar-selected");
            };
        };
        function _514(_523) {
            var opts = $.data(_523, "calendar").options;
            $(_523).find(".calendar-menu").show();
            if ($(_523).find(".calendar-menu-month-inner").is(":empty")) {
                $(_523).find(".calendar-menu-month-inner").empty();
                var t = $("<table class=\"calendar-mtable\"></table>").appendTo($(_523).find(".calendar-menu-month-inner"));
                var idx = 0;
                for (var i = 0; i < 3; i++) {
                    var tr = $("<tr></tr>").appendTo(t);
                    for (var j = 0; j < 4; j++) {
                        $("<td class=\"calendar-nav calendar-menu-month\"></td>").html(opts.months[idx++]).attr("abbr", idx).appendTo(tr);
                    }
                }
            }
            var body = $(_523).find(".calendar-body");
            var sele = $(_523).find(".calendar-menu");
            var _524 = sele.find(".calendar-menu-year-inner");
            var _525 = sele.find(".calendar-menu-month-inner");
            _524.find("input").val(opts.year).focus();
            _525.find("td.calendar-selected").removeClass("calendar-selected");
            _525.find("td:eq(" + (opts.month - 1) + ")").addClass("calendar-selected");
            sele._outerWidth(body._outerWidth());
            sele._outerHeight(body._outerHeight());
            _525._outerHeight(sele.height() - _524._outerHeight());
        };
        function _526(_527, year, _528) {
            var opts = $.data(_527, "calendar").options;
            var _529 = [];
            var _52a = new Date(year, _528, 0).getDate();
            for (var i = 1; i <= _52a; i++) {
                _529.push([year, _528, i]);
            }
            var _52b = [], week = [];
            var _52c = -1;
            while (_529.length > 0) {
                var date = _529.shift();
                week.push(date);
                var day = new Date(date[0], date[1] - 1, date[2]).getDay();
                if (_52c == day) {
                    day = 0;
                } else {
                    if (day == (opts.firstDay == 0 ? 7 : opts.firstDay) - 1) {
                        _52b.push(week);
                        week = [];
                    }
                }
                _52c = day;
            }
            if (week.length) {
                _52b.push(week);
            }
            var _52d = _52b[0];
            if (_52d.length < 7) {
                while (_52d.length < 7) {
                    var _52e = _52d[0];
                    var date = new Date(_52e[0], _52e[1] - 1, _52e[2] - 1);
                    _52d.unshift([date.getFullYear(), date.getMonth() + 1, date.getDate()]);
                }
            } else {
                var _52e = _52d[0];
                var week = [];
                for (var i = 1; i <= 7; i++) {
                    var date = new Date(_52e[0], _52e[1] - 1, _52e[2] - i);
                    week.unshift([date.getFullYear(), date.getMonth() + 1, date.getDate()]);
                }
                _52b.unshift(week);
            }
            var _52f = _52b[_52b.length - 1];
            while (_52f.length < 7) {
                var _530 = _52f[_52f.length - 1];
                var date = new Date(_530[0], _530[1] - 1, _530[2] + 1);
                _52f.push([date.getFullYear(), date.getMonth() + 1, date.getDate()]);
            }
            if (_52b.length < 6) {
                var _530 = _52f[_52f.length - 1];
                var week = [];
                for (var i = 1; i <= 7; i++) {
                    var date = new Date(_530[0], _530[1] - 1, _530[2] + i);
                    week.push([date.getFullYear(), date.getMonth() + 1, date.getDate()]);
                }
                _52b.push(week);
            }
            return _52b;
        };
        function show(_531) {
            var opts = $.data(_531, "calendar").options;
            if (opts.current && !opts.validator.call(_531, opts.current)) {
                opts.current = null;
            }
            var now = new Date();
            var _532 = now.getFullYear() + "," + (now.getMonth() + 1) + "," + now.getDate();
            var _533 = opts.current ? (opts.current.getFullYear() + "," + (opts.current.getMonth() + 1) + "," + opts.current.getDate()) : "";
            var _534 = 6 - opts.firstDay;
            var _535 = _534 + 1;
            if (_534 >= 7) {
                _534 -= 7;
            }
            if (_535 >= 7) {
                _535 -= 7;
            }
            $(_531).find(".calendar-title span").html(opts.months[opts.month - 1] + " " + opts.year);
            var body = $(_531).find("div.calendar-body");
            body.children("table").remove();
            var data = ["<table class=\"calendar-dtable\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\">"];
            data.push("<thead><tr>");
            for (var i = opts.firstDay; i < opts.weeks.length; i++) {
                data.push("<th>" + opts.weeks[i] + "</th>");
            }
            for (var i = 0; i < opts.firstDay; i++) {
                data.push("<th>" + opts.weeks[i] + "</th>");
            }
            data.push("</tr></thead>");
            data.push("<tbody>");
            var _536 = _526(_531, opts.year, opts.month);
            for (var i = 0; i < _536.length; i++) {
                var week = _536[i];
                var cls = "";
                if (i == 0) {
                    cls = "calendar-first";
                } else {
                    if (i == _536.length - 1) {
                        cls = "calendar-last";
                    }
                }
                data.push("<tr class=\"" + cls + "\">");
                for (var j = 0; j < week.length; j++) {
                    var day = week[j];
                    var s = day[0] + "," + day[1] + "," + day[2];
                    var _537 = new Date(day[0], parseInt(day[1]) - 1, day[2]);
                    var d = opts.formatter.call(_531, _537);
                    var css = opts.styler.call(_531, _537);
                    var _538 = "";
                    var _539 = "";
                    if (typeof css == "string") {
                        _539 = css;
                    } else {
                        if (css) {
                            _538 = css["class"] || "";
                            _539 = css["style"] || "";
                        }
                    }
                    var cls = "calendar-day";
                    if (!(opts.year == day[0] && opts.month == day[1])) {
                        cls += " calendar-other-month";
                    }
                    if (s == _532) {
                        cls += " calendar-today";
                    }
                    if (s == _533) {
                        cls += " calendar-selected";
                    }
                    if (j == _534) {
                        cls += " calendar-saturday";
                    } else {
                        if (j == _535) {
                            cls += " calendar-sunday";
                        }
                    }
                    if (j == 0) {
                        cls += " calendar-first";
                    } else {
                        if (j == week.length - 1) {
                            cls += " calendar-last";
                        }
                    }
                    cls += " " + _538;
                    if (!opts.validator.call(_531, _537)) {
                        cls += " calendar-disabled";
                    }
                    data.push("<td class=\"" + cls + "\" abbr=\"" + s + "\" style=\"" + _539 + "\">" + d + "</td>");
                }
                data.push("</tr>");
            }
            data.push("</tbody>");
            data.push("</table>");
            body.append(data.join(""));
            body.children("table.calendar-dtable").prependTo(body);
            opts.onNavigate.call(_531, opts.year, opts.month);
        };
        $.fn.calendar = function (_53a, _53b) {
            if (typeof _53a == "string") {
                return $.fn.calendar.methods[_53a](this, _53b);
            }
            _53a = _53a || {};
            return this.each(function () {
                var _53c = $.data(this, "calendar");
                if (_53c) {
                    $.extend(_53c.options, _53a);
                } else {
                    _53c = $.data(this, "calendar", {options: $.extend({}, $.fn.calendar.defaults, $.fn.calendar.parseOptions(this), _53a)});
                    init(this);
                }
                if (_53c.options.border == false) {
                    $(this).addClass("calendar-noborder");
                }
                _511(this);
                _517(this);
                show(this);
                $(this).find("div.calendar-menu").hide();
            });
        };
        $.fn.calendar.methods = {
            options: function (jq) {
                return $.data(jq[0], "calendar").options;
            }, resize: function (jq, _53d) {
                return jq.each(function () {
                    _511(this, _53d);
                });
            }, moveTo: function (jq, date) {
                return jq.each(function () {
                    if (!date) {
                        var now = new Date();
                        $(this).calendar({year: now.getFullYear(), month: now.getMonth() + 1, current: date});
                        return;
                    }
                    var opts = $(this).calendar("options");
                    if (opts.validator.call(this, date)) {
                        var _53e = opts.current;
                        $(this).calendar({year: date.getFullYear(), month: date.getMonth() + 1, current: date});
                        if (!_53e || _53e.getTime() != date.getTime()) {
                            opts.onChange.call(this, opts.current, _53e);
                        }
                    }
                });
            }
        };
        $.fn.calendar.parseOptions = function (_53f) {
            var t = $(_53f);
            return $.extend({}, $.parser.parseOptions(_53f, [{firstDay: "number", fit: "boolean", border: "boolean"}]));
        };
        $.fn.calendar.defaults = {
            width: 180,
            height: 180,
            fit: false,
            border: true,
            firstDay: 0,
            weeks: ["S", "M", "T", "W", "T", "F", "S"],
            months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            year: new Date().getFullYear(),
            month: new Date().getMonth() + 1,
            current: (function () {
                var d = new Date();
                return new Date(d.getFullYear(), d.getMonth(), d.getDate());
            })(),
            formatter: function (date) {
                return date.getDate();
            },
            styler: function (date) {
                return "";
            },
            validator: function (date) {
                return true;
            },
            onSelect: function (date) {
            },
            onChange: function (_540, _541) {
            },
            onNavigate: function (year, _542) {
            }
        };
    })(jQuery);
    (function ($) {
        function _543(_544) {
            var _545 = $.data(_544, "spinner");
            var opts = _545.options;
            var _546 = $.extend(true, [], opts.icons);
            _546.push({
                iconCls: "spinner-arrow", handler: function (e) {
                    _547(e);
                }
            });
            $(_544).addClass("spinner-f").textbox($.extend({}, opts, {icons: _546}));
            var _548 = $(_544).textbox("getIcon", _546.length - 1);
            _548.append("<a href=\"javascript:void(0)\" class=\"spinner-arrow-up\" tabindex=\"-1\"></a>");
            _548.append("<a href=\"javascript:void(0)\" class=\"spinner-arrow-down\" tabindex=\"-1\"></a>");
            $(_544).attr("spinnerName", $(_544).attr("textboxName"));
            _545.spinner = $(_544).next();
            _545.spinner.addClass("spinner");
        };
        function _547(e) {
            var _549 = e.data.target;
            var opts = $(_549).spinner("options");
            var up = $(e.target).closest("a.spinner-arrow-up");
            if (up.length) {
                opts.spin.call(_549, false);
                opts.onSpinUp.call(_549);
                $(_549).spinner("validate");
            }
            var down = $(e.target).closest("a.spinner-arrow-down");
            if (down.length) {
                opts.spin.call(_549, true);
                opts.onSpinDown.call(_549);
                $(_549).spinner("validate");
            }
        };
        $.fn.spinner = function (_54a, _54b) {
            if (typeof _54a == "string") {
                var _54c = $.fn.spinner.methods[_54a];
                if (_54c) {
                    return _54c(this, _54b);
                } else {
                    return this.textbox(_54a, _54b);
                }
            }
            _54a = _54a || {};
            return this.each(function () {
                var _54d = $.data(this, "spinner");
                if (_54d) {
                    $.extend(_54d.options, _54a);
                } else {
                    _54d = $.data(this, "spinner", {options: $.extend({}, $.fn.spinner.defaults, $.fn.spinner.parseOptions(this), _54a)});
                }
                _543(this);
            });
        };
        $.fn.spinner.methods = {
            options: function (jq) {
                var opts = jq.textbox("options");
                return $.extend($.data(jq[0], "spinner").options, {
                    width: opts.width,
                    value: opts.value,
                    originalValue: opts.originalValue,
                    disabled: opts.disabled,
                    readonly: opts.readonly
                });
            }
        };
        $.fn.spinner.parseOptions = function (_54e) {
            return $.extend({}, $.fn.textbox.parseOptions(_54e), $.parser.parseOptions(_54e, ["min", "max", {increment: "number"}]));
        };
        $.fn.spinner.defaults = $.extend({}, $.fn.textbox.defaults, {
            min: null, max: null, increment: 1, spin: function (down) {
            }, onSpinUp: function () {
            }, onSpinDown: function () {
            }
        });
    })(jQuery);
    (function ($) {
        function _54f(_550) {
            $(_550).addClass("numberspinner-f");
            var opts = $.data(_550, "numberspinner").options;
            $(_550).numberbox(opts).spinner(opts);
            $(_550).numberbox("setValue", opts.value);
        };
        function _551(_552, down) {
            var opts = $.data(_552, "numberspinner").options;
            var v = parseFloat($(_552).numberbox("getValue") || opts.value) || 0;
            if (down) {
                v -= opts.increment;
            } else {
                v += opts.increment;
            }
            $(_552).numberbox("setValue", v);
        };
        $.fn.numberspinner = function (_553, _554) {
            if (typeof _553 == "string") {
                var _555 = $.fn.numberspinner.methods[_553];
                if (_555) {
                    return _555(this, _554);
                } else {
                    return this.numberbox(_553, _554);
                }
            }
            _553 = _553 || {};
            return this.each(function () {
                var _556 = $.data(this, "numberspinner");
                if (_556) {
                    $.extend(_556.options, _553);
                } else {
                    $.data(this, "numberspinner", {options: $.extend({}, $.fn.numberspinner.defaults, $.fn.numberspinner.parseOptions(this), _553)});
                }
                _54f(this);
            });
        };
        $.fn.numberspinner.methods = {
            options: function (jq) {
                var opts = jq.numberbox("options");
                return $.extend($.data(jq[0], "numberspinner").options, {
                    width: opts.width,
                    value: opts.value,
                    originalValue: opts.originalValue,
                    disabled: opts.disabled,
                    readonly: opts.readonly
                });
            }
        };
        $.fn.numberspinner.parseOptions = function (_557) {
            return $.extend({}, $.fn.spinner.parseOptions(_557), $.fn.numberbox.parseOptions(_557), {});
        };
        $.fn.numberspinner.defaults = $.extend({}, $.fn.spinner.defaults, $.fn.numberbox.defaults, {
            spin: function (down) {
                _551(this, down);
            }
        });
    })(jQuery);
    (function ($) {
        function _558(_559) {
            var _55a = 0;
            if (_559.selectionStart) {
                _55a = _559.selectionStart;
            } else {
                if (_559.createTextRange) {
                    var _55b = _559.createTextRange();
                    var s = document.selection.createRange();
                    s.setEndPoint("StartToStart", _55b);
                    _55a = s.text.length;
                }
            }
            return _55a;
        };
        function _55c(_55d, _55e, end) {
            if (_55d.selectionStart) {
                _55d.setSelectionRange(_55e, end);
            } else {
                if (_55d.createTextRange) {
                    var _55f = _55d.createTextRange();
                    _55f.collapse();
                    _55f.moveEnd("character", end);
                    _55f.moveStart("character", _55e);
                    _55f.select();
                }
            }
        };
        function _560(_561) {
            var opts = $.data(_561, "timespinner").options;
            $(_561).addClass("timespinner-f").spinner(opts);
            var _562 = opts.formatter.call(_561, opts.parser.call(_561, opts.value));
            $(_561).timespinner("initValue", _562);
        };
        function _563(e) {
            var _564 = e.data.target;
            var opts = $.data(_564, "timespinner").options;
            var _565 = _558(this);
            for (var i = 0; i < opts.selections.length; i++) {
                var _566 = opts.selections[i];
                if (_565 >= _566[0] && _565 <= _566[1]) {
                    _567(_564, i);
                    return;
                }
            }
        };
        function _567(_568, _569) {
            var opts = $.data(_568, "timespinner").options;
            if (_569 != undefined) {
                opts.highlight = _569;
            }
            var _56a = opts.selections[opts.highlight];
            if (_56a) {
                var tb = $(_568).timespinner("textbox");
                _55c(tb[0], _56a[0], _56a[1]);
                tb.focus();
            }
        };
        function _56b(_56c, _56d) {
            var opts = $.data(_56c, "timespinner").options;
            var _56d = opts.parser.call(_56c, _56d);
            var text = opts.formatter.call(_56c, _56d);
            $(_56c).spinner("setValue", text);
        };
        function _56e(_56f, down) {
            var opts = $.data(_56f, "timespinner").options;
            var s = $(_56f).timespinner("getValue");
            var _570 = opts.selections[opts.highlight];
            var s1 = s.substring(0, _570[0]);
            var s2 = s.substring(_570[0], _570[1]);
            var s3 = s.substring(_570[1]);
            var v = s1 + ((parseInt(s2) || 0) + opts.increment * (down ? -1 : 1)) + s3;
            $(_56f).timespinner("setValue", v);
            _567(_56f);
        };
        $.fn.timespinner = function (_571, _572) {
            if (typeof _571 == "string") {
                var _573 = $.fn.timespinner.methods[_571];
                if (_573) {
                    return _573(this, _572);
                } else {
                    return this.spinner(_571, _572);
                }
            }
            _571 = _571 || {};
            return this.each(function () {
                var _574 = $.data(this, "timespinner");
                if (_574) {
                    $.extend(_574.options, _571);
                } else {
                    $.data(this, "timespinner", {options: $.extend({}, $.fn.timespinner.defaults, $.fn.timespinner.parseOptions(this), _571)});
                }
                _560(this);
            });
        };
        $.fn.timespinner.methods = {
            options: function (jq) {
                var opts = jq.data("spinner") ? jq.spinner("options") : {};
                return $.extend($.data(jq[0], "timespinner").options, {
                    width: opts.width,
                    value: opts.value,
                    originalValue: opts.originalValue,
                    disabled: opts.disabled,
                    readonly: opts.readonly
                });
            }, setValue: function (jq, _575) {
                return jq.each(function () {
                    _56b(this, _575);
                });
            }, getHours: function (jq) {
                var opts = $.data(jq[0], "timespinner").options;
                var vv = jq.timespinner("getValue").split(opts.separator);
                return parseInt(vv[0], 10);
            }, getMinutes: function (jq) {
                var opts = $.data(jq[0], "timespinner").options;
                var vv = jq.timespinner("getValue").split(opts.separator);
                return parseInt(vv[1], 10);
            }, getSeconds: function (jq) {
                var opts = $.data(jq[0], "timespinner").options;
                var vv = jq.timespinner("getValue").split(opts.separator);
                return parseInt(vv[2], 10) || 0;
            }
        };
        $.fn.timespinner.parseOptions = function (_576) {
            return $.extend({}, $.fn.spinner.parseOptions(_576), $.parser.parseOptions(_576, ["separator", {
                showSeconds: "boolean",
                highlight: "number"
            }]));
        };
        $.fn.timespinner.defaults = $.extend({}, $.fn.spinner.defaults, {
            inputEvents: $.extend({}, $.fn.spinner.defaults.inputEvents, {
                click: function (e) {
                    _563.call(this, e);
                }, blur: function (e) {
                    var t = $(e.data.target);
                    t.timespinner("setValue", t.timespinner("getText"));
                }, keydown: function (e) {
                    if (e.keyCode == 13) {
                        var t = $(e.data.target);
                        t.timespinner("setValue", t.timespinner("getText"));
                    }
                }
            }),
            formatter: function (date) {
                if (!date) {
                    return "";
                }
                var opts = $(this).timespinner("options");
                var tt = [_577(date.getHours()), _577(date.getMinutes())];
                if (opts.showSeconds) {
                    tt.push(_577(date.getSeconds()));
                }
                return tt.join(opts.separator);
                function _577(_578) {
                    return (_578 < 10 ? "0" : "") + _578;
                };
            },
            parser: function (s) {
                var opts = $(this).timespinner("options");
                var date = _579(s);
                if (date) {
                    var min = _579(opts.min);
                    var max = _579(opts.max);
                    if (min && min > date) {
                        date = min;
                    }
                    if (max && max < date) {
                        date = max;
                    }
                }
                return date;
                function _579(s) {
                    if (!s) {
                        return null;
                    }
                    var tt = s.split(opts.separator);
                    return new Date(1900, 0, 0, parseInt(tt[0], 10) || 0, parseInt(tt[1], 10) || 0, parseInt(tt[2], 10) || 0);
                };
                if (!s) {
                    return null;
                }
                var tt = s.split(opts.separator);
                return new Date(1900, 0, 0, parseInt(tt[0], 10) || 0, parseInt(tt[1], 10) || 0, parseInt(tt[2], 10) || 0);
            },
            selections: [[0, 2], [3, 5], [6, 8]],
            separator: ":",
            showSeconds: false,
            highlight: 0,
            spin: function (down) {
                _56e(this, down);
            }
        });
    })(jQuery);
    (function ($) {
        function _57a(_57b) {
            var opts = $.data(_57b, "datetimespinner").options;
            $(_57b).addClass("datetimespinner-f").timespinner(opts);
        };
        $.fn.datetimespinner = function (_57c, _57d) {
            if (typeof _57c == "string") {
                var _57e = $.fn.datetimespinner.methods[_57c];
                if (_57e) {
                    return _57e(this, _57d);
                } else {
                    return this.timespinner(_57c, _57d);
                }
            }
            _57c = _57c || {};
            return this.each(function () {
                var _57f = $.data(this, "datetimespinner");
                if (_57f) {
                    $.extend(_57f.options, _57c);
                } else {
                    $.data(this, "datetimespinner", {options: $.extend({}, $.fn.datetimespinner.defaults, $.fn.datetimespinner.parseOptions(this), _57c)});
                }
                _57a(this);
            });
        };
        $.fn.datetimespinner.methods = {
            options: function (jq) {
                var opts = jq.timespinner("options");
                return $.extend($.data(jq[0], "datetimespinner").options, {
                    width: opts.width,
                    value: opts.value,
                    originalValue: opts.originalValue,
                    disabled: opts.disabled,
                    readonly: opts.readonly
                });
            }
        };
        $.fn.datetimespinner.parseOptions = function (_580) {
            return $.extend({}, $.fn.timespinner.parseOptions(_580), $.parser.parseOptions(_580, []));
        };
        $.fn.datetimespinner.defaults = $.extend({}, $.fn.timespinner.defaults, {
            formatter: function (date) {
                if (!date) {
                    return "";
                }
                return $.fn.datebox.defaults.formatter.call(this, date) + " " + $.fn.timespinner.defaults.formatter.call(this, date);
            }, parser: function (s) {
                s = $.trim(s);
                if (!s) {
                    return null;
                }
                var dt = s.split(" ");
                var _581 = $.fn.datebox.defaults.parser.call(this, dt[0]);
                if (dt.length < 2) {
                    return _581;
                }
                var _582 = $.fn.timespinner.defaults.parser.call(this, dt[1]);
                return new Date(_581.getFullYear(), _581.getMonth(), _581.getDate(), _582.getHours(), _582.getMinutes(), _582.getSeconds());
            }, selections: [[0, 2], [3, 5], [6, 10], [11, 13], [14, 16], [17, 19]]
        });
    })(jQuery);
    (function ($) {
        var _583 = 0;

        function _584(a, o) {
            for (var i = 0, len = a.length; i < len; i++) {
                if (a[i] == o) {
                    return i;
                }
            }
            return -1;
        };
        function _585(a, o, id) {
            if (typeof o == "string") {
                for (var i = 0, len = a.length; i < len; i++) {
                    if (a[i][o] == id) {
                        a.splice(i, 1);
                        return;
                    }
                }
            } else {
                var _586 = _584(a, o);
                if (_586 != -1) {
                    a.splice(_586, 1);
                }
            }
        };
        function _587(a, o, r) {
            for (var i = 0, len = a.length; i < len; i++) {
                if (a[i][o] == r[o]) {
                    return;
                }
            }
            a.push(r);
        };
        function _588(_589, aa) {
            return $.data(_589, "treegrid") ? aa.slice(1) : aa;
        };
        function _58a(_58b) {
            var _58c = $.data(_58b, "datagrid");
            var opts = _58c.options;
            var _58d = _58c.panel;
            var dc = _58c.dc;
            var ss = null;
            if (opts.sharedStyleSheet) {
                ss = typeof opts.sharedStyleSheet == "boolean" ? "head" : opts.sharedStyleSheet;
            } else {
                ss = _58d.closest("div.datagrid-view");
                if (!ss.length) {
                    ss = dc.view;
                }
            }
            var cc = $(ss);
            var _58e = $.data(cc[0], "ss");
            if (!_58e) {
                _58e = $.data(cc[0], "ss", {cache: {}, dirty: []});
            }
            return {
                add: function (_58f) {
                    var ss = ["<style type=\"text/css\" easyui=\"true\">"];
                    for (var i = 0; i < _58f.length; i++) {
                        _58e.cache[_58f[i][0]] = {width: _58f[i][1]};
                    }
                    var _590 = 0;
                    for (var s in _58e.cache) {
                        var item = _58e.cache[s];
                        item.index = _590++;
                        ss.push(s + "{width:" + item.width + "}");
                    }
                    ss.push("</style>");
                    $(ss.join("\n")).appendTo(cc);
                    cc.children("style[easyui]:not(:last)").remove();
                }, getRule: function (_591) {
                    var _592 = cc.children("style[easyui]:last")[0];
                    var _593 = _592.styleSheet ? _592.styleSheet : (_592.sheet || document.styleSheets[document.styleSheets.length - 1]);
                    var _594 = _593.cssRules || _593.rules;
                    return _594[_591];
                }, set: function (_595, _596) {
                    var item = _58e.cache[_595];
                    if (item) {
                        item.width = _596;
                        var rule = this.getRule(item.index);
                        if (rule) {
                            rule.style["width"] = _596;
                        }
                    }
                }, remove: function (_597) {
                    var tmp = [];
                    for (var s in _58e.cache) {
                        if (s.indexOf(_597) == -1) {
                            tmp.push([s, _58e.cache[s].width]);
                        }
                    }
                    _58e.cache = {};
                    this.add(tmp);
                }, dirty: function (_598) {
                    if (_598) {
                        _58e.dirty.push(_598);
                    }
                }, clean: function () {
                    for (var i = 0; i < _58e.dirty.length; i++) {
                        this.remove(_58e.dirty[i]);
                    }
                    _58e.dirty = [];
                }
            };
        };
        function _599(_59a, _59b) {
            var _59c = $.data(_59a, "datagrid");
            var opts = _59c.options;
            var _59d = _59c.panel;
            if (_59b) {
                $.extend(opts, _59b);
            }
            if (opts.fit == true) {
                var p = _59d.panel("panel").parent();
                opts.width = p.width();
                opts.height = p.height();
            }
            _59d.panel("resize", opts);
        };
        function _59e(_59f) {
            var _5a0 = $.data(_59f, "datagrid");
            var opts = _5a0.options;
            var dc = _5a0.dc;
            var wrap = _5a0.panel;
            var _5a1 = wrap.width();
            var _5a2 = wrap.height();
            var view = dc.view;
            var _5a3 = dc.view1;
            var _5a4 = dc.view2;
            var _5a5 = _5a3.children("div.datagrid-header");
            var _5a6 = _5a4.children("div.datagrid-header");
            var _5a7 = _5a5.find("table");
            var _5a8 = _5a6.find("table");
            view.width(_5a1);
            var _5a9 = _5a5.children("div.datagrid-header-inner").show();
            _5a3.width(_5a9.find("table").width());
            if (!opts.showHeader) {
                _5a9.hide();
            }
            _5a4.width(_5a1 - _5a3._outerWidth());
            _5a3.children()._outerWidth(_5a3.width());
            _5a4.children()._outerWidth(_5a4.width());
            var all = _5a5.add(_5a6).add(_5a7).add(_5a8);
            all.css("height", "");
            var hh = Math.max(_5a7.height(), _5a8.height());
            all._outerHeight(hh);
            dc.body1.add(dc.body2).children("table.datagrid-btable-frozen").css({
                position: "absolute",
                top: dc.header2._outerHeight()
            });
            var _5aa = dc.body2.children("table.datagrid-btable-frozen")._outerHeight();
            var _5ab = _5aa + _5a6._outerHeight() + _5a4.children(".datagrid-footer")._outerHeight();
            wrap.children(":not(.datagrid-view)").each(function () {
                _5ab += $(this)._outerHeight();
            });
            var _5ac = wrap.outerHeight() - wrap.height();
            var _5ad = wrap._size("minHeight") || "";
            var _5ae = wrap._size("maxHeight") || "";
            _5a3.add(_5a4).children("div.datagrid-body").css({
                marginTop: _5aa,
                height: (isNaN(parseInt(opts.height)) ? "" : (_5a2 - _5ab)),
                minHeight: (_5ad ? _5ad - _5ac - _5ab : ""),
                maxHeight: (_5ae ? _5ae - _5ac - _5ab : "")
            });
            view.height(_5a4.height());
        };
        function _5af(_5b0, _5b1, _5b2) {
            var rows = $.data(_5b0, "datagrid").data.rows;
            var opts = $.data(_5b0, "datagrid").options;
            var dc = $.data(_5b0, "datagrid").dc;
            if (!dc.body1.is(":empty") && (!opts.nowrap || opts.autoRowHeight || _5b2)) {
                if (_5b1 != undefined) {
                    var tr1 = opts.finder.getTr(_5b0, _5b1, "body", 1);
                    var tr2 = opts.finder.getTr(_5b0, _5b1, "body", 2);
                    _5b3(tr1, tr2);
                } else {
                    var tr1 = opts.finder.getTr(_5b0, 0, "allbody", 1);
                    var tr2 = opts.finder.getTr(_5b0, 0, "allbody", 2);
                    _5b3(tr1, tr2);
                    if (opts.showFooter) {
                        var tr1 = opts.finder.getTr(_5b0, 0, "allfooter", 1);
                        var tr2 = opts.finder.getTr(_5b0, 0, "allfooter", 2);
                        _5b3(tr1, tr2);
                    }
                }
            }
            _59e(_5b0);
            if (opts.height == "auto") {
                var _5b4 = dc.body1.parent();
                var _5b5 = dc.body2;
                var _5b6 = _5b7(_5b5);
                var _5b8 = _5b6.height;
                if (_5b6.width > _5b5.width()) {
                    _5b8 += 18;
                }
                _5b8 -= parseInt(_5b5.css("marginTop")) || 0;
                _5b4.height(_5b8);
                _5b5.height(_5b8);
                dc.view.height(dc.view2.height());
            }
            dc.body2.triggerHandler("scroll");
            function _5b3(trs1, trs2) {
                for (var i = 0; i < trs2.length; i++) {
                    var tr1 = $(trs1[i]);
                    var tr2 = $(trs2[i]);
                    tr1.css("height", "");
                    tr2.css("height", "");
                    var _5b9 = Math.max(tr1.height(), tr2.height());
                    tr1.css("height", _5b9);
                    tr2.css("height", _5b9);
                }
            };
            function _5b7(cc) {
                var _5ba = 0;
                var _5bb = 0;
                $(cc).children().each(function () {
                    var c = $(this);
                    if (c.is(":visible")) {
                        _5bb += c._outerHeight();
                        if (_5ba < c._outerWidth()) {
                            _5ba = c._outerWidth();
                        }
                    }
                });
                return {width: _5ba, height: _5bb};
            };
        };
        function _5bc(_5bd, _5be) {
            var _5bf = $.data(_5bd, "datagrid");
            var opts = _5bf.options;
            var dc = _5bf.dc;
            if (!dc.body2.children("table.datagrid-btable-frozen").length) {
                dc.body1.add(dc.body2).prepend("<table class=\"datagrid-btable datagrid-btable-frozen\" cellspacing=\"0\" cellpadding=\"0\"></table>");
            }
            _5c0(true);
            _5c0(false);
            _59e(_5bd);
            function _5c0(_5c1) {
                var _5c2 = _5c1 ? 1 : 2;
                var tr = opts.finder.getTr(_5bd, _5be, "body", _5c2);
                (_5c1 ? dc.body1 : dc.body2).children("table.datagrid-btable-frozen").append(tr);
            };
        };
        function _5c3(_5c4, _5c5) {
            function _5c6() {
                var _5c7 = [];
                var _5c8 = [];
                $(_5c4).children("thead").each(function () {
                    var opt = $.parser.parseOptions(this, [{frozen: "boolean"}]);
                    $(this).find("tr").each(function () {
                        var cols = [];
                        $(this).find("th").each(function () {
                            var th = $(this);
                            var col = $.extend({}, $.parser.parseOptions(this, ["field", "align", "halign", "order", "width", {
                                sortable: "boolean",
                                checkbox: "boolean",
                                resizable: "boolean",
                                fixed: "boolean"
                            }, {rowspan: "number", colspan: "number"}]), {
                                title: (th.html() || undefined),
                                hidden: (th.attr("hidden") ? true : undefined),
                                formatter: (th.attr("formatter") ? eval(th.attr("formatter")) : undefined),
                                styler: (th.attr("styler") ? eval(th.attr("styler")) : undefined),
                                sorter: (th.attr("sorter") ? eval(th.attr("sorter")) : undefined)
                            });
                            if (col.width && String(col.width).indexOf("%") == -1) {
                                col.width = parseInt(col.width);
                            }
                            if (th.attr("editor")) {
                                var s = $.trim(th.attr("editor"));
                                if (s.substr(0, 1) == "{") {
                                    col.editor = eval("(" + s + ")");
                                } else {
                                    col.editor = s;
                                }
                            }
                            cols.push(col);
                        });
                        opt.frozen ? _5c7.push(cols) : _5c8.push(cols);
                    });
                });
                return [_5c7, _5c8];
            };
            var _5c9 = $("<div class=\"datagrid-wrap\">" + "<div class=\"datagrid-view\">" + "<div class=\"datagrid-view1\">" + "<div class=\"datagrid-header\">" + "<div class=\"datagrid-header-inner\"></div>" + "</div>" + "<div class=\"datagrid-body\">" + "<div class=\"datagrid-body-inner\"></div>" + "</div>" + "<div class=\"datagrid-footer\">" + "<div class=\"datagrid-footer-inner\"></div>" + "</div>" + "</div>" + "<div class=\"datagrid-view2\">" + "<div class=\"datagrid-header\">" + "<div class=\"datagrid-header-inner\"></div>" + "</div>" + "<div class=\"datagrid-body\"></div>" + "<div class=\"datagrid-footer\">" + "<div class=\"datagrid-footer-inner\"></div>" + "</div>" + "</div>" + "</div>" + "</div>").insertAfter(_5c4);
            _5c9.panel({doSize: false, cls: "datagrid"});
            $(_5c4).addClass("datagrid-f").hide().appendTo(_5c9.children("div.datagrid-view"));
            var cc = _5c6();
            var view = _5c9.children("div.datagrid-view");
            var _5ca = view.children("div.datagrid-view1");
            var _5cb = view.children("div.datagrid-view2");
            return {
                panel: _5c9,
                frozenColumns: cc[0],
                columns: cc[1],
                dc: {
                    view: view,
                    view1: _5ca,
                    view2: _5cb,
                    header1: _5ca.children("div.datagrid-header").children("div.datagrid-header-inner"),
                    header2: _5cb.children("div.datagrid-header").children("div.datagrid-header-inner"),
                    body1: _5ca.children("div.datagrid-body").children("div.datagrid-body-inner"),
                    body2: _5cb.children("div.datagrid-body"),
                    footer1: _5ca.children("div.datagrid-footer").children("div.datagrid-footer-inner"),
                    footer2: _5cb.children("div.datagrid-footer").children("div.datagrid-footer-inner")
                }
            };
        };
        function _5cc(_5cd) {
            var _5ce = $.data(_5cd, "datagrid");
            var opts = _5ce.options;
            var dc = _5ce.dc;
            var _5cf = _5ce.panel;
            _5ce.ss = $(_5cd).datagrid("createStyleSheet");
            _5cf.panel($.extend({}, opts, {
                id: null, doSize: false, onResize: function (_5d0, _5d1) {
                    if ($.data(_5cd, "datagrid")) {
                        _59e(_5cd);
                        $(_5cd).datagrid("fitColumns");
                        opts.onResize.call(_5cf, _5d0, _5d1);
                    }
                }, onExpand: function () {
                    _5af(_5cd);
                    opts.onExpand.call(_5cf);
                }
            }));
            _5ce.rowIdPrefix = "datagrid-row-r" + (++_583);
            _5ce.cellClassPrefix = "datagrid-cell-c" + _583;
            _5d2(dc.header1, opts.frozenColumns, true);
            _5d2(dc.header2, opts.columns, false);
            _5d3();
            dc.header1.add(dc.header2).css("display", opts.showHeader ? "block" : "none");
            dc.footer1.add(dc.footer2).css("display", opts.showFooter ? "block" : "none");
            if (opts.toolbar) {
                if ($.isArray(opts.toolbar)) {
                    $("div.datagrid-toolbar", _5cf).remove();
                    var tb = $("<div class=\"datagrid-toolbar\"><table cellspacing=\"0\" cellpadding=\"0\"><tr></tr></table></div>").prependTo(_5cf);
                    var tr = tb.find("tr");
                    for (var i = 0; i < opts.toolbar.length; i++) {
                        var btn = opts.toolbar[i];
                        if (btn == "-") {
                            $("<td><div class=\"datagrid-btn-separator\"></div></td>").appendTo(tr);
                        } else {
                            var td = $("<td></td>").appendTo(tr);
                            var tool = $("<a href=\"javascript:void(0)\"></a>").appendTo(td);
                            tool[0].onclick = eval(btn.handler || function () {
                                });
                            tool.linkbutton($.extend({}, btn, {plain: true}));
                        }
                    }
                } else {
                    $(opts.toolbar).addClass("datagrid-toolbar").prependTo(_5cf);
                    $(opts.toolbar).show();
                }
            } else {
                $("div.datagrid-toolbar", _5cf).remove();
            }
            $("div.datagrid-pager", _5cf).remove();
            if (opts.pagination) {
                var _5d4 = $("<div class=\"datagrid-pager\"></div>");
                if (opts.pagePosition == "bottom") {
                    _5d4.appendTo(_5cf);
                } else {
                    if (opts.pagePosition == "top") {
                        _5d4.addClass("datagrid-pager-top").prependTo(_5cf);
                    } else {
                        var ptop = $("<div class=\"datagrid-pager datagrid-pager-top\"></div>").prependTo(_5cf);
                        _5d4.appendTo(_5cf);
                        _5d4 = _5d4.add(ptop);
                    }
                }
                _5d4.pagination({
                    total: (opts.pageNumber * opts.pageSize),
                    pageNumber: opts.pageNumber,
                    pageSize: opts.pageSize,
                    pageList: opts.pageList,
                    onSelectPage: function (_5d5, _5d6) {
                        opts.pageNumber = _5d5 || 1;
                        opts.pageSize = _5d6;
                        _5d4.pagination("refresh", {pageNumber: _5d5, pageSize: _5d6});
                        _611(_5cd);
                    }
                });
                opts.pageSize = _5d4.pagination("options").pageSize;
            }
            function _5d2(_5d7, _5d8, _5d9) {
                if (!_5d8) {
                    return;
                }
                $(_5d7).show();
                $(_5d7).empty();
                var _5da = [];
                var _5db = [];
                if (opts.sortName) {
                    _5da = opts.sortName.split(",");
                    _5db = opts.sortOrder.split(",");
                }
                var t = $("<table class=\"datagrid-htable\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\"><tbody></tbody></table>").appendTo(_5d7);
                for (var i = 0; i < _5d8.length; i++) {
                    var tr = $("<tr class=\"datagrid-header-row\"></tr>").appendTo($("tbody", t));
                    var cols = _5d8[i];
                    for (var j = 0; j < cols.length; j++) {
                        var col = cols[j];
                        var attr = "";
                        if (col.rowspan) {
                            attr += "rowspan=\"" + col.rowspan + "\" ";
                        }
                        if (col.colspan) {
                            attr += "colspan=\"" + col.colspan + "\" ";
                        }
                        var td = $("<td " + attr + "></td>").appendTo(tr);
                        if (col.checkbox) {
                            td.attr("field", col.field);
                            $("<div class=\"datagrid-header-check\"></div>").html("<input type=\"checkbox\"/>").appendTo(td);
                        } else {
                            if (col.field) {
                                td.attr("field", col.field);
                                td.append("<div class=\"datagrid-cell\"><span></span><span class=\"datagrid-sort-icon\"></span></div>");
                                $("span", td).html(col.title);
                                $("span.datagrid-sort-icon", td).html("&nbsp;");
                                var cell = td.find("div.datagrid-cell");
                                var pos = _584(_5da, col.field);
                                if (pos >= 0) {
                                    cell.addClass("datagrid-sort-" + _5db[pos]);
                                }
                                if (col.resizable == false) {
                                    cell.attr("resizable", "false");
                                }
                                if (col.width) {
                                    var _5dc = $.parser.parseValue("width", col.width, dc.view, opts.scrollbarSize);
                                    cell._outerWidth(_5dc - 1);
                                    col.boxWidth = parseInt(cell[0].style.width);
                                    col.deltaWidth = _5dc - col.boxWidth;
                                } else {
                                    col.auto = true;
                                }
                                cell.css("text-align", (col.halign || col.align || ""));
                                col.cellClass = _5ce.cellClassPrefix + "-" + col.field.replace(/[\.|\s]/g, "-");
                                cell.addClass(col.cellClass).css("width", "");
                            } else {
                                $("<div class=\"datagrid-cell-group\"></div>").html(col.title).appendTo(td);
                            }
                        }
                        if (col.hidden) {
                            td.hide();
                        }
                    }
                }
                if (_5d9 && opts.rownumbers) {
                    var td = $("<td rowspan=\"" + opts.frozenColumns.length + "\"><div class=\"datagrid-header-rownumber\"></div></td>");
                    if ($("tr", t).length == 0) {
                        td.wrap("<tr class=\"datagrid-header-row\"></tr>").parent().appendTo($("tbody", t));
                    } else {
                        td.prependTo($("tr:first", t));
                    }
                }
            };
            function _5d3() {
                var _5dd = [];
                var _5de = _5df(_5cd, true).concat(_5df(_5cd));
                for (var i = 0; i < _5de.length; i++) {
                    var col = _5e0(_5cd, _5de[i]);
                    if (col && !col.checkbox) {
                        _5dd.push(["." + col.cellClass, col.boxWidth ? col.boxWidth + "px" : "auto"]);
                    }
                }
                _5ce.ss.add(_5dd);
                _5ce.ss.dirty(_5ce.cellSelectorPrefix);
                _5ce.cellSelectorPrefix = "." + _5ce.cellClassPrefix;
            };
        };
        function _5e1(_5e2) {
            var _5e3 = $.data(_5e2, "datagrid");
            var _5e4 = _5e3.panel;
            var opts = _5e3.options;
            var dc = _5e3.dc;
            var _5e5 = dc.header1.add(dc.header2);
            _5e5.find("input[type=checkbox]").unbind(".datagrid").bind("click.datagrid", function (e) {
                if (opts.singleSelect && opts.selectOnCheck) {
                    return false;
                }
                if ($(this).is(":checked")) {
                    _67b(_5e2);
                } else {
                    _681(_5e2);
                }
                e.stopPropagation();
            });
            var _5e6 = _5e5.find("div.datagrid-cell");
            _5e6.closest("td").unbind(".datagrid").bind("mouseenter.datagrid", function () {
                if (_5e3.resizing) {
                    return;
                }
                $(this).addClass("datagrid-header-over");
            }).bind("mouseleave.datagrid", function () {
                $(this).removeClass("datagrid-header-over");
            }).bind("contextmenu.datagrid", function (e) {
                var _5e7 = $(this).attr("field");
                opts.onHeaderContextMenu.call(_5e2, e, _5e7);
            });
            _5e6.unbind(".datagrid").bind("click.datagrid", function (e) {
                var p1 = $(this).offset().left + 5;
                var p2 = $(this).offset().left + $(this)._outerWidth() - 5;
                if (e.pageX < p2 && e.pageX > p1) {
                    _606(_5e2, $(this).parent().attr("field"));
                }
            }).bind("dblclick.datagrid", function (e) {
                var p1 = $(this).offset().left + 5;
                var p2 = $(this).offset().left + $(this)._outerWidth() - 5;
                var cond = opts.resizeHandle == "right" ? (e.pageX > p2) : (opts.resizeHandle == "left" ? (e.pageX < p1) : (e.pageX < p1 || e.pageX > p2));
                if (cond) {
                    var _5e8 = $(this).parent().attr("field");
                    var col = _5e0(_5e2, _5e8);
                    if (col.resizable == false) {
                        return;
                    }
                    $(_5e2).datagrid("autoSizeColumn", _5e8);
                    col.auto = false;
                }
            });
            var _5e9 = opts.resizeHandle == "right" ? "e" : (opts.resizeHandle == "left" ? "w" : "e,w");
            _5e6.each(function () {
                $(this).resizable({
                    handles: _5e9,
                    disabled: ($(this).attr("resizable") ? $(this).attr("resizable") == "false" : false),
                    minWidth: 25,
                    onStartResize: function (e) {
                        _5e3.resizing = true;
                        _5e5.css("cursor", $("body").css("cursor"));
                        if (!_5e3.proxy) {
                            _5e3.proxy = $("<div class=\"datagrid-resize-proxy\"></div>").appendTo(dc.view);
                        }
                        _5e3.proxy.css({left: e.pageX - $(_5e4).offset().left - 1, display: "none"});
                        setTimeout(function () {
                            if (_5e3.proxy) {
                                _5e3.proxy.show();
                            }
                        }, 500);
                    },
                    onResize: function (e) {
                        _5e3.proxy.css({left: e.pageX - $(_5e4).offset().left - 1, display: "block"});
                        return false;
                    },
                    onStopResize: function (e) {
                        _5e5.css("cursor", "");
                        $(this).css("height", "");
                        var _5ea = $(this).parent().attr("field");
                        var col = _5e0(_5e2, _5ea);
                        col.width = $(this)._outerWidth();
                        col.boxWidth = col.width - col.deltaWidth;
                        col.auto = undefined;
                        $(this).css("width", "");
                        $(_5e2).datagrid("fixColumnSize", _5ea);
                        _5e3.proxy.remove();
                        _5e3.proxy = null;
                        if ($(this).parents("div:first.datagrid-header").parent().hasClass("datagrid-view1")) {
                            _59e(_5e2);
                        }
                        $(_5e2).datagrid("fitColumns");
                        opts.onResizeColumn.call(_5e2, _5ea, col.width);
                        setTimeout(function () {
                            _5e3.resizing = false;
                        }, 0);
                    }
                });
            });
            var bb = dc.body1.add(dc.body2);
            bb.unbind();
            for (var _5eb in opts.rowEvents) {
                bb.bind(_5eb, opts.rowEvents[_5eb]);
            }
            dc.body1.bind("mousewheel DOMMouseScroll", function (e) {
                var e1 = e.originalEvent || window.event;
                var _5ec = e1.wheelDelta || e1.detail * (-1);
                var dg = $(e.target).closest("div.datagrid-view").children(".datagrid-f");
                var dc = dg.data("datagrid").dc;
                dc.body2.scrollTop(dc.body2.scrollTop() - _5ec);
            });
            dc.body2.bind("scroll", function () {
                var b1 = dc.view1.children("div.datagrid-body");
                b1.scrollTop($(this).scrollTop());
                var c1 = dc.body1.children(":first");
                var c2 = dc.body2.children(":first");
                if (c1.length && c2.length) {
                    var top1 = c1.offset().top;
                    var top2 = c2.offset().top;
                    if (top1 != top2) {
                        b1.scrollTop(b1.scrollTop() + top1 - top2);
                    }
                }
                dc.view2.children("div.datagrid-header,div.datagrid-footer")._scrollLeft($(this)._scrollLeft());
                dc.body2.children("table.datagrid-btable-frozen").css("left", -$(this)._scrollLeft());
            });
        };
        function _5ed(_5ee) {
            return function (e) {
                var tr = _5ef(e.target);
                if (!tr) {
                    return;
                }
                var _5f0 = _5f1(tr);
                if ($.data(_5f0, "datagrid").resizing) {
                    return;
                }
                var _5f2 = _5f3(tr);
                if (_5ee) {
                    _5f4(_5f0, _5f2);
                } else {
                    var opts = $.data(_5f0, "datagrid").options;
                    opts.finder.getTr(_5f0, _5f2).removeClass("datagrid-row-over");
                }
            };
        };
        function _5f5(e) {
            var tr = _5ef(e.target);
            if (!tr) {
                return;
            }
            var _5f6 = _5f1(tr);
            var opts = $.data(_5f6, "datagrid").options;
            var _5f7 = _5f3(tr);
            var tt = $(e.target);
            if (tt.parent().hasClass("datagrid-cell-check")) {
                if (opts.singleSelect && opts.selectOnCheck) {
                    tt._propAttr("checked", !tt.is(":checked"));
                    _5f8(_5f6, _5f7);
                } else {
                    if (tt.is(":checked")) {
                        tt._propAttr("checked", false);
                        _5f8(_5f6, _5f7);
                    } else {
                        tt._propAttr("checked", true);
                        _5f9(_5f6, _5f7);
                    }
                }
            } else {
                var row = opts.finder.getRow(_5f6, _5f7);
                var td = tt.closest("td[field]", tr);
                if (td.length) {
                    var _5fa = td.attr("field");
                    opts.onClickCell.call(_5f6, _5f7, _5fa, row[_5fa]);
                }
                if (opts.singleSelect == true) {
                    _5fb(_5f6, _5f7);
                } else {
                    if (opts.ctrlSelect) {
                        if (e.ctrlKey) {
                            if (tr.hasClass("datagrid-row-selected")) {
                                _5fc(_5f6, _5f7);
                            } else {
                                _5fb(_5f6, _5f7);
                            }
                        } else {
                            if (e.shiftKey) {
                                $(_5f6).datagrid("clearSelections");
                                var _5fd = Math.min(opts.lastSelectedIndex || 0, _5f7);
                                var _5fe = Math.max(opts.lastSelectedIndex || 0, _5f7);
                                for (var i = _5fd; i <= _5fe; i++) {
                                    _5fb(_5f6, i);
                                }
                            } else {
                                $(_5f6).datagrid("clearSelections");
                                _5fb(_5f6, _5f7);
                                opts.lastSelectedIndex = _5f7;
                            }
                        }
                    } else {
                        if (tr.hasClass("datagrid-row-selected")) {
                            _5fc(_5f6, _5f7);
                        } else {
                            _5fb(_5f6, _5f7);
                        }
                    }
                }
                opts.onClickRow.apply(_5f6, _588(_5f6, [_5f7, row]));
            }
        };
        function _5ff(e) {
            var tr = _5ef(e.target);
            if (!tr) {
                return;
            }
            var _600 = _5f1(tr);
            var opts = $.data(_600, "datagrid").options;
            var _601 = _5f3(tr);
            var row = opts.finder.getRow(_600, _601);
            var td = $(e.target).closest("td[field]", tr);
            if (td.length) {
                var _602 = td.attr("field");
                opts.onDblClickCell.call(_600, _601, _602, row[_602]);
            }
            opts.onDblClickRow.apply(_600, _588(_600, [_601, row]));
        };
        function _603(e) {
            var tr = _5ef(e.target);
            if (!tr) {
                return;
            }
            var _604 = _5f1(tr);
            var opts = $.data(_604, "datagrid").options;
            var _605 = _5f3(tr);
            var row = opts.finder.getRow(_604, _605);
            opts.onRowContextMenu.call(_604, e, _605, row);
        };
        function _5f1(t) {
            return $(t).closest("div.datagrid-view").children(".datagrid-f")[0];
        };
        function _5ef(t) {
            var tr = $(t).closest("tr.datagrid-row");
            if (tr.length && tr.parent().length) {
                return tr;
            } else {
                return undefined;
            }
        };
        function _5f3(tr) {
            if (tr.attr("datagrid-row-index")) {
                return parseInt(tr.attr("datagrid-row-index"));
            } else {
                return tr.attr("node-id");
            }
        };
        function _606(_607, _608) {
            var _609 = $.data(_607, "datagrid");
            var opts = _609.options;
            _608 = _608 || {};
            var _60a = {sortName: opts.sortName, sortOrder: opts.sortOrder};
            if (typeof _608 == "object") {
                $.extend(_60a, _608);
            }
            var _60b = [];
            var _60c = [];
            if (_60a.sortName) {
                _60b = _60a.sortName.split(",");
                _60c = _60a.sortOrder.split(",");
            }
            if (typeof _608 == "string") {
                var _60d = _608;
                var col = _5e0(_607, _60d);
                if (!col.sortable || _609.resizing) {
                    return;
                }
                var _60e = col.order || "asc";
                var pos = _584(_60b, _60d);
                if (pos >= 0) {
                    var _60f = _60c[pos] == "asc" ? "desc" : "asc";
                    if (opts.multiSort && _60f == _60e) {
                        _60b.splice(pos, 1);
                        _60c.splice(pos, 1);
                    } else {
                        _60c[pos] = _60f;
                    }
                } else {
                    if (opts.multiSort) {
                        _60b.push(_60d);
                        _60c.push(_60e);
                    } else {
                        _60b = [_60d];
                        _60c = [_60e];
                    }
                }
                _60a.sortName = _60b.join(",");
                _60a.sortOrder = _60c.join(",");
            }
            if (opts.onBeforeSortColumn.call(_607, _60a.sortName, _60a.sortOrder) == false) {
                return;
            }
            $.extend(opts, _60a);
            var dc = _609.dc;
            var _610 = dc.header1.add(dc.header2);
            _610.find("div.datagrid-cell").removeClass("datagrid-sort-asc datagrid-sort-desc");
            for (var i = 0; i < _60b.length; i++) {
                var col = _5e0(_607, _60b[i]);
                _610.find("div." + col.cellClass).addClass("datagrid-sort-" + _60c[i]);
            }
            if (opts.remoteSort) {
                _611(_607);
            } else {
                _612(_607, $(_607).datagrid("getData"));
            }
            opts.onSortColumn.call(_607, opts.sortName, opts.sortOrder);
        };
        function _613(_614) {
            var _615 = $.data(_614, "datagrid");
            var opts = _615.options;
            var dc = _615.dc;
            var _616 = dc.view2.children("div.datagrid-header");
            dc.body2.css("overflow-x", "");
            _617();
            _618();
            _619();
            _617(true);
            if (_616.width() >= _616.find("table").width()) {
                dc.body2.css("overflow-x", "hidden");
            }
            function _619() {
                if (!opts.fitColumns) {
                    return;
                }
                if (!_615.leftWidth) {
                    _615.leftWidth = 0;
                }
                var _61a = 0;
                var cc = [];
                var _61b = _5df(_614, false);
                for (var i = 0; i < _61b.length; i++) {
                    var col = _5e0(_614, _61b[i]);
                    if (_61c(col)) {
                        _61a += col.width;
                        cc.push({field: col.field, col: col, addingWidth: 0});
                    }
                }
                if (!_61a) {
                    return;
                }
                cc[cc.length - 1].addingWidth -= _615.leftWidth;
                var _61d = _616.children("div.datagrid-header-inner").show();
                var _61e = _616.width() - _616.find("table").width() - opts.scrollbarSize + _615.leftWidth;
                var rate = _61e / _61a;
                if (!opts.showHeader) {
                    _61d.hide();
                }
                for (var i = 0; i < cc.length; i++) {
                    var c = cc[i];
                    var _61f = parseInt(c.col.width * rate);
                    c.addingWidth += _61f;
                    _61e -= _61f;
                }
                cc[cc.length - 1].addingWidth += _61e;
                for (var i = 0; i < cc.length; i++) {
                    var c = cc[i];
                    if (c.col.boxWidth + c.addingWidth > 0) {
                        c.col.boxWidth += c.addingWidth;
                        c.col.width += c.addingWidth;
                    }
                }
                _615.leftWidth = _61e;
                $(_614).datagrid("fixColumnSize");
            };
            function _618() {
                var _620 = false;
                var _621 = _5df(_614, true).concat(_5df(_614, false));
                $.map(_621, function (_622) {
                    var col = _5e0(_614, _622);
                    if (String(col.width || "").indexOf("%") >= 0) {
                        var _623 = $.parser.parseValue("width", col.width, dc.view, opts.scrollbarSize) - col.deltaWidth;
                        if (_623 > 0) {
                            col.boxWidth = _623;
                            _620 = true;
                        }
                    }
                });
                if (_620) {
                    $(_614).datagrid("fixColumnSize");
                }
            };
            function _617(fit) {
                var _624 = dc.header1.add(dc.header2).find(".datagrid-cell-group");
                if (_624.length) {
                    _624.each(function () {
                        $(this)._outerWidth(fit ? $(this).parent().width() : 10);
                    });
                    if (fit) {
                        _59e(_614);
                    }
                }
            };
            function _61c(col) {
                if (String(col.width || "").indexOf("%") >= 0) {
                    return false;
                }
                if (!col.hidden && !col.checkbox && !col.auto && !col.fixed) {
                    return true;
                }
            };
        };
        function _625(_626, _627) {
            var _628 = $.data(_626, "datagrid");
            var opts = _628.options;
            var dc = _628.dc;
            var tmp = $("<div class=\"datagrid-cell\" style=\"position:absolute;left:-9999px\"></div>").appendTo("body");
            if (_627) {
                _599(_627);
                if (opts.fitColumns) {
                    _59e(_626);
                    $(_626).datagrid("fitColumns");
                }
            } else {
                var _629 = false;
                var _62a = _5df(_626, true).concat(_5df(_626, false));
                for (var i = 0; i < _62a.length; i++) {
                    var _627 = _62a[i];
                    var col = _5e0(_626, _627);
                    if (col.auto) {
                        _599(_627);
                        _629 = true;
                    }
                }
                if (_629 && opts.fitColumns) {
                    _59e(_626);
                    $(_626).datagrid("fitColumns");
                }
            }
            tmp.remove();
            function _599(_62b) {
                var _62c = dc.view.find("div.datagrid-header td[field=\"" + _62b + "\"] div.datagrid-cell");
                _62c.css("width", "");
                var col = $(_626).datagrid("getColumnOption", _62b);
                col.width = undefined;
                col.boxWidth = undefined;
                col.auto = true;
                $(_626).datagrid("fixColumnSize", _62b);
                var _62d = Math.max(_62e("header"), _62e("allbody"), _62e("allfooter")) + 1;
                _62c._outerWidth(_62d - 1);
                col.width = _62d;
                col.boxWidth = parseInt(_62c[0].style.width);
                col.deltaWidth = _62d - col.boxWidth;
                _62c.css("width", "");
                $(_626).datagrid("fixColumnSize", _62b);
                opts.onResizeColumn.call(_626, _62b, col.width);
                function _62e(type) {
                    var _62f = 0;
                    if (type == "header") {
                        _62f = _630(_62c);
                    } else {
                        opts.finder.getTr(_626, 0, type).find("td[field=\"" + _62b + "\"] div.datagrid-cell").each(function () {
                            var w = _630($(this));
                            if (_62f < w) {
                                _62f = w;
                            }
                        });
                    }
                    return _62f;
                    function _630(cell) {
                        return cell.is(":visible") ? cell._outerWidth() : tmp.html(cell.html())._outerWidth();
                    };
                };
            };
        };
        function _631(_632, _633) {
            var _634 = $.data(_632, "datagrid");
            var opts = _634.options;
            var dc = _634.dc;
            var _635 = dc.view.find("table.datagrid-btable,table.datagrid-ftable");
            _635.css("table-layout", "fixed");
            if (_633) {
                fix(_633);
            } else {
                var ff = _5df(_632, true).concat(_5df(_632, false));
                for (var i = 0; i < ff.length; i++) {
                    fix(ff[i]);
                }
            }
            _635.css("table-layout", "");
            _636(_632);
            _5af(_632);
            _637(_632);
            function fix(_638) {
                var col = _5e0(_632, _638);
                if (col.cellClass) {
                    _634.ss.set("." + col.cellClass, col.boxWidth ? col.boxWidth + "px" : "auto");
                }
            };
        };
        function _636(_639) {
            var dc = $.data(_639, "datagrid").dc;
            dc.view.find("td.datagrid-td-merged").each(function () {
                var td = $(this);
                var _63a = td.attr("colspan") || 1;
                var col = _5e0(_639, td.attr("field"));
                var _63b = col.boxWidth + col.deltaWidth - 1;
                for (var i = 1; i < _63a; i++) {
                    td = td.next();
                    col = _5e0(_639, td.attr("field"));
                    _63b += col.boxWidth + col.deltaWidth;
                }
                $(this).children("div.datagrid-cell")._outerWidth(_63b);
            });
        };
        function _637(_63c) {
            var dc = $.data(_63c, "datagrid").dc;
            dc.view.find("div.datagrid-editable").each(function () {
                var cell = $(this);
                var _63d = cell.parent().attr("field");
                var col = $(_63c).datagrid("getColumnOption", _63d);
                cell._outerWidth(col.boxWidth + col.deltaWidth - 1);
                var ed = $.data(this, "datagrid.editor");
                if (ed.actions.resize) {
                    ed.actions.resize(ed.target, cell.width());
                }
            });
        };
        function _5e0(_63e, _63f) {
            function find(_640) {
                if (_640) {
                    for (var i = 0; i < _640.length; i++) {
                        var cc = _640[i];
                        for (var j = 0; j < cc.length; j++) {
                            var c = cc[j];
                            if (c.field == _63f) {
                                return c;
                            }
                        }
                    }
                }
                return null;
            };
            var opts = $.data(_63e, "datagrid").options;
            var col = find(opts.columns);
            if (!col) {
                col = find(opts.frozenColumns);
            }
            return col;
        };
        function _5df(_641, _642) {
            var opts = $.data(_641, "datagrid").options;
            var _643 = (_642 == true) ? (opts.frozenColumns || [[]]) : opts.columns;
            if (_643.length == 0) {
                return [];
            }
            var aa = [];
            var _644 = _645();
            for (var i = 0; i < _643.length; i++) {
                aa[i] = new Array(_644);
            }
            for (var _646 = 0; _646 < _643.length; _646++) {
                $.map(_643[_646], function (col) {
                    var _647 = _648(aa[_646]);
                    if (_647 >= 0) {
                        var _649 = col.field || "";
                        for (var c = 0; c < (col.colspan || 1); c++) {
                            for (var r = 0; r < (col.rowspan || 1); r++) {
                                aa[_646 + r][_647] = _649;
                            }
                            _647++;
                        }
                    }
                });
            }
            return aa[aa.length - 1];
            function _645() {
                var _64a = 0;
                $.map(_643[0], function (col) {
                    _64a += col.colspan || 1;
                });
                return _64a;
            };
            function _648(a) {
                for (var i = 0; i < a.length; i++) {
                    if (a[i] == undefined) {
                        return i;
                    }
                }
                return -1;
            };
        };
        function _612(_64b, data) {
            var _64c = $.data(_64b, "datagrid");
            var opts = _64c.options;
            var dc = _64c.dc;
            data = opts.loadFilter.call(_64b, data);
            data.total = parseInt(data.total);
            _64c.data = data;
            if (data.footer) {
                _64c.footer = data.footer;
            }
            if (!opts.remoteSort && opts.sortName) {
                var _64d = opts.sortName.split(",");
                var _64e = opts.sortOrder.split(",");
                data.rows.sort(function (r1, r2) {
                    var r = 0;
                    for (var i = 0; i < _64d.length; i++) {
                        var sn = _64d[i];
                        var so = _64e[i];
                        var col = _5e0(_64b, sn);
                        var _64f = col.sorter || function (a, b) {
                                return a == b ? 0 : (a > b ? 1 : -1);
                            };
                        r = _64f(r1[sn], r2[sn]) * (so == "asc" ? 1 : -1);
                        if (r != 0) {
                            return r;
                        }
                    }
                    return r;
                });
            }
            if (opts.view.onBeforeRender) {
                opts.view.onBeforeRender.call(opts.view, _64b, data.rows);
            }
            opts.view.render.call(opts.view, _64b, dc.body2, false);
            opts.view.render.call(opts.view, _64b, dc.body1, true);
            if (opts.showFooter) {
                opts.view.renderFooter.call(opts.view, _64b, dc.footer2, false);
                opts.view.renderFooter.call(opts.view, _64b, dc.footer1, true);
            }
            if (opts.view.onAfterRender) {
                opts.view.onAfterRender.call(opts.view, _64b);
            }
            _64c.ss.clean();
            var _650 = $(_64b).datagrid("getPager");
            if (_650.length) {
                var _651 = _650.pagination("options");
                if (_651.total != data.total) {
                    _650.pagination("refresh", {total: data.total});
                    if (opts.pageNumber != _651.pageNumber && _651.pageNumber > 0) {
                        opts.pageNumber = _651.pageNumber;
                        _611(_64b);
                    }
                }
            }
            _5af(_64b);
            dc.body2.triggerHandler("scroll");
            $(_64b).datagrid("setSelectionState");
            $(_64b).datagrid("autoSizeColumn");
            opts.onLoadSuccess.call(_64b, data);
        };
        function _652(_653) {
            var _654 = $.data(_653, "datagrid");
            var opts = _654.options;
            var dc = _654.dc;
            dc.header1.add(dc.header2).find("input[type=checkbox]")._propAttr("checked", false);
            if (opts.idField) {
                var _655 = $.data(_653, "treegrid") ? true : false;
                var _656 = opts.onSelect;
                var _657 = opts.onCheck;
                opts.onSelect = opts.onCheck = function () {
                };
                var rows = opts.finder.getRows(_653);
                for (var i = 0; i < rows.length; i++) {
                    var row = rows[i];
                    var _658 = _655 ? row[opts.idField] : i;
                    if (_659(_654.selectedRows, row)) {
                        _5fb(_653, _658, true);
                    }
                    if (_659(_654.checkedRows, row)) {
                        _5f8(_653, _658, true);
                    }
                }
                opts.onSelect = _656;
                opts.onCheck = _657;
            }
            function _659(a, r) {
                for (var i = 0; i < a.length; i++) {
                    if (a[i][opts.idField] == r[opts.idField]) {
                        a[i] = r;
                        return true;
                    }
                }
                return false;
            };
        };
        function _65a(_65b, row) {
            var _65c = $.data(_65b, "datagrid");
            var opts = _65c.options;
            var rows = _65c.data.rows;
            if (typeof row == "object") {
                return _584(rows, row);
            } else {
                for (var i = 0; i < rows.length; i++) {
                    if (rows[i][opts.idField] == row) {
                        return i;
                    }
                }
                return -1;
            }
        };
        function _65d(_65e) {
            var _65f = $.data(_65e, "datagrid");
            var opts = _65f.options;
            var data = _65f.data;
            if (opts.idField) {
                return _65f.selectedRows;
            } else {
                var rows = [];
                opts.finder.getTr(_65e, "", "selected", 2).each(function () {
                    rows.push(opts.finder.getRow(_65e, $(this)));
                });
                return rows;
            }
        };
        function _660(_661) {
            var _662 = $.data(_661, "datagrid");
            var opts = _662.options;
            if (opts.idField) {
                return _662.checkedRows;
            } else {
                var rows = [];
                opts.finder.getTr(_661, "", "checked", 2).each(function () {
                    rows.push(opts.finder.getRow(_661, $(this)));
                });
                return rows;
            }
        };
        function _663(_664, _665) {
            var _666 = $.data(_664, "datagrid");
            var dc = _666.dc;
            var opts = _666.options;
            var tr = opts.finder.getTr(_664, _665);
            if (tr.length) {
                if (tr.closest("table").hasClass("datagrid-btable-frozen")) {
                    return;
                }
                var _667 = dc.view2.children("div.datagrid-header")._outerHeight();
                var _668 = dc.body2;
                var _669 = _668.outerHeight(true) - _668.outerHeight();
                var top = tr.position().top - _667 - _669;
                if (top < 0) {
                    _668.scrollTop(_668.scrollTop() + top);
                } else {
                    if (top + tr._outerHeight() > _668.height() - 18) {
                        _668.scrollTop(_668.scrollTop() + top + tr._outerHeight() - _668.height() + 18);
                    }
                }
            }
        };
        function _5f4(_66a, _66b) {
            var _66c = $.data(_66a, "datagrid");
            var opts = _66c.options;
            opts.finder.getTr(_66a, _66c.highlightIndex).removeClass("datagrid-row-over");
            opts.finder.getTr(_66a, _66b).addClass("datagrid-row-over");
            _66c.highlightIndex = _66b;
        };
        function _5fb(_66d, _66e, _66f) {
            var _670 = $.data(_66d, "datagrid");
            var opts = _670.options;
            var row = opts.finder.getRow(_66d, _66e);
            if (opts.onBeforeSelect.apply(_66d, _588(_66d, [_66e, row])) == false) {
                return;
            }
            if (opts.singleSelect) {
                _671(_66d, true);
                _670.selectedRows = [];
            }
            if (!_66f && opts.checkOnSelect) {
                _5f8(_66d, _66e, true);
            }
            if (opts.idField) {
                _587(_670.selectedRows, opts.idField, row);
            }
            opts.finder.getTr(_66d, _66e).addClass("datagrid-row-selected");
            opts.onSelect.apply(_66d, _588(_66d, [_66e, row]));
            _663(_66d, _66e);
        };
        function _5fc(_672, _673, _674) {
            var _675 = $.data(_672, "datagrid");
            var dc = _675.dc;
            var opts = _675.options;
            var row = opts.finder.getRow(_672, _673);
            if (opts.onBeforeUnselect.apply(_672, _588(_672, [_673, row])) == false) {
                return;
            }
            if (!_674 && opts.checkOnSelect) {
                _5f9(_672, _673, true);
            }
            opts.finder.getTr(_672, _673).removeClass("datagrid-row-selected");
            if (opts.idField) {
                _585(_675.selectedRows, opts.idField, row[opts.idField]);
            }
            opts.onUnselect.apply(_672, _588(_672, [_673, row]));
        };
        function _676(_677, _678) {
            var _679 = $.data(_677, "datagrid");
            var opts = _679.options;
            var rows = opts.finder.getRows(_677);
            var _67a = $.data(_677, "datagrid").selectedRows;
            if (!_678 && opts.checkOnSelect) {
                _67b(_677, true);
            }
            opts.finder.getTr(_677, "", "allbody").addClass("datagrid-row-selected");
            if (opts.idField) {
                for (var _67c = 0; _67c < rows.length; _67c++) {
                    _587(_67a, opts.idField, rows[_67c]);
                }
            }
            opts.onSelectAll.call(_677, rows);
        };
        function _671(_67d, _67e) {
            var _67f = $.data(_67d, "datagrid");
            var opts = _67f.options;
            var rows = opts.finder.getRows(_67d);
            var _680 = $.data(_67d, "datagrid").selectedRows;
            if (!_67e && opts.checkOnSelect) {
                _681(_67d, true);
            }
            opts.finder.getTr(_67d, "", "selected").removeClass("datagrid-row-selected");
            if (opts.idField) {
                for (var _682 = 0; _682 < rows.length; _682++) {
                    _585(_680, opts.idField, rows[_682][opts.idField]);
                }
            }
            opts.onUnselectAll.call(_67d, rows);
        };
        function _5f8(_683, _684, _685) {
            var _686 = $.data(_683, "datagrid");
            var opts = _686.options;
            var row = opts.finder.getRow(_683, _684);
            if (opts.onBeforeCheck.apply(_683, _588(_683, [_684, row])) == false) {
                return;
            }
            if (opts.singleSelect && opts.selectOnCheck) {
                _681(_683, true);
                _686.checkedRows = [];
            }
            if (!_685 && opts.selectOnCheck) {
                _5fb(_683, _684, true);
            }
            var tr = opts.finder.getTr(_683, _684).addClass("datagrid-row-checked");
            tr.find("div.datagrid-cell-check input[type=checkbox]")._propAttr("checked", true);
            tr = opts.finder.getTr(_683, "", "checked", 2);
            if (tr.length == opts.finder.getRows(_683).length) {
                var dc = _686.dc;
                dc.header1.add(dc.header2).find("input[type=checkbox]")._propAttr("checked", true);
            }
            if (opts.idField) {
                _587(_686.checkedRows, opts.idField, row);
            }
            opts.onCheck.apply(_683, _588(_683, [_684, row]));
        };
        function _5f9(_687, _688, _689) {
            var _68a = $.data(_687, "datagrid");
            var opts = _68a.options;
            var row = opts.finder.getRow(_687, _688);
            if (opts.onBeforeUncheck.apply(_687, _588(_687, [_688, row])) == false) {
                return;
            }
            if (!_689 && opts.selectOnCheck) {
                _5fc(_687, _688, true);
            }
            var tr = opts.finder.getTr(_687, _688).removeClass("datagrid-row-checked");
            tr.find("div.datagrid-cell-check input[type=checkbox]")._propAttr("checked", false);
            var dc = _68a.dc;
            var _68b = dc.header1.add(dc.header2);
            _68b.find("input[type=checkbox]")._propAttr("checked", false);
            if (opts.idField) {
                _585(_68a.checkedRows, opts.idField, row[opts.idField]);
            }
            opts.onUncheck.apply(_687, _588(_687, [_688, row]));
        };
        function _67b(_68c, _68d) {
            var _68e = $.data(_68c, "datagrid");
            var opts = _68e.options;
            var rows = opts.finder.getRows(_68c);
            if (!_68d && opts.selectOnCheck) {
                _676(_68c, true);
            }
            var dc = _68e.dc;
            var hck = dc.header1.add(dc.header2).find("input[type=checkbox]");
            var bck = opts.finder.getTr(_68c, "", "allbody").addClass("datagrid-row-checked").find("div.datagrid-cell-check input[type=checkbox]");
            hck.add(bck)._propAttr("checked", true);
            if (opts.idField) {
                for (var i = 0; i < rows.length; i++) {
                    _587(_68e.checkedRows, opts.idField, rows[i]);
                }
            }
            opts.onCheckAll.call(_68c, rows);
        };
        function _681(_68f, _690) {
            var _691 = $.data(_68f, "datagrid");
            var opts = _691.options;
            var rows = opts.finder.getRows(_68f);
            if (!_690 && opts.selectOnCheck) {
                _671(_68f, true);
            }
            var dc = _691.dc;
            var hck = dc.header1.add(dc.header2).find("input[type=checkbox]");
            var bck = opts.finder.getTr(_68f, "", "checked").removeClass("datagrid-row-checked").find("div.datagrid-cell-check input[type=checkbox]");
            hck.add(bck)._propAttr("checked", false);
            if (opts.idField) {
                for (var i = 0; i < rows.length; i++) {
                    _585(_691.checkedRows, opts.idField, rows[i][opts.idField]);
                }
            }
            opts.onUncheckAll.call(_68f, rows);
        };
        function _692(_693, _694) {
            var opts = $.data(_693, "datagrid").options;
            var tr = opts.finder.getTr(_693, _694);
            var row = opts.finder.getRow(_693, _694);
            if (tr.hasClass("datagrid-row-editing")) {
                return;
            }
            if (opts.onBeforeEdit.apply(_693, _588(_693, [_694, row])) == false) {
                return;
            }
            tr.addClass("datagrid-row-editing");
            _695(_693, _694);
            _637(_693);
            tr.find("div.datagrid-editable").each(function () {
                var _696 = $(this).parent().attr("field");
                var ed = $.data(this, "datagrid.editor");
                ed.actions.setValue(ed.target, row[_696]);
            });
            _697(_693, _694);
            opts.onBeginEdit.apply(_693, _588(_693, [_694, row]));
        };
        function _698(_699, _69a, _69b) {
            var _69c = $.data(_699, "datagrid");
            var opts = _69c.options;
            var _69d = _69c.updatedRows;
            var _69e = _69c.insertedRows;
            var tr = opts.finder.getTr(_699, _69a);
            var row = opts.finder.getRow(_699, _69a);
            if (!tr.hasClass("datagrid-row-editing")) {
                return;
            }
            if (!_69b) {
                if (!_697(_699, _69a)) {
                    return;
                }
                var _69f = false;
                var _6a0 = {};
                tr.find("div.datagrid-editable").each(function () {
                    var _6a1 = $(this).parent().attr("field");
                    var ed = $.data(this, "datagrid.editor");
                    var t = $(ed.target);
                    var _6a2 = t.data("textbox") ? t.textbox("textbox") : t;
                    _6a2.triggerHandler("blur");
                    var _6a3 = ed.actions.getValue(ed.target);
                    if (row[_6a1] != _6a3) {
                        row[_6a1] = _6a3;
                        _69f = true;
                        _6a0[_6a1] = _6a3;
                    }
                });
                if (_69f) {
                    if (_584(_69e, row) == -1) {
                        if (_584(_69d, row) == -1) {
                            _69d.push(row);
                        }
                    }
                }
                opts.onEndEdit.apply(_699, _588(_699, [_69a, row, _6a0]));
            }
            tr.removeClass("datagrid-row-editing");
            _6a4(_699, _69a);
            $(_699).datagrid("refreshRow", _69a);
            if (!_69b) {
                opts.onAfterEdit.apply(_699, _588(_699, [_69a, row, _6a0]));
            } else {
                opts.onCancelEdit.apply(_699, _588(_699, [_69a, row]));
            }
        };
        function _6a5(_6a6, _6a7) {
            var opts = $.data(_6a6, "datagrid").options;
            var tr = opts.finder.getTr(_6a6, _6a7);
            var _6a8 = [];
            tr.children("td").each(function () {
                var cell = $(this).find("div.datagrid-editable");
                if (cell.length) {
                    var ed = $.data(cell[0], "datagrid.editor");
                    _6a8.push(ed);
                }
            });
            return _6a8;
        };
        function _6a9(_6aa, _6ab) {
            var _6ac = _6a5(_6aa, _6ab.index != undefined ? _6ab.index : _6ab.id);
            for (var i = 0; i < _6ac.length; i++) {
                if (_6ac[i].field == _6ab.field) {
                    return _6ac[i];
                }
            }
            return null;
        };
        function _695(_6ad, _6ae) {
            var opts = $.data(_6ad, "datagrid").options;
            var tr = opts.finder.getTr(_6ad, _6ae);
            tr.children("td").each(function () {
                var cell = $(this).find("div.datagrid-cell");
                var _6af = $(this).attr("field");
                var col = _5e0(_6ad, _6af);
                if (col && col.editor) {
                    var _6b0, _6b1;
                    if (typeof col.editor == "string") {
                        _6b0 = col.editor;
                    } else {
                        _6b0 = col.editor.type;
                        _6b1 = col.editor.options;
                    }
                    var _6b2 = opts.editors[_6b0];
                    if (_6b2) {
                        var _6b3 = cell.html();
                        var _6b4 = cell._outerWidth();
                        cell.addClass("datagrid-editable");
                        cell._outerWidth(_6b4);
                        cell.html("<table border=\"0\" cellspacing=\"0\" cellpadding=\"1\"><tr><td></td></tr></table>");
                        cell.children("table").bind("click dblclick contextmenu", function (e) {
                            e.stopPropagation();
                        });
                        $.data(cell[0], "datagrid.editor", {
                            actions: _6b2,
                            target: _6b2.init(cell.find("td"), _6b1),
                            field: _6af,
                            type: _6b0,
                            oldHtml: _6b3
                        });
                    }
                }
            });
            _5af(_6ad, _6ae, true);
        };
        function _6a4(_6b5, _6b6) {
            var opts = $.data(_6b5, "datagrid").options;
            var tr = opts.finder.getTr(_6b5, _6b6);
            tr.children("td").each(function () {
                var cell = $(this).find("div.datagrid-editable");
                if (cell.length) {
                    var ed = $.data(cell[0], "datagrid.editor");
                    if (ed.actions.destroy) {
                        ed.actions.destroy(ed.target);
                    }
                    cell.html(ed.oldHtml);
                    $.removeData(cell[0], "datagrid.editor");
                    cell.removeClass("datagrid-editable");
                    cell.css("width", "");
                }
            });
        };
        function _697(_6b7, _6b8) {
            var tr = $.data(_6b7, "datagrid").options.finder.getTr(_6b7, _6b8);
            if (!tr.hasClass("datagrid-row-editing")) {
                return true;
            }
            var vbox = tr.find(".validatebox-text");
            vbox.validatebox("validate");
            vbox.trigger("mouseleave");
            var _6b9 = tr.find(".validatebox-invalid");
            return _6b9.length == 0;
        };
        function _6ba(_6bb, _6bc) {
            var _6bd = $.data(_6bb, "datagrid").insertedRows;
            var _6be = $.data(_6bb, "datagrid").deletedRows;
            var _6bf = $.data(_6bb, "datagrid").updatedRows;
            if (!_6bc) {
                var rows = [];
                rows = rows.concat(_6bd);
                rows = rows.concat(_6be);
                rows = rows.concat(_6bf);
                return rows;
            } else {
                if (_6bc == "inserted") {
                    return _6bd;
                } else {
                    if (_6bc == "deleted") {
                        return _6be;
                    } else {
                        if (_6bc == "updated") {
                            return _6bf;
                        }
                    }
                }
            }
            return [];
        };
        function _6c0(_6c1, _6c2) {
            var _6c3 = $.data(_6c1, "datagrid");
            var opts = _6c3.options;
            var data = _6c3.data;
            var _6c4 = _6c3.insertedRows;
            var _6c5 = _6c3.deletedRows;
            $(_6c1).datagrid("cancelEdit", _6c2);
            var row = opts.finder.getRow(_6c1, _6c2);
            if (_584(_6c4, row) >= 0) {
                _585(_6c4, row);
            } else {
                _6c5.push(row);
            }
            _585(_6c3.selectedRows, opts.idField, row[opts.idField]);
            _585(_6c3.checkedRows, opts.idField, row[opts.idField]);
            opts.view.deleteRow.call(opts.view, _6c1, _6c2);
            if (opts.height == "auto") {
                _5af(_6c1);
            }
            $(_6c1).datagrid("getPager").pagination("refresh", {total: data.total});
        };
        function _6c6(_6c7, _6c8) {
            var data = $.data(_6c7, "datagrid").data;
            var view = $.data(_6c7, "datagrid").options.view;
            var _6c9 = $.data(_6c7, "datagrid").insertedRows;
            view.insertRow.call(view, _6c7, _6c8.index, _6c8.row);
            _6c9.push(_6c8.row);
            $(_6c7).datagrid("getPager").pagination("refresh", {total: data.total});
        };
        function _6ca(_6cb, row) {
            var data = $.data(_6cb, "datagrid").data;
            var view = $.data(_6cb, "datagrid").options.view;
            var _6cc = $.data(_6cb, "datagrid").insertedRows;
            view.insertRow.call(view, _6cb, null, row);
            _6cc.push(row);
            $(_6cb).datagrid("getPager").pagination("refresh", {total: data.total});
        };
        function _6cd(_6ce) {
            var _6cf = $.data(_6ce, "datagrid");
            var data = _6cf.data;
            var rows = data.rows;
            var _6d0 = [];
            for (var i = 0; i < rows.length; i++) {
                _6d0.push($.extend({}, rows[i]));
            }
            _6cf.originalRows = _6d0;
            _6cf.updatedRows = [];
            _6cf.insertedRows = [];
            _6cf.deletedRows = [];
        };
        function _6d1(_6d2) {
            var data = $.data(_6d2, "datagrid").data;
            var ok = true;
            for (var i = 0, len = data.rows.length; i < len; i++) {
                if (_697(_6d2, i)) {
                    $(_6d2).datagrid("endEdit", i);
                } else {
                    ok = false;
                }
            }
            if (ok) {
                _6cd(_6d2);
            }
        };
        function _6d3(_6d4) {
            var _6d5 = $.data(_6d4, "datagrid");
            var opts = _6d5.options;
            var _6d6 = _6d5.originalRows;
            var _6d7 = _6d5.insertedRows;
            var _6d8 = _6d5.deletedRows;
            var _6d9 = _6d5.selectedRows;
            var _6da = _6d5.checkedRows;
            var data = _6d5.data;

            function _6db(a) {
                var ids = [];
                for (var i = 0; i < a.length; i++) {
                    ids.push(a[i][opts.idField]);
                }
                return ids;
            };
            function _6dc(ids, _6dd) {
                for (var i = 0; i < ids.length; i++) {
                    var _6de = _65a(_6d4, ids[i]);
                    if (_6de >= 0) {
                        (_6dd == "s" ? _5fb : _5f8)(_6d4, _6de, true);
                    }
                }
            };
            for (var i = 0; i < data.rows.length; i++) {
                $(_6d4).datagrid("cancelEdit", i);
            }
            var _6df = _6db(_6d9);
            var _6e0 = _6db(_6da);
            _6d9.splice(0, _6d9.length);
            _6da.splice(0, _6da.length);
            data.total += _6d8.length - _6d7.length;
            data.rows = _6d6;
            _612(_6d4, data);
            _6dc(_6df, "s");
            _6dc(_6e0, "c");
            _6cd(_6d4);
        };
        function _611(_6e1, _6e2) {
            var opts = $.data(_6e1, "datagrid").options;
            if (_6e2) {
                opts.queryParams = _6e2;
            }
            var _6e3 = $.extend({}, opts.queryParams);
            if (opts.pagination) {
                $.extend(_6e3, {page: opts.pageNumber || 1, rows: opts.pageSize});
            }
            if (opts.sortName) {
                $.extend(_6e3, {sort: opts.sortName, order: opts.sortOrder});
            }
            if (opts.onBeforeLoad.call(_6e1, _6e3) == false) {
                return;
            }
            $(_6e1).datagrid("loading");
            var _6e4 = opts.loader.call(_6e1, _6e3, function (data) {
                $(_6e1).datagrid("loaded");
                $(_6e1).datagrid("loadData", data);
            }, function () {
                $(_6e1).datagrid("loaded");
                opts.onLoadError.apply(_6e1, arguments);
            });
            if (_6e4 == false) {
                $(_6e1).datagrid("loaded");
            }
        };
        function _6e5(_6e6, _6e7) {
            var opts = $.data(_6e6, "datagrid").options;
            _6e7.type = _6e7.type || "body";
            _6e7.rowspan = _6e7.rowspan || 1;
            _6e7.colspan = _6e7.colspan || 1;
            if (_6e7.rowspan == 1 && _6e7.colspan == 1) {
                return;
            }
            var tr = opts.finder.getTr(_6e6, (_6e7.index != undefined ? _6e7.index : _6e7.id), _6e7.type);
            if (!tr.length) {
                return;
            }
            var td = tr.find("td[field=\"" + _6e7.field + "\"]");
            td.attr("rowspan", _6e7.rowspan).attr("colspan", _6e7.colspan);
            td.addClass("datagrid-td-merged");
            _6e8(td.next(), _6e7.colspan - 1);
            for (var i = 1; i < _6e7.rowspan; i++) {
                tr = tr.next();
                if (!tr.length) {
                    break;
                }
                td = tr.find("td[field=\"" + _6e7.field + "\"]");
                _6e8(td, _6e7.colspan);
            }
            _636(_6e6);
            function _6e8(td, _6e9) {
                for (var i = 0; i < _6e9; i++) {
                    td.hide();
                    td = td.next();
                }
            };
        };
        $.fn.datagrid = function (_6ea, _6eb) {
            if (typeof _6ea == "string") {
                return $.fn.datagrid.methods[_6ea](this, _6eb);
            }
            _6ea = _6ea || {};
            return this.each(function () {
                var _6ec = $.data(this, "datagrid");
                var opts;
                if (_6ec) {
                    opts = $.extend(_6ec.options, _6ea);
                    _6ec.options = opts;
                } else {
                    opts = $.extend({}, $.extend({}, $.fn.datagrid.defaults, {queryParams: {}}), $.fn.datagrid.parseOptions(this), _6ea);
                    $(this).css("width", "").css("height", "");
                    var _6ed = _5c3(this, opts.rownumbers);
                    if (!opts.columns) {
                        opts.columns = _6ed.columns;
                    }
                    if (!opts.frozenColumns) {
                        opts.frozenColumns = _6ed.frozenColumns;
                    }
                    opts.columns = $.extend(true, [], opts.columns);
                    opts.frozenColumns = $.extend(true, [], opts.frozenColumns);
                    opts.view = $.extend({}, opts.view);
                    $.data(this, "datagrid", {
                        options: opts,
                        panel: _6ed.panel,
                        dc: _6ed.dc,
                        ss: null,
                        selectedRows: [],
                        checkedRows: [],
                        data: {total: 0, rows: []},
                        originalRows: [],
                        updatedRows: [],
                        insertedRows: [],
                        deletedRows: []
                    });
                }
                _5cc(this);
                _5e1(this);
                _599(this);
                if (opts.data) {
                    _612(this, opts.data);
                    _6cd(this);
                } else {
                    var data = $.fn.datagrid.parseData(this);
                    if (data.total > 0) {
                        _612(this, data);
                        _6cd(this);
                    } else {
                        opts.view.renderEmptyRow(this);
                    }
                }
                _611(this);
            });
        };
        function _6ee(_6ef) {
            var _6f0 = {};
            $.map(_6ef, function (name) {
                _6f0[name] = _6f1(name);
            });
            return _6f0;
            function _6f1(name) {
                function isA(_6f2) {
                    return $.data($(_6f2)[0], name) != undefined;
                };
                return {
                    init: function (_6f3, _6f4) {
                        var _6f5 = $("<input type=\"text\" class=\"datagrid-editable-input\">").appendTo(_6f3);
                        if (_6f5[name] && name != "text") {
                            return _6f5[name](_6f4);
                        } else {
                            return _6f5;
                        }
                    }, destroy: function (_6f6) {
                        if (isA(_6f6, name)) {
                            $(_6f6)[name]("destroy");
                        }
                    }, getValue: function (_6f7) {
                        if (isA(_6f7, name)) {
                            var opts = $(_6f7)[name]("options");
                            if (opts.multiple) {
                                return $(_6f7)[name]("getValues").join(opts.separator);
                            } else {
                                return $(_6f7)[name]("getValue");
                            }
                        } else {
                            return $(_6f7).val();
                        }
                    }, setValue: function (_6f8, _6f9) {
                        if (isA(_6f8, name)) {
                            var opts = $(_6f8)[name]("options");
                            if (opts.multiple) {
                                if (_6f9) {
                                    $(_6f8)[name]("setValues", _6f9.split(opts.separator));
                                } else {
                                    $(_6f8)[name]("clear");
                                }
                            } else {
                                $(_6f8)[name]("setValue", _6f9);
                            }
                        } else {
                            $(_6f8).val(_6f9);
                        }
                    }, resize: function (_6fa, _6fb) {
                        if (isA(_6fa, name)) {
                            $(_6fa)[name]("resize", _6fb);
                        } else {
                            $(_6fa)._outerWidth(_6fb)._outerHeight(22);
                        }
                    }
                };
            };
        };
        var _6fc = $.extend({}, _6ee(["text", "textbox", "numberbox", "numberspinner", "combobox", "combotree", "combogrid", "datebox", "datetimebox", "timespinner", "datetimespinner"]), {
            textarea: {
                init: function (_6fd, _6fe) {
                    var _6ff = $("<textarea class=\"datagrid-editable-input\"></textarea>").appendTo(_6fd);
                    return _6ff;
                }, getValue: function (_700) {
                    return $(_700).val();
                }, setValue: function (_701, _702) {
                    $(_701).val(_702);
                }, resize: function (_703, _704) {
                    $(_703)._outerWidth(_704);
                }
            }, checkbox: {
                init: function (_705, _706) {
                    var _707 = $("<input type=\"checkbox\">").appendTo(_705);
                    _707.val(_706.on);
                    _707.attr("offval", _706.off);
                    return _707;
                }, getValue: function (_708) {
                    if ($(_708).is(":checked")) {
                        return $(_708).val();
                    } else {
                        return $(_708).attr("offval");
                    }
                }, setValue: function (_709, _70a) {
                    var _70b = false;
                    if ($(_709).val() == _70a) {
                        _70b = true;
                    }
                    $(_709)._propAttr("checked", _70b);
                }
            }, validatebox: {
                init: function (_70c, _70d) {
                    var _70e = $("<input type=\"text\" class=\"datagrid-editable-input\">").appendTo(_70c);
                    _70e.validatebox(_70d);
                    return _70e;
                }, destroy: function (_70f) {
                    $(_70f).validatebox("destroy");
                }, getValue: function (_710) {
                    return $(_710).val();
                }, setValue: function (_711, _712) {
                    $(_711).val(_712);
                }, resize: function (_713, _714) {
                    $(_713)._outerWidth(_714)._outerHeight(22);
                }
            }
        });
        $.fn.datagrid.methods = {
            options: function (jq) {
                var _715 = $.data(jq[0], "datagrid").options;
                var _716 = $.data(jq[0], "datagrid").panel.panel("options");
                var opts = $.extend(_715, {
                    width: _716.width,
                    height: _716.height,
                    closed: _716.closed,
                    collapsed: _716.collapsed,
                    minimized: _716.minimized,
                    maximized: _716.maximized
                });
                return opts;
            }, setSelectionState: function (jq) {
                return jq.each(function () {
                    _652(this);
                });
            }, createStyleSheet: function (jq) {
                return _58a(jq[0]);
            }, getPanel: function (jq) {
                return $.data(jq[0], "datagrid").panel;
            }, getPager: function (jq) {
                return $.data(jq[0], "datagrid").panel.children("div.datagrid-pager");
            }, getColumnFields: function (jq, _717) {
                return _5df(jq[0], _717);
            }, getColumnOption: function (jq, _718) {
                return _5e0(jq[0], _718);
            }, resize: function (jq, _719) {
                return jq.each(function () {
                    _599(this, _719);
                });
            }, load: function (jq, _71a) {
                return jq.each(function () {
                    var opts = $(this).datagrid("options");
                    if (typeof _71a == "string") {
                        opts.url = _71a;
                        _71a = null;
                    }
                    opts.pageNumber = 1;
                    var _71b = $(this).datagrid("getPager");
                    _71b.pagination("refresh", {pageNumber: 1});
                    _611(this, _71a);
                });
            }, reload: function (jq, _71c) {
                return jq.each(function () {
                    var opts = $(this).datagrid("options");
                    if (typeof _71c == "string") {
                        opts.url = _71c;
                        _71c = null;
                    }
                    _611(this, _71c);
                });
            }, reloadFooter: function (jq, _71d) {
                return jq.each(function () {
                    var opts = $.data(this, "datagrid").options;
                    var dc = $.data(this, "datagrid").dc;
                    if (_71d) {
                        $.data(this, "datagrid").footer = _71d;
                    }
                    if (opts.showFooter) {
                        opts.view.renderFooter.call(opts.view, this, dc.footer2, false);
                        opts.view.renderFooter.call(opts.view, this, dc.footer1, true);
                        if (opts.view.onAfterRender) {
                            opts.view.onAfterRender.call(opts.view, this);
                        }
                        $(this).datagrid("fixRowHeight");
                    }
                });
            }, loading: function (jq) {
                return jq.each(function () {
                    var opts = $.data(this, "datagrid").options;
                    $(this).datagrid("getPager").pagination("loading");
                    if (opts.loadMsg) {
                        var _71e = $(this).datagrid("getPanel");
                        if (!_71e.children("div.datagrid-mask").length) {
                            $("<div class=\"datagrid-mask\" style=\"display:block\"></div>").appendTo(_71e);
                            var msg = $("<div class=\"datagrid-mask-msg\" style=\"display:block;left:50%\"></div>").html(opts.loadMsg).appendTo(_71e);
                            msg._outerHeight(40);
                            msg.css({marginLeft: (-msg.outerWidth() / 2), lineHeight: (msg.height() + "px")});
                        }
                    }
                });
            }, loaded: function (jq) {
                return jq.each(function () {
                    $(this).datagrid("getPager").pagination("loaded");
                    var _71f = $(this).datagrid("getPanel");
                    _71f.children("div.datagrid-mask-msg").remove();
                    _71f.children("div.datagrid-mask").remove();
                });
            }, fitColumns: function (jq) {
                return jq.each(function () {
                    _613(this);
                });
            }, fixColumnSize: function (jq, _720) {
                return jq.each(function () {
                    _631(this, _720);
                });
            }, fixRowHeight: function (jq, _721) {
                return jq.each(function () {
                    _5af(this, _721);
                });
            }, freezeRow: function (jq, _722) {
                return jq.each(function () {
                    _5bc(this, _722);
                });
            }, autoSizeColumn: function (jq, _723) {
                return jq.each(function () {
                    _625(this, _723);
                });
            }, loadData: function (jq, data) {
                return jq.each(function () {
                    _612(this, data);
                    _6cd(this);
                });
            }, getData: function (jq) {
                return $.data(jq[0], "datagrid").data;
            }, getRows: function (jq) {
                return $.data(jq[0], "datagrid").data.rows;
            }, getFooterRows: function (jq) {
                return $.data(jq[0], "datagrid").footer;
            }, getRowIndex: function (jq, id) {
                return _65a(jq[0], id);
            }, getChecked: function (jq) {
                return _660(jq[0]);
            }, getSelected: function (jq) {
                var rows = _65d(jq[0]);
                return rows.length > 0 ? rows[0] : null;
            }, getSelections: function (jq) {
                return _65d(jq[0]);
            }, clearSelections: function (jq) {
                return jq.each(function () {
                    var _724 = $.data(this, "datagrid");
                    var _725 = _724.selectedRows;
                    var _726 = _724.checkedRows;
                    _725.splice(0, _725.length);
                    _671(this);
                    if (_724.options.checkOnSelect) {
                        _726.splice(0, _726.length);
                    }
                });
            }, clearChecked: function (jq) {
                return jq.each(function () {
                    var _727 = $.data(this, "datagrid");
                    var _728 = _727.selectedRows;
                    var _729 = _727.checkedRows;
                    _729.splice(0, _729.length);
                    _681(this);
                    if (_727.options.selectOnCheck) {
                        _728.splice(0, _728.length);
                    }
                });
            }, scrollTo: function (jq, _72a) {
                return jq.each(function () {
                    _663(this, _72a);
                });
            }, highlightRow: function (jq, _72b) {
                return jq.each(function () {
                    _5f4(this, _72b);
                    _663(this, _72b);
                });
            }, selectAll: function (jq) {
                return jq.each(function () {
                    _676(this);
                });
            }, unselectAll: function (jq) {
                return jq.each(function () {
                    _671(this);
                });
            }, selectRow: function (jq, _72c) {
                return jq.each(function () {
                    _5fb(this, _72c);
                });
            }, selectRecord: function (jq, id) {
                return jq.each(function () {
                    var opts = $.data(this, "datagrid").options;
                    if (opts.idField) {
                        var _72d = _65a(this, id);
                        if (_72d >= 0) {
                            $(this).datagrid("selectRow", _72d);
                        }
                    }
                });
            }, unselectRow: function (jq, _72e) {
                return jq.each(function () {
                    _5fc(this, _72e);
                });
            }, checkRow: function (jq, _72f) {
                return jq.each(function () {
                    _5f8(this, _72f);
                });
            }, uncheckRow: function (jq, _730) {
                return jq.each(function () {
                    _5f9(this, _730);
                });
            }, checkAll: function (jq) {
                return jq.each(function () {
                    _67b(this);
                });
            }, uncheckAll: function (jq) {
                return jq.each(function () {
                    _681(this);
                });
            }, beginEdit: function (jq, _731) {
                return jq.each(function () {
                    _692(this, _731);
                });
            }, endEdit: function (jq, _732) {
                return jq.each(function () {
                    _698(this, _732, false);
                });
            }, cancelEdit: function (jq, _733) {
                return jq.each(function () {
                    _698(this, _733, true);
                });
            }, getEditors: function (jq, _734) {
                return _6a5(jq[0], _734);
            }, getEditor: function (jq, _735) {
                return _6a9(jq[0], _735);
            }, refreshRow: function (jq, _736) {
                return jq.each(function () {
                    var opts = $.data(this, "datagrid").options;
                    opts.view.refreshRow.call(opts.view, this, _736);
                });
            }, validateRow: function (jq, _737) {
                return _697(jq[0], _737);
            }, updateRow: function (jq, _738) {
                return jq.each(function () {
                    var opts = $.data(this, "datagrid").options;
                    opts.view.updateRow.call(opts.view, this, _738.index, _738.row);
                });
            }, appendRow: function (jq, row) {
                return jq.each(function () {
                    _6ca(this, row);
                });
            }, insertRow: function (jq, _739) {
                return jq.each(function () {
                    _6c6(this, _739);
                });
            }, deleteRow: function (jq, _73a) {
                return jq.each(function () {
                    _6c0(this, _73a);
                });
            }, getChanges: function (jq, _73b) {
                return _6ba(jq[0], _73b);
            }, acceptChanges: function (jq) {
                return jq.each(function () {
                    _6d1(this);
                });
            }, rejectChanges: function (jq) {
                return jq.each(function () {
                    _6d3(this);
                });
            }, mergeCells: function (jq, _73c) {
                return jq.each(function () {
                    _6e5(this, _73c);
                });
            }, showColumn: function (jq, _73d) {
                return jq.each(function () {
                    var _73e = $(this).datagrid("getPanel");
                    _73e.find("td[field=\"" + _73d + "\"]").show();
                    $(this).datagrid("getColumnOption", _73d).hidden = false;
                    $(this).datagrid("fitColumns");
                });
            }, hideColumn: function (jq, _73f) {
                return jq.each(function () {
                    var _740 = $(this).datagrid("getPanel");
                    _740.find("td[field=\"" + _73f + "\"]").hide();
                    $(this).datagrid("getColumnOption", _73f).hidden = true;
                    $(this).datagrid("fitColumns");
                });
            }, sort: function (jq, _741) {
                return jq.each(function () {
                    _606(this, _741);
                });
            }
        };
        $.fn.datagrid.parseOptions = function (_742) {
            var t = $(_742);
            return $.extend({}, $.fn.panel.parseOptions(_742), $.parser.parseOptions(_742, ["url", "toolbar", "idField", "sortName", "sortOrder", "pagePosition", "resizeHandle", {
                sharedStyleSheet: "boolean",
                fitColumns: "boolean",
                autoRowHeight: "boolean",
                striped: "boolean",
                nowrap: "boolean"
            }, {
                rownumbers: "boolean",
                singleSelect: "boolean",
                ctrlSelect: "boolean",
                checkOnSelect: "boolean",
                selectOnCheck: "boolean"
            }, {pagination: "boolean", pageSize: "number", pageNumber: "number"}, {
                multiSort: "boolean",
                remoteSort: "boolean",
                showHeader: "boolean",
                showFooter: "boolean"
            }, {scrollbarSize: "number"}]), {
                pageList: (t.attr("pageList") ? eval(t.attr("pageList")) : undefined),
                loadMsg: (t.attr("loadMsg") != undefined ? t.attr("loadMsg") : undefined),
                rowStyler: (t.attr("rowStyler") ? eval(t.attr("rowStyler")) : undefined)
            });
        };
        $.fn.datagrid.parseData = function (_743) {
            var t = $(_743);
            var data = {total: 0, rows: []};
            var _744 = t.datagrid("getColumnFields", true).concat(t.datagrid("getColumnFields", false));
            t.find("tbody tr").each(function () {
                data.total++;
                var row = {};
                $.extend(row, $.parser.parseOptions(this, ["iconCls", "state"]));
                for (var i = 0; i < _744.length; i++) {
                    row[_744[i]] = $(this).find("td:eq(" + i + ")").html();
                }
                data.rows.push(row);
            });
            return data;
        };
        var _745 = {
            render: function (_746, _747, _748) {
                var rows = $(_746).datagrid("getRows");
                $(_747).html(this.renderTable(_746, 0, rows, _748));
            }, renderFooter: function (_749, _74a, _74b) {
                var opts = $.data(_749, "datagrid").options;
                var rows = $.data(_749, "datagrid").footer || [];
                var _74c = $(_749).datagrid("getColumnFields", _74b);
                var _74d = ["<table class=\"datagrid-ftable\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\"><tbody>"];
                for (var i = 0; i < rows.length; i++) {
                    _74d.push("<tr class=\"datagrid-row\" datagrid-row-index=\"" + i + "\">");
                    _74d.push(this.renderRow.call(this, _749, _74c, _74b, i, rows[i]));
                    _74d.push("</tr>");
                }
                _74d.push("</tbody></table>");
                $(_74a).html(_74d.join(""));
            }, renderTable: function (_74e, _74f, rows, _750) {
                var _751 = $.data(_74e, "datagrid");
                var opts = _751.options;
                if (_750) {
                    if (!(opts.rownumbers || (opts.frozenColumns && opts.frozenColumns.length))) {
                        return "";
                    }
                }
                var _752 = $(_74e).datagrid("getColumnFields", _750);
                var _753 = ["<table class=\"datagrid-btable\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\"><tbody>"];
                for (var i = 0; i < rows.length; i++) {
                    var row = rows[i];
                    var css = opts.rowStyler ? opts.rowStyler.call(_74e, _74f, row) : "";
                    var _754 = "";
                    var _755 = "";
                    if (typeof css == "string") {
                        _755 = css;
                    } else {
                        if (css) {
                            _754 = css["class"] || "";
                            _755 = css["style"] || "";
                        }
                    }
                    var cls = "class=\"datagrid-row " + (_74f % 2 && opts.striped ? "datagrid-row-alt " : " ") + _754 + "\"";
                    var _756 = _755 ? "style=\"" + _755 + "\"" : "";
                    var _757 = _751.rowIdPrefix + "-" + (_750 ? 1 : 2) + "-" + _74f;
                    _753.push("<tr id=\"" + _757 + "\" datagrid-row-index=\"" + _74f + "\" " + cls + " " + _756 + ">");
                    _753.push(this.renderRow.call(this, _74e, _752, _750, _74f, row));
                    _753.push("</tr>");
                    _74f++;
                }
                _753.push("</tbody></table>");
                return _753.join("");
            }, renderRow: function (_758, _759, _75a, _75b, _75c) {
                var opts = $.data(_758, "datagrid").options;
                var cc = [];
                if (_75a && opts.rownumbers) {
                    var _75d = _75b + 1;
                    if (opts.pagination) {
                        _75d += (opts.pageNumber - 1) * opts.pageSize;
                    }
                    cc.push("<td class=\"datagrid-td-rownumber\"><div class=\"datagrid-cell-rownumber\">" + _75d + "</div></td>");
                }
                for (var i = 0; i < _759.length; i++) {
                    var _75e = _759[i];
                    var col = $(_758).datagrid("getColumnOption", _75e);
                    if (col) {
                        var _75f = _75c[_75e];
                        var css = col.styler ? (col.styler(_75f, _75c, _75b) || "") : "";
                        var _760 = "";
                        var _761 = "";
                        if (typeof css == "string") {
                            _761 = css;
                        } else {
                            if (css) {
                                _760 = css["class"] || "";
                                _761 = css["style"] || "";
                            }
                        }
                        var cls = _760 ? "class=\"" + _760 + "\"" : "";
                        var _762 = col.hidden ? "style=\"display:none;" + _761 + "\"" : (_761 ? "style=\"" + _761 + "\"" : "");
                        cc.push("<td field=\"" + _75e + "\" " + cls + " " + _762 + ">");
                        var _762 = "";
                        if (!col.checkbox) {
                            if (col.align) {
                                _762 += "text-align:" + col.align + ";";
                            }
                            if (!opts.nowrap) {
                                _762 += "white-space:normal;height:auto;";
                            } else {
                                if (opts.autoRowHeight) {
                                    _762 += "height:auto;";
                                }
                            }
                        }
                        cc.push("<div style=\"" + _762 + "\" ");
                        cc.push(col.checkbox ? "class=\"datagrid-cell-check\"" : "class=\"datagrid-cell " + col.cellClass + "\"");
                        cc.push(">");
                        if (col.checkbox) {
                            cc.push("<input type=\"checkbox\" " + (_75c.checked ? "checked=\"checked\"" : ""));
                            cc.push(" name=\"" + _75e + "\" value=\"" + (_75f != undefined ? _75f : "") + "\">");
                        } else {
                            if (col.formatter) {
                                cc.push(col.formatter(_75f, _75c, _75b));
                            } else {
                                cc.push(_75f);
                            }
                        }
                        cc.push("</div>");
                        cc.push("</td>");
                    }
                }
                return cc.join("");
            }, refreshRow: function (_763, _764) {
                this.updateRow.call(this, _763, _764, {});
            }, updateRow: function (_765, _766, row) {
                var opts = $.data(_765, "datagrid").options;
                var rows = $(_765).datagrid("getRows");
                var _767 = _768(_766);
                $.extend(rows[_766], row);
                var _769 = _768(_766);
                var _76a = _767.c;
                var _76b = _769.s;
                var _76c = "datagrid-row " + (_766 % 2 && opts.striped ? "datagrid-row-alt " : " ") + _769.c;

                function _768(_76d) {
                    var css = opts.rowStyler ? opts.rowStyler.call(_765, _76d, rows[_76d]) : "";
                    var _76e = "";
                    var _76f = "";
                    if (typeof css == "string") {
                        _76f = css;
                    } else {
                        if (css) {
                            _76e = css["class"] || "";
                            _76f = css["style"] || "";
                        }
                    }
                    return {c: _76e, s: _76f};
                };
                function _770(_771) {
                    var _772 = $(_765).datagrid("getColumnFields", _771);
                    var tr = opts.finder.getTr(_765, _766, "body", (_771 ? 1 : 2));
                    var _773 = tr.find("div.datagrid-cell-check input[type=checkbox]").is(":checked");
                    tr.html(this.renderRow.call(this, _765, _772, _771, _766, rows[_766]));
                    tr.attr("style", _76b).removeClass(_76a).addClass(_76c);
                    if (_773) {
                        tr.find("div.datagrid-cell-check input[type=checkbox]")._propAttr("checked", true);
                    }
                };
                _770.call(this, true);
                _770.call(this, false);
                $(_765).datagrid("fixRowHeight", _766);
            }, insertRow: function (_774, _775, row) {
                var _776 = $.data(_774, "datagrid");
                var opts = _776.options;
                var dc = _776.dc;
                var data = _776.data;
                if (_775 == undefined || _775 == null) {
                    _775 = data.rows.length;
                }
                if (_775 > data.rows.length) {
                    _775 = data.rows.length;
                }
                function _777(_778) {
                    var _779 = _778 ? 1 : 2;
                    for (var i = data.rows.length - 1; i >= _775; i--) {
                        var tr = opts.finder.getTr(_774, i, "body", _779);
                        tr.attr("datagrid-row-index", i + 1);
                        tr.attr("id", _776.rowIdPrefix + "-" + _779 + "-" + (i + 1));
                        if (_778 && opts.rownumbers) {
                            var _77a = i + 2;
                            if (opts.pagination) {
                                _77a += (opts.pageNumber - 1) * opts.pageSize;
                            }
                            tr.find("div.datagrid-cell-rownumber").html(_77a);
                        }
                        if (opts.striped) {
                            tr.removeClass("datagrid-row-alt").addClass((i + 1) % 2 ? "datagrid-row-alt" : "");
                        }
                    }
                };
                function _77b(_77c) {
                    var _77d = _77c ? 1 : 2;
                    var _77e = $(_774).datagrid("getColumnFields", _77c);
                    var _77f = _776.rowIdPrefix + "-" + _77d + "-" + _775;
                    var tr = "<tr id=\"" + _77f + "\" class=\"datagrid-row\" datagrid-row-index=\"" + _775 + "\"></tr>";
                    if (_775 >= data.rows.length) {
                        if (data.rows.length) {
                            opts.finder.getTr(_774, "", "last", _77d).after(tr);
                        } else {
                            var cc = _77c ? dc.body1 : dc.body2;
                            cc.html("<table cellspacing=\"0\" cellpadding=\"0\" border=\"0\"><tbody>" + tr + "</tbody></table>");
                        }
                    } else {
                        opts.finder.getTr(_774, _775 + 1, "body", _77d).before(tr);
                    }
                };
                _777.call(this, true);
                _777.call(this, false);
                _77b.call(this, true);
                _77b.call(this, false);
                data.total += 1;
                data.rows.splice(_775, 0, row);
                this.refreshRow.call(this, _774, _775);
            }, deleteRow: function (_780, _781) {
                var _782 = $.data(_780, "datagrid");
                var opts = _782.options;
                var data = _782.data;

                function _783(_784) {
                    var _785 = _784 ? 1 : 2;
                    for (var i = _781 + 1; i < data.rows.length; i++) {
                        var tr = opts.finder.getTr(_780, i, "body", _785);
                        tr.attr("datagrid-row-index", i - 1);
                        tr.attr("id", _782.rowIdPrefix + "-" + _785 + "-" + (i - 1));
                        if (_784 && opts.rownumbers) {
                            var _786 = i;
                            if (opts.pagination) {
                                _786 += (opts.pageNumber - 1) * opts.pageSize;
                            }
                            tr.find("div.datagrid-cell-rownumber").html(_786);
                        }
                        if (opts.striped) {
                            tr.removeClass("datagrid-row-alt").addClass((i - 1) % 2 ? "datagrid-row-alt" : "");
                        }
                    }
                };
                opts.finder.getTr(_780, _781).remove();
                _783.call(this, true);
                _783.call(this, false);
                data.total -= 1;
                data.rows.splice(_781, 1);
            }, onBeforeRender: function (_787, rows) {
            }, onAfterRender: function (_788) {
                var _789 = $.data(_788, "datagrid");
                var opts = _789.options;
                if (opts.showFooter) {
                    var _78a = $(_788).datagrid("getPanel").find("div.datagrid-footer");
                    _78a.find("div.datagrid-cell-rownumber,div.datagrid-cell-check").css("visibility", "hidden");
                }
                if (opts.finder.getRows(_788).length == 0) {
                    this.renderEmptyRow(_788);
                }
            }, renderEmptyRow: function (_78b) {
                var dc = $.data(_78b, "datagrid").dc;
                dc.body2.html(this.renderTable(_78b, 0, [{}], false));
                dc.body2.find(".datagrid-row").removeClass("datagrid-row").removeAttr("datagrid-row-index");
                dc.body2.find("tbody *").css({height: 1, borderColor: "transparent", background: "transparent"});
            }
        };
        $.fn.datagrid.defaults = $.extend({}, $.fn.panel.defaults, {
            sharedStyleSheet: false,
            frozenColumns: undefined,
            columns: undefined,
            fitColumns: false,
            resizeHandle: "right",
            autoRowHeight: true,
            toolbar: null,
            striped: false,
            method: "post",
            nowrap: true,
            idField: null,
            url: null,
            data: null,
            loadMsg: "Processing, please wait ...",
            rownumbers: false,
            singleSelect: false,
            ctrlSelect: false,
            selectOnCheck: true,
            checkOnSelect: true,
            pagination: false,
            pagePosition: "bottom",
            pageNumber: 1,
            pageSize: 10,
            pageList: [10, 20, 30, 40, 50],
            queryParams: {},
            sortName: null,
            sortOrder: "asc",
            multiSort: false,
            remoteSort: true,
            showHeader: true,
            showFooter: false,
            scrollbarSize: 18,
            rowEvents: {mouseover: _5ed(true), mouseout: _5ed(false), click: _5f5, dblclick: _5ff, contextmenu: _603},
            rowStyler: function (_78c, _78d) {
            },
            loader: function (_78e, _78f, _790) {
                var opts = $(this).datagrid("options");
                if (!opts.url) {
                    return false;
                }
                $.ajax({
                    type: opts.method, url: opts.url, data: _78e, dataType: "json", success: function (data) {
                        _78f(data);
                    }, error: function () {
                        _790.apply(this, arguments);
                    }
                });
            },
            loadFilter: function (data) {
                if (typeof data.length == "number" && typeof data.splice == "function") {
                    return {total: data.length, rows: data};
                } else {
                    return data;
                }
            },
            editors: _6fc,
            finder: {
                getTr: function (_791, _792, type, _793) {
                    type = type || "body";
                    _793 = _793 || 0;
                    var _794 = $.data(_791, "datagrid");
                    var dc = _794.dc;
                    var opts = _794.options;
                    if (_793 == 0) {
                        var tr1 = opts.finder.getTr(_791, _792, type, 1);
                        var tr2 = opts.finder.getTr(_791, _792, type, 2);
                        return tr1.add(tr2);
                    } else {
                        if (type == "body") {
                            var tr = $("#" + _794.rowIdPrefix + "-" + _793 + "-" + _792);
                            if (!tr.length) {
                                tr = (_793 == 1 ? dc.body1 : dc.body2).find(">table>tbody>tr[datagrid-row-index=" + _792 + "]");
                            }
                            return tr;
                        } else {
                            if (type == "footer") {
                                return (_793 == 1 ? dc.footer1 : dc.footer2).find(">table>tbody>tr[datagrid-row-index=" + _792 + "]");
                            } else {
                                if (type == "selected") {
                                    return (_793 == 1 ? dc.body1 : dc.body2).find(">table>tbody>tr.datagrid-row-selected");
                                } else {
                                    if (type == "highlight") {
                                        return (_793 == 1 ? dc.body1 : dc.body2).find(">table>tbody>tr.datagrid-row-over");
                                    } else {
                                        if (type == "checked") {
                                            return (_793 == 1 ? dc.body1 : dc.body2).find(">table>tbody>tr.datagrid-row-checked");
                                        } else {
                                            if (type == "editing") {
                                                return (_793 == 1 ? dc.body1 : dc.body2).find(">table>tbody>tr.datagrid-row-editing");
                                            } else {
                                                if (type == "last") {
                                                    return (_793 == 1 ? dc.body1 : dc.body2).find(">table>tbody>tr[datagrid-row-index]:last");
                                                } else {
                                                    if (type == "allbody") {
                                                        return (_793 == 1 ? dc.body1 : dc.body2).find(">table>tbody>tr[datagrid-row-index]");
                                                    } else {
                                                        if (type == "allfooter") {
                                                            return (_793 == 1 ? dc.footer1 : dc.footer2).find(">table>tbody>tr[datagrid-row-index]");
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }, getRow: function (_795, p) {
                    var _796 = (typeof p == "object") ? p.attr("datagrid-row-index") : p;
                    return $.data(_795, "datagrid").data.rows[parseInt(_796)];
                }, getRows: function (_797) {
                    return $(_797).datagrid("getRows");
                }
            },
            view: _745,
            onBeforeLoad: function (_798) {
            },
            onLoadSuccess: function () {
            },
            onLoadError: function () {
            },
            onClickRow: function (_799, _79a) {
            },
            onDblClickRow: function (_79b, _79c) {
            },
            onClickCell: function (_79d, _79e, _79f) {
            },
            onDblClickCell: function (_7a0, _7a1, _7a2) {
            },
            onBeforeSortColumn: function (sort, _7a3) {
            },
            onSortColumn: function (sort, _7a4) {
            },
            onResizeColumn: function (_7a5, _7a6) {
            },
            onBeforeSelect: function (_7a7, _7a8) {
            },
            onSelect: function (_7a9, _7aa) {
            },
            onBeforeUnselect: function (_7ab, _7ac) {
            },
            onUnselect: function (_7ad, _7ae) {
            },
            onSelectAll: function (rows) {
            },
            onUnselectAll: function (rows) {
            },
            onBeforeCheck: function (_7af, _7b0) {
            },
            onCheck: function (_7b1, _7b2) {
            },
            onBeforeUncheck: function (_7b3, _7b4) {
            },
            onUncheck: function (_7b5, _7b6) {
            },
            onCheckAll: function (rows) {
            },
            onUncheckAll: function (rows) {
            },
            onBeforeEdit: function (_7b7, _7b8) {
            },
            onBeginEdit: function (_7b9, _7ba) {
            },
            onEndEdit: function (_7bb, _7bc, _7bd) {
            },
            onAfterEdit: function (_7be, _7bf, _7c0) {
            },
            onCancelEdit: function (_7c1, _7c2) {
            },
            onHeaderContextMenu: function (e, _7c3) {
            },
            onRowContextMenu: function (e, _7c4, _7c5) {
            }
        });
    })(jQuery);
    (function ($) {
        var _7c6;
        $(document).unbind(".propertygrid").bind("mousedown.propertygrid", function (e) {
            var p = $(e.target).closest("div.datagrid-view,div.combo-panel");
            if (p.length) {
                return;
            }
            _7c7(_7c6);
            _7c6 = undefined;
        });
        function _7c8(_7c9) {
            var _7ca = $.data(_7c9, "propertygrid");
            var opts = $.data(_7c9, "propertygrid").options;
            $(_7c9).datagrid($.extend({}, opts, {
                cls: "propertygrid",
                view: (opts.showGroup ? opts.groupView : opts.view),
                onBeforeEdit: function (_7cb, row) {
                    if (opts.onBeforeEdit.call(_7c9, _7cb, row) == false) {
                        return false;
                    }
                    var dg = $(this);
                    var row = dg.datagrid("getRows")[_7cb];
                    var col = dg.datagrid("getColumnOption", "value");
                    col.editor = row.editor;
                },
                onClickCell: function (_7cc, _7cd, _7ce) {
                    if (_7c6 != this) {
                        _7c7(_7c6);
                        _7c6 = this;
                    }
                    if (opts.editIndex != _7cc) {
                        _7c7(_7c6);
                        $(this).datagrid("beginEdit", _7cc);
                        var ed = $(this).datagrid("getEditor", {index: _7cc, field: _7cd});
                        if (!ed) {
                            ed = $(this).datagrid("getEditor", {index: _7cc, field: "value"});
                        }
                        if (ed) {
                            var t = $(ed.target);
                            var _7cf = t.data("textbox") ? t.textbox("textbox") : t;
                            _7cf.focus();
                            opts.editIndex = _7cc;
                        }
                    }
                    opts.onClickCell.call(_7c9, _7cc, _7cd, _7ce);
                },
                loadFilter: function (data) {
                    _7c7(this);
                    return opts.loadFilter.call(this, data);
                }
            }));
        };
        function _7c7(_7d0) {
            var t = $(_7d0);
            if (!t.length) {
                return;
            }
            var opts = $.data(_7d0, "propertygrid").options;
            opts.finder.getTr(_7d0, null, "editing").each(function () {
                var _7d1 = parseInt($(this).attr("datagrid-row-index"));
                if (t.datagrid("validateRow", _7d1)) {
                    t.datagrid("endEdit", _7d1);
                } else {
                    t.datagrid("cancelEdit", _7d1);
                }
            });
            opts.editIndex = undefined;
        };
        $.fn.propertygrid = function (_7d2, _7d3) {
            if (typeof _7d2 == "string") {
                var _7d4 = $.fn.propertygrid.methods[_7d2];
                if (_7d4) {
                    return _7d4(this, _7d3);
                } else {
                    return this.datagrid(_7d2, _7d3);
                }
            }
            _7d2 = _7d2 || {};
            return this.each(function () {
                var _7d5 = $.data(this, "propertygrid");
                if (_7d5) {
                    $.extend(_7d5.options, _7d2);
                } else {
                    var opts = $.extend({}, $.fn.propertygrid.defaults, $.fn.propertygrid.parseOptions(this), _7d2);
                    opts.frozenColumns = $.extend(true, [], opts.frozenColumns);
                    opts.columns = $.extend(true, [], opts.columns);
                    $.data(this, "propertygrid", {options: opts});
                }
                _7c8(this);
            });
        };
        $.fn.propertygrid.methods = {
            options: function (jq) {
                return $.data(jq[0], "propertygrid").options;
            }
        };
        $.fn.propertygrid.parseOptions = function (_7d6) {
            return $.extend({}, $.fn.datagrid.parseOptions(_7d6), $.parser.parseOptions(_7d6, [{showGroup: "boolean"}]));
        };
        var _7d7 = $.extend({}, $.fn.datagrid.defaults.view, {
            render: function (_7d8, _7d9, _7da) {
                var _7db = [];
                var _7dc = this.groups;
                for (var i = 0; i < _7dc.length; i++) {
                    _7db.push(this.renderGroup.call(this, _7d8, i, _7dc[i], _7da));
                }
                $(_7d9).html(_7db.join(""));
            }, renderGroup: function (_7dd, _7de, _7df, _7e0) {
                var _7e1 = $.data(_7dd, "datagrid");
                var opts = _7e1.options;
                var _7e2 = $(_7dd).datagrid("getColumnFields", _7e0);
                var _7e3 = [];
                _7e3.push("<div class=\"datagrid-group\" group-index=" + _7de + ">");
                _7e3.push("<table cellspacing=\"0\" cellpadding=\"0\" border=\"0\" style=\"height:100%\"><tbody>");
                _7e3.push("<tr>");
                if ((_7e0 && (opts.rownumbers || opts.frozenColumns.length)) || (!_7e0 && !(opts.rownumbers || opts.frozenColumns.length))) {
                    _7e3.push("<td style=\"border:0;text-align:center;width:25px\"><span class=\"datagrid-row-expander datagrid-row-collapse\" style=\"display:inline-block;width:16px;height:16px;cursor:pointer\">&nbsp;</span></td>");
                }
                _7e3.push("<td style=\"border:0;\">");
                if (!_7e0) {
                    _7e3.push("<span class=\"datagrid-group-title\">");
                    _7e3.push(opts.groupFormatter.call(_7dd, _7df.value, _7df.rows));
                    _7e3.push("</span>");
                }
                _7e3.push("</td>");
                _7e3.push("</tr>");
                _7e3.push("</tbody></table>");
                _7e3.push("</div>");
                _7e3.push("<table class=\"datagrid-btable\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\"><tbody>");
                var _7e4 = _7df.startIndex;
                for (var j = 0; j < _7df.rows.length; j++) {
                    var css = opts.rowStyler ? opts.rowStyler.call(_7dd, _7e4, _7df.rows[j]) : "";
                    var _7e5 = "";
                    var _7e6 = "";
                    if (typeof css == "string") {
                        _7e6 = css;
                    } else {
                        if (css) {
                            _7e5 = css["class"] || "";
                            _7e6 = css["style"] || "";
                        }
                    }
                    var cls = "class=\"datagrid-row " + (_7e4 % 2 && opts.striped ? "datagrid-row-alt " : " ") + _7e5 + "\"";
                    var _7e7 = _7e6 ? "style=\"" + _7e6 + "\"" : "";
                    var _7e8 = _7e1.rowIdPrefix + "-" + (_7e0 ? 1 : 2) + "-" + _7e4;
                    _7e3.push("<tr id=\"" + _7e8 + "\" datagrid-row-index=\"" + _7e4 + "\" " + cls + " " + _7e7 + ">");
                    _7e3.push(this.renderRow.call(this, _7dd, _7e2, _7e0, _7e4, _7df.rows[j]));
                    _7e3.push("</tr>");
                    _7e4++;
                }
                _7e3.push("</tbody></table>");
                return _7e3.join("");
            }, bindEvents: function (_7e9) {
                var _7ea = $.data(_7e9, "datagrid");
                var dc = _7ea.dc;
                var body = dc.body1.add(dc.body2);
                var _7eb = ($.data(body[0], "events") || $._data(body[0], "events")).click[0].handler;
                body.unbind("click").bind("click", function (e) {
                    var tt = $(e.target);
                    var _7ec = tt.closest("span.datagrid-row-expander");
                    if (_7ec.length) {
                        var _7ed = _7ec.closest("div.datagrid-group").attr("group-index");
                        if (_7ec.hasClass("datagrid-row-collapse")) {
                            $(_7e9).datagrid("collapseGroup", _7ed);
                        } else {
                            $(_7e9).datagrid("expandGroup", _7ed);
                        }
                    } else {
                        _7eb(e);
                    }
                    e.stopPropagation();
                });
            }, onBeforeRender: function (_7ee, rows) {
                var _7ef = $.data(_7ee, "datagrid");
                var opts = _7ef.options;
                _7f0();
                var _7f1 = [];
                for (var i = 0; i < rows.length; i++) {
                    var row = rows[i];
                    var _7f2 = _7f3(row[opts.groupField]);
                    if (!_7f2) {
                        _7f2 = {value: row[opts.groupField], rows: [row]};
                        _7f1.push(_7f2);
                    } else {
                        _7f2.rows.push(row);
                    }
                }
                var _7f4 = 0;
                var _7f5 = [];
                for (var i = 0; i < _7f1.length; i++) {
                    var _7f2 = _7f1[i];
                    _7f2.startIndex = _7f4;
                    _7f4 += _7f2.rows.length;
                    _7f5 = _7f5.concat(_7f2.rows);
                }
                _7ef.data.rows = _7f5;
                this.groups = _7f1;
                var that = this;
                setTimeout(function () {
                    that.bindEvents(_7ee);
                }, 0);
                function _7f3(_7f6) {
                    for (var i = 0; i < _7f1.length; i++) {
                        var _7f7 = _7f1[i];
                        if (_7f7.value == _7f6) {
                            return _7f7;
                        }
                    }
                    return null;
                };
                function _7f0() {
                    if (!$("#datagrid-group-style").length) {
                        $("head").append("<style id=\"datagrid-group-style\">" + ".datagrid-group{height:25px;overflow:hidden;font-weight:bold;border-bottom:1px solid #ccc;}" + "</style>");
                    }
                };
            }
        });
        $.extend($.fn.datagrid.methods, {
            expandGroup: function (jq, _7f8) {
                return jq.each(function () {
                    var view = $.data(this, "datagrid").dc.view;
                    var _7f9 = view.find(_7f8 != undefined ? "div.datagrid-group[group-index=\"" + _7f8 + "\"]" : "div.datagrid-group");
                    var _7fa = _7f9.find("span.datagrid-row-expander");
                    if (_7fa.hasClass("datagrid-row-expand")) {
                        _7fa.removeClass("datagrid-row-expand").addClass("datagrid-row-collapse");
                        _7f9.next("table").show();
                    }
                    $(this).datagrid("fixRowHeight");
                });
            }, collapseGroup: function (jq, _7fb) {
                return jq.each(function () {
                    var view = $.data(this, "datagrid").dc.view;
                    var _7fc = view.find(_7fb != undefined ? "div.datagrid-group[group-index=\"" + _7fb + "\"]" : "div.datagrid-group");
                    var _7fd = _7fc.find("span.datagrid-row-expander");
                    if (_7fd.hasClass("datagrid-row-collapse")) {
                        _7fd.removeClass("datagrid-row-collapse").addClass("datagrid-row-expand");
                        _7fc.next("table").hide();
                    }
                    $(this).datagrid("fixRowHeight");
                });
            }
        });
        $.extend(_7d7, {
            refreshGroupTitle: function (_7fe, _7ff) {
                var _800 = $.data(_7fe, "datagrid");
                var opts = _800.options;
                var dc = _800.dc;
                var _801 = this.groups[_7ff];
                var span = dc.body2.children("div.datagrid-group[group-index=" + _7ff + "]").find("span.datagrid-group-title");
                span.html(opts.groupFormatter.call(_7fe, _801.value, _801.rows));
            }, insertRow: function (_802, _803, row) {
                var _804 = $.data(_802, "datagrid");
                var opts = _804.options;
                var dc = _804.dc;
                var _805 = null;
                var _806;
                for (var i = 0; i < this.groups.length; i++) {
                    if (this.groups[i].value == row[opts.groupField]) {
                        _805 = this.groups[i];
                        _806 = i;
                        break;
                    }
                }
                if (_805) {
                    if (_803 == undefined || _803 == null) {
                        _803 = _804.data.rows.length;
                    }
                    if (_803 < _805.startIndex) {
                        _803 = _805.startIndex;
                    } else {
                        if (_803 > _805.startIndex + _805.rows.length) {
                            _803 = _805.startIndex + _805.rows.length;
                        }
                    }
                    $.fn.datagrid.defaults.view.insertRow.call(this, _802, _803, row);
                    if (_803 >= _805.startIndex + _805.rows.length) {
                        _807(_803, true);
                        _807(_803, false);
                    }
                    _805.rows.splice(_803 - _805.startIndex, 0, row);
                } else {
                    _805 = {value: row[opts.groupField], rows: [row], startIndex: _804.data.rows.length};
                    _806 = this.groups.length;
                    dc.body1.append(this.renderGroup.call(this, _802, _806, _805, true));
                    dc.body2.append(this.renderGroup.call(this, _802, _806, _805, false));
                    this.groups.push(_805);
                    _804.data.rows.push(row);
                }
                this.refreshGroupTitle(_802, _806);
                function _807(_808, _809) {
                    var _80a = _809 ? 1 : 2;
                    var _80b = opts.finder.getTr(_802, _808 - 1, "body", _80a);
                    var tr = opts.finder.getTr(_802, _808, "body", _80a);
                    tr.insertAfter(_80b);
                };
            }, updateRow: function (_80c, _80d, row) {
                var opts = $.data(_80c, "datagrid").options;
                $.fn.datagrid.defaults.view.updateRow.call(this, _80c, _80d, row);
                var tb = opts.finder.getTr(_80c, _80d, "body", 2).closest("table.datagrid-btable");
                var _80e = parseInt(tb.prev().attr("group-index"));
                this.refreshGroupTitle(_80c, _80e);
            }, deleteRow: function (_80f, _810) {
                var _811 = $.data(_80f, "datagrid");
                var opts = _811.options;
                var dc = _811.dc;
                var body = dc.body1.add(dc.body2);
                var tb = opts.finder.getTr(_80f, _810, "body", 2).closest("table.datagrid-btable");
                var _812 = parseInt(tb.prev().attr("group-index"));
                $.fn.datagrid.defaults.view.deleteRow.call(this, _80f, _810);
                var _813 = this.groups[_812];
                if (_813.rows.length > 1) {
                    _813.rows.splice(_810 - _813.startIndex, 1);
                    this.refreshGroupTitle(_80f, _812);
                } else {
                    body.children("div.datagrid-group[group-index=" + _812 + "]").remove();
                    for (var i = _812 + 1; i < this.groups.length; i++) {
                        body.children("div.datagrid-group[group-index=" + i + "]").attr("group-index", i - 1);
                    }
                    this.groups.splice(_812, 1);
                }
                var _810 = 0;
                for (var i = 0; i < this.groups.length; i++) {
                    var _813 = this.groups[i];
                    _813.startIndex = _810;
                    _810 += _813.rows.length;
                }
            }
        });
        $.fn.propertygrid.defaults = $.extend({}, $.fn.datagrid.defaults, {
            singleSelect: true,
            remoteSort: false,
            fitColumns: true,
            loadMsg: "",
            frozenColumns: [[{field: "f", width: 16, resizable: false}]],
            columns: [[{field: "name", title: "Name", width: 100, sortable: true}, {
                field: "value",
                title: "Value",
                width: 100,
                resizable: false
            }]],
            showGroup: false,
            groupView: _7d7,
            groupField: "group",
            groupFormatter: function (_814, rows) {
                return _814;
            }
        });
    })(jQuery);
    (function ($) {
        function _815(_816) {
            var _817 = $.data(_816, "treegrid");
            var opts = _817.options;
            $(_816).datagrid($.extend({}, opts, {
                url: null, data: null, loader: function () {
                    return false;
                }, onBeforeLoad: function () {
                    return false;
                }, onLoadSuccess: function () {
                }, onResizeColumn: function (_818, _819) {
                    _826(_816);
                    opts.onResizeColumn.call(_816, _818, _819);
                }, onBeforeSortColumn: function (sort, _81a) {
                    if (opts.onBeforeSortColumn.call(_816, sort, _81a) == false) {
                        return false;
                    }
                }, onSortColumn: function (sort, _81b) {
                    opts.sortName = sort;
                    opts.sortOrder = _81b;
                    if (opts.remoteSort) {
                        _825(_816);
                    } else {
                        var data = $(_816).treegrid("getData");
                        _83c(_816, 0, data);
                    }
                    opts.onSortColumn.call(_816, sort, _81b);
                }, onClickCell: function (_81c, _81d) {
                    opts.onClickCell.call(_816, _81d, find(_816, _81c));
                }, onDblClickCell: function (_81e, _81f) {
                    opts.onDblClickCell.call(_816, _81f, find(_816, _81e));
                }, onRowContextMenu: function (e, _820) {
                    opts.onContextMenu.call(_816, e, find(_816, _820));
                }
            }));
            var _821 = $.data(_816, "datagrid").options;
            opts.columns = _821.columns;
            opts.frozenColumns = _821.frozenColumns;
            _817.dc = $.data(_816, "datagrid").dc;
            if (opts.pagination) {
                var _822 = $(_816).datagrid("getPager");
                _822.pagination({
                    pageNumber: opts.pageNumber,
                    pageSize: opts.pageSize,
                    pageList: opts.pageList,
                    onSelectPage: function (_823, _824) {
                        opts.pageNumber = _823;
                        opts.pageSize = _824;
                        _825(_816);
                    }
                });
                opts.pageSize = _822.pagination("options").pageSize;
            }
        };
        function _826(_827, _828) {
            var opts = $.data(_827, "datagrid").options;
            var dc = $.data(_827, "datagrid").dc;
            if (!dc.body1.is(":empty") && (!opts.nowrap || opts.autoRowHeight)) {
                if (_828 != undefined) {
                    var _829 = _82a(_827, _828);
                    for (var i = 0; i < _829.length; i++) {
                        _82b(_829[i][opts.idField]);
                    }
                }
            }
            $(_827).datagrid("fixRowHeight", _828);
            function _82b(_82c) {
                var tr1 = opts.finder.getTr(_827, _82c, "body", 1);
                var tr2 = opts.finder.getTr(_827, _82c, "body", 2);
                tr1.css("height", "");
                tr2.css("height", "");
                var _82d = Math.max(tr1.height(), tr2.height());
                tr1.css("height", _82d);
                tr2.css("height", _82d);
            };
        };
        function _82e(_82f) {
            var dc = $.data(_82f, "datagrid").dc;
            var opts = $.data(_82f, "treegrid").options;
            if (!opts.rownumbers) {
                return;
            }
            dc.body1.find("div.datagrid-cell-rownumber").each(function (i) {
                $(this).html(i + 1);
            });
        };
        function _830(_831) {
            return function (e) {
                $.fn.datagrid.defaults.rowEvents[_831 ? "mouseover" : "mouseout"](e);
                var tt = $(e.target);
                var fn = _831 ? "addClass" : "removeClass";
                if (tt.hasClass("tree-hit")) {
                    tt.hasClass("tree-expanded") ? tt[fn]("tree-expanded-hover") : tt[fn]("tree-collapsed-hover");
                }
            };
        };
        function _832(e) {
            var tt = $(e.target);
            if (tt.hasClass("tree-hit")) {
                var tr = tt.closest("tr.datagrid-row");
                var _833 = tr.closest("div.datagrid-view").children(".datagrid-f")[0];
                _834(_833, tr.attr("node-id"));
            } else {
                $.fn.datagrid.defaults.rowEvents.click(e);
            }
        };
        function _835(_836, _837) {
            var opts = $.data(_836, "treegrid").options;
            var tr1 = opts.finder.getTr(_836, _837, "body", 1);
            var tr2 = opts.finder.getTr(_836, _837, "body", 2);
            var _838 = $(_836).datagrid("getColumnFields", true).length + (opts.rownumbers ? 1 : 0);
            var _839 = $(_836).datagrid("getColumnFields", false).length;
            _83a(tr1, _838);
            _83a(tr2, _839);
            function _83a(tr, _83b) {
                $("<tr class=\"treegrid-tr-tree\">" + "<td style=\"border:0px\" colspan=\"" + _83b + "\">" + "<div></div>" + "</td>" + "</tr>").insertAfter(tr);
            };
        };
        function _83c(_83d, _83e, data, _83f) {
            var _840 = $.data(_83d, "treegrid");
            var opts = _840.options;
            var dc = _840.dc;
            data = opts.loadFilter.call(_83d, data, _83e);
            var node = find(_83d, _83e);
            if (node) {
                var _841 = opts.finder.getTr(_83d, _83e, "body", 1);
                var _842 = opts.finder.getTr(_83d, _83e, "body", 2);
                var cc1 = _841.next("tr.treegrid-tr-tree").children("td").children("div");
                var cc2 = _842.next("tr.treegrid-tr-tree").children("td").children("div");
                if (!_83f) {
                    node.children = [];
                }
            } else {
                var cc1 = dc.body1;
                var cc2 = dc.body2;
                if (!_83f) {
                    _840.data = [];
                }
            }
            if (!_83f) {
                cc1.empty();
                cc2.empty();
            }
            if (opts.view.onBeforeRender) {
                opts.view.onBeforeRender.call(opts.view, _83d, _83e, data);
            }
            opts.view.render.call(opts.view, _83d, cc1, true);
            opts.view.render.call(opts.view, _83d, cc2, false);
            if (opts.showFooter) {
                opts.view.renderFooter.call(opts.view, _83d, dc.footer1, true);
                opts.view.renderFooter.call(opts.view, _83d, dc.footer2, false);
            }
            if (opts.view.onAfterRender) {
                opts.view.onAfterRender.call(opts.view, _83d);
            }
            if (!_83e && opts.pagination) {
                var _843 = $.data(_83d, "treegrid").total;
                var _844 = $(_83d).datagrid("getPager");
                if (_844.pagination("options").total != _843) {
                    _844.pagination({total: _843});
                }
            }
            _826(_83d);
            _82e(_83d);
            $(_83d).treegrid("showLines");
            $(_83d).treegrid("setSelectionState");
            $(_83d).treegrid("autoSizeColumn");
            opts.onLoadSuccess.call(_83d, node, data);
        };
        function _825(_845, _846, _847, _848, _849) {
            var opts = $.data(_845, "treegrid").options;
            var body = $(_845).datagrid("getPanel").find("div.datagrid-body");
            if (_847) {
                opts.queryParams = _847;
            }
            var _84a = $.extend({}, opts.queryParams);
            if (opts.pagination) {
                $.extend(_84a, {page: opts.pageNumber, rows: opts.pageSize});
            }
            if (opts.sortName) {
                $.extend(_84a, {sort: opts.sortName, order: opts.sortOrder});
            }
            var row = find(_845, _846);
            if (opts.onBeforeLoad.call(_845, row, _84a) == false) {
                return;
            }
            var _84b = body.find("tr[node-id=\"" + _846 + "\"] span.tree-folder");
            _84b.addClass("tree-loading");
            $(_845).treegrid("loading");
            var _84c = opts.loader.call(_845, _84a, function (data) {
                _84b.removeClass("tree-loading");
                $(_845).treegrid("loaded");
                _83c(_845, _846, data, _848);
                if (_849) {
                    _849();
                }
            }, function () {
                _84b.removeClass("tree-loading");
                $(_845).treegrid("loaded");
                opts.onLoadError.apply(_845, arguments);
                if (_849) {
                    _849();
                }
            });
            if (_84c == false) {
                _84b.removeClass("tree-loading");
                $(_845).treegrid("loaded");
            }
        };
        function _84d(_84e) {
            var rows = _84f(_84e);
            if (rows.length) {
                return rows[0];
            } else {
                return null;
            }
        };
        function _84f(_850) {
            return $.data(_850, "treegrid").data;
        };
        function _851(_852, _853) {
            var row = find(_852, _853);
            if (row._parentId) {
                return find(_852, row._parentId);
            } else {
                return null;
            }
        };
        function _82a(_854, _855) {
            var opts = $.data(_854, "treegrid").options;
            var body = $(_854).datagrid("getPanel").find("div.datagrid-view2 div.datagrid-body");
            var _856 = [];
            if (_855) {
                _857(_855);
            } else {
                var _858 = _84f(_854);
                for (var i = 0; i < _858.length; i++) {
                    _856.push(_858[i]);
                    _857(_858[i][opts.idField]);
                }
            }
            function _857(_859) {
                var _85a = find(_854, _859);
                if (_85a && _85a.children) {
                    for (var i = 0, len = _85a.children.length; i < len; i++) {
                        var _85b = _85a.children[i];
                        _856.push(_85b);
                        _857(_85b[opts.idField]);
                    }
                }
            };
            return _856;
        };
        function _85c(_85d, _85e) {
            if (!_85e) {
                return 0;
            }
            var opts = $.data(_85d, "treegrid").options;
            var view = $(_85d).datagrid("getPanel").children("div.datagrid-view");
            var node = view.find("div.datagrid-body tr[node-id=\"" + _85e + "\"]").children("td[field=\"" + opts.treeField + "\"]");
            return node.find("span.tree-indent,span.tree-hit").length;
        };
        function find(_85f, _860) {
            var opts = $.data(_85f, "treegrid").options;
            var data = $.data(_85f, "treegrid").data;
            var cc = [data];
            while (cc.length) {
                var c = cc.shift();
                for (var i = 0; i < c.length; i++) {
                    var node = c[i];
                    if (node[opts.idField] == _860) {
                        return node;
                    } else {
                        if (node["children"]) {
                            cc.push(node["children"]);
                        }
                    }
                }
            }
            return null;
        };
        function _861(_862, _863) {
            var opts = $.data(_862, "treegrid").options;
            var row = find(_862, _863);
            var tr = opts.finder.getTr(_862, _863);
            var hit = tr.find("span.tree-hit");
            if (hit.length == 0) {
                return;
            }
            if (hit.hasClass("tree-collapsed")) {
                return;
            }
            if (opts.onBeforeCollapse.call(_862, row) == false) {
                return;
            }
            hit.removeClass("tree-expanded tree-expanded-hover").addClass("tree-collapsed");
            hit.next().removeClass("tree-folder-open");
            row.state = "closed";
            tr = tr.next("tr.treegrid-tr-tree");
            var cc = tr.children("td").children("div");
            if (opts.animate) {
                cc.slideUp("normal", function () {
                    $(_862).treegrid("autoSizeColumn");
                    _826(_862, _863);
                    opts.onCollapse.call(_862, row);
                });
            } else {
                cc.hide();
                $(_862).treegrid("autoSizeColumn");
                _826(_862, _863);
                opts.onCollapse.call(_862, row);
            }
        };
        function _864(_865, _866) {
            var opts = $.data(_865, "treegrid").options;
            var tr = opts.finder.getTr(_865, _866);
            var hit = tr.find("span.tree-hit");
            var row = find(_865, _866);
            if (hit.length == 0) {
                return;
            }
            if (hit.hasClass("tree-expanded")) {
                return;
            }
            if (opts.onBeforeExpand.call(_865, row) == false) {
                return;
            }
            hit.removeClass("tree-collapsed tree-collapsed-hover").addClass("tree-expanded");
            hit.next().addClass("tree-folder-open");
            var _867 = tr.next("tr.treegrid-tr-tree");
            if (_867.length) {
                var cc = _867.children("td").children("div");
                _868(cc);
            } else {
                _835(_865, row[opts.idField]);
                var _867 = tr.next("tr.treegrid-tr-tree");
                var cc = _867.children("td").children("div");
                cc.hide();
                var _869 = $.extend({}, opts.queryParams || {});
                _869.id = row[opts.idField];
                _825(_865, row[opts.idField], _869, true, function () {
                    if (cc.is(":empty")) {
                        _867.remove();
                    } else {
                        _868(cc);
                    }
                });
            }
            function _868(cc) {
                row.state = "open";
                if (opts.animate) {
                    cc.slideDown("normal", function () {
                        $(_865).treegrid("autoSizeColumn");
                        _826(_865, _866);
                        opts.onExpand.call(_865, row);
                    });
                } else {
                    cc.show();
                    $(_865).treegrid("autoSizeColumn");
                    _826(_865, _866);
                    opts.onExpand.call(_865, row);
                }
            };
        };
        function _834(_86a, _86b) {
            var opts = $.data(_86a, "treegrid").options;
            var tr = opts.finder.getTr(_86a, _86b);
            var hit = tr.find("span.tree-hit");
            if (hit.hasClass("tree-expanded")) {
                _861(_86a, _86b);
            } else {
                _864(_86a, _86b);
            }
        };
        function _86c(_86d, _86e) {
            var opts = $.data(_86d, "treegrid").options;
            var _86f = _82a(_86d, _86e);
            if (_86e) {
                _86f.unshift(find(_86d, _86e));
            }
            for (var i = 0; i < _86f.length; i++) {
                _861(_86d, _86f[i][opts.idField]);
            }
        };
        function _870(_871, _872) {
            var opts = $.data(_871, "treegrid").options;
            var _873 = _82a(_871, _872);
            if (_872) {
                _873.unshift(find(_871, _872));
            }
            for (var i = 0; i < _873.length; i++) {
                _864(_871, _873[i][opts.idField]);
            }
        };
        function _874(_875, _876) {
            var opts = $.data(_875, "treegrid").options;
            var ids = [];
            var p = _851(_875, _876);
            while (p) {
                var id = p[opts.idField];
                ids.unshift(id);
                p = _851(_875, id);
            }
            for (var i = 0; i < ids.length; i++) {
                _864(_875, ids[i]);
            }
        };
        function _877(_878, _879) {
            var opts = $.data(_878, "treegrid").options;
            if (_879.parent) {
                var tr = opts.finder.getTr(_878, _879.parent);
                if (tr.next("tr.treegrid-tr-tree").length == 0) {
                    _835(_878, _879.parent);
                }
                var cell = tr.children("td[field=\"" + opts.treeField + "\"]").children("div.datagrid-cell");
                var _87a = cell.children("span.tree-icon");
                if (_87a.hasClass("tree-file")) {
                    _87a.removeClass("tree-file").addClass("tree-folder tree-folder-open");
                    var hit = $("<span class=\"tree-hit tree-expanded\"></span>").insertBefore(_87a);
                    if (hit.prev().length) {
                        hit.prev().remove();
                    }
                }
            }
            _83c(_878, _879.parent, _879.data, true);
        };
        function _87b(_87c, _87d) {
            var ref = _87d.before || _87d.after;
            var opts = $.data(_87c, "treegrid").options;
            var _87e = _851(_87c, ref);
            _877(_87c, {parent: (_87e ? _87e[opts.idField] : null), data: [_87d.data]});
            var _87f = _87e ? _87e.children : $(_87c).treegrid("getRoots");
            for (var i = 0; i < _87f.length; i++) {
                if (_87f[i][opts.idField] == ref) {
                    var _880 = _87f[_87f.length - 1];
                    _87f.splice(_87d.before ? i : (i + 1), 0, _880);
                    _87f.splice(_87f.length - 1, 1);
                    break;
                }
            }
            _881(true);
            _881(false);
            _82e(_87c);
            $(_87c).treegrid("showLines");
            function _881(_882) {
                var _883 = _882 ? 1 : 2;
                var tr = opts.finder.getTr(_87c, _87d.data[opts.idField], "body", _883);
                var _884 = tr.closest("table.datagrid-btable");
                tr = tr.parent().children();
                var dest = opts.finder.getTr(_87c, ref, "body", _883);
                if (_87d.before) {
                    tr.insertBefore(dest);
                } else {
                    var sub = dest.next("tr.treegrid-tr-tree");
                    tr.insertAfter(sub.length ? sub : dest);
                }
                _884.remove();
            };
        };
        function _885(_886, _887) {
            var _888 = $.data(_886, "treegrid");
            $(_886).datagrid("deleteRow", _887);
            _82e(_886);
            _888.total -= 1;
            $(_886).datagrid("getPager").pagination("refresh", {total: _888.total});
            $(_886).treegrid("showLines");
        };
        function _889(_88a) {
            var t = $(_88a);
            var opts = t.treegrid("options");
            if (opts.lines) {
                t.treegrid("getPanel").addClass("tree-lines");
            } else {
                t.treegrid("getPanel").removeClass("tree-lines");
                return;
            }
            t.treegrid("getPanel").find("span.tree-indent").removeClass("tree-line tree-join tree-joinbottom");
            t.treegrid("getPanel").find("div.datagrid-cell").removeClass("tree-node-last tree-root-first tree-root-one");
            var _88b = t.treegrid("getRoots");
            if (_88b.length > 1) {
                _88c(_88b[0]).addClass("tree-root-first");
            } else {
                if (_88b.length == 1) {
                    _88c(_88b[0]).addClass("tree-root-one");
                }
            }
            _88d(_88b);
            _88e(_88b);
            function _88d(_88f) {
                $.map(_88f, function (node) {
                    if (node.children && node.children.length) {
                        _88d(node.children);
                    } else {
                        var cell = _88c(node);
                        cell.find(".tree-icon").prev().addClass("tree-join");
                    }
                });
                if (_88f.length) {
                    var cell = _88c(_88f[_88f.length - 1]);
                    cell.addClass("tree-node-last");
                    cell.find(".tree-join").removeClass("tree-join").addClass("tree-joinbottom");
                }
            };
            function _88e(_890) {
                $.map(_890, function (node) {
                    if (node.children && node.children.length) {
                        _88e(node.children);
                    }
                });
                for (var i = 0; i < _890.length - 1; i++) {
                    var node = _890[i];
                    var _891 = t.treegrid("getLevel", node[opts.idField]);
                    var tr = opts.finder.getTr(_88a, node[opts.idField]);
                    var cc = tr.next().find("tr.datagrid-row td[field=\"" + opts.treeField + "\"] div.datagrid-cell");
                    cc.find("span:eq(" + (_891 - 1) + ")").addClass("tree-line");
                }
            };
            function _88c(node) {
                var tr = opts.finder.getTr(_88a, node[opts.idField]);
                var cell = tr.find("td[field=\"" + opts.treeField + "\"] div.datagrid-cell");
                return cell;
            };
        };
        $.fn.treegrid = function (_892, _893) {
            if (typeof _892 == "string") {
                var _894 = $.fn.treegrid.methods[_892];
                if (_894) {
                    return _894(this, _893);
                } else {
                    return this.datagrid(_892, _893);
                }
            }
            _892 = _892 || {};
            return this.each(function () {
                var _895 = $.data(this, "treegrid");
                if (_895) {
                    $.extend(_895.options, _892);
                } else {
                    _895 = $.data(this, "treegrid", {
                        options: $.extend({}, $.fn.treegrid.defaults, $.fn.treegrid.parseOptions(this), _892),
                        data: []
                    });
                }
                _815(this);
                if (_895.options.data) {
                    $(this).treegrid("loadData", _895.options.data);
                }
                _825(this);
            });
        };
        $.fn.treegrid.methods = {
            options: function (jq) {
                return $.data(jq[0], "treegrid").options;
            }, resize: function (jq, _896) {
                return jq.each(function () {
                    $(this).datagrid("resize", _896);
                });
            }, fixRowHeight: function (jq, _897) {
                return jq.each(function () {
                    _826(this, _897);
                });
            }, loadData: function (jq, data) {
                return jq.each(function () {
                    _83c(this, data.parent, data);
                });
            }, load: function (jq, _898) {
                return jq.each(function () {
                    $(this).treegrid("options").pageNumber = 1;
                    $(this).treegrid("getPager").pagination({pageNumber: 1});
                    $(this).treegrid("reload", _898);
                });
            }, reload: function (jq, id) {
                return jq.each(function () {
                    var opts = $(this).treegrid("options");
                    var _899 = {};
                    if (typeof id == "object") {
                        _899 = id;
                    } else {
                        _899 = $.extend({}, opts.queryParams);
                        _899.id = id;
                    }
                    if (_899.id) {
                        var node = $(this).treegrid("find", _899.id);
                        if (node.children) {
                            node.children.splice(0, node.children.length);
                        }
                        opts.queryParams = _899;
                        var tr = opts.finder.getTr(this, _899.id);
                        tr.next("tr.treegrid-tr-tree").remove();
                        tr.find("span.tree-hit").removeClass("tree-expanded tree-expanded-hover").addClass("tree-collapsed");
                        _864(this, _899.id);
                    } else {
                        _825(this, null, _899);
                    }
                });
            }, reloadFooter: function (jq, _89a) {
                return jq.each(function () {
                    var opts = $.data(this, "treegrid").options;
                    var dc = $.data(this, "datagrid").dc;
                    if (_89a) {
                        $.data(this, "treegrid").footer = _89a;
                    }
                    if (opts.showFooter) {
                        opts.view.renderFooter.call(opts.view, this, dc.footer1, true);
                        opts.view.renderFooter.call(opts.view, this, dc.footer2, false);
                        if (opts.view.onAfterRender) {
                            opts.view.onAfterRender.call(opts.view, this);
                        }
                        $(this).treegrid("fixRowHeight");
                    }
                });
            }, getData: function (jq) {
                return $.data(jq[0], "treegrid").data;
            }, getFooterRows: function (jq) {
                return $.data(jq[0], "treegrid").footer;
            }, getRoot: function (jq) {
                return _84d(jq[0]);
            }, getRoots: function (jq) {
                return _84f(jq[0]);
            }, getParent: function (jq, id) {
                return _851(jq[0], id);
            }, getChildren: function (jq, id) {
                return _82a(jq[0], id);
            }, getLevel: function (jq, id) {
                return _85c(jq[0], id);
            }, find: function (jq, id) {
                return find(jq[0], id);
            }, isLeaf: function (jq, id) {
                var opts = $.data(jq[0], "treegrid").options;
                var tr = opts.finder.getTr(jq[0], id);
                var hit = tr.find("span.tree-hit");
                return hit.length == 0;
            }, select: function (jq, id) {
                return jq.each(function () {
                    $(this).datagrid("selectRow", id);
                });
            }, unselect: function (jq, id) {
                return jq.each(function () {
                    $(this).datagrid("unselectRow", id);
                });
            }, collapse: function (jq, id) {
                return jq.each(function () {
                    _861(this, id);
                });
            }, expand: function (jq, id) {
                return jq.each(function () {
                    _864(this, id);
                });
            }, toggle: function (jq, id) {
                return jq.each(function () {
                    _834(this, id);
                });
            }, collapseAll: function (jq, id) {
                return jq.each(function () {
                    _86c(this, id);
                });
            }, expandAll: function (jq, id) {
                return jq.each(function () {
                    _870(this, id);
                });
            }, expandTo: function (jq, id) {
                return jq.each(function () {
                    _874(this, id);
                });
            }, append: function (jq, _89b) {
                return jq.each(function () {
                    _877(this, _89b);
                });
            }, insert: function (jq, _89c) {
                return jq.each(function () {
                    _87b(this, _89c);
                });
            }, remove: function (jq, id) {
                return jq.each(function () {
                    _885(this, id);
                });
            }, pop: function (jq, id) {
                var row = jq.treegrid("find", id);
                jq.treegrid("remove", id);
                return row;
            }, refresh: function (jq, id) {
                return jq.each(function () {
                    var opts = $.data(this, "treegrid").options;
                    opts.view.refreshRow.call(opts.view, this, id);
                });
            }, update: function (jq, _89d) {
                return jq.each(function () {
                    var opts = $.data(this, "treegrid").options;
                    opts.view.updateRow.call(opts.view, this, _89d.id, _89d.row);
                });
            }, beginEdit: function (jq, id) {
                return jq.each(function () {
                    $(this).datagrid("beginEdit", id);
                    $(this).treegrid("fixRowHeight", id);
                });
            }, endEdit: function (jq, id) {
                return jq.each(function () {
                    $(this).datagrid("endEdit", id);
                });
            }, cancelEdit: function (jq, id) {
                return jq.each(function () {
                    $(this).datagrid("cancelEdit", id);
                });
            }, showLines: function (jq) {
                return jq.each(function () {
                    _889(this);
                });
            }
        };
        $.fn.treegrid.parseOptions = function (_89e) {
            return $.extend({}, $.fn.datagrid.parseOptions(_89e), $.parser.parseOptions(_89e, ["treeField", {animate: "boolean"}]));
        };
        var _89f = $.extend({}, $.fn.datagrid.defaults.view, {
            render: function (_8a0, _8a1, _8a2) {
                var opts = $.data(_8a0, "treegrid").options;
                var _8a3 = $(_8a0).datagrid("getColumnFields", _8a2);
                var _8a4 = $.data(_8a0, "datagrid").rowIdPrefix;
                if (_8a2) {
                    if (!(opts.rownumbers || (opts.frozenColumns && opts.frozenColumns.length))) {
                        return;
                    }
                }
                var view = this;
                if (this.treeNodes && this.treeNodes.length) {
                    var _8a5 = _8a6(_8a2, this.treeLevel, this.treeNodes);
                    $(_8a1).append(_8a5.join(""));
                }
                function _8a6(_8a7, _8a8, _8a9) {
                    var _8aa = $(_8a0).treegrid("getParent", _8a9[0][opts.idField]);
                    var _8ab = (_8aa ? _8aa.children.length : $(_8a0).treegrid("getRoots").length) - _8a9.length;
                    var _8ac = ["<table class=\"datagrid-btable\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\"><tbody>"];
                    for (var i = 0; i < _8a9.length; i++) {
                        var row = _8a9[i];
                        if (row.state != "open" && row.state != "closed") {
                            row.state = "open";
                        }
                        var css = opts.rowStyler ? opts.rowStyler.call(_8a0, row) : "";
                        var _8ad = "";
                        var _8ae = "";
                        if (typeof css == "string") {
                            _8ae = css;
                        } else {
                            if (css) {
                                _8ad = css["class"] || "";
                                _8ae = css["style"] || "";
                            }
                        }
                        var cls = "class=\"datagrid-row " + (_8ab++ % 2 && opts.striped ? "datagrid-row-alt " : " ") + _8ad + "\"";
                        var _8af = _8ae ? "style=\"" + _8ae + "\"" : "";
                        var _8b0 = _8a4 + "-" + (_8a7 ? 1 : 2) + "-" + row[opts.idField];
                        _8ac.push("<tr id=\"" + _8b0 + "\" node-id=\"" + row[opts.idField] + "\" " + cls + " " + _8af + ">");
                        _8ac = _8ac.concat(view.renderRow.call(view, _8a0, _8a3, _8a7, _8a8, row));
                        _8ac.push("</tr>");
                        if (row.children && row.children.length) {
                            var tt = _8a6(_8a7, _8a8 + 1, row.children);
                            var v = row.state == "closed" ? "none" : "block";
                            _8ac.push("<tr class=\"treegrid-tr-tree\"><td style=\"border:0px\" colspan=" + (_8a3.length + (opts.rownumbers ? 1 : 0)) + "><div style=\"display:" + v + "\">");
                            _8ac = _8ac.concat(tt);
                            _8ac.push("</div></td></tr>");
                        }
                    }
                    _8ac.push("</tbody></table>");
                    return _8ac;
                };
            }, renderFooter: function (_8b1, _8b2, _8b3) {
                var opts = $.data(_8b1, "treegrid").options;
                var rows = $.data(_8b1, "treegrid").footer || [];
                var _8b4 = $(_8b1).datagrid("getColumnFields", _8b3);
                var _8b5 = ["<table class=\"datagrid-ftable\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\"><tbody>"];
                for (var i = 0; i < rows.length; i++) {
                    var row = rows[i];
                    row[opts.idField] = row[opts.idField] || ("foot-row-id" + i);
                    _8b5.push("<tr class=\"datagrid-row\" node-id=\"" + row[opts.idField] + "\">");
                    _8b5.push(this.renderRow.call(this, _8b1, _8b4, _8b3, 0, row));
                    _8b5.push("</tr>");
                }
                _8b5.push("</tbody></table>");
                $(_8b2).html(_8b5.join(""));
            }, renderRow: function (_8b6, _8b7, _8b8, _8b9, row) {
                var opts = $.data(_8b6, "treegrid").options;
                var cc = [];
                if (_8b8 && opts.rownumbers) {
                    cc.push("<td class=\"datagrid-td-rownumber\"><div class=\"datagrid-cell-rownumber\">0</div></td>");
                }
                for (var i = 0; i < _8b7.length; i++) {
                    var _8ba = _8b7[i];
                    var col = $(_8b6).datagrid("getColumnOption", _8ba);
                    if (col) {
                        var css = col.styler ? (col.styler(row[_8ba], row) || "") : "";
                        var _8bb = "";
                        var _8bc = "";
                        if (typeof css == "string") {
                            _8bc = css;
                        } else {
                            if (cc) {
                                _8bb = css["class"] || "";
                                _8bc = css["style"] || "";
                            }
                        }
                        var cls = _8bb ? "class=\"" + _8bb + "\"" : "";
                        var _8bd = col.hidden ? "style=\"display:none;" + _8bc + "\"" : (_8bc ? "style=\"" + _8bc + "\"" : "");
                        cc.push("<td field=\"" + _8ba + "\" " + cls + " " + _8bd + ">");
                        var _8bd = "";
                        if (!col.checkbox) {
                            if (col.align) {
                                _8bd += "text-align:" + col.align + ";";
                            }
                            if (!opts.nowrap) {
                                _8bd += "white-space:normal;height:auto;";
                            } else {
                                if (opts.autoRowHeight) {
                                    _8bd += "height:auto;";
                                }
                            }
                        }
                        cc.push("<div style=\"" + _8bd + "\" ");
                        if (col.checkbox) {
                            cc.push("class=\"datagrid-cell-check ");
                        } else {
                            cc.push("class=\"datagrid-cell " + col.cellClass);
                        }
                        cc.push("\">");
                        if (col.checkbox) {
                            if (row.checked) {
                                cc.push("<input type=\"checkbox\" checked=\"checked\"");
                            } else {
                                cc.push("<input type=\"checkbox\"");
                            }
                            cc.push(" name=\"" + _8ba + "\" value=\"" + (row[_8ba] != undefined ? row[_8ba] : "") + "\">");
                        } else {
                            var val = null;
                            if (col.formatter) {
                                val = col.formatter(row[_8ba], row);
                            } else {
                                val = row[_8ba];
                            }
                            if (_8ba == opts.treeField) {
                                for (var j = 0; j < _8b9; j++) {
                                    cc.push("<span class=\"tree-indent\"></span>");
                                }
                                if (row.state == "closed") {
                                    cc.push("<span class=\"tree-hit tree-collapsed\"></span>");
                                    cc.push("<span class=\"tree-icon tree-folder " + (row.iconCls ? row.iconCls : "") + "\"></span>");
                                } else {
                                    if (row.children && row.children.length) {
                                        cc.push("<span class=\"tree-hit tree-expanded\"></span>");
                                        cc.push("<span class=\"tree-icon tree-folder tree-folder-open " + (row.iconCls ? row.iconCls : "") + "\"></span>");
                                    } else {
                                        cc.push("<span class=\"tree-indent\"></span>");
                                        cc.push("<span class=\"tree-icon tree-file " + (row.iconCls ? row.iconCls : "") + "\"></span>");
                                    }
                                }
                                cc.push("<span class=\"tree-title\">" + val + "</span>");
                            } else {
                                cc.push(val);
                            }
                        }
                        cc.push("</div>");
                        cc.push("</td>");
                    }
                }
                return cc.join("");
            }, refreshRow: function (_8be, id) {
                this.updateRow.call(this, _8be, id, {});
            }, updateRow: function (_8bf, id, row) {
                var opts = $.data(_8bf, "treegrid").options;
                var _8c0 = $(_8bf).treegrid("find", id);
                $.extend(_8c0, row);
                var _8c1 = $(_8bf).treegrid("getLevel", id) - 1;
                var _8c2 = opts.rowStyler ? opts.rowStyler.call(_8bf, _8c0) : "";
                var _8c3 = $.data(_8bf, "datagrid").rowIdPrefix;
                var _8c4 = _8c0[opts.idField];

                function _8c5(_8c6) {
                    var _8c7 = $(_8bf).treegrid("getColumnFields", _8c6);
                    var tr = opts.finder.getTr(_8bf, id, "body", (_8c6 ? 1 : 2));
                    var _8c8 = tr.find("div.datagrid-cell-rownumber").html();
                    var _8c9 = tr.find("div.datagrid-cell-check input[type=checkbox]").is(":checked");
                    tr.html(this.renderRow(_8bf, _8c7, _8c6, _8c1, _8c0));
                    tr.attr("style", _8c2 || "");
                    tr.find("div.datagrid-cell-rownumber").html(_8c8);
                    if (_8c9) {
                        tr.find("div.datagrid-cell-check input[type=checkbox]")._propAttr("checked", true);
                    }
                    if (_8c4 != id) {
                        tr.attr("id", _8c3 + "-" + (_8c6 ? 1 : 2) + "-" + _8c4);
                        tr.attr("node-id", _8c4);
                    }
                };
                _8c5.call(this, true);
                _8c5.call(this, false);
                $(_8bf).treegrid("fixRowHeight", id);
            }, deleteRow: function (_8ca, id) {
                var opts = $.data(_8ca, "treegrid").options;
                var tr = opts.finder.getTr(_8ca, id);
                tr.next("tr.treegrid-tr-tree").remove();
                tr.remove();
                var _8cb = del(id);
                if (_8cb) {
                    if (_8cb.children.length == 0) {
                        tr = opts.finder.getTr(_8ca, _8cb[opts.idField]);
                        tr.next("tr.treegrid-tr-tree").remove();
                        var cell = tr.children("td[field=\"" + opts.treeField + "\"]").children("div.datagrid-cell");
                        cell.find(".tree-icon").removeClass("tree-folder").addClass("tree-file");
                        cell.find(".tree-hit").remove();
                        $("<span class=\"tree-indent\"></span>").prependTo(cell);
                    }
                }
                function del(id) {
                    var cc;
                    var _8cc = $(_8ca).treegrid("getParent", id);
                    if (_8cc) {
                        cc = _8cc.children;
                    } else {
                        cc = $(_8ca).treegrid("getData");
                    }
                    for (var i = 0; i < cc.length; i++) {
                        if (cc[i][opts.idField] == id) {
                            cc.splice(i, 1);
                            break;
                        }
                    }
                    return _8cc;
                };
            }, onBeforeRender: function (_8cd, _8ce, data) {
                if ($.isArray(_8ce)) {
                    data = {total: _8ce.length, rows: _8ce};
                    _8ce = null;
                }
                if (!data) {
                    return false;
                }
                var _8cf = $.data(_8cd, "treegrid");
                var opts = _8cf.options;
                if (data.length == undefined) {
                    if (data.footer) {
                        _8cf.footer = data.footer;
                    }
                    if (data.total) {
                        _8cf.total = data.total;
                    }
                    data = this.transfer(_8cd, _8ce, data.rows);
                } else {
                    function _8d0(_8d1, _8d2) {
                        for (var i = 0; i < _8d1.length; i++) {
                            var row = _8d1[i];
                            row._parentId = _8d2;
                            if (row.children && row.children.length) {
                                _8d0(row.children, row[opts.idField]);
                            }
                        }
                    };
                    _8d0(data, _8ce);
                }
                var node = find(_8cd, _8ce);
                if (node) {
                    if (node.children) {
                        node.children = node.children.concat(data);
                    } else {
                        node.children = data;
                    }
                } else {
                    _8cf.data = _8cf.data.concat(data);
                }
                this.sort(_8cd, data);
                this.treeNodes = data;
                this.treeLevel = $(_8cd).treegrid("getLevel", _8ce);
            }, sort: function (_8d3, data) {
                var opts = $.data(_8d3, "treegrid").options;
                if (!opts.remoteSort && opts.sortName) {
                    var _8d4 = opts.sortName.split(",");
                    var _8d5 = opts.sortOrder.split(",");
                    _8d6(data);
                }
                function _8d6(rows) {
                    rows.sort(function (r1, r2) {
                        var r = 0;
                        for (var i = 0; i < _8d4.length; i++) {
                            var sn = _8d4[i];
                            var so = _8d5[i];
                            var col = $(_8d3).treegrid("getColumnOption", sn);
                            var _8d7 = col.sorter || function (a, b) {
                                    return a == b ? 0 : (a > b ? 1 : -1);
                                };
                            r = _8d7(r1[sn], r2[sn]) * (so == "asc" ? 1 : -1);
                            if (r != 0) {
                                return r;
                            }
                        }
                        return r;
                    });
                    for (var i = 0; i < rows.length; i++) {
                        var _8d8 = rows[i].children;
                        if (_8d8 && _8d8.length) {
                            _8d6(_8d8);
                        }
                    }
                };
            }, transfer: function (_8d9, _8da, data) {
                var opts = $.data(_8d9, "treegrid").options;
                var rows = [];
                for (var i = 0; i < data.length; i++) {
                    rows.push(data[i]);
                }
                var _8db = [];
                for (var i = 0; i < rows.length; i++) {
                    var row = rows[i];
                    if (!_8da) {
                        if (!row._parentId) {
                            _8db.push(row);
                            rows.splice(i, 1);
                            i--;
                        }
                    } else {
                        if (row._parentId == _8da) {
                            _8db.push(row);
                            rows.splice(i, 1);
                            i--;
                        }
                    }
                }
                var toDo = [];
                for (var i = 0; i < _8db.length; i++) {
                    toDo.push(_8db[i]);
                }
                while (toDo.length) {
                    var node = toDo.shift();
                    for (var i = 0; i < rows.length; i++) {
                        var row = rows[i];
                        if (row._parentId == node[opts.idField]) {
                            if (node.children) {
                                node.children.push(row);
                            } else {
                                node.children = [row];
                            }
                            toDo.push(row);
                            rows.splice(i, 1);
                            i--;
                        }
                    }
                }
                return _8db;
            }
        });
        $.fn.treegrid.defaults = $.extend({}, $.fn.datagrid.defaults, {
            treeField: null,
            lines: false,
            animate: false,
            singleSelect: true,
            view: _89f,
            rowEvents: $.extend({}, $.fn.datagrid.defaults.rowEvents, {
                mouseover: _830(true),
                mouseout: _830(false),
                click: _832
            }),
            loader: function (_8dc, _8dd, _8de) {
                var opts = $(this).treegrid("options");
                if (!opts.url) {
                    return false;
                }
                $.ajax({
                    type: opts.method, url: opts.url, data: _8dc, dataType: "json", success: function (data) {
                        _8dd(data);
                    }, error: function () {
                        _8de.apply(this, arguments);
                    }
                });
            },
            loadFilter: function (data, _8df) {
                return data;
            },
            finder: {
                getTr: function (_8e0, id, type, _8e1) {
                    type = type || "body";
                    _8e1 = _8e1 || 0;
                    var dc = $.data(_8e0, "datagrid").dc;
                    if (_8e1 == 0) {
                        var opts = $.data(_8e0, "treegrid").options;
                        var tr1 = opts.finder.getTr(_8e0, id, type, 1);
                        var tr2 = opts.finder.getTr(_8e0, id, type, 2);
                        return tr1.add(tr2);
                    } else {
                        if (type == "body") {
                            var tr = $("#" + $.data(_8e0, "datagrid").rowIdPrefix + "-" + _8e1 + "-" + id);
                            if (!tr.length) {
                                tr = (_8e1 == 1 ? dc.body1 : dc.body2).find("tr[node-id=\"" + id + "\"]");
                            }
                            return tr;
                        } else {
                            if (type == "footer") {
                                return (_8e1 == 1 ? dc.footer1 : dc.footer2).find("tr[node-id=\"" + id + "\"]");
                            } else {
                                if (type == "selected") {
                                    return (_8e1 == 1 ? dc.body1 : dc.body2).find("tr.datagrid-row-selected");
                                } else {
                                    if (type == "highlight") {
                                        return (_8e1 == 1 ? dc.body1 : dc.body2).find("tr.datagrid-row-over");
                                    } else {
                                        if (type == "checked") {
                                            return (_8e1 == 1 ? dc.body1 : dc.body2).find("tr.datagrid-row-checked");
                                        } else {
                                            if (type == "last") {
                                                return (_8e1 == 1 ? dc.body1 : dc.body2).find("tr:last[node-id]");
                                            } else {
                                                if (type == "allbody") {
                                                    return (_8e1 == 1 ? dc.body1 : dc.body2).find("tr[node-id]");
                                                } else {
                                                    if (type == "allfooter") {
                                                        return (_8e1 == 1 ? dc.footer1 : dc.footer2).find("tr[node-id]");
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }, getRow: function (_8e2, p) {
                    var id = (typeof p == "object") ? p.attr("node-id") : p;
                    return $(_8e2).treegrid("find", id);
                }, getRows: function (_8e3) {
                    return $(_8e3).treegrid("getChildren");
                }
            },
            onBeforeLoad: function (row, _8e4) {
            },
            onLoadSuccess: function (row, data) {
            },
            onLoadError: function () {
            },
            onBeforeCollapse: function (row) {
            },
            onCollapse: function (row) {
            },
            onBeforeExpand: function (row) {
            },
            onExpand: function (row) {
            },
            onClickRow: function (row) {
            },
            onDblClickRow: function (row) {
            },
            onClickCell: function (_8e5, row) {
            },
            onDblClickCell: function (_8e6, row) {
            },
            onContextMenu: function (e, row) {
            },
            onBeforeEdit: function (row) {
            },
            onAfterEdit: function (row, _8e7) {
            },
            onCancelEdit: function (row) {
            }
        });
    })(jQuery);
    (function ($) {
        function _8e8(_8e9) {
            var opts = $.data(_8e9, "datalist").options;
            $(_8e9).datagrid($.extend({}, opts, {
                cls: "datalist" + (opts.lines ? " datalist-lines" : ""),
                frozenColumns: (opts.frozenColumns && opts.frozenColumns.length) ? opts.frozenColumns : (opts.checkbox ? [[{
                    field: "_ck",
                    checkbox: true
                }]] : undefined),
                columns: (opts.columns && opts.columns.length) ? opts.columns : [[{
                    field: opts.textField, width: "100%", formatter: function (_8ea, row, _8eb) {
                        return opts.textFormatter ? opts.textFormatter(_8ea, row, _8eb) : _8ea;
                    }
                }]]
            }));
        };
        var _8ec = $.extend({}, $.fn.datagrid.defaults.view, {
            render: function (_8ed, _8ee, _8ef) {
                var _8f0 = $.data(_8ed, "datagrid");
                var opts = _8f0.options;
                if (opts.groupField) {
                    var g = this.groupRows(_8ed, _8f0.data.rows);
                    this.groups = g.groups;
                    _8f0.data.rows = g.rows;
                    var _8f1 = [];
                    for (var i = 0; i < g.groups.length; i++) {
                        _8f1.push(this.renderGroup.call(this, _8ed, i, g.groups[i], _8ef));
                    }
                    $(_8ee).html(_8f1.join(""));
                } else {
                    $(_8ee).html(this.renderTable(_8ed, 0, _8f0.data.rows, _8ef));
                }
            }, renderGroup: function (_8f2, _8f3, _8f4, _8f5) {
                var _8f6 = $.data(_8f2, "datagrid");
                var opts = _8f6.options;
                var _8f7 = $(_8f2).datagrid("getColumnFields", _8f5);
                var _8f8 = [];
                _8f8.push("<div class=\"datagrid-group\" group-index=" + _8f3 + ">");
                if (!_8f5) {
                    _8f8.push("<span class=\"datagrid-group-title\">");
                    _8f8.push(opts.groupFormatter.call(_8f2, _8f4.value, _8f4.rows));
                    _8f8.push("</span>");
                }
                _8f8.push("</div>");
                _8f8.push(this.renderTable(_8f2, _8f4.startIndex, _8f4.rows, _8f5));
                return _8f8.join("");
            }, groupRows: function (_8f9, rows) {
                var _8fa = $.data(_8f9, "datagrid");
                var opts = _8fa.options;
                var _8fb = [];
                for (var i = 0; i < rows.length; i++) {
                    var row = rows[i];
                    var _8fc = _8fd(row[opts.groupField]);
                    if (!_8fc) {
                        _8fc = {value: row[opts.groupField], rows: [row]};
                        _8fb.push(_8fc);
                    } else {
                        _8fc.rows.push(row);
                    }
                }
                var _8fe = 0;
                var rows = [];
                for (var i = 0; i < _8fb.length; i++) {
                    var _8fc = _8fb[i];
                    _8fc.startIndex = _8fe;
                    _8fe += _8fc.rows.length;
                    rows = rows.concat(_8fc.rows);
                }
                return {groups: _8fb, rows: rows};
                function _8fd(_8ff) {
                    for (var i = 0; i < _8fb.length; i++) {
                        var _900 = _8fb[i];
                        if (_900.value == _8ff) {
                            return _900;
                        }
                    }
                    return null;
                };
            }
        });
        $.fn.datalist = function (_901, _902) {
            if (typeof _901 == "string") {
                var _903 = $.fn.datalist.methods[_901];
                if (_903) {
                    return _903(this, _902);
                } else {
                    return this.datagrid(_901, _902);
                }
            }
            _901 = _901 || {};
            return this.each(function () {
                var _904 = $.data(this, "datalist");
                if (_904) {
                    $.extend(_904.options, _901);
                } else {
                    var opts = $.extend({}, $.fn.datalist.defaults, $.fn.datalist.parseOptions(this), _901);
                    opts.columns = $.extend(true, [], opts.columns);
                    _904 = $.data(this, "datalist", {options: opts});
                }
                _8e8(this);
                if (!_904.options.data) {
                    var data = $.fn.datalist.parseData(this);
                    if (data.total) {
                        $(this).datalist("loadData", data);
                    }
                }
            });
        };
        $.fn.datalist.methods = {
            options: function (jq) {
                return $.data(jq[0], "datalist").options;
            }
        };
        $.fn.datalist.parseOptions = function (_905) {
            return $.extend({}, $.fn.datagrid.parseOptions(_905), $.parser.parseOptions(_905, ["valueField", "textField", "groupField", {
                checkbox: "boolean",
                lines: "boolean"
            }]));
        };
        $.fn.datalist.parseData = function (_906) {
            var opts = $.data(_906, "datalist").options;
            var data = {total: 0, rows: []};
            $(_906).children().each(function () {
                var _907 = $.parser.parseOptions(this, ["value", "group"]);
                var row = {};
                var html = $(this).html();
                row[opts.valueField] = _907.value != undefined ? _907.value : html;
                row[opts.textField] = html;
                if (opts.groupField) {
                    row[opts.groupField] = _907.group;
                }
                data.total++;
                data.rows.push(row);
            });
            return data;
        };
        $.fn.datalist.defaults = $.extend({}, $.fn.datagrid.defaults, {
            fitColumns: true,
            singleSelect: true,
            showHeader: false,
            checkbox: false,
            lines: false,
            valueField: "value",
            textField: "text",
            groupField: "",
            view: _8ec,
            textFormatter: function (_908, row) {
                return _908;
            },
            groupFormatter: function (_909, rows) {
                return _909;
            }
        });
    })(jQuery);
    (function ($) {
        $(function () {
            $(document).unbind(".combo").bind("mousedown.combo mousewheel.combo", function (e) {
                var p = $(e.target).closest("span.combo,div.combo-p,div.menu");
                if (p.length) {
                    _90a(p);
                    return;
                }
                $("body>div.combo-p>div.combo-panel:visible").panel("close");
            });
        });
        function _90b(_90c) {
            var _90d = $.data(_90c, "combo");
            var opts = _90d.options;
            if (!_90d.panel) {
                _90d.panel = $("<div class=\"combo-panel\"></div>").appendTo("body");
                _90d.panel.panel({
                    minWidth: opts.panelMinWidth,
                    maxWidth: opts.panelMaxWidth,
                    minHeight: opts.panelMinHeight,
                    maxHeight: opts.panelMaxHeight,
                    doSize: false,
                    closed: true,
                    cls: "combo-p",
                    style: {position: "absolute", zIndex: 10},
                    onOpen: function () {
                        var _90e = $(this).panel("options").comboTarget;
                        var _90f = $.data(_90e, "combo");
                        if (_90f) {
                            _90f.options.onShowPanel.call(_90e);
                        }
                    },
                    onBeforeClose: function () {
                        _90a(this);
                    },
                    onClose: function () {
                        var _910 = $(this).panel("options").comboTarget;
                        var _911 = $(_910).data("combo");
                        if (_911) {
                            _911.options.onHidePanel.call(_910);
                        }
                    }
                });
            }
            var _912 = $.extend(true, [], opts.icons);
            if (opts.hasDownArrow) {
                _912.push({
                    iconCls: "combo-arrow", handler: function (e) {
                        _916(e.data.target);
                    }
                });
            }
            $(_90c).addClass("combo-f").textbox($.extend({}, opts, {
                icons: _912, onChange: function () {
                }
            }));
            $(_90c).attr("comboName", $(_90c).attr("textboxName"));
            _90d.combo = $(_90c).next();
            _90d.combo.addClass("combo");
        };
        function _913(_914) {
            var _915 = $.data(_914, "combo");
            var opts = _915.options;
            var p = _915.panel;
            if (p.is(":visible")) {
                p.panel("close");
            }
            if (!opts.cloned) {
                p.panel("destroy");
            }
            $(_914).textbox("destroy");
        };
        function _916(_917) {
            var _918 = $.data(_917, "combo").panel;
            if (_918.is(":visible")) {
                _919(_917);
            } else {
                var p = $(_917).closest("div.combo-panel");
                $("div.combo-panel:visible").not(_918).not(p).panel("close");
                $(_917).combo("showPanel");
            }
            $(_917).combo("textbox").focus();
        };
        function _90a(_91a) {
            $(_91a).find(".combo-f").each(function () {
                var p = $(this).combo("panel");
                if (p.is(":visible")) {
                    p.panel("close");
                }
            });
        };
        function _91b(e) {
            var _91c = e.data.target;
            var _91d = $.data(_91c, "combo");
            var opts = _91d.options;
            var _91e = _91d.panel;
            if (!opts.editable) {
                _916(_91c);
            } else {
                var p = $(_91c).closest("div.combo-panel");
                $("div.combo-panel:visible").not(_91e).not(p).panel("close");
            }
        };
        function _91f(e) {
            var _920 = e.data.target;
            var t = $(_920);
            var _921 = t.data("combo");
            var opts = t.combo("options");
            switch (e.keyCode) {
                case 38:
                    opts.keyHandler.up.call(_920, e);
                    break;
                case 40:
                    opts.keyHandler.down.call(_920, e);
                    break;
                case 37:
                    opts.keyHandler.left.call(_920, e);
                    break;
                case 39:
                    opts.keyHandler.right.call(_920, e);
                    break;
                case 13:
                    e.preventDefault();
                    opts.keyHandler.enter.call(_920, e);
                    return false;
                case 9:
                case 27:
                    _919(_920);
                    break;
                default:
                    if (opts.editable) {
                        if (_921.timer) {
                            clearTimeout(_921.timer);
                        }
                        _921.timer = setTimeout(function () {
                            var q = t.combo("getText");
                            if (_921.previousText != q) {
                                _921.previousText = q;
                                t.combo("showPanel");
                                opts.keyHandler.query.call(_920, q, e);
                                t.combo("validate");
                            }
                        }, opts.delay);
                    }
            }
        };
        function _922(_923) {
            var _924 = $.data(_923, "combo");
            var _925 = _924.combo;
            var _926 = _924.panel;
            var opts = $(_923).combo("options");
            var _927 = _926.panel("options");
            _927.comboTarget = _923;
            if (_927.closed) {
                _926.panel("panel").show().css({
                    zIndex: ($.fn.menu ? $.fn.menu.defaults.zIndex++ : $.fn.window.defaults.zIndex++),
                    left: -999999
                });
                _926.panel("resize", {
                    width: (opts.panelWidth ? opts.panelWidth : _925._outerWidth()),
                    height: opts.panelHeight
                });
                _926.panel("panel").hide();
                _926.panel("open");
            }
            (function () {
                if (_926.is(":visible")) {
                    _926.panel("move", {left: _928(), top: _929()});
                    setTimeout(arguments.callee, 200);
                }
            })();
            function _928() {
                var left = _925.offset().left;
                if (opts.panelAlign == "right") {
                    left += _925._outerWidth() - _926._outerWidth();
                }
                if (left + _926._outerWidth() > $(window)._outerWidth() + $(document).scrollLeft()) {
                    left = $(window)._outerWidth() + $(document).scrollLeft() - _926._outerWidth();
                }
                if (left < 0) {
                    left = 0;
                }
                return left;
            };
            function _929() {
                var top = _925.offset().top + _925._outerHeight();
                if (top + _926._outerHeight() > $(window)._outerHeight() + $(document).scrollTop()) {
                    top = _925.offset().top - _926._outerHeight();
                }
                if (top < $(document).scrollTop()) {
                    top = _925.offset().top + _925._outerHeight();
                }
                return top;
            };
        };
        function _919(_92a) {
            var _92b = $.data(_92a, "combo").panel;
            _92b.panel("close");
        };
        function _92c(_92d, text) {
            var _92e = $.data(_92d, "combo");
            var _92f = $(_92d).textbox("getText");
            if (_92f != text) {
                $(_92d).textbox("setText", text);
                _92e.previousText = text;
            }
        };
        function _930(_931) {
            var _932 = [];
            var _933 = $.data(_931, "combo").combo;
            _933.find(".textbox-value").each(function () {
                _932.push($(this).val());
            });
            return _932;
        };
        function _934(_935, _936) {
            var _937 = $.data(_935, "combo");
            var opts = _937.options;
            var _938 = _937.combo;
            if (!$.isArray(_936)) {
                _936 = _936.split(opts.separator);
            }
            var _939 = _930(_935);
            _938.find(".textbox-value").remove();
            var name = $(_935).attr("textboxName") || "";
            for (var i = 0; i < _936.length; i++) {
                var _93a = $("<input type=\"hidden\" class=\"textbox-value\">").appendTo(_938);
                _93a.attr("name", name);
                if (opts.disabled) {
                    _93a.attr("disabled", "disabled");
                }
                _93a.val(_936[i]);
            }
            var _93b = (function () {
                if (_939.length != _936.length) {
                    return true;
                }
                var a1 = $.extend(true, [], _939);
                var a2 = $.extend(true, [], _936);
                a1.sort();
                a2.sort();
                for (var i = 0; i < a1.length; i++) {
                    if (a1[i] != a2[i]) {
                        return true;
                    }
                }
                return false;
            })();
            if (_93b) {
                if (opts.multiple) {
                    opts.onChange.call(_935, _936, _939);
                } else {
                    opts.onChange.call(_935, _936[0], _939[0]);
                }
                $(_935).closest("form").trigger("_change", [_935]);
            }
        };
        function _93c(_93d) {
            var _93e = _930(_93d);
            return _93e[0];
        };
        function _93f(_940, _941) {
            _934(_940, [_941]);
        };
        function _942(_943) {
            var opts = $.data(_943, "combo").options;
            var _944 = opts.onChange;
            opts.onChange = function () {
            };
            if (opts.multiple) {
                _934(_943, opts.value ? opts.value : []);
            } else {
                _93f(_943, opts.value);
            }
            opts.onChange = _944;
        };
        $.fn.combo = function (_945, _946) {
            if (typeof _945 == "string") {
                var _947 = $.fn.combo.methods[_945];
                if (_947) {
                    return _947(this, _946);
                } else {
                    return this.textbox(_945, _946);
                }
            }
            _945 = _945 || {};
            return this.each(function () {
                var _948 = $.data(this, "combo");
                if (_948) {
                    $.extend(_948.options, _945);
                    if (_945.value != undefined) {
                        _948.options.originalValue = _945.value;
                    }
                } else {
                    _948 = $.data(this, "combo", {
                        options: $.extend({}, $.fn.combo.defaults, $.fn.combo.parseOptions(this), _945),
                        previousText: ""
                    });
                    _948.options.originalValue = _948.options.value;
                }
                _90b(this);
                _942(this);
            });
        };
        $.fn.combo.methods = {
            options: function (jq) {
                var opts = jq.textbox("options");
                return $.extend($.data(jq[0], "combo").options, {
                    width: opts.width,
                    height: opts.height,
                    disabled: opts.disabled,
                    readonly: opts.readonly
                });
            }, cloneFrom: function (jq, from) {
                return jq.each(function () {
                    $(this).textbox("cloneFrom", from);
                    $.data(this, "combo", {
                        options: $.extend(true, {cloned: true}, $(from).combo("options")),
                        combo: $(this).next(),
                        panel: $(from).combo("panel")
                    });
                    $(this).addClass("combo-f").attr("comboName", $(this).attr("textboxName"));
                });
            }, panel: function (jq) {
                return $.data(jq[0], "combo").panel;
            }, destroy: function (jq) {
                return jq.each(function () {
                    _913(this);
                });
            }, showPanel: function (jq) {
                return jq.each(function () {
                    _922(this);
                });
            }, hidePanel: function (jq) {
                return jq.each(function () {
                    _919(this);
                });
            }, clear: function (jq) {
                return jq.each(function () {
                    $(this).textbox("setText", "");
                    var opts = $.data(this, "combo").options;
                    if (opts.multiple) {
                        $(this).combo("setValues", []);
                    } else {
                        $(this).combo("setValue", "");
                    }
                });
            }, reset: function (jq) {
                return jq.each(function () {
                    var opts = $.data(this, "combo").options;
                    if (opts.multiple) {
                        $(this).combo("setValues", opts.originalValue);
                    } else {
                        $(this).combo("setValue", opts.originalValue);
                    }
                });
            }, setText: function (jq, text) {
                return jq.each(function () {
                    _92c(this, text);
                });
            }, getValues: function (jq) {
                return _930(jq[0]);
            }, setValues: function (jq, _949) {
                return jq.each(function () {
                    _934(this, _949);
                });
            }, getValue: function (jq) {
                return _93c(jq[0]);
            }, setValue: function (jq, _94a) {
                return jq.each(function () {
                    _93f(this, _94a);
                });
            }
        };
        $.fn.combo.parseOptions = function (_94b) {
            var t = $(_94b);
            return $.extend({}, $.fn.textbox.parseOptions(_94b), $.parser.parseOptions(_94b, ["separator", "panelAlign", {
                panelWidth: "number",
                hasDownArrow: "boolean",
                delay: "number",
                selectOnNavigation: "boolean"
            }, {
                panelMinWidth: "number",
                panelMaxWidth: "number",
                panelMinHeight: "number",
                panelMaxHeight: "number"
            }]), {
                panelHeight: (t.attr("panelHeight") == "auto" ? "auto" : parseInt(t.attr("panelHeight")) || undefined),
                multiple: (t.attr("multiple") ? true : undefined)
            });
        };
        $.fn.combo.defaults = $.extend({}, $.fn.textbox.defaults, {
            inputEvents: {click: _91b, keydown: _91f, paste: _91f, drop: _91f},
            panelWidth: null,
            panelHeight: 200,
            panelMinWidth: null,
            panelMaxWidth: null,
            panelMinHeight: null,
            panelMaxHeight: null,
            panelAlign: "left",
            multiple: false,
            selectOnNavigation: true,
            separator: ",",
            hasDownArrow: true,
            delay: 200,
            keyHandler: {
                up: function (e) {
                }, down: function (e) {
                }, left: function (e) {
                }, right: function (e) {
                }, enter: function (e) {
                }, query: function (q, e) {
                }
            },
            onShowPanel: function () {
            },
            onHidePanel: function () {
            },
            onChange: function (_94c, _94d) {
            }
        });
    })(jQuery);
    (function ($) {
        var _94e = 0;

        function _94f(_950, _951) {
            var _952 = $.data(_950, "combobox");
            var opts = _952.options;
            var data = _952.data;
            for (var i = 0; i < data.length; i++) {
                if (data[i][opts.valueField] == _951) {
                    return i;
                }
            }
            return -1;
        };
        function _953(_954, _955) {
            var opts = $.data(_954, "combobox").options;
            var _956 = $(_954).combo("panel");
            var item = opts.finder.getEl(_954, _955);
            if (item.length) {
                if (item.position().top <= 0) {
                    var h = _956.scrollTop() + item.position().top;
                    _956.scrollTop(h);
                } else {
                    if (item.position().top + item.outerHeight() > _956.height()) {
                        var h = _956.scrollTop() + item.position().top + item.outerHeight() - _956.height();
                        _956.scrollTop(h);
                    }
                }
            }
        };
        function nav(_957, dir) {
            var opts = $.data(_957, "combobox").options;
            var _958 = $(_957).combobox("panel");
            var item = _958.children("div.combobox-item-hover");
            if (!item.length) {
                item = _958.children("div.combobox-item-selected");
            }
            item.removeClass("combobox-item-hover");
            var _959 = "div.combobox-item:visible:not(.combobox-item-disabled):first";
            var _95a = "div.combobox-item:visible:not(.combobox-item-disabled):last";
            if (!item.length) {
                item = _958.children(dir == "next" ? _959 : _95a);
            } else {
                if (dir == "next") {
                    item = item.nextAll(_959);
                    if (!item.length) {
                        item = _958.children(_959);
                    }
                } else {
                    item = item.prevAll(_959);
                    if (!item.length) {
                        item = _958.children(_95a);
                    }
                }
            }
            if (item.length) {
                item.addClass("combobox-item-hover");
                var row = opts.finder.getRow(_957, item);
                if (row) {
                    _953(_957, row[opts.valueField]);
                    if (opts.selectOnNavigation) {
                        _95b(_957, row[opts.valueField]);
                    }
                }
            }
        };
        function _95b(_95c, _95d) {
            var opts = $.data(_95c, "combobox").options;
            var _95e = $(_95c).combo("getValues");
            if ($.inArray(_95d + "", _95e) == -1) {
                if (opts.multiple) {
                    _95e.push(_95d);
                } else {
                    _95e = [_95d];
                }
                _95f(_95c, _95e);
                opts.onSelect.call(_95c, opts.finder.getRow(_95c, _95d));
            }
        };
        function _960(_961, _962) {
            var opts = $.data(_961, "combobox").options;
            var _963 = $(_961).combo("getValues");
            var _964 = $.inArray(_962 + "", _963);
            if (_964 >= 0) {
                _963.splice(_964, 1);
                _95f(_961, _963);
                opts.onUnselect.call(_961, opts.finder.getRow(_961, _962));
            }
        };
        function _95f(_965, _966, _967) {
            var opts = $.data(_965, "combobox").options;
            var _968 = $(_965).combo("panel");
            if (!$.isArray(_966)) {
                _966 = _966.split(opts.separator);
            }
            _968.find("div.combobox-item-selected").removeClass("combobox-item-selected");
            var vv = [], ss = [];
            for (var i = 0; i < _966.length; i++) {
                var v = _966[i];
                var s = v;
                opts.finder.getEl(_965, v).addClass("combobox-item-selected");
                var row = opts.finder.getRow(_965, v);
                if (row) {
                    s = row[opts.textField];
                }
                vv.push(v);
                ss.push(s);
            }
            if (!_967) {
                $(_965).combo("setText", ss.join(opts.separator));
            }
            $(_965).combo("setValues", vv);
        };
        function _969(_96a, data, _96b) {
            var _96c = $.data(_96a, "combobox");
            var opts = _96c.options;
            _96c.data = opts.loadFilter.call(_96a, data);
            _96c.groups = [];
            data = _96c.data;
            var _96d = $(_96a).combobox("getValues");
            var dd = [];
            var _96e = undefined;
            for (var i = 0; i < data.length; i++) {
                var row = data[i];
                var v = row[opts.valueField] + "";
                var s = row[opts.textField];
                var g = row[opts.groupField];
                if (g) {
                    if (_96e != g) {
                        _96e = g;
                        _96c.groups.push(g);
                        dd.push("<div id=\"" + (_96c.groupIdPrefix + "_" + (_96c.groups.length - 1)) + "\" class=\"combobox-group\">");
                        dd.push(opts.groupFormatter ? opts.groupFormatter.call(_96a, g) : g);
                        dd.push("</div>");
                    }
                } else {
                    _96e = undefined;
                }
                var cls = "combobox-item" + (row.disabled ? " combobox-item-disabled" : "") + (g ? " combobox-gitem" : "");
                dd.push("<div id=\"" + (_96c.itemIdPrefix + "_" + i) + "\" class=\"" + cls + "\">");
                dd.push(opts.formatter ? opts.formatter.call(_96a, row) : s);
                dd.push("</div>");
                if (row["selected"] && $.inArray(v, _96d) == -1) {
                    _96d.push(v);
                }
            }
            $(_96a).combo("panel").html(dd.join(""));
            if (opts.multiple) {
                _95f(_96a, _96d, _96b);
            } else {
                _95f(_96a, _96d.length ? [_96d[_96d.length - 1]] : [], _96b);
            }
            opts.onLoadSuccess.call(_96a, data);
        };
        function _96f(_970, url, _971, _972) {
            var opts = $.data(_970, "combobox").options;
            if (url) {
                opts.url = url;
            }
            _971 = $.extend({}, opts.queryParams, _971 || {});
            if (opts.onBeforeLoad.call(_970, _971) == false) {
                return;
            }
            opts.loader.call(_970, _971, function (data) {
                _969(_970, data, _972);
            }, function () {
                opts.onLoadError.apply(this, arguments);
            });
        };
        function _973(_974, q) {
            var _975 = $.data(_974, "combobox");
            var opts = _975.options;
            var qq = opts.multiple ? q.split(opts.separator) : [q];
            if (opts.mode == "remote") {
                _976(qq);
                _96f(_974, null, {q: q}, true);
            } else {
                var _977 = $(_974).combo("panel");
                _977.find("div.combobox-item-selected,div.combobox-item-hover").removeClass("combobox-item-selected combobox-item-hover");
                _977.find("div.combobox-item,div.combobox-group").hide();
                var data = _975.data;
                var vv = [];
                $.map(qq, function (q) {
                    q = $.trim(q);
                    var _978 = q;
                    var _979 = undefined;
                    for (var i = 0; i < data.length; i++) {
                        var row = data[i];
                        if (opts.filter.call(_974, q, row)) {
                            var v = row[opts.valueField];
                            var s = row[opts.textField];
                            var g = row[opts.groupField];
                            var item = opts.finder.getEl(_974, v).show();
                            if (s.toLowerCase() == q.toLowerCase()) {
                                _978 = v;
                                item.addClass("combobox-item-selected");
                            }
                            if (opts.groupField && _979 != g) {
                                $("#" + _975.groupIdPrefix + "_" + $.inArray(g, _975.groups)).show();
                                _979 = g;
                            }
                        }
                    }
                    vv.push(_978);
                });
                _976(vv);
            }
            function _976(vv) {
                _95f(_974, opts.multiple ? (q ? vv : []) : vv, true);
            };
        };
        function _97a(_97b) {
            var t = $(_97b);
            var opts = t.combobox("options");
            var _97c = t.combobox("panel");
            var item = _97c.children("div.combobox-item-hover");
            if (item.length) {
                var row = opts.finder.getRow(_97b, item);
                var _97d = row[opts.valueField];
                if (opts.multiple) {
                    if (item.hasClass("combobox-item-selected")) {
                        t.combobox("unselect", _97d);
                    } else {
                        t.combobox("select", _97d);
                    }
                } else {
                    t.combobox("select", _97d);
                }
            }
            var vv = [];
            $.map(t.combobox("getValues"), function (v) {
                if (_94f(_97b, v) >= 0) {
                    vv.push(v);
                }
            });
            t.combobox("setValues", vv);
            if (!opts.multiple) {
                t.combobox("hidePanel");
            }
        };
        function _97e(_97f) {
            var _980 = $.data(_97f, "combobox");
            var opts = _980.options;
            _94e++;
            _980.itemIdPrefix = "_easyui_combobox_i" + _94e;
            _980.groupIdPrefix = "_easyui_combobox_g" + _94e;
            $(_97f).addClass("combobox-f");
            $(_97f).combo($.extend({}, opts, {
                onShowPanel: function () {
                    $(_97f).combo("panel").find("div.combobox-item,div.combobox-group").show();
                    _953(_97f, $(_97f).combobox("getValue"));
                    opts.onShowPanel.call(_97f);
                }
            }));
            $(_97f).combo("panel").unbind().bind("mouseover", function (e) {
                $(this).children("div.combobox-item-hover").removeClass("combobox-item-hover");
                var item = $(e.target).closest("div.combobox-item");
                if (!item.hasClass("combobox-item-disabled")) {
                    item.addClass("combobox-item-hover");
                }
                e.stopPropagation();
            }).bind("mouseout", function (e) {
                $(e.target).closest("div.combobox-item").removeClass("combobox-item-hover");
                e.stopPropagation();
            }).bind("click", function (e) {
                var item = $(e.target).closest("div.combobox-item");
                if (!item.length || item.hasClass("combobox-item-disabled")) {
                    return;
                }
                var row = opts.finder.getRow(_97f, item);
                if (!row) {
                    return;
                }
                var _981 = row[opts.valueField];
                if (opts.multiple) {
                    if (item.hasClass("combobox-item-selected")) {
                        _960(_97f, _981);
                    } else {
                        _95b(_97f, _981);
                    }
                } else {
                    _95b(_97f, _981);
                    $(_97f).combo("hidePanel");
                }
                e.stopPropagation();
            });
        };
        $.fn.combobox = function (_982, _983) {
            if (typeof _982 == "string") {
                var _984 = $.fn.combobox.methods[_982];
                if (_984) {
                    return _984(this, _983);
                } else {
                    return this.combo(_982, _983);
                }
            }
            _982 = _982 || {};
            return this.each(function () {
                var _985 = $.data(this, "combobox");
                if (_985) {
                    $.extend(_985.options, _982);
                    _97e(this);
                } else {
                    _985 = $.data(this, "combobox", {
                        options: $.extend({}, $.fn.combobox.defaults, $.fn.combobox.parseOptions(this), _982),
                        data: []
                    });
                    _97e(this);
                    var data = $.fn.combobox.parseData(this);
                    if (data.length) {
                        _969(this, data);
                    }
                }
                if (_985.options.data) {
                    _969(this, _985.options.data);
                }
                _96f(this);
            });
        };
        $.fn.combobox.methods = {
            options: function (jq) {
                var _986 = jq.combo("options");
                return $.extend($.data(jq[0], "combobox").options, {
                    width: _986.width,
                    height: _986.height,
                    originalValue: _986.originalValue,
                    disabled: _986.disabled,
                    readonly: _986.readonly
                });
            }, getData: function (jq) {
                return $.data(jq[0], "combobox").data;
            }, setValues: function (jq, _987) {
                return jq.each(function () {
                    _95f(this, _987);
                });
            }, setValue: function (jq, _988) {
                return jq.each(function () {
                    _95f(this, [_988]);
                });
            }, clear: function (jq) {
                return jq.each(function () {
                    $(this).combo("clear");
                    var _989 = $(this).combo("panel");
                    _989.find("div.combobox-item-selected").removeClass("combobox-item-selected");
                });
            }, reset: function (jq) {
                return jq.each(function () {
                    var opts = $(this).combobox("options");
                    if (opts.multiple) {
                        $(this).combobox("setValues", opts.originalValue);
                    } else {
                        $(this).combobox("setValue", opts.originalValue);
                    }
                });
            }, loadData: function (jq, data) {
                return jq.each(function () {
                    _969(this, data);
                });
            }, reload: function (jq, url) {
                return jq.each(function () {
                    if (typeof url == "string") {
                        _96f(this, url);
                    } else {
                        if (url) {
                            var opts = $(this).combobox("options");
                            opts.queryParams = url;
                        }
                        _96f(this);
                    }
                });
            }, select: function (jq, _98a) {
                return jq.each(function () {
                    _95b(this, _98a);
                });
            }, unselect: function (jq, _98b) {
                return jq.each(function () {
                    _960(this, _98b);
                });
            }
        };
        $.fn.combobox.parseOptions = function (_98c) {
            var t = $(_98c);
            return $.extend({}, $.fn.combo.parseOptions(_98c), $.parser.parseOptions(_98c, ["valueField", "textField", "groupField", "mode", "method", "url"]));
        };
        $.fn.combobox.parseData = function (_98d) {
            var data = [];
            var opts = $(_98d).combobox("options");
            $(_98d).children().each(function () {
                if (this.tagName.toLowerCase() == "optgroup") {
                    var _98e = $(this).attr("label");
                    $(this).children().each(function () {
                        _98f(this, _98e);
                    });
                } else {
                    _98f(this);
                }
            });
            return data;
            function _98f(el, _990) {
                var t = $(el);
                var row = {};
                row[opts.valueField] = t.attr("value") != undefined ? t.attr("value") : t.text();
                row[opts.textField] = t.text();
                row["selected"] = t.is(":selected");
                row["disabled"] = t.is(":disabled");
                if (_990) {
                    opts.groupField = opts.groupField || "group";
                    row[opts.groupField] = _990;
                }
                data.push(row);
            };
        };
        $.fn.combobox.defaults = $.extend({}, $.fn.combo.defaults, {
            valueField: "value", textField: "text", groupField: null, groupFormatter: function (_991) {
                return _991;
            }, mode: "local", method: "post", url: null, data: null, queryParams: {}, keyHandler: {
                up: function (e) {
                    nav(this, "prev");
                    e.preventDefault();
                }, down: function (e) {
                    nav(this, "next");
                    e.preventDefault();
                }, left: function (e) {
                }, right: function (e) {
                }, enter: function (e) {
                    _97a(this);
                }, query: function (q, e) {
                    _973(this, q);
                }
            }, filter: function (q, row) {
                var opts = $(this).combobox("options");
                return row[opts.textField].toLowerCase().indexOf(q.toLowerCase()) == 0;
            }, formatter: function (row) {
                var opts = $(this).combobox("options");
                return row[opts.textField];
            }, loader: function (_992, _993, _994) {
                var opts = $(this).combobox("options");
                if (!opts.url) {
                    return false;
                }
                $.ajax({
                    type: opts.method, url: opts.url, data: _992, dataType: "json", success: function (data) {
                        _993(data);
                    }, error: function () {
                        _994.apply(this, arguments);
                    }
                });
            }, loadFilter: function (data) {
                return data;
            }, finder: {
                getEl: function (_995, _996) {
                    var _997 = _94f(_995, _996);
                    var id = $.data(_995, "combobox").itemIdPrefix + "_" + _997;
                    return $("#" + id);
                }, getRow: function (_998, p) {
                    var _999 = $.data(_998, "combobox");
                    var _99a = (p instanceof jQuery) ? p.attr("id").substr(_999.itemIdPrefix.length + 1) : _94f(_998, p);
                    return _999.data[parseInt(_99a)];
                }
            }, onBeforeLoad: function (_99b) {
            }, onLoadSuccess: function () {
            }, onLoadError: function () {
            }, onSelect: function (_99c) {
            }, onUnselect: function (_99d) {
            }
        });
    })(jQuery);
    (function ($) {
        function _99e(_99f) {
            var _9a0 = $.data(_99f, "combotree");
            var opts = _9a0.options;
            var tree = _9a0.tree;
            $(_99f).addClass("combotree-f");
            $(_99f).combo(opts);
            var _9a1 = $(_99f).combo("panel");
            if (!tree) {
                tree = $("<ul></ul>").appendTo(_9a1);
                $.data(_99f, "combotree").tree = tree;
            }
            tree.tree($.extend({}, opts, {
                checkbox: opts.multiple, onLoadSuccess: function (node, data) {
                    var _9a2 = $(_99f).combotree("getValues");
                    if (opts.multiple) {
                        var _9a3 = tree.tree("getChecked");
                        for (var i = 0; i < _9a3.length; i++) {
                            var id = _9a3[i].id;
                            (function () {
                                for (var i = 0; i < _9a2.length; i++) {
                                    if (id == _9a2[i]) {
                                        return;
                                    }
                                }
                                _9a2.push(id);
                            })();
                        }
                    }
                    $(_99f).combotree("setValues", _9a2);
                    opts.onLoadSuccess.call(this, node, data);
                }, onClick: function (node) {
                    if (opts.multiple) {
                        $(this).tree(node.checked ? "uncheck" : "check", node.target);
                    } else {
                        $(_99f).combo("hidePanel");
                    }
                    _9a5(_99f);
                    opts.onClick.call(this, node);
                }, onCheck: function (node, _9a4) {
                    _9a5(_99f);
                    opts.onCheck.call(this, node, _9a4);
                }
            }));
        };
        function _9a5(_9a6) {
            var _9a7 = $.data(_9a6, "combotree");
            var opts = _9a7.options;
            var tree = _9a7.tree;
            var vv = [], ss = [];
            if (opts.multiple) {
                var _9a8 = tree.tree("getChecked");
                for (var i = 0; i < _9a8.length; i++) {
                    vv.push(_9a8[i].id);
                    ss.push(_9a8[i].text);
                }
            } else {
                var node = tree.tree("getSelected");
                if (node) {
                    vv.push(node.id);
                    ss.push(node.text);
                }
            }
            $(_9a6).combo("setText", ss.join(opts.separator)).combo("setValues", opts.multiple ? vv : (vv.length ? vv : [""]));
        };
        function _9a9(_9aa, _9ab) {
            var _9ac = $.data(_9aa, "combotree");
            var opts = _9ac.options;
            var tree = _9ac.tree;
            var _9ad = tree.tree("options");
            var _9ae = _9ad.onCheck;
            var _9af = _9ad.onSelect;
            _9ad.onCheck = _9ad.onSelect = function () {
            };
            tree.find("span.tree-checkbox").addClass("tree-checkbox0").removeClass("tree-checkbox1 tree-checkbox2");
            if (!$.isArray(_9ab)) {
                _9ab = _9ab.split(opts.separator);
            }
            var vv = $.map(_9ab, function (_9b0) {
                return String(_9b0);
            });
            var ss = [];
            $.map(vv, function (v) {
                var node = tree.tree("find", v);
                if (node) {
                    tree.tree("check", node.target).tree("select", node.target);
                    ss.push(node.text);
                } else {
                    ss.push(v);
                }
            });
            if (opts.multiple) {
                var _9b1 = tree.tree("getChecked");
                $.map(_9b1, function (node) {
                    var id = String(node.id);
                    if ($.inArray(id, vv) == -1) {
                        vv.push(id);
                        ss.push(node.text);
                    }
                });
            }
            _9ad.onCheck = _9ae;
            _9ad.onSelect = _9af;
            $(_9aa).combo("setText", ss.join(opts.separator)).combo("setValues", opts.multiple ? vv : (vv.length ? vv : [""]));
        };
        $.fn.combotree = function (_9b2, _9b3) {
            if (typeof _9b2 == "string") {
                var _9b4 = $.fn.combotree.methods[_9b2];
                if (_9b4) {
                    return _9b4(this, _9b3);
                } else {
                    return this.combo(_9b2, _9b3);
                }
            }
            _9b2 = _9b2 || {};
            return this.each(function () {
                var _9b5 = $.data(this, "combotree");
                if (_9b5) {
                    $.extend(_9b5.options, _9b2);
                } else {
                    $.data(this, "combotree", {options: $.extend({}, $.fn.combotree.defaults, $.fn.combotree.parseOptions(this), _9b2)});
                }
                _99e(this);
            });
        };
        $.fn.combotree.methods = {
            options: function (jq) {
                var _9b6 = jq.combo("options");
                return $.extend($.data(jq[0], "combotree").options, {
                    width: _9b6.width,
                    height: _9b6.height,
                    originalValue: _9b6.originalValue,
                    disabled: _9b6.disabled,
                    readonly: _9b6.readonly
                });
            }, clone: function (jq, _9b7) {
                var t = jq.combo("clone", _9b7);
                t.data("combotree", {options: $.extend(true, {}, jq.combotree("options")), tree: jq.combotree("tree")});
                return t;
            }, tree: function (jq) {
                return $.data(jq[0], "combotree").tree;
            }, loadData: function (jq, data) {
                return jq.each(function () {
                    var opts = $.data(this, "combotree").options;
                    opts.data = data;
                    var tree = $.data(this, "combotree").tree;
                    tree.tree("loadData", data);
                });
            }, reload: function (jq, url) {
                return jq.each(function () {
                    var opts = $.data(this, "combotree").options;
                    var tree = $.data(this, "combotree").tree;
                    if (url) {
                        opts.url = url;
                    }
                    tree.tree({url: opts.url});
                });
            }, setValues: function (jq, _9b8) {
                return jq.each(function () {
                    _9a9(this, _9b8);
                });
            }, setValue: function (jq, _9b9) {
                return jq.each(function () {
                    _9a9(this, [_9b9]);
                });
            }, clear: function (jq) {
                return jq.each(function () {
                    var tree = $.data(this, "combotree").tree;
                    tree.find("div.tree-node-selected").removeClass("tree-node-selected");
                    var cc = tree.tree("getChecked");
                    for (var i = 0; i < cc.length; i++) {
                        tree.tree("uncheck", cc[i].target);
                    }
                    $(this).combo("clear");
                });
            }, reset: function (jq) {
                return jq.each(function () {
                    var opts = $(this).combotree("options");
                    if (opts.multiple) {
                        $(this).combotree("setValues", opts.originalValue);
                    } else {
                        $(this).combotree("setValue", opts.originalValue);
                    }
                });
            }
        };
        $.fn.combotree.parseOptions = function (_9ba) {
            return $.extend({}, $.fn.combo.parseOptions(_9ba), $.fn.tree.parseOptions(_9ba));
        };
        $.fn.combotree.defaults = $.extend({}, $.fn.combo.defaults, $.fn.tree.defaults, {editable: false});
    })(jQuery);
    (function ($) {
        function _9bb(_9bc) {
            var _9bd = $.data(_9bc, "combogrid");
            var opts = _9bd.options;
            var grid = _9bd.grid;
            $(_9bc).addClass("combogrid-f").combo($.extend({}, opts, {
                onShowPanel: function () {
                    var p = $(this).combogrid("panel");
                    var _9be = p.outerHeight() - p.height();
                    var _9bf = p._size("minHeight");
                    var _9c0 = p._size("maxHeight");
                    var dg = $(this).combogrid("grid");
                    dg.datagrid("resize", {
                        width: "100%",
                        height: (isNaN(parseInt(opts.panelHeight)) ? "auto" : "100%"),
                        minHeight: (_9bf ? _9bf - _9be : ""),
                        maxHeight: (_9c0 ? _9c0 - _9be : "")
                    });
                    var row = dg.datagrid("getSelected");
                    if (row) {
                        dg.datagrid("scrollTo", dg.datagrid("getRowIndex", row));
                    }
                    opts.onShowPanel.call(this);
                }
            }));
            var _9c1 = $(_9bc).combo("panel");
            if (!grid) {
                grid = $("<table></table>").appendTo(_9c1);
                _9bd.grid = grid;
            }
            grid.datagrid($.extend({}, opts, {
                border: false, singleSelect: (!opts.multiple), onLoadSuccess: function (data) {
                    var _9c2 = $(_9bc).combo("getValues");
                    var _9c3 = opts.onSelect;
                    opts.onSelect = function () {
                    };
                    _9cd(_9bc, _9c2, _9bd.remainText);
                    opts.onSelect = _9c3;
                    opts.onLoadSuccess.apply(_9bc, arguments);
                }, onClickRow: _9c4, onSelect: function (_9c5, row) {
                    _9c6();
                    opts.onSelect.call(this, _9c5, row);
                }, onUnselect: function (_9c7, row) {
                    _9c6();
                    opts.onUnselect.call(this, _9c7, row);
                }, onSelectAll: function (rows) {
                    _9c6();
                    opts.onSelectAll.call(this, rows);
                }, onUnselectAll: function (rows) {
                    if (opts.multiple) {
                        _9c6();
                    }
                    opts.onUnselectAll.call(this, rows);
                }
            }));
            function _9c4(_9c8, row) {
                _9bd.remainText = false;
                _9c6();
                if (!opts.multiple) {
                    $(_9bc).combo("hidePanel");
                }
                opts.onClickRow.call(this, _9c8, row);
            };
            function _9c6() {
                var rows = grid.datagrid("getSelections");
                var vv = [], ss = [];
                for (var i = 0; i < rows.length; i++) {
                    vv.push(rows[i][opts.idField]);
                    ss.push(rows[i][opts.textField]);
                }
                if (!opts.multiple) {
                    $(_9bc).combo("setValues", (vv.length ? vv : [""]));
                } else {
                    $(_9bc).combo("setValues", vv);
                }
                if (!_9bd.remainText) {
                    $(_9bc).combo("setText", ss.join(opts.separator));
                }
            };
        };
        function nav(_9c9, dir) {
            var _9ca = $.data(_9c9, "combogrid");
            var opts = _9ca.options;
            var grid = _9ca.grid;
            var _9cb = grid.datagrid("getRows").length;
            if (!_9cb) {
                return;
            }
            var tr = opts.finder.getTr(grid[0], null, "highlight");
            if (!tr.length) {
                tr = opts.finder.getTr(grid[0], null, "selected");
            }
            var _9cc;
            if (!tr.length) {
                _9cc = (dir == "next" ? 0 : _9cb - 1);
            } else {
                var _9cc = parseInt(tr.attr("datagrid-row-index"));
                _9cc += (dir == "next" ? 1 : -1);
                if (_9cc < 0) {
                    _9cc = _9cb - 1;
                }
                if (_9cc >= _9cb) {
                    _9cc = 0;
                }
            }
            grid.datagrid("highlightRow", _9cc);
            if (opts.selectOnNavigation) {
                _9ca.remainText = false;
                grid.datagrid("selectRow", _9cc);
            }
        };
        function _9cd(_9ce, _9cf, _9d0) {
            var _9d1 = $.data(_9ce, "combogrid");
            var opts = _9d1.options;
            var grid = _9d1.grid;
            var rows = grid.datagrid("getRows");
            var ss = [];
            var _9d2 = $(_9ce).combo("getValues");
            var _9d3 = $(_9ce).combo("options");
            var _9d4 = _9d3.onChange;
            _9d3.onChange = function () {
            };
            grid.datagrid("clearSelections");
            if (!$.isArray(_9cf)) {
                _9cf = _9cf.split(opts.separator);
            }
            for (var i = 0; i < _9cf.length; i++) {
                var _9d5 = grid.datagrid("getRowIndex", _9cf[i]);
                if (_9d5 >= 0) {
                    grid.datagrid("selectRow", _9d5);
                    ss.push(rows[_9d5][opts.textField]);
                } else {
                    ss.push(_9cf[i]);
                }
            }
            $(_9ce).combo("setValues", _9d2);
            _9d3.onChange = _9d4;
            if (!_9d0) {
                var s = ss.join(opts.separator);
                if ($(_9ce).combo("getText") != s) {
                    $(_9ce).combo("setText", s);
                }
            }
            $(_9ce).combo("setValues", _9cf);
        };
        function _9d6(_9d7, q) {
            var _9d8 = $.data(_9d7, "combogrid");
            var opts = _9d8.options;
            var grid = _9d8.grid;
            _9d8.remainText = true;
            if (opts.multiple && !q) {
                _9cd(_9d7, [], true);
            } else {
                _9cd(_9d7, [q], true);
            }
            if (opts.mode == "remote") {
                grid.datagrid("clearSelections");
                grid.datagrid("load", $.extend({}, opts.queryParams, {q: q}));
            } else {
                if (!q) {
                    return;
                }
                grid.datagrid("clearSelections").datagrid("highlightRow", -1);
                var rows = grid.datagrid("getRows");
                var qq = opts.multiple ? q.split(opts.separator) : [q];
                $.map(qq, function (q) {
                    q = $.trim(q);
                    if (q) {
                        $.map(rows, function (row, i) {
                            if (q == row[opts.textField]) {
                                grid.datagrid("selectRow", i);
                            } else {
                                if (opts.filter.call(_9d7, q, row)) {
                                    grid.datagrid("highlightRow", i);
                                }
                            }
                        });
                    }
                });
            }
        };
        function _9d9(_9da) {
            var _9db = $.data(_9da, "combogrid");
            var opts = _9db.options;
            var grid = _9db.grid;
            var tr = opts.finder.getTr(grid[0], null, "highlight");
            _9db.remainText = false;
            if (tr.length) {
                var _9dc = parseInt(tr.attr("datagrid-row-index"));
                if (opts.multiple) {
                    if (tr.hasClass("datagrid-row-selected")) {
                        grid.datagrid("unselectRow", _9dc);
                    } else {
                        grid.datagrid("selectRow", _9dc);
                    }
                } else {
                    grid.datagrid("selectRow", _9dc);
                }
            }
            var vv = [];
            $.map(grid.datagrid("getSelections"), function (row) {
                vv.push(row[opts.idField]);
            });
            $(_9da).combogrid("setValues", vv);
            if (!opts.multiple) {
                $(_9da).combogrid("hidePanel");
            }
        };
        $.fn.combogrid = function (_9dd, _9de) {
            if (typeof _9dd == "string") {
                var _9df = $.fn.combogrid.methods[_9dd];
                if (_9df) {
                    return _9df(this, _9de);
                } else {
                    return this.combo(_9dd, _9de);
                }
            }
            _9dd = _9dd || {};
            return this.each(function () {
                var _9e0 = $.data(this, "combogrid");
                if (_9e0) {
                    $.extend(_9e0.options, _9dd);
                } else {
                    _9e0 = $.data(this, "combogrid", {options: $.extend({}, $.fn.combogrid.defaults, $.fn.combogrid.parseOptions(this), _9dd)});
                }
                _9bb(this);
            });
        };
        $.fn.combogrid.methods = {
            options: function (jq) {
                var _9e1 = jq.combo("options");
                return $.extend($.data(jq[0], "combogrid").options, {
                    width: _9e1.width,
                    height: _9e1.height,
                    originalValue: _9e1.originalValue,
                    disabled: _9e1.disabled,
                    readonly: _9e1.readonly
                });
            }, grid: function (jq) {
                return $.data(jq[0], "combogrid").grid;
            }, setValues: function (jq, _9e2) {
                return jq.each(function () {
                    _9cd(this, _9e2);
                });
            }, setValue: function (jq, _9e3) {
                return jq.each(function () {
                    _9cd(this, [_9e3]);
                });
            }, clear: function (jq) {
                return jq.each(function () {
                    $(this).combogrid("grid").datagrid("clearSelections");
                    $(this).combo("clear");
                });
            }, reset: function (jq) {
                return jq.each(function () {
                    var opts = $(this).combogrid("options");
                    if (opts.multiple) {
                        $(this).combogrid("setValues", opts.originalValue);
                    } else {
                        $(this).combogrid("setValue", opts.originalValue);
                    }
                });
            }
        };
        $.fn.combogrid.parseOptions = function (_9e4) {
            var t = $(_9e4);
            return $.extend({}, $.fn.combo.parseOptions(_9e4), $.fn.datagrid.parseOptions(_9e4), $.parser.parseOptions(_9e4, ["idField", "textField", "mode"]));
        };
        $.fn.combogrid.defaults = $.extend({}, $.fn.combo.defaults, $.fn.datagrid.defaults, {
            height: 22, loadMsg: null, idField: null, textField: null, mode: "local", keyHandler: {
                up: function (e) {
                    nav(this, "prev");
                    e.preventDefault();
                }, down: function (e) {
                    nav(this, "next");
                    e.preventDefault();
                }, left: function (e) {
                }, right: function (e) {
                }, enter: function (e) {
                    _9d9(this);
                }, query: function (q, e) {
                    _9d6(this, q);
                }
            }, filter: function (q, row) {
                var opts = $(this).combogrid("options");
                return row[opts.textField].toLowerCase().indexOf(q.toLowerCase()) == 0;
            }
        });
    })(jQuery);
    (function ($) {
        function _9e5(_9e6) {
            var _9e7 = $.data(_9e6, "datebox");
            var opts = _9e7.options;
            $(_9e6).addClass("datebox-f").combo($.extend({}, opts, {
                onShowPanel: function () {
                    _9e8(this);
                    _9e9(this);
                    _9ea(this);
                    _9f8(this, $(this).datebox("getText"), true);
                    opts.onShowPanel.call(this);
                }
            }));
            if (!_9e7.calendar) {
                var _9eb = $(_9e6).combo("panel").css("overflow", "hidden");
                _9eb.panel("options").onBeforeDestroy = function () {
                    var c = $(this).find(".calendar-shared");
                    if (c.length) {
                        c.insertBefore(c[0].pholder);
                    }
                };
                var cc = $("<div class=\"datebox-calendar-inner\"></div>").prependTo(_9eb);
                if (opts.sharedCalendar) {
                    var c = $(opts.sharedCalendar);
                    if (!c[0].pholder) {
                        c[0].pholder = $("<div class=\"calendar-pholder\" style=\"display:none\"></div>").insertAfter(c);
                    }
                    c.addClass("calendar-shared").appendTo(cc);
                    if (!c.hasClass("calendar")) {
                        c.calendar();
                    }
                    _9e7.calendar = c;
                } else {
                    _9e7.calendar = $("<div></div>").appendTo(cc).calendar();
                }
                $.extend(_9e7.calendar.calendar("options"), {
                    fit: true, border: false, onSelect: function (date) {
                        var _9ec = this.target;
                        var opts = $(_9ec).datebox("options");
                        _9f8(_9ec, opts.formatter.call(_9ec, date));
                        $(_9ec).combo("hidePanel");
                        opts.onSelect.call(_9ec, date);
                    }
                });
            }
            $(_9e6).combo("textbox").parent().addClass("datebox");
            $(_9e6).datebox("initValue", opts.value);
            function _9e8(_9ed) {
                var opts = $(_9ed).datebox("options");
                var _9ee = $(_9ed).combo("panel");
                _9ee.unbind(".datebox").bind("click.datebox", function (e) {
                    if ($(e.target).hasClass("datebox-button-a")) {
                        var _9ef = parseInt($(e.target).attr("datebox-button-index"));
                        opts.buttons[_9ef].handler.call(e.target, _9ed);
                    }
                });
            };
            function _9e9(_9f0) {
                var _9f1 = $(_9f0).combo("panel");
                if (_9f1.children("div.datebox-button").length) {
                    return;
                }
                var _9f2 = $("<div class=\"datebox-button\"><table cellspacing=\"0\" cellpadding=\"0\" style=\"width:100%\"><tr></tr></table></div>").appendTo(_9f1);
                var tr = _9f2.find("tr");
                for (var i = 0; i < opts.buttons.length; i++) {
                    var td = $("<td></td>").appendTo(tr);
                    var btn = opts.buttons[i];
                    var t = $("<a class=\"datebox-button-a\" href=\"javascript:void(0)\"></a>").html($.isFunction(btn.text) ? btn.text(_9f0) : btn.text).appendTo(td);
                    t.attr("datebox-button-index", i);
                }
                tr.find("td").css("width", (100 / opts.buttons.length) + "%");
            };
            function _9ea(_9f3) {
                var _9f4 = $(_9f3).combo("panel");
                var cc = _9f4.children("div.datebox-calendar-inner");
                _9f4.children()._outerWidth(_9f4.width());
                _9e7.calendar.appendTo(cc);
                _9e7.calendar[0].target = _9f3;
                if (opts.panelHeight != "auto") {
                    var _9f5 = _9f4.height();
                    _9f4.children().not(cc).each(function () {
                        _9f5 -= $(this).outerHeight();
                    });
                    cc._outerHeight(_9f5);
                }
                _9e7.calendar.calendar("resize");
            };
        };
        function _9f6(_9f7, q) {
            _9f8(_9f7, q, true);
        };
        function _9f9(_9fa) {
            var _9fb = $.data(_9fa, "datebox");
            var opts = _9fb.options;
            var _9fc = _9fb.calendar.calendar("options").current;
            if (_9fc) {
                _9f8(_9fa, opts.formatter.call(_9fa, _9fc));
                $(_9fa).combo("hidePanel");
            }
        };
        function _9f8(_9fd, _9fe, _9ff) {
            var _a00 = $.data(_9fd, "datebox");
            var opts = _a00.options;
            var _a01 = _a00.calendar;
            _a01.calendar("moveTo", opts.parser.call(_9fd, _9fe));
            if (_9ff) {
                $(_9fd).combo("setValue", _9fe);
            } else {
                if (_9fe) {
                    _9fe = opts.formatter.call(_9fd, _a01.calendar("options").current);
                }
                $(_9fd).combo("setText", _9fe).combo("setValue", _9fe);
            }
        };
        $.fn.datebox = function (_a02, _a03) {
            if (typeof _a02 == "string") {
                var _a04 = $.fn.datebox.methods[_a02];
                if (_a04) {
                    return _a04(this, _a03);
                } else {
                    return this.combo(_a02, _a03);
                }
            }
            _a02 = _a02 || {};
            return this.each(function () {
                var _a05 = $.data(this, "datebox");
                if (_a05) {
                    $.extend(_a05.options, _a02);
                } else {
                    $.data(this, "datebox", {options: $.extend({}, $.fn.datebox.defaults, $.fn.datebox.parseOptions(this), _a02)});
                }
                _9e5(this);
            });
        };
        $.fn.datebox.methods = {
            options: function (jq) {
                var _a06 = jq.combo("options");
                return $.extend($.data(jq[0], "datebox").options, {
                    width: _a06.width,
                    height: _a06.height,
                    originalValue: _a06.originalValue,
                    disabled: _a06.disabled,
                    readonly: _a06.readonly
                });
            }, cloneFrom: function (jq, from) {
                return jq.each(function () {
                    $(this).combo("cloneFrom", from);
                    $.data(this, "datebox", {
                        options: $.extend(true, {}, $(from).datebox("options")),
                        calendar: $(from).datebox("calendar")
                    });
                    $(this).addClass("datebox-f");
                });
            }, calendar: function (jq) {
                return $.data(jq[0], "datebox").calendar;
            }, initValue: function (jq, _a07) {
                return jq.each(function () {
                    var opts = $(this).datebox("options");
                    var _a08 = opts.value;
                    if (_a08) {
                        _a08 = opts.formatter.call(this, opts.parser.call(this, _a08));
                    }
                    $(this).combo("initValue", _a08).combo("setText", _a08);
                });
            }, setValue: function (jq, _a09) {
                return jq.each(function () {
                    _9f8(this, _a09);
                });
            }, reset: function (jq) {
                return jq.each(function () {
                    var opts = $(this).datebox("options");
                    $(this).datebox("setValue", opts.originalValue);
                });
            }
        };
        $.fn.datebox.parseOptions = function (_a0a) {
            return $.extend({}, $.fn.combo.parseOptions(_a0a), $.parser.parseOptions(_a0a, ["sharedCalendar"]));
        };
        $.fn.datebox.defaults = $.extend({}, $.fn.combo.defaults, {
            panelWidth: 180, panelHeight: "auto", sharedCalendar: null, keyHandler: {
                up: function (e) {
                }, down: function (e) {
                }, left: function (e) {
                }, right: function (e) {
                }, enter: function (e) {
                    _9f9(this);
                }, query: function (q, e) {
                    _9f6(this, q);
                }
            }, currentText: "Today", closeText: "Close", okText: "Ok", buttons: [{
                text: function (_a0b) {
                    return $(_a0b).datebox("options").currentText;
                }, handler: function (_a0c) {
                    var now = new Date();
                    $(_a0c).datebox("calendar").calendar({
                        year: now.getFullYear(),
                        month: now.getMonth() + 1,
                        current: new Date(now.getFullYear(), now.getMonth(), now.getDate())
                    });
                    _9f9(_a0c);
                }
            }, {
                text: function (_a0d) {
                    return $(_a0d).datebox("options").closeText;
                }, handler: function (_a0e) {
                    $(this).closest("div.combo-panel").panel("close");
                }
            }], formatter: function (date) {
                var y = date.getFullYear();
                var m = date.getMonth() + 1;
                var d = date.getDate();
                return (m < 10 ? ("0" + m) : m) + "/" + (d < 10 ? ("0" + d) : d) + "/" + y;
            }, parser: function (s) {
                if (!s) {
                    return new Date();
                }
                var ss = s.split("/");
                var m = parseInt(ss[0], 10);
                var d = parseInt(ss[1], 10);
                var y = parseInt(ss[2], 10);
                if (!isNaN(y) && !isNaN(m) && !isNaN(d)) {
                    return new Date(y, m - 1, d);
                } else {
                    return new Date();
                }
            }, onSelect: function (date) {
            }
        });
    })(jQuery);
    (function ($) {
        function _a0f(_a10) {
            var _a11 = $.data(_a10, "datetimebox");
            var opts = _a11.options;
            $(_a10).datebox($.extend({}, opts, {
                onShowPanel: function () {
                    var _a12 = $(this).datetimebox("getValue");
                    _a18(this, _a12, true);
                    opts.onShowPanel.call(this);
                }, formatter: $.fn.datebox.defaults.formatter, parser: $.fn.datebox.defaults.parser
            }));
            $(_a10).removeClass("datebox-f").addClass("datetimebox-f");
            $(_a10).datebox("calendar").calendar({
                onSelect: function (date) {
                    opts.onSelect.call(this.target, date);
                }
            });
            if (!_a11.spinner) {
                var _a13 = $(_a10).datebox("panel");
                var p = $("<div style=\"padding:2px\"><input></div>").insertAfter(_a13.children("div.datebox-calendar-inner"));
                _a11.spinner = p.children("input");
            }
            _a11.spinner.timespinner({
                width: opts.spinnerWidth,
                showSeconds: opts.showSeconds,
                separator: opts.timeSeparator
            });
            $(_a10).datetimebox("initValue", opts.value);
        };
        function _a14(_a15) {
            var c = $(_a15).datetimebox("calendar");
            var t = $(_a15).datetimebox("spinner");
            var date = c.calendar("options").current;
            return new Date(date.getFullYear(), date.getMonth(), date.getDate(), t.timespinner("getHours"), t.timespinner("getMinutes"), t.timespinner("getSeconds"));
        };
        function _a16(_a17, q) {
            _a18(_a17, q, true);
        };
        function _a19(_a1a) {
            var opts = $.data(_a1a, "datetimebox").options;
            var date = _a14(_a1a);
            _a18(_a1a, opts.formatter.call(_a1a, date));
            $(_a1a).combo("hidePanel");
        };
        function _a18(_a1b, _a1c, _a1d) {
            var opts = $.data(_a1b, "datetimebox").options;
            $(_a1b).combo("setValue", _a1c);
            if (!_a1d) {
                if (_a1c) {
                    var date = opts.parser.call(_a1b, _a1c);
                    $(_a1b).combo("setText", opts.formatter.call(_a1b, date));
                    $(_a1b).combo("setValue", opts.formatter.call(_a1b, date));
                } else {
                    $(_a1b).combo("setText", _a1c);
                }
            }
            var date = opts.parser.call(_a1b, _a1c);
            $(_a1b).datetimebox("calendar").calendar("moveTo", date);
            $(_a1b).datetimebox("spinner").timespinner("setValue", _a1e(date));
            function _a1e(date) {
                function _a1f(_a20) {
                    return (_a20 < 10 ? "0" : "") + _a20;
                };
                var tt = [_a1f(date.getHours()), _a1f(date.getMinutes())];
                if (opts.showSeconds) {
                    tt.push(_a1f(date.getSeconds()));
                }
                return tt.join($(_a1b).datetimebox("spinner").timespinner("options").separator);
            };
        };
        $.fn.datetimebox = function (_a21, _a22) {
            if (typeof _a21 == "string") {
                var _a23 = $.fn.datetimebox.methods[_a21];
                if (_a23) {
                    return _a23(this, _a22);
                } else {
                    return this.datebox(_a21, _a22);
                }
            }
            _a21 = _a21 || {};
            return this.each(function () {
                var _a24 = $.data(this, "datetimebox");
                if (_a24) {
                    $.extend(_a24.options, _a21);
                } else {
                    $.data(this, "datetimebox", {options: $.extend({}, $.fn.datetimebox.defaults, $.fn.datetimebox.parseOptions(this), _a21)});
                }
                _a0f(this);
            });
        };
        $.fn.datetimebox.methods = {
            options: function (jq) {
                var _a25 = jq.datebox("options");
                return $.extend($.data(jq[0], "datetimebox").options, {
                    originalValue: _a25.originalValue,
                    disabled: _a25.disabled,
                    readonly: _a25.readonly
                });
            }, cloneFrom: function (jq, from) {
                return jq.each(function () {
                    $(this).datebox("cloneFrom", from);
                    $.data(this, "datetimebox", {
                        options: $.extend(true, {}, $(from).datetimebox("options")),
                        spinner: $(from).datetimebox("spinner")
                    });
                    $(this).removeClass("datebox-f").addClass("datetimebox-f");
                });
            }, spinner: function (jq) {
                return $.data(jq[0], "datetimebox").spinner;
            }, initValue: function (jq, _a26) {
                return jq.each(function () {
                    var opts = $(this).datetimebox("options");
                    var _a27 = opts.value;
                    if (_a27) {
                        _a27 = opts.formatter.call(this, opts.parser.call(this, _a27));
                    }
                    $(this).combo("initValue", _a27).combo("setText", _a27);
                });
            }, setValue: function (jq, _a28) {
                return jq.each(function () {
                    _a18(this, _a28);
                });
            }, reset: function (jq) {
                return jq.each(function () {
                    var opts = $(this).datetimebox("options");
                    $(this).datetimebox("setValue", opts.originalValue);
                });
            }
        };
        $.fn.datetimebox.parseOptions = function (_a29) {
            var t = $(_a29);
            return $.extend({}, $.fn.datebox.parseOptions(_a29), $.parser.parseOptions(_a29, ["timeSeparator", "spinnerWidth", {showSeconds: "boolean"}]));
        };
        $.fn.datetimebox.defaults = $.extend({}, $.fn.datebox.defaults, {
            spinnerWidth: "100%", showSeconds: true, timeSeparator: ":", keyHandler: {
                up: function (e) {
                }, down: function (e) {
                }, left: function (e) {
                }, right: function (e) {
                }, enter: function (e) {
                    _a19(this);
                }, query: function (q, e) {
                    _a16(this, q);
                }
            }, buttons: [{
                text: function (_a2a) {
                    return $(_a2a).datetimebox("options").currentText;
                }, handler: function (_a2b) {
                    var opts = $(_a2b).datetimebox("options");
                    _a18(_a2b, opts.formatter.call(_a2b, new Date()));
                    $(_a2b).datetimebox("hidePanel");
                }
            }, {
                text: function (_a2c) {
                    return $(_a2c).datetimebox("options").okText;
                }, handler: function (_a2d) {
                    _a19(_a2d);
                }
            }, {
                text: function (_a2e) {
                    return $(_a2e).datetimebox("options").closeText;
                }, handler: function (_a2f) {
                    $(_a2f).datetimebox("hidePanel");
                }
            }], formatter: function (date) {
                var h = date.getHours();
                var M = date.getMinutes();
                var s = date.getSeconds();

                function _a30(_a31) {
                    return (_a31 < 10 ? "0" : "") + _a31;
                };
                var _a32 = $(this).datetimebox("spinner").timespinner("options").separator;
                var r = $.fn.datebox.defaults.formatter(date) + " " + _a30(h) + _a32 + _a30(M);
                if ($(this).datetimebox("options").showSeconds) {
                    r += _a32 + _a30(s);
                }
                return r;
            }, parser: function (s) {
                if ($.trim(s) == "") {
                    return new Date();
                }
                var dt = s.split(" ");
                var d = $.fn.datebox.defaults.parser(dt[0]);
                if (dt.length < 2) {
                    return d;
                }
                var _a33 = $(this).datetimebox("spinner").timespinner("options").separator;
                var tt = dt[1].split(_a33);
                var hour = parseInt(tt[0], 10) || 0;
                var _a34 = parseInt(tt[1], 10) || 0;
                var _a35 = parseInt(tt[2], 10) || 0;
                return new Date(d.getFullYear(), d.getMonth(), d.getDate(), hour, _a34, _a35);
            }
        });
    })(jQuery);
    (function ($) {
        function init(_a36) {
            var _a37 = $("<div class=\"slider\">" + "<div class=\"slider-inner\">" + "<a href=\"javascript:void(0)\" class=\"slider-handle\"></a>" + "<span class=\"slider-tip\"></span>" + "</div>" + "<div class=\"slider-rule\"></div>" + "<div class=\"slider-rulelabel\"></div>" + "<div style=\"clear:both\"></div>" + "<input type=\"hidden\" class=\"slider-value\">" + "</div>").insertAfter(_a36);
            var t = $(_a36);
            t.addClass("slider-f").hide();
            var name = t.attr("name");
            if (name) {
                _a37.find("input.slider-value").attr("name", name);
                t.removeAttr("name").attr("sliderName", name);
            }
            _a37.bind("_resize", function (e, _a38) {
                if ($(this).hasClass("easyui-fluid") || _a38) {
                    _a39(_a36);
                }
                return false;
            });
            return _a37;
        };
        function _a39(_a3a, _a3b) {
            var _a3c = $.data(_a3a, "slider");
            var opts = _a3c.options;
            var _a3d = _a3c.slider;
            if (_a3b) {
                if (_a3b.width) {
                    opts.width = _a3b.width;
                }
                if (_a3b.height) {
                    opts.height = _a3b.height;
                }
            }
            _a3d._size(opts);
            if (opts.mode == "h") {
                _a3d.css("height", "");
                _a3d.children("div").css("height", "");
            } else {
                _a3d.css("width", "");
                _a3d.children("div").css("width", "");
                _a3d.children("div.slider-rule,div.slider-rulelabel,div.slider-inner")._outerHeight(_a3d._outerHeight());
            }
            _a3e(_a3a);
        };
        function _a3f(_a40) {
            var _a41 = $.data(_a40, "slider");
            var opts = _a41.options;
            var _a42 = _a41.slider;
            var aa = opts.mode == "h" ? opts.rule : opts.rule.slice(0).reverse();
            if (opts.reversed) {
                aa = aa.slice(0).reverse();
            }
            _a43(aa);
            function _a43(aa) {
                var rule = _a42.find("div.slider-rule");
                var _a44 = _a42.find("div.slider-rulelabel");
                rule.empty();
                _a44.empty();
                for (var i = 0; i < aa.length; i++) {
                    var _a45 = i * 100 / (aa.length - 1) + "%";
                    var span = $("<span></span>").appendTo(rule);
                    span.css((opts.mode == "h" ? "left" : "top"), _a45);
                    if (aa[i] != "|") {
                        span = $("<span></span>").appendTo(_a44);
                        span.html(aa[i]);
                        if (opts.mode == "h") {
                            span.css({left: _a45, marginLeft: -Math.round(span.outerWidth() / 2)});
                        } else {
                            span.css({top: _a45, marginTop: -Math.round(span.outerHeight() / 2)});
                        }
                    }
                }
            };
        };
        function _a46(_a47) {
            var _a48 = $.data(_a47, "slider");
            var opts = _a48.options;
            var _a49 = _a48.slider;
            _a49.removeClass("slider-h slider-v slider-disabled");
            _a49.addClass(opts.mode == "h" ? "slider-h" : "slider-v");
            _a49.addClass(opts.disabled ? "slider-disabled" : "");
            var _a4a = _a49.find(".slider-inner");
            _a4a.html("<a href=\"javascript:void(0)\" class=\"slider-handle\"></a>" + "<span class=\"slider-tip\"></span>");
            if (opts.range) {
                _a4a.append("<a href=\"javascript:void(0)\" class=\"slider-handle\"></a>" + "<span class=\"slider-tip\"></span>");
            }
            _a49.find("a.slider-handle").draggable({
                axis: opts.mode, cursor: "pointer", disabled: opts.disabled, onDrag: function (e) {
                    var left = e.data.left;
                    var _a4b = _a49.width();
                    if (opts.mode != "h") {
                        left = e.data.top;
                        _a4b = _a49.height();
                    }
                    if (left < 0 || left > _a4b) {
                        return false;
                    } else {
                        _a4c(left);
                        return false;
                    }
                }, onBeforeDrag: function () {
                    _a48.isDragging = true;
                }, onStartDrag: function () {
                    opts.onSlideStart.call(_a47, opts.value);
                }, onStopDrag: function (e) {
                    _a4c(opts.mode == "h" ? e.data.left : e.data.top);
                    opts.onSlideEnd.call(_a47, opts.value);
                    opts.onComplete.call(_a47, opts.value);
                    _a48.isDragging = false;
                }
            });
            _a49.find("div.slider-inner").unbind(".slider").bind("mousedown.slider", function (e) {
                if (_a48.isDragging || opts.disabled) {
                    return;
                }
                var pos = $(this).offset();
                _a4c(opts.mode == "h" ? (e.pageX - pos.left) : (e.pageY - pos.top));
                opts.onComplete.call(_a47, opts.value);
            });
            function _a4c(pos) {
                var _a4d = _a4e(_a47, pos);
                var s = Math.abs(_a4d % opts.step);
                if (s < opts.step / 2) {
                    _a4d -= s;
                } else {
                    _a4d = _a4d - s + opts.step;
                }
                if (opts.range) {
                    var v1 = opts.value[0];
                    var v2 = opts.value[1];
                    var m = parseFloat((v1 + v2) / 2);
                    if (_a4d < v1) {
                        v1 = _a4d;
                    } else {
                        if (_a4d > v2) {
                            v2 = _a4d;
                        } else {
                            _a4d < m ? v1 = _a4d : v2 = _a4d;
                        }
                    }
                    $(_a47).slider("setValues", [v1, v2]);
                } else {
                    $(_a47).slider("setValue", _a4d);
                }
            };
        };
        function _a4f(_a50, _a51) {
            var _a52 = $.data(_a50, "slider");
            var opts = _a52.options;
            var _a53 = _a52.slider;
            var _a54 = $.isArray(opts.value) ? opts.value : [opts.value];
            var _a55 = [];
            if (!$.isArray(_a51)) {
                _a51 = $.map(String(_a51).split(opts.separator), function (v) {
                    return parseFloat(v);
                });
            }
            _a53.find(".slider-value").remove();
            var name = $(_a50).attr("sliderName") || "";
            for (var i = 0; i < _a51.length; i++) {
                var _a56 = _a51[i];
                if (_a56 < opts.min) {
                    _a56 = opts.min;
                }
                if (_a56 > opts.max) {
                    _a56 = opts.max;
                }
                var _a57 = $("<input type=\"hidden\" class=\"slider-value\">").appendTo(_a53);
                _a57.attr("name", name);
                _a57.val(_a56);
                _a55.push(_a56);
                var _a58 = _a53.find(".slider-handle:eq(" + i + ")");
                var tip = _a58.next();
                var pos = _a59(_a50, _a56);
                if (opts.showTip) {
                    tip.show();
                    tip.html(opts.tipFormatter.call(_a50, _a56));
                } else {
                    tip.hide();
                }
                if (opts.mode == "h") {
                    var _a5a = "left:" + pos + "px;";
                    _a58.attr("style", _a5a);
                    tip.attr("style", _a5a + "margin-left:" + (-Math.round(tip.outerWidth() / 2)) + "px");
                } else {
                    var _a5a = "top:" + pos + "px;";
                    _a58.attr("style", _a5a);
                    tip.attr("style", _a5a + "margin-left:" + (-Math.round(tip.outerWidth())) + "px");
                }
            }
            opts.value = opts.range ? _a55 : _a55[0];
            $(_a50).val(opts.range ? _a55.join(opts.separator) : _a55[0]);
            if (_a54.join(",") != _a55.join(",")) {
                opts.onChange.call(_a50, opts.value, (opts.range ? _a54 : _a54[0]));
            }
        };
        function _a3e(_a5b) {
            var opts = $.data(_a5b, "slider").options;
            var fn = opts.onChange;
            opts.onChange = function () {
            };
            _a4f(_a5b, opts.value);
            opts.onChange = fn;
        };
        function _a59(_a5c, _a5d) {
            var _a5e = $.data(_a5c, "slider");
            var opts = _a5e.options;
            var _a5f = _a5e.slider;
            var size = opts.mode == "h" ? _a5f.width() : _a5f.height();
            var pos = opts.converter.toPosition.call(_a5c, _a5d, size);
            if (opts.mode == "v") {
                pos = _a5f.height() - pos;
            }
            if (opts.reversed) {
                pos = size - pos;
            }
            return pos.toFixed(0);
        };
        function _a4e(_a60, pos) {
            var _a61 = $.data(_a60, "slider");
            var opts = _a61.options;
            var _a62 = _a61.slider;
            var size = opts.mode == "h" ? _a62.width() : _a62.height();
            var _a63 = opts.converter.toValue.call(_a60, opts.mode == "h" ? (opts.reversed ? (size - pos) : pos) : (size - pos), size);
            return _a63.toFixed(0);
        };
        $.fn.slider = function (_a64, _a65) {
            if (typeof _a64 == "string") {
                return $.fn.slider.methods[_a64](this, _a65);
            }
            _a64 = _a64 || {};
            return this.each(function () {
                var _a66 = $.data(this, "slider");
                if (_a66) {
                    $.extend(_a66.options, _a64);
                } else {
                    _a66 = $.data(this, "slider", {
                        options: $.extend({}, $.fn.slider.defaults, $.fn.slider.parseOptions(this), _a64),
                        slider: init(this)
                    });
                    $(this).removeAttr("disabled");
                }
                var opts = _a66.options;
                opts.min = parseFloat(opts.min);
                opts.max = parseFloat(opts.max);
                if (opts.range) {
                    if (!$.isArray(opts.value)) {
                        opts.value = $.map(String(opts.value).split(opts.separator), function (v) {
                            return parseFloat(v);
                        });
                    }
                    if (opts.value.length < 2) {
                        opts.value.push(opts.max);
                    }
                } else {
                    opts.value = parseFloat(opts.value);
                }
                opts.step = parseFloat(opts.step);
                opts.originalValue = opts.value;
                _a46(this);
                _a3f(this);
                _a39(this);
            });
        };
        $.fn.slider.methods = {
            options: function (jq) {
                return $.data(jq[0], "slider").options;
            }, destroy: function (jq) {
                return jq.each(function () {
                    $.data(this, "slider").slider.remove();
                    $(this).remove();
                });
            }, resize: function (jq, _a67) {
                return jq.each(function () {
                    _a39(this, _a67);
                });
            }, getValue: function (jq) {
                return jq.slider("options").value;
            }, getValues: function (jq) {
                return jq.slider("options").value;
            }, setValue: function (jq, _a68) {
                return jq.each(function () {
                    _a4f(this, [_a68]);
                });
            }, setValues: function (jq, _a69) {
                return jq.each(function () {
                    _a4f(this, _a69);
                });
            }, clear: function (jq) {
                return jq.each(function () {
                    var opts = $(this).slider("options");
                    _a4f(this, opts.range ? [opts.min, opts.max] : [opts.min]);
                });
            }, reset: function (jq) {
                return jq.each(function () {
                    var opts = $(this).slider("options");
                    $(this).slider(opts.range ? "setValues" : "setValue", opts.originalValue);
                });
            }, enable: function (jq) {
                return jq.each(function () {
                    $.data(this, "slider").options.disabled = false;
                    _a46(this);
                });
            }, disable: function (jq) {
                return jq.each(function () {
                    $.data(this, "slider").options.disabled = true;
                    _a46(this);
                });
            }
        };
        $.fn.slider.parseOptions = function (_a6a) {
            var t = $(_a6a);
            return $.extend({}, $.parser.parseOptions(_a6a, ["width", "height", "mode", {
                reversed: "boolean",
                showTip: "boolean",
                range: "boolean",
                min: "number",
                max: "number",
                step: "number"
            }]), {
                value: (t.val() || undefined),
                disabled: (t.attr("disabled") ? true : undefined),
                rule: (t.attr("rule") ? eval(t.attr("rule")) : undefined)
            });
        };
        $.fn.slider.defaults = {
            width: "auto",
            height: "auto",
            mode: "h",
            reversed: false,
            showTip: false,
            disabled: false,
            range: false,
            value: 0,
            separator: ",",
            min: 0,
            max: 100,
            step: 1,
            rule: [],
            tipFormatter: function (_a6b) {
                return _a6b;
            },
            converter: {
                toPosition: function (_a6c, size) {
                    var opts = $(this).slider("options");
                    return (_a6c - opts.min) / (opts.max - opts.min) * size;
                }, toValue: function (pos, size) {
                    var opts = $(this).slider("options");
                    return opts.min + (opts.max - opts.min) * (pos / size);
                }
            },
            onChange: function (_a6d, _a6e) {
            },
            onSlideStart: function (_a6f) {
            },
            onSlideEnd: function (_a70) {
            },
            onComplete: function (_a71) {
            }
        };
    })(jQuery);
}
if ( typeof module === "object" && typeof module.exports === "object" ){
    module.exports=_easyui;
}else{
    _easyui(window.jQuery);
}

},{}],3:[function(require,module,exports){
module.exports={
        //json与string互转
        obj2str:function(obj){return typeof obj=='object'?JSON.stringify(obj):obj;},
        str2obj:function(str){return typeof str=='string'?JSON.parse(str):str;},
        //简写原生选择器，支持传入第二参数iframe的document

        byid:function(id,doc){return (doc||document).getElementById(id);},
        bytag:function(tag,doc){return (doc||document).getElementsByTagName(tag);},
        //获取位置
        getRect:function(ele){return ele.getBoundingClientRect();},
        //调试
        log:function (param){typeof console!='undefined' && console.log(param);},
        info:function(param){typeof console!='undefined' && console.info(param);},
        warn:function(param){typeof console!='undefined' && console.warn(param);},
        error:function(param){typeof console!='undefined' && console.error(param);},
        logex:function(msg,cssTxt){
                //默认fontsize 18px写前面，后写的可覆盖
                cssTxt= cssTxt ? 'font-size:18px;'+cssTxt : 'font-size:18px;color:red;';
                console.log('%c'+msg,cssTxt);
            },
        //类型判断
        typeOf:(function(){
                var dic={'[object Object]':'object','[object RegExp]':'regexp','[object Date]':'date','[object Array]':'array','[object String]':'string','[object Number]':'number','[object Boolean]':'boolean','[object Error]':'error'};
                var stringify=Object.prototype.toString;
                return function(obj,plus){
                    if(typeof obj !='object')
                        return typeof obj;
                    else if(obj===null)
                        return 'null';
                    else if(plus)
                        return dic[stringify.apply(obj)] || stringify.call(obj).slice(8,-1).toLowerCase()|| 'object';
                    else
                        return dic[stringify.apply(obj)] || 'object';
                };
                })(),
        //queryStr解析
        queryParse:function (p){
                var result = location.search.match(new RegExp("[\?\&][^\?\&]+=[^\?\&]*","g"));
                if(result==null)return false;
                var j=result.length;
                var obj={},arr=[];
                for(var i=0;i<j;i++){
                    arr=result[i].slice(1).split('=');
                    obj[arr[0]]=arr[1];
                }
                return p ? obj[p]||'' : obj;
            },
        //防止百分号标签空白输出在页面上
        getJspData:function(data){
                return data||null;
            },
        replaceDDD:function(value){return value.replace(/\<ddd\>/gmi,"'");},
        //原生弹窗的封装
        open2:function(){
                var features='';
                var config={status:0,width:top.getWidth()-40,height:top.getHeight()-70,top:20,left:20,scrollbars:1,resizable:1,fullscreen:0,channelmode:0,directories:1,help:0,menubar:0,toolbar:0,location:0};
                var obj=typeof arguments[0]=='object' ? arguments[0]:{url:arguments[0],name:arguments[1],width:arguments[2],height:arguments[3],left:arguments[4],top:arguments[5]} ;
                for (var n in obj){
                    typeof obj[n]!='undefined' && (config[n]=obj[n]);
                }
                for (var m in config){
                    if(m!='url' || m!='name')
                    features += ','+ m + '=' +config[m];
                }
                //log(url +'\n'+ name +'\n'+ features.slice(1))
                var win=window.open(config.url,config.name||'_blank',features.slice(1));
                return win;
            },
        //简单加载样式 304改为走200，缓存10天
        $style:function(src,cb){
                //src.match(/^http|^\.|^\//)!=null || (src=top.path+'/style/'+src);
                src.match(/\.css$/i)!=null || (src+='.css');
                //src+='?version='+Date.format('YYYYMMDD').slice(0,-1);
                var link=document.createElement("link");
                link.rel="stylesheet";
                link.type="text/css";
                link.media="screen";
                link.href=src+(window.config.distVersion?'?version='+window.config.distVersion:'');
                document.head.appendChild(link);
                cb && cb.call(link);
            },
        $script:function (src,cb){
            var bol=false;
            var tag=document.createElement("script");
            tag.type="text/javascript";
            tag.language="javascript";
            //tag.setAttribute('async','async');
            //tag.setAttribute('defer','defer');
            src.match(/\.js$/i)!=null || (src+='.js');
            tag.src=src+(window.config.distVersion?'?version='+window.config.distVersion:'');
            tag.onload=tag.onreadystatechange=function(){
                if(!bol&&(!tag.readyState||tag.readyState=="loaded"||tag.readyState=="complete")){
                    bol=true;
                    tag.onload=tag.onreadystatechange=null;
                    if(cb){
                        cb.call(tag);
                    }
                }
            };
            document.head.appendChild(tag);
        },
        importing:function(){
            var ags=arguments;
            var ag=ags[0];
            if(typeof ag!='string'){
                typeof ag=='function' && ag();
                return false;
            }
            //识别插件
            var plugins=window.config.plugins;
            if(plugins[ag]){
                ag=(top.path||'')+'/dist/plugin/'+plugins[ag];
            }
            //对应默认文件夹
            else if(ag.indexOf('/')<0){
                if(ag.match(/.*.css$/i)){
                    ag=(top.path||'')+'/dist/css/'+ag;
                }
                if(ag.match(/.*.js$/i)){
                    ag=(top.path||'')+'/dist/js/'+ag;
                }
            }
            //识别加载方式
            window[ag.match(/.*\/css\/.+|.css$/i)?'$style':'$script'](ag,function(){
                window.importing.apply(this,[].slice.call(ags,1));
            })
        }
    };
},{}],4:[function(require,module,exports){
/*!
 * jQuery Cookie Plugin v1.4.1
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2013 Klaus Hartl
 * Released under the MIT license
 */
(function (factory) {
	if(typeof module === "object" && typeof module.exports === "object" ){
		//browserify
		module.exports = factory;
	} else if (typeof define === 'function' && define.amd) {
		// AMD
		define(['jquery'], factory);
	} else if (typeof exports === 'object') {
		// CommonJS
		//factory(require('jquery'));
	} else {
		// Browser globals
		factory(jQuery);
	}
}(function ($) {

	var pluses = /\+/g;

	function encode(s) {
		return config.raw ? s : encodeURIComponent(s);
	}

	function decode(s) {
		return config.raw ? s : decodeURIComponent(s);
	}

	function stringifyCookieValue(value) {
		return encode(config.json ? JSON.stringify(value) : String(value));
	}

	function parseCookieValue(s) {
		if (s.indexOf('"') === 0) {
			// This is a quoted cookie as according to RFC2068, unescape...
			s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
		}

		try {
			// Replace server-side written pluses with spaces.
			// If we can't decode the cookie, ignore it, it's unusable.
			// If we can't parse the cookie, ignore it, it's unusable.
			s = decodeURIComponent(s.replace(pluses, ' '));
			return config.json ? JSON.parse(s) : s;
		} catch(e) {}
	}

	function read(s, converter) {
		var value = config.raw ? s : parseCookieValue(s);
		return $.isFunction(converter) ? converter(value) : value;
	}

	var config = $.cookie = function (key, value, options) {

		// Write

		if (value !== undefined && !$.isFunction(value)) {
			options = $.extend({}, config.defaults, options);

			if (typeof options.expires === 'number') {
				var days = options.expires, t = options.expires = new Date();
				t.setTime(+t + days * 864e+5);
			}

			return (document.cookie = [
				encode(key), '=', stringifyCookieValue(value),
				options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
				options.path    ? '; path=' + options.path : '',
				options.domain  ? '; domain=' + options.domain : '',
				options.secure  ? '; secure' : ''
			].join(''));
		}

		// Read

		var result = key ? undefined : {};

		// To prevent the for loop in the first place assign an empty array
		// in case there are no cookies at all. Also prevents odd result when
		// calling $.cookie().
		var cookies = document.cookie ? document.cookie.split('; ') : [];

		for (var i = 0, l = cookies.length; i < l; i++) {
			var parts = cookies[i].split('=');
			var name = decode(parts.shift());
			var cookie = parts.join('=');

			if (key && key === name) {
				// If second argument (value) is a function it's a converter...
				result = read(cookie, value);
				break;
			}

			// Prevent storing a cookie that we couldn't decode.
			if (!key && (cookie = read(cookie)) !== undefined) {
				result[name] = cookie;
			}
		}

		return result;
	};

	config.defaults = {};

	$.removeCookie = function (key, options) {
		if ($.cookie(key) === undefined) {
			return false;
		}

		// Must not alter options, thus extending a fresh object...
		$.cookie(key, '', $.extend({}, options, { expires: -1 }));
		return !$.cookie(key);
	};

}));

},{}],5:[function(require,module,exports){
/*!
 * jQuery JavaScript Library v2.2.0
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-01-08T20:02Z
 */

(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Support: Firefox 18+
// Can't be in strict mode, several libs including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
//"use strict";
var arr = [];

var document = window.document;

var slice = arr.slice;

var concat = arr.concat;

var push = arr.push;

var indexOf = arr.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	version = "2.2.0",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: arr.sort,
	splice: arr.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// Skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction( target ) ) {
		target = {};
	}

	// Extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = jQuery.isArray( copy ) ) ) ) {

					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray( src ) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject( src ) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	isFunction: function( obj ) {
		return jQuery.type( obj ) === "function";
	},

	isArray: Array.isArray,

	isWindow: function( obj ) {
		return obj != null && obj === obj.window;
	},

	isNumeric: function( obj ) {

		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		// adding 1 corrects loss of precision from parseFloat (#15100)
		var realStringObj = obj && obj.toString();
		return !jQuery.isArray( obj ) && ( realStringObj - parseFloat( realStringObj ) + 1 ) >= 0;
	},

	isPlainObject: function( obj ) {

		// Not plain objects:
		// - Any object or value whose internal [[Class]] property is not "[object Object]"
		// - DOM nodes
		// - window
		if ( jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		if ( obj.constructor &&
				!hasOwn.call( obj.constructor.prototype, "isPrototypeOf" ) ) {
			return false;
		}

		// If the function hasn't returned already, we're confident that
		// |obj| is a plain object, created by {} or constructed with new Object
		return true;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}

		// Support: Android<4.0, iOS<6 (functionish RegExp)
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call( obj ) ] || "object" :
			typeof obj;
	},

	// Evaluates a script in a global context
	globalEval: function( code ) {
		var script,
			indirect = eval;

		code = jQuery.trim( code );

		if ( code ) {

			// If the code includes a valid, prologue position
			// strict mode pragma, execute code by injecting a
			// script tag into the document.
			if ( code.indexOf( "use strict" ) === 1 ) {
				script = document.createElement( "script" );
				script.text = code;
				document.head.appendChild( script ).parentNode.removeChild( script );
			} else {

				// Otherwise, avoid the DOM node creation, insertion
				// and removal by using an indirect global eval

				indirect( code );
			}
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Support: IE9-11+
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		return arr == null ? -1 : indexOf.call( arr, elem, i );
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		for ( ; j < len; j++ ) {
			first[ i++ ] = second[ j ];
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var tmp, args, proxy;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: Date.now,

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

// JSHint would error on this code due to the Symbol not being defined in ES5.
// Defining this global in .jshintrc would create a danger of using the global
// unguarded in another place, it seems safer to just disable JSHint for these
// three lines.
/* jshint ignore: start */
if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = arr[ Symbol.iterator ];
}
/* jshint ignore: end */

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
function( i, name ) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
} );

function isArrayLike( obj ) {

	// Support: iOS 8.2 (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.2.1
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2015-10-17
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than dist
	// http://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",

	// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var m, i, elem, nid, nidselect, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {

		if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
			setDocument( context );
		}
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {

				// ID selector
				if ( (m = match[1]) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( (elem = context.getElementById( m )) ) {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}

					// Element context
					} else {

						// Support: IE, Opera, Webkit
						// TODO: identify versions
						// getElementById can match elements by name instead of ID
						if ( newContext && (elem = newContext.getElementById( m )) &&
							contains( context, elem ) &&
							elem.id === m ) {

							results.push( elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[2] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( (m = match[3]) && support.getElementsByClassName &&
					context.getElementsByClassName ) {

					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( support.qsa &&
				!compilerCache[ selector + " " ] &&
				(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {

				if ( nodeType !== 1 ) {
					newContext = context;
					newSelector = selector;

				// qSA looks outside Element context, which is not what we want
				// Thanks to Andrew Dupont for this workaround technique
				// Support: IE <=8
				// Exclude object elements
				} else if ( context.nodeName.toLowerCase() !== "object" ) {

					// Capture the context ID, setting it first if necessary
					if ( (nid = context.getAttribute( "id" )) ) {
						nid = nid.replace( rescape, "\\$&" );
					} else {
						context.setAttribute( "id", (nid = expando) );
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					nidselect = ridentifier.test( nid ) ? "#" + nid : "[id='" + nid + "']";
					while ( i-- ) {
						groups[i] = nidselect + " " + toSelector( groups[i] );
					}
					newSelector = groups.join( "," );

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;
				}

				if ( newSelector ) {
					try {
						push.apply( results,
							newContext.querySelectorAll( newSelector )
						);
						return results;
					} catch ( qsaError ) {
					} finally {
						if ( nid === expando ) {
							context.removeAttribute( "id" );
						}
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with dist prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = arr.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, parent,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	docElem = document.documentElement;
	documentIsHTML = !isXML( document );

	// Support: IE 9-11, Edge
	// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
	if ( (parent = document.defaultView) && parent.top !== parent ) {
		// Support: IE 11
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", unloadHandler, false );

		// Support: IE 9 - 10 only
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( document.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( document.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !document.getElementsByName || !document.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var m = context.getElementById( id );
				return m ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			docElem.appendChild( div ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
			if ( !div.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibing-combinator selector` fails
			if ( !div.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = document.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully self-exclusive
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === document ? -1 :
				b === document ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		!compilerCache[ expr + " " ] &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, uniqueCache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) {

										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {

							// Seek `elem` from a previously-cached index

							// ...in a gzip-friendly way
							node = parent;
							outerCache = node[ expando ] || (node[ expando ] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ node.uniqueID ] ||
								(outerCache[ node.uniqueID ] = {});

							cache = uniqueCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						} else {
							// Use previously-cached element index if available
							if ( useCache ) {
								// ...in a gzip-friendly way
								node = elem;
								outerCache = node[ expando ] || (node[ expando ] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {
								// Use the same loop as above to seek `elem` from the start
								while ( (node = ++nodeIndex && node && node[ dir ] ||
									(diff = nodeIndex = 0) || start.pop()) ) {

									if ( ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] || (node[ expando ] = {});

											// Support: IE <9 only
											// Defend against cloned attroperties (jQuery gh-1709)
											uniqueCache = outerCache[ node.uniqueID ] ||
												(outerCache[ node.uniqueID ] = {});

											uniqueCache[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, uniqueCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});

						// Support: IE <9 only
						// Defend against cloned attroperties (jQuery gh-1709)
						uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});

						if ( (oldCache = uniqueCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							uniqueCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context === document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					if ( !context && elem.ownerDocument !== document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context || document, xml) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};


var siblings = function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = ( /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/ );



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		} );

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( indexOf.call( qualifier, elem ) > -1 ) !== not;
	} );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i,
			len = this.length,
			ret = [],
			self = this;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Method init() accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector[ 0 ] === "<" &&
				selector[ selector.length - 1 ] === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// Option to run scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					// Support: Blackberry 4.6
					// gEBID returns nodes no longer in the document (#6963)
					if ( elem && elem.parentNode ) {

						// Inject the element directly into the jQuery object
						this.length = 1;
						this[ 0 ] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return root.ready !== undefined ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// Methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var targets = jQuery( target, this ),
			l = targets.length;

		return this.filter( function() {
			var i = 0;
			for ( ; i < l; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

				// Always skip document fragments
				if ( cur.nodeType < 11 && ( pos ?
					pos.index( cur ) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector( cur, selectors ) ) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within the set
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// Index in selector
		if ( typeof elem === "string" ) {
			return indexOf.call( jQuery( elem ), this[ 0 ] );
		}

		// Locate the position of the desired element
		return indexOf.call( this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem
		);
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	while ( ( cur = cur[ dir ] ) && cur.nodeType !== 1 ) {}
	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
		return elem.contentDocument || jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var matched = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			matched = jQuery.filter( selector, matched );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				jQuery.uniqueSort( matched );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				matched.reverse();
			}
		}

		return this.pushStack( matched );
	};
} );
var rnotwhite = ( /\S+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( jQuery.isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && jQuery.type( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = queue = [];
				if ( !memory ) {
					list = memory = "";
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks( "once memory" ), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks( "memory" ) ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];

							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this === promise ? newDefer.promise() : this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add( function() {

					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 ||
				( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred.
			// If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );
					} else if ( !( --remaining ) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// Add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.progress( updateFunc( i, progressContexts, progressValues ) )
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject );
				} else {
					--remaining;
				}
			}
		}

		// If we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
} );


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {

	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
} );

/**
 * The ready event handler and self cleanup method
 */
function completed() {
	document.removeEventListener( "DOMContentLoaded", completed );
	window.removeEventListener( "load", completed );
	jQuery.ready();
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called
		// after the browser event has already occurred.
		// Support: IE9-10 only
		// Older IE sometimes signals "interactive" too soon
		if ( document.readyState === "complete" ||
			( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

			// Handle it asynchronously to allow scripts the opportunity to delay ready
			window.setTimeout( jQuery.ready );

		} else {

			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed );
		}
	}
	return readyList.promise( obj );
};

// Kick off the DOM ready check even if the user does not
jQuery.ready.promise();




// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		len = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < len; i++ ) {
				fn(
					elems[ i ], key, raw ?
					value :
					value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			len ? fn( elems[ 0 ], key ) : emptyGet;
};
var acceptData = function( owner ) {

	// Accepts only:
	//  - Node
	//    - Node.ELEMENT_NODE
	//    - Node.DOCUMENT_NODE
	//  - Object
	//    - Any
	/* jshint -W018 */
	return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
};




function Data() {
	this.expando = jQuery.expando + Data.uid++;
}

Data.uid = 1;

Data.prototype = {

	register: function( owner, initial ) {
		var value = initial || {};

		// If it is a node unlikely to be stringify-ed or looped over
		// use plain assignment
		if ( owner.nodeType ) {
			owner[ this.expando ] = value;

		// Otherwise secure it in a non-enumerable, non-writable property
		// configurability must be true to allow the property to be
		// deleted with the delete operator
		} else {
			Object.defineProperty( owner, this.expando, {
				value: value,
				writable: true,
				configurable: true
			} );
		}
		return owner[ this.expando ];
	},
	cache: function( owner ) {

		// We can accept data for non-element nodes in modern browsers,
		// but we should not, see #8335.
		// Always return an empty object.
		if ( !acceptData( owner ) ) {
			return {};
		}

		// Check if the owner object already has a cache
		var value = owner[ this.expando ];

		// If not, create one
		if ( !value ) {
			value = {};

			// We can accept data for non-element nodes in modern browsers,
			// but we should not, see #8335.
			// Always return an empty object.
			if ( acceptData( owner ) ) {

				// If it is a node unlikely to be stringify-ed or looped over
				// use plain assignment
				if ( owner.nodeType ) {
					owner[ this.expando ] = value;

				// Otherwise secure it in a non-enumerable property
				// configurable must be true to allow the property to be
				// deleted when data is removed
				} else {
					Object.defineProperty( owner, this.expando, {
						value: value,
						configurable: true
					} );
				}
			}
		}

		return value;
	},
	set: function( owner, data, value ) {
		var prop,
			cache = this.cache( owner );

		// Handle: [ owner, key, value ] args
		if ( typeof data === "string" ) {
			cache[ data ] = value;

		// Handle: [ owner, { properties } ] args
		} else {

			// Copy the properties one-by-one to the cache object
			for ( prop in data ) {
				cache[ prop ] = data[ prop ];
			}
		}
		return cache;
	},
	get: function( owner, key ) {
		return key === undefined ?
			this.cache( owner ) :
			owner[ this.expando ] && owner[ this.expando ][ key ];
	},
	access: function( owner, key, value ) {
		var stored;

		// In cases where either:
		//
		//   1. No key was specified
		//   2. A string key was specified, but no value provided
		//
		// Take the "read" path and allow the get method to determine
		// which value to return, respectively either:
		//
		//   1. The entire cache object
		//   2. The data stored at the key
		//
		if ( key === undefined ||
				( ( key && typeof key === "string" ) && value === undefined ) ) {

			stored = this.get( owner, key );

			return stored !== undefined ?
				stored : this.get( owner, jQuery.camelCase( key ) );
		}

		// When the key is not a string, or both a key and value
		// are specified, set or extend (existing objects) with either:
		//
		//   1. An object of properties
		//   2. A key and value
		//
		this.set( owner, key, value );

		// Since the "set" path can have two possible entry points
		// return the expected data based on which path was taken[*]
		return value !== undefined ? value : key;
	},
	remove: function( owner, key ) {
		var i, name, camel,
			cache = owner[ this.expando ];

		if ( cache === undefined ) {
			return;
		}

		if ( key === undefined ) {
			this.register( owner );

		} else {

			// Support array or space separated string of keys
			if ( jQuery.isArray( key ) ) {

				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = key.concat( key.map( jQuery.camelCase ) );
			} else {
				camel = jQuery.camelCase( key );

				// Try the string as a key before any manipulation
				if ( key in cache ) {
					name = [ key, camel ];
				} else {

					// If a key with the spaces exists, use it.
					// Otherwise, create an array by matching non-whitespace
					name = camel;
					name = name in cache ?
						[ name ] : ( name.match( rnotwhite ) || [] );
				}
			}

			i = name.length;

			while ( i-- ) {
				delete cache[ name[ i ] ];
			}
		}

		// Remove the expando if there's no more data
		if ( key === undefined || jQuery.isEmptyObject( cache ) ) {

			// Support: Chrome <= 35-45+
			// Webkit & Blink performance suffers when deleting properties
			// from DOM nodes, so set to undefined instead
			// https://code.google.com/p/chromium/issues/detail?id=378607
			if ( owner.nodeType ) {
				owner[ this.expando ] = undefined;
			} else {
				delete owner[ this.expando ];
			}
		}
	},
	hasData: function( owner ) {
		var cache = owner[ this.expando ];
		return cache !== undefined && !jQuery.isEmptyObject( cache );
	}
};
var dataPriv = new Data();

var dataUser = new Data();



//	Implementation Summary
//
//	1. Enforce API surface and semantic compatibility with 1.9.x branch
//	2. Improve the module's maintainability by reducing the storage
//		paths to a single mechanism.
//	3. Use the same single mechanism to support "private" and "user" data.
//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
//	5. Avoid exposing implementation details on user objects (eg. expando properties)
//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /[A-Z]/g;

function dataAttr( elem, key, data ) {
	var name;

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {
		name = "data-" + key.replace( rmultiDash, "-$&" ).toLowerCase();
		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :

					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			dataUser.set( elem, key, data );
		} else {
			data = undefined;
		}
	}
	return data;
}

jQuery.extend( {
	hasData: function( elem ) {
		return dataUser.hasData( elem ) || dataPriv.hasData( elem );
	},

	data: function( elem, name, data ) {
		return dataUser.access( elem, name, data );
	},

	removeData: function( elem, name ) {
		dataUser.remove( elem, name );
	},

	// TODO: Now that all calls to _data and _removeData have been replaced
	// with direct calls to dataPriv methods, these can be deprecated.
	_data: function( elem, name, data ) {
		return dataPriv.access( elem, name, data );
	},

	_removeData: function( elem, name ) {
		dataPriv.remove( elem, name );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = dataUser.get( elem );

				if ( elem.nodeType === 1 && !dataPriv.get( elem, "hasDataAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					dataPriv.set( elem, "hasDataAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				dataUser.set( this, key );
			} );
		}

		return access( this, function( value ) {
			var data, camelKey;

			// The calling jQuery object (element matches) is not empty
			// (and therefore has an element appears at this[ 0 ]) and the
			// `value` parameter was not undefined. An empty jQuery object
			// will result in `undefined` for elem = this[ 0 ] which will
			// throw an exception if an attempt to read a data cache is made.
			if ( elem && value === undefined ) {

				// Attempt to get data from the cache
				// with the key as-is
				data = dataUser.get( elem, key ) ||

					// Try to find dashed key if it exists (gh-2779)
					// This is for 2.2.x only
					dataUser.get( elem, key.replace( rmultiDash, "-$&" ).toLowerCase() );

				if ( data !== undefined ) {
					return data;
				}

				camelKey = jQuery.camelCase( key );

				// Attempt to get data from the cache
				// with the key camelized
				data = dataUser.get( elem, camelKey );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to "discover" the data in
				// HTML5 custom data-* attrs
				data = dataAttr( elem, camelKey, undefined );
				if ( data !== undefined ) {
					return data;
				}

				// We tried really hard, but the data doesn't exist.
				return;
			}

			// Set the data...
			camelKey = jQuery.camelCase( key );
			this.each( function() {

				// First, attempt to store a copy or reference of any
				// data that might've been store with a camelCased key.
				var data = dataUser.get( this, camelKey );

				// For HTML5 data-* attribute interop, we have to
				// store property names with dashes in a camelCase form.
				// This might not apply to all properties...*
				dataUser.set( this, camelKey, value );

				// *... In the case of properties that might _actually_
				// have dashes, we need to also store a copy of that
				// unchanged property.
				if ( key.indexOf( "-" ) > -1 && data !== undefined ) {
					dataUser.set( this, key, value );
				}
			} );
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each( function() {
			dataUser.remove( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = dataPriv.get( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray( data ) ) {
					queue = dataPriv.access( elem, type, jQuery.makeArray( data ) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// Clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// Not public - generate a queueHooks object, or return the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return dataPriv.get( elem, key ) || dataPriv.access( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				dataPriv.remove( elem, [ type + "queue", key ] );
			} )
		} );
	}
} );

jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}

		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );

				// Ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},

	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = dataPriv.get( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {

		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" ||
			!jQuery.contains( elem.ownerDocument, elem );
	};



function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted,
		scale = 1,
		maxIterations = 20,
		currentValue = tween ?
			function() { return tween.cur(); } :
			function() { return jQuery.css( elem, prop, "" ); },
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		do {

			// If previous iteration zeroed out, double until we get *something*.
			// Use string for doubling so we don't accidentally see scale as unchanged below
			scale = scale || ".5";

			// Adjust and apply
			initialInUnit = initialInUnit / scale;
			jQuery.style( elem, prop, initialInUnit + unit );

		// Update scale, tolerating zero or NaN from tween.cur()
		// Break the loop if scale is unchanged or perfect, or if we've just had enough.
		} while (
			scale !== ( scale = currentValue() / initial ) && scale !== 1 && --maxIterations
		);
	}

	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([\w:-]+)/ );

var rscriptType = ( /^$|\/(?:java|ecma)script/i );



// We have to close these tags to support XHTML (#13200)
var wrapMap = {

	// Support: IE9
	option: [ 1, "<select multiple='multiple'>", "</select>" ],

	// XHTML parsers do not magically insert elements in the
	// same way that tag soup parsers do. So we cannot shorten
	// this by omitting <tbody> or other required elements.
	thead: [ 1, "<table>", "</table>" ],
	col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	_default: [ 0, "", "" ]
};

// Support: IE9
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;


function getAll( context, tag ) {

	// Support: IE9-11+
	// Use typeof to avoid zero-argument method invocation on host objects (#15151)
	var ret = typeof context.getElementsByTagName !== "undefined" ?
			context.getElementsByTagName( tag || "*" ) :
			typeof context.querySelectorAll !== "undefined" ?
				context.querySelectorAll( tag || "*" ) :
			[];

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], ret ) :
		ret;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		dataPriv.set(
			elems[ i ],
			"globalEval",
			!refElements || dataPriv.get( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/;

function buildFragment( elems, context, scripts, selection, ignored ) {
	var elem, tmp, tag, wrap, contains, j,
		fragment = context.createDocumentFragment(),
		nodes = [],
		i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( jQuery.type( elem ) === "object" ) {

				// Support: Android<4.1, PhantomJS<2
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || fragment.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;
				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Support: Android<4.1, PhantomJS<2
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, tmp.childNodes );

				// Remember the top-level container
				tmp = fragment.firstChild;

				// Ensure the created nodes are orphaned (#12392)
				tmp.textContent = "";
			}
		}
	}

	// Remove wrapper from fragment
	fragment.textContent = "";

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}
			continue;
		}

		contains = jQuery.contains( elem.ownerDocument, elem );

		// Append to fragment
		tmp = getAll( fragment.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( contains ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	return fragment;
}


( function() {
	var fragment = document.createDocumentFragment(),
		div = fragment.appendChild( document.createElement( "div" ) ),
		input = document.createElement( "input" );

	// Support: Android 4.0-4.3, Safari<=5.1
	// Check state lost if the name is set (#11217)
	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Safari<=5.1, Android<4.2
	// Older WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<=11+
	// Make sure textarea (and checkbox) defaultValue is properly cloned
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
} )();


var
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

// Support: IE9
// See #13393 for more info
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}

	if ( data == null && fn == null ) {

		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {

			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {

			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return this;
	}

	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {

			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {

		var handleObjIn, eventHandle, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.get( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = {};
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ?
					jQuery.event.dispatch.apply( elem, arguments ) : undefined;
			};
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var j, origCount, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.hasData( elem ) && dataPriv.get( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove data and the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			dataPriv.remove( elem, "handle events" );
		}
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the dist event object
		event = jQuery.event.fix( event );

		var i, j, ret, matched, handleObj,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( dataPriv.get( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) dist event
		args[ 0 ] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, matches, sel, handleObj,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Support (at least): Chrome, IE9
		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		//
		// Support: Firefox<=42+
		// Avoid non-left-click in FF but don't block IE radio events (#3861, gh-2343)
		if ( delegateCount && cur.nodeType &&
			( event.type !== "click" || isNaN( event.button ) || event.button < 1 ) ) {

			for ( ; cur !== this; cur = cur.parentNode || this ) {

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && ( cur.disabled !== true || event.type !== "click" ) ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push( { elem: cur, handlers: matches } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: this, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: ( "altKey bubbles cancelable ctrlKey currentTarget detail eventPhase " +
		"metaKey relatedTarget shiftKey target timeStamp view which" ).split( " " ),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split( " " ),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: ( "button buttons clientX clientY offsetX offsetY pageX pageY " +
			"screenX screenY toElement" ).split( " " ),
		filter: function( event, original ) {
			var eventDoc, doc, body,
				button = original.button;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX +
					( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) -
					( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY +
					( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) -
					( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: Cordova 2.5 (WebKit) (#13255)
		// All events should have a target; Cordova deviceready doesn't
		if ( !event.target ) {
			event.target = document;
		}

		// Support: Safari 6.0+, Chrome<28
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {

			// Fire dist event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					this.focus();
					return false;
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {

			// For checkbox, fire dist event so checked state will be right
			trigger: function() {
				if ( this.type === "checkbox" && this.click && jQuery.nodeName( this, "input" ) ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire dist .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	}
};

jQuery.removeEvent = function( elem, type, handle ) {

	// This "if" is needed for plain objects
	if ( elem.removeEventListener ) {
		elem.removeEventListener( type, handle );
	}
};

jQuery.Event = function( src, props ) {

	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: Android<4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;

		if ( e ) {
			e.preventDefault();
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( e ) {
			e.stopPropagation();
		}
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://code.google.com/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );

jQuery.fn.extend( {
	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {

			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {

			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	}
} );


var
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,

	// Support: IE 10-11, Edge 10240+
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

function manipulationTarget( elem, content ) {
	if ( jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ) {

		return elem.getElementsByTagName( "tbody" )[ 0 ] || elem;
	}

	return elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( elem.getAttribute( "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );

	if ( match ) {
		elem.type = match[ 1 ];
	} else {
		elem.removeAttribute( "type" );
	}

	return elem;
}

function cloneCopyEvent( src, dest ) {
	var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

	if ( dest.nodeType !== 1 ) {
		return;
	}

	// 1. Copy private data: events, handlers, etc.
	if ( dataPriv.hasData( src ) ) {
		pdataOld = dataPriv.access( src );
		pdataCur = dataPriv.set( dest, pdataOld );
		events = pdataOld.events;

		if ( events ) {
			delete pdataCur.handle;
			pdataCur.events = {};

			for ( type in events ) {
				for ( i = 0, l = events[ type ].length; i < l; i++ ) {
					jQuery.event.add( dest, type, events[ type ][ i ] );
				}
			}
		}
	}

	// 2. Copy user data
	if ( dataUser.hasData( src ) ) {
		udataOld = dataUser.access( src );
		udataCur = jQuery.extend( {}, udataOld );

		dataUser.set( dest, udataCur );
	}
}

// Fix IE bugs, see support tests
function fixInput( src, dest ) {
	var nodeName = dest.nodeName.toLowerCase();

	// Fails to persist the checked state of a cloned checkbox or radio button.
	if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		dest.checked = src.checked;

	// Fails to return the selected option to the default selected state when cloning options
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = concat.apply( [], args );

	var fragment, first, scripts, hasScripts, node, doc,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		isFunction = jQuery.isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( isFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( isFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}

	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (#8070).
			for ( ; i < l; i++ ) {
				node = fragment;

				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {

						// Support: Android<4.1, PhantomJS<2
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}

				callback.call( collection[ i ], node, i );
			}

			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Reenable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!dataPriv.access( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl ) {
								jQuery._evalUrl( node.src );
							}
						} else {
							jQuery.globalEval( node.textContent.replace( rcleanScript, "" ) );
						}
					}
				}
			}
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		nodes = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = nodes[ i ] ) != null; i++ ) {
		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html.replace( rxhtmlTag, "<$1></$2>" );
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var i, l, srcElements, destElements,
			clone = elem.cloneNode( true ),
			inPage = jQuery.contains( elem.ownerDocument, elem );

		// Fix IE cloning issues
		if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
				!jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			for ( i = 0, l = srcElements.length; i < l; i++ ) {
				fixInput( srcElements[ i ], destElements[ i ] );
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					cloneCopyEvent( srcElements[ i ], destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems ) {
		var data, elem, type,
			special = jQuery.event.special,
			i = 0;

		for ( ; ( elem = elems[ i ] ) !== undefined; i++ ) {
			if ( acceptData( elem ) ) {
				if ( ( data = elem[ dataPriv.expando ] ) ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Support: Chrome <= 35-45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataPriv.expando ] = undefined;
				}
				if ( elem[ dataUser.expando ] ) {

					// Support: Chrome <= 35-45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataUser.expando ] = undefined;
				}
			}
		}
	}
} );

jQuery.fn.extend( {

	// Keep domManip exposed until 3.0 (gh-2225)
	domManip: domManip,

	detach: function( selector ) {
		return remove( this, selector, true );
	},

	remove: function( selector ) {
		return remove( this, selector );
	},

	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().each( function() {
					if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
						this.textContent = value;
					}
				} );
		}, null, value, arguments.length );
	},

	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},

	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) {
			if ( elem.nodeType === 1 ) {

				// Prevent memory leaks
				jQuery.cleanData( getAll( elem, false ) );

				// Remove any remaining nodes
				elem.textContent = "";
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined && elem.nodeType === 1 ) {
				return elem.innerHTML;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {
						elem = this[ i ] || {};

						// Remove element nodes and prevent memory leaks
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch ( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}

		// Force callback invocation
		}, ignored );
	}
} );

jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1,
			i = 0;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Support: QtWebKit
			// .get() because push.apply(_, arraylike) throws
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );


var iframe,
	elemdisplay = {

		// Support: Firefox
		// We have to pre-define these values for FF (#10227)
		HTML: "block",
		BODY: "block"
	};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */

// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		display = jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = ( iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" ) )
				.appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = iframe[ 0 ].contentDocument;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}
var rmargin = ( /^margin/ );

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var getStyles = function( elem ) {

		// Support: IE<=11+, Firefox<=30+ (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};

var swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var documentElement = document.documentElement;



( function() {
	var pixelPositionVal, boxSizingReliableVal, pixelMarginRightVal, reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	// Support: IE9-11+
	// Style of cloned element affects source element cloned (#8908)
	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" +
		"padding:0;margin-top:1px;position:absolute";
	container.appendChild( div );

	// Executing both pixelPosition & boxSizingReliable tests require only one layout
	// so they're executed at the same time to save the second computation.
	function computeStyleTests() {
		div.style.cssText =

			// Support: Firefox<29, Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;" +
			"position:relative;display:block;" +
			"margin:auto;border:1px;padding:1px;" +
			"top:1%;width:50%";
		div.innerHTML = "";
		documentElement.appendChild( container );

		var divStyle = window.getComputedStyle( div );
		pixelPositionVal = divStyle.top !== "1%";
		reliableMarginLeftVal = divStyle.marginLeft === "2px";
		boxSizingReliableVal = divStyle.width === "4px";

		// Support: Android 4.0 - 4.3 only
		// Some styles come back with percentage values, even though they shouldn't
		div.style.marginRight = "50%";
		pixelMarginRightVal = divStyle.marginRight === "4px";

		documentElement.removeChild( container );
	}

	jQuery.extend( support, {
		pixelPosition: function() {

			// This test is executed only once but we still do memoizing
			// since we can use the boxSizingReliable pre-computing.
			// No need to check if the test was already performed, though.
			computeStyleTests();
			return pixelPositionVal;
		},
		boxSizingReliable: function() {
			if ( boxSizingReliableVal == null ) {
				computeStyleTests();
			}
			return boxSizingReliableVal;
		},
		pixelMarginRight: function() {

			// Support: Android 4.0-4.3
			// We're checking for boxSizingReliableVal here instead of pixelMarginRightVal
			// since that compresses better and they're computed together anyway.
			if ( boxSizingReliableVal == null ) {
				computeStyleTests();
			}
			return pixelMarginRightVal;
		},
		reliableMarginLeft: function() {

			// Support: IE <=8 only, Android 4.0 - 4.3 only, Firefox <=3 - 37
			if ( boxSizingReliableVal == null ) {
				computeStyleTests();
			}
			return reliableMarginLeftVal;
		},
		reliableMarginRight: function() {

			// Support: Android 2.3
			// Check if div with explicit width and no margin-right incorrectly
			// gets computed margin-right based on width of container. (#3333)
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			// This support function is only executed once so no memoizing is needed.
			var ret,
				marginDiv = div.appendChild( document.createElement( "div" ) );

			// Reset CSS: box-sizing; display; margin; border; padding
			marginDiv.style.cssText = div.style.cssText =

				// Support: Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;box-sizing:content-box;" +
				"display:block;margin:0;border:0;padding:0";
			marginDiv.style.marginRight = marginDiv.style.width = "0";
			div.style.width = "1px";
			documentElement.appendChild( container );

			ret = !parseFloat( window.getComputedStyle( marginDiv ).marginRight );

			documentElement.removeChild( container );
			div.removeChild( marginDiv );

			return ret;
		}
	} );
} )();


function curCSS( elem, name, computed ) {
	var width, minWidth, maxWidth, ret,
		style = elem.style;

	computed = computed || getStyles( elem );

	// Support: IE9
	// getPropertyValue is only needed for .css('filter') (#12537)
	if ( computed ) {
		ret = computed.getPropertyValue( name ) || computed[ name ];

		if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		// A tribute to the "awesome hack by Dean Edwards"
		// Android Browser returns percentage for some values,
		// but width seems to be reliably pixels.
		// This is against the CSSOM draft spec:
		// http://dev.w3.org/csswg/cssom/#resolved-values
		if ( !support.pixelMarginRight() && rnumnonpx.test( ret ) && rmargin.test( name ) ) {

			// Remember the original values
			width = style.width;
			minWidth = style.minWidth;
			maxWidth = style.maxWidth;

			// Put in the new values to get a computed value out
			style.minWidth = style.maxWidth = style.width = ret;
			ret = computed.width;

			// Revert the changed values
			style.width = width;
			style.minWidth = minWidth;
			style.maxWidth = maxWidth;
		}
	}

	return ret !== undefined ?

		// Support: IE9-11+
		// IE returns zIndex value as an integer.
		ret + "" :
		ret;
}


function addGetHookIf( conditionFn, hookFn ) {

	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}


var

	// Swappable if display is none or starts with table
	// except "table", "table-cell", or "table-caption"
	// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style;

// Return a css property mapped to a potentially vendor prefixed property
function vendorPropName( name ) {

	// Shortcut for names that are not vendor prefixed
	if ( name in emptyStyle ) {
		return name;
	}

	// Check for vendor prefixed names
	var capName = name[ 0 ].toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

function setPositiveNumber( elem, value, subtract ) {

	// Any relative (+/-) values have already been
	// normalized at this point
	var matches = rcssNum.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 2 ] - ( subtract || 0 ) ) + ( matches[ 3 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?

		// If we already have the right measurement, avoid augmentation
		4 :

		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {

		// Both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {

			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// At this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {

			// At this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// At this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// Support: IE11 only
	// In IE 11 fullscreen elements inside of an iframe have
	// 100x too small dimensions (gh-1764).
	if ( document.msFullscreenElement && window.top !== window ) {

		// Support: IE11 only
		// Running getBoundingClientRect on a disconnected node
		// in IE throws an error.
		if ( elem.getClientRects().length ) {
			val = Math.round( elem.getBoundingClientRect()[ name ] * 100 );
		}
	}

	// Some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {

		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test( val ) ) {
			return val;
		}

		// Check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox &&
			( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// Use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = dataPriv.get( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {

			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] = dataPriv.access(
					elem,
					"olddisplay",
					defaultDisplay( elem.nodeName )
				);
			}
		} else {
			hidden = isHidden( elem );

			if ( display !== "none" || !hidden ) {
				dataPriv.set(
					elem,
					"olddisplay",
					hidden ? display : jQuery.css( elem, "display" )
				);
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

jQuery.extend( {

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"animationIterationCount": true,
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		"float": "cssFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// Gets hook for the prefixed version, then unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set (#7116)
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			if ( type === "number" ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// Support: IE9-11+
			// background-* props affect original clone's values
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				style[ name ] = value;
			}

		} else {

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var val, num, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// Try prefixed name followed by the unprefixed name
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		// Convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Make numeric if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}
		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// Certain elements can have dimension info if we invisibly show them
				// but it must have a current display style that would benefit
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&
					elem.offsetWidth === 0 ?
						swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, name, extra );
						} ) :
						getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var matches,
				styles = extra && getStyles( elem ),
				subtract = extra && augmentWidthOrHeight(
					elem,
					name,
					extra,
					jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				);

			// Convert to pixels if value adjustment is needed
			if ( subtract && ( matches = rcssNum.exec( value ) ) &&
				( matches[ 3 ] || "px" ) !== "px" ) {

				elem.style[ name ] = value;
				value = jQuery.css( elem, name );
			}

			return setPositiveNumber( elem, value, subtract );
		}
	};
} );

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return ( parseFloat( curCSS( elem, "marginLeft" ) ) ||
				elem.getBoundingClientRect().left -
					swap( elem, { marginLeft: 0 }, function() {
						return elem.getBoundingClientRect().left;
					} )
				) + "px";
		}
	}
);

// Support: Android 2.3
jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			return swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// Assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each( function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			// Use a property on the element directly when it is not a DOM element,
			// or when there is no matching style property that exists.
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
				return tween.elem[ tween.prop ];
			}

			// Passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails.
			// Simple values such as "10px" are parsed to Float;
			// complex values such as "rotate(1rad)" are returned as-is.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {

			// Use step hook for back compat.
			// Use cssHook if its there.
			// Use .style if available and use plain properties where available.
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 &&
				( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null ||
					jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE9
// Panic based approach to setting things on disconnected nodes
Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	},
	_default: "swing"
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

// Animations created synchronously will run synchronously
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		i = 0,
		attrs = { height: type };

	// If we include width, step value is 1 to do all cssExpand values,
	// otherwise step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

			// We're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = dataPriv.get( elem, "fxshow" );

	// Handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always( function() {

			// Ensure the complete handler is called before this completes
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}

	// Height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {

		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE9-10 do not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			dataPriv.get( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {
			style.display = "inline-block";
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		anim.always( function() {
			style.overflow = opts.overflow[ 0 ];
			style.overflowX = opts.overflow[ 1 ];
			style.overflowY = opts.overflow[ 2 ];
		} );
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show
				// and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = dataPriv.access( elem, "fxshow", {} );
		}

		// Store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done( function() {
				jQuery( elem ).hide();
			} );
		}
		anim.done( function() {
			var prop;

			dataPriv.remove( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		} );
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( ( display === "none" ? defaultDisplay( elem.nodeName ) : display ) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// Not quite $.extend, this won't overwrite existing keys.
			// Reusing 'index' because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred().always( function() {

			// Don't match elem in the :animated selector
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Support: Android 2.3
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ] );

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise( {
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,

					// If we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// Resolve when we played the last frame; otherwise, reject
				if ( gotoEnd ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		} ),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( jQuery.isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					jQuery.proxy( result.stop, result );
			}
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		} )
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {
	tweeners: {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value );
			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
			return tween;
		} ]
	},

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnotwhite );
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
			Animation.tweeners[ prop ].unshift( callback );
		}
	},

	prefilters: [ defaultPrefilter ],

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			Animation.prefilters.unshift( callback );
		} else {
			Animation.prefilters.push( callback );
		}
	}
} );

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ?
		opt.duration : opt.duration in jQuery.fx.speeds ?
			jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// Normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend( {
	fadeTo: function( speed, to, easing, callback ) {

		// Show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// Animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || dataPriv.get( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = dataPriv.get( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) {

					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// Start the next in the queue if the last step wasn't forced.
			// Timers currently will call their complete callbacks, which
			// will dequeue but only if they were gotoEnd.
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		} );
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each( function() {
			var index,
				data = dataPriv.get( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// Enable finishing flag on private data
			data.finish = true;

			// Empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// Look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// Look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// Turn off finishing flag
			delete data.finish;
		} );
	}
} );

jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );

// Generate shortcuts for custom animations
jQuery.each( {
	slideDown: genFx( "show" ),
	slideUp: genFx( "hide" ),
	slideToggle: genFx( "toggle" ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
} );

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		i = 0,
		timers = jQuery.timers;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];

		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;
jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = window.setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	window.clearInterval( timerId );

	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};


( function() {
	var input = document.createElement( "input" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	input.type = "checkbox";

	// Support: iOS<=5.1, Android<=4.2+
	// Default value for a checkbox should be "on"
	support.checkOn = input.value !== "";

	// Support: IE<=11+
	// Must access selectedIndex to make default options select
	support.optSelected = opt.selected;

	// Support: Android<=2.3
	// Options inside disabled selects are incorrectly marked as disabled
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE<=11+
	// An input loses its value after becoming a radio
	input = document.createElement( "input" );
	input.value = "t";
	input.type = "radio";
	support.radioValue = input.value === "t";
} )();


var boolHook,
	attrHandle = jQuery.expr.attrHandle;

jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : undefined );
		}

		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value + "" );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					jQuery.nodeName( elem, "input" ) ) {
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {

					// Set corresponding property to false
					elem[ propName ] = false;
				}

				elem.removeAttribute( name );
			}
		}
	}
} );

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			elem.setAttribute( name, name );
		}
		return name;
	}
};
jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = function( elem, name, isXML ) {
		var ret, handle;
		if ( !isXML ) {

			// Avoid an infinite loop by temporarily removing this function from the getter
			handle = attrHandle[ name ];
			attrHandle[ name ] = ret;
			ret = getter( elem, name, isXML ) != null ?
				name.toLowerCase() :
				null;
			attrHandle[ name ] = handle;
		}
		return ret;
	};
} );




var rfocusable = /^(?:input|select|textarea|button)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		return this.each( function() {
			delete this[ jQuery.propFix[ name ] || name ];
		} );
	}
} );

jQuery.extend( {
	prop: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			return ( elem[ name ] = value );
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		return elem[ name ];
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {

				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				return tabindex ?
					parseInt( tabindex, 10 ) :
					rfocusable.test( elem.nodeName ) ||
						rclickable.test( elem.nodeName ) && elem.href ?
							0 :
							-1;
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );

if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;
			if ( parent && parent.parentNode ) {
				parent.parentNode.selectedIndex;
			}
			return null;
		}
	};
}

jQuery.each( [
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
} );




var rclass = /[\t\r\n\f]/g;

function getClass( elem ) {
	return elem.getAttribute && elem.getAttribute( "class" ) || "";
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnotwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );
				cur = elem.nodeType === 1 &&
					( " " + curValue + " " ).replace( rclass, " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnotwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );

				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 &&
					( " " + curValue + " " ).replace( rclass, " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {

						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		return this.each( function() {
			var className, i, self, classNames;

			if ( type === "string" ) {

				// Toggle individual class names
				i = 0;
				self = jQuery( this );
				classNames = value.match( rnotwhite ) || [];

				while ( ( className = classNames[ i++ ] ) ) {

					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {

					// Store className if set
					dataPriv.set( this, "__className__", className );
				}

				// If the element has a class name or if we're passed `false`,
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				if ( this.setAttribute ) {
					this.setAttribute( "class",
						className || value === false ?
						"" :
						dataPriv.get( this, "__className__" ) || ""
					);
				}
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + getClass( elem ) + " " ).replace( rclass, " " )
					.indexOf( className ) > -1
			) {
				return true;
			}
		}

		return false;
	}
} );




var rreturn = /\r/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?

					// Handle most common string cases
					ret.replace( rreturn, "" ) :

					// Handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";

			} else if ( typeof val === "number" ) {
				val += "";

			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
	valHooks: {
		option: {
			get: function( elem ) {

				// Support: IE<11
				// option.value not trimmed (#14858)
				return jQuery.trim( elem.value );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// IE8-9 doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ?
								!option.disabled : option.getAttribute( "disabled" ) === null ) &&
							( !option.parentNode.disabled ||
								!jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];
					if ( option.selected =
							jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1
					) {
						optionSet = true;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );




// Return jQuery for attributes-only inclusion


var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/;

jQuery.extend( jQuery.event, {

	trigger: function( event, data, elem, onlyHandlers ) {

		var i, cur, tmp, bubbleType, ontype, handle, special,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "." ) > -1 ) {

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for dist handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( dataPriv.get( cur, "events" ) || {} )[ event.type ] &&
				dataPriv.get( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( ( !special._default ||
				special._default.apply( eventPath.pop(), data ) === false ) &&
				acceptData( elem ) ) {

				// Call a dist DOM method on the target with the same name name as the event.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && jQuery.isFunction( elem[ type ] ) && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					elem[ type ]();
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	// Piggyback on a donor event to simulate a different one
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true

				// Previously, `originalEvent: {}` was set here, so stopPropagation call
				// would not be triggered on donor event, since in our own
				// jQuery.event.stopPropagation function we had a check for existence of
				// originalEvent.stopPropagation method, so, consequently it would be a noop.
				//
				// But now, this "simulate" function is used only for events
				// for which stopPropagation() is noop, so there is no need for that anymore.
				//
				// For the compat branch though, guard for "click" and "submit"
				// events is still used, but was moved to jQuery.event.stopPropagation function
				// because `originalEvent` should point to the original event for the constancy
				// with other events and for more focused logic
			}
		);

		jQuery.event.trigger( e, null, elem );

		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}

} );

jQuery.fn.extend( {

	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );


jQuery.each( ( "blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu" ).split( " " ),
	function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
} );

jQuery.fn.extend( {
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
} );




support.focusin = "onfocusin" in window;


// Support: Firefox
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome, Safari
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://code.google.com/p/chromium/issues/detail?id=449857
if ( !support.focusin ) {
	jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
			jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
		};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				dataPriv.access( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					dataPriv.remove( doc, fix );

				} else {
					dataPriv.access( doc, fix, attaches );
				}
			}
		};
	} );
}
var location = window.location;

var nonce = jQuery.now();

var rquery = ( /\?/ );



// Support: Android 2.3
// Workaround failure to string-cast null input
jQuery.parseJSON = function( data ) {
	return JSON.parse( data + "" );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml;
	if ( !data || typeof data !== "string" ) {
		return null;
	}

	// Support: IE9
	try {
		xml = ( new window.DOMParser() ).parseFromString( data, "text/xml" );
	} catch ( e ) {
		xml = undefined;
	}

	if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,

	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Anchor tag for parsing the document origin
	originAnchor = document.createElement( "a" );
	originAnchor.href = location.href;

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {

			// For each dataType in the dataTypeExpression
			while ( ( dataType = dataTypes[ i++ ] ) ) {

				// Prepend if requested
				if ( dataType[ 0 ] === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

				// Otherwise append
				} else {
					( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" &&
				!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		} );
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var ct, type, finalDataType, firstDataType,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {

		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}

		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},

		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

		// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {

								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s.throws ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return {
								state: "parsererror",
								error: conv ? e : "No conversion from " + prev + " to " + current
							};
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend( {

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: location.href,
		type: "GET",
		isLocal: rlocalProtocol.test( location.protocol ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/data, text/javascript"
		},

		contents: {
			xml: /\bxml\b/,
			html: /\bhtml/,
			json: /\bjson\b/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a data expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var transport,

			// URL without anti-cache param
			cacheURL,

			// Response headers
			responseHeadersString,
			responseHeaders,

			// timeout handle
			timeoutTimer,

			// Url cleanup var
			urlAnchor,

			// To know if global events are to be dispatched
			fireGlobals,

			// Loop variable
			i,

			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),

			// Callbacks context
			callbackContext = s.context || s,

			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context &&
				( callbackContext.nodeType || callbackContext.jquery ) ?
					jQuery( callbackContext ) :
					jQuery.event,

			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),

			// Status-dependent callbacks
			statusCode = s.statusCode || {},

			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},

			// The jqXHR state
			state = 0,

			// Default abort message
			strAbort = "canceled",

			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[ 1 ].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {

								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {

							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (prefilters might expect it)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || location.href ) + "" ).replace( rhash, "" )
			.replace( rprotocol, location.protocol + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when the origin doesn't match the current origin.
		if ( s.crossDomain == null ) {
			urlAnchor = document.createElement( "a" );

			// Support: IE8-11+
			// IE throws exception if url is malformed, e.g. http://example.com:80x/
			try {
				urlAnchor.href = s.url;

				// Support: IE8-11+
				// Anchor's host property isn't correctly set when s.url is relative
				urlAnchor.href = urlAnchor.href;
				s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !==
					urlAnchor.protocol + "//" + urlAnchor.host;
			} catch ( e ) {

				// If there is an error parsing the URL, assume it is crossDomain,
				// it can be rejected by the transport if it is invalid
				s.crossDomain = true;
			}
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );

				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
				s.accepts[ s.dataTypes[ 0 ] ] +
					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend &&
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {

			// Abort if not done already and return
			return jqXHR.abort();
		}

		// Aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}

			// If request was aborted inside ajaxSend, stop there
			if ( state === 2 ) {
				return jqXHR;
			}

			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {

				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );

				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				window.clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader( "Last-Modified" );
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader( "etag" );
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {

				// Extract error from statusText and normalize for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
} );

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {

		// Shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		// The url can be an options object (which then must have .url)
		return jQuery.ajax( jQuery.extend( {
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		}, jQuery.isPlainObject( url ) && url ) );
	};
} );


jQuery._evalUrl = function( url ) {
	return jQuery.ajax( {
		url: url,

		// Make this explicit, since user can override this through ajaxSetup (#11264)
		type: "GET",
		dataType: "script",
		async: false,
		global: false,
		"throws": true
	} );
};


jQuery.fn.extend( {
	wrapAll: function( html ) {
		var wrap;

		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapAll( html.call( this, i ) );
			} );
		}

		if ( this[ 0 ] ) {

			// The elements to wrap the target around
			wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem = this;

				while ( elem.firstElementChild ) {
					elem = elem.firstElementChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}

		return this.each( function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		} );
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( isFunction ? html.call( this, i ) : html );
		} );
	},

	unwrap: function() {
		return this.parent().each( function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		} ).end();
	}
} );


jQuery.expr.filters.hidden = function( elem ) {
	return !jQuery.expr.filters.visible( elem );
};
jQuery.expr.filters.visible = function( elem ) {

	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	// Use OR instead of AND as the element is not visible if either is true
	// See tickets #10406 and #13132
	return elem.offsetWidth > 0 || elem.offsetHeight > 0 || elem.getClientRects().length > 0;
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {

		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {

				// Treat each array item as a scalar.
				add( prefix, v );

			} else {

				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {

		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {

		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {

			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		} );

	} else {

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {

			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} )
		.filter( function() {
			var type = this.type;

			// Use .is( ":disabled" ) so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} )
		.map( function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					} ) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


jQuery.ajaxSettings.xhr = function() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {}
};

var xhrSuccessStatus = {

		// File protocol always yields status code 0, assume 200
		0: 200,

		// Support: IE9
		// #1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	},
	xhrSupported = jQuery.ajaxSettings.xhr();

support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
support.ajax = xhrSupported = !!xhrSupported;

jQuery.ajaxTransport( function( options ) {
	var callback, errorCallback;

	// Cross domain only allowed if supported through XMLHttpRequest
	if ( support.cors || xhrSupported && !options.crossDomain ) {
		return {
			send: function( headers, complete ) {
				var i,
					xhr = options.xhr();

				xhr.open(
					options.type,
					options.url,
					options.async,
					options.username,
					options.password
				);

				// Apply custom fields if provided
				if ( options.xhrFields ) {
					for ( i in options.xhrFields ) {
						xhr[ i ] = options.xhrFields[ i ];
					}
				}

				// Override mime type if needed
				if ( options.mimeType && xhr.overrideMimeType ) {
					xhr.overrideMimeType( options.mimeType );
				}

				// X-Requested-With header
				// For cross-domain requests, seeing as conditions for a preflight are
				// akin to a jigsaw puzzle, we simply never set it to be sure.
				// (it can always be set on a per-request basis or even using ajaxSetup)
				// For same-domain requests, won't change header if already provided.
				if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
					headers[ "X-Requested-With" ] = "XMLHttpRequest";
				}

				// Set headers
				for ( i in headers ) {
					xhr.setRequestHeader( i, headers[ i ] );
				}

				// Callback
				callback = function( type ) {
					return function() {
						if ( callback ) {
							callback = errorCallback = xhr.onload =
								xhr.onerror = xhr.onabort = xhr.onreadystatechange = null;

							if ( type === "abort" ) {
								xhr.abort();
							} else if ( type === "error" ) {

								// Support: IE9
								// On a manual dist abort, IE9 throws
								// errors on any property access that is not readyState
								if ( typeof xhr.status !== "number" ) {
									complete( 0, "error" );
								} else {
									complete(

										// File: protocol always yields status 0; see #8605, #14207
										xhr.status,
										xhr.statusText
									);
								}
							} else {
								complete(
									xhrSuccessStatus[ xhr.status ] || xhr.status,
									xhr.statusText,

									// Support: IE9 only
									// IE9 has no XHR2 but throws on binary (trac-11426)
									// For XHR2 non-text, let the caller handle it (gh-2498)
									( xhr.responseType || "text" ) !== "text"  ||
									typeof xhr.responseText !== "string" ?
										{ binary: xhr.response } :
										{ text: xhr.responseText },
									xhr.getAllResponseHeaders()
								);
							}
						}
					};
				};

				// Listen to events
				xhr.onload = callback();
				errorCallback = xhr.onerror = callback( "error" );

				// Support: IE9
				// Use onreadystatechange to replace onabort
				// to handle uncaught aborts
				if ( xhr.onabort !== undefined ) {
					xhr.onabort = errorCallback;
				} else {
					xhr.onreadystatechange = function() {

						// Check readyState before timeout as it changes
						if ( xhr.readyState === 4 ) {

							// Allow onerror to be called first,
							// but that will not handle a dist abort
							// Also, save errorCallback to a variable
							// as xhr.onerror cannot be accessed
							window.setTimeout( function() {
								if ( callback ) {
									errorCallback();
								}
							} );
						}
					};
				}

				// Create the abort callback
				callback = callback( "abort" );

				try {

					// Do send the request (this may raise an exception)
					xhr.send( options.hasContent && options.data || null );
				} catch ( e ) {

					// #14683: Only rethrow if this hasn't been notified as an error yet
					if ( callback ) {
						throw e;
					}
				}
			},

			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




// Install script dataType
jQuery.ajaxSetup( {
	accepts: {
		script: "text/javascript, application/javascript, " +
			"application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /\b(?:java|ecma)script\b/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
} );

// Handle cache's special case and crossDomain
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
	}
} );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {
		var script, callback;
		return {
			send: function( _, complete ) {
				script = jQuery( "<script>" ).prop( {
					charset: s.scriptCharset,
					src: s.url
				} ).on(
					"load error",
					callback = function( evt ) {
						script.remove();
						callback = null;
						if ( evt ) {
							complete( evt.type === "error" ? 404 : 200, evt.type );
						}
					}
				);

				// Use dist DOM manipulation to avoid our domManip AJAX trickery
				document.head.appendChild( script[ 0 ] );
			},
			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup( {
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
} );

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "data jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" &&
				( s.contentType || "" )
					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
				rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve data after script execution
		s.converters[ "script json" ] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// Force data dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always( function() {

			// If previous value didn't exist - remove it
			if ( overwritten === undefined ) {
				jQuery( window ).removeProp( callbackName );

			// Otherwise restore preexisting value
			} else {
				window[ callbackName ] = overwritten;
			}

			// Save back as free
			if ( s[ callbackName ] ) {

				// Make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// Save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		} );

		// Delegate to script
		return "script";
	}
} );




// Support: Safari 8+
// In Safari 8 documents created via document.implementation.createHTMLDocument
// collapse sibling forms: the second one becomes a child of the first one.
// Because of that, this security measure has to be disabled in Safari 8.
// https://bugs.webkit.org/show_bug.cgi?id=137337
support.createHTMLDocument = ( function() {
	var body = document.implementation.createHTMLDocument( "" ).body;
	body.innerHTML = "<form></form><form></form>";
	return body.childNodes.length === 2;
} )();


// Argument "data" should be string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}

	// Stop scripts or inline event handlers from being executed immediately
	// by using document.implementation
	context = context || ( support.createHTMLDocument ?
		document.implementation.createHTMLDocument( "" ) :
		document );

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, type, response,
		self = this,
		off = url.indexOf( " " );

	if ( off > -1 ) {
		selector = jQuery.trim( url.slice( off ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax( {
			url: url,

			// If "type" variable is undefined, then "GET" method will be used.
			// Make value of this field explicit since
			// user can override it through ajaxSetup method
			type: type || "GET",
			dataType: "html",
			data: params
		} ).done( function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		// If the request succeeds, this function gets "data", "status", "jqXHR"
		// but they are ignored because response was set above.
		// If it fails, this function gets "jqXHR", "status", "error"
		} ).always( callback && function( jqXHR, status ) {
			self.each( function() {
				callback.apply( self, response || [ jqXHR.responseText, status, jqXHR ] );
			} );
		} );
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
} );




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};




/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ? elem : elem.nodeType === 9 && elem.defaultView;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// Set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			( curCSSTop + curCSSLeft ).indexOf( "auto" ) > -1;

		// Need to be able to calculate position if either
		// top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;

		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );

		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend( {
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var docElem, win,
			elem = this[ 0 ],
			box = { top: 0, left: 0 },
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		box = elem.getBoundingClientRect();
		win = getWindow( doc );
		return {
			top: box.top + win.pageYOffset - docElem.clientTop,
			left: box.left + win.pageXOffset - docElem.clientLeft
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			elem = this[ 0 ],
			parentOffset = { top: 0, left: 0 };

		// Fixed elements are offset from window (parentOffset = {top:0, left: 0},
		// because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// Assume getBoundingClientRect is there when computed position is fixed
			offset = elem.getBoundingClientRect();

		} else {

			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			// Subtract offsetParent scroll positions
			parentOffset.top += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true ) -
				offsetParent.scrollTop();
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true ) -
				offsetParent.scrollLeft();
		}

		// Subtract parent offsets and element margins
		return {
			top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	// This method will return documentElement in the following cases:
	// 1) For the element inside the iframe without offsetParent, this method will return
	//    documentElement of the parent window
	// 2) For the hidden or detached element
	// 3) For body or html element, i.e. in case of the html node - it will return itself
	//
	// but those exceptions were never presented as a real life use-cases
	// and might be considered as more preferable results.
	//
	// This logic, however, is not guaranteed and can change at any point in the future
	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && jQuery.css( offsetParent, "position" ) === "static" ) {
				offsetParent = offsetParent.offsetParent;
			}

			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = "pageYOffset" === prop;

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? win[ prop ] : elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : win.pageXOffset,
					top ? val : win.pageYOffset
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length );
	};
} );

// Support: Safari<7-8+, Chrome<37-44+
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// Blink bug: https://code.google.com/p/chromium/issues/detail?id=229280
// getComputedStyle returns percent when specified for top/left/bottom/right;
// rather than make the css module depend on the offset module, just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// If curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
		function( defaultExtra, funcName ) {

		// Margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {

					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	} );
} );


jQuery.fn.extend( {

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {

		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	},
	size: function() {
		return this.length;
	}
} );

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	} );
}



var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in AMD
// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( !noGlobal ) {
	window.jQuery = window.$ = jQuery;
}

return jQuery;
}));

},{}],6:[function(require,module,exports){

    //lambda临时委托方法工厂
    var $lambda=function(foo){
        var str,i,param,body;
        if(!foo){
            return function(x){return x};   
        }else if(typeof foo=='function'){
            return foo;
        }else if(foo.source){
            str=foo.source.replace(/^\s+|\s+$/g,'');;
        }else{
            str=foo.replace(/^\s+|\s+$/g,'');
        }
            
        //开始解析函数字符串
        var i=str.indexOf('=>');
        if(i==-1)  {
            return new Function(str);
        }else{
            param=str.slice(0,i).replace(/\s+/gm,'');
            body =str.slice(i+2).replace(/^\s+|\s+$/g,'');

            //k=><alert(k);return k;>  //[]可能用来表示数组,{}用来表示对象,()用来表示区间块,只有<>是没有用的
            body= body.indexOf('<')==0 ? body.slice(1,-1) : 'return '+body;
            
            if(param=='args'){
                body='var args=arguments;'+body;
                param='';
            }
            return new Function(param,body);
        }
    }

    module.exports={
        indexAs:function(item){
                    var len=this.length;
                    for(var i=0;i<len;i++){
                        if( JSON.equal(item,this[i]) ) //依赖于JSON.equal扩展，检测是否相等的JSON对象
                            return i;
                    }
                    return -1;
                },
        lastIndexAs:function(item){
                    for(var i=this.length-1;i>-1;i--){
                        if( JSON.equal(item,this[i]) ) //依赖于JSON.equal扩展，检测是否相等的JSON对象
                            return i;
                    }
                    return -1;
                },
        each:Array.prototype.forEach,
        remove:function(i){return this.splice(i,1);},
        has:function(item,bol){return this.indexOf(item,bol)+1;},
        where:function(foo){
                    var the=this;
                    return the.filter(function(v,i,arr){
                        return $lambda(foo)(v,i,arr);
                    });
                },
        select:function(foo){
                    var the=this;
                    return the.map(function(v,i,arr){
                        return $lambda(foo)(v,i,arr);
                    });
                },
        distinct:function(jsonEqual){
                        var i,j;
                        for(i=this.length-1;i>0;i--){
                                j= jsonEqual ? this.indexAs(this[i]) :this.indexOf(this[i]);
                                j>-1 && j<i && this.remove(i);
                            
                            /*for(var k=i-1;k>-1;k--){
                                var item=this[i];
                                JSON.equal(item,this[k],jsonEqual) && this.remove(i);
                            }*/
                        }
                        return this.where('x => typeof x !="undefined" ');
                },
        orderby:function(func,desc){
                    var orderFn, arr=this.slice();
                    
                    //准备好转换函数定义和排序三大套路
                    var trans=function(x){return x};
                    var orderFns={
                        number:function(a,b){return trans(a) - trans(b)},
                        string:function(a,b){return trans(a).localeCompare(trans(b))},
                        boolean:function(a,b){return !trans(a);}
                    };
                    
                    if(this.length<2) return arr;
                    
                    //trans转换函数重赋值（不传的话等于初始值）
                    trans=$lambda(func);
                    
                    //抽样判断转换函数的返回值类型，来选择对应的比较函数
                    orderFn=orderFns[typeof trans(arr[0])];
                    
                    try{
                        arr.sort(orderFn||null);
                    }catch(e){
                        throw new Error('排序失败,请检测方法和数组内容');
                    }
                    //第二参数为true表示结果需要倒序
                    desc && arr.reverse();
                    return arr;
                },
        max:function(str){
                    var now, j=this.length, func=$lambda(str);
                    if(j==0) return null;
                    if(j==1) return func(this[0])
                    now=func(this[0]);
                    for(var i=1;i<j;i++){
                        now=Math.max(now,func(this[i]));
                    }
                    return now;
                },
        min:function(str){
                var now, j=this.length, func=$lambda(str);
                if(j==0) return null;
                if(j==1) return func(this[0])
                now=func(this[0]);
                for(var i=1;i<j;i++){
                    now=Math.min(now,func(this[i]));
                }
                return now;
            },
        sum:function(str){
                var now, j=this.length, func=$lambda(str);
                if(j==0) return null;
                if(j==1) return func(this[0])
                now=func(this[0]);
                for(var i=1;i<j;i++){
                    next=func(this[i]);
                    if(now==null){
                        now=next;      //前者是null直接取后者         
                    }else{
                        now= next==null ? now : now+next;  //后者是null直接取前者，否则相加
                    } 
                    //null加数字的时候,就是0+数字,而null加字符串,不是''+字符,而是'null'+字符串...所以是null就不加
                }
                return now;
            },
    
        linq:function(query){
            //数据源
            var dataInfo=query.match(/\sfrom\s+([^\s]+\s+\w)/)[1].split(/\s+/); //'from多个空格到where或终点之间的字符'之'前半段'
            var dataName=dataInfo[0]; //数据源名
            var dataMark=dataInfo[1]; //短别名	
            
            var columns=[];
            var where_clause='';
            var order_clause='';
            var desc='';
            
            //用正则捕获where和order条件 TODO
            var cond=query.match(/\swhere\s+(.+)(order\sby){0,1}/); //where和order by一起取出
            if(cond.length && cond.length>1){
                var clause=cond[1].split(' order by ');
                where_clause=clause[0];
                if (clause.length>1){
                    order_clause=clause[1];
                    desc=order_clause.slice(-5)==' desc'; //"order by字段.slice(-5)==' desc'或' DESC'"
                    desc && (order_clause=order_clause.slice(0,-5));
                }
            }else{
                //没有where条件的,尝试找下order by条件
                cond=query.match( new RegExp("\\s#\\s+*\\s+order\\sby(.+)".replace('#',dataName).replace('*',dataMark))  );
                if(cond.length && cond.length>1){
                    var index=cond[0].indexOf(' order by ');
                    order_clause=cond[0].slice(index+10)
                }
            }

            //排除空条件
            if(where_clause.trim())
                where_clause= dataMark+'=>'+where_clause;
            if(order_clause.trim())
                order_clause= dataMark+'=>'+order_clause;

            //用正则捕获选取的字段 TODO
            var cols=query.match(/^select\s+(.+)\s+from/);
            if(cols.length && cols.length>1){
                cols=cols[1].trim();
                if(cols.trim()=='*'){
                    columns[0]='';
                }else{
                    columns=cols.split(/,\s+/gm); //最终选了,和空格,是否改为;分割?
                    var j=columns.length
                    for(var i=0;i<j;i++)
                        columns[i]=dataMark+'=>'+columns[i];
                }
            }
            
            eval('var data='+dataName); 
            //this[dataName] 用this指向上下文，需要使用时将数据挂在某对象上。 
            //或者直接传入第二个Linq参数data引用数据源
            
            return function(){
                return [].select.apply(data.where(where_clause).orderby(order_clause,desc),columns); //cols用select.apply(data,colsArr)传多个字段
            };
        }
            // "select d.name, d.age from datas d where d.age>25 && d.name!='tom' order by d.age desc";
            // 这样的写法其实已经不能成立， columns分隔依赖select的多项合并，和数组combine方法
            //select('d=>d.name','d=>d.age') //这里需要讲两次循环的数组结果项concat，因为性能已经放弃，并且单项还是数组不是对象
            //select('d=>{姓名:d.name,年龄:d.age}') //解析为这样的理想形式需要键名
            //或者这样写
            //"select {姓名:d.name,年龄:d.age－1} from datas d where d.age%2==0"
            //"select [d.name,d.age] from datas d"
    };






},{}],7:[function(require,module,exports){
/**
 * Created by evans on 16/5/22.
 */
var localParams={};
var _set=function(module,key,val){
    return localParams['set'](module+key,val);
};
var _get=function(module,key,val){
    return localParams['get'](module+key,val);
};
var _modules={global:null, sys:null, reports:null, prjWatch:null, fstPage:null, infoMng:null, feedBack:null};
var obj={
    set:function(key,val){
        localStorage['params@'+key]=val;
        return true;
    },
    get:function(key){
        return localStorage['params@'+key];
    }
};
for(var n in _modules){
    var space=n=='global'?'':n+'@';
    obj[n]={
        get:function(space){return function (key,val) {return _get(space,key);}}(space),
        set:function(space){return function (key,val) {return _set(space,key,val);}}(space)
    };
}
localParams.extending(obj);


var localData={};
localData.extending({
    set:function(key,val){
        if(val==null){
            localStorage[key]='null';
        }
        if(typeof val=='string'){
            localStorage[key]=val;
        }
        if(typeof val=='number'){
            localStorage[key]="[number]:"+val;
        }
        if(typeof val=='boolean'){
            localStorage[key]="[boolean]:"+val;
        }
        if(typeOf(val)=='date'){
            localStorage[key]="[date]:"+val.getTime();
        }
        else{
            try {
                localStorage[key] = JSON.stringify(val);
            }catch(e){
                localStorage[key] = String(val);
            }
        }
        return true;
    },
    get:function(key){
        var obj;
        var val=localStorage[key];
        if(typeof val!='string'){
            return val;
        }
        else if(val==='null'){
            return null;
        }
        else if(val.indexOf('[number]:')==0){
            return +(val.slice(9));
        }
        else if(val.indexOf('[boolean]:')==0){
            return val.slice(10)==='true';
        }
        else if(val.indexOf('[date]:')==0){
            return new Date(+(val.slice(7)));
        }else{
            try{
                obj=JSON.parse(val);
            }catch(e){
                obj=String(val);
            }
            return obj;
        }
    }
});

module.exports=({
    localData:localData,
    localParams:localParams
});


},{}],8:[function(require,module,exports){
 (function($){
    //计算器 计算页数和各页的begin和end
	$.PaginationCalculator = function(maxentries, opts) {
		this.maxentries = maxentries;
		this.opts = opts;
	};
    
	$.extend($.PaginationCalculator.prototype, {
		numPages:function() {
			return Math.ceil(this.maxentries/this.opts.pageOnce);
		},
		getInterval:function(currentPage)  {
			var ne_half = Math.floor(this.opts.num_display_entries/2);
			var np = this.numPages();
			var upper_limit = np - this.opts.num_display_entries;
			var start = currentPage > ne_half ? Math.max( Math.min(currentPage - ne_half, upper_limit), 0 ) : 0;
			var end = currentPage > ne_half?Math.min(currentPage+ne_half + (this.opts.num_display_entries % 2), np):Math.min(this.opts.num_display_entries, np);
			return {start:start, end:end};
		}
	});
	
    //生成器 生成单个或多个页码链接
	$.PaginationRenderers = {};
	
	$.PaginationRenderers.defaultRenderer = function(maxentries, opts) {
		this.maxentries = maxentries;
		this.opts = opts;
		this.pc = new $.PaginationCalculator(maxentries, opts);
	};
	$.extend($.PaginationRenderers.defaultRenderer.prototype, {
		createLink:function(page_id, currentPage, appendopts){
			var lnk, np = this.pc.numPages();
			page_id = page_id<0?0:(page_id<np?page_id:np-1); // Normalize page id to sane value
			appendopts = $.extend({text:page_id+1, classes:""}, appendopts||{});
			if(page_id == currentPage){
				lnk = $("<span class='current'>" + appendopts.text + "</span>");
			}
			else
			{
				lnk = $("<a>" + appendopts.text + "</a>")
					.attr('href', this.opts.link_to.replace(/__id__/,page_id));
			}
			if(appendopts.classes){ lnk.addClass(appendopts.classes); }
			if(appendopts.rel){ lnk.attr('rel', appendopts.rel); }
			lnk.data('page_id', page_id);
			return lnk;
		},
		// Generate a range of numeric links 
		appendRange:function(container, currentPage, start, end, opts) {
			var i;
			for(i=start; i<end; i++) {
				this.createLink(i, currentPage, opts).appendTo(container);
			}
		},
		getLinks:function(currentPage, eventHandler) {
			var begin, end,
				interval = this.pc.getInterval(currentPage),
				np = this.pc.numPages(),
				//fragment = $("<div class='pagination'></div>");
				fragment = $("<div>");
			
			// Generate "Previous"-Link
			if(this.opts.prev_text && (currentPage > 0 || this.opts.prev_show_always)){
				fragment.append(this.createLink(currentPage-1, currentPage, {text:this.opts.prev_text, classes:"prev",rel:"prev"}));
			}
			// Generate starting points
			if (interval.start > 0 && this.opts.num_edge_entries > 0)
			{
				end = Math.min(this.opts.num_edge_entries, interval.start);
				this.appendRange(fragment, currentPage, 0, end, {classes:'sp'});
				if(this.opts.num_edge_entries < interval.start && this.opts.ellipse_text)
				{
					$("<span>"+this.opts.ellipse_text+"</span>").appendTo(fragment);
				}
			}
			// Generate interval links
			this.appendRange(fragment, currentPage, interval.start, interval.end);
			// Generate ending points
			if (interval.end < np && this.opts.num_edge_entries > 0)
			{
				if(np-this.opts.num_edge_entries > interval.end && this.opts.ellipse_text)
				{
					$("<span>"+this.opts.ellipse_text+"</span>").appendTo(fragment);
				}
				begin = Math.max(np-this.opts.num_edge_entries, interval.end);
				this.appendRange(fragment, currentPage, begin, np, {classes:'ep'});
				
			}
			// Generate "Next"-Link
			if(this.opts.next_text && (currentPage < np-1 || this.opts.next_show_always)){
				fragment.append(this.createLink(currentPage+1, currentPage, {text:this.opts.next_text, classes:"next",rel:"next"}));
			}
			$('a', fragment).click(eventHandler);//所以那个return continuePropagation并没有什么软用
			return fragment;
		}
	});
	
	// 这个方法是直接发动在分页条元素上，并非整个列表容器
	$.fn._pagination = function(maxentries, opts){
		
		// Initialize options with default values
		opts = $.extend({
			pageOnce:15,
			num_display_entries:11,
			currentPage:0,
			num_edge_entries:0,
			link_to:"javascript:void(0);",
			prev_text:"上一页",
			next_text:"下一页",
			ellipse_text:"...",
			prev_show_always:true,
			next_show_always:true,
			renderer:"defaultRenderer",
			show_if_single_page:false,
			loadFirstPage:true,
			callback:function(){return false;}
		},opts||{});
		
		var containers = this, renderer, links, currentPage;
		
		/**
		 * This is the event handling function for the pagination links. 
		 * @param {int} page_id The new page number
		 */
		function paginationClickHandler(evt){
			//jQuery("#loadingBar").text('加载中...请稍候');
			var links, 
				newCurrentPage = $(evt.target).data('page_id'),
				continuePropagation = selectPage(newCurrentPage);
			if (!continuePropagation) {
				evt.stopPropagation();
			}
			return continuePropagation;
		}
		
		function selectPage(newCurrentPage) {
			// update the link display of a all containers
			containers.data('currentPage', newCurrentPage);
			links = renderer.getLinks(newCurrentPage, paginationClickHandler);
			containers.empty();
			links.appendTo(containers);
			// call the callback and propagate the event if it does not return false
			var continuePropagation = opts.callback(newCurrentPage, containers);
			return continuePropagation;
		}
		
		// -----------------------------------
		// Initialize containers
		// -----------------------------------
		currentPage = parseInt(opts.currentPage, 10);
		containers.data('currentPage', currentPage);
		// Create a sane value for maxentries and pageOnce
		maxentries = (!maxentries || maxentries < 0)?1:maxentries;
		opts.pageOnce = (!opts.pageOnce || opts.pageOnce < 0)?1:opts.pageOnce;
		
		if(!$.PaginationRenderers[opts.renderer])
		{
			throw new ReferenceError("Pagination renderer '" + opts.renderer + "' was not found in jQuery.PaginationRenderers object.");
		}
		renderer = new $.PaginationRenderers[opts.renderer](maxentries, opts);
		
		// Attach control events to the DOM elements
		var pc = new $.PaginationCalculator(maxentries, opts);
		var np = pc.numPages();
		containers.off('setPage').on('setPage', {numPages:np}, function(evt, page_id) { 
				if(page_id >= 0 && page_id < evt.data.numPages) {
					selectPage(page_id); return false;
				}
		});
		containers.off('prevPage').on('prevPage', function(evt){
				var currentPage = $(this).data('currentPage');
				if (currentPage > 0) {
					selectPage(currentPage - 1);
				}
				return false;
		});
		containers.off('nextPage').on('nextPage', {numPages:np}, function(evt){
				var currentPage = $(this).data('currentPage');
				if(currentPage < evt.data.numPages - 1) {
					selectPage(currentPage + 1);
				}
				return false;
		});
		containers.off('currentPage').on('currentPage', function(){
				var currentPage = $(this).data('currentPage');
				selectPage(currentPage);
				return false;
		});
		

		links = renderer.getLinks(currentPage, paginationClickHandler);
		containers.empty();
		if(np > 1 || opts.show_if_single_page) {
			links.appendTo(containers);
		}
        
		if(opts.loadFirstPage) {
			//config中一路传过来的newSearch在此时会传入，也只有loadFirstPage时有机会传第三个参数，确保了selectPage时为false
			opts.callback(currentPage, containers,opt.newSearch);
		}
	}; 
	

	//paging是利用pagination的封装。 在含有paging分页条的母容器上发动。总数count作为option的一部分传入，而callback从option中拿出单独传入。
 	$.fn.paging = function(config,clickHandle,newSearch) {   
 			typeof config=='number' && (config={count:config});
 			var pageOnce=config.pageOnce=config.pageOnce||15;
 			var currentPage = config.currentPage||0;
		    var $this = $(this);
		    var opt = {
				pageOnce:pageOnce,
				loadFirstPage:config.loadFirstPage===false?false:true,
				num_display_entries:10,
				num_edge_entries:2,
				currentPage:currentPage,
				callback: function(pageIndex, jq){
		    		var begin = pageIndex * pageOnce;
				    var end   = Math.min((pageIndex+1) * pageOnce, config.count);
				    //执行保存了查询条件,只更改页码条件的搜索
		    		clickHandle((begin+1),end,newSearch,pageIndex,pageOnce,jq);//这个newSearch在整个pagination里只有loadFirstPage时会传递，确保selectPage时为false
				}
			};
            //发动容器内的.paging子元素是分页条元素，对其执行pagination
			$this.find('.paging')._pagination(config.count,opt);
            //发动容器内的.total-count元素显示总条数，.table-name元素显示列表名（如果有配置的话将替换原来html中的表名）
            $this.find('.total-count').html(config.count);
	        config.name && $this.find('.table-name').html(config.name); 
            //设置好描述文字后，表头条可以显示出来
			$this.find('.list-title-bar').show();
			return $this;
	};
	
	/* 用css inline-block结合IE7 hack *+html .paging div{ display:inline}解决，避免每次callback生成html后调用setFitWidth()
	function setFitWidth($this){
		var left=$this.find('.paging .prev').eq(0).offset().left;
		var right=$this.find('.paging .next').eq(0).offset().left+60;
		$this.find('.paging>div').width(right-left);
	}
	*/ 
    
    //pagingList——基于paging的restful再包装， paging处理同步(本地已有数据)情况下的分页，而pagingList是集合了ajax请求、本地缓存、paging分页的合体
		//如果一个页面要有多个pagingList的话，这里要改写，localCache和paged属性要挂在$this.data()上
		var localCache=[];
		localCache.size=0;
		var paged=false;
		var commonHTML='<div class="new-color-bar list-title-bar"> <b>▌</b><u class="table-name"></u><span class="table-desc">共查找到<u class="total-count"></u>条数据</span></div>'+
						'<div class="search-result"  tpsource="#search-result-tp"></div>'+
						'<div class="paging"></div>';
		var exeGlobalAjaxEvent=function(eveType){
			typeof $['globalAjax'+eveType]=='function' && $['globalAjax'+eveType]();
		};
		var checkCache=function(cacheMax,cacheOnce,pageOnce){
			var msg='';
			//缓存设置必须检测下有效性
			if (typeof cacheOnce!='number' || typeof cacheMax!='number') {
				msg='缓存参数设置错误，非数字！';
			}
			//单次缓存确保不超过最大缓存
			if( cacheOnce>cacheMax){
				msg='缓存参数设置错误，单次缓存数大于总体缓存数!';
			}
			//单次缓存确保不低于单页条数
			if(cacheOnce < pageOnce){
				msg='缓存参数设置错误，单次缓存数小于单页条数!';
			};
			if(msg){
				throw new Error(msg+' cacheMax,cacheOnce,pageOnce: '+[cacheMax,cacheOnce,pageOnce].join(','));
			}
			return true;
		};
		var resetCache=function(){
			localCache = [];
			localCache.size = 0;
			localCache.time = new Date().getTime();
		};
		//var setCache=function(useCache,cacheMax,data,newSearch,sectionBegin){
		var setCache=function(cacheMax,data,reset,_begin){
			_begin=_begin||1;
			//newSearch或超过缓存极限时重置
			if (reset || (localCache.size + data.length > cacheMax)) {
				resetCache();
			}

			//对应放入,localCache的index对应整体数据的index
			for (var i = data.length - 1; i > -1; i--) {
				//localCache[sectionBegin + i] = data[i];
				localCache[_begin-1 + i] = data[i];
			}

			localCache.size+=data.length;
			return true;
		};
		$.fn.setCache=function(data,_begin,reset,cacheMax){
			setCache(cacheMax||500,data,reset===false?false:true,_begin||1);
			return $(this);
		};
		//pagingList只接收一个对象做参数
		 $.fn.pagingList=function(config) {
			//第一次启动的变量全部保存起来,默认就是newSearch
            var $this = $(this),
				newSearch = config.newSearch === false ? false : true,
				useCache = config.useCache === false ? false : true,
				cacheMax = config.cacheMax || 120,
				cacheOnce = config.cacheOnce || 60,
				pageOnce = config.pageOnce || 15,
				begin = config.begin||1,
				end = config.end||(begin-1+pageOnce),
			
				name = config.name,
                //一查通默认向yctPostAction请求，其他可传自定义的action
				action = config.action || window.yctPostAction,
                //jsonObj是整个参数集合打包，并包括了跨域转接url，后台无对应接收的忽略此参数
				jsonObj = config.jsonObj || window.jsonObj || {},
                //如果不是用jsonObj把参数打包再转为jsonStr单参数传递的话，可以自定义params，是一个键值对对象，后台可以按键一一接收
				params = config.params,
				//callback是每次取回单页数据的回调，一般就是代入数据生成html
				callback = config.callback,
                //默认是用post
				method = config.method || 'post';
				
				config.commonHTML && $this.html(commonHTML);//如果发动容器为空，注明commonHTML，newSearch时生成默认html结构


			//该函数就是一个restful封装
			var remote=function(cb,reset,_begin,_end){
				//if(!confirm(jsonObj.begin+' - '+jsonObj.end))return false;
				jsonObj['begin']= _begin;
				jsonObj['end']  = useCache ? _begin-1+cacheOnce : _end;
				exeGlobalAjaxEvent('Begin');
				//params.begin=jsonObj.begin,params.end=jsonObj.end;
				$[method](action, $.extend({jsonStr: obj2str(jsonObj)}, params)).always(function (res, status) {
					exeGlobalAjaxEvent('End');
					if (status == 'success') {
						if(res.length && res.length>2048*100 || (res.data && res.data.length>500)){
							warn('异常！返回内容超长，end－bengin计算错误？或后台处理参数错误？');
							return false;
						}
						res=str2obj(res);
						if (res.flag == 1) {
							useCache && setCache(cacheMax,res.data,false,jsonObj['begin']);
							cb(res);
						} else if (res.flag == -1) {
							//TODO session过期
						} else {
							//参数错误等
							warn(obj2str(res).slice(0, 200));
						}
					}else{
						warn('请求地址错误或网络问题');
					}
				});
			};
			var pageHandle=function(_begin,_end,newSearch,pageIndex,pageOnce,jq){
				//有缓存
				if (useCache && localCache[_begin - 1] && localCache[_end - 1] && localCache.time+3*60*1000>new Date().getTime()) {
					//（newSearch为true时会清缓存，所以跑到这里newSearch一定是false,所以直接传false了）
					callback(localCache.slice(_begin - 1, _end), _begin, _end, false, pageIndex,pageOnce,jq);
				}else{
					remote(function(res){
						//callback(useCache ? localCache.slice(_begin - 1, _end):res.data, _begin,_end,newSearch,pageIndex,pageOnce,jq);//更改了callback参数列表
						callback(res.data.slice(0,pageOnce), _begin,_end,newSearch,pageIndex,pageOnce,jq);//更改了callback参数列表
					},false); 
				}
			};

			//准备就绪，开始
			checkCache(cacheMax,cacheOnce,pageOnce);

			newSearch && resetCache();
			
			if(config.count){
				$this.paging(config,pageHandle);
			}else{
				remote(function(res){
					//config.loadFirstPage=false;
					config.count=res.totalCount;	
					$this.paging(config,pageHandle);
					//pagingHandle(begin,end,newSearch);
					//loadFirstPage的机制是pagination自动执行第一页的handle，但这样无法区分newSearch，因此关闭，改为手动执行(另一方式，config传递到pagination，执行一次callback后设置为false)
				});
			}
			return $this;
		};
		 
})(window.jQuery);
 
 
// $('#userTable').paging(97,function(begin,end){})
 
//$('#userTable').pagingList({
    //begin:1,
    //end:15,
    //callback:generateForPerson,
    //newSearch:true
    //pageOnce:15,
    //useCache:true,
    //cacheOnce:60,
    //cacheMax:120,
    //name:'人员列表'
    //action:yctPostAction,
    //jsonObj:jsonObj,
    //commonHTML:false
//});
    
    

},{}],9:[function(require,module,exports){
//左侧折叠菜单
window.$.fn.treemenu=function(){
    function expandMenu(){
        //console.info(ul)
        var ul=$(this);
        if(ul.data('showed')==1){
            ul.slideUp().data('showed',0).parent().removeClass('expanded');
        }else{
            ul.slideDown().data('showed',1).parent().addClass('expanded');
        }
    }
    function selectItem(selectHandle) {
        var li=$(this);
        event.stopPropagation();
        var src,navlink,ul,secCount=li.attr('sec-count');

        //所有项移除,自身加上selected
        li.parents('.tree-menu-accordion').find('li').removeClass('selected');
        li.addClass('selected').parents('li').addClass('selected');

        //一级,设置二级selected,自动打开二级内部a
        if(li.hasClass('grade-1')){
            ul=li.children('ul').eq(0);
            expandMenu.call(ul);
            li.children('ul>li',0).addClass('selected')
            navlink=li.children('a').eq(0);
        }
        //二级,设置一级selected,打开自己内部a
        else{
            ul=li.parent();
            (ul.data('showed')!=1) && expandMenu.call(ul);
            ul.parent().addClass('selected');
            navlink=li.children('a').eq(0);
        }

        src=navlink.attr('direct')||navlink.siblings('ul').find('li').eq(0).addClass('selected').find('a').eq(0).attr('direct');//TODO 有可能是传进来指定项
        selectHandle=selectHandle||function(){};
        //log(src)
        src && selectHandle(src,this);
    }

    var doToggle=function(){
        var $this=$(this);
        var treeMenu=$this.parent();
        var collapsed=treeMenu.data('collapsed');
        if(collapsed){
            treeMenu.animate({width:170},250,function(){
                treeMenu.find('.tree-menu-accordion').fadeIn();
            });
            $this.html('◄')
        }else{
            treeMenu.find('.tree-menu-accordion').fadeOut('fast',function () {
                treeMenu.animate({width:1},250);
            });
            $this.html('▶')
        }
        treeMenu.data('collapsed',!collapsed);
    };

    return function(data,selectHandle){
        //$this=$(this);
        //var defaultHTML='<ul class="tree-menu-accordion"></ul><p id="toggle-tag">◄</p>';
        //var template='<li class="grade-1" sec-count="{secItems.length}"><a title="{name}" direct="{direct}">{name}</a><ul class="hide{secItems.length}">{{secItems:#<li class="grade-2"><a class="nav-link" title="{name}" direct="{direct}">项目存储过程</a></li>#}}</ul><b  class="hide{secItems.length}"></b></li>'
        //$this.addClass('tree-menu-accordion').html($compile(template,data));

        var ul=$('<ul class="tree-menu-accordion" tpsource="#tree-menu-tp"></ul>');
        $template(ul,data);
        return $(this).empty().append($('<p class="toggle-tag">◄</p>').click(doToggle)).append(ul).find('li').click(function(){selectItem.call(this,selectHandle);}).end();
    }
}();

window.$.fn.$close=function(){
    var $this=$(this);
    var id=$this.prop('id');
    if(id && id.indexOf('root-tab')==0){
        var index=top.rootTabs.tabs('getTabIndex', $this);
        top.rootTabs.tabs('close', index);
    }else {
        $this.window('close');
    }
    return $this;
}
window.$.fn.$select=function(){
    var $this=$(this);
    if($this.hasClass('panel-body')){
        var index=top.rootTabs.tabs('getTabIndex', $this);
        top.rootTabs.tabs('select', index);
    }else {
        //
    }
    return $this;
}

//清除linkbutton点击后的虚线
window.$.noOutline=function(selector){
    jQuery(selector||'a').on('focus',function(){this.blur();});
};

//jQuery from 序列化扩展 将jquery系列化后的值转为name:value的形式。
//$("#form2").serializeObject() => {id:"007",age:"24""}
window.$.fn.serializeObject=function(){
    var convertArray=function (arr) {
        var i=arr.length, obj = {};
        while (i--){
            if(typeof obj[arr[i].name]=='undefined')
                obj[arr[i].name] = arr[i].value;
            else
                obj[arr[i].name] += ','+arr[i].value;
        }
        return obj;
    };
    return function(){
        return convertArray(this.serializeArray());
    };
}();

window.getting({
    currentTab:function(){return top.rootTabs.tabs('getSelected');},
    currentTabWin:function(){return top.$('.tabs-panels>.panel:not(hide)').find('.tab-content-frame')[0].contentWindow;}
});

module.exports={
    //----------------基于jquery的拓展------------------
    //吐司消息
    toast:function(str){
        var holding;
        var callback;
        var itv;
        str=String(str);
        var bol= str.length>15;
        var len= bol ? str.length : 15;
        if(typeof arguments[1]=='number'){
            holding=arguments[1];
        }else if(typeof arguments[1]=='function'){
            callback=arguments[1];
        }
        // 根据文字长度增加延时, 限制最高秒数
        holding= holding || 1600+(len-15)*30;
        var p=jQuery('<div><p>str</p></div>'.replace('str',str));
        var fadeOut=function(){
            jQuery('.the-mask').remove();
            p.animate({'opacity':0},500,function(){callback && callback(p);p.remove();});
        };
        jQuery('.toast').hide();
        jQuery('body').click(fadeOut);
        // 预制样式
        return  p.addClass('toast').appendTo('body')
            //透明度 文字居中居左判断
            .css({'text-align':bol?'left':'center'})
            // 移入暂停
            .bind('mouseenter',function(){clearTimeout(itv);})
            .bind('mouseleave',function(){itv=setTimeout(fadeOut,200);})
            // 增加icon
            .extend({
                ok:function(){return p.addClass('ok');},
                err:function(){return p.addClass('err');}
            })
            // 显示
            .fadeIn(function(){
                itv=setTimeout(fadeOut,holding||960);
            });
    },
    //tab控件
    tabsInit:function (selector){
        $(selector||document.body).find('.tabs-list').find('li').on('click', function(event) {
            var tabsList = this.parentNode//$('.tabs-list');
            var tabsWrap = tabsList.parentNode;//$('.tabs-wrap');
            tabsList.find('.current').removeClass('current');
            tabsWrap.find('.tabs-content').hide();
            $(this).addClass('current');
            $(this.getAttribute('direct')).show();
        });
    },
    //--------------基于eui的扩展----------------
    // 弹窗
    $open:function showWin(str,params,isAjax,cb){

        //简写小,中,大 3种尺寸
        if(params=='s' || params=='S'){
            params={width:520,height:360};
        }else if(params=='m' || params=='M'){
            params={width:720,height:540};
        }else if(params=='l' || params=='L'){
            params={width:1020,height:720};
        }
        else if(typeof params=='string'){
            return window.$append.apply(this,[str,params,arguments[2]]);
        }
        //默认不可缩小拉伸,模态显示,允许滚动条,空白标题
        ('maximizable' in params) || (params.maximizable=false);
        ('minimizable' in params) || (params.minimizable=false);
        ('collapsible' in params) || (params.collapsible=false);
        ('resizable' in params) || (params.resizable=false);
        ('scroll' in params) || (params.scroll=true);
        ('modal' in params) || (params.modal=true);
        ('title' in params) || (params.title=' ');

        //先分辨是已有元素还是自动生成后ajax加载html或iframe的元素,随后启动,并返回句柄
        var ele;
        if(str.indexOf('#')==0 ){
            ele=$(str);
            return ele.window(params).css('visibility','visible').show();
        }else if(isAjax){
            ele=$('<div class="e-win-wrap">').css('overflow',params.scroll ? 'auto':'hidden');
            return ele.window(params).load(str,cb);
        }else{
            var id=''+Date.format('MMDDhhmmssS');
            ele=$('<div class="e-win-wrap overhide" win-id="{1}"><iframe scrolling="{0}" win-id="{1}"></iframe></div>'.format(params.scroll ? 'auto':'no',id));
            return (top._mol_wins[id]=ele.window(params).find('iframe').attr('src',str).end());
        }
    },
    // 单确定框
    $alert:function(param){
        var title='提示',icon='info',cb=function(){},msg;
        if(typeof param!='object'){
            msg=param;
            cb=arguments[1]||cb;
        }else{
            title=param.title||title;
            icon=param.icon||icon;
            cb=param.callback||cb;
            msg=param.msg;
        }
        jQuery.messager.alert(title,msg,icon,cb);
        jQuery('.messager-window, .messager-window+.window-shadow').css('top',function(i,v){return parseInt(v)-10;});
        $.noOutline();
    },
    // 二选一确认框
    $confirm:function(param){
        var title='提示',cb=function(){},msg;
        if(typeof param!='object'){
            msg=param;
            cb=arguments[1]||cb;
        }else{
            title=param.title||title;
            cb=param.callback||cb;
            msg=param.msg;
        }
        jQuery.messager.confirm(title,msg,cb);
        jQuery('.messager-window, .messager-window+.window-shadow').css('top',function(i,v){return parseInt(v)-10;});
        $.noOutline();
    },
    // 自动关闭提示框
    $show:function(str){
        jQuery.messager.show({
            title:'提示',
            msg:str,
            showType:'fade',
            timeout:1500,
            showSpeed:500,
            width:220,
            height:120,
            style:{
                right:'50%',
                top:'50%',
                margin:'-60px -110px 0  0 '
            }
        });
        $.noOutline();
    },
    $close:function(isTag){
        if(isTag){
            //关闭整个当前标签页
            var rootTabs=top.rootTabs||top.$('#root-tabs');
            var tab = rootTabs.tabs('getSelected');
            if (tab){
                var index = rootTabs.tabs('getTabIndex', tab);
                index!==0 && rootTabs.tabs('close', index);
            }
        }else{
            //关闭包含本iframe的模态窗
            var ifr=window.iframe;
            if(ifr){
                var win=top._mol_wins[ifr.getAttribute('win-id')];
                win && win.window('close');
            }
        }
    },
    $select:function(){
        var wraper=$(this.iframe).parentsUntil('.panel','.panel-body');
        return wraper.$select();
    },
    $append:function(src,label,iconCls,closable){
        var rootTabs=top.rootTabs||top.$('#root-tabs');
        //给新页签注册一个id
        var id='root-tab-'+new Date().getTime();
        //把调用窗口登记到全局
        var openerId='opener-'+id;
        top._opener_wins[openerId]=this;
        var addTab=function(id){
            rootTabs.tabs('add',{
                title: label,//'Tab'+index,
                id:id,
                content:'<iframe class="tab-content-frame" src="{0}" opener-id="{1}" frameborder="0"></iframe>'.format(src,openerId),
                iconCls:iconCls||null,//'icon-reload',
                closable: closable!==false
            });
        };
        if(rootTabs.tabs('tabs').length>(parseInt(window.config.maxTabCount)||9)){
            top.$confirm('页签窗口过多!<br>将关闭最先打开的页签, 再打开新窗口。<br>是否继续?',function(res){
                if(res) {
                    rootTabs.tabs('close', 1);
                    addTab(id);
                }
            });
        }else{
            addTab(id);
        }
        return top.$('#'+id);
    },
    /**
     * Created by XiongYing on 2016/5/21.
     */

    /*生成当前位置  <span>※ </span><span color="#265EA9">当前位置：基础信息管理 ></span> 实施项目管理
     * @parameter obj:有如下属性的对象：
     * icon:当前位置前面的符号或者图标
     * pTitle:当前页面的父页面名称数组
     * cTitle:当前页面名称
     */
    createCurrentPosition:function (obj){
    obj = obj?obj:{};
    var icon = obj.icon?obj.icon:'※',
        pTitle = obj.pTitle?obj.pTitle:[],
        cTitle = obj.cTitle?obj.cTitle:document.title,
        parentTitles = '',
        i = 0,
        positionHtml = '';

    for(;i<pTitle.length;i++){
        parentTitles += pTitle[i] + ' > ';
    }
    positionHtml = '<span>{icon}</span> 当前位置: {parentTitles}{cTitle}'.replace(/{\w*}/g,function(match){
        switch(match){
            case '{icon}':
                return icon;
            case '{parentTitles}':
                return parentTitles;
            case '{cTitle}':
                return cTitle;
        }
    });
    $('#current-position').prepend(positionHtml);
},

//显示更多、收起
toggleMoreContent:(function () {
    var isShow = [];//isShow = [{id:'1u',show:true},{id:'2c',show:false}];
    return function (obj,id) {
        var isShowLen = isShow.length,
            moreId = id,
            isMatch = false,//默认false,没有点击过,isShow数组里没有它的id
            i=0;
        for(;i<isShowLen;i++){
            if(isShow[i].id === moreId){
                if(isShow[i].show){
                    jQuery(obj).text('收起').prev().addClass('show');
                    isShow[i].show = false;
                }else{
                    jQuery(obj).text('更多').prev().removeClass('show');
                    isShow[i].show = true;
                }
                isMatch = true;
            }
        }
        if(!isMatch){
            jQuery(obj).text('收起').prev().addClass('show');
            isShow.push({id:moreId,show:false});
        }
    };
})()
};
},{}],10:[function(require,module,exports){

//for null,undefined,number,xss and others
function $encode(str,desc4null){
    var dic={'<':'&lt;','>':'&gt;','"':'&quot',"'":'‘',':':'：'};//&#39; &apos;
    // 除非显示设定为false，否则数字0会做‘’处理(字符串'0'不会)
    if($encode.zeroAsEmpty!==false && str===0){
        return '';
    }
    // 0做空处理，但不使用空值描述
    if(str==null || str=='null' || str=='NULL'){
        return desc4null||'';
    }
    str =   $encode.allowHTML ? String(str).replace(/\<\/?script[^\>]*\>/gmi,function(s){return s.replace(/\<|\>/gm,function($){return dic[$]})})
        : String(str).replace(/\<|\>/gm,function($){return dic[$]});
    //后台没做转义才开启，避免性能消耗
    return $encode.tranSymbol ? str.replace(/\"\'\{\}\:/gm,function($){return dic[$];}):str;
}
//core
function $compile(source,data,arg2,arg3) {
    var desc4null;
    var helper;
    if(typeof arg2=='string'){
        desc4null=arg2;
        typeof arg3=='function' && (helper=arg3);
    }else{
        typeof arg2=='function' && (helper=arg2);
    }
    var the=this;
    if(!source){
        throw new Error('source undefined! please chekout the template id or url!');
    }
    var format=function (obj,str,prefix) {
        if(obj==null || (typeof obj.pop=='function' && obj.length==0)){
            return '';
        }else if(typeof obj=='object'){
            var keys='';
            for(var n in obj) keys+=n;
            if(!keys) return '';
        }
        prefix=prefix||'';
        //{{arr:#tp2}}
        str=str.replace(/{{\w*:?#[\w\-]+}}|{{\w*:?#[^#].+#}}/g,function(g){
            g=g.replace(/{{|}}/gm,'').replace(/^\s+|\s+$/gm,'');
            var d,t,e,i=g.indexOf(':');
            if(i>-1){
                d=g.slice(0,i);
                if(g.lastIndexOf('#')==g.length-1){
                    t=g.slice(i+2,-1);
                }else{
                    t=$(g.slice(i+1)).html();
                    e=$(g.slice(i+1)).attr('desc4null');
                }
                return obj[d]?$compile(t,obj[d],e||desc4null):'';
            }else{
                return $(g).html()||(typeof console=='object' && console.error('can`t find the inlaid template: '+id))||'';
            }
        });

        str=str.replace(/{[A-z]+(\.?\w+)*}/gm,function(key){
            var val=obj;
            var arr=key.slice(1,-1).split('.');
            //console.warn(key)
            for(var i=0;i<arr.length;i++){
                //如果是this则指向代入的this, 直接赋值走向下个属性
                if(i==0 && arr[i]=='this'){
                    val=the;
                    continue;
                }
                if(typeof val=='number' && arr[i]=='length'){
                    //val=val;
                }else{
                    val=typeof val[arr[i]]=='function'? val[arr[i]]():val[arr[i]];
                }
                if((val==null||val=='null' || val=='NULL') && typeof arr[i+1]!='undefined'){
                    val='';
                }
                //console.info('一次循环结束\n\n  ')
            }
            return $encode(val,desc4null);
            //return the[key.replace(/{|}|(this)|\./g,'')];
        });
        return str;
    }
    data = typeof data.pop=='function' ? data : [data];
    var i=0,j=data.length,sb=[];
    for(;i<j;i++){
        helper && !data[i]._done_ && helper(data[i],i) && (data[i]._done_=true);
        sb.push(format(data[i],source).replace(/\{\$rownum\}/g,i+1).replace(/\{\$index\}/g,$encode(i)).replace(/\{\$nth2\}/g,i%2==1?'nth-even':'nth-odd'));
    }
    return sb.join('');
}
//seal4quick
var $template=(function($){
    var cache={};
    return function (container,data,arg2,arg3){
        var $container=$(container);
        var source=$container[0].getAttribute('tpsource')||container;
        if(cache[source]){
            return $container.html($compile.apply(this,[cache[source],data,arg2,arg3]));
        }else if(source.indexOf('#')==0){
            cache[source]=$(source).html();
            return $container.html($compile.apply(this,[cache[source],data,arg2,arg3]));
        }else{
            $.get(source,function(res){
                cache[source]=res;
                $container.html($compile.apply(this,[res,data,arg2,arg3]));
            });
            return $container;
        }
    }
})(window.jQuery);

// 这个方法和$compile一样暴露出来，供特殊情况时手动使用。
function $makeTemplate(tempstr,colsData,isHead){
    var wrapArr = isHead ? ['<thead>','','</thead>']:['<tr>','','</tr>'];
    tempstr = $compile(tempstr,colsData,'nullkey');
    isHead ||  (tempstr = tempstr.replace(/\[/g,'{').replace(/\]/g,'}'));
    wrapArr[1] =  tempstr ;
    return wrapArr.join('');
}

// 执行有权限列配置的template注入生成
var $templatePlus=(function($){
    var singleTable='<td class="{labelClass} {name}-lable">{label}</td><td class="{valClass} {name}-val">[{name}]</td>';
    var commonBody='<td class="{valClass} {name}-val">[{name}]</td>';
    var commonHead='<th class="{labelClass} {name}-lable">{label}</th>';
    var commonForm='<div class="stp-cell {name}-cell"><div class="stp-label {labelClass} {name}-lable">{label}</div><div class="stp-val {vallClass} {name}-val">[{name}]</div></div>';
    return function (container,config,data,desc4null){
                var tempHead;
                var tempBody;
                var html = '';
                if(config.type=='map'){              
                    tempBody=$makeTemplate(commonForm,config.cols);
                    html=$compile(tempBody,data);
                }else{
                    tempHead=$makeTemplate(commonHead,config.cols,true);
                    tempBody=$makeTemplate(commonBody,config.cols);
                    html=tempHead + '<tbody>'+$compile(tempBody,data)+'</tbody>'; 
                }
                $(container).html(html);
            }
})(window.jQuery);

var stp={
    $encode:$encode,
    $compile:$compile,
    $template:$template,
    $templatePlus:$templatePlus,
    $makeTemplate:$makeTemplate
}
//window.extending(obj);
if ( typeof module === "object" && typeof module.exports === "object" )module.exports=stp;
},{}],11:[function(require,module,exports){


    (function(context){
        Object.defineProperty(Object.prototype,'extending',{
            value:function() { //name,val or obj
                var obj={};
                typeof arguments[0]=='object'? (obj=arguments[0]):(obj[arguments[0]]=arguments[1]);
                for(var n in obj){
                    Object.defineProperty(this, n, {
                        value: obj[n],
                        writable:false, enumerable:false, configurable:false
                    }); 
                }
            },writable:false, enumerable:false, configurable:false
        });
        Object.defineProperty(Object.prototype,'getting',{
            value:function() { //name,getter or obj
                var obj={};
                typeof arguments[0]=='object'? (obj=arguments[0]):(obj[arguments[0]]=arguments[1]);
                for(var n in obj){
                    Object.defineProperty(this, n, {
                        get:obj[n],enumerable:false, configurable:false
                    }); 
                }
            },writable:false, enumerable:false, configurable:false
        });
    })(window);

    window===top && window.extending({_mol_wins:{},_opener_wins:{}});

    window.getting({
        doc:function(){return document;},
        width:function(){return this.innerWidth;},
        height:function(){return this.innerHeight;},
        scrollTop:function(){return document.documentElement.scrollTop||document.body.scrollTop;},
        scrollLeft:function(){return document.documentElement.scrollLeft||document.body.scrollLeft;},
        iframe:function(){
            var frs=parent.document.getElementsByTagName('iframe');
            for(var i=frs.length-1;i>-1;i--){
                if(frs[i].contentWindow==self){return frs[i];}
            }
            return null;
        },
        $opener:function(){
            var openerId=this.iframe.getAttribute('opener-id');
            return top._opener_wins[openerId];
        }
    });

    Object.prototype.extending('fixing',function(key){this.extending(key,this[key]);});

    //JSON扩展
    JSON.extending({
        equal:function(obj,obj2){return obj===obj2 || ( typeof obj==typeof obj2  && JSON.stringify(obj)===JSON.stringify(obj2) );}
    });
    
    //时间扩展      
    Date.prototype.extending({
        addMonth:function(i){
                var m=this.getMonth();
                var y=this.getFullYear();
                m+i<12 || (y+=1);
                this.setMonth(m+i);
                this.setFullYear(y);
                return this;
            },
        format:function (fmt) {    
            var o = {
                "M+": this.getMonth() + 1, //月份
                "D+": this.getDate(), //日
                "h+": this.getHours(), //小时
                "m+": this.getMinutes(), //分
                "s+": this.getSeconds(), //秒
                "Q+": Math.floor((this.getMonth() + 3) / 3), //季度
                "S": this.getMilliseconds() //毫秒
            };
            fmt=fmt||'YYYY-MM-DD hh:mm:ss';
            for(var n in {8:8,10:10})
                if(fmt.slice(0,+n).toUpperCase().replace(/\-|\.|\s|\//g,'')=='YYYYMMDD'){
                    fmt=fmt.slice(0,+n).toUpperCase()+fmt.slice(+n);
                }
            if (/(Y+)/.test(fmt)){
                fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
            }
            for (var k in o)
                if (new RegExp("(" + k + ")").test(fmt)){
                    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
                }
            return fmt;
            }  
    });
    
    Date.extending({
        format:function(fmt){return new Date().format(fmt);}
    });

	//String扩展
    String.prototype.extending({
        isEmpty:function(){return this.replace(/\s+/gm,'').length!=0;},
        format:function(){
                    var vname='\\{i\\}';
                    var str=this;
                    var agmt;
                    for(var i=arguments.length-1;i>-1;i--){
                        agmt=vname.replace('i',i);
                        str=str.replace(RegExp(agmt,'g'),arguments[i]);
                    }
                    return str;
                },
        inside:function(strs){
                var the=this.valueOf();
                if(typeof strs=='string'){   
                    return strs.indexOf(the)>-1;
                }else{                                                                               //字符串存在于数组某项? 不接受大小写,要忽略大小写请自己将双方toUpperCase()
                    for(var i=strs.length-1;i>-1;i--){
                        if( the===strs[i].valueOf() )
                            return i+1;	//返回第几项. 不从0开始,避免识别为false, 注意是最后一次出现的位置+1
                    }
                }
                return false;
            },
        like:function(key){
            var bs=key.indexOf('%')==0;
            var be=key.lastIndexOf('%')==key.length-1;
            if(bs&&be)  return this.indexOf(key.slice(1,-1))!=-1;
            else if(bs) return this.lastIndexOf(key.slice(1))==this.length-key.length+1;
            else if(be) return this.indexOf(key.slice(0,-1))==0;
            else return String(this)===String(key);
            },
        trimL:function(){return this.trimLeft();},
        trimR:function(){return this.trimRight();},
        lower:function(){return this.toLowerCase();},
        upper:function(){return this.toUpperCase();}            
    });
    

    var config=require('../data/config.json');
    window.extending({config:config});
    
    var $=require('../lib/jquery');
    window.extending({$:$,jQuery:$});
    
    var $eui=require('../lib/eui');
    $eui($);
    
    var $cookie=require('../lib/jquery.cookie');
    $cookie($);
    
    //var $autoComolete=require('../lib/autocomplete');
    //$autoComolete($);
    
    var exy=require('../lib/exy');
    window.extending(exy);
    
    var lambda=require('../lib/lambda');
    Array.prototype.extending(lambda);
    
    var stp=require('../lib/stp');
    window.extending(stp);
    
    var pub=require('../lib/pub');
    window.extending(pub);
    
    var locals=require('../lib/locals');
    window.extending(locals);
    
    var paging=require('../lib/paging.js');


    //window.path=top.path||location.href.replace(/index2?\.(html|jsp)/,'').replace(/view\/.*/,'');

    if(typeof module === "object" && typeof module.exports === "object" ){
        module.exports={
            checkDtd:function(){
                   if(document.compatMode=='BackCompat'){
                       throw new Error('BackCompat！please check DTD！');
                   }
                }
        }
    }
},{"../data/config.json":1,"../lib/eui":2,"../lib/exy":3,"../lib/jquery":5,"../lib/jquery.cookie":4,"../lib/lambda":6,"../lib/locals":7,"../lib/paging.js":8,"../lib/pub":9,"../lib/stp":10}]},{},[11]);
