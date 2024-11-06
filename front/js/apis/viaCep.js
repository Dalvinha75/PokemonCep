export default {
    template: `
    <div class="viacep-container">
        <h2>ViaCEP</h2>
        <input type="text" v-model="cep" placeholder="Digite o CEP" @change="pesquisaCep" class="cep-input" />

        <div v-if="viaCep" class="viaCep-info">
            <p><strong>CEP:</strong> {{ viaCep.cep }}</p>
            <p><strong>Logradouro:</strong> {{ viaCep.logradouro }}</p>
            <p><strong>Bairro:</strong> {{ viaCep.bairro }}</p>
        </div>

        <button v-if="viaCep" @click="enviarParaBackend" class="submit-button">Enviar para o Backend</button>

        <div v-if="respostaBackend" class="resposta-backend">
            <h4>Resposta do Backend:</h4>
            <p>{{ respostaBackend }}</p>
        </div>
    </div>
    `,
    data() {
        return {
            cep: '',
            viaCep: null,
            respostaBackend: null
        };
    },
    methods: {
        async pesquisaCep() {
            try {
                const response = await fetch(`https://viacep.com.br/ws/${this.cep}/json/`);
                this.viaCep = await response.json();
            } catch (error) {
                console.log("Erro ao pesquisar o CEP: ", error);
            }
        },
        async enviarParaBackend() {
            try {
                const response = await fetch('http://localhost:8080/cep.php', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(this.viaCep) 
                });
                this.respostaBackend = await response.json();
            } catch (error) {
                console.log("Erro ao enviar para o backend: ", error);
            }
        }
        
        
    }
};
