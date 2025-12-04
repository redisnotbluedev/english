(async () => {
	const title = document.getElementById("title");
	const text = document.getElementById("text");
	const buttons = document.getElementById("buttons");	

	let data;
	try {
		const response = await fetch("english.yaml");
		const yamlText = await response.text();
		data = jsyaml.load(yamlText);
	} catch (error) {
		alert(`Error: Failed to fetch game data: ${error.message}`);
		throw error;
	}

	window.navigateTo = async function(nodeName) {
		let node = data[nodeName];
	
		if (!node) {
			alert(`Error: scene ${nodeName} not found!`);
			return;
		}
	
		title.innerText = node.title;
		text.innerText = "";
		
		for (let char of node.text) {
			text.innerText += char;
			await new Promise(resolve => setTimeout(resolve, 10));
		}
		
		buttons.innerHTML = "";
	
		node.choices.forEach(choice => {
			let button = document.createElement("button");
			button.innerText = choice.text;
			button.setAttribute("onclick", `navigateTo('${choice.next}')`);
			buttons.appendChild(button);
		});
	}
	navigateTo("start")
})();
