/* eslint-disable import/no-anonymous-default-export */
export default {
  formatAmount: (value, withoutCommaSeparator = false) => {
    const a = value.toString();
    let b = a.split(".")[0];

    b = b === "" ? "0" : b.replace(/[,.]/g, "").toString();
    if (!withoutCommaSeparator) {
      b = b.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
    }
    return `${b}`;
  },
};
