<template>
<div>



<b-button type="button" variant="success">Nova</b-button>

    <b-table striped hover :items="pessoas">
 <template v-slot:cell()="data">
        <i>{{ data.value }}</i>
      </template>
    </b-table>



<b-form>
 <b-form-row>
        <b-form-group label="Nome" class="col-md-6">
          <b-form-input id="input-2" v-model="pessoa.nome" required />
        </b-form-group>
        <b-form-group label="Pessoa" class="col-md-3">
          <b-form-select id="tipo" v-model="pessoa.tipo" :options="tipos" required />
        </b-form-group>
 </b-form-row>
</b-form>   





</div>    
</template>
<script>
export default {
    data(){
        return{
          especialidades:[{"nome":"xxxx","area":"aaaaa"}],
          especialidade:{}
        }
    }
}
</script>
<style scoped>

</style>