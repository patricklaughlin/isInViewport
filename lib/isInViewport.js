(function($) {
	$.fn.isInViewport = function isInViewport(options) {

		var boundingRect = this.get(0).getBoundingClientRect(),
			top = boundingRect.top,
			bottom = boundingRect.bottom,
			index = "" + this.get(0).offsetLeft + this.get(0).offsetTop + this.get(0).offsetHeight + this.get(0).offsetWidth,
			settings = $.extend({
				// These are the defaults.
				"tolerance": 0,
				"toleranceForLast": boundingRect.height,
				"debug": false
			}, options),
			tolerance = settings.tolerance,
			toleranceForLastElement = settings.toleranceForLast,
			isVisibleFlag = false;


		isInViewport.elementsAfterCurrent = isInViewport.elementsAfterCurrent || {};
		isInViewport.elementsAfterCurrent[index] = isInViewport.elementsAfterCurrent[index] || this.nextAll();


		if (tolerance) {
			/*Element before last*/
			/*Once its top becomes -ve, make it positive again so that it still enters 
			the first part of the if ie (top >= 0) etc and check against usual tolerance value
			This lets us make the element before last return false to isInViewport when last elem is reached
			and its height is too small to scroll it till tolerance level is breached.*/
			if (isInViewport.elementsAfterCurrent[index].length === 1 && top < 0) {
				top *= -1;
			}
			/*Last element*/
			if (!isInViewport.elementsAfterCurrent[index].length) {
				tolerance = toleranceForLastElement;
			}
		}

		if (settings.debug) {
			console.log("---------------------------------------");
			console.log("index: " + index);
			console.log("div: " + this.text().trim());
			console.log("top: " + top);
			console.log("bottom: " + bottom);
			console.log("tolerance: " + tolerance);
			console.log("tolerance for last element: " + toleranceForLastElement);
		}

		if (tolerance) {
			if (top >= 0) {
				if (top <= tolerance) {
					isVisibleFlag = true;
				} else {
					isVisibleFlag = false;
				}
			} else {
				if (bottom > tolerance) {
					isVisibleFlag = true;
				} else {
					isVisibleFlag = false;
				}
			}
		} else {
			if (top >= 0)
				isVisibleFlag = true;
			else
				isVisibleFlag = false;
		}

		return isVisibleFlag;

	};
})(jQuery);