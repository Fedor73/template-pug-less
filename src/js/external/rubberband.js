var iOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
if (iOS == true) {
    var content = document.getElementById('scroll-y');
    content.addEventListener('touchstart', function(event) {
        this.allowUp = (this.scrollTop > 0);
        this.allowDown = (this.scrollTop < this.scrollHeight - this.clientHeight);
        this.slideBeginY = event.pageY;
    });

    content.addEventListener('touchmove', function(event) {
        var up = (event.pageY > this.slideBeginY);
        var down = (event.pageY < this.slideBeginY);
        this.slideBeginY = event.pageY;
        if ((up && this.allowUp) || (down && this.allowDown)) {
            event.stopPropagation();
        }
        else {
            event.preventDefault();
        }
    });
}