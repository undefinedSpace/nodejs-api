const db   = require('../connection')

const InitProject = (request, reply) => {

    const project = (data, serverId = 1) => {

        db.none(`INSERT INTO projects(server_id, path)
                SELECT $1, $2
                WHERE NOT EXISTS(SELECT * FROM projects WHERE(path = $2))`,
                [serverId, data.name]).then(

            db.one(`INSERT INTO folders(name, parent_id, inode)
                    SELECT $1, $2, $3
                    WHERE NOT EXISTS(SELECT * FROM folders WHERE(inode = $3))
                    RETURNING id`,
                    [data.name,null, data.inode]).then( folder => {

                eachContent(data.content, folder.id)

            }).catch(error => {

                reply(error)

            })

        ).catch( error => {

            console.error(error)
            reply(error)

        })
    }

    const eachContent = (data, parentId, serverId = 1) => {

        if (typeof data !== 'object' || !data instanceof Array) return;

        data.forEach( item => {

            if(item.type == 'file') {

                db.none(`INSERT INTO files(folder_id, name, hash, inode)
                        SELECT $1, $2, $3, $4
                        WHERE NOT EXISTS(SELECT * FROM files WHERE(inode = $4))`,
                        [parentId, item.name, item.crc, item.inode]).catch( error => {

                    reply(error)

            })

            } else if (item.type == 'folder') {

                db.one(`INSERT INTO folders(name, parent_id, inode)
                        SELECT $1, $2, $3
                        WHERE NOT EXISTS(SELECT * FROM folders WHERE(inode = $3))
                        RETURNING id`,
                        [item.name, parentId, item.inode]).then( id => {

                    if (item.content && item.content.length) {
                  
                            eachContent(item.content, id.id);

                    }

                }).catch(error => {

                    reply(error)

                })
            }

        })
    }

    const data = request.payload

    project(data).then(
        reply('OK')
    ).catch(error => {
        reply(error)
    })
}

module.exports = {
    InitProject
}