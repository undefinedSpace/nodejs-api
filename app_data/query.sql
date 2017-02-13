INSERT INTO servers (ip, hostname, token) VALUES (
	'127.0.0.1',
	'http:/github.io',
	'123'
);

INSERT INTO projects (server_id, path) VALUES (
	1,
	'usr/bin/dev'
);

SELECT * FROM servers;

SELECT * FROM projects;