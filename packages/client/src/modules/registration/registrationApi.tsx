import baseApiConfigConnection from '../../constants/baseApiConfigConnection'

export type SignUpFormValues = {
  login: string
  email: string
  first_name: string
  second_name: string
  phone: string | number
  password: string
  repeated_password: string
}
//TODO перенести в RegistrationApi и в Controller, когда Ильфат смержит ПР
export async function registration(valuesForm: SignUpFormValues) {
  try {
    const response = await fetch(`${baseApiConfigConnection.url}/auth/signup`, {
      method: 'POST',
      headers: baseApiConfigConnection.headers,
      body: JSON.stringify(valuesForm),
    })
    const result = response.json()
    if (response.ok) {
      return result
    } else {
      return result.then(data => {
        //TODO заменить на new httpError, когда Ильфат сольет МР
        const message = `Что-то пошло не так... ${data.message}`
        return Promise.reject(new Error(message))
      })
    }
  } catch (err) {
    console.log(err)
  }
}
