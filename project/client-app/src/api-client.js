import api from 'api-client'
api.port=process.env.REACT_APP_PORT
api.host=process.env.REACT_APP_HOST
api.protocol=process.env.REACT_APP_PROTOCOL

export default api