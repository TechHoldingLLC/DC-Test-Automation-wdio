import { $ } from "@wdio/globals";

export const selectors = {
  get submitButton() {
    return $(
      'input[type="submit"], input[value="Submit"], input[name*="submit" i]'
    );
  },

  get emailInput() {
    return $('input[id*="email" i], input[name*="email" i]');
  },
};
