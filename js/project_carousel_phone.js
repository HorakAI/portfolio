class ProjectCarouselPhone {
    constructor() {
        this.track = document.querySelector('.project-track');
        this.tiles = document.querySelectorAll('.project-tile');
        this.currentIndex = 0;
        this.tileWidth = this.tiles[0].offsetWidth;
        this.gap = 32; // 2rem gap between tiles
        this.tilesPerView = 1; // Always 1 for phone
        this.init();
    }

    init() {
        // Clone tiles for infinite scroll
        this.cloneTiles();
        // Only add touch events (no buttons, no keyboard)
        this.addTouchEvents();
        // Handle window resize
        window.addEventListener('resize', () => {
            this.tileWidth = this.tiles[0].offsetWidth;
            this.updateTrackPosition();
        });
    }

    cloneTiles() {
        // Clone first set of tiles and append to end
        this.tiles.forEach(tile => {
            const clone = tile.cloneNode(true);
            this.track.appendChild(clone);
        });
        // Clone last set of tiles and prepend to start
        const tilesArray = Array.from(this.tiles);
        tilesArray.reverse().forEach(tile => {
            const clone = tile.cloneNode(true);
            this.track.insertBefore(clone, this.track.firstChild);
        });
        // Update tiles reference
        this.tiles = document.querySelectorAll('.project-tile');
        // Set initial position
        this.currentIndex = this.tiles.length / 3;
        this.updateTrackPosition();
    }

    slide(direction) {
        if (direction === 'next') {
            this.currentIndex++;
        } else {
            this.currentIndex--;
        }
        this.updateTrackPosition();
        // Check if we need to reset position
        if (this.currentIndex >= this.tiles.length - this.tilesPerView) {
            setTimeout(() => {
                this.currentIndex = this.tilesPerView;
                this.track.style.transition = 'none';
                this.updateTrackPosition();
                setTimeout(() => {
                    this.track.style.transition = 'transform 0.5s ease';
                }, 50);
            }, 500);
        } else if (this.currentIndex <= 0) {
            setTimeout(() => {
                this.currentIndex = this.tiles.length - (this.tilesPerView * 2);
                this.track.style.transition = 'none';
                this.updateTrackPosition();
                setTimeout(() => {
                    this.track.style.transition = 'transform 0.5s ease';
                }, 50);
            }, 500);
        }
    }

    updateTrackPosition() {
        // Get computed gap
        const style = window.getComputedStyle(this.track);
        const gap = parseInt(style.gap) || 0;
        const offset = this.currentIndex * (this.tileWidth + gap);
        this.track.style.transform = `translateX(-${offset}px)`;
    }

    addTouchEvents() {
        let startX, moveX;
        const threshold = 50; // Minimum distance for swipe
        this.track.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            this.track.style.transition = 'none';
        });
        this.track.addEventListener('touchmove', (e) => {
            moveX = e.touches[0].clientX;
            const diff = moveX - startX;
            const currentOffset = this.currentIndex * (this.tileWidth + this.gap);
            this.track.style.transform = `translateX(${diff - currentOffset}px)`;
        });
        this.track.addEventListener('touchend', () => {
            this.track.style.transition = 'transform 0.5s ease';
            const diff = moveX - startX;
            if (Math.abs(diff) > threshold) {
                if (diff > 0) {
                    this.slide('prev');
                } else {
                    this.slide('next');
                }
            } else {
                this.updateTrackPosition();
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ProjectCarouselPhone();
}); 