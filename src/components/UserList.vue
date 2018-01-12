<template>
  <div class="container">
    <div class="row buttonPadder">
        <div class="col-md-12">
          <button @click.prevent = 'filteredData = !filteredData' class='btn btn-primary'>Users Less 100 KM</button>
          <button @click.prevent = 'filteredData = !filteredData' class='btn btn-primary'>All Data</button>
          <span class="square "></span>
          <span>Users close to 100 km radius from Dublin </span>
        </div>
      </div>
      <table class="table userList bordered tablePadder">
        <thead>
          <th>Sl No</th>
          <th>User Id</th>
          <th>Name</th>
          <th>Distance From Dublin (KM)</th>
        </thead>
        <tbody v-for="(user, index) in getItemList">
          <template>
            <tr v-bind:class="{nearDistance: lessThanHundred(user.latitude, user.longitude)}">
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
        filteredData: false,
        fromLatitude: 53.339428, // Dublin Latitude
        fromLongitude: -6.257664 // Dublin Longitude
      }
    },
    methods:{
      calculateDistance(tolat2, tolon2){
        const earthRadius = 12742;
        const mathPi = 0.017453292519943295; // (Math.PI / 180) for converting to radians
        const cos = Math.cos; // Cos function
        const distanceFactor = 0.5 - cos((tolat2 - this.fromLatitude) * mathPi)/2 +
                cos(this.fromLatitude * mathPi) * cos(tolat2 * mathPi) *
                (1 - cos((tolon2 - this.fromLongitude) * mathPi))/2;
        return parseFloat(Number(earthRadius * Math.asin(Math.sqrt(distanceFactor))).toFixed(1));
      },
      lessThanHundred(latitude, longitude){
        var distance = this.calculateDistance(latitude, longitude)
        if (distance < 100){
          return true;
        }
        else {
          return false;
        }
      }
    },
    computed:{
      sortedItems(){
        return this.userData.sort((a, b) => { return a.user_id - b.user_id;});
      },
      filteredItems(){
        return this.sortedItems.filter(event => {
          return this.lessThanHundred(event.latitude, event.longitude);
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

  table.userList{
    flex:1;
  }
  span.square {
    border: solid 5px #f0f0ff;
    width: 2px;
    height: 2px;
    margin: 5px;
  }
  .buttonPadder, .tablePadder {
    margin-top: 20px;
  }
  .nearDistance {
    background: #f0f0ff;
  }
</style>
