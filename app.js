const searchInput = document.getElementById("searchInput");
const folders = document.querySelectorAll(".folder");
searchInput.addEventListener("input",()=>{
	const serachTerm = searchInput.value.toLowerCase();
	folders.forEach(folder => {
		const categoria = folder.textContent.toLowerCase();
		if(categoria.includes(serachTerm)){
			folder.style.display = "flex";
		}else{
			folder.style.display = "none";
		}
	});
});