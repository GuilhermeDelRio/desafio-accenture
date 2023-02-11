import cepAPI from "../Apis/ceplaAPI"

class Validacao {

  static formCheck(data) {
    const campos = Object.keys(data)
    let errObj = []

    campos.forEach((val) => {
      if((data[val] === '' || data[val] === 0)) {
        errObj.push(val)
      }
    })

    return errObj
  }

  static async getCEP(cep) {

    const config = {
      headers: {
        "Accept": "application/json"
      }
    }

    return cepAPI.get(cep, config)
      .catch(err => console.log(err))
  }
}

export default Validacao