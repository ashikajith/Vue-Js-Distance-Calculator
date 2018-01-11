<template>
  <div class="container">
    <div class="row padder">
        <div class="col-md-12">
          <button @click.prevent = 'filteredData = !filteredData' class='btn btn-primary'>Users Less 100 KM</button>
          <button @click.prevent = 'filteredData = !filteredData' class='btn btn-primary'>All Data</button>
          <span class="square "></span>
          <span>Users close to 100 km radius from Dublin </span>
        </div>
      </div>
      <table class="table bordered padder">
        <thead>
          <th>Sl No</th>
          <th>User Id</th>
          <th>Name</th>
          <th>Distance From Dublin (KM)</th>
        </thead>
        <tbody v-for="(user, index) in getItemList">
          <template>
            <tr v-bind:class="{lessThanHundred: greaterThanHundred(user.latitude, user.longitude)}">
              <td> {{index + 1}} </td>
              <td> {{user.user_id}} </td>
              <td> {{user.name}} </td>
              <td> {{calculateDistance(user.latitude, user.longitude)}} Km</td>
            </tr>
          </template>
        </tbody>
      </table>
  </div>
</template>

<script>
  import data from './json/gistfile.json'
  export default {
    data () {
      return{
        userData: data,
        filteredData: false
      }
    },
    methods:{
      calculateDistance(lat2, lon2){
        var earthRadius = 12742;
        var dublinLatitude = 53.339428;
        var dublinLongitude = -6.257664;
        var mathPi = 0.017453292519943295; // (Math.PI / 180) for converting to radians
        var cos = Math.cos; // Cos function
        var distanceFactor = 0.5 - cos((lat2 - dublinLatitude) * mathPi)/2 +
                cos(dublinLatitude * mathPi) * cos(lat2 * mathPi) *
                (1 - cos((lon2 - dublinLongitude) * mathPi))/2;
        return Number(earthRadius * Math.asin(Math.sqrt(distanceFactor))).toFixed(1);
      },
      greaterThanHundred(latitude, longitude){
        var distance = this.calculateDistance(latitude, longitude)
        if (distance < 100){
          return true;
        }
      },
    },
    computed:{
      sortedItems(){
        return this.userData.sort((a, b) => { return a.user_id - b.user_id;});
      },
      filteredItems(){
        return this.sortedItems.filter(event => {
          return this.greaterThanHundred(event.latitude, event.longitude);
        });
      },
      getItemList(){
        if (this.filteredData) {
          return this.filteredItems
        }
        else {
          return this.sortedItems
        }
      }
    }
  }
</script>

<style scoped >
  span.square {
    border: solid 5px #f0f0ff;
    width: 2px;
    height: 2px;
    margin: 5px;
  }
  .padder{
    margin-top: 10px;
  }
  .lessThanHundred{
    background: #f0f0ff;
  }
</style>
