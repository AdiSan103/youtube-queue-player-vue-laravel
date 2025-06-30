interface VideoProgressRequest {
  user_id: number
  video_id: number
  last_position: number
  is_completed: 1 | 0
}

const getProgress = async (user_id: number, video_id: number) => {
  return await useFetch('http://localhost:8000/api/progress/'+ user_id + '/' + video_id, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

const postProgress = async (body: VideoProgressRequest)  => {
  return await useFetch('http://localhost:8000/api/progress', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: body
  })
}


export default {
  getProgress,
  postProgress   
}