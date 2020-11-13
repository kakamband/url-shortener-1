const app = new Vue({
  el: "#app",
  data: {
    url: "",
    error: "",

    created: null,
  },
  methods: {
    async createUrl() {
      console.log(this.url);
      const response = await fetch("/url", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          url: this.url,
        }),
      });
      if (response.ok) {
        const result = await response.json();
        this.created = `https://cdg.sh/${result.slug}`;
      } else if (response.status === 429) {
        this.error =
          "You are sending too many requests. Try again in 30 seconds.";
      } else {
        const result = await response.json();
        this.error = result.message;
      }
    },
  },
});
