import { shallow } from 'vue-test-utils'
import Vue from 'vue'
import App from '../App'
import UserList from '../components/UserList'

describe('Userlist.spec.js', () => {
  let cmp, toLatitude, toLongitude, distance
  beforeEach(()=>{
    toLatitude = 52.3191841;
    toLongitude = -8.5072391;
    distance = 189;
    cmp = shallow(UserList, {
    })
  })

  it ('should list users', () => {
    expect(cmp.vm.userData.length).toEqual(32);
  });

  describe('calculateDistance function', () => {
    it ('should return the distance between two co-ordinates', () => {
      expect(cmp.vm.calculateDistance(toLatitude, toLongitude)).toEqual(189.0);
    });

    it ('should return the distance in string format', () => {
      var distance = cmp.vm.calculateDistance(toLatitude, toLongitude);
      expect(typeof(distance)).toEqual("number");
    });
  });

  describe('lessThanHundred function', () => {
    it (' should return a boolean value', () => {
      var bool = cmp.vm.lessThanHundred(toLatitude, toLongitude);
      expect(typeof(bool)).toEqual('boolean');
    });

    it ('should return false if the distance between co-ordinates is more than 100', () => {
      var bool = cmp.vm.lessThanHundred(toLatitude, toLongitude);
      expect(bool).toEqual(false);
    });

    it ('should return false if the distance between co-ordinates is more than 100', () => {
      toLatitude = 53.2451022;
      toLongitude = -6.238335;
      var bool = cmp.vm.lessThanHundred(toLatitude, toLongitude);
      expect(bool).toEqual(true);
    });
  });

  describe('sortedItems ', () => {
    it ('should return userData object', () => {
      expect(typeof(cmp.vm.sortedItems)).toEqual('object');
    });

    it ('should return total array elements', () => {
      expect(cmp.vm.sortedItems.length).toEqual(32);
    });

    it ('should return object in the order of user_id', () => {
      expect(cmp.vm.sortedItems[0].user_id).toEqual(1);
    });
  });

  describe('filteredItems ', () => {
    it ('should return userData object', () => {
      expect(typeof(cmp.vm.filteredItems)).toEqual('object');
    });

    it ('should return userData which are at a distance less than 100 km', () => {
      expect((cmp.vm.filteredItems.length)).toEqual(16);
    });
  });

  describe('getItemList ', () => {
    it ('should call sortedItems if filteredData is false', () => {
      let spy = jest.spyOn(cmp.vm, "sortedItems");
      // expect(spy).toBeCalled();
      expect(cmp.vm.filteredData).toEqual(false)
    });
  });
});
