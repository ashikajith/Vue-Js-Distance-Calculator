import Vue from 'vue'
import App from '../App'
import UserList from '../components/UserList'

describe('Userlist.spec.js', () => {
  let cmp, vm, toLatitude, toLongitude, distance
  beforeEach(()=>{
    toLatitude = 52.3191841;
    toLongitude = -8.5072391;
    distance = 189;
    cmp = Vue.extend(UserList)
    vm = new cmp({
      data:{
        userData: [
          {"latitude": "53.807778", "user_id": 28, "name": "Charlie Halligan", "longitude": "-7.714444"},
          {"latitude": "52.3191841", "user_id": 3, "name": "Jack Enright", "longitude": "-8.5072391"},
          {"latitude": "51.8856167", "user_id": 2, "name": "Ian McArdle", "longitude": "-10.4240951"}
        ]
      }
    }).$mount()
  })

  it ('should list users', () => {
    expect(vm.userData.length).toEqual(3);
  });

  describe('calculateDistance function', () => {
    it ('should return the distance between two co-ordinates', () => {
      expect(vm.calculateDistance(toLatitude, toLongitude)).toEqual(189.0);
    });

    it ('should return the distance in string format', () => {
      var distance = vm.calculateDistance(toLatitude, toLongitude);
      expect(typeof(distance)).toEqual("number");
    });
  });

  describe('lessThanHundred function', () => {
    it (' should return a boolean value', () => {
      var bool = vm.lessThanHundred(toLatitude, toLongitude);
      expect(typeof(bool)).toEqual('boolean');
    });

    it ('should return false if the distance between co-ordinates is more than 100', () => {
      var bool = vm.lessThanHundred(toLatitude, toLongitude);
      expect(bool).toEqual(false);
    });

    it ('should return false if the distance between co-ordinates is more than 100', () => {
      toLatitude = 53.2451022;
      toLongitude = -6.238335;
      var bool = vm.lessThanHundred(toLatitude, toLongitude);
      expect(bool).toEqual(true);
    });
  });

  describe('sortedItems() computed method', () => {
    it ('should returns userData object', () => {
      expect(typeof(vm.sortedItems)).toEqual('object');
    });

    it ('should returns total array elements', () => {
      expect(vm.sortedItems.length).toEqual(3);
    });
  });

  describe('filteredItems() computed method', () => {
    it ('should returns userData object', () => {
      expect(typeof(vm.filteredItems)).toEqual('object');
    });
  });
});
