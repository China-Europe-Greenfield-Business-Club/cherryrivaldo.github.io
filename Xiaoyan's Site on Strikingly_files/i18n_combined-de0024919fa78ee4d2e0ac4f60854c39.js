Array.prototype.indexOf || (Array.prototype.indexOf = function(e) {
    "use strict";
    if (null == this) throw new TypeError();
    var o = Object(this), r = o.length >>> 0;
    if (0 === r) return -1;
    var t = 0;
    if (arguments.length > 1 && (t = Number(arguments[1]), t != t ? t = 0 : 0 != t && t != 1 / 0 && t != -(1 / 0) && (t = (t > 0 || -1) * Math.floor(Math.abs(t)))), 
    t >= r) return -1;
    for (var i = t >= 0 ? t : Math.max(r - Math.abs(t), 0); i < r; i++) if (i in o && o[i] === e) return i;
    return -1;
}), Array.prototype.forEach || (Array.prototype.forEach = function(e, o) {
    var r, t;
    if (null == this) throw new TypeError("this is null or not defined");
    var i = Object(this), a = i.length >>> 0;
    if ("[object Function]" !== {}.toString.call(e)) throw new TypeError(e + " is not a function");
    for (o && (r = o), t = 0; t < a; ) {
        var n;
        Object.prototype.hasOwnProperty.call(i, t) && (n = i[t], e.call(r, n, t, i)), t++;
    }
}), Array.prototype.some || (Array.prototype.some = function(e) {
    "use strict";
    if (void 0 === this || null === this) throw new TypeError();
    var o = Object(this), r = o.length >>> 0;
    if ("function" != typeof e) throw new TypeError();
    for (var t = arguments.length >= 2 ? arguments[1] : void 0, i = 0; i < r; i++) if (i in o && e.call(t, o[i], i, o)) return !0;
    return !1;
}), function(e) {
    if ("undefined" != typeof module && module.exports) module.exports = e(this); else if ("function" == typeof define && define.amd) {
        var o = this;
        define("i18n", function() {
            return e(o);
        });
    } else this.I18n = e(this);
}(function(e) {
    "use strict";
    var o = e && e.I18n || {}, r = Array.prototype.slice, t = function(e) {
        return ("0" + e.toString()).substr(-2);
    }, i = function(e, o) {
        return s("round", e, -o).toFixed(o);
    }, a = function(e) {
        var o = typeof e;
        return "function" === o || "object" === o && !!e;
    }, n = function(e) {
        return Array.isArray ? Array.isArray(e) : "[object Array]" === Object.prototype.toString.call(e);
    }, s = function(e, o, r) {
        return "undefined" == typeof r || 0 === +r ? Math[e](o) : (o = +o, r = +r, isNaN(o) || "number" != typeof r || r % 1 !== 0 ? NaN : (o = o.toString().split("e"), 
        o = Math[e](+(o[0] + "e" + (o[1] ? +o[1] - r : -r))), o = o.toString().split("e"), 
        +(o[0] + "e" + (o[1] ? +o[1] + r : r))));
    }, l = {
        day_names: [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ],
        abbr_day_names: [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ],
        month_names: [ null, "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ],
        abbr_month_names: [ null, "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ],
        meridian: [ "AM", "PM" ]
    }, u = {
        precision: 3,
        separator: ".",
        delimiter: ",",
        strip_insignificant_zeros: !1
    }, d = {
        unit: "$",
        precision: 2,
        format: "%u%n",
        sign_first: !0,
        delimiter: ",",
        separator: "."
    }, c = {
        unit: "%",
        precision: 3,
        format: "%n%u",
        separator: ".",
        delimiter: ""
    }, p = [ null, "kb", "mb", "gb", "tb" ], _ = {
        defaultLocale: "en",
        locale: "en",
        defaultSeparator: ".",
        placeholder: /(?:\{\{|%\{)(.*?)(?:\}\}?)/gm,
        fallbacks: !1,
        translations: {},
        missingBehaviour: "message",
        missingTranslationPrefix: ""
    };
    return o.reset = function() {
        this.defaultLocale = _.defaultLocale, this.locale = _.locale, this.defaultSeparator = _.defaultSeparator, 
        this.placeholder = _.placeholder, this.fallbacks = _.fallbacks, this.translations = _.translations, 
        this.missingBehaviour = _.missingBehaviour, this.missingTranslationPrefix = _.missingTranslationPrefix;
    }, o.initializeOptions = function() {
        "undefined" == typeof this.defaultLocale && null !== this.defaultLocale && (this.defaultLocale = _.defaultLocale), 
        "undefined" == typeof this.locale && null !== this.locale && (this.locale = _.locale), 
        "undefined" == typeof this.defaultSeparator && null !== this.defaultSeparator && (this.defaultSeparator = _.defaultSeparator), 
        "undefined" == typeof this.placeholder && null !== this.placeholder && (this.placeholder = _.placeholder), 
        "undefined" == typeof this.fallbacks && null !== this.fallbacks && (this.fallbacks = _.fallbacks), 
        "undefined" == typeof this.translations && null !== this.translations && (this.translations = _.translations);
    }, o.initializeOptions(), o.locales = {}, o.locales.get = function(e) {
        var r = this[e] || this[o.locale] || this.default;
        return "function" == typeof r && (r = r(e)), n(r) === !1 && (r = [ r ]), r;
    }, o.locales.default = function(e) {
        var r, t = [], i = [];
        return e && t.push(e), !e && o.locale && t.push(o.locale), o.fallbacks && o.defaultLocale && t.push(o.defaultLocale), 
        t.forEach(function(e) {
            r = e.split("-")[0], ~i.indexOf(e) || i.push(e), o.fallbacks && r && r !== e && !~i.indexOf(r) && i.push(r);
        }), t.length || t.push("en"), i;
    }, o.pluralization = {}, o.pluralization.get = function(e) {
        return this[e] || this[o.locale] || this.default;
    }, o.pluralization.default = function(e) {
        switch (e) {
          case 0:
            return [ "zero", "other" ];

          case 1:
            return [ "one" ];

          default:
            return [ "other" ];
        }
    }, o.currentLocale = function() {
        return this.locale || this.defaultLocale;
    }, o.isSet = function(e) {
        return void 0 !== e && null !== e;
    }, o.lookup = function(e, o) {
        o = this.prepareOptions(o);
        var r, t, i, a = this.locales.get(o.locale).slice();
        a[0];
        for (e = this.getFullScope(e, o); a.length; ) if (r = a.shift(), t = e.split(this.defaultSeparator), 
        i = this.translations[r]) {
            for (;t.length && (i = i[t.shift()], void 0 !== i && null !== i); ) ;
            if (void 0 !== i && null !== i) return i;
        }
        if (this.isSet(o.defaultValue)) return o.defaultValue;
    }, o.meridian = function() {
        var e = this.lookup("time"), o = this.lookup("date");
        return e && e.am && e.pm ? [ e.am, e.pm ] : o && o.meridian ? o.meridian : l.meridian;
    }, o.prepareOptions = function() {
        for (var e, o = r.call(arguments), t = {}; o.length; ) if (e = o.shift(), "object" == typeof e) for (var i in e) e.hasOwnProperty(i) && (this.isSet(t[i]) || (t[i] = e[i]));
        return t;
    }, o.createTranslationOptions = function(e, o) {
        var r = [ {
            scope: e
        } ];
        return this.isSet(o.defaults) && (r = r.concat(o.defaults)), this.isSet(o.defaultValue) && (r.push({
            message: o.defaultValue
        }), delete o.defaultValue), r;
    }, o.translate = function(e, o) {
        o = this.prepareOptions(o);
        var r, t = this.createTranslationOptions(e, o), i = t.some(function(e) {
            if (this.isSet(e.scope) ? r = this.lookup(e.scope, o) : this.isSet(e.message) && (r = e.message), 
            void 0 !== r && null !== r) return !0;
        }, this);
        return i ? ("string" == typeof r ? r = this.interpolate(r, o) : a(r) && this.isSet(o.count) && (r = this.pluralize(o.count, r, o)), 
        r) : this.missingTranslation(e, o);
    }, o.interpolate = function(e, o) {
        o = this.prepareOptions(o);
        var r, t, i, a, n = e.match(this.placeholder);
        if (!n) return e;
        for (var t; n.length; ) r = n.shift(), i = r.replace(this.placeholder, "$1"), t = this.isSet(o[i]) ? o[i].toString().replace(/\$/gm, "_#$#_") : i in o ? this.nullPlaceholder(r, e, o) : this.missingPlaceholder(r, e, o), 
        a = new RegExp(r.replace(/\{/gm, "\\{").replace(/\}/gm, "\\}")), e = e.replace(a, t);
        return e.replace(/_#\$#_/g, "$");
    }, o.pluralize = function(e, o, r) {
        r = this.prepareOptions(r);
        var t, i, n, s, l;
        if (t = a(o) ? o : this.lookup(o, r), !t) return this.missingTranslation(o, r);
        for (i = this.pluralization.get(r.locale), n = i(e); n.length; ) if (s = n.shift(), 
        this.isSet(t[s])) {
            l = t[s];
            break;
        }
        return r.count = String(e), this.interpolate(l, r);
    }, o.missingTranslation = function(e, o) {
        if ("guess" == this.missingBehaviour) {
            var r = e.split(".").slice(-1)[0];
            return (this.missingTranslationPrefix.length > 0 ? this.missingTranslationPrefix : "") + r.replace("_", " ").replace(/([a-z])([A-Z])/g, function(e, o, r) {
                return o + " " + r.toLowerCase();
            });
        }
        var t = this.getFullScope(e, o), i = [ this.currentLocale(), t ].join(this.defaultSeparator);
        return '[missing "' + i + '" translation]';
    }, o.missingPlaceholder = function(e, o, r) {
        return "[missing " + e + " value]";
    }, o.nullPlaceholder = function() {
        return o.missingPlaceholder.apply(o, arguments);
    }, o.toNumber = function(e, o) {
        o = this.prepareOptions(o, this.lookup("number.format"), u);
        var r, t, a = e < 0, n = i(Math.abs(e), o.precision).toString(), s = n.split("."), l = [], d = o.format || "%n", c = a ? "-" : "";
        for (e = s[0], r = s[1]; e.length > 0; ) l.unshift(e.substr(Math.max(0, e.length - 3), 3)), 
        e = e.substr(0, e.length - 3);
        return t = l.join(o.delimiter), o.strip_insignificant_zeros && r && (r = r.replace(/0+$/, "")), 
        o.precision > 0 && r && (t += o.separator + r), d = o.sign_first ? "%s" + d : d.replace("%n", "%s%n"), 
        t = d.replace("%u", o.unit).replace("%n", t).replace("%s", c);
    }, o.toCurrency = function(e, o) {
        return o = this.prepareOptions(o, this.lookup("number.currency.format"), this.lookup("number.format"), d), 
        this.toNumber(e, o);
    }, o.localize = function(e, o, r) {
        switch (r || (r = {}), e) {
          case "currency":
            return this.toCurrency(o);

          case "number":
            return e = this.lookup("number.format"), this.toNumber(o, e);

          case "percentage":
            return this.toPercentage(o);

          default:
            var t;
            return t = e.match(/^(date|time)/) ? this.toTime(e, o) : o.toString(), this.interpolate(t, r);
        }
    }, o.parseDate = function(e) {
        var o, r, t;
        if ("object" == typeof e) return e;
        if (o = e.toString().match(/(\d{4})-(\d{2})-(\d{2})(?:[ T](\d{2}):(\d{2}):(\d{2})([\.,]\d{1,3})?)?(Z|\+00:?00)?/)) {
            for (var i = 1; i <= 6; i++) o[i] = parseInt(o[i], 10) || 0;
            o[2] -= 1, t = o[7] ? 1e3 * ("0" + o[7]) : null, r = o[8] ? new Date(Date.UTC(o[1], o[2], o[3], o[4], o[5], o[6], t)) : new Date(o[1], o[2], o[3], o[4], o[5], o[6], t);
        } else "number" == typeof e ? (r = new Date(), r.setTime(e)) : e.match(/([A-Z][a-z]{2}) ([A-Z][a-z]{2}) (\d+) (\d+:\d+:\d+) ([+-]\d+) (\d+)/) ? (r = new Date(), 
        r.setTime(Date.parse([ RegExp.$1, RegExp.$2, RegExp.$3, RegExp.$6, RegExp.$4, RegExp.$5 ].join(" ")))) : e.match(/\d+ \d+:\d+:\d+ [+-]\d+ \d+/) ? (r = new Date(), 
        r.setTime(Date.parse(e))) : (r = new Date(), r.setTime(Date.parse(e)));
        return r;
    }, o.strftime = function(e, r) {
        var i = this.lookup("date"), a = o.meridian();
        i || (i = {}), i = this.prepareOptions(i, l);
        var n = e.getDay(), s = e.getDate(), u = e.getFullYear(), d = e.getMonth() + 1, c = e.getHours(), p = c, _ = c > 11 ? 1 : 0, m = e.getSeconds(), g = e.getMinutes(), f = e.getTimezoneOffset(), y = Math.floor(Math.abs(f / 60)), h = Math.abs(f) - 60 * y, b = (f > 0 ? "-" : "+") + (y.toString().length < 2 ? "0" + y : y) + (h.toString().length < 2 ? "0" + h : h);
        return p > 12 ? p -= 12 : 0 === p && (p = 12), r = r.replace("%a", i.abbr_day_names[n]), 
        r = r.replace("%A", i.day_names[n]), r = r.replace("%b", i.abbr_month_names[d]), 
        r = r.replace("%B", i.month_names[d]), r = r.replace("%d", t(s)), r = r.replace("%e", s), 
        r = r.replace("%-d", s), r = r.replace("%H", t(c)), r = r.replace("%-H", c), r = r.replace("%I", t(p)), 
        r = r.replace("%-I", p), r = r.replace("%m", t(d)), r = r.replace("%-m", d), r = r.replace("%M", t(g)), 
        r = r.replace("%-M", g), r = r.replace("%p", a[_]), r = r.replace("%S", t(m)), r = r.replace("%-S", m), 
        r = r.replace("%w", n), r = r.replace("%y", t(u)), r = r.replace("%-y", t(u).replace(/^0+/, "")), 
        r = r.replace("%Y", u), r = r.replace("%z", b);
    }, o.toTime = function(e, o) {
        var r = this.parseDate(o), t = this.lookup(e);
        return r.toString().match(/invalid/i) ? r.toString() : t ? this.strftime(r, t) : r.toString();
    }, o.toPercentage = function(e, o) {
        return o = this.prepareOptions(o, this.lookup("number.percentage.format"), this.lookup("number.format"), c), 
        this.toNumber(e, o);
    }, o.toHumanSize = function(e, o) {
        for (var r, t, i = 1024, a = e, n = 0; a >= i && n < 4; ) a /= i, n += 1;
        return 0 === n ? (r = this.t("number.human.storage_units.units.byte", {
            count: a
        }), t = 0) : (r = this.t("number.human.storage_units.units." + p[n]), t = a - Math.floor(a) === 0 ? 0 : 1), 
        o = this.prepareOptions(o, {
            unit: r,
            precision: t,
            format: "%n%u",
            delimiter: ""
        }), this.toNumber(a, o);
    }, o.getFullScope = function(e, o) {
        return o = this.prepareOptions(o), e.constructor === Array && (e = e.join(this.defaultSeparator)), 
        o.scope && (e = [ o.scope, e ].join(this.defaultSeparator)), e;
    }, o.extend = function(e, o) {
        var r, t = {};
        for (r in e) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
        for (r in o) Object.prototype.hasOwnProperty.call(o, r) && (t[r] = o[r]);
        return t;
    }, o.t = o.translate, o.l = o.localize, o.p = o.pluralize, o;
}), function(e) {
    "undefined" != typeof module && module.exports ? e(require("i18n")) : "function" == typeof define && define.amd ? define([ "i18n" ], e) : e(this.I18n);
}(function(e) {
    "use strict";
    e.translations = {
        en: {
            js: {
                api: {
                    analytics: {
                        device: {
                            desktop: "Desktop",
                            mobile: "Mobile",
                            others: "Others"
                        },
                        geography: {
                            others: "Others"
                        },
                        period_title: {
                            past_24_hours: "Past 24 hours",
                            past_3_months: "Past 3 months",
                            past_month: "Past month",
                            past_week: "Past week",
                            past_year: "Past year"
                        },
                        referrer: {
                            direct_traffic: "Direct Traffic"
                        },
                        show: {
                            errors: {
                                exception: "There's some issue loading your page analytics. Our engineering team is looking into it now.",
                                record_not_found: "Page not found."
                            }
                        }
                    },
                    blogPosts: {
                        errors: {
                            genericPublish: "Uh oh! There's been an error publishing this blog post. Please contact us at support@strikingly.com if this problem persists!",
                            genericSave: "Uh oh! There's been an error saving this blog post. Please contact us at support@strikingly.com if this problem persists!",
                            invalidLockId: "We are having trouble saving your last change. This is caused by having multiple editors opened. Please close the other editors and refresh the page to continue.",
                            unauthorized: "Uh oh! It looks like you've been logged out! Click OK to log in again."
                        },
                        messages: {
                            confirmPublishUntitledPost: "You haven't entered a title yet. Are you sure you wish to publish?"
                        }
                    },
                    domains: {
                        confirm: {
                            delete_dns_record: "Are you sure you want to delete this record?",
                            renew: "You will be charged $24.95 for renewal. Are you sure you want to renew?",
                            renew_for_free: "This domain is included in the price of your yearly plan. Are you sure you want to renew?"
                        },
                        errors: {
                            create_dns_record_failed: "Failed to create DNS record. Please retry.",
                            create_user_failed: "Failed to create user account.",
                            delete_dns_record_failed: "Failed to delete DNS record. Please retry.",
                            empty_field_warning: "Invalid input.",
                            get_dns_record_failed: "Failed to get DNS record. Please retry.",
                            get_registrant_verification_status_failed: "Failed to get registrant verification status. Please retry or contact us at support@strikingly.com for help.",
                            get_zone_failed: "Failed to get zone details. Please retry.",
                            list_dns_records_failed: "Failed to list DNS records. Please retry.",
                            provision_failed: "Failed to provision DNS.",
                            release_domain_failed: "Failed to release domain. Please retry or contact us at support@strikingly.com for help.",
                            renew_failed: "Domain renewal has failed! Please contact us at support@strikingly.com for help.",
                            renew_payment_failed: "Billing for domain renewal has failed. Please check your billing information.",
                            send_verification_email_failed: "Failed to send verification email. Please retry or contact us at support@strikingly.com for help.",
                            setup_dns_failed: "Failed to setup DNS.",
                            update_contact_info_failed: "Failed to update contact info. Please retry or contact us at support@strikingly.com for help.",
                            update_dns_record_failed: "Failed to update DNS record. Please retry.",
                            update_nameservers_failed: "Failed to update nameservers. Please retry or contact us at support@strikingly.com for help."
                        }
                    },
                    ecommerce: {
                        charge_order: {
                            bad_request: "Uh oh! There's been an error charging the order. Please contact us at support@strikingly.com if this problem persists!",
                            internal_error: "Uh oh! There's been an error charging the order. Please contact us at support@strikingly.com if this problem persists!"
                        },
                        complete: {
                            bad_request: "Uh oh! There's been an error completing the order."
                        },
                        create_order: {
                            bad_request: "Uh oh! There's been an error creating the order.",
                            internal_error: "Uh oh! There's been an error creating the order."
                        },
                        refund: {
                            bad_request: "Uh oh! There's been an error refunding the order. Please contact us at support@strikingly.com if this problem persists!"
                        }
                    },
                    generators: {
                        generate_from_facebook: {
                            errors: {
                                already_have: "Hey! Looks like you already have a website. Click OK to see it.",
                                cant_get_data: "There was an error getting data from Facebook. Please try again.",
                                error: "There has been an error. Our engineers are looking into it now. Please retry!",
                                exception: "Network timeout. Please retry. Our engineering team is looking into it now.",
                                invalid: "{{message}}",
                                missing_user: "Missing user.",
                                no_facebook: "Oops, there seems to be some issues with connecting to Facebook. Please check your connection and try again.",
                                oauth_exception: "Your Facebook session has timed out. Please login with Facebook again."
                            },
                            messages: {
                                failed_to_get_friends: "Failed to get list of friends. Please retry.",
                                failed_to_get_pages: "Failed to get list of pages. Please retry.",
                                getting_friends: "Getting your Facebook friends...",
                                getting_pages: "Getting your Facebook Pages...",
                                to_simplify: "There has been an error connecting to Facebook. Please login and retry."
                            }
                        },
                        generate_from_linkedin: {
                            errors: {
                                exception: "Network timeout. Please retry. Our engineering team is looking into it now.",
                                invalid: "{{message}}",
                                missing_user: "Missing user.",
                                oauth_exception: "Your LinkedIn session has timed out. Please login with LinkedIn again."
                            }
                        },
                        new_year_resolutions: {
                            errors: {
                                exception: "Network timeout. Please retry. Our engineering team is looking into it now.",
                                invalid: "{{message}}",
                                missing_user: "Missing user.",
                                oauth_exception: "Your Facebook session has timed out. Please login with Facebook again."
                            }
                        },
                        share_on_linkedin: {
                            errors: {
                                exception: "Something went wrongs. Please retry. Our engineering team is looking into it now."
                            }
                        }
                    },
                    jobs: {
                        custom_domain_setup: {
                            errors: {
                                exception: "Network timeout. Please retry. Our engineering team is looking into it now.",
                                invalid: "{{message}}"
                            },
                            success: {
                                connected: "Successfully connected.",
                                disconnected: "Successfully disconnected custom domain.",
                                domain_is_live: "Your domain is live!",
                                need_configuration: "This domain is NOT connected to your site. Please make sure your domain is configured correctly.",
                                propagation_note: "After configuring your domain, changes are usually visible within 1-2 hours, but can take up to 48 hours to fully propagate."
                            }
                        }
                    },
                    pages: {
                        collaboration: {
                            errors: {
                                access_denied: "Not authorized to perform this operation. Please contact with website owner"
                            }
                        },
                        confirm: {
                            delete_site: "Are you absolutely sure you wish to delete the site titled {{name}}? This action is PERMANENT!"
                        },
                        custom_domain_update: {
                            errors: {
                                exception: "Network timeout. Please retry. Our engineering team is looking into it now.",
                                invalid: "{{message}}",
                                missing_params: "Something went wrong. Please try again. If the problem persists, use the support button to contact us.",
                                no_change: "Nothing changed."
                            },
                            success: {
                                saved: "Updated."
                            },
                            warnings: {
                                non_www_root: 'We strongly recommend "www" in front for root domains. (Submit again to ignore.)'
                            }
                        },
                        publish: {
                            success: {
                                published: "Page published."
                            }
                        },
                        settings_update: {
                            errors: {
                                invalid: "{{message}}",
                                missing_params: "Something went wrong. Please try again. If the problem persists, use the support button to contact us.",
                                premium_sites_limit_reached: "You reached the limit of published sites using premium features you can use. Please extend your plan."
                            },
                            success: {
                                permalink_changed: "Page will refresh in few seconds. Click <a href='{{edit_page_http_url}}'>here</a> if it doesn't.",
                                saved: "Saved!"
                            }
                        },
                        shared: {
                            errors: {
                                access_denied: "Not authorized to perform this operation.",
                                record_not_found: "It looks like the page has changed its URL. Click ok to go to the dashboard and select the page you want to edit.",
                                session_expired: "Session expired. Please login again to edit the page."
                            }
                        },
                        update: {
                            errors: {
                                exeption: "There's some issue saving your content. Our engineering team is looking into it now.",
                                invalid: "{{message}}"
                            },
                            success: {
                                saved: "Page Saved."
                            }
                        }
                    },
                    registrations: {
                        "500": "Error in registration. Our engineers are already looking into it. Please send an email to support@strikingly.com if you've any questions.",
                        create: {
                            errors: {
                                invalid: "{{message}}",
                                missing_params: "Email and firstname required."
                            },
                            success: {
                                saved: ""
                            }
                        }
                    },
                    shared: {
                        please_wait: "Please wait..."
                    },
                    subscriptions: {
                        check_coupon: {
                            errors: {
                                expired: "This coupon code has expired.",
                                invalid_coupon: "Invalid coupon code."
                            }
                        },
                        plan: {
                            billed_monthly: "Billed monthly",
                            billed_two_year: "Billed every 2 years",
                            billed_yearly: "Billed yearly"
                        }
                    },
                    videos: {
                        create: {
                            errors: {
                                exception: "There's some issue loading the video. Our engineering team is looking into it now.",
                                invalid: "{{message}}"
                            }
                        }
                    }
                },
                app_store: {
                    descriptions: {
                        baidu_maps: "Show your location with a Baidu map.",
                        celery: "Accept preorders and charge later. Great for crowdfunding and simple e-commerce.",
                        disqus: "Add a discussion board, and build a community of active readers and commenters.",
                        ecwid: "Full e-commerce functionality right on your site. Set up an online store, manage products, and receive payments.",
                        eventbrite: "Create an event on Eventbrite and embed a widget to sell tickets directly from your website.",
                        facebook_comments: "Let your friends around the world leave their comments here.",
                        google_calendar: "Share your Google Calendar with visitors.",
                        google_form: "Give a quiz, run a survey, or collect other information with a simple online form.",
                        google_maps: "Show your location!",
                        html: "Embed any third party service or write any code you want. A powerful tool for advanced users.",
                        instagram: "Display your Instagram pics in a gallery.",
                        locu: "Manage and publish your business listings and offerings with Locu. Showcase them on your site.",
                        mailchimp: "Use MailChimp to create, send, and track email newsletters. Embed the signup form on your site.",
                        medium: "Embed a Medium profile, collection, or blog post on your site.",
                        paypal: "Add a PayPal button to your site to receive payments.",
                        photobucket: "Play a PhotoBucket slideshow on your site.",
                        pinterest: "Show Pinterest Pins, Profiles or Boards on your site.",
                        scribd: "Embed Scribd documents or books on your site.",
                        slides: "Slides is a tool for creating, presenting and sharing presentations.",
                        slideshare: "Embed a slideshow presentation.",
                        soundcloud: "Embed a track, album, artist, or collection from SoundCloud.",
                        type_form: "Build a beautiful survey or form that pops up in your site. Free to start, pay for advanced features.",
                        wufoo: "Build a form or survey to collect data, feedback, and even payments. Free to start, pay for more volume."
                    },
                    errors: {
                        create_app_config: "Failed to create app config. This is likely caused by a network issue; try refreshing the page.",
                        init_app_config: "Failed to initialize app config. This is likely caused by a network issue; try refreshing the page.",
                        load_app_config: "Failed to load app config. This is likely caused by a network issue; try refreshing the page.",
                        save_app_config: "Failed to save app config. This is likely caused by a network issue; try refreshing the page.",
                        scribe_url_incorrect: "Incorrect input! Example input: 'http://www.scribd.com/doc/220861572/Aurora-Cidr03'.",
                        url_not_fount: "This URL is not found. Please use a correct one!"
                    },
                    names: {
                        baidu_maps: "Baidu Maps",
                        celery: "Celery",
                        disqus: "Disqus",
                        ecwid: "Ecwid",
                        eventbrite: "Eventbrite",
                        facebook_comments: "Facebook Comments",
                        google_calendar: "Google Calendar",
                        google_form: "Google Form",
                        google_maps: "Google Maps",
                        html: "HTML",
                        instagram: "Websta",
                        locu: "Locu",
                        mailchimp: "MailChimp",
                        medium: "Medium",
                        paypal: "PayPal",
                        photobucket: "PhotoBucket",
                        pinterest: "Pinterest",
                        scribd: "Scribd",
                        slides: "Slides",
                        slideshare: "SlideShare",
                        soundcloud: "SoundCloud",
                        type_form: "Typeform",
                        wufoo: "Wufoo"
                    },
                    tooltips: {
                        help_tooltip: "Read a more detailed tutorial for this app.",
                        pro_app_tooltip: "To use this app, upgrade to a Pro plan.",
                        upgrade_link_tooltip: "Upgrade now to unlock Pro apps!"
                    }
                },
                confirm: {
                    disconnect_facebook: "Are you sure you wish to disconnect your Facebook account?",
                    disconnect_linkedin: "Are you sure you wish to disconnect your LinkedIn account?"
                },
                email_settings: {
                    saved: "Saved!"
                },
                form_responses: {
                    confirm: {
                        delete_blog_subscription: "Are you sure you wish to delete these subscription entries? Removing a blog subscription entry will delete the subscription",
                        delete_form_response: "Are you sure you wish to delete these entries?"
                    },
                    labels: {
                        contact: "Contact form",
                        signup: "Signup form"
                    }
                },
                html_editor: {
                    script_error: "The HTML you entered contains scripts that cannot be displayed in the editor. <br/><br/> Please preview your site to view your content."
                },
                invitations: {
                    create: {
                        errors: {
                            missing: "{{message}}"
                        }
                    },
                    new: {
                        claim_confirm: "Yes, unlock!",
                        claim_msg: "Unlock this reward! Are you sure?",
                        confirm: "OK",
                        email_hint: "Enter a list of recipients' emails here, or import your contacts by clicking the button above.",
                        invitation_sent: "Invitation sent! Remind your friends to sign up to claim your rewards.",
                        network_error: "There has been an network error. Refresh the page and try again."
                    }
                },
                jquery: {
                    errors: {
                        required: "This field is required."
                    }
                },
                migration: {
                    add_new_section: "Add New Section",
                    add_new_section_tip: "Add new functionalities to your site!",
                    click_to_complete: "Click to complete your update and publish your changes!",
                    error: "Oops, something went wrong. Refresh the page and try again; if the error keeps happening please contact support!",
                    layout: "Layout",
                    layout_tip: "Try out new layouts!",
                    styles: "Styles",
                    styles_tip: "Swap templates in the Style menu!",
                    support_tip: "Contact us if you'd like to roll back.",
                    this_feature: "this feature"
                },
                pages: {
                    alert: {
                        feature_limit: "Uh oh! It looks like you're using some Pro features ({{features}}). Please remove them to publish this site!",
                        unknown_publish_support: "Uh oh! Your site can't be published right now. Please contact support@strikingly.com for help!"
                    },
                    blog: {
                        confirm: {
                            delete_blog_post: "Are you absolutely sure you wish to delete this blog post? This action is PERMANENT!"
                        },
                        text: {
                            save_error: "Saving error. Contact us (support@strikingly.com) if this problem persists.",
                            saved: "Saved!",
                            saving: "Saving..."
                        }
                    },
                    dashboard: {
                        cancel: "Cancel",
                        clone_msg: "Would you like to duplicate this site?",
                        clone_pub_msg: {
                            pro: "Note that you have reached your publish limit for your Pro sites. You can clone more sites, but you won't be able to publish them if you use Pro features in them. Continue?",
                            starter: "Note that you have reached your publish limit for your Limited sites. You can clone more sites, but you won't be able to publish them if you use Limited features in them. Continue?"
                        },
                        confirm: "Confirm",
                        pub_confirm: "Confirm Publish",
                        pub_failed: "Uh-oh. Publish failed. Please contact us at support@strikingly.com for assistance!",
                        pub_msg: "This will make your site visible to the world!",
                        pub_quota: "You've hit your published site limit! You must unpublish another site before you can publish this one!",
                        quota_confirm: "OK, I understand",
                        sort: {
                            created: "Recently created",
                            name: "Name",
                            updated: "Recently updated"
                        },
                        unpub_confirm: "Confirm Unpublish",
                        unpub_msg: 'Are you sure you wish to unpublish? This will make your site go into "Under Construction" mode.'
                    },
                    ecommerce: {
                        confirm: {
                            cancel_edit: "Exit the editor without saving?",
                            delete_item: "Are you sure you want to delete this item?",
                            delete_product: "Are you sure you want to delete this product?",
                            delete_product_with_coupon: "Are you sure you want to delete this product?",
                            disconnect_account: "Are you sure you want to disconnect your {{provider}} account?",
                            payment_not_set: "You haven't set up your payment gateway for your Simple Store yet! You must set it up in your store settings to enable checkout.\n\nClick OK to publish anyway.\n",
                            payment_not_set_proceed: "You haven't set up your payment gateway for your Simple Store yet! You must set it up in your store settings to enable checkout.\n\nClick OK to proceed.\n",
                            payment_not_set_short: "You haven't set up your payment gateway for your Simple Store yet! You must set it up in your store settings to enable checkout."
                        },
                        coupon: {
                            delete_warning: "Are you sure you want to delete this coupon code?",
                            detailedDescription: "This coupon will apply {{amount}}% discount off of the the entire order (excluding shipping).",
                            expired: "Expired",
                            flat_description: "{{token}} ({{amount}} Off)",
                            free_shipping_description: "{{token}} (Free shipping)",
                            percentange_description: "{{token}} ({{amount}}% Off)"
                        },
                        errors: {
                            can_not_load_products: "Oops, a network issue occurred, please refresh and try again.",
                            coupon_no_amount: "Amount can't be blank!",
                            coupon_no_token: "Coupon code can't be blank!",
                            coupon_repeated_token: "There's already a coupon with the same code!",
                            coupon_zero_amount: "Amount can't be 0!",
                            empty_quantity: "Quantity can not be 0 or empty.",
                            general_required_error_v1: "{field} is required.",
                            general_required_error_v2: "{field} are required.",
                            image_limication: "You can upload a maximum of 10 images. Deselect XXX image(s) to contiune.",
                            invalid_input: "Invalid value.",
                            invalid_quantity: "Out of stock.",
                            seller_not_connect_gateway: "Seller has not connected his/her payment gateway. Can not buy now."
                        },
                        options: {
                            cancelled: "Cancelled",
                            completed: "Completed",
                            pending: "Pending"
                        },
                        providers: {
                            alipay: "Alipay",
                            paypal: "Paypal",
                            stripe_connect: "Stripe"
                        },
                        text: {
                            choose_a_country: "Choose a Country",
                            choose_a_type: "Choose a Type",
                            cta_btn: "Buy Now",
                            description: "Add product description. Keep it short and sweet!",
                            edit_btn_add_product: "Add Product",
                            edit_btn_mange_product: "Manage Product",
                            price_for_required_error: "Price",
                            product_name: "Add Product Name",
                            product_name_for_required_error: "Product Name",
                            rest_of_world: "Rest of the World",
                            variant_name_for_required_error: "Option",
                            world: "The World"
                        }
                    },
                    edit: {
                        confirm: {
                            delete_blog_section: "Are you sure you want to delete this section?\n\nBlog posts will NOT be deleted. (Just add the section back to show them again.)",
                            delete_collaborator: "Are you sure you wish to delete this collaborator? They will no longer be able to edit this site!",
                            delete_library_file: "Are you sure you wish to delete this file?",
                            delete_library_image: "Are you sure you wish to delete this image?",
                            delete_section: "Are you sure you want to delete this section? This action cannot be undone.",
                            delete_section_v4: "Are you sure you want to delete this section?",
                            delete_social_account: "Are you sure you wish to delete this account? The related feeds will not show in page anymore.",
                            unsaved_changes: "You have unsaved changes on this page. If you navigate away from this page you will lose those changes."
                        },
                        domain_emails: {
                            confirm: {
                                delete_entry: "Are you sure you want to delete this entry?"
                            },
                            errors: {
                                limit_reached: "You can only create {{limit}} emails."
                            }
                        },
                        errors: {
                            already_have_blog: "You already have a blog section on this site!",
                            already_have_ecommerce: "You already have a Store section on this site!",
                            already_have_social_feed: "You already have a Social Feed section on this site!",
                            api_error: "Oops, a network issue occurred. Our engineers have been notified and are looking into it!",
                            delete_file_fail: "Failed to load library. Please try again or contact us for assistance!",
                            duplicate_collaborator: "You've already invited this person before!",
                            effects_network_error: "Oops, a network issue prevents you from adding effects, please refresh and try again.",
                            email_format_error: "Invalid email address!",
                            get_presigned_post_error: "Uh oh! Something is wrong with the uploader. Please try again or contact us at support@strikingly.com for assistance!",
                            load_files_fail: "Failed to load library. Please try again or contact us for assistance!",
                            max_slides_reached: "You can only create {{max}} sections here. If you'd like more, let us know using the feedback button in the bottom right!",
                            multi_file_error: "Please drag 1 file at a time.",
                            network_error: "Oops, a network issue occurred, please refresh and try again.",
                            save_error: "A problem occured while saving your page. Please try again.",
                            social_account_connect_error: "Failed to connect you account. Please try again or contact us for assistance!",
                            too_many_invitations: "Sorry! You can only invite 10 people per site.",
                            upload_fail: "Upload failed. Please try again or contact us for assistance!",
                            upload_network_error: "Oops, a network issue prevents you from uploading, please refresh and try again.",
                            video_type_error: "URL is invalid."
                        },
                        html_editor: {
                            ecwid: {
                                enter_store_id: "Please enter a Store ID."
                            },
                            google_maps: {
                                enter_location: "Please enter a location!",
                                view_larger_map: "View larger map"
                            },
                            shared: {
                                errors: null
                            },
                            slides: {
                                errors: {
                                    invalid_url: "Invalid URL! Please use a valid slid.es URL."
                                }
                            },
                            soundcloud: {
                                errors: {
                                    invalid_url: "Invalid URL! Please use a valid soundcloud.com URL."
                                }
                            }
                        },
                        notice: {
                            mobile_notice: "Welcome to the Strikingly editor! It looks like you're using a mobile device. Websites that you build with Strikingly look awesome on all devices, but we recommend editing your site on a desktop or laptop.",
                            pro_section_notice: "You've selected a Pro section! You can try this section out, but it won't show up on your live site until you upgrade to Pro."
                        },
                        rich_text: {
                            align_center: "Center",
                            align_justify: "Justify",
                            align_left: "Align Left",
                            align_right: "Align Right",
                            bold: "Bold",
                            bulleted_list: "Insert/Remove Bulleted List",
                            confirm_cancel: "You have changed some options. Are you sure you want to close the dialog window?",
                            custom: "Custom",
                            font_family: "Change Font Family",
                            font_size: "Change Font Size",
                            font_size_large: "Large",
                            font_size_larger: "Larger",
                            font_size_normal: "Normal",
                            font_size_small: "Small",
                            font_size_smaller: "Smaller",
                            italic: "Italic",
                            link: "Link",
                            link_dialog_document: "Document",
                            link_dialog_email: "Email",
                            link_dialog_email_address: "Address",
                            link_dialog_email_placeholder: "e.g. john@example.com",
                            link_dialog_invalid_email: "Invalid email address",
                            link_dialog_open_in_new_tab: "Open in new tab",
                            link_dialog_remove_document: "Remove Document",
                            link_dialog_remove_email: "Remove Email",
                            link_dialog_remove_link: "Remove Link",
                            link_dialog_title: "Link to",
                            link_dialog_upload_file: "Upload File",
                            link_dialog_url: "URL",
                            link_dialog_url_placeholder: "e.g. http://abc.com OR #2 (section number)",
                            link_dialog_web: "Web",
                            numbered_list: "Insert/Remove Numbered List",
                            save: "Save",
                            underline: "Underline",
                            use_default: "Default"
                        }
                    },
                    social_feed: {
                        text: {
                            posts: "Posts",
                            posts_on_timeline: "Posts on timeline",
                            tweets: "Tweets"
                        }
                    }
                },
                payment: {
                    add_ons: {
                        errors: {
                            network_error: "Failed to submit your changes. Make sure network is okay and try again.",
                            no_active_subscription: "You don't have any active subscription.",
                            not_supported: "Your account does not support purchase of {{add_on_type}} yet."
                        },
                        types: {
                            additional_page: "additional page"
                        }
                    }
                },
                plans: {
                    name: {
                        pro_2y: "Pro Two-year",
                        pro_monthly: "Pro Monthly",
                        pro_yearly: "Pro Yearly",
                        starter_2y: "Limited Two-year",
                        starter_monthly: "Limited Monthly",
                        starter_yearly: "Limited Yearly"
                    }
                },
                select_template: {
                    confirm: {
                        ok: "  OK  "
                    },
                    info: {
                        no_site: "Hey, looks like you don't have a site yet. Select a beautiful template here to start!"
                    }
                },
                settings_dialog: {
                    updated: "Updated."
                },
                student_program: {
                    email_denied: "We failed to validate your email address. Check if you entered anything wrong, or contact support if you have any questions.",
                    network_error: "There has been an network error. Refresh the page and try again."
                },
                subscriptions: {
                    edit: {
                        confirm: {
                            downgrade: "Are you absolutely sure you wish to downgrade? Your account will have a credit for the amount you've already paid.",
                            general: "Are you absolutely sure you wish to change your plan? If you're upgrading, your account will be billed accordingly.",
                            upgrade: "Are you absolutely sure you wish to upgrade? Your account will be billed on a pro-rated basis."
                        }
                    },
                    new: {
                        billing: {
                            coupon_applied_free_period_notice: "You won't be billed immediately. The first {{free_period_days}} days are free. Starting {{billing_start_date}}, you will be billed <strong class='dark'>${{discounted_price}} per {{period}}</strong> and <strong class='dark'>${{price}} per {{period}}</strong> after that.",
                            coupon_applied_no_free_period_notice: "You will be billed <strong class='dark'>${{discounted_price}} per {{period}}</strong> and <strong class='dark'>${{price}} per {{period}}</strong> after that.",
                            free_period_notice: "You won't be billed immediately. The first {{free_period_days}} days are free. Starting {{billing_start_date}}, you will be billed <strong class='dark'>${{price}} per {{period}}</strong>.",
                            heading: "{{free_period_full_string}} Free &mdash; Guaranteed",
                            no_free_period_notice: "You will be billed <strong class='dark'>${{price}} per {{period}}</strong>."
                        },
                        coupon: {
                            applied: "{{percent}}% discount applied!",
                            applied_notice: "Coupon applied! The coupon is only valid for the first billing period!",
                            invalid: "Invalid coupon code.",
                            not_applicable: "The coupon doesn't apply to the plan you choose.",
                            wait: "Wait..."
                        },
                        errors: {
                            card_expiry: "Please enter a valid expiration",
                            card_number: "Please enter a valid card number",
                            cvc: "Please enter a valid security code",
                            postal_code: "Postal code can't be empty"
                        },
                        paypal: {
                            free_period_description: "You are subscribing to Strikingly {{plan}} plan and will not be billed until {{billing_start_date}}.",
                            no_free_period_description: "You are subscribing to Strikingly {{plan}} plan."
                        },
                        periods: {
                            month: "month",
                            two_year: "2 years",
                            year: "year"
                        },
                        prices: {
                            pro_2y: "$336/two-year",
                            pro_monthly: "$20/month",
                            pro_yearly: "$192/year",
                            starter_2y: "$168/two-year",
                            starter_monthly: "$12/month",
                            starter_yearly: "$96/year"
                        },
                        why_billing_info: "We ask for your credit card to prevent interruption of your Strikingly account if you choose to keep your account active after your free period expires. It also allows us to reduce fraud. <br/><br/> Your credit card will not be charged at any point during your free period. If you cancel during the free period, you will not be charged at any time. <br/><br/> We'll even send you an email three days before your free period is over to remind you it's about to expire."
                    }
                },
                traffic_guide: {
                    confirm_go_to_editor: "Go to the editor now to update the settings?"
                }
            }
        },
        es: {
            js: {
                api: {
                    analytics: {
                        device: {
                            desktop: "Escritorio",
                            mobile: "Móvil",
                            others: "Otros"
                        },
                        geography: {
                            others: "Otros"
                        },
                        period_title: {
                            past_24_hours: "Últimas 24 horas",
                            past_3_months: "Últimos 3 meses",
                            past_month: "Último mes",
                            past_week: "Última semana",
                            past_year: "Último año"
                        },
                        referrer: {
                            direct_traffic: "Tráfico Directo"
                        },
                        show: {
                            errors: {
                                exception: "Hubo un problema al cargar las estadísticas de tu página. Nuestro equipo de ingenieros está trabajando en el problema.",
                                record_not_found: "No se encontró la página."
                            }
                        }
                    },
                    blogPosts: {
                        errors: {
                            genericPublish: "¡Uh oh! Hubo un error al publicar este blog. ¡Por favor contáctamos en support@strikingly.com si el problema persiste!",
                            genericSave: "¡Uh oh! Hubo un error al guardar la publicación de este blog. ¡Por favor contáctamos en support@strikingly.com si el problema persiste!",
                            invalidLockId: "Tenemos un problema al guardar tu último cambio. Puede ser que hayas abierto varios editores. Por favor cierra los otros editores y cargar de nuevo la página para continuar.",
                            unauthorized: "¡Uh oh! ¡Parece que has cerrado la sesión! Haz clic en OK para iniciarla de nuevo."
                        },
                        messages: {
                            confirmPublishUntitledPost: "Aún no has introducido un título. ¿Seguro de que lo quieres publicar?"
                        }
                    },
                    domains: {
                        confirm: {
                            delete_dns_record: "¿Seguro de que quieres borrar el récord?",
                            renew: "Te cobrarán $24.95 para la renovación. ¿Seguro de que quieres renovarlo?",
                            renew_for_free: "El dominio está incluido en el precio de tu plan anual. ¿Seguro de que quieres renovarlo?"
                        },
                        errors: {
                            create_dns_record_failed: "Error al crear el récord de DNS. Por favor intenta de nuevo.",
                            create_user_failed: "Error al crear la cuenta de usuario.",
                            delete_dns_record_failed: "Error al borrar el récord de DNS. Por favor intenta de nuevo.",
                            empty_field_warning: "Entrada inválida.",
                            get_dns_record_failed: "Error al conseguir el récord de DNS. Por favor intenta de nuevo.",
                            get_registrant_verification_status_failed: "Error al conseguir el estato de la verificación del registro. Por favor intenta de nuevo o contáctanos en support@strikingly.com para ayuda.",
                            get_zone_failed: "Error al crear la cuenta de usuario.",
                            list_dns_records_failed: "Error al insribir los récords de DNS. Por favor intenta de nuevo.",
                            provision_failed: "Error al proveer el DNS.",
                            release_domain_failed: "Error al publicar el dominio. Por favor intenta de nuevo o contáctanos en support@strikingly.com para ayuda.",
                            renew_failed: "¡Error de la renovación del dominio! Por favor contáctanos en support@strikingly.com para ayuda.",
                            renew_payment_failed: "¡Error de la facturación del dominio! Por favor revisa tu información de facturación.",
                            send_verification_email_failed: "Error al enviar el email de verificación. Por favor intenta de nuevo o contáctanos en support@strikingly.com para ayuda.",
                            setup_dns_failed: "Error al ajustar el DNS.",
                            update_contact_info_failed: "Error al actualizar la información de contactos. Por favor intenta de nuevo o contáctanos en support@strikingly.com para ayuda.",
                            update_dns_record_failed: "Error al actualizar el récord de DNS. Por favor intenta de nuevo.",
                            update_nameservers_failed: "Error al actualizar los servidores de nombre. Por favor intenta de nuevo o contáctanos en support@strikingly.com para ayuda."
                        }
                    },
                    ecommerce: {
                        charge_order: {
                            bad_request: "¡Uh oh!  Hubo un error al cobrar el pedido. Si el problema persiste, ¡por favor ponte en contacto con nosotros por support@strikingly.com!",
                            internal_error: "¡Ah no! Ha existido un error al cobrar el pedido. Si el problema persiste, ¡por favor ponte en contacto con nosotros por support@strikingly.com!"
                        },
                        complete: {
                            bad_request: "Uh oh! There's been an error completing the order."
                        },
                        create_order: {
                            bad_request: "¡Uh oh!  Hubo un error al crear el pedido.",
                            internal_error: "¡Uh oh!  Hubo un error al crear el pedido."
                        },
                        refund: {
                            bad_request: "Uh oh! There's been an error refunding the order. Please contact us at support@strikingly.com if this problem persists!"
                        }
                    },
                    generators: {
                        generate_from_facebook: {
                            errors: {
                                already_have: "¡Oye! Parece que ya tienes un sitio web. Haz clic en OK para revisarla.",
                                cant_get_data: "Hubo un error al conseguir datos desde Facebook. Por favor intenta de nuevo.",
                                error: "Hubo un error. Nuestro equipo de ingenieros está trabajando en este problema. ¡Por favor intenta de nuevo!",
                                exception: "Tiempo de conexión agotado. Por favor, vuelve a intentarlo. Nuestro equipo de ingenieros están trabajando en el problema.",
                                invalid: "{{message}}",
                                missing_user: "Falta el usuario.",
                                no_facebook: "Vaya, parece que hay un problema al conectar de Facebook. Por favor revisa tu conexión y vuelve a intentarlo.",
                                oauth_exception: "Tu sesión de Facebook ha terminado. Vuelve a iniciar sesión en Facebook."
                            },
                            messages: {
                                failed_to_get_friends: "Fracaso al conseguir la lista de amigos. Por favor intenta de nuevo.",
                                failed_to_get_pages: "Fracaso al conseguir la lista de páginas. Por favor intenta de nuevo.",
                                getting_friends: "Consiguiendo tus amigos de Facebook...",
                                getting_pages: "Consiguiendo tus páginas de Facebook...",
                                to_simplify: "Hubo un problema al conectar con Facebook. Por favor inicia sesión e intertarlo de nuevo."
                            }
                        },
                        generate_from_linkedin: {
                            errors: {
                                exception: "Tiempo de conexión agotado. Por favor, vuelve a intentarlo. Nuestro equipo de ingenieros están trabajando en el problema.",
                                invalid: "{{message}}",
                                missing_user: "Falta el usuario.",
                                oauth_exception: "Tu sesión de Linkedln ha caducado. Vuelve a iniciar sesión en Linkedln."
                            }
                        },
                        new_year_resolutions: {
                            errors: {
                                exception: "Tiempo de conexión agotado. Por favor, vuelve a intentarlo. Nuestro equipo de ingenieros están trabajando en el problema.",
                                invalid: "{{message}}",
                                missing_user: "Falta el usuario.",
                                oauth_exception: "Tu sesión de Facebook ha terminado. Vuelve a iniciar sesión en Facebook."
                            }
                        },
                        share_on_linkedin: {
                            errors: {
                                exception: "Algo salió mal. Por favor, vuelve a intentarlo. Nuestro equipo de ingenieros está trabajando en el problema."
                            }
                        }
                    },
                    jobs: {
                        custom_domain_setup: {
                            errors: {
                                exception: "Tiempo de conexión agotado. Por favor, vuelve a intentarlo. Nuestro equipo de ingenieros están trabajando en el problema.",
                                invalid: "{{message}}"
                            },
                            success: {
                                connected: "Conectado con éxito.",
                                disconnected: "Dominio personalizado desconectado con éxito.",
                                domain_is_live: "¡Tu dominio está activo!",
                                need_configuration: "Este dominio NO está conectado a tu página. Por favor, asegúrate de que tu dominio está configurado correctamente.",
                                propagation_note: "Después de configurar tu dominio los cambios normalmente se realizan al cabo de 1-2 horas, pero nótese que pueden llegar a tardar hasta 48 horas en aplicarse completamente."
                            }
                        }
                    },
                    pages: {
                        collaboration: {
                            errors: {
                                access_denied: "No estás autorizado para realizar esta operación. Por favor ponte en contacto con el dueño del sitio web."
                            }
                        },
                        confirm: {
                            delete_site: "Are you absolutely sure you wish to delete the site titled {{name}}? This action is PERMANENT!"
                        },
                        custom_domain_update: {
                            errors: {
                                exception: "Tiempo de conexión agotado. Por favor, vuelve a intentarlo. Nuestro equipo de ingenieros están trabajando en el problema.",
                                invalid: "{{message}}",
                                missing_params: "Algo salió mal. Vuelve a intentarlo. Si el problema persiste, utiliza el botón de asistencia para contactarnos.",
                                no_change: "Nada cambió."
                            },
                            success: {
                                saved: "Actualizado."
                            },
                            warnings: {
                                non_www_root: 'Recomendamos encarecidamente poner "www" los dominios de root. (Someter de nuevo para ignorarlo.)'
                            }
                        },
                        publish: {
                            success: {
                                published: "Página publicada."
                            }
                        },
                        settings_update: {
                            errors: {
                                invalid: "{{message}}",
                                missing_params: "Algo salió mal. Vuelve a intentarlo. Si el problema persiste, utiliza el botón de asistencia para contactarnos.",
                                premium_sites_limit_reached: "You reached the limit of published sites using premium features you can use. Please extend your plan."
                            },
                            success: {
                                permalink_changed: "La página volverá a cargar en unos segundos. Haz clic <a href='{{edit_page_http_url}}'>aquí</a> si no carga.",
                                saved: "¡Guardado!"
                            }
                        },
                        shared: {
                            errors: {
                                access_denied: "No estás autorizado para realizar esta operación.",
                                record_not_found: "Parece que ha cambiado la URL de la página. Haz clic en Aceptar para ir al panel y seleccionar la página que deseas editar.",
                                session_expired: "La sesión ha terminado. Vuelve a iniciar sesión para editar la página."
                            }
                        },
                        update: {
                            errors: {
                                exeption: "Hubo un problema al cargar el video. Nuestro equipo de ingenieros está trabajando en el problema.",
                                invalid: "{{message}}"
                            },
                            success: {
                                saved: "Página guardada."
                            }
                        }
                    },
                    registrations: {
                        "500": "Error in registration. Our engineers are already looking into it. Please send an email to support@strikingly.com if you've any questions.",
                        create: {
                            errors: {
                                invalid: "{{message}}",
                                missing_params: "Se requieren el email y el nombre."
                            },
                            success: {
                                saved: ""
                            }
                        }
                    },
                    shared: {
                        please_wait: "Espera..."
                    },
                    subscriptions: {
                        check_coupon: {
                            errors: {
                                expired: "El cupón ha vencido.",
                                invalid_coupon: "Cupón no válido"
                            }
                        },
                        plan: {
                            billed_monthly: "Facturado mensualmente",
                            billed_two_year: "Facturado cada 2 años",
                            billed_yearly: "Facturado anualmente"
                        }
                    },
                    videos: {
                        create: {
                            errors: {
                                exception: "Hubo un problema al cargar el video. Nuestro equipo de ingenieros está trabajando en el problema.",
                                invalid: "{{message}}"
                            }
                        }
                    }
                },
                app_store: {
                    descriptions: {
                        baidu_maps: "Muestra tu ubicación con un Baidu map.",
                        celery: "Pedidos anticipados y cobro después aceptados. Genial para financiación colectiva y e-comercio simple.",
                        disqus: "Agrega un tablero de discusión y establece una comunidad de lectores y comentadores activos.",
                        ecwid: "Funcionalidad completa de e-commerce en su sitio. Establece una tienda en línea, gestiona los productos, y recibie pagos.",
                        eventbrite: "Crea un evento en Eventbrite e inserta un widget para vender directamente entradas desde tu sitio web.",
                        facebook_comments: "Permite que tus amigos por todo el mundo dejen sus comentarios aquí.",
                        google_calendar: "Comparte tu Google Calendar con los visitantes.",
                        google_form: "Diseña un quiz, gestiona una encuesta, o recopila otra información con un sencillo formulario en línea.",
                        google_maps: "¡Muestra tu ubicación!",
                        html: "Inserta cualquier servicio de terceros o escribe tu propio código. Una herramienta poderosa para los usuarios avanzados.",
                        instagram: "Muestra los fotos de tu Instagram en una galería.",
                        locu: "Gestiona y publica las ofertas y cotizaciones de tu negocio con Locu. Preséntalas en tu sitio.",
                        mailchimp: "Usa MailChimp para crear, enviar y seguir las notificaciones de email. Insertar el formulario de registro en tu sitio.",
                        medium: "Inserta un perfil de Medium, una colección o una publicación de blog en tu sitio.",
                        paypal: "Agrega un botón de PayPal en tu sitio para recibir pagos.",
                        photobucket: "Reproduce una diapositiva de PhotoBucket en tu sitio.",
                        pinterest: "Muestra Pins, Perfiles o Tableros de Pinterest en tu sitio.",
                        scribd: "Inserta documentos de Scribd o libros en tu sitio.",
                        slides: "Slides es una herramienta para crear, mostrar y compartir las presentaciones.",
                        slideshare: "Inserta una presentación de diapositivas.",
                        soundcloud: "Insertar una pista, álbum, artista o colección desde SoundCloud.",
                        type_form: "Elabora una encuesta o un formulario que surge en tu sitio. Gratis para empezar, pagar para funciones avanzadas.",
                        wufoo: "Establece un formulario o una encuesta para recopilar datos, comentarios e incluso pagos. Es gratis para empezar y puedes pagar por más volumen."
                    },
                    errors: {
                        create_app_config: "Error al crear la configuración de la aplicación. Probablemente se debe a un problema de la red; por favor carga de nuevo la página.",
                        init_app_config: "Error al iniciar la configuración de la aplicación. Probablemente se debe a un problema de la red; por favor carga de nuevo la página.",
                        load_app_config: "Error al cargar la configuración de la aplicación. Probablemente se debe a un problema de la red; por favor carga de nuevo la página.",
                        save_app_config: "Error al guardar la configuración de la aplicación. Probablemente se debe a un problema de la red; por favor carga de nuevo la página.",
                        scribe_url_incorrect: "¡Entrada incorrecta! Ejemplo de entrada: 'http://www.scribd.com/doc/220861572/Aurora-Cidr03'.",
                        url_not_fount: "Este URL no se  puede encontrar. ¡Por favor usa un correcto!"
                    },
                    names: {
                        baidu_maps: "Baidu Maps",
                        celery: "Celery",
                        disqus: "Disqus",
                        ecwid: "Ecwid",
                        eventbrite: "Eventbrite",
                        facebook_comments: "Comentarios de Facebook",
                        google_calendar: "Google Calendar",
                        google_form: "Google Form",
                        google_maps: "Google Maps",
                        html: "HTML",
                        instagram: "Websta",
                        locu: "Locu",
                        mailchimp: "MailChimp",
                        medium: "Medium",
                        paypal: "PayPal",
                        photobucket: "PhotoBucket",
                        pinterest: "Pinterest",
                        scribd: "Scribd",
                        slides: "Slides",
                        slideshare: "SlideShare",
                        soundcloud: "SoundCloud",
                        type_form: "Typeform",
                        wufoo: "Wufoo"
                    },
                    tooltips: {
                        help_tooltip: "Lee un tutorial más detallado para esta aplicación.",
                        pro_app_tooltip: "Actualízate a un plan de Pro para usar esta aplicación.",
                        upgrade_link_tooltip: "¡Actualízate ahora para desbloquear las aplicaciones!"
                    }
                },
                confirm: {
                    disconnect_facebook: "¿Seguro que quieres desconectar tu cuenta Facebook?",
                    disconnect_linkedin: "¿Seguro que quieres desconectar tu cuenta LinkedIn?"
                },
                email_settings: {
                    saved: "¡Guardado!"
                },
                form_responses: {
                    confirm: {
                        delete_blog_subscription: "Are you sure you wish to delete these subscription entries? Removing a blog subscription entry will delete the subscription",
                        delete_form_response: "Are you sure you wish to delete these entries?"
                    },
                    labels: {
                        contact: "Formulario de contacto",
                        signup: "Formulario de registro"
                    }
                },
                html_editor: {
                    script_error: "El HTML que Indicaste contiene scripts que no pueden mostrase en el editor. <br/><br/> Revisa tu sitio para ver el contenido."
                },
                invitations: {
                    create: {
                        errors: {
                            missing: "{{message}}"
                        }
                    },
                    new: {
                        claim_confirm: "Sí, ¡quiero desbloquearlo!",
                        claim_msg: "¡Desbloquear este premio! ¿Estás seguro?",
                        confirm: "OK",
                        email_hint: "¡Indica un listado de destinatarios de correos electrónicos!",
                        invitation_sent: "¡Invitación enviada! Recuerda a tus amigos que se inscriban para que puedas reclamar tu premio.",
                        network_error: "Parece que hubo un error de la red. Vuelve a intentarlo."
                    }
                },
                jquery: {
                    errors: {
                        required: "Obligatorio."
                    }
                },
                migration: {
                    add_new_section: "Add New Section",
                    add_new_section_tip: "¡Añade nuevas funciones a tu sitio!",
                    click_to_complete: "Click to complete your update and publish your changes!",
                    error: "Vaya, algo salió mal. Actualiza la página y vuelve a intentarlo. Si el problema persiste, contacta a nuestro equipo de soporte.",
                    layout: "Layout",
                    layout_tip: "¡Prueba diferentes disposiciones!",
                    styles: "Styles",
                    styles_tip: "¡Cambia de plantilla en el menu Estilo!",
                    support_tip: "Contact us if you'd like to roll back.",
                    this_feature: "this feature"
                },
                pages: {
                    alert: {
                        feature_limit: "Uh oh! It looks like you're using some Pro features ({{features}}). Please remove them to publish this site!",
                        unknown_publish_support: "Uh oh! Your site can't be published right now. Please contact support@strikingly.com for help!"
                    },
                    blog: {
                        confirm: {
                            delete_blog_post: "Are you absolutely sure you wish to delete this blog post? This action is PERMANENT!"
                        },
                        text: {
                            save_error: "Error al guardar. Póngase en contacto con nosotros (support@strikingly.com) si este problema persiste.",
                            saved: "¡Guardado!",
                            saving: "Guardando..."
                        }
                    },
                    dashboard: {
                        cancel: "Cancelar",
                        clone_msg: "¿Quieres duplicar este sitio?",
                        clone_pub_msg: {
                            pro: "Date cuenta de que ya has alcanzado el límite de publicaciones de tus sitios de Pro. Puedes clonar más sitios, pero no podrás publicarlos si utilizas funciones de Pro. ¿Continuar?",
                            starter: "Date cuenta de que ya has alcanzado el límite de publicaciones para tus sitios de Limitado. Puedes clonar más sitios, pero no podrás publicarlos si utilizas funciones de Limitado. ¿Continuar?"
                        },
                        confirm: "Confirmar",
                        pub_confirm: "Confirmar la Publicación",
                        pub_failed: "¡Uh oh! Error al publicar. ¡Por favor contáctanos en support@strikingly.com para ayuda!",
                        pub_msg: "¡Con eso vas a hacer tu sitio visible al mundo!",
                        pub_quota: "¡Has alcanzado el límite de los sitios publicados! Tienes que deshacer otro sitio antes de empezar a publicar este nuevo.",
                        quota_confirm: "OK, entiendo.",
                        sort: {
                            created: "Creado últimamente",
                            name: "Nombre",
                            updated: "Actualizado últimamente"
                        },
                        unpub_confirm: "Confirmar la Despublicación",
                        unpub_msg: '¿Seguro de que quieres despublicarlo? Tu sitio entrará en el modo de "En Construcción"'
                    },
                    ecommerce: {
                        confirm: {
                            cancel_edit: "¿Salir del editor sin guardarlo?",
                            delete_item: "Are you sure you want to delete this item?",
                            delete_product: "¿Seguro que deseas borrar este producto?",
                            delete_product_with_coupon: "Are you sure you want to delete this product?",
                            disconnect_account: "¿Seguro que quieres desconectar tu cuenta {{provider}}?",
                            payment_not_set: "Todavía no has añadido ninguna forma de pago para tu tienda online. Ves a los Ajustes de la sección Store para configurarla y permitir las compras. Haz clic en OK para publicar de todas formas.",
                            payment_not_set_proceed: "You haven't set up your payment gateway for your Simple Store yet! You must set it up in your store settings to enable checkout.\n\nClick OK to proceed.\n",
                            payment_not_set_short: "You haven't set up your payment gateway for your Simple Store yet! You must set it up in your store settings to enable checkout."
                        },
                        coupon: {
                            delete_warning: "¿Seguro que quieres borrar este código de descuento?",
                            description: "({{token}} - {{amount}}% Descuento)",
                            detailedDescription: "Este cupón aplicará {{amount}}% de descuento en la totalidad del pedido (sin incluir gastos de envío).",
                            expired: "Caducado",
                            flat_description: "{{token}} ({{amount}} Descuento)",
                            free_shipping_description: "{{token}} (Envío gratis)",
                            percentange_description: "{{token}} ({{amount}}% Descuento)"
                        },
                        errors: {
                            can_not_load_products: "¡Vaya! Parece que hubo un problema con la red. Vuelve a intentarlo.",
                            coupon_no_amount: "La cantidad no puede estar en blanco!",
                            coupon_no_token: "Código de descuento no puede estar vacío!",
                            coupon_repeated_token: "Ya hay un cupón con el mismo código!",
                            coupon_zero_amount: "La cantidad no puede ser 0!",
                            empty_quantity: "La cantidad no puede ser 0 o vacío.",
                            general_required_error_v1: "{field} es obligatorio.",
                            general_required_error_v2: "{field} son obligatorios.",
                            image_limication: "Puedes cargar un máximo de 10 imágenes. Deselecciona XXX imagen (s) para continuar.",
                            invalid_input: "Valor inválido.",
                            invalid_quantity: "Fuera de stock",
                            paypal_not_support_cny: "PayPal no soporta CNY ahora mismo",
                            seller_not_connect_gateway: "El vendedor no ha conectado con su portal de pagos. No puede comprar ahora."
                        },
                        options: {
                            cancelled: "Cancelado",
                            completed: "Finalizado",
                            pending: "Pendiente"
                        },
                        providers: {
                            alipay: "Alipay",
                            paypal: "Paypal",
                            stripe_connect: "Stripe"
                        },
                        text: {
                            choose_a_country: "Elige un país",
                            choose_a_type: "Elige un estilo",
                            cta_btn: "Compra Ahora",
                            description: "Agrega una descripción para el producto. ¡Que sea breve y atractiva!",
                            edit_btn_add_product: "Agrega un producto",
                            edit_btn_mange_product: "Gestionar un producto",
                            price_for_required_error: "Precio",
                            product_name: "Agrega nombre del producto",
                            product_name_for_required_error: "Nombre del producto",
                            rest_of_world: "Resto del mundo",
                            variant_name_for_required_error: "Variante",
                            world: "El Mundo"
                        }
                    },
                    edit: {
                        confirm: {
                            delete_blog_section: "¿Seguro de que quieres borrar esta sección?\n\nLas publicaciones de blog NO serán borradas. (Sólo vuelve a agregar la sesión para mostrarlas de nuevo.)",
                            delete_collaborator: "¿Estás seguro de que deseas borrar este colaborador? ¡Éste último no podrá editar el sitio!",
                            delete_library_file: "¿Estás seguro de que deseas borrar este archivo?",
                            delete_library_image: "¿Estás seguro de que deseas borrar esta imagen?",
                            delete_section: "¿Seguro de que quieres borrar esta sección? Esta acción no se puede deshacer.",
                            delete_section_v4: "¿Seguro de que deseas borrar esta sección?",
                            delete_social_account: "¿Seguro de que deseas eliminar esta cuenta? Los feeds relacionados no se pueden mostrar en la página.",
                            unsaved_changes: "Hay cambios no guardados en esta página. Si sales de ella, los perderás."
                        },
                        domain_emails: {
                            confirm: {
                                delete_entry: "¿Seguro que deseas borrar esta entrada?"
                            },
                            errors: {
                                limit_reached: "Solo puedes crear {{limit}} correos electrónicos."
                            }
                        },
                        errors: {
                            already_have_blog: "¡Ya tienes una sección de blog en este sitio!",
                            already_have_ecommerce: "¡Ya tienes una sección de Tienda en este sitio!",
                            already_have_social_feed: "¡Ya tienes una sección de Social Feed en este sitio!",
                            api_error: "¡Vaya! Hubo un problema con la red. ¡Nuestro equipo de ingenieros ha sido notificado y está trabajando en el problema!",
                            delete_file_fail: "Error al cargar la biblioteca. ¡Por favor intenta de nuevo o contáctanos para ayuda!",
                            duplicate_collaborator: "¡Has invitado a esta persona antes!",
                            effects_network_error: "¡Vaya! Un problema con la red no permite que agregues efectos. Vuelve a intentarlo.",
                            email_format_error: "¡Dirección de Email inválida!",
                            get_presigned_post_error: "¡Vaya! Hubo un problema con la red. ¡Por favor intenta de nuevo y contáctanos en support@strikingly.com para ayuda!",
                            load_files_fail: "Error al cargar la biblioteca. ¡Por favor intenta de nuevo o contáctanos para ayuda!",
                            max_slides_reached: "Sólo puede crear {{max}} secciones aquí. Si deseas más informaciones, háganoslo saber mediante el botón de comentarios en la parte inferior derecha!",
                            multi_file_error: "Pra favor arrastra 1 archivo a la vez.",
                            network_error: "¡Vaya! Parece que hubo un problema con la red. Vuelve a intentarlo.",
                            save_error: "Ocurrió un problema al tratar de guardar la página. Vuelve a intentarlo.",
                            social_account_connect_error: "Error al conectar con tu cuenta. ¡Por favor vuelve a intentar o conéctanos para asistencia!",
                            too_many_invitations: "¡Perdón! Sólo puedes invitar a 10 personas para cada sitio.",
                            upload_fail: "Error al subir. ¡Por favor intenta de nuevo o contáctanos por ayuda!",
                            upload_network_error: "¡Vaya! Un problema con la red no permite que cargues. Vuelve a intentarlo.",
                            video_type_error: "El URL es inválido."
                        },
                        html_editor: {
                            ecwid: {
                                enter_store_id: "Indica un ID de tienda."
                            },
                            google_maps: {
                                enter_location: "Indica una ubicación!",
                                view_larger_map: "Ver un mapa más grande"
                            },
                            shared: {
                                errors: null
                            },
                            slides: {
                                errors: {
                                    invalid_url: "¡URL no válida! Utiliza un URL de slid.es válido."
                                }
                            },
                            soundcloud: {
                                errors: {
                                    invalid_url: "¡URL no válida! Utiliza un URL de soundcloud.com válido."
                                }
                            }
                        },
                        notice: {
                            mobile_notice: "¡Bienvenido al editor Strikingly! Parece que estás utilizando un dispositivo móvil. Los sitios web que construyes con Strikingly se ven fabulosos en todos los dispositivos, pero recomendamos la edición de sitio en una computadora de escritorio o un portátil.",
                            pro_section_notice: "¡Has seleccionado una sección de Pro! Puedes probarla, pero no se mostrará en tu sitio vivo hasta que lo mejores a Pro."
                        },
                        rich_text: {
                            align_center: "Centrar",
                            align_justify: "Justificar",
                            align_left: "Alinear izquierda",
                            align_right: "Alinear derecha",
                            bold: "Negrita",
                            bulleted_list: "Introduzir/Eliminar Lista con viñetas",
                            confirm_cancel: "Hay algunos cambios sin guardar. ¿Estás segura de que quieres cerrar el cuadro de diálogo?",
                            custom: "Otros",
                            font_family: "Cambiar Fuente Familia",
                            font_size: "Cambiar Tamaño de la Fuente",
                            font_size_large: "Grande",
                            font_size_larger: "Muy grande",
                            font_size_normal: "Normal",
                            font_size_small: "Pequeña",
                            font_size_smaller: "Muy pequeña",
                            italic: "Cursiva",
                            link: "Enlace",
                            link_dialog_document: "Documento",
                            link_dialog_email: "Email",
                            link_dialog_email_address: "Dirección",
                            link_dialog_email_placeholder: "e.j. john@ejemplo.com",
                            link_dialog_invalid_email: "Dirección de correo electrónico no válido",
                            link_dialog_open_in_new_tab: "Abrir en una nueva pestaña",
                            link_dialog_remove_document: "Eliminar documento",
                            link_dialog_remove_email: "Borrar Email",
                            link_dialog_remove_link: "Eliminar Enlace",
                            link_dialog_title: "Enlace a",
                            link_dialog_upload_file: "Cargar archivo",
                            link_dialog_url: "URL",
                            link_dialog_url_placeholder: "e.j. http://abc.com O #2 (número de sección)",
                            link_dialog_web: "Web",
                            numbered_list: "Introduzir/Eliminar Lista Numerada",
                            save: "Guardar",
                            underline: "Subrayar",
                            use_default: "Estándar"
                        }
                    },
                    social_feed: {
                        text: {
                            posts: "Publicaciones",
                            posts_on_facebook_page: "Publica en la Página Facebook",
                            posts_on_timeline: "Publicaciones en línea de tiempo",
                            tweets: "Tweets"
                        }
                    }
                },
                payment: {
                    add_ons: {
                        errors: {
                            network_error: "Error al someter tus cambios. Asegúrate de que la red está disponible y vuelve a intentarlo.",
                            no_active_subscription: "No tienes ninguna suscripción activa.",
                            not_supported: "Tu cuenta aún no puede soportar la compra de {{add_on_type}}."
                        },
                        types: {
                            additional_page: "página adicional"
                        }
                    }
                },
                plans: {
                    name: {
                        pro_2y: "Pro de Dos-años",
                        pro_monthly: "Pro Mensual",
                        pro_yearly: "Pro Anual",
                        starter_2y: "Limitado de Dos-años",
                        starter_monthly: "Limitado Mensual",
                        starter_yearly: "Limitado Anual"
                    }
                },
                select_template: {
                    confirm: {
                        ok: "  OK  "
                    },
                    info: {
                        no_site: "Oye, parece que aún no tienes un sitio. ¡Selecciona aquí una plantilla fabulosa para empezar!"
                    }
                },
                settings_dialog: {
                    updated: "Actualizado."
                },
                student_program: {
                    email_denied: "Tuvimos un error al validar tu dirección de email. Revisa si has introducido algo incorrecto, o ponte en contacto con el centro de soporte si tienes cualquier duda.",
                    network_error: "Hubo un error con la red. Vuelve a cargarlas e intenta de nuevo."
                },
                subscriptions: {
                    edit: {
                        confirm: {
                            downgrade: "¿Absolutamente seguro de que deseas bajar de categoría? Tu cuenta recibirá un crédito por el valor que ya has pagado.",
                            general: "¿Absolutamente seguro de que deseas cambiar tu plan? Si estás actualizando, te cobrarán en consecuencia.",
                            upgrade: "¿Absolutamente seguro de que deseas actualizarte? Te cobrarán en una base prorrateada."
                        }
                    },
                    new: {
                        billing: {
                            coupon_applied_free_period_notice: "No se te facturará de inmediato. Los primeros {{free_period_days}} días son gratis. Después del {{billing_start_date}} se te facturará <strong class='dark'>${{discounted_price}} por {{period}}</strong> y <strong class='dark'> ${{price}} por {{period}}</strong> después de eso.",
                            coupon_applied_no_free_period_notice: "Se te facturará <strong class='dark'>${{discounted_price}} por {{period}}</strong> y <strong class='dark'>${{price}} por {{period}}</strong> después de eso.",
                            free_period_notice: "No se te facturará de inmediato. Los primeros {{free_period_days}} días son gratis. Desde el {{billing_start_date}} se te facturará <strong class='dark'>$ {{price}} por {{period}}</strong>.",
                            heading: "{{free_period_full_string}} Gratis &mdash; Garantizado",
                            no_free_period_notice: "Se te facturará <strong class='dark'>${{price}} por {{period}}</strong>."
                        },
                        coupon: {
                            applied: "¡Se aplicó un descuento del {{percent}}%!",
                            applied_notice: "¡Se ha usado el cupón! ¡Solo es válido para el primer periodo de facturación!",
                            invalid: "Cupón no válido",
                            not_applicable: "The coupon doesn't apply to the plan you choose.",
                            wait: "Espera..."
                        },
                        errors: {
                            card_expiry: "Indica una caducidad válida",
                            card_number: "Indica un número de tarjeta válido.",
                            cvc: "Indica un código de seguridad válido",
                            postal_code: "Postal code can't be empty"
                        },
                        paypal: {
                            free_period_description: "Estás suscribiendo el plan {{plan}} de Strikingly y no te cobrarán hasta {{billing_start_date}}.",
                            no_free_period_description: "Estás suscribiendo el plan {{plan}} de Strikingly"
                        },
                        periods: {
                            "2y": "2 years",
                            month: "mes",
                            monthly: "month",
                            two_year: "2 years",
                            year: "año",
                            yearly: "year"
                        },
                        prices: {
                            pro_2y: "$336/two-year",
                            pro_monthly: "20 $/mes",
                            pro_yearly: "192 $/año",
                            starter_2y: "$168/two-year",
                            starter_monthly: "12 $/mes",
                            starter_yearly: "96 $/año"
                        },
                        why_billing_info: "Pedimos tu tarjeta de crédito para no interrumpir tu cuenta de Strikingly si decides mantenerla activa después de finalizado tu periodo de prueba gratis. Nos permite reducir el fraude. <br/><br/>No se producirán cargos en tu tarjeta de crédito durante el periodo de prueba. Si cancelas durante el período gratuito, no se te cobrará nada en ningún momento. <br/><br/> Te enviaremos un correo electrónico tres días antes de que se termine tu periodo gratuito para recordártelo."
                    }
                },
                traffic_guide: {
                    confirm_go_to_editor: "¿Ir al editor ahora para actualizar la configuración?"
                }
            }
        },
        fr: {
            js: {
                api: {
                    analytics: {
                        device: {
                            desktop: "Ordinateur",
                            mobile: "Mobile",
                            others: "Autres"
                        },
                        geography: {
                            others: "Autres"
                        },
                        period_title: {
                            past_24_hours: "Dernières 24 heures",
                            past_3_months: "3 derniers mois",
                            past_month: "Mois dernier",
                            past_week: "Semaine dernière",
                            past_year: "Année dernière"
                        },
                        referrer: {
                            direct_traffic: "Visite Directe"
                        },
                        show: {
                            errors: {
                                exception: "Erreur lors du chargement des analyses de votre page. Notre équipe informatique travaille actuellement sur ce problème.",
                                record_not_found: "Page introuvable."
                            }
                        }
                    },
                    blogPosts: {
                        errors: {
                            genericPublish: "Uh oh ! Il y a eu une erreur en publiant ce billet de blog. S' il vous plaît contactez-nous à support@strikingly.com si ce problème persiste !",
                            genericSave: "Uh oh ! Il y a eu une erreur en sauvegardant ce blog . S' il vous plaît contactez-nous à support@strikingly.com si ce problème persiste !",
                            invalidLockId: "On dirait q'un autre éditeur pour ce blog est ouvert. S'il vous plaît utiliser un seul éditeur à la fois ! Vous pouvez actualiser pour réessayer.",
                            unauthorized: "Uh oh ! On dirait que vous avez été déconnecté ! Cliquez sur OK pour vous connecter à nouveau."
                        },
                        messages: {
                            confirmPublishUntitledPost: "Vous n'avez pas encore saisi un titre. Etes-vous sûr que vous souhaitez publier ?"
                        }
                    },
                    domains: {
                        confirm: {
                            delete_dns_record: "Voulez-vous vraiment supprimer cette entrée ?",
                            renew: "Vous serez facturé 24,95 $ pour le renouvellement. Etes-vous sûr que vous souhaitez renouveler ?",
                            renew_for_free: "Ce domaine est inclus dans le prix de votre plan annuel. Etes-vous sûr que vous souhaitez renouveler ?"
                        },
                        errors: {
                            create_dns_record_failed: "Impossible de créer l'enregistrement DNS. S'il vous plaît réessayer.",
                            create_user_failed: "Échec de la création un compte d'utilisateur.",
                            delete_dns_record_failed: "Impossible de supprimer l'enregistrement DNS. S'il vous plaît réessayer.",
                            empty_field_warning: "Entrée invalide.",
                            get_dns_record_failed: "Impossible d'obtenir l'enregistrement DNS. S'il vous plaît réessayer.",
                            get_registrant_verification_status_failed: "Impossible d'obtenir le statut de vérification du déclarant. S'il vous plaît réessayez ou nous contacter à support@strikingly.com pour obtenir de l'aide.",
                            get_zone_failed: "Impossible d'obtenir les détails de la zone. S'il vous plaît réessayer.",
                            list_dns_records_failed: "Échec à lister les enregistrements DNS. S'il vous plaît réessayer.",
                            provision_failed: "Échec de la disposition DNS.",
                            release_domain_failed: "Échec de la relâche du domaine. S'il vous plaît réessayer ou nous contacter à support@strikingly.com pour obtenir de l'aide.",
                            renew_failed: "Le renouvellement de domaine a échoué ! S'il vous plaît contactez-nous à support@strikingly.com pour obtenir de l'aide.",
                            renew_payment_failed: "La facturation de renouvellement de domaine a échouée. S'il vous plaît vérifiez vos informations de facturation.",
                            send_verification_email_failed: "Échec de l'envoi de l'email de vérification. S'il vous plaît réessayer ou nous contacter à support@strikingly.com pour obtenir de l'aide.",
                            setup_dns_failed: "Échec de la configuration DNS.",
                            update_contact_info_failed: "Échec de la mise à jour d'informations de contact. S'il vous plaît réessayer ou nous contacter à support@strikingly.com pour obtenir de l'aide.",
                            update_dns_record_failed: "Impossible de mettre à jour l'enregistrement DNS. S'il vous plaît réessayer.",
                            update_nameservers_failed: "Échec de la mise à jour des serveurs de noms. S'il vous plaît réessayer ou nous contacter à support@strikingly.com pour obtenir de l'aide."
                        }
                    },
                    ecommerce: {
                        charge_order: {
                            bad_request: "Oops! Il y a eu un erreur lors du chargement de la commande. Veuillez contacter support@strikingly.com si le problème persiste!",
                            internal_error: "Oops! Il y a eu un erreur lors du chargement de la commande. Veuillez contacter support@strikingly.com si le problème persiste!"
                        },
                        complete: {
                            bad_request: "Ooops! Une erreur a eu lieu lors de la création de la commande."
                        },
                        create_order: {
                            bad_request: "Oops! Il y a eu une erreur lors de la création de la commande.",
                            internal_error: "Oops! Il y a eu une erreur lors de la création de la commande."
                        },
                        refund: {
                            bad_request: "Ooops! Une erreur a eu lieu lors du remboursement de cette commande. Prière de nous contacter à l'adresse : support@strikingly.com si le problème persiste toujours !"
                        }
                    },
                    generators: {
                        generate_from_facebook: {
                            errors: {
                                already_have: "Hey ! On dirait que vous avez déjà un site web. Cliquez sur OK pour le voir.",
                                cant_get_data: "Il y a eu une erreur en essayant d'obtenir des données de Facebook. S'il vous plaît essayer à nouveau.",
                                error: "Une erreur est survenue. Nos équipes d’ingénieurs sont sur le coup, veuillez réessayer plus tard.",
                                exception: "Expiration de la connexion réseau. Veuillez réessayer. Notre équipe informatique travaille actuellement sur ce problème.",
                                invalid: "{{message}}",
                                missing_user: "Utilisateur manquant.",
                                no_facebook: "Oops, il semble y avoir un problème avec la connexion à Facebook. S'il vous plaît vérifier votre connexion et réessayez.",
                                oauth_exception: "Votre session Facebook a expiré. Veuillez vous reconnecter avec Facebook."
                            },
                            messages: {
                                failed_to_get_friends: "Impossible d'obtenir la liste d'amis. S'il vous plaît réessayer.",
                                failed_to_get_pages: "Impossible d'obtenir la liste des pages. S'il vous plaît réessayer.",
                                getting_friends: "Entrain d'Obtenir vos Amis Facebook",
                                getting_pages: "Entrain d'obtenir vos Pages Facebook...",
                                to_simplify: "Il y a eu une erreur de connexion à Facebook. S'il vous plaît connectez-vous et réessayez."
                            }
                        },
                        generate_from_linkedin: {
                            errors: {
                                exception: "Expiration de la connexion réseau. Veuillez réessayer. Notre équipe informatique travaille actuellement sur ce problème.",
                                invalid: "{{message}}",
                                missing_user: "Utilisateur manquant.",
                                oauth_exception: "Votre session LinkedIn a expiré. Veuillez vous reconnecter avec LinkedIn."
                            }
                        },
                        new_year_resolutions: {
                            errors: {
                                exception: "Expiration de la connexion réseau. Veuillez réessayer. Notre équipe informatique travaille actuellement sur ce problème.",
                                invalid: "{{message}}",
                                missing_user: "Utilisateur manquant.",
                                oauth_exception: "Votre session Facebook a expiré. Veuillez vous reconnecter avec Facebook."
                            }
                        },
                        share_on_linkedin: {
                            errors: {
                                exception: "Quelque chose s'est mal passé. Veuillez réessayer. Notre équipe informatique travaille actuellement sur ce problème."
                            }
                        }
                    },
                    jobs: {
                        custom_domain_setup: {
                            errors: {
                                exception: "Expiration de la connexion réseau. Veuillez réessayer. Notre équipe informatique travaille actuellement sur ce problème.",
                                invalid: "{{message}}"
                            },
                            success: {
                                connected: "Connecté avec succès. Le paramétrage peut prendre jusqu'à 48 h.",
                                disconnected: "Connecté avec succès. Le paramétrage peut prendre jusqu'à 48 h.",
                                domain_is_live: "Your domain is live!",
                                need_configuration: "Ce domaine n'est pas connecté à votre site. Veuillez vérifier que votre domaine a été configuré correctement.",
                                propagation_note: "Une fois votre domaine configuré, les changements prennent habituellement 1 à 2 heures (au maximum 48 heures) pour être totalement propagés."
                            }
                        }
                    },
                    pages: {
                        collaboration: {
                            errors: {
                                access_denied: "Vous n'êtes pas autorisé à réaliser cette opération. Veuillez contacter le propriétaire du site"
                            }
                        },
                        confirm: {
                            delete_site: "Are you absolutely sure you wish to delete the site titled {{name}}? This action is PERMANENT!"
                        },
                        custom_domain_update: {
                            errors: {
                                exception: "Expiration de la connexion réseau. Veuillez réessayer. Notre équipe informatique travaille actuellement sur ce problème.",
                                invalid: "{{message}}",
                                missing_params: "Quelque chose s'est mal passé. Veuillez réessayer. Si le problème persiste, utilisez le bouton Assistance pour nous contacter.",
                                no_change: "Aucun changement."
                            },
                            success: {
                                saved: "Mis à jour."
                            },
                            warnings: {
                                non_www_root: 'Nous recommandons fortement de mettre "www" devant pour les racines de domaines. (Soumettez à nouveau pour ignorer.)'
                            }
                        },
                        publish: {
                            success: {
                                published: "Page publiée."
                            }
                        },
                        settings_update: {
                            errors: {
                                invalid: "{{message}}",
                                missing_params: "Quelque chose s'est mal passé. Veuillez réessayer. Si le problème persiste, utilisez le bouton Assistance pour nous contacter.",
                                premium_sites_limit_reached: "You reached the limit of published sites using premium features you can use. Please extend your plan."
                            },
                            success: {
                                permalink_changed: "La page se rafraîchira dans quelques secondes. Cliquez <a href='{{edit_page_http_url}}'>ici</a> sinon.",
                                saved: "Enregistré !"
                            }
                        },
                        shared: {
                            errors: {
                                access_denied: "Non autorisé à effectuer cette opération.",
                                record_not_found: "Il semble que la page ait changé d'URL. Cliquez sur OK pour accéder au tableau de bord et sélectionnez la page à éditer.",
                                session_expired: "Session expirée. Veuillez vous reconnecter pour éditer la page."
                            }
                        },
                        update: {
                            errors: {
                                exeption: "Erreur lors de l'enregistrement de votre contenu. Notre équipe informatique travaille actuellement sur ce problème.",
                                invalid: "{{message}}"
                            },
                            success: {
                                saved: "Page enregistrée."
                            }
                        }
                    },
                    registrations: {
                        "500": "Error in registration. Our engineers are already looking into it. Please send an email to support@strikingly.com if you've any questions.",
                        create: {
                            errors: {
                                invalid: "{{message}}",
                                missing_params: "E-mail et prénom requis."
                            },
                            success: {
                                saved: ""
                            }
                        }
                    },
                    shared: {
                        please_wait: "Veuillez patienter..."
                    },
                    subscriptions: {
                        check_coupon: {
                            errors: {
                                expired: "Le coupon a expiré.",
                                invalid_coupon: "Le code coupon n'est pas valide."
                            }
                        },
                        plan: {
                            billed_monthly: "facturé mensuellement",
                            billed_two_year: "Facturé tous les 2 ans",
                            billed_yearly: "facturé annuellement"
                        }
                    },
                    videos: {
                        create: {
                            errors: {
                                exception: "Impossible de charger la vidéo. Notre équipe informatique travaille actuellement sur ce problème.",
                                invalid: "{{message}}"
                            }
                        }
                    }
                },
                app_store: {
                    descriptions: {
                        baidu_maps: "Montrez votre emplacement avec une carte Baidu.",
                        celery: "Acceptez les précommandes et faire payer plus tard. Idéal pour le crowdfunding et le commerce électronique simple.",
                        disqus: "Ajouter un forum de discussion, et construisez une communauté de lecteurs actifs et de commentateurs.",
                        ecwid: "Fonctionnalité E-commerce complète sur votre site même. Mettre en place une boutique en ligne, la gestion des produits, et recevoir des paiements.",
                        eventbrite: "Créer un événement sur Eventbrite et intégrer un widget pour vendre des billets directement à partir de votre site web.",
                        facebook_comments: "Laissez vos amis dans le monde laisser leurs commentaires ici.",
                        google_calendar: "Partagez votre Agenda Google avec les visiteurs.",
                        google_form: "Give a quiz, run a survey, or collect other information with a simple online form.",
                        google_maps: "Montrez votre emplacement !",
                        html: "Intégrez tout service tiers ou écrire n'importe quel code que vous voulez. Un outil puissant pour les utilisateurs avancés.",
                        instagram: "Affichez vos photos Instagram dans une galerie.",
                        locu: "Gérez et publiez vos listes d'entreprises et offrandes avec Locu. Présentez-les sur votre site.",
                        mailchimp: "Utilisez MailChimp pour créer, envoyer et suivre des bulletins électroniques. Intégrez le formulaire d'inscription sur votre site.",
                        medium: "Intégrer un profil Medium, une collection ou un blog sur votre site.",
                        paypal: "Ajouter un bouton PayPal à votre site pour recevoir des paiements.",
                        photobucket: "Jouer un diaporama PhotoBucket sur votre site.",
                        pinterest: "Affichez des épingles Pinterest, profils ou des tableaux sur votre site.",
                        scribd: "Intégrez des documents Scribd ou des livres sur votre site.",
                        slides: "Les Diapositives est un outil pour créer, présenter et partager des présentations.",
                        slideshare: "Intégrez une présentation de diaporama.",
                        soundcloud: "Intégrez un titre, album, artiste, ou une collection à partir de SoundCloud.",
                        type_form: "Construire un beau sondage ou forme qui apparaît sur votre site. Gratuit pour commencer, payez pour des fonctionnalités avancées.",
                        wufoo: "Construire un formulaire ou un sondage pour recueillir des données, des commentaires, et même des paiements. Gratuit pour commencer, payer pour plus de volume."
                    },
                    errors: {
                        create_app_config: "Impossible de créer la configuration de l'application. Cela est probablement dû à un problème de réseau; essayez de rafraîchir la page.",
                        init_app_config: "Échec de l'initialisation de la configuration de l'application. Cela est probablement dû à un problème de réseau; essayez de rafraîchir la page.",
                        load_app_config: "Impossible de charger la configuration de l'application. Cela est probablement dû à un problème de réseau; essayez de rafraîchir la page.",
                        save_app_config: "Impossible d'enregistrer la configuration de l'application. Cela est probablement dû à un problème de réseau; essayez de rafraîchir la page.",
                        scribe_url_incorrect: "Entrée incorrecte ! Exemple d'entrée:'http://www.scribd.com/doc/220861572/Aurora-Cidr03'.",
                        url_not_fount: "Cet URL n'est pas trouvé. S'il vous plaît utiliser l'URL correcte !"
                    },
                    names: {
                        baidu_maps: "Baidu Maps",
                        celery: "Celery",
                        disqus: "Disqus",
                        ecwid: "Ecwid",
                        eventbrite: "Eventbrite",
                        facebook_comments: "Commentaires Facebook",
                        google_calendar: "Agenda Google",
                        google_form: "Google Form",
                        google_maps: "Google Maps",
                        html: "HTML",
                        instagram: "Websta",
                        locu: "Locu",
                        mailchimp: "MailChimp",
                        medium: "Medium",
                        paypal: "PayPal",
                        photobucket: "PhotoBucket",
                        pinterest: "Pinterest",
                        scribd: "Scribd",
                        slides: "Slides",
                        slideshare: "SlideShare",
                        soundcloud: "SoundCloud",
                        type_form: "Typeform",
                        wufoo: "Wufoo"
                    },
                    tooltips: {
                        help_tooltip: "Lire un tutoriel plus détaillé pour cette application.",
                        pro_app_tooltip: "Pour utiliser cette application, passer à un plan Pro.",
                        upgrade_link_tooltip: "Mettre à niveau pour débloquer les applications Pro!"
                    }
                },
                confirm: {
                    disconnect_facebook: "Voulez-vous vraiment déconnecter votre Facebook compte ?",
                    disconnect_linkedin: "Voulez-vous vraiment déconnecter votre LinkedIn compte ?"
                },
                email_settings: {
                    saved: "Enregistré !"
                },
                form_responses: {
                    confirm: {
                        delete_blog_subscription: "Are you sure you wish to delete these subscription entries? Removing a blog subscription entry will delete the subscription",
                        delete_form_response: "Are you sure you wish to delete these entries?"
                    },
                    labels: {
                        contact: "Contact",
                        signup: "Souscription"
                    }
                },
                html_editor: {
                    script_error: "Le code HTML que vous avez saisi contient des scripts qui ne peuvent pas être affichés dans l'éditeur.<br/><br/>Veuillez utiliser l'aperçu du site pour voir votre contenu."
                },
                invitations: {
                    create: {
                        errors: {
                            missing: "{{message}}"
                        }
                    },
                    new: {
                        claim_confirm: "Oui, débloquez !",
                        claim_msg: "Unlock this reward! Are you sure?",
                        confirm: "OK",
                        email_hint: "Saisissez la liste des e-mails des destinataires ici !",
                        invitation_sent: "Invitation sent! Remind your friends to sign up to claim your rewards.",
                        network_error: "Une erreur du réseau a eu lieu. Merci d'actualiser la page et de réessayer une nouvelle fois."
                    }
                },
                jquery: {
                    errors: {
                        required: "Ce champ est requis."
                    }
                },
                migration: {
                    add_new_section: "Add New Section",
                    add_new_section_tip: "Add new functionalities to your site!",
                    click_to_complete: "Cliquez pour compléter votre mise à niveau et publier vos changements!",
                    error: "Oops, une erreur s'est produite, merci d'actualiser la page et réessayer à nouveau; si l'erreur persiste, veuillez contacter le support technique.",
                    layout: "Layout",
                    layout_tip: "Try out new layouts!",
                    styles: "Styles",
                    styles_tip: "Swap templates in the Style menu!",
                    support_tip: "Contactez nous si vous désirez revenir à l'ancienne version.",
                    this_feature: "this feature"
                },
                pages: {
                    alert: {
                        feature_limit: "Uh oh! It looks like you're using some Pro features ({{features}}). Please remove them to publish this site!",
                        unknown_publish_support: "Uh oh! Your site can't be published right now. Please contact support@strikingly.com for help!"
                    },
                    blog: {
                        confirm: {
                            delete_blog_post: "Are you absolutely sure you wish to delete this blog post? This action is PERMANENT!"
                        },
                        text: {
                            save_error: "Erreur de sauvegarde. Veuillez nous contacter sur (support@strikingly.com) si ce problème persiste.",
                            saved: "Sauvegardé!",
                            saving: "Sauvegarde..."
                        }
                    },
                    dashboard: {
                        cancel: "Annuler",
                        clone_msg: "Souhaitez-vous dupliquer ce site ?",
                        clone_pub_msg: {
                            pro: "Notez que vous avez atteint votre limite de publication pour vos sites Pro. Vous pouvez dupliquer plusieurs sites, mais vous ne serez pas en mesure de les publier si vous utilisez des fonctions Pro en eux. Continuer ?",
                            starter: "Notez que vous avez atteint votre limite de publication pour vos sites Limited. Vous pouvez dupliquer plusieurs sites, mais vous ne serez pas en mesure de les publier si vous utilisez des fonctions limitées en eux. Continuer ?"
                        },
                        confirm: "Confirmer",
                        pub_confirm: "Confirmez la Publication",
                        pub_failed: "Uh-oh. La publication a échouée. S'il vous plaît contactez-nous à support@strikingly.com pour de l'assistance !",
                        pub_msg: "Cela rendra votre site visible au monde !",
                        pub_quota: "Vous avez atteint votre limite de site publiés ! Vous devez dépublier un autre site avant de pouvoir publier celui-ci !",
                        quota_confirm: "OK, je comprends",
                        sort: {
                            created: "Récemment créé",
                            name: "Nom",
                            updated: "Récemment mis à jour"
                        },
                        unpub_confirm: "Confirmez Dépublication",
                        unpub_msg: 'Êtes-vous sûr de vouloir annuler la publication ? Votre site passera en mode "Sous Construction".'
                    },
                    ecommerce: {
                        confirm: {
                            cancel_edit: "Sortir de l'éditeur sans sauvegarder?",
                            delete_item: "Are you sure you want to delete this item?",
                            delete_product: "Êtes-vous sûr de vouloir supprimer ce produit?",
                            delete_product_with_coupon: "Are you sure you want to delete this product?",
                            disconnect_account: "Voulez-vous vraiment déconnecter votre {{provider}} compte ?",
                            payment_not_set: "Vous n’avez pas encore configuré de plateforme de paiement pour votre boutique en ligne ! Veillez à en configurer une pour activer le processus de vente. Cliquez sur OK pour continuer sans plateforme de paiement.",
                            payment_not_set_proceed: "You haven't set up your payment gateway for your Simple Store yet! You must set it up in your store settings to enable checkout.\n\nClick OK to proceed.\n",
                            payment_not_set_short: "You haven't set up your payment gateway for your Simple Store yet! You must set it up in your store settings to enable checkout."
                        },
                        coupon: {
                            delete_warning: "Are you sure you want to delete this coupon code?",
                            description: "({{token}} - {{amount}}% de réduction)",
                            detailedDescription: "Ce coupon offre une réduction de {{amount}}% sur l'intégralité de la commande (hors frais de port)",
                            expired: "Expiré",
                            flat_description: "{{token}} ({{amount}} de réduction)",
                            free_shipping_description: "{{token}} (Livraison Gratuite)",
                            percentange_description: "{{token}} - ({{amount}}% de réduction)"
                        },
                        errors: {
                            can_not_load_products: "Oops, a network issue occurred, please refresh and try again.",
                            coupon_no_amount: "Le montant doit être renseigné !",
                            coupon_no_token: "Le code doit être renseigné !",
                            coupon_repeated_token: "Ce code est déjà pris par un autre coupon !",
                            coupon_zero_amount: "Le montant doit être supérieur à 0 !",
                            empty_quantity: "La quantité ne peut pas être vide ou égale à 0.",
                            general_required_error_v1: "{field} est requis.",
                            general_required_error_v2: "{field} sont requis.",
                            image_limication: "Vous pouvez télécharger 10 images au maximum. Merci de désélectionner XXX image(s) pour continuer.",
                            invalid_input: "Valeur invalide.",
                            invalid_quantity: "Plus de stock.",
                            paypal_not_support_cny: "PayPal n'accepte pas de CNY pour l'instant.",
                            seller_not_connect_gateway: "Le/la vendeu(se)r n'a pas connecté sa plateforme de paiement. Impossible d'acheter maintenant."
                        },
                        options: {
                            cancelled: "Annulé",
                            completed: "Complété",
                            pending: "En attente"
                        },
                        providers: {
                            alipay: "Alipay",
                            paypal: "Paypal",
                            stripe_connect: "Stripe"
                        },
                        text: {
                            choose_a_country: "Choisir un Pays",
                            choose_a_type: "Choisir un Type",
                            cta_btn: "Acheter",
                            description: "Ajouter une description produit.Faites court et simple!",
                            edit_btn_add_product: "Ajouter produit",
                            edit_btn_mange_product: "Gérer produit",
                            price_for_required_error: "Prix",
                            product_name: "Ajouter Nom Produit",
                            product_name_for_required_error: "Nom du Produit",
                            rest_of_world: "Reste du monde",
                            variant_name_for_required_error: "Variante",
                            world: "Le monde entier"
                        }
                    },
                    edit: {
                        confirm: {
                            delete_blog_section: "Êtes-vous sûr de vouloir supprimer cette section?\n\nLes billets de Blog ne seront pas supprimés. (Il suffit d'ajouter la section à nouveau afin de les montrer à nouveau.)",
                            delete_collaborator: "Êtes-vous sûr de vouloir supprimer ce collaborateur? Ils ne seront plus en mesure de modifier ce site !",
                            delete_library_file: "Êtes-vous sûr de vouloir supprimer ce fichier ?",
                            delete_library_image: "Êtes-vous sûr de vouloir supprimer cette image?",
                            delete_section: "Voulez-vous vraiment supprimer cette section ? Ceci est irréversible.",
                            delete_section_v4: "Are you sure you want to delete this section?",
                            delete_social_account: "Are you sure you wish to delete this account? The related feeds will not show in page anymore.",
                            unsaved_changes: "La page comporte des changements non enregistrés. Si vous quittez la page, les changements seront perdus."
                        },
                        domain_emails: {
                            confirm: {
                                delete_entry: "Voulez-vous vraiment supprimer cette entrée ?"
                            },
                            errors: {
                                limit_reached: "Vous ne pouvez créer que {{limit}} e-mails."
                            }
                        },
                        errors: {
                            already_have_blog: "Vous avez déjà une section blog sur ce site!",
                            already_have_ecommerce: "Vous avez déjà un magasin pour ce site!",
                            already_have_social_feed: "You already have a Social Feed section in this site!",
                            api_error: "Oops, un problème de réseau s'est produit. Nos ingénieurs ont été notifiés et vont régler le problème !",
                            delete_file_fail: "Impossible de charger la bibliothèque. S'il vous plaît essayez de nouveau ou nous contacter pour de l'aide!",
                            duplicate_collaborator: "Vous avez déjà invité cette personne avant !",
                            effects_network_error: "Oups. Une erreur réseau vous empêche d'ajouter des effets. Veuillez rafraîchir et réessayer.",
                            email_format_error: "Adresse e-mail non valide !",
                            get_presigned_post_error: "Uh oh ! Quelque chose ne va pas avec l'uploader. S'il vous plaît essayer de nouveau ou contactez-nous à support@strikingly.com pour obtenir de l'aide !",
                            load_files_fail: "Impossible de charger la bibliothèque. S'il vous plaît essayez de nouveau ou nous contacter pour de l'aide!",
                            max_slides_reached: "Vous ne pouvez créer que {{max}} sections pour l'instant. Utilisez le bouton de commentaires ci-dessous pour nous prévenir si vous désirez en créer plus. Merci !",
                            multi_file_error: "S'il vous plaît faites glisser un fichier à la fois.",
                            network_error: "Oups. Erreur réseau. Veuillez rafraîchir et réessayer.",
                            save_error: "Erreur lors de l'enregistrement de votre page. Veuillez réessayer.",
                            social_account_connect_error: "Failed to connect you account. Please try again or contact us for assistance!",
                            too_many_invitations: "Désolé ! Vous ne pouvez inviter que 10 personnes par site.",
                            upload_fail: "Échec du téléchargement. S'il vous plaît essayer à nouveau ou nous contacter pour de l'aide!",
                            upload_network_error: "Oups. Une erreur réseau vous empêche de charger des fichiers. Veuillez rafraîchir et réessayer.",
                            video_type_error: "L'URL n'est pas valide"
                        },
                        html_editor: {
                            ecwid: {
                                enter_store_id: "Veuillez saisir un ID de boutique."
                            },
                            google_maps: {
                                enter_location: "Veuillez saisir un lieu!",
                                view_larger_map: "Voir une carte plus grande"
                            },
                            shared: {
                                errors: null
                            },
                            slides: {
                                errors: {
                                    invalid_url: "URL non valide ! Veuillez utiliser une URL slid.es valide."
                                }
                            },
                            soundcloud: {
                                errors: {
                                    invalid_url: "URL non valide ! Veuillez utiliser une URL soundcloud.com valide."
                                }
                            }
                        },
                        notice: {
                            mobile_notice: "Bienvenue à l'éditeur Strikingly ! Il semble que vous utilisez un appareil mobile. Les sites web que vous construisez avec Strikingly ont l'air super sur tous les appareils, mais nous recommandons de modifier votre site sur un ordinateur de bureau ou ordinateur portable.",
                            pro_section_notice: "You've selected a Pro section! You can try this section out, but it won't show up on your live site until you upgrade to Pro."
                        },
                        rich_text: {
                            align_center: "Centrer",
                            align_justify: "Justifier",
                            align_left: "Aligner à gauche",
                            align_right: "Aligner à droite",
                            bold: "Gras",
                            bulleted_list: "Liste à puces",
                            confirm_cancel: "Certains changements n'ont pas été sauvegardés. Voulez-vous tout de même fermer la fenêtre?",
                            custom: "Plus",
                            font_family: "Police",
                            font_size: "Taille de police",
                            font_size_large: "Grande",
                            font_size_larger: "Plus grande",
                            font_size_normal: "Normale",
                            font_size_small: "Petite",
                            font_size_smaller: "Plus petite",
                            italic: "Italique",
                            link: "Lien",
                            link_dialog_document: "Document",
                            link_dialog_email: "Email",
                            link_dialog_email_address: "Adresse",
                            link_dialog_email_placeholder: "e.g. john@example.com",
                            link_dialog_invalid_email: "Adresse e-mail invalide",
                            link_dialog_open_in_new_tab: "Ouvrir dans un nouvel onglet",
                            link_dialog_remove_document: "Supprimer le document",
                            link_dialog_remove_email: "Supprimer l'email",
                            link_dialog_remove_link: "Supprimer le lien",
                            link_dialog_title: "Créer un lien",
                            link_dialog_upload_file: "Importer un fichier",
                            link_dialog_url: "URL",
                            link_dialog_url_placeholder: "e.g. http://abc.com OU #2 (numéro de section)",
                            link_dialog_web: "Page web",
                            numbered_list: "List numérotée",
                            save: "Enregistrer",
                            underline: "Souligner",
                            use_default: "Défaut"
                        }
                    },
                    social_feed: {
                        text: {
                            posts: "Posts",
                            posts_on_facebook_page: "Posts on Facebook page",
                            posts_on_timeline: "Posts on timeline",
                            tweets: "Tweets"
                        }
                    }
                },
                payment: {
                    add_ons: {
                        errors: {
                            network_error: "Impossible de soumettre vos modifications. Assurez-vous que le réseau est correct et essayez à nouveau.",
                            no_active_subscription: "Vous ne avez pas d'abonnement actif.",
                            not_supported: "Votre compte ne prend pas encore en charge l'achat de {{add_on_type}}."
                        },
                        types: {
                            additional_page: "page additionnelle"
                        }
                    }
                },
                plans: {
                    name: {
                        pro_2y: "Pro Biennal",
                        pro_monthly: "Pro Mensuel",
                        pro_yearly: "Pro Annuel",
                        starter_2y: "Limité Deux Ans",
                        starter_monthly: "Limité Mensuel",
                        starter_yearly: "Limited Annuellement"
                    }
                },
                select_template: {
                    confirm: {
                        ok: "  OK  "
                    },
                    info: {
                        no_site: "Hey, on dirait que vous n'avez pas encore de site. Sélectionnez un beau modèle ici pour commencer !"
                    }
                },
                settings_dialog: {
                    updated: "Mis à jour."
                },
                student_program: {
                    email_denied: "Nous n'avons pas pu valider votre adresse email. Vérifiez si vous avez entré quelque chose d'incorrecte, ou contactez le support si vous avez des questions",
                    network_error: "Il y a eu une erreur de réseau. Rafraîchissez la page et essayez à nouveau."
                },
                subscriptions: {
                    edit: {
                        confirm: {
                            downgrade: "Voulez-vous vraiment baisser de niveau ? Votre compte sera crédité de ce que vous avez déjà payé.",
                            general: "Voulez-vous vraiment changer de formule ? Si vous mettez à niveau, votre facturation sera modifiée en conséquence.",
                            upgrade: "Voulez-vous vraiment mettre à niveau ? Votre compte sera facturé sur une base de tarification Pro."
                        }
                    },
                    new: {
                        billing: {
                            coupon_applied_free_period_notice: "Vous ne serez pas facturé immédiatement. Les {{free_period_days}} premiers jours sont gratuits. À partir du {{billing_start_date}}, vous serez facturé <strong class='dark'>{{discounted_price}} $ par {{period}}</strong>, puis <strong class='dark'>{{price}} $ par {{period}}</strong>.",
                            coupon_applied_no_free_period_notice: "Vous serez facturé <strong class='dark'>{{discounted_price}} $ par {{period}}</strong>, puis <strong class='dark'>{{price}} $ par {{period}}</strong>.",
                            free_period_notice: "Vous ne serez pas facturé immédiatement. Les {{free_period_days}} premiers jours sont gratuits. À partir du {{billing_start_date}}, vous serez facturé <strong class='dark'>{{price}} $ par {{period}}</strong>.",
                            heading: "{{free_period_full_string}} Gratuit &mdash; Garanti",
                            no_free_period_notice: "Vous serez facturé <strong class='dark'>{{price}} $ par {{period}}</strong>."
                        },
                        coupon: {
                            applied: "Réduction de {{percent}} % appliquée !",
                            applied_notice: "Coupon appliqué ! Le coupon n'est valide que pour la première période de facturation !",
                            invalid: "Code coupon non valide.",
                            not_applicable: "The coupon doesn't apply to the plan you choose.",
                            wait: "Patientez..."
                        },
                        errors: {
                            card_expiry: "Veuillez saisir une date d'expiration valide",
                            card_number: "Veuillez saisir un numéro de carte valide",
                            cvc: "Veuillez saisir un code de sécurité valide",
                            postal_code: "Postal code can't be empty"
                        },
                        paypal: {
                            free_period_description: "You are subscribing to Strikingly {{plan}} plan and will not be billed until {{billing_start_date}}.",
                            no_free_period_description: "Vous souscrivez au plan Strikingly {{plan}}."
                        },
                        periods: {
                            "2y": "2 years",
                            month: "mois",
                            monthly: "month",
                            two_year: "2 years",
                            year: "an",
                            yearly: "year"
                        },
                        prices: {
                            pro_2y: "$336/deux-ans",
                            pro_monthly: "20 $/mois",
                            pro_yearly: "192 $/an",
                            starter_2y: "$168/two-year",
                            starter_monthly: "12 $/mois",
                            starter_yearly: "96 $/an"
                        },
                        why_billing_info: "Nous demandons les informations de votre carte bancaire pour éviter l'interruption de votre compte Strikingly si vous décidez de garder votre compte actif à la fin de votre période d'essai. Ceci nous permet également d'éviter la fraude. <br/><br/> Votre carte bancaire ne sera facturée à aucun moment de votre période d'essai. Si vous annulez durant la période d'essai, vous ne serez jamais facturé.<br/><br/>Nous vous enverrons un e-mail trois jours avant la fin de votre période d'essai pour vous rappeler que celle-ci va bientôt expirer."
                    }
                },
                traffic_guide: {
                    confirm_go_to_editor: "Aller à l'éditeur maintenant afin de mettre à jour les paramètres ?"
                }
            }
        },
        ja: {
            js: {
                api: {
                    analytics: {
                        device: {
                            desktop: "コンピューター",
                            mobile: "モバイル",
                            others: "他の"
                        },
                        geography: {
                            others: "他の"
                        },
                        period_title: {
                            past_24_hours: "過去24時間",
                            past_3_months: "過去3ヶ月",
                            past_month: "過去1ヶ月",
                            past_week: "過去1週間",
                            past_year: "過去1年"
                        },
                        referrer: {
                            direct_traffic: "ダイレクト・トラフィック"
                        },
                        show: {
                            errors: {
                                exception: "サイト解析ページのロード中に問題が生じました。当社の技術チームが現在調査しております。",
                                record_not_found: "ページが見つかりません。"
                            }
                        }
                    },
                    blogPosts: {
                        errors: {
                            genericPublish: "この投稿を公開する際にエラーが起こったようです。問題が解決しない場合は、support@strikingly.comまでご連絡ください。",
                            genericSave: "この投稿を保存する際にエラーが起こったようです。問題が解決しない場合は、support@strikingly.comまでご連絡ください。",
                            invalidLockId: "このブログ投稿について、複数のエディタが開かれている可能性があります。エディタは一度にひとつだけ開くようにしてください。再読み込みすることで、再試行することができます。",
                            unauthorized: "ログアウトしてしまったようです！OKをクリックすることで、再びログインできます。"
                        },
                        messages: {
                            confirmPublishUntitledPost: "まだタイトルが入力されていません。公開してもよろしいですか？"
                        }
                    },
                    domains: {
                        confirm: {
                            delete_dns_record: "この記録を削除してよろしいですか？",
                            renew: "更新について24.95ドルが課金されます。更新してよろしいですか？",
                            renew_for_free: "このドメインの費用は、年間契約の料金に含まれています。更新してよろしいですか？"
                        },
                        errors: {
                            create_dns_record_failed: "DNSレコードを作成できませんでした。再試行してください。",
                            create_user_failed: "ユーザーアカウントの作成に失敗しました。",
                            delete_dns_record_failed: "DNSレコードを削除できませんでした。再試行してください。",
                            empty_field_warning: "無効な入力内容です。",
                            get_dns_record_failed: "DNSレコードを取得できませんでした。再試行してください。",
                            get_registrant_verification_status_failed: "登録者の認証ステータスの取得に失敗しました。再試行するか、support@strikingly.comまでお問合せください。",
                            get_zone_failed: "ゾーンの詳細を取得できませんでした。再試行してください。",
                            list_dns_records_failed: "DNSレコードを取得できませんでした。再試行してください。",
                            provision_failed: "DNSプロビジョンに失敗しました。",
                            release_domain_failed: "ドメインのリリースに失敗しました。 再試行するか、support@strikingly.comまでお問合せください。",
                            renew_failed: "ドメインの更新ができませんでした。support@strikingly.comへお問合せください。",
                            renew_payment_failed: "ドメインの更新についての課金ができませんでした。支払情報を確認してください。",
                            send_verification_email_failed: "認証メールの送信に失敗しました。再試行するか、support@strikingly.comまでお問合せください。",
                            setup_dns_failed: "DNSのセットアップに失敗しました。",
                            update_contact_info_failed: "連絡先情報のアップデートに失敗しました。再試行するか、support@strikingly.comまでお問合せください。",
                            update_dns_record_failed: "DNSレコードをアップデートできませんでした。再試行してください。",
                            update_nameservers_failed: "ネームサーバのアップデートに失敗しました。再試行するか、support@strikingly.comまでお問合せください。"
                        }
                    },
                    ecommerce: {
                        charge_order: {
                            bad_request: "注文の課金時にエラーが発生しました。問題が解決しない場合はsupport@strikingly.comまでご連絡をお願いいたします。",
                            internal_error: "注文の課金時にエラーが発生しました。問題が解決しない場合はsupport@strikingly.comまでご連絡をお願いいたします。"
                        },
                        complete: {
                            bad_request: "注文の処理中にエラーが発生しました。"
                        },
                        create_order: {
                            bad_request: "注文の生成時にエラーが発生しました。",
                            internal_error: "注文の生成時にエラーが発生しました。"
                        },
                        refund: {
                            bad_request: "注文の返金時にエラーが発生しました。問題が解決しない場合はsupport@strikingly.comまでご連絡をお願いいたします。"
                        }
                    },
                    generators: {
                        generate_from_facebook: {
                            errors: {
                                already_have: "もうウェブサイトをお持ちではないですか？OKをクリックして確認してください。",
                                cant_get_data: "Facebookからのデータの取得に関してエラーがありました。再試行してください。",
                                error: "エラーが発生しました。私たちのエンジニアが原因を調査しています。再試行してください。",
                                exception: "ネットワーク接続がタイムアウトしました。もう一度お試しください。当社の技術チームが現在調査しております。",
                                invalid: "{{message}}",
                                missing_user: "ユーザーが存在しません。",
                                no_facebook: "Facebookとの接続に関して問題があるようです。インターネット接続の状態を確認して、再試行してください。",
                                oauth_exception: "Facebookのセッションがタイムアウトしました。Facebookに再度ログインしてください。"
                            },
                            messages: {
                                failed_to_get_friends: "友だちリストの取得に失敗しました。再試行してください。",
                                failed_to_get_pages: "ページリストの取得に失敗しました。再試行してください。",
                                getting_friends: "Facebookの友だちの情報を取得しています・・・",
                                getting_pages: "Facebookページの情報を取得しています・・・",
                                to_simplify: "Facebookとの接続でエラーが発生しました。ログインして再試行してください。"
                            }
                        },
                        generate_from_linkedin: {
                            errors: {
                                exception: "ネットワーク接続がタイムアウトしました。もう一度お試しください。当社の技術チームが現在調査しております。",
                                invalid: "{{message}}",
                                missing_user: "ユーザーが存在しません。",
                                oauth_exception: "LinkedInのセッションがタイムアウトしました。LinkedInにログインしなおしてください。"
                            }
                        },
                        new_year_resolutions: {
                            errors: {
                                exception: "ネットワーク接続がタイムアウトしました。もう一度お試しください。当社の技術チームが現在調査しております。",
                                invalid: "{{message}}",
                                missing_user: "ユーザーが存在しません。",
                                oauth_exception: "Facebookのセッションがタイムアウトしました。Facebookにログインしなおしてください。"
                            }
                        },
                        share_on_linkedin: {
                            errors: {
                                exception: "問題が起きました。もう一度お試しください。当社の技術チームが現在調査しております。"
                            }
                        }
                    },
                    jobs: {
                        custom_domain_setup: {
                            errors: {
                                exception: "ネットワーク接続がタイムアウトしました。もう一度お試しください。当社の技術チームが現在調査しております。",
                                invalid: "{{message}}"
                            },
                            success: {
                                connected: "接続しました。設定には最高で48時間かかる場合があります。",
                                disconnected: "カスタムドメインとの接続を切断しました。",
                                domain_is_live: "あなたのドメインは、公開になっています！",
                                need_configuration: "このドメインは、現在あなたのサイトと接続されていません。ドメインが正しく設定されていることを確認してください。",
                                propagation_note: "ドメインの設定を行うと、通常1〜2時間で反映されますが、変更が反映されるまでに最大48時間かかることがあります。"
                            }
                        }
                    },
                    pages: {
                        collaboration: {
                            errors: {
                                access_denied: "この作業は許可されていません。ウェブサイトのオーナーにご連絡ください。"
                            }
                        },
                        confirm: {
                            delete_site: "本当に {{name}} を削除してよろしいですか？このサイトを取り戻すことができませんのでご注意ください。"
                        },
                        custom_domain_update: {
                            errors: {
                                exception: "ネットワーク接続がタイムアウトしました。もう一度お試しください。当社の技術チームが現在調査しております。",
                                invalid: "{{message}}",
                                missing_params: "問題が起きました。もう一度お試しください。問題が解消しない場合は、サポートボタンを使用してご連絡ください。",
                                no_change: "変更はありません。"
                            },
                            success: {
                                saved: "更新されました。"
                            },
                            warnings: {
                                non_www_root: "ルートドメインの前には「www」をつけることを強くお薦めします。（無視して次に進むには「Submit」をクリック）"
                            }
                        },
                        publish: {
                            success: {
                                published: "ページを公開しました。"
                            }
                        },
                        settings_update: {
                            errors: {
                                invalid: "{{message}}",
                                missing_params: "問題が起きました。もう一度お試しください。問題が解消しない場合は、サポートボタンを使用してご連絡ください。",
                                premium_sites_limit_reached: "You reached the limit of published sites using premium features you can use. Please extend your plan."
                            },
                            success: {
                                permalink_changed: "ページは数秒以内にリフレッシュされます。 リフレッシュされない場合は<a href='{{edit_page_http_url}}'>ここ</a> をクリックしてください。",
                                saved: "保存しました！"
                            }
                        },
                        shared: {
                            errors: {
                                access_denied: "この操作の実行は許可されていません。",
                                record_not_found: "ページのURLが変更されているようです。「OK」をクリックしてダッシュボードへ行き、編集したいページを選択してください。",
                                session_expired: "セッションがタイムアウトしました。再度ログインしてページを編集してください。"
                            }
                        },
                        update: {
                            errors: {
                                exeption: "コンテンツの保存中に問題が起きました。当社の技術チームが現在調査しております。",
                                invalid: "{{message}}"
                            },
                            success: {
                                saved: "ページを保存しました。"
                            }
                        }
                    },
                    registrations: {
                        "500": "Error in registration. Our engineers are already looking into it. Please send an email to support@strikingly.com if you've any questions.",
                        create: {
                            errors: {
                                invalid: "{{message}}",
                                missing_params: "メールアドレスと名前は必須です。"
                            },
                            success: {
                                saved: ""
                            }
                        }
                    },
                    shared: {
                        please_wait: "しばらくお待ちください..."
                    },
                    subscriptions: {
                        check_coupon: {
                            errors: {
                                expired: "クーポンの期限が切れました。",
                                invalid_coupon: "クーポンコードが無効です。"
                            }
                        },
                        plan: {
                            billed_monthly: "1ヶ月ごとに課金",
                            billed_two_year: "2年ごとに課金",
                            billed_yearly: "1年ごとに課金"
                        }
                    },
                    videos: {
                        create: {
                            errors: {
                                exception: "動画のロード中に問題が起きました。当社の技術チームが現在調査しております。",
                                invalid: "{{message}}"
                            }
                        }
                    }
                },
                app_store: {
                    descriptions: {
                        baidu_maps: "特定の場所をBaidu Mapで表示させてみましょう！",
                        celery: "プレオーダーをうけて、後で課金することができます。クラウドファンディングやシンプルなeコマースに最適です。",
                        disqus: "ディスカッションボードを追加して、積極的に閲覧・コメントをする人々のコミュニティをつくることができます。",
                        ecwid: "自分のサイトに、必要なものがすべてそろったeコマース機能を追加することができます。オンラインストアの作成、商品の管理、支払の受け取りをすることができます。",
                        eventbrite: "Eventbriteにイベントを作成し、ウィジェットを埋め込むことで、あなたのサイト上から直接チケットを販売することができます。",
                        facebook_comments: "世界のどこからでも、あなたの友だちがここにコメントを残すことができます。",
                        google_calendar: "Googleカレンダーを、サイトの訪問者とシェアしましょう。",
                        google_form: "シンプルなオンラインフォームをつかって、クイズを作成したり、調査を行なったり、様々な情報を収集することができます。",
                        google_maps: "特定の場所を地図で表示させてみましょう！",
                        html: "好きなサードパーティのサービスを埋め込んだり、ご自分のコードを自由に入力することができます。上級ユーザー向けの、パワフルなツールです。",
                        instagram: "あなたのInstagramの写真をギャラリーに表示しましょう！",
                        locu: "あなたの商品・ビジネスリストやサービス内容をLocuを使用して管理・公開しましょう。あなたのサイト上で直接紹介することができます。",
                        mailchimp: "MailChimpを使用して、メールベースのニュースレターを作成、送信、トラッキングしましょう。あなたのサイト上に登録フォームを埋め込むことができます。",
                        medium: "Mediumのプロフィール、コレクション、ブログ投稿をサイト上に埋め込む",
                        paypal: "PayPalボタンをサイトに追加して、支払を受け取ることができます。",
                        photobucket: "PhotoBucketのスライドショーをサイト上で再生できます。",
                        pinterest: "Pinterestのピン、プロフィール、ボードをサイト上で表示することができます。",
                        scribd: "Scribdのドキュメントまたはブックをサイトに埋め込みましょう。",
                        slides: "Slidesは、プレゼンテーションを作成、公開、シェアすることができるツールです。",
                        slideshare: "スライドショーのプレゼンテーションを埋め込む",
                        soundcloud: "SoundCloudのトラック、アルバム、アーティスト、コレクションを埋め込むことができます。",
                        type_form: "サイト上で目を引く、デザイン性に優れた調査票やフォームを作成しましょう。使用は無料で、高度な機能・拡張機能の使用は有料となります。",
                        wufoo: "フォームや調査票を作成して、データ、フィードバック、支払情報などを収集することができます。開始するのは無料で、ボリュームを増やしていくのは有料となります。"
                    },
                    errors: {
                        create_app_config: "アプリ設定画面の作成に失敗しました。ネットワークの問題だと思われます。ページを再読み込みしてみてください。",
                        init_app_config: "アプリ設定画面の初期化に失敗しました。ネットワークの問題だと思われます。ページを再読み込みしてみてください。",
                        load_app_config: "アプリ設定画面の読み込みに失敗しました。ネットワークの問題だと思われます。ページを再読み込みしてみてください。",
                        save_app_config: "アプリ設定の保存に失敗しました。ネットワークの問題だと思われます。ページの再読み込みをお試しください。",
                        scribe_url_incorrect: "入力内容に問題があるようです。入力内容の例: 'http://www.scribd.com/doc/220861572/Aurora-Cidr03'.",
                        url_not_fount: "URLが見つかりません。正しいURLかどうか確認してください。"
                    },
                    names: {
                        baidu_maps: "Baidu Maps",
                        celery: "Celery",
                        disqus: "Disqus",
                        ecwid: "Ecwid",
                        eventbrite: "Eventbrite",
                        facebook_comments: "Facebookコメント",
                        google_calendar: "Google Calendar",
                        google_form: "Google Form",
                        google_maps: "Google Maps",
                        html: "HTML",
                        instagram: "Websta",
                        locu: "Locu",
                        mailchimp: "MailChimp",
                        medium: "Medium",
                        paypal: "PayPal",
                        photobucket: "PhotoBucket",
                        pinterest: "Pinterest",
                        scribd: "Scribd",
                        slides: "Slides",
                        slideshare: "SlideShare",
                        soundcloud: "SoundCloud",
                        type_form: "Typeform",
                        wufoo: "Wufoo"
                    },
                    tooltips: {
                        help_tooltip: "アプリのより詳しいチュートリアルを読む",
                        pro_app_tooltip: "このアプリを使用するには、Pro版へアップグレードしてください。",
                        upgrade_link_tooltip: "アップグレードして、Pro版のアプリを使用しましょう！"
                    }
                },
                confirm: {
                    disconnect_facebook: "あなたの Facebook アカウントとの接続を解除してよろしいですか？",
                    disconnect_linkedin: "あなたの LinkedIn アカウントとの接続を解除してよろしいですか？"
                },
                email_settings: {
                    saved: "保存しました！"
                },
                form_responses: {
                    confirm: {
                        delete_blog_subscription: "Are you sure you wish to delete these subscription entries? Removing a blog subscription entry will delete the subscription",
                        delete_form_response: "Are you sure you wish to delete these entries?"
                    },
                    labels: {
                        contact: "お問い合わせフォーム",
                        signup: "サインアップフォーム"
                    }
                },
                html_editor: {
                    script_error: "入力されたHTMLには編集画面上で表示できないスクリプトが含まれています。<br/><br/>コンテンツを表示するにはサイトのプレビューを選択してください。"
                },
                invitations: {
                    create: {
                        errors: {
                            missing: "{{message}}"
                        }
                    },
                    new: {
                        claim_confirm: "この特典を獲得する！",
                        claim_msg: "この特典を選択してよろしいですか？",
                        confirm: "OK",
                        email_hint: "宛先のメールアドレスのリストをここに入力してください!",
                        invitation_sent: "招待状を送信しました！ぜひ招待状を送った方々に、登録して特典を獲得するようお声がけください！",
                        network_error: "ネットワークエラーがありました。ページを再読み込みを選択して再試行してください。"
                    }
                },
                jquery: {
                    errors: {
                        required: "これは必須項目です。"
                    }
                },
                migration: {
                    add_new_section: "新しいセクションを追加する",
                    add_new_section_tip: "あなたのサイトに新しい機能を加えましょう！",
                    click_to_complete: "「公開」をクリックすることでアップデートを完了し、公開中のサイトに変更が反映されます！",
                    error: "アップデート中に問題が起きました。ページの再読み込みを行なって、もう一度お試しください。問題が解決しない場合は、ユーザーサポートへお問い合わせください。",
                    layout: "レイアウト",
                    layout_tip: "新しいレイアウトを試してみましょう！",
                    styles: "スタイル",
                    styles_tip: "「スタイル」からデータを保持したままテンプレートを変更できます！",
                    support_tip: "もし取り消したい場合は、ユーザーサポートまでお問い合わせください。",
                    this_feature: "この機能"
                },
                pages: {
                    alert: {
                        feature_limit: "Uh oh! It looks like you're using some Pro features ({{features}}). Please remove them to publish this site!",
                        unknown_publish_support: "Uh oh! Your site can't be published right now. Please contact support@strikingly.com for help!"
                    },
                    blog: {
                        confirm: {
                            delete_blog_post: "Are you absolutely sure you wish to delete this blog post? This action is PERMANENT!"
                        },
                        text: {
                            save_error: "保存する際にエラーが起こったようです。問題が解決しない場合は、support@strikingly.comまでご連絡ください。",
                            saved: "保存されました！",
                            saving: "保存中..."
                        }
                    },
                    dashboard: {
                        cancel: "キャンセル",
                        clone_msg: "このサイトを複製しますか？",
                        clone_pub_msg: {
                            pro: "注意：あなたはすでにProサイトの公開上限数に達しています。サイトを複製することはできますが、そのサイトがPro版の機能を使っていると公開することができません。続けますか？",
                            starter: "注意：あなたはすでにLimited版サイトの公開上限数に達しています。サイトを複製することはできますが、そのサイトがLimited版の機能を使っていると公開することができません。続けますか？"
                        },
                        confirm: "確定",
                        pub_confirm: "公開を確定",
                        pub_failed: "公開に失敗しました。support@strikingly.comまでお問合せください。",
                        pub_msg: "あなたのサイトが世界中へ公開されます！",
                        pub_quota: "公開できるサイト数の上限に達しました！このサイトを公開するには、現在公開しているサイトの１つを非公開にする必要があります。",
                        quota_confirm: "分かりました。",
                        sort: {
                            created: "作成順に表示",
                            name: "サイト名順に表示",
                            updated: "更新順に表示"
                        },
                        unpub_confirm: "非公開を確定",
                        unpub_msg: "非公開にしてよろしいですか？あなたのサイトは「工事中」と表示されるようになります。"
                    },
                    ecommerce: {
                        confirm: {
                            cancel_edit: "保存せずに編集画面を閉じてよろしいですか？",
                            delete_item: "Are you sure you want to delete this item?",
                            delete_product: "この商品を削除してよろしいですか？",
                            delete_product_with_coupon: "Are you sure you want to delete this product?",
                            disconnect_account: "あなたの{{provider}}との接続を解除してよろしいですか？",
                            payment_not_set: "サイトを公開する前に、シンプルストアでの支払いを可能にするために、支払いシステムを設定してください。公開してよろしいですか？",
                            payment_not_set_proceed: "You haven't set up your payment gateway for your Simple Store yet! You must set it up in your store settings to enable checkout.\n\nClick OK to proceed.\n",
                            payment_not_set_short: "You haven't set up your payment gateway for your Simple Store yet! You must set it up in your store settings to enable checkout."
                        },
                        coupon: {
                            delete_warning: "このクーポンコードを削除してよろしいですか？",
                            description: "({{token}} - {{amount}}% Off)",
                            detailedDescription: "注文の総額（送料を除く）から{{amount}}%の割引を提供するクーポンになります。",
                            expired: "有効期限切れ",
                            flat_description: "{{token}} ({{amount}} Off)",
                            free_shipping_description: "{{token}} (送料無料)",
                            percentange_description: "{{token}} ({{amount}}% Off)"
                        },
                        errors: {
                            can_not_load_products: "ネットワークの問題が発生しました。ページの再読み込みを行なって、再試行してください。",
                            coupon_no_amount: "割引率を入力してください",
                            coupon_no_token: "クーポンコードを入力してください",
                            coupon_repeated_token: "同じコードのクーポンがすでに存在しています！",
                            coupon_zero_amount: "割引率は、ゼロにすることはできません",
                            empty_quantity: "数量は0、もしくは空欄にはできません。",
                            general_required_error_v1: "{field}は必須項目です。",
                            general_required_error_v2: "{field}は必須項目です。",
                            image_limication: "画像のアップロードは最大10点までです。XXX点の画像の選択を解除して、続行してください。",
                            invalid_input: "無効な値",
                            invalid_quantity: "在庫切れ",
                            paypal_not_support_cny: "PayPalは、現在人民元をサポートしていません。",
                            seller_not_connect_gateway: "販売者がまだ支払い窓口を設定していないため、現在は購入できません。"
                        },
                        options: {
                            cancelled: "キャンセル",
                            completed: "完了",
                            pending: "未定／検討中"
                        },
                        providers: {
                            alipay: "Alipay",
                            paypal: "Paypal",
                            stripe_connect: "Stripe"
                        },
                        text: {
                            choose_a_country: "国を選択",
                            choose_a_type: "タイプを選択",
                            cta_btn: "購入",
                            description: "商品の紹介文を追加。簡潔なものにしましょう！",
                            edit_btn_add_product: "商品を追加",
                            edit_btn_mange_product: "商品を管理",
                            price_for_required_error: "価格",
                            product_name: "商品名を追加",
                            product_name_for_required_error: "商品名",
                            rest_of_world: "その他の地域",
                            variant_name_for_required_error: "オプション",
                            world: "全世界"
                        }
                    },
                    edit: {
                        confirm: {
                            delete_blog_section: "このセクションを削除してよろしいですか？\n\nブログの投稿は削除されません（ブログセクションを再び追加すると、投稿が表示されます）。",
                            delete_collaborator: "この共同編集者を削除してよろしいですか？削除された共同編集者はこのサイトを編集することができなくなります。",
                            delete_library_file: "このファイルを削除してよろしいですか？",
                            delete_library_image: "この画像を削除してよろしいですか？",
                            delete_section: "このセクションを削除しますか?一度削除すると元には戻せません。",
                            delete_section_v4: "セクションを削除してよろしいですか？",
                            delete_social_account: "このアカウントを削除しますか。関連フィードはページに表示されなくなります。",
                            unsaved_changes: "このページの変更を保存していません。このページから移動するとこれらの変更は失われます。"
                        },
                        domain_emails: {
                            confirm: {
                                delete_entry: "このエントリーを本当に削除しますか？"
                            },
                            errors: {
                                limit_reached: "作成できるメールは{{limit}}通までです。"
                            }
                        },
                        errors: {
                            already_have_blog: "あなたはすでにこのサイトでブログセクションを使用しています。",
                            already_have_ecommerce: "あなたはすでにこのサイトでストアセクションを使用しています。",
                            already_have_social_feed: "あなたはすでにこのサイトでソーシャルフィードセクションを使用しています。",
                            api_error: "ネットワークに問題が起こったようです。私たちのエンジニアはこの問題について通知をうけ、原因を調査しています。",
                            delete_file_fail: "ライブラリの読み込みに失敗しました。再試行するか、support@strikingly.comまでお問合せください。",
                            duplicate_collaborator: "この方にはすでに招待を送っています。",
                            effects_network_error: "ネットワークの問題のため効果を追加することができません。リフレッシュしてもう一度お試しください。",
                            email_format_error: "無効なメールアドレスです。",
                            get_presigned_post_error: "アップローダーに問題が起こったようです。再試行するか、support@strikingly.comまでお問合せください。",
                            load_files_fail: "ライブラリの読み込みに失敗しました。再試行するか、support@strikingly.comまでお問合せください。",
                            max_slides_reached: "現在作成できるのは {{max}} セクションのみです。もっと作成したい場合は下のフィードバックボタンを使用してお知らせください。ありがとうございます！",
                            multi_file_error: "ドラッグで移動できるのは、一度に1ファイルまでです。",
                            network_error: "ネットワークに問題が起きました。リフレッシュしてもう一度お試しください。",
                            save_error: "ページの保存中に問題が起きました。もう一度お試しください。",
                            social_account_connect_error: "アカウントの接続に失敗しました。再試行するか、support@strikingly.comまでお問合せください。",
                            too_many_invitations: "招待状を送れるには、1サイトあたり10人までです。",
                            upload_fail: "アップロードに失敗しました。再試行するか、support@strikingly.comまでお問合せください。",
                            upload_network_error: "ネットワークの問題のためアップロードすることができません。リフレッシュしてもう一度お試しください。",
                            video_type_error: "無効なURLです。"
                        },
                        html_editor: {
                            ecwid: {
                                enter_store_id: "ストアID を入力してください。"
                            },
                            google_maps: {
                                enter_location: "位置情報を入力してください!",
                                view_larger_map: "もっと大きいマップを見る"
                            },
                            shared: {
                                errors: null
                            },
                            slides: {
                                errors: {
                                    invalid_url: "無効なURLです。slid.esの有効なURLを使用してください。"
                                }
                            },
                            soundcloud: {
                                errors: {
                                    invalid_url: "無効なURLです。Soundcloud.comの有効なURLを使用してください。"
                                }
                            }
                        },
                        notice: {
                            mobile_notice: "Strikinglyの編集画面へようこそ！モバイル機器からアクセスなさっているようですね。Strikinglyで作成するサイトはモバイル機器にも最適化されていますが、サイトの作成・編集自体は現在はデスクトップかノートパソコンから行うことをおすすめしています。",
                            pro_section_notice: "これはPro版のセクションです。このセクション使ってみてください。ただし、公開後このセクションが現れません。"
                        },
                        rich_text: {
                            align_center: "中央に揃える",
                            align_justify: "両端に揃える",
                            align_left: "左に揃える",
                            align_right: "右に揃える",
                            bold: "太字",
                            bulleted_list: "箇条書きを挿入／削除",
                            confirm_cancel: "保存されていない変更があります。本当にダイアログボックスを閉じてよろしいですか？",
                            custom: "カスタム",
                            font_family: "フォント",
                            font_size: "フォント サイズ",
                            font_size_large: "大きい",
                            font_size_larger: "最大",
                            font_size_normal: "通常",
                            font_size_small: "小さい",
                            font_size_smaller: "最小",
                            italic: "斜体",
                            link: "リンク",
                            link_dialog_document: "ドキュメント",
                            link_dialog_email: "メール送信",
                            link_dialog_email_address: "送信先",
                            link_dialog_email_placeholder: "例： taro@tatoeba.com",
                            link_dialog_invalid_email: "無効なメールアドレスです。",
                            link_dialog_open_in_new_tab: "新しいタブで開く",
                            link_dialog_remove_document: "ドキュメントを削除",
                            link_dialog_remove_email: "メールアドレスを削除",
                            link_dialog_remove_link: "リンクを削除",
                            link_dialog_title: "リンク先",
                            link_dialog_upload_file: "ファイルをアップロード",
                            link_dialog_url: "URL",
                            link_dialog_url_placeholder: "例：http://abc.com または #2 (セクションナンバー・ページ内リンク)",
                            link_dialog_web: "ウェブサイト",
                            numbered_list: "段落番号を挿入／削除",
                            save: "保存",
                            underline: "下線",
                            use_default: "デフォルト"
                        }
                    },
                    social_feed: {
                        text: {
                            posts: "投稿",
                            posts_on_facebook_page: "フェイスブックページに投稿する",
                            posts_on_timeline: "タイムラインへの投稿",
                            tweets: "ツイート"
                        }
                    }
                },
                payment: {
                    add_ons: {
                        errors: {
                            network_error: "変更点を送信できませんでした。ネットワーク接続を確認して、再試行してください。",
                            no_active_subscription: "現在加入中のプランはありません。",
                            not_supported: "あなたのアカウントでは {{add_on_type}} の加入をサポートしていません。"
                        },
                        types: {
                            additional_page: "追加ページ"
                        }
                    }
                },
                plans: {
                    name: {
                        pro_2y: "Pro2年プラン",
                        pro_monthly: "Pro月間プラン",
                        pro_yearly: "Pro1年プラン",
                        starter_2y: "Limited2年プラン",
                        starter_monthly: "Limited月間プラン",
                        starter_yearly: "Limited年間プラン"
                    }
                },
                select_template: {
                    confirm: {
                        ok: "  OK  "
                    },
                    info: {
                        no_site: "まだサイトを作成していないようですね。テンプレートを選択してサイト作成をスタートしましょう！"
                    }
                },
                settings_dialog: {
                    updated: "更新されました。"
                },
                student_program: {
                    email_denied: "メールアドレスの認証に失敗しました。入力内容を確認して、原因が不明な場合はsupport@strikingly.comまでお問合せください。",
                    network_error: "ネットワークエラーがありました。ページを再読み込みを選択して再試行してください。"
                },
                subscriptions: {
                    edit: {
                        confirm: {
                            downgrade: "本当にダウングレードしてもよろしいですか？既にお支払いいただいた金額はクレジットとしてアカウントに入れられます。",
                            general: "本当にプランを変更してよろしいですか？アップグレードした場合は設定価格に基いて請求されます。",
                            upgrade: "本当にアップグレードしてよろしいですか？Pro版の価格に基づいてアカウントに請求されます。"
                        }
                    },
                    new: {
                        billing: {
                            coupon_applied_free_period_notice: "お申し込みから{{free_period_days}}日間は無料ですので、すぐには課金されません。{{billing_start_date}}から、まずは<strong class='dark'>{{period}}当たり{{discounted_price}}ドル</strong>が課金され、その後は<strong class='dark'>{{period}}当たり{{price}}ドル</strong>が課金されます。",
                            coupon_applied_no_free_period_notice: "<strong class='dark'>{{period}}当たり{{discounted_price}}ドル</strong>が課金され、その後は<strong class='dark'>{{period}}当たり{{price}}ドル</strong>が課金されます。",
                            free_period_notice: "お申し込みから{{free_period_days}}日間は無料ですので、すぐには課金されません。{{billing_start_date}}から、<strong class='dark'>{{period}}当たり{{price}}ドル</strong>が課金されます。",
                            heading: "{{free_period_full_string}}無料 — 保証します",
                            no_free_period_notice: "<strong class='dark'>{{period}}当たり${{price}}ドル </strong>が課金されます。"
                        },
                        coupon: {
                            applied: "{{percent}}%の割引が適用されました!",
                            applied_notice: "クーポンが使用されました。クーポンは最初のお支払の請求周期にのみ適用されます。",
                            invalid: "無効なクーポンコード。",
                            not_applicable: "このクーポンは、選択したプランには適用されません。",
                            wait: "お待ちください..."
                        },
                        errors: {
                            card_expiry: "適切な有効期限を入力してください",
                            card_number: "有効なカード番号を入力してください",
                            cvc: "有効なセキュリティコードを入力してください",
                            postal_code: "Postal code can't be empty"
                        },
                        paypal: {
                            free_period_description: "Strikinglyの {{plan}} プランに加入しようとしています。 {{billing_start_date}}までは課金されません。",
                            no_free_period_description: "Strikinglyの {{plan}} プランに加入しようとしています。"
                        },
                        periods: {
                            "2y": "2年",
                            month: "月",
                            monthly: "月",
                            two_year: "2年",
                            year: "年",
                            yearly: "年"
                        },
                        prices: {
                            pro_2y: "336ドル／2年間",
                            pro_monthly: "月額20ドル",
                            pro_yearly: "年額192ドル",
                            starter_2y: "$168／2年間",
                            starter_monthly: "月額12ドル",
                            starter_yearly: "年額96ドル"
                        },
                        why_billing_info: "無料期間終了後に継続利用をご希望の場合、お客様のStrikinglyアカウントをそのまま途切れることなくお使いいただけるよう、クレジットカード情報を提示いただいています。不正行為の軽減にも役立ちます。<br/><br/>無料期間中はクレジットカードへの請求は一切ありません。無料期間中にキャンセルした場合、請求は一切ありません。<br/><br/>無料期間終了の3日前に、終了期間が近づいたことをお知らせするメールを送信いたします。"
                    }
                },
                traffic_guide: {
                    confirm_go_to_editor: "編集画面に移動して、設定を更新しますか？"
                }
            }
        },
        "zh-CN": {
            js: {
                api: {
                    analytics: {
                        device: {
                            desktop: "桌面电脑",
                            mobile: "移动设备",
                            others: "其他设备"
                        },
                        geography: {
                            others: "其他地区"
                        },
                        period_title: {
                            past_24_hours: "最近 24 小时",
                            past_3_months: "最近 3 个月",
                            past_month: "上个月",
                            past_week: "上一周",
                            past_year: "去年"
                        },
                        referrer: {
                            direct_traffic: "直接访问"
                        },
                        show: {
                            errors: {
                                exception: "加载页面分析时出现问题。我们的工程团队正在调查。",
                                record_not_found: "找不到页面。"
                            }
                        }
                    },
                    blogPosts: {
                        errors: {
                            genericPublish: "发布时出现了错误，请再试一次。仍然有问题的话，请联系客服邮件： support@strikingly.com",
                            genericSave: "保存时出现了错误，请再试一次。仍然有问题的话，请联系客服邮件： support@strikingly.com",
                            invalidLockId: "你同时只能为同个网站打开一个编辑器页面。请关闭其他编辑器页面并刷新本页。",
                            unauthorized: "糟糕，你已经退出了。请重新登录。"
                        },
                        messages: {
                            confirmPublishUntitledPost: "你尚未输入标题。确定要发布网站吗？"
                        }
                    },
                    domains: {
                        confirm: {
                            delete_dns_record: "你确定要删除该记录吗？",
                            renew: "你需要为更新支付$24.95。确定要更新吗？",
                            renew_for_free: "你的包年套餐已含一个域名，确定要续费吗？"
                        },
                        errors: {
                            create_dns_record_failed: "DNS 记录创建失败，请重试。",
                            create_user_failed: "账号创建失败",
                            delete_dns_record_failed: "DNS 记录删除失败，请重试。",
                            empty_field_warning: "输入无效",
                            get_dns_record_failed: "DNS 记录获取失败，请重试。",
                            get_registrant_verification_status_failed: "验证失败，请重试或联系客服：support@strikingly.com",
                            get_zone_failed: "糟糕，出现了一些问题。请重试。",
                            list_dns_records_failed: "DNS 记录列表失败，请重试。",
                            provision_failed: "DNS 规则失败",
                            release_domain_failed: "域名更新失败，请重试或联系客服：support@strikingly.com",
                            renew_failed: "域名续费失败，请联系客服：support@strikingly.com",
                            renew_payment_failed: "域名续费付款失败，请检查你的付款信息。",
                            send_verification_email_failed: "验证邮件发送失败，请重试或联系客服：support@strikingly.com",
                            setup_dns_failed: "DNS 创建失败",
                            update_contact_info_failed: "联系信息更新失败，请重试或联系客服：support@strikingly.com",
                            update_dns_record_failed: "DNS 记录更新失败，请重试。",
                            update_nameservers_failed: "更新失败，请重试或联系客服：support@strikingly.com"
                        }
                    },
                    ecommerce: {
                        charge_order: {
                            bad_request: "修改订单时出现了错误。如果任然有问题的话，请联系客服邮件：support@strikingly.com",
                            internal_error: "修改订单时出现了错误。如果任然有问题的话，请联系客服邮件：support@strikingly.com"
                        },
                        complete: {
                            bad_request: "完成订单时出现了错误。"
                        },
                        create_order: {
                            bad_request: "创建订单时出现了错误。",
                            internal_error: "创建订单时出现了错误。"
                        },
                        refund: {
                            bad_request: "退款订单时出现了错误。如果任然有问题的话，请联系客服邮件：support@strikingly.com"
                        }
                    },
                    generators: {
                        generate_from_facebook: {
                            errors: {
                                already_have: "你已经有一个网站了，去看看吧。",
                                cant_get_data: "糟糕，获取信息出现问题。请重试。",
                                error: "糟糕，出现了一些问题。请重试。",
                                exception: "网络超时，请重试。我们的工程师们正在调查。",
                                invalid: "{{message}}",
                                missing_user: "缺失用户。",
                                no_facebook: "糟糕，连接出现了问题。请用 Facebook 账户重新登录。",
                                oauth_exception: "您的 Facebook 会话已超时。请用 Facebook 账户重新登录。"
                            },
                            messages: {
                                failed_to_get_friends: "糟糕，出现了一些问题。请重试。",
                                failed_to_get_pages: "糟糕，出现了一些问题。请重试。",
                                getting_friends: "获取 Facebook 朋友信息",
                                getting_pages: "获取 Facebook 页信息",
                                to_simplify: "糟糕，连接出现了问题。请用 Facebook 账户重新登录。"
                            }
                        },
                        generate_from_linkedin: {
                            errors: {
                                exception: "网络超时。请重试。我们的工程团队正在调查。",
                                invalid: "{{message}}",
                                missing_user: "缺失用户。",
                                oauth_exception: "您的 LinkedIn 会话已超时。请用 LinkedIn 账户重新登录。"
                            }
                        },
                        new_year_resolutions: {
                            errors: {
                                exception: "网络超时。请重试。我们的工程团队正在调查。",
                                invalid: "{{message}}",
                                missing_user: "缺失用户。",
                                oauth_exception: "您的 Facebook 会话已超时。请用 Facebook 账户重新登录。"
                            }
                        },
                        share_on_linkedin: {
                            errors: {
                                exception: "出现错误。请重试。我们的工程团队正在调查。"
                            }
                        }
                    },
                    jobs: {
                        custom_domain_setup: {
                            errors: {
                                exception: "网络超时。请重试。我们的工程团队正在调查。",
                                invalid: "{{message}}"
                            },
                            success: {
                                connected: "连接成功。设置可能需 48 个小时。",
                                disconnected: "成功断开与自定义域名的连接。",
                                domain_is_live: "Your domain is live!",
                                need_configuration: "This domain is NOT connected to your site. Please make sure your domain is configured correctly.",
                                propagation_note: "After configuring your domain, changes are usually visible within 1-2 hours, but can take up to 48 hours to fully propagate."
                            }
                        }
                    },
                    pages: {
                        collaboration: {
                            errors: {
                                access_denied: "无权限进行此操作。请联系网站所有者。"
                            }
                        },
                        confirm: {
                            delete_site: "Are you absolutely sure you wish to delete the site titled {{name}}? This action is PERMANENT!"
                        },
                        custom_domain_update: {
                            errors: {
                                exception: "网络超时，请重试。我们的工程师们正在调查原因。",
                                invalid: "{{message}}",
                                missing_params: "出现了错误，请重试。如果问题依旧存在，请联系客服。",
                                no_change: "无任何更改。"
                            },
                            success: {
                                saved: "已更新。"
                            },
                            warnings: {
                                non_www_root: '建议在域名前加上"www."信息。（忽略请重新提交）'
                            }
                        },
                        publish: {
                            success: {
                                published: "网站已发布。"
                            }
                        },
                        settings_update: {
                            errors: {
                                invalid: "{{message}}",
                                missing_params: "出现错误。请重试。如果问题依旧存在，请使用“支持”按钮联系我们。",
                                premium_sites_limit_reached: "You reached the limit of published sites using premium features you can use. Please extend your plan."
                            },
                            success: {
                                permalink_changed: "几秒钟后将刷新页面。如未刷新，请点击<a href='{{edit_page_http_url}}'>此处</a>。",
                                saved: "已保存！"
                            }
                        },
                        shared: {
                            errors: {
                                access_denied: "无权执行此操作。",
                                record_not_found: "似乎该页面的 URL 发生了改变。点击“好”，前往 Dashboard，并选择要编辑的页面。",
                                session_expired: "会话超时。请重新登录以编辑此页面。"
                            }
                        },
                        update: {
                            errors: {
                                exeption: "保存内容时出现问题。我们的工程团队正在调查。",
                                invalid: "{{message}}"
                            },
                            success: {
                                saved: "网站已保存。"
                            }
                        }
                    },
                    registrations: {
                        "500": "Error in registration. Our engineers are already looking into it. Please send an email to support@strikingly.com if you've any questions.",
                        create: {
                            errors: {
                                invalid: "{{message}}",
                                missing_params: "必须填写电子邮件和名字。"
                            },
                            success: {
                                saved: ""
                            }
                        }
                    },
                    shared: {
                        please_wait: "Please wait..."
                    },
                    subscriptions: {
                        check_coupon: {
                            errors: {
                                expired: "优惠券已失效。",
                                invalid_coupon: "优惠券代码无效。"
                            }
                        },
                        plan: {
                            billed_monthly: "按月收费",
                            billed_two_year: "按两年收费",
                            billed_yearly: "按年收费"
                        }
                    },
                    videos: {
                        create: {
                            errors: {
                                exception: "加载视频时出现问题。我们的工程团队正在调查。",
                                invalid: "{{message}}"
                            }
                        }
                    }
                },
                app_store: {
                    descriptions: {
                        baidu_maps: "在百度地图上显示你的位置。",
                        celery: "接受预定，过后收款。让你轻松创建众筹和简单的电商业务。",
                        disqus: "添加一个版块建立你的读者社区以及拥有评论功能。",
                        ecwid: "使你的网站拥有强大的电子商务功能。",
                        eventbrite: "用 Eventbrite 创建活动，并直接在你的网站上销售门票。",
                        facebook_comments: "让全世界的朋友都在这里留言吧。",
                        google_calendar: "把你的 Google 日历分享给访客。",
                        google_form: "用一个在线表单来做调查，问答，或收集信息。",
                        google_maps: "在 Google 地图上显示你的位置。",
                        html: "你可以内嵌任何第三方的服务，或自己填入代码。这是给高级用户的强大工具哦！",
                        instagram: "在相册里展示你的 Instagram 照片。",
                        locu: "在你的网站上展示你用 Locu 管理和发布的公司信息。",
                        mailchimp: "用 MailChimp 来创建，发送和跟踪电子简报。直接在网站上收集用户的电子邮箱地址。",
                        medium: "嵌入 Medium 博客账号。",
                        paypal: "添加 PayPal 支付按钮来收取付款。",
                        photobucket: "在网站上放入 PhotoBucket 的幻灯展示。",
                        pinterest: "展示你的 Pinterest 账号信息及内容。",
                        scribd: "嵌入 Scribd 文件或电子书。",
                        slides: "Slides 让你创建和分享在线的PPT展示报告。",
                        slideshare: "嵌入一个幻灯片展示模块。",
                        soundcloud: "嵌入来自 SoundCloud 的音乐，专辑或者艺人信息。",
                        type_form: "在网站上免费创建专业美观的在线问卷或表单！如果需要高级功能，请购买套餐。",
                        wufoo: "创建表单来获取数据和信息，反馈和款项。开始免费使用，可付费扩容。"
                    },
                    errors: {
                        create_app_config: "网络出现问题，请刷新页面。",
                        init_app_config: "网络出现问题，请刷新页面。",
                        load_app_config: "网络出现问题，请刷新页面。",
                        save_app_config: "网络出现问题，请刷新页面。",
                        scribe_url_incorrect: "输入有误！请按这个格式输入： 'http://www.scribd.com/doc/220861572/Aurora-Cidr03'.",
                        url_not_fount: "网址有误，请确认并重新输入。"
                    },
                    names: {
                        baidu_maps: "百度地图",
                        celery: "Celery",
                        disqus: "Disqus",
                        ecwid: "Ecwid",
                        eventbrite: "Eventbrite",
                        facebook_comments: "Facebook 评论",
                        google_calendar: "Google 日历",
                        google_form: "Google 表单",
                        google_maps: "Google 地图",
                        html: "HTML",
                        instagram: "Websta",
                        locu: "Locu",
                        mailchimp: "MailChimp",
                        medium: "Medium",
                        paypal: "PayPal",
                        photobucket: "PhotoBucket",
                        pinterest: "Pinterest",
                        scribd: "Scribd",
                        slides: "Slides",
                        slideshare: "SlideShare",
                        soundcloud: "SoundCloud",
                        type_form: "Typeform",
                        wufoo: "Wufoo"
                    },
                    tooltips: {
                        help_tooltip: "阅读此应用的详细教程。",
                        pro_app_tooltip: "想要使用这个应用，你需要先升级到专业版套餐。",
                        upgrade_link_tooltip: "现在就升级到专业版套餐，使用强大的应用。"
                    }
                },
                confirm: {
                    disconnect_facebook: "确定想要解除 Facebook 帐户的连接吗？",
                    disconnect_linkedin: "确定想要解除 LinkedIn 帐户的连接吗？"
                },
                email_settings: {
                    saved: "已保存！"
                },
                form_responses: {
                    confirm: {
                        delete_blog_subscription: "Are you sure you wish to delete these subscription entries? Removing a blog subscription entry will delete the subscription",
                        delete_form_response: "Are you sure you wish to delete these entries?"
                    },
                    labels: {
                        contact: "联系人表单",
                        signup: "注册表单"
                    }
                },
                html_editor: {
                    script_error: "你输入的 HTML 中含有无法在编辑器中显示的脚本。<br/><br/>要查看内容，请预览你的网站。"
                },
                invitations: {
                    create: {
                        errors: {
                            missing: "{{message}}"
                        }
                    },
                    new: {
                        claim_confirm: "是的，解锁吧！",
                        claim_msg: "确定解锁这个宝贝？",
                        confirm: "OK",
                        email_hint: "在此处输入一系列接收人邮箱地址，或者点击上方按钮导入你的联系人。",
                        invitation_sent: "邀请已发送。记得提醒你的朋友哦！",
                        network_error: "网络有些问题，试试刷新页面"
                    }
                },
                jquery: {
                    errors: {
                        required: "必须填写"
                    }
                },
                migration: {
                    add_new_section: "增加新版块",
                    add_new_section_tip: "为您的网站添加新功能",
                    click_to_complete: "点击完成您的升级并发布更新的内容吧！",
                    error: "哎呀，出错了。请刷新页面后再尝试，如果连续报错请联系客服解决。",
                    layout: "布局",
                    layout_tip: "试试看新的布局！",
                    styles: "风格",
                    styles_tip: "可在“风格”面板里更换模板！",
                    support_tip: "Contact us if you'd like to roll back.",
                    this_feature: "此项新功能"
                },
                pages: {
                    alert: {
                        feature_limit: "不好意思，你好像正在使用专业版 ({{features}}) 的功能. 请把它移除之后再发布您的网站",
                        unknown_publish_support: "对不起，我们监测到错误，您现在暂时不能发布网站，请联系我们 support@strikingly.com"
                    },
                    blog: {
                        confirm: {
                            delete_blog_post: "Are you absolutely sure you wish to delete this blog post? This action is PERMANENT!"
                        },
                        text: {
                            save_error: "保存时出现了错误，请再试一次。仍然有问题的话，请联系我们客服邮件： support@strikingly.com",
                            saved: "已保存！",
                            saving: "保存中"
                        }
                    },
                    dashboard: {
                        cancel: "取消",
                        clone_msg: "要复制该网站吗？",
                        clone_pub_msg: {
                            pro: "你的网站发布数量已经达到了专业版发布限额。你可以复制更多的网站，但是不能发布带有专业版功能的网站。是否继续？",
                            starter: "你的网站发布数量已经达到了基础版发布限额。你可以复制更多的网站，但是不能发布带有基础版功能的网站。是否继续？"
                        },
                        confirm: "确定",
                        pub_confirm: "确认发布",
                        pub_failed: "糟糕，发布网站失败。请联系客服：support@strikingly.com",
                        pub_msg: "你的网站就会上线！",
                        pub_quota: "你不能发布更多网站了！取消发布一个网站之后，才能继续发布这个网站！",
                        quota_confirm: "我明白",
                        sort: {
                            created: "最近创建",
                            name: "名称",
                            updated: "最近更新"
                        },
                        unpub_confirm: "确认取消发布",
                        unpub_msg: "确认取消发布吗？你的网站会显示“正在创建中”的提示。"
                    },
                    ecommerce: {
                        confirm: {
                            cancel_edit: "网站还未保存，确认退出编辑器？",
                            delete_item: "Are you sure you want to delete this item?",
                            delete_product: "确认删除此产品？",
                            delete_product_with_coupon: "Are you sure you want to delete this product?",
                            disconnect_account: "确定想要解除 {{provider}} 帐户的连接吗？",
                            payment_not_set: "在发布网站之前，请先设置好您的支付方式，为了允许交易。确认发布网站？",
                            payment_not_set_proceed: "You haven't set up your payment gateway for your Simple Store yet! You must set it up in your store settings to enable checkout.\n\nClick OK to proceed.\n",
                            payment_not_set_short: "You haven't set up your payment gateway for your Simple Store yet! You must set it up in your store settings to enable checkout."
                        },
                        coupon: {
                            delete_warning: "确认删除此优惠券？",
                            description: "({{token}} - {{amount}}% 扣除)",
                            detailedDescription: "使用这个优惠代码的买家将可以享受总订单价格 {{amount}}% 的减免（此处“总订单价格”不包含运费）。",
                            expired: "已失效",
                            flat_description: "{{token}} ({{amount}} 扣除)",
                            free_shipping_description: "{{token}}（免费送货）",
                            percentange_description: "{{token}} ({{amount}}% 扣除)"
                        },
                        errors: {
                            can_not_load_products: "网络出现问题，请刷新并重试。",
                            coupon_no_amount: "折扣字段不可留空！",
                            coupon_no_token: "优惠券字段不可留空！",
                            coupon_repeated_token: "已有使用相同代码的优惠券！",
                            coupon_zero_amount: "折扣字段不可为0！",
                            empty_quantity: "数量不能为0或者空。",
                            general_required_error_v1: "{field} 必须填写",
                            general_required_error_v2: "{field} 必须填写",
                            image_limication: "您可以上传最多10张图片。请选择 XXX 图像用来替换",
                            invalid_input: "无效的值。",
                            invalid_quantity: "库存不足。",
                            paypal_not_support_cny: "Paypal目前不支持人民币交易.",
                            seller_not_connect_gateway: "卖家还未连接付款通道，目前无法购买。"
                        },
                        options: {
                            cancelled: "已取消",
                            completed: "已完成",
                            pending: "待定"
                        },
                        providers: {
                            alipay: "支付宝",
                            paypal: "PayPal",
                            stripe_connect: "Stripe"
                        },
                        text: {
                            choose_a_country: "选择一个国家",
                            choose_a_type: "选择一个类型",
                            cta_btn: "立即购买",
                            description: "添加简短而吸引人的产品描述！",
                            edit_btn_add_product: "添加产品",
                            edit_btn_mange_product: "产品管理",
                            price_for_required_error: "价格",
                            product_name: "添加产品名称",
                            product_name_for_required_error: "产品名称",
                            rest_of_world: "世界其它地区",
                            variant_name_for_required_error: "种类",
                            world: "全世界"
                        }
                    },
                    edit: {
                        confirm: {
                            delete_blog_section: "确定要删除此版块吗？\n\n你的博文不会被删除。（只需重新添加博客版块即可重现）",
                            delete_collaborator: "确定删除此协作者吗？他／她将会失去编辑此网站的资格。",
                            delete_library_file: "确定要删除此文件吗？",
                            delete_library_image: "确定要删除此图片吗？",
                            delete_section: "确定要删除此区块吗？此操作不可撤消。",
                            delete_section_v4: "确认是否删除模块？",
                            delete_social_account: "你确定要删除这个账户吗？相关内容将不会显示在这个页面上。",
                            unsaved_changes: "本页面含有未保存的更改。如果离开本页面，这些更改将会丢失。"
                        },
                        domain_emails: {
                            confirm: {
                                delete_entry: "确定要删除此条目吗？"
                            },
                            errors: {
                                limit_reached: "您只能指定 {{limit}} 个接收转发邮件的邮箱地址。"
                            }
                        },
                        errors: {
                            already_have_blog: "网站中已经有了博客版块！",
                            already_have_ecommerce: "网站中已经有了商店版块！",
                            already_have_social_feed: "网站中已经有了社交内容版块！",
                            api_error: "糟糕，网络出现问题，已经通知我们的工程师了！",
                            delete_file_fail: "读取失败。请重试一遍或联系我们获取帮助！",
                            duplicate_collaborator: "你已经邀请过这个人啦！",
                            effects_network_error: "网络出现问题，无法添加特效，请刷新并重试。",
                            email_format_error: "无效邮箱",
                            get_presigned_post_error: "文件上传出现问题，请刷新并重试，或联系客服： support@strikingly.com。",
                            load_files_fail: "读取失败。请重试一遍或联系我们获取帮助！",
                            max_slides_reached: "现在你只能创建 {{max}} 个版块。如果想创建更多，请使用下方的“反馈”按钮告诉我们。谢谢！",
                            multi_file_error: "请一次只拖动一个文件。",
                            network_error: "网络出现问题，请刷新并重试。",
                            save_error: "保存页面时出现问题，请重试。",
                            social_account_connect_error: "读取失败。请重试一遍或联系我们获取帮助！",
                            too_many_invitations: "抱歉，每个网站只能邀请10个人。",
                            upload_fail: "上传失败。请重试一遍或联系我们获取帮助！",
                            upload_network_error: "网络出现问题，无法上传，请刷新并重试。",
                            video_type_error: "网址无效"
                        },
                        html_editor: {
                            ecwid: {
                                enter_store_id: "请输入一个店铺 ID。"
                            },
                            google_maps: {
                                enter_location: "请输入一个地点!",
                                view_larger_map: "查看详细地图"
                            },
                            shared: {
                                errors: null
                            },
                            slides: {
                                errors: {
                                    invalid_url: "URL 无效！请使用有效的 slid.es URL。"
                                }
                            },
                            soundcloud: {
                                errors: {
                                    invalid_url: "URL 无效！请使用有效的 soundcloud.com URL。"
                                }
                            }
                        },
                        notice: {
                            mobile_notice: "欢迎使用 Strikingly 网站编辑器！看样子你在使用手机。你造吗？用 Strikingly 创建的网站在任何设备看起来都很棒，但是我们还是建议你使用电脑来编辑你的网站。",
                            pro_section_notice: "你选择了专业版版块！你可以试用这个版块，但是在升级到专业版之前，这个版块不会显示在已发布的网站上。"
                        },
                        rich_text: {
                            align_center: "居中",
                            align_justify: "两端对齐",
                            align_left: "左对齐",
                            align_right: "右对齐",
                            bold: "粗体",
                            bulleted_list: "页目符号列表",
                            confirm_cancel: "您有未保存的更改。确定关闭窗口？",
                            custom: "自定义",
                            font_family: "字体",
                            font_size: "字号",
                            font_size_large: "大",
                            font_size_larger: "最大",
                            font_size_normal: "普通",
                            font_size_small: "小",
                            font_size_smaller: "最小",
                            italic: "斜体",
                            link: "链接",
                            link_dialog_document: "文档",
                            link_dialog_email: "电子邮箱",
                            link_dialog_email_address: "邮箱地址",
                            link_dialog_email_placeholder: "例如：junchen@example.com",
                            link_dialog_invalid_email: "无效邮箱",
                            link_dialog_open_in_new_tab: "在新标签页中打开",
                            link_dialog_remove_document: "移除文档",
                            link_dialog_remove_email: "移除电子邮箱",
                            link_dialog_remove_link: "移除链接",
                            link_dialog_title: "链接至",
                            link_dialog_upload_file: "上传文件",
                            link_dialog_url: "网址",
                            link_dialog_url_placeholder: "例如：http://abc.com 或者 #2 (版块号码)",
                            link_dialog_web: "网址",
                            numbered_list: "编号列表",
                            save: "保存",
                            underline: "加下划线",
                            use_default: "默认"
                        }
                    },
                    social_feed: {
                        text: {
                            posts: "文章",
                            posts_on_facebook_page: "Posts on Facebook page",
                            posts_on_timeline: "时间线上的文章",
                            tweets: "推文"
                        }
                    }
                },
                payment: {
                    add_ons: {
                        errors: {
                            network_error: "更新失败，请检查网络并重试。",
                            no_active_subscription: "你还没有升级套餐。",
                            not_supported: "你的账号目前还不支持购买 {{add_on_type}}。"
                        },
                        types: {
                            additional_page: "额外网站"
                        }
                    }
                },
                plans: {
                    name: {
                        pro_2y: "专业版（2年）",
                        pro_monthly: "专业版（包月）",
                        pro_yearly: "专业版（包年）",
                        starter_2y: "基础版（2年）",
                        starter_monthly: "基础版（包月）",
                        starter_yearly: "基础版（包年）"
                    }
                },
                select_template: {
                    confirm: {
                        ok: "  OK  "
                    },
                    info: {
                        no_site: "你还没有创建网站呢。选择一个漂亮的模板开始吧！"
                    }
                },
                settings_dialog: {
                    updated: "已更新。"
                },
                student_program: {
                    email_denied: "邮箱验证有误。请检查一下你的邮箱地址，或联系客服。",
                    network_error: "网络出现问题，请刷新并重试。"
                },
                subscriptions: {
                    edit: {
                        confirm: {
                            downgrade: "确定要降级吗？你的账户将会根据已支付金额充入积分。",
                            general: "确定更改计划吗？如果升级，你的账户将会收到相应的账单。",
                            upgrade: "确定要升级吗？你的账户将会收到费用按比例计算的账单。"
                        }
                    },
                    new: {
                        billing: {
                            coupon_applied_free_period_notice: "您不会立即收到账单。最初的 {{free_period_days}} 天是免费的。从 {{billing_start_date}} 开始，您每 {{period}}</strong> 将会收到 <strong class='dark'>${{discounted_price}} 的账单，此后将变为每 {{period}}</strong> 收到 <strong class='dark'>${{price}} 的账单。",
                            coupon_applied_no_free_period_notice: "您首 {{period}}</strong> 将会收到 <strong class='dark'>${{discounted_price}} 的账单，此后将变为每 {{period}}</strong> 收到 <strong class='dark'>${{price}} 的账单。",
                            free_period_notice: "您不会立即收到账单。最初的 {{free_period_days}} 天是免费的。从 {{billing_start_date}} 开始，您每 {{period}}</strong> 将会收到 <strong class='dark'>${{price}} 的账单。",
                            heading: "{{free_period_full_string}} 免费&mdash;保质保量",
                            no_free_period_notice: "您每 {{period}}</strong> 将会收到 <strong class='dark'>${{price}} 的账单。"
                        },
                        coupon: {
                            applied: "已折价 {{percent}}%！",
                            applied_notice: "已使用优惠券！此优惠券仅可用于首个账单周期！",
                            invalid: "优惠券代码无效。",
                            not_applicable: "此套餐不能使用这个优惠券。",
                            wait: "请稍等…"
                        },
                        errors: {
                            card_expiry: "请输入有效的到期日",
                            card_number: "请输入有效的卡号",
                            cvc: "请输入有效的安全码",
                            postal_code: "Postal code can't be empty"
                        },
                        paypal: {
                            free_period_description: "升级至 {{plan}} 套餐，将在 {{billing_start_date}} 开始付款。",
                            no_free_period_description: "升级至 {{plan}} 套餐。"
                        },
                        periods: {
                            "2y": "2年",
                            month: "月",
                            monthly: "月",
                            two_year: "2年",
                            year: "年",
                            yearly: "年"
                        },
                        prices: {
                            pro_2y: "$336/2年",
                            pro_monthly: "$20/月",
                            pro_yearly: "$192/年",
                            starter_2y: "$168/2年",
                            starter_monthly: "$12/月",
                            starter_yearly: "$96/年"
                        },
                        why_billing_info: "我们要求您提供信用卡，目的是当您选择在免费期结束后继续保持账户活跃时，可以避免您的 Strikingly 账户中止。这样做也有利于我们降低欺诈风险。<br/><br/>在整个免费期内，您的信用卡不会被扣除任何费用。如果您在免费期内取消了账户，您的信用卡永远不会被扣除任何费用。<br/><br/>当免费期即将结束时，我们还会提前三天以电子邮件通知您。"
                    }
                },
                traffic_guide: {
                    confirm_go_to_editor: "到编辑器更新设置？"
                }
            }
        },
        "zh-TW": {
            js: {
                api: {
                    analytics: {
                        device: {
                            desktop: "桌面電腦",
                            mobile: "移動設備",
                            others: "其它設備"
                        },
                        geography: {
                            others: "其它地區"
                        },
                        period_title: {
                            past_24_hours: "最近 24 小時",
                            past_3_months: "最近 3 個月",
                            past_month: "最近一個月",
                            past_week: "最近一週",
                            past_year: "最近 1 年"
                        },
                        referrer: {
                            direct_traffic: "直接訪問"
                        },
                        show: {
                            errors: {
                                exception: "載入網頁分析時出現了一些問題。我們的工程部正積極跟進。",
                                record_not_found: "找不到網頁。"
                            }
                        }
                    },
                    blogPosts: {
                        errors: {
                            genericPublish: "發佈時出現了錯誤，請重新再試。還有問題的話，請聯絡我們： support@strikingly.com",
                            genericSave: "存儲時出現了錯誤，請重新再試。還有問題的話，請聯絡我們： support@strikingly.com",
                            invalidLockId: "你同時只能為一個網站打開一個編輯器頁。請關閉其他的編輯器頁，然后刷新。",
                            unauthorized: "糟糕，您已經登出了。請重新登入。"
                        },
                        messages: {
                            confirmPublishUntitledPost: "您還沒輸入標題。確定發佈嗎？"
                        }
                    },
                    domains: {
                        confirm: {
                            delete_dns_record: "確定要刪除該記錄嗎？",
                            renew: "你需要支付$24.95。確定要更新嗎？",
                            renew_for_free: "你的包年套餐已含一個域名，確定要續費嗎？"
                        },
                        errors: {
                            create_dns_record_failed: "DNS 記錄創建失敗，請重試。",
                            create_user_failed: "帳戶創建失敗",
                            delete_dns_record_failed: "DNS 記錄刪除失敗，請重試。",
                            empty_field_warning: "輸入無效",
                            get_dns_record_failed: "DNS 記錄獲取失敗，請重試。",
                            get_registrant_verification_status_failed: "驗證失敗，請重試或聯系我們：support@strikingly.com",
                            get_zone_failed: "糟糕，出現了問題。請重試。",
                            list_dns_records_failed: "DNS 記錄列表失敗，請重試。",
                            provision_failed: "DNS 規則失敗",
                            release_domain_failed: "域名更新失敗，請重試或聯系我們：support@strikingly.com",
                            renew_failed: "域名續費付款失敗，請聯系我們：support@strikingly.com",
                            renew_payment_failed: "域名續費付款失敗，請檢查你的付款信息喔。",
                            send_verification_email_failed: "驗證郵件發送失敗，請重試或聯系我們：support@strikingly.com",
                            setup_dns_failed: "DNS 創建失敗",
                            update_contact_info_failed: "更新失敗，請重試或聯系我們：support@strikingly.com",
                            update_dns_record_failed: "DNS 記錄更新失敗，請重試。",
                            update_nameservers_failed: "更新失敗，請重試或聯系我們：support@strikingly.com"
                        }
                    },
                    ecommerce: {
                        charge_order: {
                            bad_request: "修改訂單時出現了錯誤。如果任然有問題的話，請聯繫客服郵件：support@strikingly.com",
                            internal_error: "修改訂單時出現了錯誤。如果任然有問題的話，請聯繫客服郵件：support@strikingly.com"
                        },
                        complete: {
                            bad_request: "完成訂單時出現了錯誤。"
                        },
                        create_order: {
                            bad_request: "創建訂單時出現了錯誤。",
                            internal_error: "創建訂單時出現了錯誤。"
                        },
                        refund: {
                            bad_request: "退款訂單時出現了錯誤。如果任然有問題的話，請聯繫客服郵件：support@strikingly.com"
                        }
                    },
                    generators: {
                        generate_from_facebook: {
                            errors: {
                                already_have: "你已經有一個網站了，去看看吧。",
                                cant_get_data: "糟糕，獲取信息出現問題。請重試吧。",
                                error: "糟糕，出現了問題。請重試吧。",
                                exception: "網路連線已逾時，請再試一次。我們的工程部正積極跟進有關問題。",
                                invalid: "{{message}}",
                                missing_user: "找不到用戶。",
                                no_facebook: "糟糕，連接出現了問題。請用 Facebook 賬戶重新登入。",
                                oauth_exception: "您的Facebook階段作業已逾時，請再次登入Facebook。"
                            },
                            messages: {
                                failed_to_get_friends: "糟糕，請重試。",
                                failed_to_get_pages: "糟糕，請重試。",
                                getting_friends: "獲取臉書朋友信息",
                                getting_pages: "獲取臉書頁信息",
                                to_simplify: "請重新用臉書登入喔。"
                            }
                        },
                        generate_from_linkedin: {
                            errors: {
                                exception: "網路連線已逾時，請再試一次。我們的工程部正積極跟進有關問題。",
                                invalid: "{{message}}",
                                missing_user: "找不到用戶。",
                                oauth_exception: "您的LinkedIn階段作業已逾時，請再次登入LinkedIn。"
                            }
                        },
                        new_year_resolutions: {
                            errors: {
                                exception: "網路連線已逾時，請再試一次。我們的工程部正積極跟進有關問題。",
                                invalid: "{{message}}",
                                missing_user: "找不到用戶。",
                                oauth_exception: "您的Facebook階段作業已逾時，請再次登入Facebook。"
                            }
                        },
                        share_on_linkedin: {
                            errors: {
                                exception: "發生錯誤，請再試一次。我們的工程部正積極跟進有關問題。"
                            }
                        }
                    },
                    jobs: {
                        custom_domain_setup: {
                            errors: {
                                exception: "網路連線已逾時，請再試一次。我們的工程部正積極跟進有關問題。",
                                invalid: "{{message}}"
                            },
                            success: {
                                connected: "您已成功建立連接，有關設置將於48小時內完成。",
                                disconnected: "您已成功取消連結自訂網域。",
                                domain_is_live: "Your domain is live!",
                                need_configuration: "This domain is NOT connected to your site. Please make sure your domain is configured correctly.",
                                propagation_note: "After configuring your domain, changes are usually visible within 1-2 hours, but can take up to 48 hours to fully propagate."
                            }
                        }
                    },
                    pages: {
                        collaboration: {
                            errors: {
                                access_denied: "無權限進行此操作。請聯繫網站所有者。"
                            }
                        },
                        confirm: {
                            delete_site: "Are you absolutely sure you wish to delete the site titled {{name}}? This action is PERMANENT!"
                        },
                        custom_domain_update: {
                            errors: {
                                exception: "網路連線已逾時，請再試一次。我們的工程部正積極跟進有關問題。",
                                invalid: "{{message}}",
                                missing_params: "發生錯誤，請再試一次。如果問題持續發生，請按「支援」按鈕與我們聯絡。",
                                no_change: "沒有任何變更。"
                            },
                            success: {
                                saved: "已更新。"
                            },
                            warnings: {
                                non_www_root: '請在域名前加上"www."信息。（忽略請重新提交）'
                            }
                        },
                        publish: {
                            success: {
                                published: "已發佈網頁。"
                            }
                        },
                        settings_update: {
                            errors: {
                                invalid: "{{message}}",
                                missing_params: "發生錯誤，請再試一次。如果問題持續發生，請按「支援」按鈕與我們聯絡。",
                                premium_sites_limit_reached: "You reached the limit of published sites using premium features you can use. Please extend your plan."
                            },
                            success: {
                                permalink_changed: "網頁將會在幾秒鐘內刷新。如果沒有，請按<a href='{{edit_page_http_url}}'>此處</a>。",
                                saved: "已存儲！"
                            }
                        },
                        shared: {
                            errors: {
                                access_denied: "您需要權限來執行此操作。",
                                record_not_found: "您的網頁網址似乎已變更。請按一下「好的」以前往主控板，然後選擇您要編輯的網頁。",
                                session_expired: "您的使用期限已過。如欲編輯網頁，請再次登入。"
                            }
                        },
                        update: {
                            errors: {
                                exeption: "儲存內容時出現了一些問題。我們的工程部正積極跟進。",
                                invalid: "{{message}}"
                            },
                            success: {
                                saved: "已存儲網頁。"
                            }
                        }
                    },
                    registrations: {
                        "500": "Error in registration. Our engineers are already looking into it. Please send an email to support@strikingly.com if you've any questions.",
                        create: {
                            errors: {
                                invalid: "{{message}}",
                                missing_params: "必須填寫電郵地址及名字。"
                            },
                            success: {
                                saved: ""
                            }
                        }
                    },
                    shared: {
                        please_wait: "Please wait..."
                    },
                    subscriptions: {
                        check_coupon: {
                            errors: {
                                expired: "優惠券已失效。",
                                invalid_coupon: "優惠券編碼無效。"
                            }
                        },
                        plan: {
                            billed_monthly: "月繳",
                            billed_two_year: "兩年繳",
                            billed_yearly: "年繳"
                        }
                    },
                    videos: {
                        create: {
                            errors: {
                                exception: "載入影片時出現了一些問題。我們的工程部正積極跟進。",
                                invalid: "{{message}}"
                            }
                        }
                    }
                },
                app_store: {
                    descriptions: {
                        baidu_maps: "在百度地圖上顯示您的位置",
                        celery: "接受預定，過後收款。讓你輕松創建眾籌和簡單的電子商務。",
                        disqus: "添加一個討論版來建立您的讀者和評論社區。",
                        ecwid: "使你的網站擁有強大的電子商務功能！輕松完成開店，管理商品及收款。",
                        eventbrite: "用 Eventbrite 創建活動，並直接在你的網站上銷售門票。",
                        facebook_comments: "讓全世界的朋友都在這裡留言吧。",
                        google_calendar: "把 Google 日歷分享給訪客。",
                        google_form: "用一個在線表單來做調查，問答，或收集信息。",
                        google_maps: "在 Google 地圖上顯示您的位置。",
                        html: "您可以內嵌任何第三方的服務，或自己填入代碼。這是給高級用戶的強大工具喔！",
                        instagram: "在相冊裡展示你的 Instagram 照片。",
                        locu: "在網站上展示你 Locu 管理和發布的公司信息。",
                        mailchimp: "用 MailChimp 來創建，發送和跟蹤電子簡報。直接在網站上收集用戶的電子郵箱地址。",
                        medium: "嵌入 Medium 部落格賬號。",
                        paypal: "添加 PayPal 支付按鈕來收取付款。",
                        photobucket: "在網站上放入 PhotoBucket 的幻燈片展示。",
                        pinterest: "展示您的 Pinterest 賬號信息及內容。",
                        scribd: "嵌入 Scribd 文件或電子書。",
                        slides: "Slides 讓你創建和分享在線的PPT展示報告。",
                        slideshare: "嵌入一個幻燈片展示。",
                        soundcloud: "嵌入來自 SoundCloud 的音樂，專輯或者藝人信息。",
                        type_form: "在網站上創建專業美觀的在線問卷或表單，免費開始吧！如果需要搞基功能，請購買套餐。",
                        wufoo: "創建表單來獲取數據和信息，反饋和款項。開始免費使用，可付費擴容。"
                    },
                    errors: {
                        create_app_config: "網路出現問題，請刷新。",
                        init_app_config: "網路出現問題，請刷新。",
                        load_app_config: "網路出現問題，請刷新。",
                        save_app_config: "網路出現問題，請刷新。",
                        scribe_url_incorrect: "輸入有誤！請按這個格式輸入： 'http://www.scribd.com/doc/220861572/Aurora-Cidr03'.",
                        url_not_fount: "網址有誤，請確認並重新輸入。"
                    },
                    names: {
                        baidu_maps: "百度地圖",
                        celery: "Celery",
                        disqus: "Disqus",
                        ecwid: "Ecwid",
                        eventbrite: "Eventbrite",
                        facebook_comments: "臉書評論",
                        google_calendar: "Google 日曆",
                        google_form: "Google 表單",
                        google_maps: "Google 地圖",
                        html: "HTML",
                        instagram: "Websta",
                        locu: "Locu",
                        mailchimp: "MailChimp",
                        medium: "Medium",
                        paypal: "PayPal",
                        photobucket: "PhotoBucket",
                        pinterest: "Pinterest",
                        scribd: "Scribd",
                        slides: "Slides",
                        slideshare: "SlideShare",
                        soundcloud: "SoundCloud",
                        type_form: "Typeform",
                        wufoo: "Wufoo"
                    },
                    tooltips: {
                        help_tooltip: "閱讀此應用程式的詳細教程。",
                        pro_app_tooltip: "想要使用這個應用程式，你需要先升級到專業版套餐。",
                        upgrade_link_tooltip: "現在就升級到專業版套餐，使用強大的應用程式。"
                    }
                },
                confirm: {
                    disconnect_facebook: "您確認要解除 Facebook 帳戶的連接嗎？",
                    disconnect_linkedin: "您確認要解除 LinkedIn 帳戶的連接嗎？"
                },
                email_settings: {
                    saved: "已儲存！"
                },
                form_responses: {
                    confirm: {
                        delete_blog_subscription: "Are you sure you wish to delete these subscription entries? Removing a blog subscription entry will delete the subscription",
                        delete_form_response: "Are you sure you wish to delete these entries?"
                    },
                    labels: {
                        contact: "聯絡表單",
                        signup: "註冊表單"
                    }
                },
                html_editor: {
                    script_error: "您輸入的HTML含有網頁編輯器無法顯示的程式碼。<br/><br/>請預覽您的網頁以檢視內容。"
                },
                invitations: {
                    create: {
                        errors: {
                            missing: "{{message}}"
                        }
                    },
                    new: {
                        claim_confirm: "是的，解鎖吧！",
                        claim_msg: "確認解鎖這個獎勵嗎？",
                        confirm: "OK",
                        email_hint: "請在這裡輸入電子郵件收件者清單！",
                        invitation_sent: "邀請已發送。記得提醒您的朋友喔！",
                        network_error: "網路出現問題，請刷新並重試。"
                    }
                },
                jquery: {
                    errors: {
                        required: "必需填寫"
                    }
                },
                migration: {
                    add_new_section: "Add New Section",
                    add_new_section_tip: "Add new functionalities to your site!",
                    click_to_complete: "Click to complete your update and publish your changes!",
                    error: "Oops, something went wrong. Refresh the page and try again; if the error keeps happening please contact support!",
                    layout: "Layout",
                    layout_tip: "Try out new layouts!",
                    styles: "Styles",
                    styles_tip: "Swap templates in the Style menu!",
                    support_tip: "Contact us if you'd like to roll back.",
                    this_feature: "this feature"
                },
                pages: {
                    alert: {
                        feature_limit: "Uh oh! It looks like you're using some Pro features ({{features}}). Please remove them to publish this site!",
                        unknown_publish_support: "Uh oh! Your site can't be published right now. Please contact support@strikingly.com for help!"
                    },
                    blog: {
                        confirm: {
                            delete_blog_post: "Are you absolutely sure you wish to delete this blog post? This action is PERMANENT!"
                        },
                        text: {
                            save_error: "存儲時出現了問題，請再次試試。任然有問題的話，請聯繫客服郵件：support@strikingly.com",
                            saved: "已存儲！",
                            saving: "存儲中…"
                        }
                    },
                    dashboard: {
                        cancel: "終止",
                        clone_msg: "要複製這個网站吗？",
                        clone_pub_msg: {
                            pro: "你的網站發布數量已經達到了專業版發布上限。你可以復制更多的網站，但是不能發布帶有專業版功能的網站。繼續嗎？",
                            starter: "你的網站發布數量已經達到了基本版發布上限。你可以復制更多的網站，但是不能發布帶有基本版功能的網站。繼續嗎？"
                        },
                        confirm: "確認",
                        pub_confirm: "確認發布",
                        pub_failed: "糟糕，發布網站失敗。請聯系我們：support@strikingly.com",
                        pub_msg: "您的網站將會上線喔！",
                        pub_quota: "你不能發佈更多網站了。取消發布一個網站，才能繼續發布網站喔！",
                        quota_confirm: "我了解",
                        sort: {
                            created: "最近創建",
                            name: "名稱",
                            updated: "最近更新"
                        },
                        unpub_confirm: "確認取消發布",
                        unpub_msg: "確認取消發布嗎？你的網站會顯示“正在創建中”的提示。"
                    },
                    ecommerce: {
                        confirm: {
                            cancel_edit: "網站還未保存，確認退出編輯器？",
                            delete_item: "Are you sure you want to delete this item?",
                            delete_product: "確認是否刪除此產品？",
                            delete_product_with_coupon: "Are you sure you want to delete this product?",
                            disconnect_account: "您確認要解除 {{provider}} 帳戶的連接嗎？",
                            payment_not_set: "在發布網站之前，請先設置好您的支付方式，為了允許交易。確認發布網站？",
                            payment_not_set_proceed: "You haven't set up your payment gateway for your Simple Store yet! You must set it up in your store settings to enable checkout.\n\nClick OK to proceed.\n",
                            payment_not_set_short: "You haven't set up your payment gateway for your Simple Store yet! You must set it up in your store settings to enable checkout."
                        },
                        coupon: {
                            delete_warning: "確定刪除此優惠券編碼？",
                            description: "({{token}} - {{amount}}% 扣除)",
                            detailedDescription: "此優惠券將會從訂單總額扣除 {{amount}}%（不含運費）。",
                            expired: "已失效",
                            flat_description: "{{token}} ({{amount}} 扣除)",
                            free_shipping_description: "{{token}}（免費送貨）",
                            percentange_description: "{{token}} ({{amount}}% 扣除)"
                        },
                        errors: {
                            can_not_load_products: "網絡出現問​​題，請刷新並重試。",
                            coupon_no_amount: "折扣字段不可留空！",
                            coupon_no_token: "優惠券字段不可留空！",
                            coupon_repeated_token: "已有使用相同編碼的優惠券！",
                            coupon_zero_amount: "折扣字段不可為0！",
                            empty_quantity: "數量不能為0或者空。",
                            general_required_error_v1: "{field} 必需填寫",
                            general_required_error_v2: "{field} 必需填寫",
                            image_limication: "您可以上傳最多10張圖像。請選擇 XXX 圖像用來替換",
                            invalid_input: "無效的值。",
                            invalid_quantity: "缺貨",
                            paypal_not_support_cny: "Paypal目前不支持人民幣交易.",
                            seller_not_connect_gateway: "賣家還未連接付款通道，目前無法購買。"
                        },
                        options: {
                            cancelled: "已取消",
                            completed: "已完成",
                            pending: "待定"
                        },
                        providers: {
                            alipay: "Alipay",
                            paypal: "Paypal",
                            stripe_connect: "Stripe"
                        },
                        text: {
                            choose_a_country: "選擇國家",
                            choose_a_type: "選擇一個樣式",
                            cta_btn: "立即購買",
                            description: "添加簡短而吸引人的產品描述！",
                            edit_btn_add_product: "添加產品",
                            edit_btn_mange_product: "管理產品",
                            price_for_required_error: "價格",
                            product_name: "添加產品名稱",
                            product_name_for_required_error: "產品名稱",
                            rest_of_world: "世界其他地區",
                            variant_name_for_required_error: "種類",
                            world: "全世界"
                        }
                    },
                    edit: {
                        confirm: {
                            delete_blog_section: "確定要刪除此網格嗎？\n\n你的部落格文章不會被刪除。（只需重新添加部落格版塊即可重現）",
                            delete_collaborator: "確定要刪除此撰寫人嗎？他將不能編輯網站。",
                            delete_library_file: "確定要刪除此文件嗎？",
                            delete_library_image: "確定要刪除此圖片嗎？",
                            delete_section: "您確定要刪除此區塊嗎？此動作將無法還原。",
                            delete_section_v4: "確定要刪除此網格嗎？",
                            delete_social_account: "你確定要刪除這個賬戶嗎？相關內容將不會顯示在這個網頁上。",
                            unsaved_changes: "您的網頁尚有未存儲的變更。如果您現在離開這一頁，那些變更將會遺失。"
                        },
                        domain_emails: {
                            confirm: {
                                delete_entry: "您確定要刪除此條目嗎？"
                            },
                            errors: {
                                limit_reached: "您最多只能建立{{limit}}個電郵帳戶。"
                            }
                        },
                        errors: {
                            already_have_blog: "網站中已經有了部落格網格！",
                            already_have_ecommerce: "網站中已經有了商店網格！",
                            already_have_social_feed: "網站中已經有了社交訂閱網格！",
                            api_error: "糟糕，網路出現問題，已經通知工程師了！",
                            delete_file_fail: "讀取失敗。請重試一遍或聯系我們獲取幫助！",
                            duplicate_collaborator: "您已經邀請過這個人了喔",
                            effects_network_error: "噢！網路連線發生問題以致無法加入特效，請刷新頁面後再重試。",
                            email_format_error: "無效信箱",
                            get_presigned_post_error: "文件上傳出現問題，請重試或聯系我們： support@strikingly.com",
                            load_files_fail: "讀取失敗。請重試或聯系我們獲取幫助！",
                            max_slides_reached: "您現在最多只能建立{{max}}個版塊。如需要建立更多投影片，請點擊下面的「意見回饋」按鈕告訴我們，謝謝！",
                            multi_file_error: "請一次只拖動一個文件。",
                            network_error: "噢！網路連線發生問題，請刷新頁面後再重試。",
                            save_error: "存儲網頁時發生錯誤，請再試一次。",
                            social_account_connect_error: "讀取失敗。請重試或聯系我們獲取幫助！",
                            too_many_invitations: "抱歉，每個網站只能邀請10個人。",
                            upload_fail: "上傳失敗。請重試或聯系我們獲取幫助！",
                            upload_network_error: "噢！網路連線發生問題以致無法進行上載，請刷新頁面後再重試。",
                            video_type_error: "網址無效"
                        },
                        html_editor: {
                            ecwid: {
                                enter_store_id: "請輸入商店ID。"
                            },
                            google_maps: {
                                enter_location: "請輸入地點!",
                                view_larger_map: "使用較大的地圖"
                            },
                            shared: {
                                errors: null
                            },
                            slides: {
                                errors: {
                                    invalid_url: "網址無效！請使用正確的slid.es網址。"
                                }
                            },
                            soundcloud: {
                                errors: {
                                    invalid_url: "網址無效！請使用正確的soundcloud.com網址。"
                                }
                            }
                        },
                        notice: {
                            mobile_notice: "歡迎使用 Strikingly 網站編輯器！看樣子你在用手機噢。你知道嗎？用 Strikingly 創建的網站在任何設備看起來都很棒，但是我們還是建議你在電腦上編輯網站。",
                            pro_section_notice: "你選擇了專業版網格！你可以試用這個網格，但是在升級到專業版之前，這個網格不會顯示在已發布的網站上。"
                        },
                        rich_text: {
                            align_center: "居中",
                            align_justify: "兩端對齊",
                            align_left: "左對齊",
                            align_right: "右對齊",
                            bold: "粗體",
                            bulleted_list: "頁目符號列表",
                            confirm_cancel: "您有未保存的更改。確定關閉窗口？",
                            custom: "自定義",
                            font_family: "字體",
                            font_size: "字號",
                            font_size_large: "大",
                            font_size_larger: "最大",
                            font_size_normal: "普通",
                            font_size_small: "小",
                            font_size_smaller: "最小",
                            italic: "斜體",
                            link: "鏈接",
                            link_dialog_document: "Document",
                            link_dialog_email: "電子信箱",
                            link_dialog_email_address: "電子信箱地址",
                            link_dialog_email_placeholder: "例如：john@example.com",
                            link_dialog_invalid_email: "無效信箱",
                            link_dialog_open_in_new_tab: "在新分頁開啟",
                            link_dialog_remove_document: "移除文件",
                            link_dialog_remove_email: "移除信箱",
                            link_dialog_remove_link: "移除鏈接",
                            link_dialog_title: "鏈接至",
                            link_dialog_upload_file: "上傳文件",
                            link_dialog_url: "URL",
                            link_dialog_url_placeholder: "例如：http://abc.com 或者 #2 (版塊號碼)",
                            link_dialog_web: "網址",
                            numbered_list: "編號列表",
                            save: "存儲",
                            underline: "加下劃線",
                            use_default: "默認"
                        }
                    },
                    social_feed: {
                        text: {
                            posts: "Posts",
                            posts_on_facebook_page: "Posts on Facebook page",
                            posts_on_timeline: "Posts on timeline",
                            tweets: "Tweets"
                        }
                    }
                },
                payment: {
                    add_ons: {
                        errors: {
                            network_error: "網路出現問題，請重新再試。",
                            no_active_subscription: "你還沒有升級方案。",
                            not_supported: "你的帳戶目前還不支持購買 {{add_on_type}}。"
                        },
                        types: {
                            additional_page: "額外網站"
                        }
                    }
                },
                plans: {
                    name: {
                        pro_2y: "專業版（2年）",
                        pro_monthly: "專業版（月繳）",
                        pro_yearly: "專業版（年繳）",
                        starter_2y: "基本版（2年）",
                        starter_monthly: "基本版（月繳）",
                        starter_yearly: "基本版（年繳）"
                    }
                },
                select_template: {
                    confirm: {
                        ok: "  OK  "
                    },
                    info: {
                        no_site: "您還沒有創建網站呢。選擇一個漂亮的模板開始吧！"
                    }
                },
                settings_dialog: {
                    updated: "已更新。"
                },
                student_program: {
                    email_denied: "信箱驗證有誤。請檢查一下你的信箱地址，或聯系我們。",
                    network_error: "網路出現問題，請刷新並重試。"
                },
                subscriptions: {
                    edit: {
                        confirm: {
                            downgrade: "您真的確定要進行降級嗎？您已繳付的費用將會變成餘額存於您的帳戶中。",
                            general: "您真的確定要改變您的方案嗎？如果您正在進行升級，您的帳戶將會作出相應付款。",
                            upgrade: "您真的確定要進行升級嗎？您的帳戶將會以專業版繳費模式進行付款。"
                        }
                    },
                    new: {
                        billing: {
                            coupon_applied_free_period_notice: "您不會立即收到賬單。最初的 {{free_period_days}} 天是免費的。從 {{billing_start_date}} 開始，您每 {{period}}</strong> 將會收到 <strong class='dark'>${{discounted_price}} 的賬單，此後將變為每 {{period}}</strong> 收到 <strong class='dark'>${{price}} 的賬單。",
                            coupon_applied_no_free_period_notice: "之後，您將會繳付<strong class='dark'>${{discounted_price}}一{{period}}</strong>及<strong class='dark'>${{price}}一{{period}}</strong>。",
                            free_period_notice: "您不會立即收到賬單。最初的 {{free_period_days}} 天是免費的。從 {{billing_start_date}} 開始，您每 {{period}}</strong> 將會收到 <strong class='dark'>${{price}} 的賬單。",
                            heading: "{{free_period_full_string}}保證費用全免",
                            no_free_period_notice: "您將會繳付<strong class='dark'>${{price}}一{{period}}</strong>。"
                        },
                        coupon: {
                            applied: "帳單已計入{{percent}}%折扣優惠！",
                            applied_notice: "已將優惠券用於帳單！優惠券只適用於首個繳費期。",
                            invalid: "優惠券編碼無效。",
                            not_applicable: "此套餐不能使用這個優惠券。",
                            wait: "請稍等……"
                        },
                        errors: {
                            card_expiry: "請輸入正確的到期日。",
                            card_number: "請輸入正確的信用卡號碼。",
                            cvc: "請輸入正確的保安編碼。",
                            postal_code: "Postal code can't be empty"
                        },
                        paypal: {
                            free_period_description: "升級至 {{plan}} 套餐，將在 {{billing_start_date}} 開始付款。",
                            no_free_period_description: "升級至 {{plan}} 套餐。"
                        },
                        periods: {
                            "2y": "2 years",
                            month: "月",
                            monthly: "month",
                            two_year: "2年",
                            year: "年",
                            yearly: "year"
                        },
                        prices: {
                            pro_2y: "$336/2年",
                            pro_monthly: "$20/月",
                            pro_yearly: "$192/年",
                            starter_2y: "$168/2年",
                            starter_monthly: "$12/月",
                            starter_yearly: "$96/年"
                        },
                        why_billing_info: "我們索取您的信用卡資料是為了防止您的Strikingly帳戶受到干擾，尤其如果您希望帳戶在免費試用期結束後仍然生效。另一方面，此舉亦有助我們減少詐騙問題。<br/><br/>在免費試用期間，您的信用卡是不會進行任何付款的。如果您在試用期間提出終止要求，那麼您在任何時候也不會進行任何付款。<br/><br/>在試用期結束前三天，我們更會發電郵給您，提醒您試用期即將到期。"
                    }
                },
                traffic_guide: {
                    confirm_go_to_editor: "到編輯器更新設置？"
                }
            }
        }
    };
});

var $S = window.$S || parent.$S;
