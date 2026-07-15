import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
  api: {
    projectId: "k6f4d1iq",
    dataset: "production",
  },
  // El panel quedará publicado en https://dgk.sanity.studio (o el nombre que elijas al desplegar).
  studioHost: "dgk",
});
