import { randomUUID } from "crypto"

export class DatabaseMemory{

    #videos = new Map()

    list(){
        
       return Array.from(this.#videos.entries()).map((videoarray)=>{
        const id = videoarray[0]
        const data = videoarray[1]

        return{
            id,
            ...data,
        }
       })
    }

    
    create(video){
        const videoId = randomUUID()
        this.#videos.set(videoId, video)
    }

    update(id,video){
        this.#videos.set(id, video)
    }


    delete(id,video){
        this.#videos.delete(id, video)
    }
}