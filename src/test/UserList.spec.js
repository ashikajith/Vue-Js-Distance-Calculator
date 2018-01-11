import Vue from 'vue'
import UserList from 'src/components/UserList'

describe('Userlist.vue', () => {
  it ('should list users', () => {
    const container = document.createElement('div');
    const UserListComponent = Vue.extend(UserList);
    const vm = new PreviewComponent({
      propsData: {
        userData: [
          {"latitude": "52.3191841", "user_id": 3, "name": "Jack Enright", "longitude": "-8.5072391"},
          {"latitude": "53.807778", "user_id": 28, "name": "Charlie Halligan", "longitude": "-7.714444"}
        ]
      }
    });
    vm.$mount(container);
    expect(v.userData.length).to.equal(2);
  });

})
