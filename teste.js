const axios = require('axios');

axios.get('viacep.com.br/ws/32070400/json/')
  .then((response) => {
    if (response.data.erro) {
      return '';
    }
    console.log(response.data);
    return response.data;
  });
