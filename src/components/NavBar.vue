<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <router-link class="navbar-brand" to="/">
        <img
          src="/assets/img/logo-hd.png"
          width="24"
          height="24"
          class="d-inline-block"
          alt="Carnelian icon"
        />
        Carnelian
      </router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="/">About</router-link>
          </li>

          <li
            class="nav-item"
            data-toggle="tooltip"
            data-placement="bottom"
            title="Available soon !"
          >
            <a class="nav-link disabled" href="#">Download</a>
          </li>

          <li
            class="nav-item"
            data-toggle="tooltip"
            data-placement="bottom"
            title="Available soon !"
          >
            <a class="nav-link disabled" href="#">Try the editor</a>
          </li>

          <li
            class="nav-item"
            data-toggle="tooltip"
            data-placement="bottom"
            title="Available soon !"
          >
            <a class="nav-link disabled" href="#">Docs</a>
          </li>
        </ul>
        <ul class="navbar-nav" v-if="!user">
          <router-link to="/signup">
            <li class="nav-item">
              <a class="nav-link" href="/signup">Sign up</a>
            </li>
          </router-link>
          <router-link to="/login">
            <li class="nav-item">
              <a class="nav-link" href="/login">Login</a>
            </li>
          </router-link>
        </ul>
        <!-- logged in -->
        <ul class="navbar-nav" v-if="user">
          <li class="nav-item">
            <div class="dropdown">
              <a
                href="#"
                class="d-flex align-items-center btn-sm btn dropdown-toggle"
                role="button"
                id="userOptions"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <span class="nav-link">{{user.username}}</span>
                <img
                  class="img-fluid rounded-circle"
                  :src="getAvatarUrl()"
                  style="height:32px;"
                  alt="avatar"
                />
              </a>

              <div class="dropdown-menu dropdown-menu-right" aria-labelledby="userOptions">
                <router-link to="/account" class="dropdown-item">
                  <span>My account</span>
                </router-link>
                <a class="dropdown-item text-danger" href="#" @click="disconnect()">Disconnect</a>
              </div>
            </div>
          </li>
        </ul>
        <!--  / logged in -->
      </div>
    </nav>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import * as $ from "jquery";
import Component from "vue-class-component";
import "highlight.js/styles/darcula.css";
import * as hljs from "highlight.js";
import LoginForm from "./LoginForm.vue";
import SignupForm from "./SignupForm.vue";
import Axios from "axios";
import { getGravatarUrl, disconnect } from "../Helpers";
import IUser from "../interfaces/User.interface";
declare const window: any;

@Component({
  components: {
    loginForm: LoginForm,
    signupForm: SignupForm
  },
  props: {},
  data: () => {
    return {
      user: Object
    };
  }
})
export default class NavBar extends Vue {
  user: IUser;
  apiUrl = window.config.API_URL;

  mounted() {
    this.user = null;
    $(function() {
      $('[data-toggle="tooltip"]').tooltip();
    });

    this.getUserInfos();
  }

  getUserInfos() {
    if (localStorage.getItem("cnl_user")) {
      if (localStorage.getItem("cnl_token")) {
        Axios.get(window.config.API_URL + "/profile", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("cnl_token")
          }
        })
          .then(response => {
            this.user = response.data;
          })
          .catch(() => {
            this.disconnect();
          });
      }
    }
  }

  getAvatarUrl(): string {
    return getGravatarUrl(this.user);
  }

  disconnect() {
    this.user = null;
    disconnect();
  }
}
</script>