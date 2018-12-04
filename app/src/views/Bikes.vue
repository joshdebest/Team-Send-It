<template>
<div>
  <Navigation/>
  <div id="bikes" class="bike-container my-5">
    <div class="row mb-3">
      <div class="col-md-9">
    <h1>Bikes</h1>
      </div>
      <div class="col-md-3">
        <ShoppingCart />
      </div>
    </div>

    <div class="filter-section">
        <table class="filter-table">
          <thead>
              <th>Filters</th>
          </thead>
          <tbody>
          <tr class="filters" v-for="category in categories" :key="category.id">
            <td><button class="filter" v-on:click="applyFilter(category.id)">{{ category.Name }}</button></td>
          </tr>
          </tbody>
        </table>
    </div>

    <div class="row">
      <Item
              v-for="item in forSale"
              :key="item.id"
              :id="item.id"
              :Name="item.Name"
              :ImageLink="item.ImageLink"
              :Price="item.Price"
              :Description="item.Description" />
    </div>

  </div>
</div>
</template>

<script>
    import Navigation from './Navigation';
    import Item from './Item.vue';
    import ShoppingCart from './ShoppingCart.vue';
    import GetBikesService from '@/services/GetBikesService';
    import GetCategoriesService from '@/services/GetCategoriesService';
    import GetFiltersService from '@/services/GetFiltersService';
    import GetFilterService from '@/services/GetFilterService';

    export default {
        name: 'bikes',
        data() {
            return {
                categories: [{id: 1, Name: "Mountain"}, {id: 2, Name: "Racing"}]
            };
        },
        created: async function(){
            const products = await GetBikesService.GetBikes().then(response => {
                console.log(response.data);
                return response.data;
            });

            this.categories = [];
            for (var i = 0; i < products.length; i++) {
                const cats = await GetFiltersService.GetFilters(products[i].id).then(response => {
                    return response.data;
                });

                console.log(cats);

                // add all categories that have products to filter list
                for (var j = 0; j < cats.length; j++) {
                    const exists = false;
                    for (var k = 0; k < this.categories.length; k++) {
                        if (cats[j].id === this.categories[k].id) {
                            exists = true;
                            break;
                        }
                    }

                    // add categories to filter list if there not already there
                    if (exists === false && cats[j].Name != "Bikes") {
                        const category = {
                            id: cats[j].id,
                            Name: cats[j].Name
                        }
                        this.categories.push(category);
                    }
                }
            }

            this.$store.dispatch('addToForSale', products);
            localStorage.setItem('bikes', JSON.stringify(products));
            const cart = JSON.parse(localStorage.getItem("cart")) || [];
            this.$store.dispatch('setCart', cart);
        },
        methods: {
            async applyFilter(id) {
                const filterProds = await GetFilterService.GetFilter(id).then((response) => {
                    console.log(response.data);
                    return response.data;
                })

                const prods = JSON.parse(localStorage.getItem('bikes'));

                console.log(prods);

                // see which of Bikes also have other filter
                const products = Array();
                for (var i = 0; i < prods.length; i++) {
                    for (var j = 0; j < filterProds.length; j++) {
                        if (prods[i].id === filterProds[j].id) {
                            products.push(filterProds[j]);
                            break;
                        }
                    }
                }

                this.$store.dispatch('addToForSale', products);
            },
        },
        computed: {
            forSale() { return this.$store.getters.forSale; }
        },
        components: {
            Item,
            ShoppingCart,
            Navigation
        },
    }
</script>

<style lang="scss">
  .card-body{
    color: black;
  }
  .row {
    padding-left: 30px;
    padding-right: 30px;
  }
  .filter-section {
    width: 170px;
    float: left;
  }
  .filter-table {
      margin-left: 20px;
  }
  .filter {
      color: black;
      background-color: rgba(0, 0, 0, 0.0);
      padding: 0px 00px;
      margin: 0px 0;
      border: none;
      cursor: pointer;
      width: 20%;
      opacity: 0.9;
  }

  .filter:focus {
      outline: none;
  }

  .filter:hover {
      color: #4286f4;
  }
</style>
