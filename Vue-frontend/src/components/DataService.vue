<script>
import Axios from 'axios';

export default {
  methods: {
    mounted() {
    Axios
      .get("http://localhost:8000/api/user", {
        headers: {
          Authorization: "Bearer ${token}",
          token: localStorage.getItem("access_token")
        }
      })
      .then(res => {
        console.log(res);
      });
    },
    fetchDataClothes() {
      return Axios.get('http://localhost:8000/api/clothing');
    },
    addDataClothes(data) {
      return Axios.post('http://localhost:8000/api/clothing', data);
    },
    updateDataClothes(id, data) {
      return Axios.put(`http://localhost:8000/api/clothing/${id}`, data);
    },
    deleteDataClothes(id) {
      return Axios.delete(`http://localhost:8000/api/clothing/${id}`);
    },
    fetchDataAccess() {
      return Axios.get('http://localhost:8000/api/accessories');
    },
    addDataAccess(data) {
      return Axios.post('http://localhost:8000/api/accessories', data);
    },
    updateDataAccess(id, data) {
      return Axios.put(`http://localhost:8000/api/accessories/${id}`, data);
    },
    deleteDataAccess(id) {
      return Axios.delete(`http://localhost:8000/api/accessories/${id}`);
    },
    loginUser(email, password) {
      return Axios.post('http://localhost:8000/api/login', email, password);

    }
  },
};
</script>
