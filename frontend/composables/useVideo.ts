
const getAll = async () => {
  return await useFetch('http://localhost:8000/api/videos/', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

const getId = async (videoId: number) => {
  return await useFetch('http://localhost:8000/api/videos/'+ videoId, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
}


export default {
  getAll,
  getId
}