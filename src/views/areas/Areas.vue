<template>
  <div>
    <b-button type="button" variant="success" @click="novo()">Nova</b-button>

    <b-table striped hover :items="areas" :fields="colunas">
      <template v-slot:cell(acoes)="data">
        <b-button variant="primary" @click="exibir(data)">
          <b-icon-box-arrow-in-right />
        </b-button>
        <b-button variant="danger" @click="remover(data.item.areaId)">
          <b-icon-x-circle-fill />
        </b-button>
      </template>
    </b-table>

    <b-modal id="modal" ref="modal" title="Área" hide-footer @hidden="resetModal">
      <b-form @submit.stop.prevent="salvar">
        <b-form-row>
          <b-form-group label="Nome" class="col-md-12" label-for="nome">
            <b-form-input
              id="nome"
              name="nome"
              v-model="area.nome"
              :state="submitted && $v.area.nome.$error ? false : null"
            />
            <div v-if="submitted && $v.area.nome.$error" style="color:red">Campo Nome é Obrigatório</div>
          </b-form-group>
        </b-form-row>
        <b-button class="mt-3" variant="primary" type="submit">Salvar</b-button>
      </b-form>
    </b-modal>
  </div>
</template>
<script>
import { required } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      areas: [],
      colunas: [
        { key: "areaId", label: "Cód" },
        { key: "nome", label: "Área" },
        { key: "acoes", label: "Ações" }
      ],
      area: {},
      submitted: false
    };
  },
  validations: {
    area: {
      nome: { required }
    }
  },
  created() {
    this.carregarListaAreas();
  },
  methods: {
    novo() {
      this.$bvModal.show("modal");
    },
    exibir(data) {
      console.log(data.item);
      this.area = data.item;
      this.$bvModal.show("modal");
    },
    resetModal() {
      this.area = {};
      this.submitted = false;
    },
    carregarListaAreas() {
      this.$http.get("/areas").then(response => {
        this.areas = response.data;
      });
    },
    fecharModal() {
      this.$bvModal.hide("modal");
    },
    remover(areaId) {
      this.$http.delete(`/areas/${areaId}`).then(() => {
        this.carregarListaAreas();
      });
    },
    salvar() {
      this.submitted = true;

      // stop here if form is invalid
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }

      this.$http
        .post("/areas", this.area)
        .then(() => {
          this.carregarListaAreas();
          this.fecharModal();
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>
<style scoped>
</style>