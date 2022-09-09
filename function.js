
// const readline = require("readline");
const fs = require('fs');
const { resolve } = require("path");
const { rejects } = require("assert");
const validator = require('validator');


// const rl = readline.createInterface({
// 	input: process.stdin,
// 	output: process.stdout

// });

// membuat folder data apabila tidak ada
	const data = "./data";

	if (!fs.existsSync (data)){
		fs.mkdirSync(data);
	}

// membuat file contacts.json jika tidak ada 
	const filepath= "./data/contacts.json";

	if (!fs.existsSync(filepath)){
		fs.writeFileSync(filepath,`[]`);
	}

// // pertanyaan
// 	const pertanyaan = (ask) => {
// 		return new Promise((resolve,rejects)=>{
// 			rl.question(ask, (jawaban)=>{
// 				resolve (jawaban)
// 			})
// 		})
// 	}

// Load Contact
const loadContact=()=> {
	const file = fs.readFileSync(filepath,'utf-8');
		const contacts = JSON.parse(file);

		return contacts;
}

// List Contact
const listContact=()=>{
	const contacts = loadContact();
	console.log('Contact List : ');
	contacts.forEach((contacts,i) => {
		console.log(`${i+1}.${contacts.name}-${contacts.mobile}`);
	});
};

// Detail Contact
const detailContact=(name) => {
	const contacts = loadContact();
	const detailContact = contacts.find((contacts) => contacts.name === name);
	if(detailContact){
		console.log('This is detail contact');
		console.log('Contact Detail : ');
		console.log(detailContact.name);
		console.log(detailContact.email);
		console.log(detailContact.mobile);
	}else {
		console.log('Detailed data is invalid');
		return false;
	};
}
// Update Contact
const updateContact = (name, newName, newEmail, newMobile) => {
	const upContact = [];
	const contacts = loadContact();
	const index = contacts.findIndex((contacts) => contacts.name.toLowerCase() === name.toLowerCase());

		if (index > -1){
			if(newName){
				const duplicate = contacts.find((contacts) => contacts.name === newName);
			if (duplicate){
				upContact.push ('Name has to used, Please input other name !');
				}
				contacts[index].name = newName;
			}

			if (newEmail){
				if(!validator.isEmail(newEmail)){
					upContact.push('Please input valid email ! ');
				}
				contacts[index].email = newEmail;
			}

			if(newMobile){
				if (!validator.isMobilePhone(newMobile, "id-ID")){
				upContact.push('Please Input valid Mobile Phone ! ')
				}
				contacts[index].mobile = newMobile;
			}

			if (upContact.length > 0){
				console.log(upContact);
				return false;
			}

		} else {
				console.log('Sorry, The contact has definied :( ');
			return false;
			}
		
			fs.writeFileSync(filepath, JSON.stringify(contacts));
			console.log('The Contact has Succesfully Updated !!!');
		
};




// Delete Contact
const deletedContact = (name) => {
  const contacts = loadContact();
  const index = contacts.findIndex((contacts) => contacts.name === name);

	if (index > -1) {
		contacts.splice(index, 1);
		fs.writeFileSync(filepath, JSON.stringify(contacts));
	}else {
		console.log("Contacts is definied");
		return false;
	
	}
	console.log('Deleted Contact has Successfully');
};




// menyimpan data contacts
	const getcontacts = (name,email,mobile) => {
		const contact = {name,email,mobile};
		const contacts = loadContact() 

		const duplicateName=contacts.find((contact)=> contact.name === name);
		if(duplicateName){
			console.log('Contact name is already recorded. Use another contact name');
			return false;
		}
		if(email){

		if(!validator.isEmail(email)){
			console.log('Email format is invalid !');

			return false;
		}
	}
		if(!validator.isMobilePhone(mobile, 'id-ID')){
			console.log('Mobile Phone is invalid !');
		}
		
		contacts.push(contact);
		fs.writeFileSync(filepath, JSON.stringify(contacts));
	
			console.log(`Thank youu ${name}, for ur entering the data !!`);

// rl.close();
}

module.exports = {getcontacts, listContact, detailContact, updateContact, deletedContact}
