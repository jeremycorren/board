$(function() {
	$('#collapse-open').click(function() {
		$('.glyphicon-collapse-open').click();
		$(this).toggleClass("glyphicon-chevron-down").toggleClass("glyphicon-chevron-up");
	});

	$('.glyphicon-collapse-open').click(function() {
    	$(this).toggleClass("glyphicon-chevron-down").toggleClass("glyphicon-chevron-up");
   });
});


$(function() {
 	$('#collapse-progress').click(function() {
		$('.glyphicon-collapse-progress').click();
		$(this).toggleClass("glyphicon-chevron-down").toggleClass("glyphicon-chevron-up");
	});

	$('.glyphicon-collapse-progress').click(function() {
      $(this).toggleClass("glyphicon-chevron-down").toggleClass("glyphicon-chevron-up");
   });
});

$(function() {
   $('#collapse-complete').click(function() {
		$('.glyphicon-collapse-complete').click();
		$(this).toggleClass("glyphicon-chevron-down").toggleClass("glyphicon-chevron-up");
	});

	$('.glyphicon-collapse-complete').click(function() {
      $(this).toggleClass("glyphicon-chevron-down").toggleClass("glyphicon-chevron-up");
   });
});

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

