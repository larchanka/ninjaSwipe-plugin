(function($) {
	$.fn.ninjaSwipe = function(initParams) {
		var defaults = {
			deltaTimeMove : 300,
			deltaSwipe : 30,
			deltaMove : 30
		};
		var isPointerEvents = window.navigator.msPointerEnabled;
		var isTouchEvents = !isPointerEvents && (window.propertyIsEnumerable('ontouchstart') || window.document.hasOwnProperty('ontouchstart'));
		var options = $.extend(defaults, initParams);
		var moveUp = initParams.moveUp;
		if(!this)
			return false;

		ninjaSwipeConst = {
			DIRECTION_NONE : 0,
			DIRECTION_MOVE_UP : 1,
			DIRECTION_MOVE_DOWN : 2,
			DIRECTION_MOVE_LEFT : 3,
			DIRECTION_MOVE_RIGHT : 4,
			MOVE_DELTA_TIME : 300
		}

		var moveStartTime = null;

		var originalCoord = {
			x : 0,
			y : 0
		};
		var finalCoord = {
			x : 0,
			y : 0
		};
		var mouseDown = false;
		var moveDirection = ninjaSwipeConst.DIRECTION_NONE;

		return this.each(function() {
			var me = $(this)

			function ninjaSwipe__touchStart(event) {
				if(event.targetTouches) {
					originalCoord.x = event.targetTouches[0].pageX;
					originalCoord.y = event.targetTouches[0].pageY;
				} else {
					originalCoord.x = event.screenX;
					originalCoord.y = event.screenY;
				}
				finalCoord.x = originalCoord.x;
				finalCoord.y = originalCoord.y;
				mouseDown = true;
				moveDirection = ninjaSwipeConst.DIRECTION_NONE;
				moveStartTime = new Date().getTime();
			}

			function ninjaSwipe__touchMove(event) {
				if(mouseDown) {
					if(event.targetTouches) {
						finalCoord.x = event.targetTouches[0].pageX;
						finalCoord.y = event.targetTouches[0].pageY;
					} else {
						finalCoord.x = event.screenX;
						finalCoord.y = event.screenY;
					}

					var changeX = originalCoord.x - finalCoord.x;
					var changeY = originalCoord.y - finalCoord.y;

					if(moveDirection == ninjaSwipeConst.DIRECTION_NONE) {
						if(Math.abs(changeX) > Math.abs(changeY) * 1.5) {
							if(changeX <= -options.deltaMove) {
								moveDirection = ninjaSwipeConst.DIRECTION_MOVE_LEFT;
							} else if(changeX >= options.deltaMove) {
								moveDirection = ninjaSwipeConst.DIRECTION_MOVE_RIGHT;
							}
							event.preventDefault();
						}
						if(Math.abs(changeY) > Math.abs(changeX) * 1.5) {
							if(changeY <= -options.deltaMove) {
								moveDirection = ninjaSwipeConst.DIRECTION_MOVE_DOWN;
							} else if(changeY >= options.deltaMove) {
								moveDirection = ninjaSwipeConst.DIRECTION_MOVE_UP;
							}
						}
					}

					if(moveDirection != ninjaSwipeConst.DIRECTION_NONE) {
						if(moveDirection == ninjaSwipeConst.DIRECTION_MOVE_LEFT && options.moveLeft) {
							options.moveLeft(changeX);
						} else if(moveDirection == ninjaSwipeConst.DIRECTION_MOVE_RIGHT && options.moveRight) {
							options.moveRight(changeX);
						} else if(moveDirection == ninjaSwipeConst.DIRECTION_MOVE_UP && options.moveUp) {
							options.moveUp(changeY);
						} else if(moveDirection == ninjaSwipeConst.DIRECTION_MOVE_DOWN && options.moveDown) {
							options.moveDown(changeY);
						}
					}
				}
			}

			function ninjaSwipe__touchEnd(event) {
				if(mouseDown) {
					mouseDown = false;
					var changeX = Math.abs(originalCoord.x - finalCoord.x);
					var changeY = Math.abs(originalCoord.y - finalCoord.y);
					var elapsed = new Date().getTime() - moveStartTime;

					if(changeX >= options.deltaSwipe || changeY >= options.deltaSwipe || !options.moveReset || elapsed <= ninjaSwipeConst.MOVE_DELTA_TIME) {
						if(moveDirection == ninjaSwipeConst.DIRECTION_MOVE_LEFT && options.swipeLeft) {
							options.swipeLeft(elapsed);
						} else if(moveDirection == ninjaSwipeConst.DIRECTION_MOVE_RIGHT && options.swipeRight) {
							options.swipeRight(elapsed);
						} else if(moveDirection == ninjaSwipeConst.DIRECTION_MOVE_UP && options.swipeUp) {
							options.swipeUp(elapsed);
						} else if(moveDirection == ninjaSwipeConst.DIRECTION_MOVE_DOWN && options.swipeDown) {
							options.swipeDown(elapsed);
						}
					} else {
						if(options.moveReset) {
							options.moveReset(moveDirection);
						}
					}

					moveDirection = ninjaSwipeConst.DIRECTION_NONE;
				}
			}

			function ninjaSwipe__mouseScroll(event) {
				var changeX, changeY;
				if (event.wheelDelta) {
					if (event.wheelDeltaX) {
						changeX = event.wheelDeltaX / 2;
						scrollDeltaY = event.wheelDeltaY / 2;
					} else {
						changeX = 0;
						scrollDeltaY = event.wheelDelta / 2;
					}
				} else {
					if (event.axis && event.axis === event.HORIZONTAL_AXIS) {
						changeX = event.detail * -10;
						changeY = 0;
					} else {
						changeX = 0;
						changeY = event.detail * -10;
					}
				}
				originalCoord.x = Math.round(originalCoord.x + changeX);
				originalCoord.y = Math.round(originalCoord.y + changeY);
			}

			function ninjaSwipe__touchCancel(event) {

			}


			if(isPointerEvents) {
				this.addEventListener("MSPointerDown", ninjaSwipe__touchStart, false);
				this.addEventListener("MSPointerMove", ninjaSwipe__touchMove, false);
				this.addEventListener("MSPointerUp", ninjaSwipe__touchEnd, false);
				this.addEventListener("MSPointerCancel", ninjaSwipe__touchCancel, false);
			} else {
				if(isTouchEvents) {
					this.addEventListener("touchstart", ninjaSwipe__touchStart, false);
					this.addEventListener("touchmove", ninjaSwipe__touchMove, false);
					this.addEventListener("touchend", ninjaSwipe__touchEnd, false);
					this.addEventListener("touchcancel", ninjaSwipe__touchCancel, false);
				} else {
					this.addEventListener("mousedown", ninjaSwipe__touchStart, false);
					this.addEventListener("mousemove", ninjaSwipe__touchMove, false);
					this.addEventListener("mouseup", ninjaSwipe__touchEnd, false);
				}
			}
			this.addEventListener('DOMMouseScroll', ninjaSwipe__mouseScroll, false);
			this.addEventListener('mousewheel', ninjaSwipe__mouseScroll, false);
		});
	};
})(jQuery); 