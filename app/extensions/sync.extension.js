const db  = require('../connection');

const project = (data, serverId = 1) => {

    db.none('INSERT INTO projects(server_id, path) SELECT $1, $2 WHERE NOT EXISTS(SELECT * FROM projects WHERE(server_id = $1 AND path = $2))', serverId, data.name).then(

        db.one('INSERT INTO folders(server_id, name, inode) SELECT $1, $2, $3 WHERE NOT EXISTS(SELECT * FROM folders WHERE(server_id = $1 AND name = $2 AND inode = $3)) returning id, server_id', serverId, data.name, data.inode).then(folder => {

            return folder

        }).catch(error => {

            reply(error)

        })

    ).catch(error => {

        reply(error)

    })
}

const eachContent = (data, parentId, serverId = 1) => {

    if(data.type == 'file') {

        db.none('INSERT INTO files(server_id, folder_id, name, hash, inode) VALUES($1, $2, $3, $4, $5) WHERE NOT EXISTS(SELECT * FROM files WHERE(server_id = $1, folder_id = $2, name = $3, hash = $4, inode = $5))' , serverId, parentId, data.name, data.crc, data.inode).catch(error => {

            reply(error)

        })

    } else if (data.type == 'folder') {

        db.one('INSERT INTO folders(server_id, parent_id, name, inode) VALUES($1, $2, $3, $4) WHERE NOT EXISTS(SELECT * FROM files WHERE(server_id = $1, parent_id = $2, name = $3, inode = $5)) RETURNING id', serverId, null, data.name, data.inode).then(id => {

            if (data.content && data.content.length) {

                data.content.forEach(item => {

                    eachContent(item, id);

                })
            }
        }).catch(error => {

            reply(error)

        })
    }
};

module.exports = {
    project,
    eachContent
}