const vueFb = {};
vueFb.install = function install (Vue, options) {
  (function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0] // eslint-disable-line
    if (d.getElementById(id)) {
      return;
    }
    js = d.createElement(s);
    js.id = id;
    js.src =
      "//connect.facebook.net/" + "en_US" + "/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);

    console.log("setting fb sdk language", js.src);// eslint-disable-line
  })(document, "script", "facebook-jssdk");

  window.fbAsyncInit = function onSDKInit () {
    FB.init(options) // eslint-disable-line
    FB.AppEvents.logPageView() // eslint-disable-line
    Vue.FB = FB // eslint-disable-line
    console.log("fb-sdk-ready");// eslint-disable-line
    /*     bus.$emit("fb-sdk-ready", {
          isConnected: true,
          FB: window.FB
        }); */
  };
  Vue.FB = undefined;
};

import Vue from "vue";
// import store from "@/store/";
// import { bus } from "@/main";

Vue.use(vueFb, {
  appId: "496194297535679",
  autoLogAppEvents: true,
  xfbml: true,
  version: "v2.8"
  // version: "v3.2"
});

export default {
  data: function () {
    return {
      isFBReady: false
    };
  },
  mounted: function () {
    this.isFBReady = Vue.FB !== undefined;
    window.addEventListener("fb-sdk-ready", this.onFBReady);
  },
  beforeDestroy: function () {
    window.removeEventListener("fb-sdk-ready", this.onFBReady);
  },
  methods: {
    onFBReady: function () {
      this.FB.api(
        "/me",
        "GET",
        { fields: "id,first_name, last_name,email,picture" },
        userInformation => {
          console.log("fbSdk api", userInformation);// eslint-disable-line
        }
      );
      console.log("fb sdk ready now 1", this.isFBReady);// eslint-disable-line
      this.isFBReady = true;
      console.log("fb sdk ready now 2", this.isFBReady);// eslint-disable-line
      return this.isFBReady;
    }
  }
};
