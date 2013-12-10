urlParam = function(name){
	var results = new RegExp('[\\?&amp;]' + name + '=([^&amp;#]*)').exec(window.location.href);
	if (!results) return 0;
	return results[1] || 0;
}

function activateTab(pageId) {
	var tabCtrl = document.getElementById('tabCtrl');
	var pageToActivate = document.getElementById('page' + pageId);
	for (var i = 0; i < tabCtrl.childNodes.length; i++) {
		var node = tabCtrl.childNodes[i];
		if (node.nodeType == 1) { /* Element */
			node.style.display = (node == pageToActivate) ? 'block' : 'none';
		}
	}
}

$(document).ready(function() {
	var tabId = urlParam('tabId');
	if (tabId) activateTab(tabId);
});