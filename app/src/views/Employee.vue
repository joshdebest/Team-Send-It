<template>
  <div>
    <EmployeeNav />
    <div class="employee-section">
        <h1>Welcome to the Admin/Employee Page!</h1>
    </div>
  </div>
</template>


<script>
import EmployeeNav from './EmployeeNav';

export default {
    name: 'App',
    components: {
      EmployeeNav
    }
}
</script>


<style lang="scss">
    .employee-section {
        height: 500px;
    }
    .employee-section h1{
        text-align: center;
        color: black;
        line-height: 500px;
        font-family: 'Open Sans', sans-serif;
    }
</style>
