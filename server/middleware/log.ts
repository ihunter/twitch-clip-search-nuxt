export default defineEventHandler((event) => {
  const userAgent = getRequestHeader(event, 'user-agent')
  const ipAddress = event.node.req.headers['x-forwarded-for'] || event.node.req.socket.remoteAddress

  console.log('userAgent:', userAgent)
  console.log('ip:', ipAddress, typeof ipAddress)
})
