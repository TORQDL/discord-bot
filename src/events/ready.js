module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		// console.log(`Ready! Logged in as ${client.user.tag}`);
        console.log('Ready!');
        if (client.user) {
            console.log(`Logged in as ${client.user.tag}.`);
        }
	},
};
