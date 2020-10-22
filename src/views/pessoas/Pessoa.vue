<template>
  <div>
    <b-form>
      <b-form-row>
        <b-form-group label="Nome" class="col-md-6">
          <b-form-input id="input-2" v-model="pessoa.nome" required />
        </b-form-group>
        <b-form-group label="Tipo" class="col-md-3">
          <b-form-select id="tipo" v-model="pessoa.tipo" :options="tipos" required />
        </b-form-group>
        <b-form-group label="Cpf/Cnpj" class="col-md-3">
          <b-form-input id="cpf_cnpj" v-model="pessoa.cpfCnpj" required />
        </b-form-group>
        <b-form-group label="Registro Cívil/Profissioal" class="col-md-3">
          <b-form-input id="documento" v-model="pessoa.documento" required />
        </b-form-group>
        <b-form-group label="Orgão Expeditor" class="col-md-2">
          <b-form-input id="orgao" v-model="pessoa.orgao" required />
        </b-form-group>
        <b-form-group label="Data Emissão" class="col-md-2">
          <b-form-input id="dataEmissao" v-model="pessoa.dataemissao" required />
        </b-form-group>
        <b-form-group label="Data Nascimento" class="col-md-2">
          <b-form-input id="dataNascimento" v-model="pessoa.dataNascimento" required />
        </b-form-group>
        <b-form-group label="Estado Civil" class="col-md-2">
          <b-form-input id="estadoCivil" v-model="pessoa.estadoCivil" required />
        </b-form-group>
      </b-form-row>

      <b-form-row>
        <b-form-group label="Cep" class="col-md-2">
          <b-form-input id="cep" v-model="cep" required />
        </b-form-group>
        <b-form-group label="Logradouro" class="col-md-6">
          <b-form-input id="logradouro" v-model="pessoa.logradouro" />
        </b-form-group>
        <b-form-group label="Número" class="col-md-1">
          <b-form-input id="numero" v-model="pessoa.numeroLogradouro" required />
        </b-form-group>
        <b-form-group label="Bairro" class="col-md-3">
          <b-form-input id="bairro" v-model="pessoa.bairro" />
        </b-form-group>
        <b-form-group label="Complemento" class="col-md-4">
          <b-form-input id="complemento" v-model="pessoa.complemento" />
        </b-form-group>
        <b-form-group label="Uf" class="col-md-4">
          <b-form-input id="uf" v-model="pessoa.uf" />
        </b-form-group>
        <b-form-group label="Cidade" class="col-md-4">
          <b-form-input id="cidade" v-model="pessoa.cidade" />
        </b-form-group>
      </b-form-row>
      <b-form-row>
        <b-form-group label="Email" class="col-md-6">
          <b-form-input id="email" v-model="pessoa.email" required />
        </b-form-group>
        <b-form-group label="Telefone 1" class="col-md-3">
          <b-form-input id="telefone" v-model="pessoa.telefone" required />
        </b-form-group>
        <b-form-group label="Telefone 2" class="col-md-3">
          <b-form-input id="telefone_2" v-model="pessoa.telefone2" required />
        </b-form-group>
      </b-form-row>
      <b-button type="submit" variant="primary">Salvar</b-button>
      <b-button type="reset" variant="danger">Cancelar</b-button>
    </b-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      pessoa: {},
      tipos: [
        { cod: 1, nome: "fisica" },
        { cod: 2, nome: "juridica" }
      ]
    };
  },
  methods: {
    salvar() {},
    cancelar() {}
  }
};
</script>
<style scoped>
</style>