import axios from 'axios'

export default class VagalumeAPI {
  get apiKey() { return '816cb2693b51b9f3dbd1e1fbbb8f5d5e' }

  buildURL(endpoint) {
    return `https://api.vagalume.com.br/${endpoint}`
  }

  getArtMus(parameters){
    let CancelToken = axios.CancelToken
    let source = CancelToken.source()

    return axios.get(this.buildURL('search.artmus?'), {
      params: {
        q: parameters.q,
        limit: parameters.limit
      },
      timeout: 1500,
      cancelToken: source.token
    }).then(res => {
      return res.data.response.docs
    })
  }

  getMusicById(id) {
    let CancelToken = axios.CancelToken
    let source = CancelToken.source()

    return axios.get(this.buildURL('search.php?'), {
      params: {
        apikey: this.apiKey,
        musid: id
      },
      timeout: 1500,
      cancelToken: source.token
    }).then(res => {
      return res.data.mus[0]
    })
  }
}
