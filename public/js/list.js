$(function() {
	collapse('#collapse-open', '.glyphicon-collapse-open');
	collapse('#collapse-progress', '.glyphicon-collapse-progress');
	collapse('#collapse-complete', '.glyphicon-collapse-complete');
	collapse('#collapse-recur', '.glyphicon-collapse-recur');
});

function collapse(master, detail) {
	$(master).click(function() {
		$(detail).click();
		$(this).toggleClass("glyphicon-chevron-down").toggleClass("glyphicon-chevron-up");
	});

	$(detail).click(function() {
    	$(this).toggleClass("glyphicon-chevron-down").toggleClass("glyphicon-chevron-up");
   });
}