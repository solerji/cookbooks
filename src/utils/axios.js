import axios from 'axios'

export async function request(options) {
  let response
  try {
    response = await axios(options)
    return response
  } catch (err) {
    return err
  }
}
