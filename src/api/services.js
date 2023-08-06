import api from './index'

const ENDPOINT = {
  ACCOUNT: '/accounts'
}

const getAllAccounts = async () => {
  try {
    const res = await api.get(ENDPOINT.ACCOUNT)
    return res
  } catch (error) {
    throw new Error(error)
  }
}

const getSelectedAccount = async (slug) => {
  try {
    const selected = await api.get(`${ENDPOINT.ACCOUNT}?filters[slug][$eqi]=${slug}&populate=*`)
    return selected
  } catch (error) {
    throw new Error(error)
  }
}

export { getAllAccounts, getSelectedAccount }