<template>
  <div>
    <b-button type="button" variant="success" @click="novo()">Nova</b-button>

    <b-table striped hover :items="especialidades" :fields="colunas">
      <template v-slot:cell(acoes)="data">
        <b-button variant="primary" @click="exibir(data)">
          <b-icon-box-arrow-in-right />
        </b-button>
        <b-button variant="danger" @click="remover(data.item.especialidadeId)">
          <b-icon-x-circle-fill />
        </b-button>
      </template>
    </b-table>

    <b-modal id="modal" ref="modal" title="Especialidade" hide-footer @hidden="resetModal">
      <b-form @submit.stop.prevent="salvar">
        <b-form-row>
          <b-form-group label="Nome" class="col-md-12" label-for="nome">
            <b-form-input
              id="nome"
              name="nome"
              v-model="especialidade.nome"
              :state="submitted && $v.especialidade.nome.$error ? false : null"
            />
            <div
              v-if="submitted && $v.especialidade.nome.$error"
              style="color:red"
            >Campo Nome é Obrigatório</div>
          </b-form-group>
        </b-form-row>
        <b-form-row>
          <b-form-group label="Área" class="col-md-12">
            <b-form-select
              @change="areaChanged"
              id="area"
              name="area"
              v-model="area.areaId"
              :options="itemsArea"
              :state="submitted && $v.area.areaId.$error ? false : null"
            />
            <div v-if="submitted && $v.area.areaId.$error" style="color:red">Selecione a Área</div>
          </b-form-group>
        </b-form-row>
        <b-form-row>
          <b-form-group label="Ramo" class="col-md-12">
            <b-form-select
              id="ramo"
              name="ramo"
              v-model="especialidade.ramo.ramoId"
              :options="itemsRamo"
              :state="submitted && $v.especialidade.ramo.ramoId.$error ? false : null"
            />
            <div
              v-if="submitted && $v.especialidade.ramo.ramoId.$error"
              style="color:red"
            >Selecione a Área</div>
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
      especialidades: [],
      especialidade: {},
      ramos: [],
      area: {},
      areas: [],
      colunas: [
        { key: "especialidadeId", label: "Cód" },
        { key: "nome", label: "Nome" },
        { key: "ramo.nome", label: "Ramo" },
        { key: "ramo.area.nome", label: "Área" },
        { key: "acoes", label: "Ações" }
      ],
      submitted: false
    };
  },
  validations: {
    area: {
      areaId: {
        required
      }
    },
    especialidade: {
      nome: { required },
      ramo: {
        ramoId: {
          required
        }
      }
    }
  },
  created() {
    this.criarNovaEspecialidade();
    this.criarNovaArea();
    this.carregarListaEspecialidades();
    this.carregarListaAreas();
  },
  computed: {
    itemsArea() {
      return this.areas.map(a => ({ text: a.nome, value: a.areaId }));
    },
    itemsRamo() {
      return this.ramos.map(r => ({ text: r.nome, value: r.ramoId }));
    }
  },
  methods: {
    novo() {
      this.$bvModal.show("modal");
    },
    exibir(data) {
      this.especialidade = data.item;
      this.area = this.especialidade.ramo.area;
      this.carregarListaRamos(this.area.areaId);
      this.$bvModal.show("modal");
    },
    resetModal() {
      this.criarNovaEspecialidade();
      this.criarNovaArea();
      this.submitted = false;
    },
    carregarListaAreas() {
      this.$http.get("/areas").then(response => {
        this.areas = response.data;
      });
    },
    areaChanged() {
      this.carregarListaRamos(this.area.areaId);
    },
    carregarListaEspecialidades() {
      this.$http.get("/especialidades").then(response => {
        this.especialidades = response.data;
      });
    },
    criarNovaEspecialidade() {
      this.especialidade = {
        especialidadeId: null,
        nome: "",
        ramo: {
          ramoId: null,
          nome: ""
        }
      };
    },
    criarNovaArea() {
      this.area = {
        areaId: null,
        nome: ""
      };
    },
    carregarListaRamos(areaId) {
      this.$http.get(`/ramos/area/${areaId}`).then(response => {
        this.ramos = response.data;
      });
    },
    fecharModal() {
      this.$bvModal.hide("modal");
    },
    remover(especialidadeId) {

      console.log(especialidadeId);
      this.$http.delete(`/especialidades/${especialidadeId}`).then(() => {
        this.carregarListaEspecialidades();
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
        .post("/especialidades", this.especialidade)
        .then(() => {
          this.carregarListaEspecialidades();
          this.criarNovaEspecialidade();
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