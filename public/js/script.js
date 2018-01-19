const task = document.getElementById('task');
const description = document.getElementById('description');
const category = document.getElementById('category');

if (task && description && category) {
	setInterval(() => {
		const saveBtn = document.getElementById('btn-success');
		if (task.value && description.value && category.selectedIndex != 0) {
			saveBtn.disabled = false;
		} else if (!task.value || !description.value || category.selectedIndex == 0) {
			saveBtn.disabled = true;
		}
	}, 100);
}

function collapse(master, detail) {
	$(master).click(function() {
		$(detail).click();
		$(this).toggleClass("glyphicon-chevron-down").toggleClass("glyphicon-chevron-up");
	});

	$(detail).click(function() {
    	$(this).toggleClass("glyphicon-chevron-down").toggleClass("glyphicon-chevron-up");
   });
}

$(function() {
	collapse('#collapse-open', '.glyphicon-collapse-open');
	collapse('#collapse-progress', '.glyphicon-collapse-progress');
	collapse('#collapse-complete', '.glyphicon-collapse-complete');
	collapse('#collapse-recur', '.glyphicon-collapse-recur');
});

