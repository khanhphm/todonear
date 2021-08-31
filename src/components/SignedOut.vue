<template>
  <v-app>
    <v-container align="center" class="px-5 py-4">
      <v-card>
        <v-card-title class="d-flex justify-center">
          <h2 >Welcome to NEAR!</h2>
        </v-card-title>
        <v-card-text align="center" class="py-5">
          
          <p>
            To make use of the NEAR blockchain, you need to sign in. The button
            below will sign you in using NEAR Wallet.
          </p>
          <p>
            By default, when your app runs in "development" mode, it connects to
            a test network ("testnet") wallet. This works just like the main
            network ("mainnet") wallet, but the NEAR Tokens on testnet aren't
            convertible to other currencies - they're just for testing!
          </p>
          <p>Go ahead and click the button below to try it out:</p>
          <p style="text-align:center; margin-top:2.5em">
            <v-btn v-on:click="login">Sign in</v-btn>
          </p>
        </v-card-text>
      </v-card>
    </v-container>
  </v-app>
</template>

<script>
import { login } from "../utils";

export default {
  name: "SignedOut",

  methods: {
    login() {
      console.log("calling utils.login");
      login();
    },
  },
};
</script>
