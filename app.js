// const validator = require('validator');

// console.log(validator.isEmail('daniwgs92@gmail.com'));
// console.log(validator.isMobilePhone('08996988449','id-ID'));

const { notStrictEqual } = require('assert');
const { type } = require('os');
const { argv } = require('process');
const { command, demandOption } = require('yargs');
const yargs = require('yargs')
// console.log(yargs.argv);


const func = require('./function')

// Command for add
yargs.command({
	command:'add',
	describe:'Add new contact',
	builder:{
		name:{
			describe:'Contact Name',
			demandOption:true,
			type:'string',
		},
		email:{
			describe:'Contact Email',
			demandOption:false,
			type:'string',
		},
		mobile:{
			describe:'Contact mobile phone number',
			demandOption:true,
			type:'string',
		},
	},
	handler(argv){
		func.getcontacts(argv.name, argv.email, argv.mobile);
	}
});

// Command for List
	yargs.command({
		command:'list',
		describe:'List contact data',
	
	handler(){
		func.listContact();
	}
});

// Command for detail
	yargs.command({
		command:'detail',
		describe:'Detail contact data',
		builder:{
			name:{
				describe:'Contact Name',
				demandOption:true,
				type:'string',
			},
		},
	
	handler(argv){
		func.detailContact(argv.name);
	}
});

// Command for update
yargs.command({
	command:'update',
	describe:'The data has updated',
	builder:{
		name:{
			describe:'Contact old Name',
			demandOption:true,
			type : 'string'
		},
		newName:{
			describe:'Contact new Name',
			demandOption:false,
			type:'string',
		},
		newEmail:{
			describe:'Contact new Email',
			demandOption:false,
			type:'string',
		},
		newMobile:{
			describe:'Contact new mobile phone number',
			demandOption:false,
			type:'string',
		}
	},
	handler(argv){
		func.updateContact(argv.name, argv.newName, argv.newEmail, argv.newMobile);
	}
});

// Command for Delete
	yargs.command({
		command:'remove',
		describe:' The data has removed',
		builder:{
			name:{
				describe:' Note a',
				demandOption:true,
				type:'string'
			}
		},
		handler:argv =>{
			func.deletedContact(argv.name);

		}
	});


yargs.parse();

