import axios from 'axios'

const FUNCTIONS_URL = 'https://us-central1-coworking-checkin.cloudfunctions.net'

export const handleQRCode = qrcodeString => {
  const url = `${FUNCTIONS_URL}/handleQRCode?visitorId=${qrcodeString}`
  return axios.get(url)
}
