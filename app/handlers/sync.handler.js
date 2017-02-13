const db   = require('../connection')

const InitProject = (request, reply) => {

    const project = (data, serverId = 1) => {

        db.none(`INSERT INTO projects(server_id, path)
                SELECT $1, $2
                WHERE NOT EXISTS(SELECT * FROM projects WHERE(server_id = $1 AND path = $2))`,
                [serverId, data.name]).then(

            db.one(`INSERT INTO folders(server_id, name, inode)
                    SELECT $1, $2, $3
                    WHERE NOT EXISTS(SELECT * FROM folders WHERE(server_id = $1 AND name = $2 AND inode = $3))
                    RETURNING id, server_id`,
                    [serverId, data.name, data.inode]).then( folder => {

                eachContent(data.content, folder.id, folder.server_id)

            }).catch(error => {

                console.error(error)
                reply(error)

            })

        ).catch( error => {

            console.error(error)
            reply(error)

        })
    }

    const eachContent = (data, parentId, serverId = 1) => {

        data.forEach( item => {

            if(item.type == 'file') {

                db.none(`INSERT INTO files(server_id, folder_id, name, hash, inode)
                        SELECT $1, $2, $3, $4, $5
                        WHERE NOT EXISTS(SELECT * FROM files WHERE(server_id = $1 AND folder_id = $2 AND name = $3 AND hash = $4 AND inode = $5))`,
                        [serverId, parentId, item.name, item.crc, item.inode]).catch( error => {

                    console.error(error)
                    reply(error)

                })

            } else if (item.type == 'folder') {

                db.one(`INSERT INTO folders(server_id, parent_id, name, inode)
                        SELECT $1, $2, $3, $4
                        WHERE NOT EXISTS(SELECT * FROM files WHERE(server_id = $1 AND parent_id = $2 AND name = $3 AND inode = $4))
                        RETURNING id`,
                        [serverId, parentId, item.name, item.inode]).then( id => {

                    if (item.content && item.content.length) {

                        item.content.forEach( node => {

                            eachContent(node, id, serverId);

                        })
                    }
                }).catch(error => {

                    console.error('FOLDER')
                    console.error(error)
                    reply(error)

                })
            }

        })
    };

    const data = request.payload

    project(data) 
};

module.exports = {
    InitProject
}