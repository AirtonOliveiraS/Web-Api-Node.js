import { fastify } from 'fastify';
import { DatabasePostgres } from './database-postgres.js';
//import { DatabaseMemory } from './database-memory.js';


const server = fastify();

// const database = new DatabaseMemory()

const database = new DatabasePostgres()

server.get('/videos', async(request) => {
    const search = request.query.search
    const videos = await database.list(search)

    return videos
})

server.post('/videos', async(request, reply) => {

    const {title, description, duration} = request.body
    
      await database.create({
        title: title,
        description: description,
        duration: duration,
    })

    return reply.status(201).send()
}) 

server.put('/videos/:id', async(request, replay) => {
    const videoId = request.params.id
    const {title, description, duration} = request.body
    
     await database.update(videoId,{
        title: title,
        description: description,
        duration: duration,
    })

    return replay.status(204).send()
})

server.delete('/videos/:id', (request,replay) => {
    const videoId = request.params.id
    database.delete(videoId)

    return replay.status(204).send()
})
server.listen(
    {
        host:'0.0.0.0',
        port: process.env.PORT ?? 3333,
    }
)
