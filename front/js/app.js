import pokemon from "./apis/pokemon.js";
import viaCep from "./apis/viaCep.js";

const app = Vue.createApp({ 
    components: {
        pokemon,
        viaCep
    },
    template: `
        <div>
            <pokemon/>
            <viaCep/>
        </div>
    `,

    });

app.mount("#app"); 
                        