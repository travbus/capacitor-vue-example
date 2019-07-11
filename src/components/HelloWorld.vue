<template>
  <div class="hello">
    <button v-on:click="getDeviceInfo()">Get Device Data</button>
    <p>{{ info }}</p>
    <h1>{{ msg }}</h1>
    <button v-on:click="getPosition()">Get Position</button>
    <button v-on:click="shareThis()">Share</button>
    <button v-on:click="localNote()">Local Note</button>
    <button v-on:click="createContact()">Create contact</button>
    <button v-on:click="sendSms()">Sms</button>
    <button v-on:click="getCurrentState()">FB state</button>
    <button @click="signIn()">FB Sign In</button>
    <h1>Fb state {{ fbState }}</h1>
    <h1>Coords {{ coords }}</h1>
    <h1>Network {{ networkStatus }}</h1>
    <p>
      For a guide and recipes on how to configure / customize this project,
      <br />check out the
      <a
        href="https://cli.vuejs.org"
        target="_blank"
        rel="noopener"
      >vue-cli documentation</a>.
    </p>
    <h3>Installed CLI Plugins</h3>
    <ul>
      <li>
        <a
          href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel"
          target="_blank"
          rel="noopener"
        >babel</a>
      </li>
      <li>
        <a
          href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint"
          target="_blank"
          rel="noopener"
        >eslint</a>
      </li>
    </ul>
    <h3>Essential Links</h3>
    <ul>
      <li>
        <a href="https://vuejs.org" target="_blank" rel="noopener">Core Docs</a>
      </li>
      <li>
        <a href="https://forum.vuejs.org" target="_blank" rel="noopener">Forum</a>
      </li>
      <li>
        <a href="https://chat.vuejs.org" target="_blank" rel="noopener">Community Chat</a>
      </li>
      <li>
        <a href="https://twitter.com/vuejs" target="_blank" rel="noopener">Twitter</a>
      </li>
      <li>
        <a href="https://news.vuejs.org" target="_blank" rel="noopener">News</a>
      </li>
    </ul>
    <h3>Ecosystem</h3>
    <ul>
      <li>
        <a href="https://router.vuejs.org" target="_blank" rel="noopener">vue-router</a>
      </li>
      <li>
        <a href="https://vuex.vuejs.org" target="_blank" rel="noopener">vuex</a>
      </li>
      <li>
        <a
          href="https://github.com/vuejs/vue-devtools#vue-devtools"
          target="_blank"
          rel="noopener"
        >vue-devtools</a>
      </li>
      <li>
        <a href="https://vue-loader.vuejs.org" target="_blank" rel="noopener">vue-loader</a>
      </li>
      <li>
        <a href="https://github.com/vuejs/awesome-vue" target="_blank" rel="noopener">awesome-vue</a>
      </li>
    </ul>
  </div>
</template>

<script>
import { registerWebPlugin } from "@capacitor/core";
import { FacebookLogin } from "@rdlabo/capacitor-facebook-login";
// import { SmsManager } from "@byteowls/capacitor-sms";
import { Plugins } from "@capacitor/core";
import fkSdk from "@/plugins/fbSdk"; // eslint-disable-line

// import sms from "cordova-sms-plugin";
import {
  Contacts,
  /*   Contact, */
  ContactField,
  ContactName
} from "@ionic-native/contacts/ngx";
const { Network } = Plugins;
const { Device } = Plugins;
const { Geolocation } = Plugins;
const { SplashScreen } = Plugins;
const { Share } = Plugins;
const { LocalNotifications } = Plugins;
//
export default {
  data() {
    return {
      info: null,
      coords: null,
      position: null,
      networkStatus: null,
      fbState: null
    };
  },
  name: "HelloWorld",
  props: {
    msg: String
  },
  created() {
    // register cap plugins
    registerWebPlugin(SmsManager);
    registerWebPlugin(FacebookLogin);
    // monitor network status
    // eslint-disable-next-line
    let handler = Network.addListener("networkStatusChange", status => {
      // eslint-disable-next-line
      console.log("Network status changed", status);
    });

    // Get the current network status
    this.getNetworkStatus();
    //
    SplashScreen.show({
      showDuration: 2000,
      autoHide: true
    });
    //
  },
  methods: {
    //
    //
    //
    async getCurrentState() {
      const result = await Plugins.FacebookLogin.getCurrentAccessToken();
      // eslint-disable-next-line
      console.log("Fb state ", result);
      this.fbState = result;
      try {
        return result && result.accessToken;
      } catch (e) {
        return false;
      }
    },
    async signIn() {
      const FACEBOOK_PERMISSIONS = [
        "email",
        "user_birthday",
        "user_photos",
        "user_gender"
      ];

      const result = await Plugins.FacebookLogin.login({
        permissions: FACEBOOK_PERMISSIONS
      });
      // eslint-disable-next-line
      console.log("Fb sign in ", result);
      /*   if (result && result.accessToken) {
      } */
    },
    //
    //
    //
    localNote() {
      LocalNotifications.schedule({
        notifications: [
          {
            title: "Title",
            body: "Body",
            id: 1,
            schedule: { at: new Date(Date.now() + 1000 * 5) },
            sound: null,
            attachments: null,
            actionTypeId: "",
            extra: null
          }
        ]
      });
    },
    createContact() {
      // eslint-disable-next-line
      //var myContact = contacts.create({ displayName: "Test User" });

      let contact = Contacts.create();

      contact.name = new ContactName(null, "Smith", "John");
      contact.phoneNumbers = [new ContactField("mobile", "6471234567")];
      contact.save().then();
    },
    sendSms() {
      /*       Plugins.SmsManager.send({
        numbers: [7809096746],
        text: "test test"
      })
        .then(() => {
          // SMS app was opened
        })
        .catch(error => {
          // see error codes below
          if (error.message !== "SEND_CANCELLED") {
            // show toast with error message
            // eslint-disable-next-line
            console.log(error.message);
          }
        }); */
      //CONFIGURATION
      /*     var options = {
        replaceLineBreaks: false, // true to replace \n by a new line, false by default
        android: {
          intent: "INTENT" // send SMS with the native android SMS messaging
          //intent: '' // send SMS without opening any other app
        }
      };

      var success = function() {
        alert("Message sent successfully");
      };
      var error = function(e) {
        alert("Message Failed:" + e);
      };
      sms.send("17809096746", "txt message from doog", options, success, error); */
    },
    async shareThis() {
      let shareRet = await Share.share({
        title: "See cool stuff",
        text: "Really awesome thing you need to see right meow",
        url: "http://ionicframework.com/",
        dialogTitle: "Share with buddies"
      });
      // eslint-disable-next-line
      console.log("shareRet", shareRet);
    },
    //
    //
    // network
    async getNetworkStatus() {
      this.networkStatus = await Network.getStatus();
    },
    //
    //
    // geo
    async getPosition() {
      this.coords = await Geolocation.getCurrentPosition();
      // eslint-disable-next-line
      console.log("coords", this.coords);
    },
    watchPosition() {
      Geolocation.watchPosition({}, (position, err) => {
        this.position = position;
        this.positionErr = err;
      });
    },
    //
    //
    // device
    async getDeviceInfo() {
      this.info = await Device.getInfo();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
