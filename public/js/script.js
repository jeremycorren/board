const task = document.getElementById('task');
const description = document.getElementById('description');
const category = document.getElementById('category');

if (task && description && category) {
	setInterval(() => {
		const saveBtn = document.getElementById('btn-success');
		if (task.value && description.value && category.value) {
			saveBtn.disabled = false;
		} else if (!task.value || !description.value || !category.value) {
			saveBtn.disabled = true;
		}
	}, 100);
}