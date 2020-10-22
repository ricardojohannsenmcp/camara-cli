<template>
    <div>

      <template>
  <div>


 <b-button type="button" variant="success">Nova</b-button>

    <b-table striped hover :items="pessoas">

 <template v-slot:cell()="data">
        <i>{{ data.value }}</i>
      </template>

    </b-table>
  </div>
</template>
    </div>
</template>
<script>
export default {
    data(){
        return{
        pessoas:[{"nome":"xxxx","tipo":"física","cpf":"93743098407","telefone":"333333","email":"ricardo.johannsen@gmail.com"}]
        }
    }
}
</script>
<style scoped>

</style>