<template>
  <div>
    <b-button type="button" variant="success" @click="novo()">Nova</b-button>

    <b-table striped hover :items="ramos" :fields="colunas">
      <template v-slot:cell(acoes)="data">
        <b-button variant="primary" @click="exibir(data)">
          <b-icon-box-arrow-in-right />
        </b-button>
        <b-button variant="danger" @click="remover(data.item.ramoId)">
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
              v-model="ramo.nome"
              :state="submitted && $v.ramo.nome.$error ? false : null"
            />
            <div v-if="submitted && $v.ramo.nome.$error" style="color:red">Campo Nome é Obrigatório</div>
          </b-form-group>
        </b-form-row>
        <b-form-row>
          <b-form-group label="Área" class="col-md-12">
            <b-form-select id="area" name="area" v-model="ramo.area.areaId" :options="itemsArea" :state="submitted && $v.ramo.area.areaId.$error ? false : null" />
                       <div v-if="submitted && $v.ramo.area.areaId.$error" style="color:red">Selecione a Área</div>

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
      ramos: [],
      areas: [],
      colunas: [
        { key: "ramoId", label: "Cód" },
        { key: "nome", label: "Nome" },
        { key: "area.nome", label: "Área" },
        { key: "acoes", label: "Ações" }
      ],
      ramo: {area:{areaId:null,nome:''}},
      submitted: false
    };
  },
  validations: {
    ramo: {
      nome: { required },
      area: {
        areaId: {
          required
        }
      }
    }
  },
  created() {
    this.carregarListaAreas();
    this.carregarListaRamos();
  },
  computed: {
    itemsArea() {
      return this.areas.map(a => ({ text: a.nome, value: a.areaId }));
    }
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
      this.ramo = {};
      this.submitted = false;
    },
    carregarListaAreas() {
      this.$http.get("/areas").then(response => {
        this.areas = response.data;
      });
    },

    carregarListaRamos() {
      this.$http.get("/ramos").then(response => {
        this.ramos = response.data;
      });
    },
    fecharModal() {
      this.$bvModal.hide("modal");
    },
    remover(ramoId) {
      this.$http.delete(`/ramos/${ramoId}`).then(() => {
        this.carregarListaRamos();
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
        .post("/ramos", this.ramo)
        .then(() => {
          this.carregarListaRamos();
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