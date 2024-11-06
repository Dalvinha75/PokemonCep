export default {
    template: `
    <div class="pokemon-container">
        <h2>Pokémons</h2>
        <div v-if="pokemon" class="pokemon-card">
            <img :src="pokemon.sprites.front_default" alt="image" class="pokemon-image"/>
            <h3 class="pokemon-name">{{ pokemon.name }}</h3>
            <p><strong>Altura:</strong> {{ pokemon.height }}</p>
            <p><strong>Peso:</strong> {{ pokemon.weight }}</p>
        </div>
        <div class="button-container">
            <button @click="anterior" :disabled="pokemonId === 1" class="navigation-button">Anterior</button>
            <button @click="proximo" class="navigation-button">Próximo</button>
            <button v-if="pokemon" @click="enviarParaBackend" class="submit-button">Enviar para o Backend</button>
        </div>

       <div v-if="respostaBackend" class="resposta-backend">
            <h4>Resposta do Backend:</h4>
            <p class="mensagem"><strong>Mensagem:</strong> {{ respostaBackend.mensagem }}</p>
            <p class="detalhes"><strong>Nome:</strong> {{ respostaBackend.pokemon.name }}</p>
            <p class="detalhes"><strong>Peso:</strong> {{ respostaBackend.pokemon.weight }}</p>
            <p class="detalhes"><strong>Altura:</strong> {{ respostaBackend.pokemon.height }}</p>
            <p class="detalhes"><strong>Classificação:</strong> {{ respostaBackend.pokemon.classificacao }}</p>
            <p class="detalhes"><strong>IMC:</strong> {{ respostaBackend.pokemon.imc }}</p>
        </div>

    </div>
    `,
    data() {
        return {
            pokemon: null,
            pokemonId: 1,
            respostaBackend: null,
            loading: false,
            error: null
        };
    },
    methods: {
        
        async buscarPokemon() {
            try {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${this.pokemonId}`);
                this.pokemon = await response.json();
            } catch (error) {
                console.log("Erro ao buscar Pokémon: ", error);
            }
        },

       
        async enviarParaBackend() {
            this.loading = true;
            this.error = null;
        
            
            if (!this.pokemon) {
                console.log("Nenhum Pokémon carregado.");
                return;
            }
        
            try {
                const response = await fetch('http://localhost:8080/pokemon.php', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        name: this.pokemon.name,  
                        weight: this.pokemon.weight,  
                        height: this.pokemon.height 
                    })
                });
        
                if (!response.ok) {
                    throw new Error("Erro ao enviar para o backend");
                }
        
                const responseData = await response.json();
                console.log('Resposta do Backend:', responseData); 
        
                this.respostaBackend = responseData;
            } catch (error) {
                this.error = error.message;
                console.log("Erro ao enviar para o backend: ", error);
            } finally {
                this.loading = false;
            }
        },
        
        proximo() {
            this.pokemonId++;
            this.buscarPokemon();
        },

        anterior() {
            if (this.pokemonId > 1) {
                this.pokemonId--;
                this.buscarPokemon();
            }
        },
    },
    mounted() {
        this.buscarPokemon();
    },
};
